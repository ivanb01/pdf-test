import React, { useEffect, useRef, useState } from 'react';
import { MinusCircleIcon, PencilIcon, PlusCircleIcon, TrashIcon } from '@heroicons/react/solid';
import Feeds from 'components/shared/feeds';
import Text from 'components/shared/text';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import GoogleContact from '../../../../../public/images/GoogleContact.png';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import noActivityLog from '/public/images/no_activitylog.svg';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setRefetchData } from 'store/global/slice';
import SimpleBar from 'simplebar-react';
import Loader from '@components/shared/loader';
// import { getAIData } from '@api/aiSmartSync';
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
import { formatDateLL, getSource } from '@global/functions';

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

  useEffect(() => {
    console.log(activityLogLocal, 'activityLogLocal');
  }, [activityLogLocal]);
  const deleteSummary = () => {
    dispatch(updateContactLocally({ ...contact, summary: null }));
    updateContact(contact.id, { ...contact, summary: null }).then(() => {
      toast.custom(
        (t) => (
          <div
            className={`${
              t.visible ? 'animate-enter' : 'animate-leave'
            } shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 bg-gray-700 text-gray-50`}
          >
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
                className="w-full border border-transparent rounded-none rounded-r-lg flex items-center justify-center text-sm leading-5 font-medium font-medium"
              >
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
  // const fetchAiPreview = async (id) => {
  //   try {
  //     const { data } = await getAIData(id);
  //     setAiPreview(data);
  //   } catch (error) {
  //   } finally {
  //     setAiPreviewLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   if (source == 'GmailAI') fetchAiPreview(contactId);
  // }, []);

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
        <div className={'flex items-center justify-between  border-b border-gray2 mb-3  pb-6'}>
          <Text className="text-gray7 text-sm leading-5 font-medium ">Activities</Text>
          {activityLogLocal && activityLogLocal.length > 0 && (
            <div onClick={() => setToggleAddActivity(true)} className="mr-3 text-gray3 cursor-pointer">
              <AddCircleIcon className="h-5 w-5" onClick={() => setToggleAddActivity(true)} />
            </div>
          )}
        </div>
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
                  onClick={() => setToggleAddActivity(true)}
                >
                  <AddCircleIcon className={'h-5 w-5'} />
                  <p className={' text-center text-sm font-medium '}>Add Activity</p>
                </div>
              </div>
            </div>
          ) : (
            <Feeds
              height="52vh"
              contactId={contactId}
              activities={activityLogLocal}
              setActivities={setActivityLogLocal}
            />
          ))}
      </div>
      <div className=" bg-white p-6 relative flex-1 flex flex-col m-6 ml-0">
        <>
          <div className={'flex justify-between items-center mb-4'}>
            <h5 className={'text-sm leading-5 font-medium text-gray7'}>Contact summary</h5>
            {/*<FilterDropdown*/}
            {/*  buttonClassName={'px-0'}*/}
            {/*  types={contact.summary !== null ? types : []}*/}
            {/*  icon={<MoreVertIcon className={'h-5 w-5 text-gray3'} />}*/}
            {/*  positionClass={'transformDropdown w-[175px]'}*/}
            {/*/>*/}
          </div>
          {(getSource(source).name === 'AI Smart Synced Contact.' || getSource(source).name === 'GmailAI') && (
            <div className="text-xs mb-2 text-gray4 font-medium">Date Imported: {formatDateLL(contact.created_at)}</div>
          )}
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
                onClick={() => setOpenSummaryModal(true)}
              >
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
