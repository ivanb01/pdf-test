import SetupGmail from 'components/SetupGmail';
import GoogleContactsImportSummary from 'components/SetupGmail/import-summary';
import AddContactManuallyOverlay from 'components/overlays/add-contact/add-contact-manually';
import ImportGoogleContacts from 'components/overlays/importing-from-gmail';
import MainMenu from 'components/shared/menu';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { postGoogleContacts, getGoogleAuthorize, getGoogleAuthCallback, getUserConsentStatus } from 'api/google';
import { setAllContacts } from '@store/contacts/slice';
import { useDispatch } from 'react-redux';
import { setUserGaveConsent } from '@store/global/slice';
import withAuth from '@components/withAuth';
import ImportingContactsPopup from '@components/overlays/importing-contacts-popup';

const NoContactPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

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

  const handleGoogleAuthCallback = async (queryParams) => {
    try {
      const { data } = await getGoogleAuthCallback(queryParams, '/contacts/clients');
      console.log('google auth callback', data);
      if (!data.error) {
        setEmptyModal(false);
        setShowImportGoogleContactsModal(true);
        setModalList(list3);
        setMotionImage(true);
        setTimeout(() => handleImportGoogleContact(false), 4000);
        getUserConsentStatus()
          .then((results) => {
            dispatch(setUserGaveConsent(results.data.scopes));
          })
          .catch((error) => {
            console.log(error, 'error');
          });

        // handleImportGoogleContact();
      } else {
        setShowImportGoogleContactsModal(false);
        setEmptyModal(false);
      }
    } catch (error) {
      setShowImportGoogleContactsModal(false);
      setErorrImporting('Authorize process was interrupted. Please Try Again!');
    }
  };

  useEffect(() => {
    const queryParams = {};
    for (const [key, value] of Object.entries(router.query)) {
      queryParams[key] = value;
    }
    if (Object.keys(queryParams).length > 0) {
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

  return (
    <>
      {googleContactResponse?.importable_new_contacts_count > 0 || googleContactResponse?.invalid_contacts_count > 0 ? (
        <div className="w-full flex items-center justify-center">
          <div className="border-t border-gray2 flex  w-full">
            <div className="w-full relative">
              <GoogleContactsImportSummary data={googleContactResponse} />
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
        //TODO should replace this component

        // <ImportingContactsPopup />
      )}
    </>
  );
};

export default withAuth(NoContactPage);

// export async function getServerSideProps(context) {
//   return {
//     props: {
//       requiresAuth: true,
//     },
//   };
// }
