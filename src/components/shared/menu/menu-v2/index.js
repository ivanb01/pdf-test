import React, { useEffect, useState, Fragment } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Disclosure, DisclosurePanel, DisclosureButton, Menu, Transition, Popover } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon, ChevronDownIcon, SearchIcon } from '@heroicons/react/outline';
import {
  ExpandMoreRounded,
  Menu as MenuIcon,
  Settings,
  Logout,
  ContactSupport,
  ForwardToInbox,
} from '@mui/icons-material';
import HamburgerIcon from '@components/HamburgerIcon';
import { getCampaignsByCategory } from '@api/campaign';
import {
  setCount,
  setUserGaveConsent,
  setUserInfo,
  setOpenEmailContactOverlay,
  setOpenedTab,
  setRefetchData,
  setSkippedEmptyState,
} from '@store/global/slice';
import { getUserConsentStatus } from '@api/google';
import { getCount, getContacts } from '@api/contacts';
import { useDispatch, useSelector } from 'react-redux';
import MenuLink from 'components/Link/MenuLink';
import { Auth } from 'aws-amplify';
import PropTypes from 'prop-types';
import GlobalSearch from '@components/GlobalSearch';
import { setAllContacts } from 'store/contacts/slice';
import { setCRMCampaigns } from '@store/campaigns/slice';
import { getUserInfo, loadAfterSignInRedirect } from '@helpers/auth';
import { isHealthyCommuncationDate } from '@global/functions';
import Link from 'next/link';
import oneLineLogo from '/public/images/oneline_logo_white.svg';
import placeholder from '/public/images/Portrait_Placeholder.png';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function MainMenuV2() {
  const router = useRouter();
  const [selected, setSelected] = useState(0);

  const [items] = useState([
    // {
    //   id: 0,
    //   title: "Homepage",
    // },
    {
      id: 1,
      title: 'Contacts',
      href: '/contacts/clients',
      submenus: [
        { id: 0, description: 'Active client list pipeline.', title: 'Clients', href: '/contacts/clients' },
        {
          id: 1,
          description: 'Real estate experts, that help you close deals.',
          title: 'Professionals',
          href: '/contacts/professionals',
        },
        {
          id: 2,
          description: 'Clients that need follow-ups.',
          title: 'Need to Contact',
          href: '/contacts/needcontact',
        },
        {
          id: 3,
          description: 'Unsorted contacts that you or A.I. can’t categorize.',
          title: 'Still Unknown',
          href: '/contacts/unknown',
        },
        {
          id: 4,
          description: 'Unsorted contacts that haven’t been reviewed by you or A.I.',
          title: 'Need to Categorize',
          href: '/contacts/uncategorized',
        },
        { id: 5, description: 'Personal connections.', title: 'Family and Friends', href: '/contacts/family' },
        { id: 6, description: 'Deleted contacts.', title: 'Trash', href: '/contacts/trash' },
      ],
    },
    {
      id: 2,
      title: 'Campaigns',
      href: '/campaign',
    },
    {
      id: 3,
      title: 'Properties',
      href: '/properties',
    },
    {
      id: 4,
      title: 'Applications',
      href: '/applications',
    },

    {
      id: 5,
      title: 'Deals',
      href: '/deals',
      submenus: [
        { id: 0, description: 'Closed and pending transactions.', title: 'Deals', href: '/deals' },
        { id: 1, description: 'List of payments received.', title: 'Payments', href: '/payments' },
      ],
    },
    {
      id: 6,
      title: 'Leads',
      href: '/leads',
    },
    {
      id: 7,
      title: 'Online Forms',
      href: '/online-forms',
    },
    {
      id: 8,
      title: 'Resources',
      submenus: [
        {
          id: 0,
          description: 'Suggested and vetted Service providers that help close deals.',
          title: 'Vendors',
          href: '/vendors',
        },
        // {
        //   id: 1,
        //   description: 'Upcoming training sessions and classes.',
        //   title: 'Training Schedule',
        //   href: '/training-schedule',
        // },
        {
          id: 2,
          description: 'Instructional training videos by topic. ',
          title: 'Training Videos',
          href: '/training-videos',
        },
        {
          id: 3,
          description: 'Statistics about each agent that has an account in the CRM.',
          title: 'Leaderboard',
          href: '/leaderboard',
        },
      ],
    },
  ]);

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

  // useEffect(() => {
  //   if (allContacts && !allContacts.length) {
  //     setMenuItems(originalMenuItems.filter((item) => item.id != 1));
  //   } else {
  //     setMenuItems(originalMenuItems);
  //   }
  // }, [allContacts]);
  useEffect(() => {
    if (router.pathname.includes('/campaign')) {
      getCampaignsByCategory('Client')
        .then((res) => {
          dispatch(setCRMCampaigns(res.data));
        })
        .finally(() => {});
    }
  }, []);

  const isSubmenuSelected = (item) => {
    if (typeof window !== 'undefined') {
      return item.submenus.find((submenu) => submenu.href == window.location.pathname) ? true : false;
    }
  };
  return (
    <Disclosure as="nav" className="bg-oxford-gradient">
      {({ menuOpen }) => (
        <>
          <div className="mx-auto px-4 custom:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Image className="h-5 w-auto" src={oneLineLogo} alt="Your Company" />
                </div>
                <div className="hidden custom:ml-6 custom:block">
                  <div className="flex space-x-4">
                    {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                    {items.map((item, index) =>
                      item.submenus ? (
                        <Popover className="relative right-0">
                          {({ open }) => (
                            <>
                              <Popover.Button
                                className={` outline-none rounded-md ${
                                  isSubmenuSelected(item) ? 'bg-menuHover' : 'hover:bg-menuHover'
                                } px-3 py-2 text-sm font-medium text-white`}>
                                {item.title}
                                <ExpandMoreRounded
                                  className={`h-5 w-5 flex-none text-white transition-all ${open ? 'rotate-180' : 'rotate-0'}`}
                                  aria-hidden="true"
                                />
                              </Popover.Button>
                              <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1">
                                <Popover.Panel
                                  className={` ${item.title == 'Resources' ? ' left-[-200%]' : '-left-8'} absolute top-full z-10 mt-3 w-[400px] max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5`}>
                                  <div className="p-4">
                                    {item.submenus.map((submenu) => (
                                      <div
                                        key={submenu.title}
                                        className={`${typeof window !== 'undefined' && window.location.pathname == submenu.href && 'bg-gray-50'} group relative flex gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50`}>
                                        {/* <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                      <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                                    </div> */}
                                        <div className="flex-auto">
                                          <a
                                            onClick={() => router.push(submenu.href)}
                                            className=" cursor-pointer block font-semibold text-gray-900">
                                            {submenu.title}
                                            <span className="absolute inset-0" />
                                          </a>
                                          <p className="mt-1 text-gray-600">{submenu.description}</p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                  <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                                    {/* {callsToAction.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                    >
                      <item.icon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                      {item.name}
                    </a>
                  ))} */}
                                  </div>
                                </Popover.Panel>
                              </Transition>
                            </>
                          )}
                        </Popover>
                      ) : (
                        <a
                          href="#"
                          onClick={() => {
                            setSelected(item.id);
                            router.push(item.href);
                          }}
                          className={`cursor-pointer outline-none rounded-md ${
                            typeof window !== 'undefined' && window.location.pathname == item.href
                              ? 'bg-menuHover'
                              : 'hover:bg-menuHover'
                          } px-3 py-2 text-sm font-medium text-white`}>
                          {item.title}
                        </a>
                      ),
                    )}
                  </div>
                </div>
              </div>
              <div className="hidden custom:ml-6 custom:block">
                <div className="flex items-center">
                  <>
                    {!router.pathname.includes('contacts/details') && (
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
                    )}
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
                          <Image
                            width={32}
                            height={32}
                            className="inline-block rounded-full"
                            src={placeholder}
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
                            <Image
                              width={40}
                              height={40}
                              className="inline-block rounded-full"
                              src={placeholder}
                              alt=""
                            />
                          </div>
                          <div className="max-w-[165px] w-full">
                            <p className="truncate text-sm font-medium text-gray4">
                              {userInfo?.first_name
                                ? userInfo?.first_name + ' ' + userInfo?.last_name
                                : userInfo?.email}
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
              <div className="-mr-2 flex custom:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <HamburgerIcon open={menuOpen} />
                  <span className="sr-only">Open main menu</span>
                </Disclosure.Button>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="custom:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
              {items.map((item) =>
                item.submenus ? (
                  <Disclosure as="div" className="">
                    {({ open }) => (
                      <>
                        <Disclosure.Button
                          as="a"
                          href="#"
                          className="block rounded-md px-3 py-2 text-base font-medium text-white">
                          {item.title}
                          <ExpandMoreRounded
                            className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                            aria-hidden="true"
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="mt-2 space-y-2">
                          {item.submenus.map((item) => (
                            <Disclosure.Button
                              key={item.id}
                              as="a"
                              // href={item.href}
                              className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-white hover:bg-gray-50">
                              {item.title}
                            </Disclosure.Button>
                          ))}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ) : (
                  <Disclosure.Button
                    as="a"
                    href="#"
                    className="block rounded-md px-3 py-2 text-base font-medium text-white">
                    {item.title}
                  </Disclosure.Button>
                ),
              )}
            </div>
            <div className="border-t border-gray-300 pb-3 pt-4">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-white">Tom Cook</div>
                  <div className="text-sm font-medium text-white">tom@example.com</div>
                </div>
              </div>
              <div className="mt-3 space-y-1 px-2">
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700 hover:text-white">
                  Your Profile
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700 hover:text-white">
                  Settings
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700 hover:text-white">
                  Sign out
                </Disclosure.Button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
