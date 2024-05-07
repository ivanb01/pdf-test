import Layout from 'components/Layout';
import Clients from 'components/Contacts/clients-content';
import { useState, useEffect } from 'react';
import { setCount, setOpenedTab, setRefetchData, setUserGaveConsent } from 'store/global/slice';
import { useDispatch, useSelector } from 'react-redux';
import { setAllContacts, setContacts } from 'store/contacts/slice';
import Loader from 'components/shared/loader';
import AddClientManuallyOverlay from 'components/overlays/add-client/add-client-manually';
import { clientStatuses, clientOptions } from 'global/variables';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import ReviewContact from '@components/overlays/review-contact';
import { getGoogleAuthCallback, getUserConsentStatus, postGoogleContacts } from '@api/google';
import withAuth from '@components/withAuth';
import { getAIContacts, syncEmailOfContact } from '@api/email';
import ImportingContactsPopup from '@components/overlays/importing-contacts-popup';
import ContactsImportedSuccessfullyPopup from '@components/overlays/contacts-imported-successful';
import { getContacts, getCount } from '@api/contacts';

const Tour = dynamic(() => import('components/onboarding/tour'), {
  ssr: false,
});

const index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showEditContact, setShowEditContact] = useState(false);
  const [contactToEdit, setContactToEdit] = useState(null);
  const [showAddContactOverlay, setShowAddContactOverlay] = useState(false);
  const [loading, setLoading] = useState(true);
  const [unapprovedContacts, setUnapprovedContacts] = useState([]);
  const allContacts = useSelector((state) => state.contacts.allContacts);
  const { refetchData, openedTab, openedSubtab } = useSelector((state) => state.global);
  const [currentButton, setCurrentButton] = useState(0);
  const [finishedOnboarding, setFinishedOnboarding] = useState(false);
  const [loadingPopup, setLoadingPopup] = useState(undefined);
  const [success, setSuccess] = useState(undefined);
  const [openTour, setOpenTour] = useState(localStorage.getItem('openTour') === 'true' ? 'true' : 'false');
  const [renderTour, setRenderTour] = useState(false);
  const [openSuccessPopup, setOpenSuccessPopup] = useState(false);

  useEffect(() => {
    const ai_unapproved = allContacts?.data?.filter(
      (client) =>
        ['GmailAI', 'Smart Sync A.I.', 'Gmail'].includes(client.import_source) &&
        (client.approved_ai === false || client.approved_ai === null),
    );
    setUnapprovedContacts(ai_unapproved);
  }, [allContacts]);

  useEffect(() => {
    setLoading(true);
  }, [openedTab]);

  const fetchClients = () => {
    let clients = {
      ...allContacts,
      data: allContacts.data.filter((contact) => [4, 5, 6, 7].includes(contact.category_id)),
    };
    dispatch(setContacts(clients));
    setLoading(false);
    dispatch(setOpenedTab(0));
  };
  useEffect(() => {
    setLoading(true);
    if (allContacts?.data) {
      fetchClients();
    }
  }, [allContacts]);
  useEffect(() => {
    if (refetchData) {
      fetchClients();
      dispatch(setOpenedTab(0));
      dispatch(setRefetchData(false));
    }
  }, [refetchData]);

  useEffect(() => {
    let currentView = localStorage.getItem('currentView') ? localStorage.getItem('currentView') : 0;
    setCurrentButton(currentView);
  }, []);

  const handleViewChange = (viewId) => {
    setCurrentButton(viewId);
    localStorage.setItem('currentView', viewId);
  };

  useEffect(() => {
    let finishedTour = localStorage.getItem('finishedTour') ? localStorage.getItem('finishedTour') : false;
    setFinishedOnboarding(finishedTour);
  }, [router.query]);

  useEffect(() => {
    let _openTour = localStorage.getItem('openTour') === 'true' ? 'true' : 'false';
    setOpenTour(_openTour);
  }, [renderTour]);

  useEffect(() => {
    if (success === true && !loadingPopup) {
      setOpenSuccessPopup(true);
    }
  }, [success, loadingPopup]);
  const handleImportGoogleContact = async () => {
    try {
      setLoadingPopup(true);
      setTimeout(async () => {
        const [promise1, promise2] = await Promise.all([
          postGoogleContacts()
            .then(() => {})
            .catch(() => {
              throw new Error();
            }),
          syncEmailOfContact()
            .then(() => {})
            .catch((err) => {}),
        ]);

        await getAIContacts()
          .then(() => {})
          .catch((err) => {});

        await getUserConsentStatus().then((results) => {
          dispatch(setUserGaveConsent(results.data.scopes));
        });

        await getContacts().then((res) => {
          dispatch(setAllContacts(res.data));
        });
        await getCount().then((data) => {
          dispatch(setCount(data.data));
          setLoadingPopup(false);
          setSuccess(true);
          setOpenSuccessPopup(true);
        });
      }, 4000);
    } catch (error) {}
  };

  const handleGoogleAuthCallback = async (queryParams) => {
    try {
      setLoadingPopup(true);
      await getGoogleAuthCallback(queryParams, '/contacts/clients');
      await handleImportGoogleContact();
    } catch (error) {}
  };

  useEffect(() => {
    const queryParams = {};
    for (const [key, value] of Object.entries(router.query)) {
      queryParams[key] = value;
    }
    if (Object.keys(queryParams).length > 0) {
      if (queryParams?.start_importing) {
        handleImportGoogleContact();
      } else if (queryParams?.code && queryParams?.authuser && finishedOnboarding) {
        handleGoogleAuthCallback(queryParams);
      }
    }
  }, [router.query]);

  // useEffect(() => {
  //   if (
  //     router.query.code &&
  //     router.query.prompt == 'consent' &&
  //     userGaveConsent?.includes('gmail') &&
  //     userGaveConsent?.includes('contacts')
  //   ) {
  //     setShowSmartSyncOverlay(true);
  //   }
  // }, [userGaveConsent, router.query]);

  return (
    <Layout>
      {loading ? (
        <Loader />
      ) : (
        <>
          {/*{showSmartSyncOverlay && (*/}
          {/*  <SmartSyncActivatedOverlay*/}
          {/*    activatingSmartSync={activatingSmartSync}*/}
          {/*    handleCloseOverlay={() => setShowSmartSyncOverlay(false)}*/}
          {/*  />*/}
          {/*)}*/}
          {openTour === 'false' ? (
            loadingPopup === true ? (
              <ImportingContactsPopup />
            ) : openSuccessPopup ? (
              <ContactsImportedSuccessfullyPopup />
            ) : (
              <></>
            )
          ) : (
            <Tour setUpdateOpenTour={() => setRenderTour(true)} />
          )}
          <Clients
            currentButton={currentButton}
            handleViewChange={handleViewChange}
            handleCardEdit={(contact) => {
              setShowEditContact(true);
              setContactToEdit(contact);
            }}
            unapprovedContacts={unapprovedContacts.length > 0 ? unapprovedContacts : 0}
            setShowAddContactOverlay={setShowAddContactOverlay}
          />
          {currentButton == 0 && openedTab == 0 && openedSubtab == -1 && (
            <div className="arrow pointer-events-none">
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
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

export default withAuth(index);

// export async function getServerSideProps(context) {
//   return {
//     props: {
//       requiresAuth: true,
//     },
//   };
// }
