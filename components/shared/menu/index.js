import React from 'react';
import Image from 'next/image';
import oneLineLogo from 'public/images/oneline_logo_white.svg';
import MenuLink from 'components/Link/MenuLink';
import Router, { useRouter } from 'next/router';
import { Auth } from 'aws-amplify';
import Button from '../button';
import { useSelector } from 'react-redux';

const Menu = ({
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
}) => {
  const router = useRouter();

  const handleSignOut = async () => {
    console.log('sign out');
    await Auth.signOut();
    router.push('/authentication/sign-in');
  };

  const contacts = useSelector((state) => state.contacts.data.data);

  const showUncategorizedButton = () => {
    return (
      contacts &&
      contacts.filter((contact) => contact.category_1 == 'Uncategorized')
        .length > 0
    );
  };

  return (
    <div
      className={`${className} main-menu px-6 py-4 bg-oxford-gradient z-10 flex items-center justify-between`}
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
                    router.pathname == item.url ? 'active' : ''
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
        {showUncategorizedButton() && (
          <Button
            label="Start Categorizing Contacts"
            secondary
            size="small"
            className="mr-4"
            onClick={() =>
              router.push({
                pathname: '/contacts/uncategorized',
                query: { categorize: true },
              })
            }
          />
        )}
        <a href="#" onClick={() => Router.push('/my-profile')}>
          <img
            className="inline-block h-8 w-8 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </a>
        <button className="text-white ml-2" onClick={handleSignOut}>
          Sign out
        </button>
      </div>
    </div>
  );
};

export default Menu;
