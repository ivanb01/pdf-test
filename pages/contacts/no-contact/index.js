import SetupGmail from 'components/SetupGmail';
import GoogleContactsImportSummary from 'components/SetupGmail/import-summary';
import AddContactManuallyOverlay from 'components/overlays/add-contact/add-contact-manually';
import ImportGoogleContacts from 'components/overlays/importing-from-gmail';
import MainMenu from 'components/shared/menu';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { postGoogleContacts, getGoogleAuthorize, getGoogleAuthCallback } from 'api/google';


const NoContactPage = () => {
    const router = useRouter()

    const [showAddContactManuallyOverlay, setShowAddContactManuallyOverlay] = 
    useState(false);
    const [showImportGoogleContactsModal, setShowImportGoogleContactsModal] = 
    useState(false);
    const [modalList, setModalList] = useState([]);
    const [googleContactResponse, setGoogleContactResponse] = useState(null);
    const [stateAfterImport, setStateAfterImport] = useState(null);
    const [errorImporting, setErorrImporting] = useState('');

    const handleCloseImportGoogleContactsModal = () => {
        setShowImportGoogleContactsModal(false);
        setModalList([]);
        setStateAfterImport(null);
    }

    const handleImportGoogleContact = async () => {
        try {
            setShowImportGoogleContactsModal(true);
            const { data } = await postGoogleContacts();
            console.log('post google contacts', data);
            
            if(data.redirect_uri) {
                setModalList(list1);
            } else {
                setGoogleContactResponse(data);
                setModalList([]);
                setStateAfterImport(data.db_insertion);

            }
        } catch (error) {
            setShowImportGoogleContactsModal(false);
            setErorrImporting('Import process was interrupted. Please Try Again!')
        }
    }

    const handleGoogleAuthorize = async () => {
        try {
            const { data } = await getGoogleAuthorize();
            console.log('get google authorize', data);
            window.location.href = data.redirect_uri; 
        } catch (error) {
            setShowImportGoogleContactsModal(false);
            setErorrImporting('Authorize process was interrupted. Please Try Again!')
        }
    }

    const handleGoogleAuthCallback = async (queryParams) => {
        try {
            const { data } = await getGoogleAuthCallback(queryParams);
            console.log('google auth callback', data);
            if(data.error){
                setShowImportGoogleContactsModal(true);
                setModalList(list2);
            } else {
                setShowImportGoogleContactsModal(true);
                setModalList(list3);
                handleImportGoogleContact();
            }
        } catch (error) {
            setShowImportGoogleContactsModal(false);
            setErorrImporting('Authorize process was interrupted. Please Try Again!')
        }
    }

    useEffect(() => {
        const queryParams = {}
        for (const [key, value] of Object.entries(router.query)) {
            queryParams[key] = value
        }
        if (Object.keys(queryParams).length > 0) {
            handleGoogleAuthCallback(queryParams);
        }
    }, [router.query]);

    const list1=[
        {
            text: '1. OnelineCRM needs authorization to access your Google contacts!',
            state: 'not_finished',
        },
        {
            text: 'Continue',
            state: 'button',
            handleClick: handleGoogleAuthorize
        },
    ];
    const list2=[
        {
            text: 'Failed to get credentials from Google.',
            state: 'not_finished',
        },
    ];
    const list3=[
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
            <MainMenu />
            {
                googleContactResponse?.db_insertion==='Successful' ?
                    <div className="w-full flex items-center justify-center">
                        <div className="border-t border-gray2 flex  w-full">
                            <div className="w-full relative">
                                <GoogleContactsImportSummary data={googleContactResponse} />
                            </div>
                        </div>
                     </div>
                :
                <>
                    <div className="layout-fixed-height w-full flex items-center justify-center pt-[68px] overflow-y-scroll">
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
            }
            {    
                showImportGoogleContactsModal && (
                    <ImportGoogleContacts
                        handleCloseOverlay={handleCloseImportGoogleContactsModal}
                        title='Importing Google Contacts'
                        list={modalList}
                        stateAfterImport={stateAfterImport}
                    />
                )}
            
        </>
    );
    };

export default NoContactPage;

export async function getStaticProps(context) {
    return {
      props: {
        requiresAuth: true,
      },
    };
}
