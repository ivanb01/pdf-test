import { useEffect, useState } from 'react';
import MainMenu from 'components/shared/menu';
import ClientDetailsSidebar from 'components/client-details-sidebar';
import Tabs from 'components/shared/tabs';
import { tabs } from 'components/client-details-sidebar/list';
import { useRouter } from 'next/router';
import backArrow from '/public/images/back-arrow.svg';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { setRefetchData, setRefetchPart } from 'store/global/slice';
import { getContactNotes, getContact, getContactActivities } from 'api/contacts';
import { getContactCampaign } from 'api/campaign';
import { setActivityLogData, setNotesData, setCampaignsData } from 'store/clientDetails/slice';
import ReviewContact from '@components/overlays/review-contact';
import { getAIData } from '@api/aiSmartSync';
import toast from 'react-hot-toast';
import Loader from '@components/shared/loader';

export default function Details() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;

  const refetchPart = useSelector((state) => state.global.refetchPart);
  const refetchData = useSelector((state) => state.global.refetchData);
  const contacts = useSelector((state) => state.contacts.allContacts.data);
  // const contact = contacts.find((contact) => contact.id == id);
  const [showReviewOverlay, setShowReviewOverlay] = useState(false);
  const [loadingTabs, setLoadingTabs] = useState(true);
  const [aiData, setAIData] = useState(null);
  const [contact, setContact] = useState(null);
  const [fetchContactRequired, setFetchContactRequired] = useState(false);
  const [current, setCurrent] = useState(0);

  const localTabs = tabs(id, contact);

  const getActivityLog = async () => {
    const activityLogResponse = await getContactActivities(id).catch((error) => {
      toast.error('Error fetching activity log: ', error);
    });
    const activityLogData = activityLogResponse.data;
    dispatch(setActivityLogData(activityLogData.data));
  };
  const getNotes = () => {
    getContactNotes(id)
      .then((notesResponse) => {
        const notesData = notesResponse.data;
        dispatch(setNotesData(notesData.data));
      })
      .catch((error) => {
        toast.error('Error fetching notes:', error);
      });
  };
  const getCampaigns = () => {
    getContactCampaign(id)
      .then((campaignsResponse) => {
        const campaignsData = campaignsResponse.data;
        dispatch(setCampaignsData(campaignsData));
      })
      .catch((error) => {
        toast.error('Error fetching campaigns:', error);
      });
  };
  const getAISummary = () => {
    getAIData(id)
      .then((result) => {
        setAIData(result.data);
        setShowReviewOverlay(true);
      })
      .catch((error) => {
        toast.error('Error fetching ai summary:', error);
      });
  };
  const fetchContact = async () => {
    let contactData = contacts.find((contact) => contact.id == id);
    setContact(contactData);
    if (!contactData.approved_ai && contactData.import_source === 'GmailAI') {
      getAISummary();
    }
    await getActivityLog();
    setLoadingTabs(false);
    getCampaigns();
    getNotes();
  };

  useEffect(() => {
    if (refetchPart == 'notes') {
      getNotes();
      dispatch(setRefetchPart(null));
    } else if (refetchPart == 'activity-log') {
      getActivityLog();
      dispatch(setRefetchPart(null));
    }
  }, [refetchPart]);

  useEffect(() => {
    if (refetchData) {
      fetchContact().then(() => dispatch(setRefetchData(false)));
    }
  }, [refetchData]);

  useEffect(() => {
    if (contacts) {
      id && fetchContact();
    }
  }, [contacts, fetchContactRequired, id]);

  const [backUrl, setBackUrl] = useState(null);
  const tempUrl = contact?.category_1 === 'Trash' || contact?.category_1 === 'Uncategorized' || contact?.category_1 === 'Other' ? contact?.category_1 : `${contact?.category_1}s`;
  useEffect(() => {


    if (contact?.category_1) {
      setBackUrl(`/contacts/${(tempUrl).toLowerCase()}`);
    }
  }, [contact]);

  return (
    <>
      <MainMenu />
      {showReviewOverlay && (
        <ReviewContact
          showToast
          hideCloseButton
          redirectAfterMoveToTrash
          handleClose={() => setShowReviewOverlay(false)}
          title='Review AI Imported Contact'
          client={aiData}
        />
      )}
      <div className='client-details-page-wrapper'>
        {!contact ? (
          <div className='relative h-full' style={{ height: 'calc(100vh - 68px) !important' }}>
            <Loader />
          </div>
        ) : (
          <>
            <div className='p-6 inline-block'>
              <a href='#' onClick={() => {
                backUrl !== null ? router.push(backUrl) : router.back();
              }} className='items-center flex'>
                <Image className='cursor-pointer' src={backArrow} />
                <div className='ml-2 font-medium'>Back
                  to {tempUrl}</div>
              </a>
            </div>
            {id && (
              <div className='flex flex-row border-t border-gray-2'>
                <ClientDetailsSidebar
                  client={contact}
                  // afterUpdate={fetchContact}
                />
                <Tabs
                  loadingTabs={loadingTabs}
                  current={current}
                  setCurrent={setCurrent}
                  className='px-6 pb-6'
                  tabs={localTabs}
                />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export async function getStaticProps(context) {
  return {
    props: {
      requiresAuth: true,
    },
  };
}

// export const getStaticPaths = async () => {
//   return {
//     paths: [],
//     fallback: 'blocking',
//   };
// };
