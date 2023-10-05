import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import oneLineLogo from '/public/images/oneline_logo_white.svg';
import MenuLink from 'components/Link/MenuLink';
import { useRouter } from 'next/router';
import { Auth } from 'aws-amplify';
import Button from '../button';
import { useSelector } from 'react-redux';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import ContactSupport from '@mui/icons-material/ContactSupport';
import { setAllContacts } from 'store/contacts/slice';
import { useDispatch } from 'react-redux';
import { getContacts } from 'api/contacts';
import { getCount } from 'api/contacts';
import { setCount, setOpenedTab, setRefetchData, setSkippedEmptyState, setUserGaveConsent } from '@store/global/slice';
import { SearchIcon } from '@heroicons/react/outline';
import GlobalSearch from '@components/GlobalSearch';
import { getUserConsentStatus } from '@api/google';

const MainMenu = ({
  menuItems = [
    {
      id: 0,
      name: 'Contacts',
      url: '/contacts/clients',
    },
    // {
    //   id: 1,
    //   name: 'Campaigns',
    //   url: '/campaigns/client-campaigns',
    // },
    {
      id: 1,
      name: 'Campaigns',
      url: '/campaign',
    },
    {
      id: 2,
      name: 'Reports',
      url: '/reports',
    },
    {
      id: 3,
      name: 'Marketing',
      url: '/marketing',
    },
    {
      id: 4,
      name: 'Properties',
      url: '/properties',
    },
  ],
  className,
  fixed,
}) => {
  const router = useRouter();
  const userGaveConsent = useSelector((state) => state.global.userGaveConsent);
  const refetchCount = useSelector((state) => state.global.refetchCount);
  const refetchData = useSelector((state) => state.global.refetchData);
  const user = useSelector((state) => state.global.user);
  const dispatch = useDispatch();
  const skippedEmptyState = useSelector((state) => state.global.skippedEmptyState);
  const allContacts = useSelector((state) => state.contacts.allContacts.data);
  const count = useSelector((state) => state.global.count);
  const [openGlobalSearch, setOpenGlobalSearch] = useState(false);
  const handleSignOut = async () => {
    localStorage.removeItem('user');
    localStorage.removeItem('skippedEmptyState');
    localStorage.removeItem('currentSession');
    console.log('sign out');
    await Auth.signOut();
    router.push('/authentication/sign-in');
  };

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await getContacts();
        dispatch(setAllContacts(data.data));
        if (data.data.count === 0 && !skippedEmptyState) {
          localStorage.setItem('skippedEmptyState', true);
          dispatch(setSkippedEmptyState(true));
          router.push({
            pathname: '/contacts/clients',
          });
        }
      } catch (error) {
        console.error(error);
      }

      if (refetchData === true) dispatch(setRefetchData(false));
    };
    fetchContacts();
  }, [refetchData]);

  useEffect(() => {
    const fetchCount = async () => {
      getCount().then((data) => {
        dispatch(setCount(data.data));
      });
    };
    if (refetchData) {
      fetchCount();
    }
  }, [refetchData]);

  const showUncategorizedButton = () => {
    return allContacts && allContacts.length;
  };

  const showSuccessButton = () => {
    return (
      allContacts &&
      allContacts.length &&
      allContacts.filter((contact) => contact.category_1 == 'Uncategorized').length == 0
    );
  };

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ');
  };

  useEffect(() => {
    if (userGaveConsent == null || userGaveConsent == undefined) {
      getUserConsentStatus().then((results) => {
        dispatch(setUserGaveConsent(results.data.scopes));
      });
    }
  }, []);
  useEffect(() => {
    console.log(router.pathname);
  }, [router.pathname]);

  return (
    <div
      className={`${fixed && 'fixed top-0 left-0 right-0'} main-menu px-6 py-4 ${
        !router.pathname.includes('/campaign') ? 'bg-oxford-gradient' : 'bg-campaignHeader'
      } z-50 flex items-center justify-between`}>
      <div className="flex items-center">
        <div className="menu-logo mr-6 flex items-center">
          <Image
            src={oneLineLogo}
            alt=""
            onClick={() => {
              dispatch(setOpenedTab(0));
              router.push('/contacts/clients');
            }}
            className="cursor-pointer"
          />
        </div>
        <div className="menu-links">
          <ul className="flex items-center">
            {menuItems.map((item, index) => {
              return (
                <MenuLink
                  key={item.id}
                  className={`mr-5 ${
                    item.url.split('/')[1] === 'campaign' && router.pathname.split('/')[1] === 'campaign'
                      ? 'active-campaign'
                      : router.pathname.split('/')[1] == item.url.split('/')[1] && item.url.split('/')[1] !== 'campaign'
                      ? 'active'
                      : ''
                  }`}
                  onClick={() => {
                    dispatch(setOpenedTab(0));
                    router.push(item.url);
                  }}>
                  {item.name}
                </MenuLink>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="flex items-center">
        {!router.pathname.includes('campaign') && (
          <>
            {allContacts && allContacts.length > 0 && (
              <SearchIcon
                className={`h-[18px] w-[18px] text-white box-content p-2 rounded-full  ${
                  !router.pathname.includes('/campaign') ? 'hover:bg-campaignMenuHover' : 'hover:bg-menuHover'
                } cursor-pointer`}
                onClick={() => {
                  setOpenGlobalSearch(true);
                }}
              />
            )}
            {openGlobalSearch && <GlobalSearch open={openGlobalSearch} onClose={() => setOpenGlobalSearch(false)} />}
            {showUncategorizedButton() && (
              <Button
                label={showSuccessButton() ? 'All Contacts Categorized' : 'Categorize Contacts'}
                narrow
                success={showSuccessButton()}
                className="mr-4 ml-4"
                onClick={() =>
                  router.push({
                    pathname: '/contacts/uncategorized',
                    query: { categorize: true },
                  })
                }
              />
            )}
          </>
        )}
        <div className="">
          <button
            label="Need Help?"
            className={`text-sm flex items-center justify-center h-9 w-9 p-3 rounded-full mr-4  ${
              !router.pathname.includes('/campaign') ? 'hover:bg-campaignMenuHover' : 'hover:bg-menuHover'
            } text-white`}
            onClick={() => {
              FreshworksWidget('open');
            }}>
            <ContactSupport className="h-[20px]" />
            {/* Need help? */}
          </button>
        </div>
        {/* <Button
          label="Import Google Contacts"
          className="mr-4 "
          onClick={() =>
            router.push({
              pathname: '/contacts/no-contact/',
              query: { start_importing: true },
            })
          }
        /> */}
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="">
              <a href="#">
                <img
                  className="inline-block h-8 w-8 rounded-full"
                  src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
                  alt=""
                />
              </a>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95">
            <Menu.Items className="absolute right-0 z-50 mt-2 w-64 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-5 px-4 flex items-center">
                <div className="mr-3">
                  <img
                    className="inline-block h-10 w-10 rounded-full"
                    src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
                    alt=""
                  />
                </div>
                <div className="max-w-[165px] w-full">
                  {/* <p className="text-sm text-gray6 font-medium">Test User</p> */}
                  <p className="truncate text-sm font-medium text-gray4">{user?.email ? user?.email : user}</p>
                </div>
              </div>
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      className={
                        ' cursor-pointer text-gray6 group flex items-center px-4 py-2 text-sm hover:bg-lightBlue2'
                      }
                      onClick={() => router.push('/my-profile')}>
                      <Settings className="text-gray4 mr-3 h-5 w-5" aria-hidden="true" />
                      Settings
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={'text-gray6 flex items-center px-4 py-2 text-sm bg-red hover:bg-lightBlue2'}
                      onClick={handleSignOut}>
                      <Logout className="text-gray4 mr-3 h-5 w-5" aria-hidden="true" />
                      Logout
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
        {/* <a href="#" onClick={() => Router.push('/my-profile')}>
          <img
            className="inline-block h-8 w-8 rounded-full"
            src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
            alt=""
          />
        </a>
        <button className="text-white ml-2" onClick={handleSignOut}>
          Sign out
        </button> */}
      </div>
    </div>
  );
};

export default MainMenu;
