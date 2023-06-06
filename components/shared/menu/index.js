import React from 'react';
import Image from 'next/image';
import oneLineLogo from 'public/images/oneline_logo_white.svg';
import MenuLink from 'components/Link/MenuLink';
import Router, { useRouter } from 'next/router';
import { Auth } from 'aws-amplify';
import Button from '../button';
import { useSelector } from 'react-redux';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import ContactSupport from '@mui/icons-material/ContactSupport';

const MainMenu = ({
  menuItems = [
    {
      id: 0,
      name: 'Contacts',
      url: '/contacts/clients',
    },
    {
      id: 1,
      name: 'Campaigns',
      url: '/campaigns',
    },
  ],
  className,
  fixed,
}) => {
  const router = useRouter();
  const user = useSelector((state) => state.global.user);

  const handleSignOut = async () => {
    localStorage.removeItem('user');
    localStorage.removeItem('skippedEmptyState');
    console.log('sign out');
    await Auth.signOut();
    router.push('/authentication/sign-in');
  };

  const allContacts = useSelector((state) => state.contacts.allContacts.data);

  const showUncategorizedButton = () => {
    return (
      allContacts &&
      allContacts.filter((contact) => contact.category_1 == 'Uncategorized')
        .length > 0
    );
  };

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ');
  };

  return (
    <div
      className={`${
        fixed && 'fixed top-0 left-0 right-0'
      } main-menu px-6 py-4 bg-oxford-gradient z-10 flex items-center justify-between`}
    >
      <div className="flex items-center">
        <div className="menu-logo mr-6 flex items-center">
          <Image
            src={oneLineLogo}
            alt=""
            onClick={() => Router.push('/contacts/clients')}
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
                    router.pathname.split('/')[1] == item.url.split('/')[1]
                      ? 'active'
                      : ''
                  }`}
                  onClick={() => router.push(item.url)}
                >
                  {item.name}
                </MenuLink>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="flex items-center">
        <div className="">
          <button
            label="Need Help?"
            className=" text-sm flex items-center justify-center h-[38px] px-3 rounded-full min-w-[130px] mr-4 bg-transparent border border-white text-white"
            onClick={() => {
              FreshworksWidget('open');
            }}
          >
            <ContactSupport className="mr-1 h-[20px]" />
            Need help?
          </button>
        </div>
        <Button
          label="Import Google Contacts"
          className="mr-4 "
          onClick={() =>
            router.push({
              pathname: '/contacts/no-contact/',
              query: { start_importing: true },
            })
          }
        />
        {showUncategorizedButton() && (
          <Button
            label="Categorize Contacts"
            secondary
            className="mr-4"
            onClick={() =>
              router.push({
                pathname: '/contacts/uncategorized',
                query: { categorize: true },
              })
            }
          />
        )}
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
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-64 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                  <p className="truncate text-sm font-medium text-gray4">
                    {user?.email ? user?.email : user}
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
                      onClick={() => Router.push('/my-profile')}
                    >
                      <Settings
                        className="text-gray4 mr-3 h-5 w-5"
                        aria-hidden="true"
                      />
                      Settings
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={
                        'text-gray6 flex items-center px-4 py-2 text-sm hover:bg-lightBlue2'
                      }
                      onClick={handleSignOut}
                    >
                      <Logout
                        className="text-gray4 mr-3 h-5 w-5"
                        aria-hidden="true"
                      />
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
