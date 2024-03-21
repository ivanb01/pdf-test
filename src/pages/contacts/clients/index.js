import Layout from 'components/Layout';
import Clients from 'components/Contacts/clients-content';
import React, { useState, useEffect } from 'react';
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
import { getGoogleAuthCallback, getGoogleAuthorize, getUserConsentStatus, postGoogleContacts } from '@api/google';
import withAuth from '@components/withAuth';
import WelcomePopup from '@components/overlays/welcome-popup';
import GoogleContactsImportSummary from '@components/SetupGmail/import-summary';
import SetupGmail from '@components/SetupGmail';
import AddContactManuallyOverlay from '@components/overlays/add-contact/add-contact-manually';
import ImportGoogleContacts from '@components/overlays/importing-from-gmail';
import ContactsImportedSuccessfullyPopup from '@components/overlays/contacts-imported-successfully';
import { getCategorizedAIContacts, syncEmailOfContact } from '@api/email';

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

  useEffect(() => {
    console.log('Ereza');
  }, []);
  // const unapprovedContacts = useSelector((state) => state.global.unapprovedContacts);
  const userGaveConsent = useSelector((state) => state.global.userGaveConsent);
  const initGmailSetup = useSelector((state) => state.global.initGmailSetup);
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

  const [showAddContactManuallyOverlay, setShowAddContactManuallyOverlay] = useState(false);
  const [showImportGoogleContactsModal, setShowImportGoogleContactsModal] = useState(false);
  const [modalList, setModalList] = useState([]);
  const [googleContactResponse, setGoogleContactResponse] = useState(null);
  const [stateAfterImport, setStateAfterImport] = useState(null);
  const [motionImage, setMotionImage] = useState(false);
  const [emptyModal, setEmptyModal] = useState(false);
  const [errorImporting, setErorrImporting] = useState('');
  const handleCloseImportGoogleContactsModal = () => {
    setShowImportGoogleContactsModal(false);
    setModalList([]);
    setStateAfterImport(null);
    setMotionImage(false);
  };

  const handleImportGoogleContact = async (modalChangeImmediately = true) => {
    try {
      if (modalChangeImmediately) {
        setShowImportGoogleContactsModal(true);
        setModalList(list2);
        setMotionImage(true);
      }
      const { data } = await postGoogleContacts();
      console.log('post google contacts', data);

      if (data.redirect_uri) {
        setModalList(list1);
        setMotionImage(false);
      } else {
        setGoogleContactResponse(data);
        setModalList([]);
        setStateAfterImport(data.db_insertion);
        setMotionImage(false);
      }
    } catch (error) {
      setShowImportGoogleContactsModal(false);
      setErorrImporting('Import process was interrupted. Please Try Again!');
    }
  };

  useEffect(() => {
    console.log(googleContactResponse);
  }, [googleContactResponse]);

  const handleGoogleAuthorize = async () => {
    try {
      const { data } = await getGoogleAuthorize();
      window.location.href = data.redirect_uri;
    } catch (error) {
      setShowImportGoogleContactsModal(false);
      setErorrImporting('Authorize process was interrupted. Please Try Again!');
    }
  };
  const list1 = [
    {
      text: '1. OnelineCRM needs authorization to access your Google contacts!',
      state: 'not_finished',
    },
    {
      text: 'Continue',
      state: 'button',
      handleClick: handleGoogleAuthorize,
    },
  ];
  const list2 = [
    {
      text: 'Please wait ...',
      state: 'not_finished',
    },
  ];
  const list3 = [
    {
      text: '1. OnelineCRM needs authorization to access your Google contacts!',
      state: 'finished',
    },
    {
      text: '2. OnelineCRM has successfully accessed your Google contacts!',
      state: 'finished',
    },
    {
      text: '3. Importing contacts started ...',
      state: 'not_finished',
    },
  ];
  const handleGoogleAuthCallback = async (queryParams) => {
    try {
      const { data } = await getGoogleAuthCallback(queryParams, '/contacts/clients');
      if (!data.error) {
        setEmptyModal(false);
        setShowImportGoogleContactsModal(true);
        setModalList(list3);
        setMotionImage(true);
        await Promise.all([handleImportGoogleContact(false).then(() => {}), syncEmailOfContact()]);
        await getUserConsentStatus()
          .then((results) => {
            dispatch(setUserGaveConsent(results.data.scopes));
          })
          .catch((error) => {
            console.log(error, 'error');
          });
        await getCategorizedAIContacts().then((res) => console.log(res));

        handleImportGoogleContact();
      } else {
        setShowImportGoogleContactsModal(false);
        setEmptyModal(false);
      }
    } catch (error) {
      setShowImportGoogleContactsModal(false);
      setErorrImporting('Authorize process was interrupted. Please Try Again!');
    }
  };
  const [finishedOnboarding, setFinishedOnboarding] = useState(false);
  useEffect(() => {
    let finishedTour = localStorage.getItem('finishedTour') ? localStorage.getItem('finishedTour') : false;
    setFinishedOnboarding(finishedTour);
  }, [finishedOnboarding, router.query]);
  useEffect(() => {
    const queryParams = {};
    for (const [key, value] of Object.entries(router.query)) {
      queryParams[key] = value;
    }
    if (Object.keys(queryParams).length > 0 && !finishedOnboarding) {
      if (queryParams?.start_importing) {
        handleImportGoogleContact();
        // } else {
      } else if (queryParams?.code) {
        setShowImportGoogleContactsModal(true);
        // setEmptyModal(true);
        handleGoogleAuthCallback(queryParams);
      }
    }
  }, [router.query]);
  return (
    <Layout>
      {loading ? (
        <Loader />
      ) : (
        <>
          {!finishedOnboarding && userGaveConsent && Object.entries(router.query).length > 0 && (
            <Tour for={'clients'} />
          )}
          {/*{showSmartSyncOverlay && (*/}
          {/*  <SmartSyncActivatedOverlay*/}
          {/*    activatingSmartSync={activatingSmartSync}*/}
          {/*    handleCloseOverlay={() => setShowSmartSyncOverlay(false)}*/}
          {/*  />*/}
          {/*)}*/}
          {finishedOnboarding && initGmailSetup && (
            <>
              {googleContactResponse?.importable_new_contacts_count > 0 ||
              googleContactResponse?.invalid_contacts_count > 0 ? (
                <div className="w-full flex items-center justify-center">
                  <div className="border-t border-gray2 flex  w-full">
                    <div className="w-full relative">
                      <ContactsImportedSuccessfullyPopup />
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="layout-fixed-height w-full flex items-center justify-center overflow-y-scroll">
                    <SetupGmail
                      error={errorImporting}
                      setshowAddContactManuallyOverlay={setShowAddContactManuallyOverlay}
                      setShowImportGoogleContactsModal={handleImportGoogleContact}
                    />
                  </div>
                  {showAddContactManuallyOverlay && (
                    <AddContactManuallyOverlay
                      handleClose={() => setShowAddContactManuallyOverlay(false)}
                      title="Add Contact"
                    />
                  )}
                </>
              )}
              {showImportGoogleContactsModal && stateAfterImport != 'Not needed' && (
                <ImportGoogleContacts
                  handleCloseOverlay={handleCloseImportGoogleContactsModal}
                  title="Importing Google Contacts"
                  list={modalList}
                  stateAfterImport={stateAfterImport}
                  motionImage={motionImage}
                  emptyModal={emptyModal}
                />
              )}
            </>
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
          {/* <Tour for={'clients'} /> */}

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
