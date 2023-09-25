import React, { useEffect, useRef, useState } from 'react';
import { PencilIcon, PlusCircleIcon, TrashIcon } from '@heroicons/react/solid';
import Feeds from 'components/shared/feeds';
import Text from 'components/shared/text';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import GoogleContact from '../../../../../public/images/googleContact.png';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import noActivityLog from '/public/images/no_activitylog.svg';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setRefetchData } from 'store/global/slice';
import SimpleBar from 'simplebar-react';
import Loader from '@components/shared/loader';
import { getAIData } from '@api/aiSmartSync';
import AIChip from '@components/shared/chip/ai-chip';
import linkIcon from '/public/images/link.svg';
import AddActivity from '@components/overlays/add-activity';
import AddSummary from '@components/overlays/add-summary';
import { DotsVerticalIcon } from '@heroicons/react/outline';
import FilterDropdown from '@components/shared/dropdown/FilterDropdown';
import clients from '../../../../pages/contacts/clients';
import { updateContact } from 'api/contacts';
import toast from 'react-hot-toast';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { updateContactLocally } from '@store/contacts/slice';
import { createPortal } from 'react-dom';

export default function ActivityLog({ contactId, source, contact }) {
  const dispatch = useDispatch();
  const [aiPreview, setAiPreview] = useState(null);
  const [aiPreviewLoading, setAiPreviewLoading] = useState(true);
  const [toggleAddActivity, setToggleAddActivity] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [openSummaryModal, setOpenSummaryModal] = useState(false);
  const summaryBackup = useRef('');

  const refetchData = useSelector((state) => state.global.refetchData);

  useEffect(() => {
    if (contact.summary !== null) {
      summaryBackup.current = contact.summary;
    }
  }, [contact.summary]);
  const activityLogData = useSelector((state) => state.clientDetails.activityLogData);
  const [activityLogLocal, setActivityLogLocal] = useState(activityLogData);
  const deleteSummary = () => {
    dispatch(updateContactLocally({ ...contact, summary: null }));
    updateContact(contact.id, { ...contact, summary: null }).then(() => {
      toast.custom(
        (t) => (
          <div
            className={`${
              t.visible ? 'animate-enter' : 'animate-leave'
            } shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 bg-gray-700 text-gray-50`}>
            <div className="flex gap-2 p-4 word-break items-center">
              <CheckCircleIcon className={'text-green-500'} />
              <h1 className={'text-sm leading-5 font-medium'}>
                Summary has been deleted <br />
                successfully!
              </h1>
            </div>
            <div className="flex rounded-tr-lg rounded-br-lg p-4 bg-gray-600 text-gray-100">
              <button
                onClick={() => {
                  dispatch(updateContactLocally({ ...contact, summary: summaryBackup.current }));
                  updateContact(contact.id, { ...contact, summary: summaryBackup.current });
                  toast.dismiss(t.id);
                }}
                className="w-full border border-transparent rounded-none rounded-r-lg flex items-center justify-center text-sm leading-5 font-medium font-medium">
                Undo
              </button>
            </div>
          </div>
        ),
        { duration: 0 },
      );
    });
  };
  const types = [
    {
      name: (
        <span className="flex flex-row">
          <PencilIcon height={20} className="text-gray6 mr-3" />
          <Text p className="text-gray6">
            {contact.summary !== null ? 'Edit Summary' : 'Add Summary'}
          </Text>
        </span>
      ),
      handleClick: () => setOpenSummaryModal(true),
    },
    {
      name: (
        <span className="flex flex-row">
          <TrashIcon height={20} className="text-red5 mr-3" />
          <Text p className="text-red5">
            Delete Summary
          </Text>
        </span>
      ),
      handleClick: () => deleteSummary(),
    },
  ];
  const fetchAiPreview = async (id) => {
    try {
      const { data } = await getAIData(id);
      setAiPreview(data);
    } catch (error) {
    } finally {
      setAiPreviewLoading(false);
    }
  };
  useEffect(() => {
    if (source == 'GmailAI') fetchAiPreview(contactId);
  }, []);
  const getSource = (source) => {
    if (source === 'GmailAI') {
      return {
        name: 'AI Smart Synced Contact.',
        icon: <AIChip reviewed={!!contact.approved_ai} />,
      };
    } else if (source === 'Manually Added') {
      return {
        name: 'Contact Added Manually',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M6.04175 13.9584H11.4584V12.7084H6.04175V13.9584ZM6.04175 10.625H13.9584V9.37508H6.04175V10.625ZM6.04175 7.29171H13.9584V6.04175H6.04175V7.29171ZM4.42316 17.0834C4.00222 17.0834 3.64591 16.9375 3.35425 16.6459C3.06258 16.3542 2.91675 15.9979 2.91675 15.577V4.42317C2.91675 4.00222 3.06258 3.64591 3.35425 3.35425C3.64591 3.06258 4.00222 2.91675 4.42316 2.91675H15.577C15.9979 2.91675 16.3542 3.06258 16.6459 3.35425C16.9375 3.64591 17.0834 4.00222 17.0834 4.42317V15.577C17.0834 15.9979 16.9375 16.3542 16.6459 16.6459C16.3542 16.9375 15.9979 17.0834 15.577 17.0834H4.42316Z"
              fill="#9CA3AF"
            />
          </svg>
        ),
      };
    } else {
      return {
        name: 'Google Contact',
        icon: <Image src={GoogleContact} height={20} width={20} />,
      };
    }
  };

  useEffect(() => {
    if (toggleAddActivity) {
      document.querySelector('.client-details-wrapper').style.setProperty('z-index', '0', 'important');
    } else {
      document.querySelector('.client-details-wrapper').style.setProperty('z-index', '10', 'important');
    }
  }, [toggleAddActivity]);

  useEffect(() => {
    setActivityLogLocal(activityLogData);
  }, [activityLogData]);

  return (
    <div className="flex bg-gray10 flex-row gap-6 flex-1">
      <div className="flex-1 m-6 p-6 mr-0 flex flex-col bg-white">
        <Text className="text-gray7 text-sm leading-5 font-medium pb-6 border-b border-gray2 mb-3">Activities</Text>
        {/*<div onClick={() => setToggleAddActivity(!toggleAddActivity)} className=" cursor-pointer">*/}
        {/*  {!toggleAddActivity ? (*/}
        {/*    <PlusCircleIcon className="text-gray3 px-4" height={20} />*/}
        {/*  ) : (*/}
        {/*    <MinusCircleIcon className="text-red4 px-4" height={20} />*/}
        {/*  )}*/}
        {/*</div>*/}
        {toggleAddActivity && (
          <AddActivity
            clientId={contactId}
            setActivities={setActivityLogLocal}
            className="min-w-[550px]"
            title={`Add Activity`}
            setAddActivityPopup={setToggleAddActivity}
            handleClose={() => setToggleAddActivity(false)}
          />
        )}

        {activityLogLocal &&
          (activityLogLocal.length == 0 ? (
            <div className=" flex flex-col flex-1 bg-white ">
              <div className="flex flex-1 flex-col items-center justify-center h-full max-w-[350px] mx-auto my-0">
                <Image height={40} src={noActivityLog}></Image>
                <Text h3 className="text-gray7 mb-6 mt-6 text-center text-sm">
                  There is no activity logged for this contact
                </Text>
                <Text p className="text-gray4 relative text-center text-xs">
                  All activities related with this contact will be shown here.
                </Text>
                <div
                  className={'flex gap-3 text-lightBlue3 mt-6 cursor-pointer'}
                  role={'button'}
                  onClick={() => setToggleAddActivity(true)}>
                  <AddCircleIcon className={'h-5 w-5'} />
                  <p className={' text-center text-sm font-medium '}>Add Activity</p>
                </div>
              </div>
            </div>
          ) : (
            <Feeds contactId={contactId} activities={activityLogLocal} setActivities={setActivityLogLocal} />
          ))}
      </div>
      <div className=" bg-white p-6 relative flex-1 flex flex-col m-6 ml-0">
        <>
          <div className={'flex justify-between items-center mb-4'}>
            <h5 className={'text-sm leading-5 font-medium text-gray7'}>Contact summary</h5>
            <FilterDropdown
              buttonClassName={'px-0'}
              types={contact.summary !== null ? types : []}
              icon={<MoreVertIcon className={'h-5 w-5 text-gray3'} />}
              positionClass={'transformDropdown w-[175px]'}
            />
          </div>
          <div className={'flex justify-between items-center pb-3 border-b border-gray2'}>
            <h6 className={'text-sm leading-5 font-medium text-gray4'}>Imported from</h6>
            <div className={'flex gap-1 items-center justify-center'}>
              {getSource(source).icon}
              <p className={'text-sm leading-5 font-medium text-gray7 '}>{getSource(source).name}</p>
            </div>
          </div>
          {contact.summary === null ? (
            <div className={'mt-10 flex flex-col flex-1 items-center justify-center'}>
              <p className={'text-gray7 text-center text-sm font-medium mb-1.5'}>No Summary for this Contact yet</p>
              <p className={'text-center font-inter text-gray-500 text-sm font-normal leading-5'}>
                Write a short summary so you can easily
                <br /> identify this client.
              </p>
              <div
                className={'flex gap-3 text-lightBlue3 mt-6 cursor-pointer'}
                role={'button'}
                onClick={() => setOpenSummaryModal(true)}>
                <AddCircleIcon className={'h-5 w-5'} />
                <p className={' text-center text-sm font-medium '}>Add Summary</p>
              </div>
            </div>
          ) : (
            <p className={'text-sm leading-5 font-normal text-gray7 mt-3 break-all'}>{contact.summary}</p>
          )}
        </>
      </div>
      {openSummaryModal && (
        <AddSummary
          title={contact.summary === null ? 'Add summary' : 'Edit summary'}
          handleClose={() => setOpenSummaryModal(false)}
          client={contact}
          className={'w-[632px]'}
        />
      )}
    </div>
  );
}
