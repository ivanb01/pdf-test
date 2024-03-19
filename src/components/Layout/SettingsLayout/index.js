import MainMenu from '@components/shared/menu';
import SidebarMenu from '@components/shared/sidebar/sidebar-menu';
import { CreditCardIcon, UserIcon } from '@heroicons/react/solid';
import { Security, Summarize } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const SettingsLayout = ({ children }) => {
  const { asPath } = useRouter();
  const [navigation, setNavigation] = useState([
    { name: 'My Profile', href: 'my-profile', icon: <UserIcon height={20} className="w-[20px]" />, current: true },
    {
      name: 'Account Management',
      href: 'account-management',
      icon: <Security className="w-[20px] h-[20px]" />,
      current: false,
    },
    {
      name: 'Billing',
      href: 'billing',
      icon: <CreditCardIcon className="w-[20px] h-[20px]" />,
      current: false,
    },
    {
      name: 'Templates',
      href: '#',
      icon: <Summarize className="w-[20px] h-[20px]" />,
      current: false,
      children: [
        { name: 'Email', href: '#' },
        { name: 'SMS', href: '#' },
      ],
    },
  ]);
  useEffect(() => {
    if (!asPath.includes(navigation.find((item) => item.current).href)) {
      setNavigation((prevNavigation) =>
        prevNavigation.map((navigationItem) => {
          return asPath.includes(navigationItem.href)
            ? { ...navigationItem, current: true }
            : { ...navigationItem, current: false };
        }),
      );
    }
  }, [navigation]);

  return (
    <>
      <MainMenu />
      <div className="flex h-full">
        <SidebarMenu navigation={navigation} setNavigation={setNavigation} />
        <div className="w-full">{children}</div>
      </div>
    </>
  );
};

export default SettingsLayout;
