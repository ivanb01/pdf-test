import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import MainMenu from 'components/shared/menu';
import ReviewContact from '@components/overlays/review-contact';
import Delete from '@mui/icons-material/Delete';
import CheckCircle from '@mui/icons-material/CheckCircle';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { bulkUpdateContacts, updateContact } from '@api/contacts';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { setRefetchData } from '@store/global/slice';
import { useDispatch, useSelector } from 'react-redux';
import backBtn from '/public/images/back.svg';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import withAuth from '@components/withAuth';
import { formatDateStringMDY, getContactStatusByStatusId, getContactStatusColorByStatusId } from '@global/functions';
import DropdownWithSearch from '@components/dropdownWithSearch';
import ContactInfo from '@components/shared/table/contact-info';
import Chip from '@components/shared/chip';
import Launch from '@mui/icons-material/Launch';
import TooltipComponent from '@components/shared/tooltip';
import Edit from '@mui/icons-material/Edit';
import SpinnerLoader from '@components/shared/SpinnerLoader';
import { setAIUnApprovedContacts, setTotal } from '@store/AIUnapproved/slice';
import Loader from '@components/shared/loader';
import { getUnapprovedAI } from '@api/aiSmartSync';
import Close from '@mui/icons-material/Close';
import { CloseRounded } from '@mui/icons-material';

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
  const [totalContacts, setTotalContacts] = useState();
  const [ai_unapprovedContacts, setAIUnapprovedContacts] = useState([]);
  const ai_unapproved_contacts_redux = useSelector((state) => state.AIAUnapprovedContacts.ai_unapproved_contacts);
  const total_redux = useSelector((state) => state.AIAUnapprovedContacts.total);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [error, setError] = useState();
  const [offset, setOffset] = useState(0);
  const [globalLoading, setGlobalLoading] = useState(false);

  useLayoutEffect(() => {
    const isIndeterminate = selectedPeople?.length > 0 && items && selectedPeople?.length < items.length;
    if (items?.length > 0) {
      setChecked(selectedPeople?.length === items?.length);
    } else {
      setChecked(false);
    }
    setIndeterminate(isIndeterminate);
    if (checkbox.current) {
      checkbox.current.indeterminate = isIndeterminate;
    }
  }, [selectedPeople, checkbox, ai_unapprovedContacts, checked]);

  useEffect(() => {
    setTotalContacts(total_redux);
  }, [total_redux]);
  const toggleAll = () => {
    setSelectedPeople(checked || indeterminate ? [] : items);
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  };
  const loadItems = (offset) => {
    return getUnapprovedAI(15, offset)
      .then((response) => {
        return {
          hasNextPage: true,
          data: response.data.data,
          count: response.data.count,
          total: response.data.total,
          fistTimeLoad: true,
        };
      })
      .catch((error) => {
        toast.error('Error while loading items');
        throw error;
      });
  };

  async function loadMore() {
    try {
      const { data, count, total, hasNextPage: newHasNextPage } = await loadItems(offset);
      setGlobalLoading(false);
      dispatch(setTotal(total));
      setItems((current) => {
        const currentSet = new Set(current.map((item) => item.id));
        const newData = data.filter((item) => !currentSet.has(item.id));
        return [...current, ...newData];
      });

      setOffset(offset + count);
      setHasNextPage(newHasNextPage);
      if (offset + count === total) {
        setHasNextPage(false);
        return;
      }
    } catch (err) {
      setError(err);
    } finally {
      setGlobalLoading(true);
      setLoading(false);
    }
  }

  const updateContactsLocally = (action, newData) => {
    let updatedData = [...ai_unapproved_contacts_redux];

    newData.forEach((updateObj) => {
      const id = updateObj.id;
      const element = updatedData.find((item) => item.id === id);

      if (element) {
        const index = updatedData.findIndex((item) => item.id === id);
        updatedData[index] = { ...element, ...updateObj };
      }
    });

    // dispatch(setAIUnApprovedContacts(updatedData));
    setSelectedPeople([]);
  };
  const allData = ai_unapproved_contacts_redux ? [...ai_unapproved_contacts_redux] : [];
  const updateAiSummaryTable = (id, newData) => {
    // setTotalContacts((prevState) => prevState + 1);
    dispatch(setAIUnApprovedContacts(allData));
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
            } shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 bg-gray-700 text-gray-50`}
          >
            <div className='flex gap-2 p-4 word-break items-center'>
              <CheckCircleIcon className={'text-green-500'} />
              <h1 className={'text-sm leading-5 font-medium'}>
                {data.first_name} {data.last_name} {type === 'delete' ? 'moved to Trash' : `"Marked as Correct"!`}
              </h1>
            </div>
            <div className='flex rounded-tr-lg rounded-br-lg p-4 bg-gray-600 text-gray-100'>
              <button
                onClick={() => {
                  toast.dismiss(t.id);
                  dispatch(setAIUnApprovedContacts(allData));
                  setTotalContacts((prevState) => prevState + 1);
                  updateContact(data.id, { ...newData, approved_ai: false }).then(() => dispatch(setRefetchData(true)));
                  // updateAiSummaryTable(data.id, { ...newData, approved_ai: false });
                }}
                className='w-full border border-transparent rounded-none rounded-r-lg flex items-center justify-center text-sm leading-5 font-medium font-medium'
              >
                Undo
              </button>
            </div>
          </div>
        ),
        { duration: 0, position:'top-left' },
      );
      const removeItemsFromTable = ai_unapprovedContacts.filter((contact) => contact.id !== data.id);
      dispatch(setAIUnApprovedContacts(removeItemsFromTable));
      setTotalContacts((prevState) => prevState - 1);

      updateContact(data.id, newData).then(() => dispatch(setRefetchData(true)));
      // updateAiSummaryTable(data.id, newData);
      if (checkbox.current) {
        checkbox.current.indeterminate = false;
      }
    } catch (error) {
    }
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
    const filtered = ai_unapproved_contacts_redux.filter((item) => !secondListValues.includes(item.id));
    dispatch(setAIUnApprovedContacts(filtered));
    setTotalContacts(filtered.length);
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
            } shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 bg-gray-700 text-gray-50`}
          >
            <div className='flex gap-2 p-4 word-break'>
              <CheckCircleIcon className={'text-green-500'} />
              <h1 className={'text-sm leading-5 font-medium'}>{toastMessage}</h1>
            </div>
            <div className='flex rounded-tr-lg rounded-br-lg  p-4 bg-gray-600 text-gray-100'>
              <button
                onClick={() => {
                  toast.dismiss(t.id);
                  bulkUpdateContacts({ contacts: restoredData }).then(() => dispatch(setRefetchData(true)));
                  // updateContactsLocally(action, restoredData);
                  setTotalContacts(allData.length);
                  dispatch(setAIUnApprovedContacts(allData));
                }}
                className='w-full border border-transparent rounded-none rounded-r-lg flex items-center justify-center text-sm leading-5 font-medium font-medium'
              >
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
    const secondListValues = categories.map((item) => item.value);

    const filtered =
      categories.length > 0
        ? ai_unapproved_contacts_redux.filter((item) => secondListValues.includes(item.category_1))
        : ai_unapproved_contacts_redux ?? [];
    setAIUnapprovedContacts([...filtered]);
  }, [categories, ai_unapproved_contacts_redux]);

  const [infiniteRef, { rootRef }] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    disabled: !!error,
  });
  useEffect(() => {
    setAIUnapprovedContacts(ai_unapproved_contacts_redux);
  }, [ai_unapproved_contacts_redux]);

  useEffect(() => {
    function isInUnapprovedContacts(person) {
      return ai_unapproved_contacts_redux.some(contact => contact.id === person.id); // Assuming id is the unique identifier
    }

// Filter selectedPeople array to keep only those elements which are also in ai_unapproved_contacts_redux
    const filteredSelectedPeople = selectedPeople.filter(person => isInUnapprovedContacts(person));

// Now filteredSelectedPeople contains only those elements which are present in both arrays
    setSelectedPeople(filteredSelectedPeople)
    console.log(selectedPeople, 'selectedPeople', ai_unapproved_contacts_redux, 'ai_unapproved_contacts_redux');
  }, [ ai_unapproved_contacts_redux]);
  useEffect(() => {
    dispatch(setAIUnApprovedContacts([...items]));
  }, [items]);
  useEffect(() => {
    loadMore();
  }, []);
  return (
    <div>
      <MainMenu />
      {globalLoading === false && offset === 0 ? (
        <div style={{ height: 'calc(100vh - 68px)' }} className='relative'>
          <Loader />
        </div>
      ) : ai_unapproved_contacts_redux.length > 0 ? (
        <>
          <div className='p-6 text-gray-900 font-medium text-base flex justify-between items-center'>
            <div>
              <div
                className=' p-2 mr-3 border-blue-500 border bg-blue-50 text-blue-600 font-semibold rounded-lg inline-block'>
                {totalContacts ? totalContacts : 0} contacts
              </div>
              from Smart Synced Contacts need to be reviewed
            </div>
            <div>
              <CloseRounded className='cursor-pointer' onClick={() => router.push('/contacts/clients')} />
            </div>
            {/*<div className={'max-w-[500px] min-w-[200px]'}>*/}
            {/*  <DropdownWithSearch*/}
            {/*    placeholder={'Filter...'}*/}
            {/*    maxMenuHeight={200}*/}
            {/*    isMulti*/}
            {/*    options={[*/}
            {/*      { value: 'Client', label: 'Clients' },*/}
            {/*      { value: 'Professional', label: 'Professionals' },*/}
            {/*      { value: 'Other', label: 'Other' },*/}
            {/*      { value: 'Uncategorized', label: 'Uncategorized' },*/}
            {/*      { value: 'Trash', label: 'Trash' },*/}
            {/*    ]}*/}
            {/*    onChange={(choice) => {*/}
            {/*      setCategories(choice);*/}
            {/*    }}*/}
            {/*  />*/}
            {/*</div>*/}
          </div>
          <div style={{ overflow: 'auto', height: '79vh', width: '100vw' }} ref={rootRef}>
            <table className={'w-full'}>
              <thead className='bg-gray-50'>
              <tr>
                <th
                  scope='col'
                  className='h-[56px] py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6 flex items-center w-[300px]'
                >
                  <input
                    type='checkbox'
                    className='h-4 w-4 mr-4 rounded border-gray-300 text-lightBlue3 focus:ring-lightBlue3'
                    ref={checkbox && checkbox}
                    checked={checked}
                    onChange={toggleAll}
                  />
                  Contact
                </th>
                <th
                  scope='col'
                  className='px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500'
                >
                  Type
                </th>
                <th
                  scope='col'
                  className='px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500'
                >
                  Status
                </th>
                <th
                  scope='col'
                  className='px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 '
                >
                  Email Summary
                </th>
                <th
                  scope='col'
                  className='px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 w-[150px]'
                >
                  Imported Date
                </th>
                <th
                  scope='col'
                  className='px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500'
                >
                  Actions
                </th>
                <th
                  scope='col'
                  className='px-3 pr-1 text-center text-xs font-medium uppercase tracking-wide text-gray-500'
                ></th>
              </tr>
              </thead>
              <tbody className=' bg-white'>
              {ai_unapprovedContacts?.map((dataItem, index) => (
                <tr
                  key={dataItem.index}
                  className='hover:bg-lightBlue1 cursor-pointer contact-row group bg-white group border-b border-gray-200'
                  // onClick={(event) => handleClickRow(contact, event)}
                  onClick={(e) => {
                    if (e.target.type === 'checkbox') return;
                    handleCardEdit(dataItem);
                  }}
                >
                  {/*onClick={(event) => handleClickRow(dataItem, event)}>*/}
                  <td className='whitespace-nowrap py-4 text-sm pl-6 flex items-center'>
                    <input
                      type='checkbox'
                      className='mr-4 h-4 w-4 rounded border-gray-300 text-lightBlue3 focus:ring-lightBlue3'
                      value={dataItem.email}
                      checked={selectedPeople?.includes(dataItem)}
                      onChange={(e) =>
                        setSelectedPeople(
                          e.target.checked
                            ? [...selectedPeople, dataItem]
                            : selectedPeople.filter((p) => p !== dataItem),
                        )
                      }
                    />
                    <ContactInfo
                      data={{
                        // name: `${dataItem.first_name + ' ' + dataItem.last_name}`,
                        name: `${dataItem.first_name} ${dataItem.last_name}`,
                        id: dataItem.id,
                        email: dataItem.email,
                        // image: dataItem.profile_image_path,
                      }}
                      maxWidth={'300px'}

                      // handleSelect={(e, dataItem) =>
                      //   handleSelectContact(e, dataItem)
                      // }
                      // handleAction={(id, action) => handleAction(id, action)}
                    />
                  </td>
                  <td className='max-w-[150px] text-left px-3 py-4 text-sm text-gray-500 type-and-status'>
                    <Chip className='break-words' typeStyle>
                      {dataItem?.category_2}
                    </Chip>
                  </td>
                  <td className='whitespace-nowrap text-left px-3 py-4 text-sm text-gray-500'>
                    <Chip
                      statusStyle
                      className={getContactStatusColorByStatusId(dataItem.category_id, dataItem.status_id)}
                    >
                      {getContactStatusByStatusId(dataItem.category_id, dataItem.status_id)}
                    </Chip>
                  </td>
                  <td className=' text-left px-3 py-4 text-sm text-gray-500 type-and-status'>
                    <div className=' flex items-center break-all'>
                      {dataItem.summary && (
                        <a
                          href={dataItem.email_link}
                          onClick={(e) => e.stopPropagation()}
                          target='_blank'
                          rel='noreferrer'
                        >
                          <Launch className='h-5 w-5 text-blue-500 mr-2' />
                        </a>
                      )}
                      {dataItem.summary ? <div className='email-summary-styling'>{dataItem.summary}</div> : '-'}
                    </div>
                  </td>
                  <td className=' text-left px-3 py-4 text-sm text-gray-500 type-and-status'>
                    {formatDateStringMDY(dataItem.created_at)}
                  </td>
                  <td className='whitespace-nowrap text-left px-3 py-4 text-sm text-gray-500'>
                    <div className='flex items-center justify-center gap-6'>
                      <TooltipComponent
                        side={'top'}
                        align='center'
                        triggerElement={
                          <div
                            role={'button'}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAction('approve', dataItem);
                            }}
                            className='transition-all rounded-[4px] cursor-pointer hover:bg-green-500 hover:text-white bg-green-50 text-green-500 w-7 h-7 flex items-center justify-center relative'
                          >
                            <CheckCircle
                              id={'edit-contact-icon-' + dataItem.id}
                              className='group-hover/check:text-white text-[16px]'
                            />
                          </div>
                        }
                      >
                        <p className=' text-xs font-medium text-white'>Mark as Correct</p>
                      </TooltipComponent>
                      <TooltipComponent
                        side={'top'}
                        align='center'
                        triggerElement={
                          <div
                            role={'button'}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCardEdit(dataItem);
                            }}
                            className=' h-6 w-6 cursor-pointer rounded-full bg-gray1 hover:bg-gray2 flex items-center justify-center relative'
                          >
                            <Edit className='text-gray3 w-4 h-4' />
                          </div>
                        }
                      >
                        <p className=' text-xs font-medium text-white'> Edit Contact</p>
                      </TooltipComponent>
                      <TooltipComponent
                        side={'top'}
                        align='center'
                        triggerElement={
                          <div
                            role={'button'}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAction('delete', dataItem);
                            }}
                            className=' transition-all rounded-[4px] cursor-pointer hover:bg-red-500 hover:text-white bg-red-50 text-[#ff6d6d] w-7 h-7 flex items-center justify-center relative'
                          >
                            <Delete className='group-hover/delete:text-white text-[16px]' />
                          </div>
                        }
                      >
                        <p className=' text-xs font-medium text-white'> Move to trash</p>
                      </TooltipComponent>
                    </div>
                  </td>
                  <td className='pr-1'></td>
                </tr>
              ))}
              </tbody>
            </table>
            {hasNextPage && (
              <div ref={infiniteRef}>
                <SpinnerLoader />
              </div>
            )}
          </div>
        </>
      ) : (
        <div className='flex items-center justify-center relative'>
          <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50'>
            <lottie-player
              src='/animations/aisummary1.json'
              background='transparent'
              speed='1'
              style={{ height: '300px' }}
              autoplay
            ></lottie-player>
            <div className='-mt-10 text-gray-900 text-center'>
              <div className='font-semibold text-lg'>Well Done!</div>
              <div className='mt-3'>You reviewed all contacts imported by AI from Gmail.</div>
            </div>
            <div
              onClick={() => router.push('/contacts/clients')}
              className='cursor-pointer flex items-center mt-20 text-center justify-center text-lightBlue3 font-medium text-sm'
            >
              <img className='mr-2' src={backBtn.src} alt='' />
              Back to Contacts
            </div>
          </div>
          <lottie-player
            src='/animations/aisummary2.json'
            background='transparent'
            speed='1'
            style={{ width: '100%', height: 'calc(100vh - 68px)' }}
            autoplay
          ></lottie-player>
        </div>
      )}
      {showReviewOverlay && popupData && (
        <ReviewContact
          afterSubmit={updateAiSummaryTable}
          client={popupData}
          className='w-[1200px]'
          title='Review AI Smart Synced Contact'
          handleClose={() => {
            // setTotalContacts((prevState) => prevState - 1);
            setShowReviewOverlay(false);
          }}
        />
      )}
      {selectedPeople?.length > 1 && (
        <div
          className='bg-white fixed left-0 right-0 bottom-0 flex items-center justify-between py-4 px-6 space-x-2 fixed-categorize-menu'>
          <div className='flex items-center text-sm text-gray-900'>
            Selected: <span className='font-bold ml-1'>{selectedPeople.length} contacts</span>
          </div>
          <div className='flex'>
            <button
              onClick={() => {
                bulkUpdate(2);
              }}
              className='hover:bg-red-500 hover:text-white transition-all text-sm min-w-[185px] flex items-center justify-center mr-4 font-medium py-[6px] px-3 rounded-[4px] bg-red-50 text-red-500'
            >
              <Delete /> <span className='ml-2'>Move to Trash</span>
            </button>
            <button
              onClick={() => bulkUpdate(1)}
              className='hover:bg-[#10B981] hover:text-white transition-all text-sm min-w-[185px] flex items-center justify-center font-medium py-[6px] px-3 rounded-[4px] bg-green-50 text-[#10B981]'
            >
              <CheckCircle />
              <span className='ml-2'>Mark as Correct</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default withAuth(index);
