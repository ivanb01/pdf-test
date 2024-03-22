import TopBar from '@components/shared/top-bar';
import React, { useState } from 'react';
import aiIcon from '/public/animations/gmailsync.gif';
import googleIcon from '/public/images/google-icon.svg';
import Button from '@components/shared/button';
import { clearData } from '@api/contacts';
import { getUserConsentForGoogleContactsAndEmail } from '@api/google';
import { useSelector } from 'react-redux';
import ClearContacts from '@components/overlays/clear-all-contacts';
import SettingsLayout from '@components/Layout/SettingsLayout';
import toast from 'react-hot-toast';

const index = () => {
  const userGaveConsent = useSelector((state) => state.global.userGaveConsent);
  const [loadingActivate, setLoadingActivate] = useState(false);
  const [showClearConfirmation, setShowClearConfirmation] = useState(false);

  const consentGiven = () => {
    return userGaveConsent && userGaveConsent?.includes('gmail') && userGaveConsent?.includes('contacts');
  };

  const activateGoogleConsent = async () => {
    setLoadingActivate(true);
    try {
      const { data } = await getUserConsentForGoogleContactsAndEmail();
      window.location.href = data.redirect_uri;
    } catch (error) {
      console.log('error occurredw with google import');
    }
  };

  const deactivateGoogleConsent = () => {
    console.log('deactivate');
  };

  const deleteData = () => {
    clearData().then((response) => {
      toast.success('All data has been cleared, refreshing so that changes take effect!');
      setTimeout(() => {
        location.reload();
      }, 2000);
    });
  };
  return (
    <SettingsLayout>
      <TopBar text="Account Management" />
      <div className="p-6">
        <div className="font-medium mb-6">Gmail Smart Sync Contacts and import Google Contacts from Gmail</div>
        <div className=" w-fit rounded-[4px] border border-gray-200 p-6 flex">
          <div className="text-center max-w-[265px] mr-6">
            <img className="m-auto h-[121px]" src={aiIcon.src} alt="" />
            <div className="mt-6 text-xs text-gray-500">
              With <strong>Gmail Smart Sync Contacts:</strong> Our intelligent AI algorithms intelligently analyze each
              contact's information, swiftly identifying their type, status, and most importantly, their interests.
            </div>
          </div>
          <div className="text-center max-w-[265px] mr-6">
            <img className="m-auto" src={googleIcon.src} alt="" />
            <div className=" mt-6 text-xs text-gray-500">
              With <strong>"Import Google Contacts"</strong> you will be able to import your contacts that are already
              in your "Google Contact" list.
            </div>
          </div>
          <div className="self-center">
            <Button
              googleButton
              loading={loadingActivate}
              googleActivated={consentGiven()}
              // disabled={consentGiven()}
              onClick={() => (consentGiven() ? deactivateGoogleConsent() : activateGoogleConsent())}>
              {consentGiven() ? 'Connected' : 'Connect'}
            </Button>
          </div>
        </div>
        <>
          <hr className="my-6" />
          <div className="font-medium">Clear Your Contacts and Revoke Access</div>
          <div className="text-sm text-gray-700 mt-1 mb-6">
            By clicking the button below, all contacts will be cleared from your account and Google access will be
            revoked
          </div>
          <Button danger label="Clear & Revoke Access" onClick={() => setShowClearConfirmation(true)} />
        </>
        {showClearConfirmation && (
          <ClearContacts handleCloseOverlay={() => setShowClearConfirmation(false)} onSubmit={() => deleteData()} />
        )}
        {/* <Button disabled white label="Delete Account" onClick={() => setShowDeleteAccountPopup(true)} /> */}
        {/* <Text h3 className="mb-1">
          Password
        </Text>
        <Text p className="text-gray4">
          Profile information that you will be presented to your contacts.
        </Text>
        <hr className="my-5" />
        {changePasswordVisible && (
          <div className="w-1/3">
            <Input type="password" label="Current Password" className="mb-6" />
            <Input type="password" label="New Password" className="mb-6" />
            <Input type="password" label="Re-write New Password" className="mb-6" />
            <Input showForgotPassword placeholder="Save Password" type="checkbox" className="mb-6" />
            <hr className="my-5" />
          </div>
        )}
        <div className="flex items-center">
          {!changePasswordVisible ? (
            <Button white label="Change Password" onClick={() => setChangePasswordVisible(true)} />
          ) : (
            <>
              <Button label="Cancel" white className="mr-3" onClick={() => setChangePasswordVisible(false)} />
              <Button label="Save Changes" primary />
            </>
          )}
        </div> */}
      </div>
    </SettingsLayout>
  );
};

export default index;
