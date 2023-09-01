import Layout from 'components/Layout';
import Clients from 'components/Contacts/clients-content';
import { useState, useEffect } from 'react';
import {
  setOpenedTab,
  setOpenedSubtab,
  setRefetchData,
  setUnapprovedContacts,
  setUserGaveConsent,
} from 'store/global/slice';
import { useDispatch, useSelector } from 'react-redux';
import { setContacts, updateContacts, updateContact } from 'store/contacts/slice';
import Loader from 'components/shared/loader';
import AddClientManuallyOverlay from 'components/overlays/add-client/add-client-manually';
import { clientStatuses, clientOptions } from 'global/variables';
import { searchContacts } from 'global/functions';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { getUnapprovedContacts } from '@api/aiSmartSync';
import SmartSyncActivatedOverlay from '@components/overlays/smart-sync-activated';
import { CSSTransition } from 'react-transition-group';
import ReviewContact from '@components/overlays/review-contact';
import { getGoogleAuthCallback, getUserConsentStatus } from '@api/google';
import { bulkUpdateContacts } from '@api/contacts';

const Tour = dynamic(() => import('components/onboarding/tour'), {
  ssr: false,
});

const index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showEditContact, setShowEditContact] = useState(false);
  const [contactToEdit, setContactToEdit] = useState(null);
  const [showAddContactOverlay, setShowAddContactOverlay] = useState(false);
  const [contactsCopy, setContactsCopy] = useState();
  const [showSmartSyncOverlay, setShowSmartSyncOverlay] = useState(false);
  const [activatingSmartSync, setActivatingSmartSync] = useState(false);

  const [loading, setLoading] = useState(true);

  const unapprovedContacts = useSelector((state) => state.global.unapprovedContacts);

  const allContacts = useSelector((state) => state.contacts.allContacts);
  const userGaveConsent = useSelector((state) => state.global.userGaveConsent);
  const refetchData = useSelector((state) => state.global.refetchData);
  const openedTab = useSelector((state) => state.global.openedTab);
  const openedSubtab = useSelector((state) => state.global.openedSubtab);

  const fetchUnapproved = async () => {
    try {
      const response = await getUnapprovedContacts();
      dispatch(setUnapprovedContacts(response.data));
      console.log(response.data);
    } catch (error) {
      console.log('error msg', error.message);
    }
  };

  useEffect(() => {
    fetchUnapproved();
  }, []);

  useEffect(() => {
    setLoading(true);
  }, [openedTab]);

  const fetchClients = () => {
    let clients = {
      ...allContacts,
      data: allContacts.data.filter((contact) => [4, 5, 6, 7].includes(contact.category_id)),
    };
    dispatch(setContacts(clients));
    setContactsCopy(clients);
    setLoading(false);
    dispatch(setOpenedTab(0));
    // dispatch(setOpenedSubtab(0));
  };
  useEffect(() => {
    setLoading(true);
    if (allContacts.data) {
      fetchClients();
    }
  }, [allContacts]);
  useEffect(() => {
    if (refetchData) {
      fetchClients();
      dispatch(setOpenedTab(0));
      // dispatch(setOpenedSubtab(0));
      dispatch(setRefetchData(false));
    }
  }, [refetchData]);
  useEffect(() => {
    console.log(allContacts?.data && allContacts?.data?.filter((contact) => contact.import_source == 'GmailAI'));
    let updateContacts = [
      {
        id: 208442,
        approved_ai: false,
      },
      {
        id: 147889,
        approved_ai: false,
      },
      {
        id: 142426,
        approved_ai: false,
      },
      {
        id: 168179,
        approved_ai: false,
      },
    ];
    bulkUpdateContacts({ contacts: updateContacts });
  }, [allContacts]);

  useEffect(() => {
    const queryParams = {};
    for (const [key, value] of Object.entries(router.query)) {
      queryParams[key] = value;
    }
    if (Object.keys(queryParams).length > 0) {
      if (queryParams?.code && queryParams?.prompt == 'consent') {
        setActivatingSmartSync(true);
        setShowSmartSyncOverlay(true);
        getGoogleAuthCallback(queryParams, '/contacts/clients').then(() => {
          getUserConsentStatus().then((results) => {
            setActivatingSmartSync(false);
            dispatch(setUserGaveConsent(results.data.scopes));
          });
        });
      }
    }
  }, [router.query]);

  useEffect(() => {
    if (
      router.query.code &&
      router.query.prompt == 'consent' &&
      userGaveConsent?.includes('gmail') &&
      userGaveConsent?.includes('contacts')
    ) {
      setShowSmartSyncOverlay(true);
    }
  }, [userGaveConsent, router.query]);

  return (
    <Layout>
      {loading ? (
        <Loader />
      ) : (
        <>
          {showSmartSyncOverlay && (
            <SmartSyncActivatedOverlay
              activatingSmartSync={activatingSmartSync}
              handleCloseOverlay={() => setShowSmartSyncOverlay(false)}
            />
          )}
          <Clients
            handleCardEdit={(contact) => {
              setShowEditContact(true);
              setContactToEdit(contact);
            }}
            unapprovedContacts={
              unapprovedContacts?.data.filter((contact) => contact.category_1 != 'Uncategorized').length
            }
            setShowAddContactOverlay={setShowAddContactOverlay}
          />
          {/* <Tour for={'clients'} /> */}
        </>
      )}
      {showAddContactOverlay && (
        <AddClientManuallyOverlay
          handleClose={() => setShowAddContactOverlay(false)}
          title="Add Client"
          options={clientOptions}
          statuses={clientStatuses}
        />
      )}
      {showEditContact && (
        <ReviewContact
          showToast
          client={contactToEdit}
          setClient={setContactToEdit}
          handleClose={() => setShowEditContact(false)}
          title="Edit Client"
        />
        // <EditContactOverlay
        //   handleClose={() => setShowEditContact(false)}
        //   title="Edit Client"
        //   client={contactToEdit}
        //   className="w-[635px]"
        // />
      )}
    </Layout>
  );
};

export default index;

export async function getStaticProps(context) {
  return {
    props: {
      requiresAuth: true,
    },
  };
}
