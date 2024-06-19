import MainMenu from '@components/shared/menu';
import SidebarMenu from '@components/shared/sidebar/sidebar-menu';
import { CreditCardIcon, UserIcon, GlobeAltIcon } from '@heroicons/react/solid';
import { Security, Settings, Summarize, Tune } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { setUserInfo } from 'store/global/slice';
import { getUserInfo } from '@helpers/auth';
import { useDispatch } from 'react-redux';
import MainMenuV2 from '@components/shared/menu/menu-v2';

const SettingsLayout = ({ children }) => {
  const { asPath } = useRouter();
  const dispatch = useDispatch();
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
      children: [
        { name: 'Email', href: 'email-templates', current: false },
        // { name: 'SMS', href: 'sms-templates', current: false },
      ],
    },
    { name: 'Website', href: 'domains', icon: <GlobeAltIcon height={20} className="w-[20px]" />, current: false },
    {
      name: 'Brokerage Settings',
      href: 'brokerage-settings',
      icon: <Tune height={20} className="w-[20px]" />,
      current: false,
    },
    {
      name: 'Website Settings',
      href: 'website-settings',
      icon: <Settings height={20} className="w-[20px]" />,
      current: false,
    },
  ]);

  const setCurrentNavigation = (targetName) => {
    setNavigation((prevNavigation) => {
      const updateCurrent = (items) => {
        return items.map((item) => {
          const isCurrent = item.name === targetName || item.href === targetName;

          if (item.children) {
            return {
              ...item,
              children: updateCurrent(item.children),
              ...(isCurrent && { current: true }),
            };
          } else {
            return { ...item, current: isCurrent };
          }
        });
      };

      return updateCurrent(prevNavigation);
    });
  };

  useEffect(() => {
    const setCurrentFromPath = (asPath) => {
      setNavigation((prevNavigation) => {
        const targetPath = asPath.split('/').pop();
        const updateCurrent = (items) => {
          return items.map((item) => {
            const isCurrent =
              item.href.includes(targetPath) || item.name.replace(/\s+/g, '-').toLowerCase() === targetPath;
            let updatedItem = { ...item, current: isCurrent };
            if (item.children) {
              updatedItem.children = updateCurrent(item.children);
              updatedItem = { ...updatedItem, current: false }; // Ensure parents don't get the current flag
            }
            return updatedItem;
          });
        };
        return updateCurrent(prevNavigation);
      });
    };

    setCurrentFromPath(asPath);
  }, [asPath]);

  useEffect(() => {
    const userInfo = getUserInfo();
    dispatch(setUserInfo(userInfo));
  }, []);

  return (
    <>
      <div className={'sticky z-[9999] top-0'}>
        <MainMenuV2 />
      </div>
      <div className="flex h-full">
        <SidebarMenu navigation={navigation} setCurrentNavigation={setCurrentNavigation} />
        <div className="w-full">{children}</div>
      </div>
    </>
  );
};

export default SettingsLayout;
