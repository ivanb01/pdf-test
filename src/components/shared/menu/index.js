import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import oneLineLogo from '/public/images/oneline_logo_white.svg';
import placeholder from '/public/images/Portrait_Placeholder.png';
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
import { menuItems } from '@global/variables';
import PropTypes from 'prop-types';
import { getCount } from 'api/contacts';
import {
  setCount,
  setOpenEmailContactOverlay,
  setOpenedTab,
  setRefetchData,
  setSkippedEmptyState,
  setUserGaveConsent,
  setUserInfo,
} from '@store/global/slice';
import { SearchIcon } from '@heroicons/react/outline';
import GlobalSearch from '@components/GlobalSearch';
import { getUserConsentStatus } from '@api/google';
import Link from 'next/link';
import { getCampaignsByCategory } from '@api/campaign';
import { setCRMCampaigns } from '@store/campaigns/slice';
import { getUserInfo, loadAfterSignInRedirect } from '@helpers/auth';
import { isHealthyCommuncationDate } from '@global/functions';
import ForwardToInbox from '@mui/icons-material/ForwardToInbox';

const MainMenu = ({ className, fixed }) => {
  const willRedirectAfterSignIn = loadAfterSignInRedirect(true);

  const [originalMenuItems, setOriginalMenuItems] = useState([
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
      name: 'Leaderboard',
      url: '/leaderboard',
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
    {
      id: 5,
      name: 'Online Forms',
      url: '/online-forms',
    },
    {
      id: 6,
      name: 'Applications',
      url: '/applications',
    },
  ]);

  const [menuItems, setMenuItems] = useState([
    {
      id: 0,
      name: 'Contacts',
      url: '/contacts/clients',
    },
    {
      id: 1,
      name: 'Campaigns',
      url: '/campaign',
    },
    {
      id: 2,
      name: 'Leaderboard',
      url: '/leaderboard',
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
    {
      id: 5,
      name: 'Online Forms',
      url: '/online-forms',
    },
  ]);
  const router = useRouter();
  const userGaveConsent = useSelector((state) => state.global.userGaveConsent);
  const refetchCount = useSelector((state) => state.global.refetchCount);
  const refetchData = useSelector((state) => state.global.refetchData);
  const dispatch = useDispatch();
  const skippedEmptyState = useSelector((state) => state.global.skippedEmptyState);
  const allContacts = useSelector((state) => state.contacts.allContacts.data);
  const count = useSelector((state) => state.global.count);
  const [openGlobalSearch, setOpenGlobalSearch] = useState(false);
  const handleSignOut = async () => {
    document.cookie = 'isAuthenticated=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    localStorage.removeItem('user');
    localStorage.removeItem('skippedEmptyState');
    localStorage.removeItem('currentSession');
    localStorage.removeItem('isAuthenticated');
    console.log('sign out');
    await Auth.signOut();
    router.push('/authentication/sign-in');
  };

  const userInfo = useSelector((state) => state.global.userInfo);

  useEffect(() => {
    if (userGaveConsent == null || userGaveConsent == undefined) {
      getUserConsentStatus()
        .then((results) => {
          dispatch(setUserGaveConsent(results.data.scopes));
        })
        .catch((error) => {
          console.log(error, 'error');
        });
    }
  }, []);

  const fetchContacts = async () => {
    try {
      const data = await getContacts();
      dispatch(setAllContacts(data.data));
      if (data.data.count === 0 && !skippedEmptyState) {
        localStorage.setItem('skippedEmptyState', true);
        dispatch(setSkippedEmptyState(true));

        if (!willRedirectAfterSignIn) {
          router.push({
            pathname: '/contacts/clients',
          });
        }
      }
    } catch (error) {
      console.error(error);
    }

    if (refetchData === true) dispatch(setRefetchData(false));
  };

  useEffect(() => {
    if (refetchData) {
      fetchContacts();
    }
  }, [refetchData]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const userInformation = useSelector((state) => state.global.userInfo);

  useEffect(() => {
    if (userInformation === null) {
      const userInfo = getUserInfo();
      dispatch(setUserInfo(userInfo));
    }
  }, [userInformation]);
  useEffect(() => {
    const fetchCount = async () => {
      getCount().then((data) => {
        dispatch(setCount(data.data));
      });
    };
    if (refetchData) {
      fetchCount();
    }
  }, [count, allContacts, dispatch, router, skippedEmptyState]);

  const showUncategorizedButton = () => {
    return allContacts && allContacts.length > 0;
  };

  const showSuccessButton = () => {
    return (
      allContacts && allContacts.length && allContacts.data?.filter((contact) => contact.category_1 == 1).length == 0
    );
  };

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ');
  };

  useEffect(() => {
    if (userGaveConsent == null || userGaveConsent == undefined) {
      getUserConsentStatus()
        .then((results) => {
          dispatch(setUserGaveConsent(results.data.scopes));
        })
        .catch((error) => {
          console.log(error, 'error');
        });
    }
  }, []);

  useEffect(() => {
    if (allContacts && !allContacts.length) {
      setMenuItems(originalMenuItems.filter((item) => item.id != 1));
    } else {
      setMenuItems(originalMenuItems);
    }
  }, [allContacts]);
  useEffect(() => {
    if (router.pathname.includes('/campaign')) {
      getCampaignsByCategory('Client')
        .then((res) => {
          dispatch(setCRMCampaigns(res.data));
        })
        .finally(() => {});
    }
  }, []);

  return (
    <div
      className={`${fixed && 'fixed top-0 left-0 right-0'} main-menu px-6 py-4 bg-oxford-gradient  z-50 flex items-center justify-between`}>
      <div className="flex items-center">
        <div className="menu-logo mr-6 flex items-center">
          <Image
            src={oneLineLogo}
            alt=""
            onClick={() => {
              // dispatch(setOpenedTab(0));
              router.push('/dashboard');
            }}
            className="cursor-pointer"
          />
        </div>
        <div className="menu-links">
          <ul className="flex items-center">
            {menuItems.map((item) => {
              return (
                <Link href={item.url} key={item.id} passHref>
                  <MenuLink
                    className={`mr-5 ${router.pathname.split('/')[1] == item.url.split('/')[1] ? 'active' : ''}`}
                    onClick={() => {
                      dispatch(setOpenedTab(0));
                    }}>
                    {item.name}
                  </MenuLink>
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="flex items-center">
        <>
          <a
            onClick={() => {
              console.log('test');
              dispatch(setOpenEmailContactOverlay(true));
            }}
            className="px-4 mr-4 bg-white text-gray6 cursor-pointer flex items-center justify-center transition-all rounded-full border-2 border-gray2 w-auto h-[30px] group overflow-hidden">
            <ForwardToInbox className="h-[16px] w-[16px]" />
            {/* <Add className="text-gray6 group-hover:text-white text-[32px]" /> */}
            <span className="ml-2 group-hover:block text-nowrap text-sm">Send Email</span>
          </a>
          {allContacts && allContacts.length > 0 && (
            <div
              className={`h-[30px] w-[30px] flex items-center justify-center rounded-full ${router.pathname.includes('/campaign') ? 'bg-[#0c5871]' : 'bg-lightBlue5'}  mr-2`}>
              <SearchIcon
                className={`text-bold h-[14px] w-[14px] text-white box-content p-2 rounded-full  ${
                  !router.pathname.includes('/campaign') ? 'hover:bg-campaignMenuHover' : 'hover:bg-menuHover'
                } cursor-pointer`}
                onClick={() => {
                  setOpenGlobalSearch(true);
                }}
              />
            </div>
          )}
          <GlobalSearch open={openGlobalSearch} onClose={() => setOpenGlobalSearch(false)} />
          {/* {showUncategorizedButton() && (
              <Button
                label={showSuccessButton() ? 'All Contacts Categorized' : 'Categorize Contacts'}
                narrow
                success={showSuccessButton()}
                className="mr-4 ml-4"
                onClick={() =>
                  router.push({
                    pathname: '/contacts/uncategorized',
                  })
                }
              />
            )} */}
        </>
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
                <Image width={32} height={32} className="inline-block rounded-full" src={placeholder} alt="" />
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
                  <Image width={40} height={40} className="inline-block rounded-full" src={placeholder} alt="" />
                </div>
                <div className="max-w-[165px] w-full">
                  <p className="truncate text-sm font-medium text-gray4">
                    {userInfo?.first_name ? userInfo?.first_name + ' ' + userInfo?.last_name : userInfo?.email}
                  </p>
                </div>
              </div>
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      className={
                        ' cursor-pointer text-gray6 group flex items-center px-4 py-2 text-sm hover:bg-lightBlue2'
                      }
                      onClick={() => router.push('/settings/my-profile')}>
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
      </div>
    </div>
  );
};

export default MainMenu;

MainMenu.propTypes = {
  fixed: PropTypes.bool,
};
