import SetupGmail from 'components/SetupGmail';
import AddContactManuallyOverlay from 'components/overlays/add-contact/add-contact-manually';
import MainMenu from 'components/shared/menu';
import { useState } from 'react';
import { useRouter } from 'next/router';

const NoContactPage = () => {
    const [showAddContactManuallyOverlay, setShowAddContactManuallyOverlay] = 
    useState(false);

    return (
        <>
            <MainMenu />
            <div
            className="w-full flex items-center justify-center pt-[68px] overflow-y-scroll"
            style={{ height: 'calc(100vh - 70px)' }}
            >
                <SetupGmail
                    setshowAddContactManuallyOverlay={setShowAddContactManuallyOverlay}
                />
            </div>
            {showAddContactManuallyOverlay && (
            <AddContactManuallyOverlay
                handleClose={() => setShowAddContactManuallyOverlay(false)}
                title="Add Contact"
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
  
