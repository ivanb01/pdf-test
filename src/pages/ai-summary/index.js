import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import MainMenu from 'components/shared/menu';
import Table from 'components/shared/table';
import ReviewContact from '@components/overlays/review-contact';
import Delete from '@mui/icons-material/Delete';
import CheckCircle from '@mui/icons-material/CheckCircle';
import SimpleBar from 'simplebar-react';
import { getUnapprovedContacts } from 'api/aiSmartSync';
import Loader from 'components/shared/loader';
import { bulkUpdateContacts, getContacts, updateContact } from '@api/contacts';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { setRefetchData } from '@store/global/slice';
import { useDispatch, useSelector } from 'react-redux';
import backBtn from '/public/images/back.svg';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import clients from '../contacts/clients';
import withAuth from '@components/withAuth';
import { setAllContacts } from '@store/contacts/slice';
import { findTagsOption } from '@global/functions';
import DropdownWithSearch from '@components/dropdownWithSearch';

const index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const checkbox = useRef();
  const [popupData, setPopupData] = useState();
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [showReviewOverlay, setShowReviewOverlay] = useState(false);
  const [categories, setCategories] = useState([]);
  const [dataLength, setDataLength] = useState();
  useLayoutEffect(() => {
    if (data) {
      const isIndeterminate = selectedPeople.length > 0 && selectedPeople.length < data.length;
      setChecked(selectedPeople.length === data.length);
      setIndeterminate(isIndeterminate);
      if (checkbox.current) {
        checkbox.current.indeterminate = isIndeterminate;
      }
    }
  }, [selectedPeople, checkbox]);

  const toggleAll = () => {
    setSelectedPeople(checked || indeterminate ? [] : data);
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  };
  const contacts = useSelector((state) => state.contacts.allContacts.data);

  const fetchContacts = async () => {
    if (contacts === undefined) {
      getContacts('1,2,3,4,5,6,7,8,9,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27')
        .then((data) => {
          dispatch(setAllContacts(data.data));
          let finalData = data.data.data.filter(
            (c) =>
              c.category_1 != 'Uncategorized' &&
              (c.approved_ai === null || c.approved_ai === false) &&
              c.import_source_text === 'Smart Sync A.I.' &&
              (categories.length === 0 || categories.map((category) => category.value).includes(c.category_1)),
          );
          let totalLength = data?.data?.data?.filter(
            (c) =>
              c.category_1 != 'Uncategorized' &&
              (c.approved_ai === null || c.approved_ai === false) &&
              c.import_source_text === 'Smart Sync A.I.',
          );
          setDataLength(totalLength.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
          finalData = finalData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          setData(finalData);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
      let finalData = contacts.filter(
        (c) =>
          c.category_1 != 'Uncategorized' &&
          (c.approved_ai === null || c.approved_ai === false) &&
          c.import_source_text === 'Smart Sync A.I.' &&
          (categories.length === 0 || categories.map((category) => category.value).includes(c.category_1)),
      );
      let totalLength = contacts.filter(
        (c) =>
          c.category_1 != 'Uncategorized' &&
          (c.approved_ai === null || c.approved_ai === false) &&
          c.import_source_text === 'Smart Sync A.I.',
      );
      setDataLength(totalLength.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
      finalData = finalData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setData(finalData);
    }
  };
  const updateContactsLocally = (action, newData) => {
    let updatedData = [...data];

    newData.forEach((updateObj) => {
      const id = updateObj.id;
      const element = updatedData.find((item) => item.id === id);

      if (element) {
        const index = updatedData.findIndex((item) => item.id === id);
        updatedData[index] = { ...element, ...updateObj };
      }
    });
    setData(updatedData);

    setSelectedPeople([]);
  };
  const updateAiSummaryTable = (id, newData) => {
    const updatedData = data.map((item) => (item.id === id ? { ...item, ...newData } : item));
    setData(updatedData);
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
                {data.first_name} {data.last_name} {type === 'delete' ? 'moved to Trash' : `"Marked as Correct"!`}
              </h1>
            </div>
            <div className="flex rounded-tr-lg rounded-br-lg p-4 bg-gray-600 text-gray-100">
              <button
                onClick={() => {
                  toast.dismiss(t.id);
                  updateContact(data.id, { ...newData, approved_ai: false }).then(() => dispatch(setRefetchData(true)));
                  updateAiSummaryTable(data.id, { ...newData, approved_ai: false });
                }}
                className="w-full border border-transparent rounded-none rounded-r-lg flex items-center justify-center text-sm leading-5 font-medium font-medium">
                Undo
              </button>
            </div>
          </div>
        ),
        { duration: 0 },
      );
      updateContact(data.id, newData).then(() => dispatch(setRefetchData(true)));
      updateAiSummaryTable(data.id, newData);
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
    updateContactsLocally(action, transformedData);
    let toastMessage =
      action == 2
        ? `${selectedPeople.length} contacts moved to Trash`
        : `${selectedPeople.length} contacts "Marked as Correct"!`;
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
                    updateContactsLocally(action, restoredData);
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

  useEffect(() => {
    fetchContacts();
  }, [categories]);

  function customSort(a, b) {
    const order = ['Client', 'Professional', 'Others'];

    if (a.category_1 === 'Trash') return 1;
    if (b.category_1 === 'Trash') return -1;

    const orderA = order.indexOf(a.category_1);
    const orderB = order.indexOf(b.category_1);

    if (orderA === -1 && orderB === -1) return 0;
    if (orderA === -1) return 1;
    if (orderB === -1) return -1;

    return orderA - orderB;
  }

  const sortedData = (Array.isArray(data) ? [...data] : []).sort(customSort);

  return (
    <div className="">
      <MainMenu />
      {loading ? (
        <div style={{ height: 'calc(100vh - 68px)' }} className="relative">
          <Loader />
        </div>
      ) : dataLength && dataLength.filter((data) => data.approved_ai != true).length ? (
        <>
          <div className="p-6 text-gray-900 font-medium text-base flex justify-between">
            <div>
              <div className=" p-2 mr-3 border-blue-500 border bg-blue-50 text-blue-600 font-semibold rounded-lg inline-block">
                {data.filter((item) => item.approved_ai != true).length} contacts
              </div>{' '}
              from Smart Synced Contacts need to be reviewed
            </div>
            <div className={'max-w-[500px] min-w-[200px]'}>
              <DropdownWithSearch
                maxMenuHeight={200}
                isMulti
                options={[
                  { value: 'Client', label: 'Client' },
                  { value: 'Professional', label: 'Professional' },
                  { value: 'Other', label: 'Other' },
                  { value: 'Trash', label: 'Trash' },
                ]}
                onChange={(choice) => {
                  setCategories(choice);
                }}
              />
            </div>
          </div>
          <SimpleBar
            autoHide={true}
            style={{
              height: '100%',
              maxHeight: selectedPeople.length > 1 ? 'calc(100vh - 140px)' : '79vh',
            }}>
            <Table
              className="pb-5"
              data={sortedData.filter((data) => data.approved_ai === null || data.approved_ai === false)}
              tableFor="ai-summary"
              checkbox={checkbox}
              handleAction={handleAction}
              checked={checked}
              toggleAll={toggleAll}
              selectedPeople={selectedPeople}
              setSelectedPeople={setSelectedPeople}
              handleCardEdit={(item) => {
                setPopupData(item);
                setShowReviewOverlay(true);
              }}
            />
          </SimpleBar>
        </>
      ) : (
        <div className="flex items-center justify-center relative">
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
      )}
      {showReviewOverlay && popupData && (
        <ReviewContact
          afterSubmit={updateAiSummaryTable}
          client={popupData}
          className="w-[1200px]"
          title="Review AI Smart Synced Contact"
          handleClose={() => setShowReviewOverlay(false)}
        />
      )}
      {selectedPeople.length > 1 && (
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
