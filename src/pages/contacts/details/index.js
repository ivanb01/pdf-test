import { useState } from 'react';
import Breadcrumbs from 'components/shared/breadcrumbs';
import MainMenu from 'components/shared/menu';
import ClientDetailsSidebar from 'components/client-details-sidebar';
import Tabs from 'components/shared/tabs';
import { tabs } from 'components/client-details-sidebar/list';
import { menuItems } from 'global/variables';
import { useRouter } from 'next/router';
import backArrow from '/public/images/back-arrow.svg';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import * as contactServices from 'api/contacts';
import Loader from 'components/shared/loader';
import { setRefetchData } from 'store/global/slice';
import { getContactNotes, getContact, getContactActivities } from 'api/contacts';
import { getContactCampaign } from 'api/campaign';
import { setActivityLogData, setNotesData, setCampaignsData } from 'store/clientDetails/slice';
import ReviewContact from '@components/overlays/review-contact';
import { getAIData } from '@api/aiSmartSync';
import toast from 'react-hot-toast';

export default function Details() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;

  const refetchData = useSelector((state) => state.global.refetchData);
  const contacts = useSelector((state) => state.contacts.allContacts.data);
  // const contact = contacts.find((contact) => contact.id == id);
  const [showReviewOverlay, setShowReviewOverlay] = useState(false);
  const [loadingTabs, setLoadingTabs] = useState(true);
  const [aiData, setAIData] = useState(null);
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchContactRequired, setFetchContactRequired] = useState(false);
  const [current, setCurrent] = useState(0);

  const [overlays, setOverlays] = useState({
    deleteClient: false,
    editClient: false,
    assignCampaign: false,
    unassignCampaign: false,
  });
  const handleDeleteClientChange = (state) => () => setOverlays({ deleteClient: state });
  const handleEditClientChange = (state) => () => setOverlays({ editClient: state });
  const handleAssignCampaignChange = (state) => () => setOverlays({ assignCampaign: state });
  const handleUnassignCampaignChange = (state) => () => setOverlays({ unassignCampaign: state });

  const localTabs = tabs(id, contact);

  const fetchContact = async () => {
    try {
      let contact = contacts.find((contact) => contact.id == id);
      setContact(contact);

      // Fetch activityLog
      const activityLogResponse = await getContactActivities(id);
      const activityLogData = activityLogResponse.data.data;
      dispatch(setActivityLogData(activityLogData));
      setLoadingTabs(false);

      if (contact.approved_ai !== true && contact.import_source === 'GmailAI') {
        getAIData(contact.id).then((result) => {
          setAIData(result.data);
          setShowReviewOverlay(true);
        });
      }

      getContactCampaign(id)
        .then((campaignsResponse) => {
          const campaignsData = campaignsResponse.data;
          dispatch(setCampaignsData(campaignsData));
        })
        .catch((error) => {
          toast.error('Error fetching campaigns:', error);
        });

      getContactNotes(id)
        .then((notesResponse) => {
          const notesData = notesResponse.data;
          dispatch(setNotesData(notesData));
        })
        .catch((error) => {
          toast.error('Error fetching notes:', error);
        });
    } catch (error) {
      toast.error('Error fetchign activity log', error);
    }
  };

  // useEffect(() => {
  //   if (router.query.campaigns) {
  //     setCurrent(1);
  //   }
  // }, []);

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

  return (
    <>
      <MainMenu />
      {showReviewOverlay && (
        <ReviewContact
          showToast
          hideCloseButton
          redirectAfterMoveToTrash
          handleClose={() => setShowReviewOverlay(false)}
          title="Review AI Imported Contact"
          client={aiData}
        />
      )}
      <div className="client-details-page-wrapper">
        <div className="p-6 inline-block">
          <a href="#" onClick={() => router.back()} className="items-center flex">
            <Image className="cursor-pointer" src={backArrow} />
            <div className="ml-2 font-medium">Back to {contact?.category_1}s</div>
          </a>
        </div>
        {/* <Breadcrumbs className="bg-white pl-6 py-6 border-b border-gray-2" /> */}
        {id && (
          <div className="flex flex-row border-t border-gray-2">
            <ClientDetailsSidebar
              client={contact}
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
