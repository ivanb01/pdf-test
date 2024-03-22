import Layout from 'components/Layout';
import Clients from 'components/Contacts/clients-content';
import { useState, useEffect } from 'react';
import {
  setExpandedTab,
  setOpenedSubtab,
  setOpenedTab,
  setRefetchData,
  setUnapprovedContacts,
  setUserGaveConsent,
  setVendorSubtypes,
} from 'store/global/slice';
import { useDispatch, useSelector } from 'react-redux';
import { setContacts } from 'store/contacts/slice';
import Loader from 'components/shared/loader';
import AddClientManuallyOverlay from 'components/overlays/add-client/add-client-manually';
import { clientStatuses, clientOptions } from 'global/variables';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { getUnapprovedContacts } from '@api/aiSmartSync';
import SmartSyncActivatedOverlay from '@components/overlays/smart-sync-activated';
import ReviewContact from '@components/overlays/review-contact';
import { getGoogleAuthCallback, getUserConsentStatus, postGoogleContacts } from '@api/google';
import withAuth from '@components/withAuth';
import { getAIContacts, syncEmailOfContact } from '@api/email';
import ImportingContactsPopup from '@components/overlays/importing-contacts-popup';
import ContactsImportedSuccessfullyPopup from '@components/overlays/contacts-imported-successful';

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

  // const unapprovedContacts = useSelector((state) => state.global.unapprovedContacts);
  const userGaveConsent = useSelector((state) => state.global.userGaveConsent);
  const refetchData = useSelector((state) => state.global.refetchData);
  const openedTab = useSelector((state) => state.global.openedTab);
  const openedSubtab = useSelector((state) => state.global.openedSubtab);
  const allContacts = useSelector((state) => state.contacts.allContacts);

  const [unapprovedContacts, setUnapprovedContacts] = useState([]);

  useEffect(() => {
    const ai_unapproved = allContacts?.data?.filter(
      (client) =>
        ['GmailAI', 'Smart Sync A.I.', 'Gmail'].includes(client.import_source) &&
        (client.approved_ai === false || client.approved_ai === null),
    );
    setUnapprovedContacts(ai_unapproved);
  }, [allContacts]);
  // const fetchUnapproved = async () => {
  //   try {
  //     const response = await getUnapprovedContacts();
  //     console.log(response.data);
  //     dispatch(setUnapprovedContacts(response.data));
  //   } catch (error) {
  //     dispatch(setUnapprovedContacts([]));
  //     console.log('error msg', error.message);
  //   }
  // };

  // useEffect(() => {
  //   fetchUnapproved();
  // }, []);

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

  // useEffect(() => {
  // }, [])
  const [currentButton, setCurrentButton] = useState(0);

  useEffect(() => {
    let currentView = localStorage.getItem('currentView') ? localStorage.getItem('currentView') : 0;
    setCurrentButton(currentView);
  }, []);

  const handleViewChange = (viewId) => {
    setCurrentButton(viewId);
    localStorage.setItem('currentView', viewId);
  };

  // useEffect(() => {
  //   const queryParams = {};
  //   for (const [key, value] of Object.entries(router.query)) {
  //     queryParams[key] = value;
  //   }
  //   if (Object.keys(queryParams).length > 0) {
  //     if (queryParams?.code && queryParams?.prompt == 'consent') {
  //       setActivatingSmartSync(true);
  //       setShowSmartSyncOverlay(true);
  //       getGoogleAuthCallback(queryParams, '/contacts/clients')
  //         .then(() => {
  //           getUserConsentStatus()
  //             .then((results) => {
  //               setActivatingSmartSync(false);
  //               dispatch(setUserGaveConsent(results.data.scopes));
  //             })
  //             .catch((error) => {
  //               console.log(error, 'error');
  //             });
  //         })
  //         .catch((error) => {
  //           console.log(error, 'error');
  //         });
  //     }
  //   }
  // }, [router.query]);
  const [errorImporting, setErorrImporting] = useState('');
  const [googleContactResponse, setGoogleContactResponse] = useState(null);

  // const handleGoogleAuthCallback = async (queryParams) => {
  //   try {
  //     const { data } = await getGoogleAuthCallback(queryParams, '/contacts/clients');
  //     console.log('google auth callback', data);
  //   } catch (error) {
  //     // setShowImportGoogleContactsModal(false);
  //     // setErorrImporting('Authorize process was interrupted. Please Try Again!');
  //     console.log('error', error);
  //   }
  // };
  const [finishedOnboarding, setFinishedOnboarding] = useState(false);
  useEffect(() => {
    let finishedTour = localStorage.getItem('finishedTour') ? localStorage.getItem('finishedTour') : false;
    setFinishedOnboarding(finishedTour);
  }, []);
  const [showTour, setShowTour] = useState(undefined);

  const [loadingPopup, setLoadingPopup] = useState(false);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    console.log(loadingPopup);
  }, [loadingPopup]);
  const handleImportGoogleContact = async () => {
    console.log('Testt');
    try {
      setLoadingPopup(true);
      const [promise1, promise2] = await Promise.all([
        postGoogleContacts()
          .then(() => {})
          .catch((err) => console.log(err)),
        syncEmailOfContact()
          .then(() => {})
          .catch((err) => console.log(err)),
      ]);
      await getAIContacts()
        .then((res) => {
          setSuccess(true);
          setLoadingPopup(false);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      setLoadingPopup(false);
      setSuccess(false);
    }
  };
  const handleGoogleAuthCallback = async (queryParams) => {
    try {
      setLoadingPopup(true);
      await getGoogleAuthCallback(queryParams, '/contacts/no-contact')
        .then(() => {
          setTimeout(async () => {
            const [promise1, promise2] = await Promise.all([
              postGoogleContacts()
                .then(() => {})
                .catch((err) => console.log(err)),
              syncEmailOfContact()
                .then(() => {})
                .catch((err) => console.log(err)),
            ]);
            await getAIContacts()
              .then((res) => {})
              .catch((err) => console.log(err));
          }, 4000);
        })
        .catch((err) => console.log(err));
      await getUserConsentStatus()
        .then((results) => {
          dispatch(setUserGaveConsent(results.data.scopes));
          setLoadingPopup(false);
          setSuccess(true);
        })
        .catch((error) => {
          console.log(error);
          setSuccess(false);
          setLoadingPopup(false);
        });
    } catch (error) {
      setLoadingPopup(false);
      setSuccess(false);
      console.log(error);
    }
  };

  useEffect(() => {
    const queryParams = {};
    for (const [key, value] of Object.entries(router.query)) {
      queryParams[key] = value;
    }
    if (Object.keys(queryParams).length > 0) {
      setShowTour(true);
      if (queryParams?.start_importing) {
        handleImportGoogleContact();
      } else if (queryParams?.code) {
        handleGoogleAuthCallback(queryParams);
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
          {Object.entries(router.query).length > 0 &&
            (loadingPopup ? (
              <ImportingContactsPopup />
            ) : !loadingPopup && success ? (
              <ContactsImportedSuccessfullyPopup />
            ) : (
              <></>
            ))}

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
          {!finishedOnboarding && Object.entries(router.query).length > 0 && showTour && <Tour />}
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
