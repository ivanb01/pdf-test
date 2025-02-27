import TopBar from 'components/shared/top-bar';
import MainMenu from 'components/shared/menu';
import Text from 'components/shared/text';
import Input from 'components/shared/input';
import Button from 'components/shared/button';
import { UserIcon } from '@heroicons/react/solid';
import { CreditCardIcon } from '@heroicons/react/solid';
import Security from '@mui/icons-material/Security';
import { useState, useEffect } from 'react';
import Table from 'components/shared/table';
import SimpleBar from 'simplebar-react';
import Router from 'next/router';
import aiIcon from '/public/animations/gmailsync.gif';
import googleIcon from '/public/images/google-icon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getUserConsentForGoogleContactsAndEmail } from '@api/google';
import { clearData } from '@api/contacts';
import { fetchCurrentUserInfo, updateUserInfo } from '@helpers/auth';
import { setUserInfo } from 'store/global/slice';
import toast from 'react-hot-toast';
import ClearContacts from '@components/overlays/clear-all-contacts';
import PlanOptions from '@components/PlanOptions';
import withAuth from '@components/withAuth';
import useLocalStorage from 'hooks/useLocalStorage';
import ImportsSummaryTable from '@components/shared/table/ImportsSummaryTable';
import MainMenuV2 from '@components/shared/menu/menu-v2';

const index = () => {
  const dispatch = useDispatch();
  const [showClearConfirmation, setShowClearConfirmation] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [loadingActivate, setLoadingActivate] = useState(false);
  const userGaveConsent = useSelector((state) => state.global.userGaveConsent);
  const userInfo = useSelector((state) => state.global.userInfo);
  const [defaultUserInfo] = useLocalStorage('userInfo');
  const [changedUserInfo, setChangedUserInfo] = useState(defaultUserInfo);

  useEffect(() => {
    const getInfo = async () => {
      const info = await fetchCurrentUserInfo();
      dispatch(setUserInfo(info));
      setChangedUserInfo(info);
    };

    getInfo();
  }, []);

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

  const importsSummary = [];

  const myProfileTab = () => {
    const handleChange = (e) => {
      const { name, value } = e.target;
      setChangedUserInfo((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    const handleSubmit = async () => {
      setLoadingActivate(true);
      try {
        await updateUserInfo(changedUserInfo);
        dispatch(setUserInfo(changedUserInfo));
        toast.success('Changes saved successfully.');
      } catch (error) {
        console.error('Failed to save user info', error);
        toast.error('Failed to save the information.');
      }
      setLoadingActivate(false);
    };

    return (
      <>
        <TopBar text="My profile" />
        <div className="p-6">
          <Text h3 className="mb-1">
            General Information
          </Text>
          <Text p className="text-gray4">
            Profile information that you will be presented to your contacts.
          </Text>
          <hr className="my-5" />
          <div className="w-[40%]">
            <div className="flex mb-6">
              <Input
                type="text"
                label="First Name"
                name="first_name"
                className="mr-6"
                value={changedUserInfo?.first_name || ''}
                onChange={handleChange}
              />
              <Input
                type="text"
                label="Last Name"
                name="last_name"
                value={changedUserInfo?.last_name || ''}
                onChange={handleChange}
              />
            </div>
            <Input
              type="phone"
              label="Phone Number"
              name="phone_number"
              value={changedUserInfo?.phone_number || ''}
              onChange={handleChange}
              hidePhonePrefix={true}
              secondaryLabel="We may use this phone number to contact you about security events, sending workflow SMS, and for owner property values. Please refer to our privacy policy for more information."
            />
          </div>
          <hr className="my-5" />
          <div className="flex items-center">
            <Button loading={loadingActivate} label="Save Changes" onClick={handleSubmit} />
          </div>
        </div>
      </>
    );
  };

  const accountManagementTab = () => {
    return (
      <>
        <TopBar text="Account Management" />
        <div className="p-6">
          <div className="font-medium mb-6">Gmail Smart Sync Contacts and import Google Contacts from Gmail</div>
          <div className=" w-fit rounded-[4px] border border-gray-200 p-6 flex">
            <div className="text-center max-w-[265px] mr-6">
              <img className="m-auto h-[121px]" src={aiIcon.src} alt="" />
              <div className="mt-6 text-xs text-gray-500">
                With <strong>Gmail Smart Sync Contacts:</strong> Our intelligent AI algorithms intelligently analyze
                each contact's information, swiftly identifying their type, status, and most importantly, their
                interests.
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
      </>
    );
  };

  const billingTab = () => {
    return (
      <>
        <TopBar text="Billing" />
        <div className="p-6">
          <PlanOptions userInfo={userInfo} />
        </div>
      </>
    );
  };

  const importsSummaryTab = () => {
    return (
      <div className="absolute left-0 top-0 right-0 bottom-0 flex flex-col">
        <TopBar text="Imports Summary" />
        <div className="w-auto relative flex" style={{ height: 'calc(100vh - 145px)' }}>
          <div className={`border border-gray-200 overflow-hidden relative h-full w-full`}>
            <SimpleBar autoHide style={{ maxHeight: '100%' }}>
              {/* <Table tableFor="clients" data={clientTypeCards} /> */}
              <ImportsSummaryTable
                data={importsSummary}
                tableFor="imports-summary"
                handleClickRow={() => Router.push('/my-profile/import-details')}
              />
            </SimpleBar>
          </div>
        </div>
        {/* <div className="border border-gray2 overflow-hidden"> */}
        {/* </div> */}
      </div>
    );
  };

  const tabs = [
    {
      id: 0,
      name: 'My Profile',
      icon: <UserIcon height={20} className="mr-3" />,
      tabContent: myProfileTab(),
    },
    {
      id: 1,
      name: 'Account Management',
      icon: <Security height={20} className="mr-3" />,
      tabContent: accountManagementTab(),
    },
    {
      id: 2,
      name: 'Billing',
      icon: <CreditCardIcon height={20} className="mr-3" />,
      tabContent: billingTab(),
    },
    // {
    //   id: 2,
    //   name: 'Imports Summary',
    //   icon: <ShieldCheckIcon height={20} className="mr-3" />,
    //   tabContent: importsSummaryTab(),
    // },
  ];
  return (
    <>
      <MainMenuV2 />
      <div className="w-full flex items-center justify-center" style={{ height: 'calc(100vh - 70px)' }}>
        <div className="border-t border-gray2 flex h-full min-h-full w-full">
          <div className="w-[375px] h-full border-r border-gray2 px-1 py-5">
            {tabs.map((tab) => {
              return (
                <a
                  key={tab.id}
                  href="#"
                  onClick={() => setCurrentTab(tab.id)}
                  className={`p-3 flex items-center ${
                    currentTab == tab.id ? 'bg-lightBlue1 text-lightBlue3' : 'text-gray4 hover:text-gray5'
                  } rounded-md`}>
                  {tab.icon}
                  {tab.name}
                </a>
              );
            })}
          </div>
          <div className="w-full relative h-full overflow-y-scroll">
            {tabs.find((tab) => tab.id == currentTab).tabContent}
          </div>
        </div>
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

// export async function getServerSideProps(context) {

//   try {
//     const session = await Auth.currentSession();
//     return {
//       props: { userAuthenticated: true }
//     };
//   } catch (error) {
//     return {
//       redirect: {
//           destination: '/authentication',
//           permanent: false
//         }
//       };
//   }
// }
