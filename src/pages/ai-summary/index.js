import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import MainMenu from 'components/shared/menu';
import ReviewContact from '@components/overlays/review-contact';
import Delete from '@mui/icons-material/Delete';
import CheckCircle from '@mui/icons-material/CheckCircle';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import Loader from '@components/shared/loader';
import { bulkUpdateContacts, updateContact } from '@api/contacts';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { setRefetchData } from '@store/global/slice';
import { useDispatch, useSelector } from 'react-redux';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import withAuth from '@components/withAuth';
import SpinnerLoader from '@components/shared/SpinnerLoader';
import { getUnapprovedAI } from '@api/aiSmartSync';
import { CloseRounded } from '@mui/icons-material';
import AIUnapprovedTable from '@components/shared/table/AIUnapprovedTable';
import DropdownWithSearch from '@components/dropdownWithSearch';
import backBtn from '/public/images/back.svg';
import MainMenuV2 from '@components/shared/menu/menu-v2';
const index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const checkbox = useRef();
  const [popupData, setPopupData] = useState();
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [showReviewOverlay, setShowReviewOverlay] = useState(false);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [total, setTotal] = useState(0);

  useLayoutEffect(() => {
    const isIndeterminate = selectedPeople?.length > 0 && items?.data && selectedPeople?.length < items?.data?.length;
    if (items?.data?.length > 0) {
      setChecked(selectedPeople?.length === items?.data?.length);
    } else {
      setChecked(false);
    }
    setIndeterminate(isIndeterminate);
    if (checkbox.current) {
      checkbox.current.indeterminate = isIndeterminate;
    }
  }, [selectedPeople, checkbox, items.data, checked]);

  const toggleAll = () => {
    setSelectedPeople(checked || indeterminate ? [] : items.data);
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  };

  const updateContactsLocally = (action, newData) => {
    let updatedData = [...items?.data];

    newData.forEach((updateObj) => {
      const id = updateObj.id;
      const element = updatedData.find((item) => item.id === id);

      if (element) {
        const index = updatedData.findIndex((item) => item.id === id);
        updatedData[index] = { ...element, ...updateObj };
      }
    });

    setSelectedPeople([]);
  };
  const allData = items.data ? [...items.data] : [];
  const updateAiSummaryTable = () => {
    setItems((prevState) => ({
      ...prevState,
      data: allData,
    }));
    setTotal((prevState) => prevState + 1);
  };
  const handleAction = async (type, data) => {
    try {
      let newData = {};
      if (type === 'delete') {
        newData.category_id = 3;
        newData.approved_ai = true;
      } else {
        newData.approved_ai = true;
      }
      toast.custom(
        (t) => (
          <div
            className={`${
              t.visible ? 'animate-enter' : 'animate-leave'
            } shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 bg-gray-700 text-gray-50`}>
            <div className="flex gap-2 p-4 word-break items-center">
              <CheckCircleIcon className={'text-green-500'} />
              <h1 className={'text-sm leading-5 font-medium'}>
                {data.first_name} {data.last_name} {type === 'delete' ? 'moved to Trash' : `Marked as Correct!`}
              </h1>
            </div>
            <div className="flex rounded-tr-lg rounded-br-lg p-4 bg-gray-600 text-gray-100">
              <button
                onClick={() => {
                  toast.dismiss(t.id);
                  setItems((prevState) => ({
                    ...prevState,
                    data: allData,
                  }));
                  setTotal((prevState) => prevState + 1);
                  updateContact(data.id, { ...newData, approved_ai: false }).then(() => dispatch(setRefetchData(true)));
                }}
                className="w-full border border-transparent rounded-none rounded-r-lg flex items-center justify-center text-sm leading-5 font-medium font-medium">
                Undo
              </button>
            </div>
          </div>
        ),
        { duration: 0 },
      );
      const removeItemsFromTable = items.data.filter((contact) => contact.id !== data.id);
      setItems((prevState) => ({
        ...prevState,
        data: prevState.data.filter((contact) => contact.id !== data.id),
      }));
      setTotal((prevState) => prevState - 1);

      updateContact(data.id, newData).then(() => dispatch(setRefetchData(true)));
      if (checkbox.current) {
        checkbox.current.indeterminate = false;
      }
    } catch (error) {}
  };

  const bulkUpdate = (action) => {
    let transformedData = selectedPeople.map((item) => ({
      id: item.id,
      approved_ai: true,
      category_id: action == 1 ? item.category_id : 3,
      first_name: item.first_name,
      last_name: item.last_name,
    }));

    let restoredData = selectedPeople.map((item) => ({
      id: item.id,
      approved_ai: false,
      category_id: item.category_id,
      first_name: item.first_name,
      last_name: item.last_name,
    }));

    bulkUpdateContacts({ contacts: transformedData }).then(() => dispatch(setRefetchData(true)));
    const secondListValues = selectedPeople.map((item) => item.id);
    const filtered = items.data.filter((item) => !secondListValues.includes(item.id));
    setItems((prevState) => ({
      ...prevState,
      data: filtered,
    }));
    setTotal(filtered.length);
    updateContactsLocally(action, transformedData);
    let toastMessage =
      action == 2
        ? `${selectedPeople.length} contacts moved to Trash`
        : `${selectedPeople.length} contacts Marked as Correct!`;
    {
      selectedPeople.length > 0 &&
        toast.custom(
          (t) => (
            <div
              className={`${
                t.visible ? 'animate-enter' : 'animate-leave'
              } shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 bg-gray-700 text-gray-50`}>
              <div className="flex gap-2 p-4 word-break">
                <CheckCircleIcon className={'text-green-500'} />
                <h1 className={'text-sm leading-5 font-medium'}>{toastMessage}</h1>
              </div>
              <div className="flex rounded-tr-lg rounded-br-lg  p-4 bg-gray-600 text-gray-100">
                <button
                  onClick={() => {
                    toast.dismiss(t.id);
                    bulkUpdateContacts({ contacts: restoredData }).then(() => dispatch(setRefetchData(true)));
                    setTotal(allData.length);
                    setItems((prevState) => ({
                      ...prevState,
                      data: allData,
                    }));
                  }}
                  className="w-full border border-transparent rounded-none rounded-r-lg flex items-center justify-center text-sm leading-5 font-medium font-medium">
                  Undo
                </button>
              </div>
            </div>
          ),
          { duration: 5000 },
        );
    }
    setSelectedPeople([]);
    if (checkbox.current) {
      checkbox.current.indeterminate = false;
    }
  };
  const handleCardEdit = (item) => {
    setPopupData(item);
    setShowReviewOverlay(true);
  };

  useEffect(() => {
    setLoading(true);
    getUnapprovedAI(10, offset, categories.map((c) => c.c.value).join(',')).then((data) => {
      setItems(data.data);
      setOffset(offset + data.data.count);
      setLoading(false);
    });
  }, []);
  const handleSelect = (item) => {
    setCategories(item);
    setLoading(true);
    getUnapprovedAI(10, 0, item.map((item) => item.value).join(',')).then((data) => {
      setItems(data.data);
      setTotal(data.data.total);
      setOffset(data.data.count);
      setLoading(false);
    });
  };
  const loadItems = (offset) => {
    return getUnapprovedAI(10, offset, categories.map((c) => c.c.value).join(','))
      .then((response) => {
        return {
          hasNextPage: true,
          data: response.data.data,
          count: response.data.count,
          total: response.data.total,
        };
      })
      .catch((error) => {
        toast.error('Error while loading items');
        throw error;
      });
  };
  async function loadMore() {
    try {
      const { total, data, count, hasNextPage: newHasNextPage } = await loadItems(offset);
      setItems((current) => {
        return {
          ...current,
          data: [...current.data, ...data],
          count: count,
        };
      });

      setTotal(total);
      setOffset(offset + count);

      setHasNextPage(newHasNextPage);
      if (count == 0) {
        setHasNextPage(false);
        return;
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  // Combine initial load and infinite scroll
  const [infiniteRef] = useInfiniteScroll({
    hasNextPage: hasNextPage,
    loading: loading,
    onLoadMore: loadMore,
    disabled: !!error,
  });
  const removeAIContact = (contactId) => {
    setItems((prevState) => ({
      ...prevState,
      data: prevState.data.filter((contact) => contact.id !== contactId),
    }));
    setTotal(items.data.length - 1);
  };
  return (
    <div>
      <MainMenuV2 />
      {loading ? (
        <div style={{ height: 'calc(100vh - 200px)' }} className="relative">
          <Loader />
        </div>
      ) : items?.data?.length > 0 ? (
        <>
          <div className="p-6 text-gray-900 font-medium text-base flex justify-between items-center">
            <div>
              <div className="p-2 mr-3 border-blue-500 border bg-blue-50 text-blue-600 font-semibold rounded-lg inline-block">
                {total ? total : 0} contacts
              </div>
              from Smart Synced Contacts need to be reviewed
            </div>
            <div className="flex gap-2 items-center">
              <div className="max-w-[500px] min-w-[200px]">
                <DropdownWithSearch
                  placeholder="Filter..."
                  maxMenuHeight={200}
                  isMulti
                  options={[
                    { value: 'Client', label: 'Clients' },
                    { value: 'Professional', label: 'Professionals' },
                    { value: 'Other', label: 'Other' },
                    { value: 'Uncategorized', label: 'Uncategorized' },
                    { value: 'Trash', label: 'Trash' },
                  ]}
                  onChange={(choice) => {
                    handleSelect(choice);
                  }}
                />
              </div>
              <div>
                <CloseRounded className="cursor-pointer" onClick={() => router.push('/contacts/clients')} />
              </div>
            </div>
          </div>
          <div style={{ overflow: 'auto', width: '100vw' }}>
            <AIUnapprovedTable
              tableFor="ai"
              checked={checked}
              ai_unapprovedContacts={items?.data}
              checkbox={checkbox}
              handleCardEdit={handleCardEdit}
              handleAction={handleAction}
              selectedPeople={selectedPeople}
              setSelectedPeople={setSelectedPeople}
              toggleAll={toggleAll}
            />
            {hasNextPage && (
              <div ref={infiniteRef}>
                <SpinnerLoader />
              </div>
            )}
          </div>
        </>
      ) : (
        !loading &&
        items?.data &&
        items.data.length === 0 &&
        (categories.length > 0 ? (
          <p className={'text-center mt-2 text-sm '}>No Contact Found</p>
        ) : (
          <div className="flex items-center justify-center absolute w-[100vw] top-[76px] bg-white">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
              <lottie-player
                src="/animations/aisummary1.json"
                background="transparent"
                speed="1"
                style={{ height: '300px' }}
                autoplay></lottie-player>
              <div className="-mt-10 text-gray-900 text-center">
                <div className="font-semibold text-lg">Well Done!</div>
                <div className="mt-3">You reviewed all contacts imported by AI from Gmail.</div>
              </div>
              <div
                onClick={() => router.push('/contacts/clients')}
                className="cursor-pointer flex items-center mt-20 text-center justify-center text-lightBlue3 font-medium text-sm">
                <img className="mr-2" src={backBtn.src} alt="" />
                Back to Contacts
              </div>
            </div>
            <lottie-player
              src="/animations/aisummary2.json"
              background="transparent"
              speed="1"
              style={{ width: '100%', height: 'calc(100vh - 68px)' }}
              autoplay></lottie-player>
          </div>
        ))
      )}
      {showReviewOverlay && popupData && (
        <ReviewContact
          afterSubmit={updateAiSummaryTable}
          client={popupData}
          className="w-[1200px]"
          title="Review AI Smart Synced Contact"
          removeAIContact={removeAIContact}
          handleClose={() => {
            setShowReviewOverlay(false);
          }}
        />
      )}
      {selectedPeople?.length > 1 && (
        <div className="bg-white fixed left-0 right-0 bottom-0 flex items-center justify-between py-4 px-6 space-x-2 fixed-categorize-menu">
          <div className="flex items-center text-sm text-gray-900">
            Selected: <span className="font-bold ml-1">{selectedPeople.length} contacts</span>
          </div>
          <div className="flex">
            <button
              onClick={() => {
                bulkUpdate(2);
              }}
              className="hover:bg-red-500 hover:text-white transition-all text-sm min-w-[185px] flex items-center justify-center mr-4 font-medium py-[6px] px-3 rounded-[4px] bg-red-50 text-red-500">
              <Delete /> <span className="ml-2">Move to Trash</span>
            </button>
            <button
              onClick={() => bulkUpdate(1)}
              className="hover:bg-[#10B981] hover:text-white transition-all text-sm min-w-[185px] flex items-center justify-center font-medium py-[6px] px-3 rounded-[4px] bg-green-50 text-[#10B981]">
              <CheckCircle />
              <span className="ml-2">Mark as Correct</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default withAuth(index);
