import TopBar from 'components/shared/top-bar';
import Menu from 'components/shared/menu';
import Text from 'components/shared/text';
import Input from 'components/shared/input';
import Button from 'components/shared/button';
import { PencilIcon } from '@heroicons/react/solid';
import { TrashIcon } from '@heroicons/react/solid';
import { UserIcon } from '@heroicons/react/solid';
import { ShieldCheckIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import Table from 'components/shared/table';
import { Auth, withSSRContext } from 'aws-amplify';
import SimpleBar from 'simplebar-react';
import Router from 'next/router';

const index = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [changePasswordVisible, setChangePasswordVisible] = useState(false);
  // const importsSummary = [
  //   {
  //     id: 0,
  //     fileName: 'Oxford Contacts Template',
  //     newRecords: 12,
  //     updatedRecords: 5,
  //     errorCount: 8,
  //     uploadedDate: '04/28/2022',
  //     uploadedTime: '10:45PM',
  //   },
  //   {
  //     id: 1,
  //     fileName: 'Oxford Contacts Template',
  //     newRecords: 12,
  //     updatedRecords: 5,
  //     errorCount: 8,
  //     uploadedDate: '04/28/2022',
  //     uploadedTime: '10:45PM',
  //   },
  //   {
  //     id: 2,
  //     fileName: 'Oxford Contacts Template',
  //     newRecords: 12,
  //     updatedRecords: 5,
  //     errorCount: 8,
  //     uploadedDate: '04/28/2022',
  //     uploadedTime: '10:45PM',
  //   },
  //   {
  //     id: 3,
  //     fileName: 'Oxford Contacts Template',
  //     newRecords: 12,
  //     updatedRecords: 5,
  //     errorCount: 8,
  //     uploadedDate: '04/28/2022',
  //     uploadedTime: '10:45PM',
  //   },
  //   {
  //     id: 4,
  //     fileName: 'Oxford Contacts Template',
  //     newRecords: 12,
  //     updatedRecords: 5,
  //     errorCount: 8,
  //     uploadedDate: '04/28/2022',
  //     uploadedTime: '10:45PM',
  //   },
  //   {
  //     id: 5,
  //     fileName: 'Oxford Contacts Template',
  //     newRecords: 12,
  //     updatedRecords: 5,
  //     errorCount: 8,
  //     uploadedDate: '04/28/2022',
  //     uploadedTime: '10:45PM',
  //   },
  //   {
  //     id: 6,
  //     fileName: 'Oxford Contacts Template',
  //     newRecords: 12,
  //     updatedRecords: 5,
  //     errorCount: 8,
  //     uploadedDate: '04/28/2022',
  //     uploadedTime: '10:45PM',
  //   },
  //   {
  //     id: 7,
  //     fileName: 'Oxford Contacts Template',
  //     newRecords: 12,
  //     updatedRecords: 5,
  //     errorCount: 8,
  //     uploadedDate: '04/28/2022',
  //     uploadedTime: '10:45PM',
  //   },
  //   {
  //     id: 3,
  //     fileName: 'Oxford Contacts Template',
  //     newRecords: 12,
  //     updatedRecords: 5,
  //     errorCount: 8,
  //     uploadedDate: '04/28/2022',
  //     uploadedTime: '10:45PM',
  //   },
  //   {
  //     id: 4,
  //     fileName: 'Oxford Contacts Template',
  //     newRecords: 12,
  //     updatedRecords: 5,
  //     errorCount: 8,
  //     uploadedDate: '04/28/2022',
  //     uploadedTime: '10:45PM',
  //   },
  //   {
  //     id: 5,
  //     fileName: 'Oxford Contacts Template',
  //     newRecords: 12,
  //     updatedRecords: 5,
  //     errorCount: 8,
  //     uploadedDate: '04/28/2022',
  //     uploadedTime: '10:45PM',
  //   },
  //   {
  //     id: 6,
  //     fileName: 'Oxford Contacts Template',
  //     newRecords: 12,
  //     updatedRecords: 5,
  //     errorCount: 8,
  //     uploadedDate: '04/28/2022',
  //     uploadedTime: '10:45PM',
  //   },
  //   {
  //     id: 7,
  //     fileName: 'Oxford Contacts Template',
  //     newRecords: 12,
  //     updatedRecords: 5,
  //     errorCount: 8,
  //     uploadedDate: '04/28/2022',
  //     uploadedTime: '10:45PM',
  //   },
  // ];

  const importsSummary = [];
  
  const myProfileTab = () => {
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
          <div className="mt-1 sm:mt-0 sm:col-span-2 mb-6">
            <div className="flex items-center">
              <span className="h-[100px] w-[100px] rounded-full overflow-hidden bg-gray-100 mr-2">
                <svg
                  className="h-full w-full text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </span>
              <Button
                leftIcon={<PencilIcon className="h-[16px]" />}
                white
                label="Change"
                className="mr-2"
              />
              <Button
                leftIcon={<TrashIcon className="h-[16px]" />}
                white
                label="Remove"
              />
            </div>
          </div>
          <div className="w-[40%]">
            <div className="flex mb-6">
              <Input type="text" label="First Name" className="mr-6" />
              <Input type="text" label="Last Name" />
            </div>
            <Input type="email" label="Email" className="mb-6" />
            <Input
              type="phone"
              label="Phone Number"
              secondaryLabel="We may use this phone number to contact you about security events, sending workflow SMS, and for owner property values. Please refer to our privacy policy for more information"
            />
          </div>
          <hr className="my-5" />
          <div className="flex items-center">
            <Button label="Cancel" white className="mr-3" />
            <Button label="Save Changes" />
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
          <Text h3 className="mb-1">
            Password
          </Text>
          <Text p className="text-gray4">
            Profile information that you will be presented to your contacts.
          </Text>
          <hr className="my-5" />
          {changePasswordVisible && (
            <div className="w-1/3">
              <Input
                type="password"
                label="Current Password"
                className="mb-6"
              />
              <Input type="password" label="New Password" className="mb-6" />
              <Input
                type="password"
                label="Re-write New Password"
                className="mb-6"
              />
              <Input
                showForgotPassword={true}
                placeholder="Save Password"
                type="checkbox"
                className="mb-6"
              />
              <hr className="my-5" />
            </div>
          )}
          <div className="flex items-center">
            {!changePasswordVisible ? (
              <Button
                white
                label="Change Password"
                onClick={() => setChangePasswordVisible(true)}
              />
            ) : (
              <>
                <Button
                  label="Cancel"
                  white
                  className="mr-3"
                  onClick={() => setChangePasswordVisible(false)}
                />
                <Button label="Save Changes" primary />
              </>
            )}
          </div>
        </div>
      </>
    );
  };
  const importsSummaryTab = () => {
    return (
      <div className="absolute left-0 top-0 right-0 bottom-0 flex flex-col">
        <TopBar text="Imports Summary" />
        <div
          className="w-auto relative flex"
          style={{ height: 'calc(100vh - 145px)' }}
        >
          <div
            className={`border border-gray-200 overflow-hidden relative h-full w-full`}
          >
            <SimpleBar autoHide={true} style={{ maxHeight: '100%' }}>
              {/* <Table tableFor="clients" data={clientTypeCards} /> */}
              <Table
                data={importsSummary}
                tableFor="imports-summary"
                handleClickRow={() => Router.push('/my-profile/import-details')}
              ></Table>
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
      icon: <ShieldCheckIcon height={20} className="mr-3" />,
      tabContent: accountManagementTab(),
    },
    {
      id: 2,
      name: 'Imports Summary',
      icon: <ShieldCheckIcon height={20} className="mr-3" />,
      tabContent: importsSummaryTab(),
    },
  ];
  return (
    <>
      <Menu />
      <div
        className="w-full flex items-center justify-center"
        style={{ height: 'calc(100vh - 70px)' }}
      >
        <div className="border-t border-gray2 flex h-auto min-h-full w-full">
          <div className="w-[375px] h-auto border-r border-gray2 px-1 py-5">
            {tabs.map((tab) => {
              return (
                <a
                  key={tab.id}
                  href="#"
                  onClick={() => setCurrentTab(tab.id)}
                  className={`p-3 flex items-center ${
                    currentTab == tab.id
                      ? 'bg-lightBlue1 text-lightBlue3'
                      : 'text-gray4 hover:text-gray5'
                  } rounded-md`}
                >
                  {tab.icon}
                  {tab.name}
                </a>
              );
            })}
          </div>
          <div className="w-full relative">
            {tabs.find((tab) => tab.id == currentTab).tabContent}
          </div>
        </div>
      </div>
    </>
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
