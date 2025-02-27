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
import { getContactNotes, getContact, getContactActivities, getContactLookingProperties } from 'api/contacts';
import { getContactCampaign } from 'api/campaign';
import {
  setActivityLogData,
  setNotesData,
  setCampaignsData,
  setLookingFor,
  setLookingForData,
} from 'store/clientDetails/slice';
import ReviewContact from '@components/overlays/review-contact';
import { getAIData } from '@api/aiSmartSync';
import toast from 'react-hot-toast';
import Loader from '@components/shared/loader';
import withAuth from '@components/withAuth';
import MainMenuV2 from '@components/shared/menu/menu-v2';

const index = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;

  const refetchPart = useSelector((state) => state.global.refetchPart);
  const refetchData = useSelector((state) => state.global.refetchData);
  const contacts = useSelector((state) => state.contacts.allContacts.data);
  // const contact = contacts.find((contact) => contact.id == id);
  const [showReviewOverlay, setShowReviewOverlay] = useState(false);
  const [loadingTabs, setLoadingTabs] = useState(true);
  const [contact, setContact] = useState(null);
  const [fetchContactRequired, setFetchContactRequired] = useState(false);
  const [current, setCurrent] = useState(0);
  const localTabs = tabs(id, contact);

  const getActivityLog = async () => {
    const activityLogResponse = await getContactActivities(id).catch((error) => {
      console.log(error);
      toast.error('Error fetching activity');
    });
    const activityLogData = activityLogResponse?.data;
    dispatch(setActivityLogData(activityLogData.data));
  };
  const getContactData = () => {
    getContact(id).then((result) => setContact(result.data));
  };

  const getLookingFor = () => {
    getContactLookingProperties(id)
      .then((propertiesResponse) => {
        const propertiesData = propertiesResponse.data;
        dispatch(setLookingForData(propertiesData.data));
      })
      .catch((error) => {
        console.log(error);
        toast.error('Error fetching looking for');
      });
  };
  const getNotes = () => {
    getContactNotes(id)
      .then((notesResponse) => {
        const notesData = notesResponse.data;
        dispatch(setNotesData(notesData.data));
      })
      .catch((error) => {
        console.log(error);
        toast.error('Error fetching notes');
      });
  };
  const getCampaigns = () => {
    getContactCampaign(id)
      .then((campaignsResponse) => {
        const campaignsData = campaignsResponse.data;
        dispatch(setCampaignsData(campaignsData));
      })
      .catch((error) => {
        console.log(error);
        toast.error('Error fetching campaigns');
      });
  };
  useEffect(() => {
    if (contact?.import_source === 'GmailAI' && contact?.approved_ai !== true) {
      setShowReviewOverlay(true);
    }
  }, [contact?.import_source, contact?.approved_ai]);
  const resetData = () => {
    dispatch(setNotesData(null));
    dispatch(setCampaignsData(null));
    dispatch(setActivityLogData(null));
  };
  const fetchContact = async () => {
    resetData();
    let contactData = contacts.find((contact) => contact.id == id);
    setContact(contactData);
    await getActivityLog();
    setLoadingTabs(false);
    getCampaigns();
    getLookingFor();
    getNotes();
  };
  useEffect(() => {
    localStorage.getItem('route');
  }, []);
  useEffect(() => {
    if (refetchPart == 'notes') {
      getNotes();
      dispatch(setRefetchPart(null));
    } else if (refetchPart == 'activity-log') {
      getActivityLog();
      dispatch(setRefetchPart(null));
    } else if (refetchPart == 'campaigns') {
      getCampaigns();
      getContactData();
      dispatch(setRefetchPart(null));
    } else if (refetchPart == 'looking-for') {
      getLookingFor();
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
  const campaign_id = JSON.parse(localStorage.getItem('id'));
  const campaign = JSON.parse(localStorage.getItem('category'));

  const tempUrl =
    campaign_id && campaign
      ? 'Campaigns'
      : contact?.category_id === 14 || contact?.category_id === 13
        ? 'family'
        : contact?.category_2 === 'Uncategorized'
          ? 'uncategorized'
          : contact?.category_id === 2
            ? 'unknown'
            : contact?.category_1 === 'Trash' || contact?.category_1 === 'Uncategorized'
              ? contact?.category_1
              : `${contact?.category_1}s`;

  useEffect(() => {
    if (campaign_id && campaign) {
      setBackUrl(`/campaign/details?id=${campaign_id}&category=${campaign}`);
    } else if (contact?.category_1) {
      setBackUrl(`/contacts/${tempUrl.toLowerCase()}`);
    }
  }, [contact, campaign_id, campaign]);

  return (
    <>
      <MainMenuV2 />
      {showReviewOverlay && (
        <ReviewContact
          showToast
          hideCloseButton
          redirectAfterMoveToTrash
          handleClose={() => setShowReviewOverlay(false)}
          title="Review AI Imported Contact"
          client={contact}
        />
      )}
      {['GmailAI', 'Gmail', 'Smart Sync A.I.'].includes(contact?.import_source) && contact.approved_ai !== true && (
        <ReviewContact
          showToast
          hideCloseButton
          redirectAfterMoveToTrash
          handleClose={() => setShowReviewOverlay(false)}
          title="Review AI Imported Contact"
          client={contact}
        />
      )}
      <div className="client-details-page-wrapper">
        {!contact ? (
          <div className="relative h-full" style={{ height: 'calc(100vh - 68px) !important' }}>
            <Loader />
          </div>
        ) : (
          <>
            {id && (
              <div className="flex flex-row border-t border-gray-2">
                <ClientDetailsSidebar
                  client={contact}
                  backButton={
                    <div className="pl-6 pt-6 inline-block">
                      <a
                        href="#"
                        onClick={() => {
                          backUrl !== null ? router.push(backUrl) : router.back();
                        }}
                        className="items-center flex">
                        <Image className="cursor-pointer" src={backArrow} />
                        <div className="ml-2 font-medium">
                          Back to{' '}
                          {tempUrl.charAt(0).toUpperCase() + tempUrl.slice(1) == 'Family'
                            ? 'Family & Friends'
                            : tempUrl.charAt(0).toUpperCase() + tempUrl.slice(1)}
                        </div>
                      </a>
                    </div>
                  }
                  // afterUpdate={fetchContact}
                />
                <Tabs
                  loadingTabs={loadingTabs}
                  current={current}
                  setCurrent={setCurrent}
                  className="px-6 pb-6"
                  tabs={localTabs}
                />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};
export default withAuth(index);

// export async function getServerSideProps(context) {
//   return {
//     props: {
//       requiresAuth: true,
//     },
//   };
// }

// export const getStaticPaths = async () => {
//   return {
//     paths: [],
//     fallback: 'blocking',
//   };
// };
