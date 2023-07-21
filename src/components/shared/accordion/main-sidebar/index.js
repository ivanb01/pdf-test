import { ChevronDownIcon } from '@heroicons/react/solid';
import Text from 'components/shared/text';
import { useState, useEffect } from 'react';
import MenuOpen from '@mui/icons-material/MenuOpen';
import Menu from '@mui/icons-material/Menu';
import Link from 'components/Link';
import UploadFile from '@mui/icons-material/UploadFile';
import Router from 'next/router';
import { setExpandedMenu } from 'store/global/slice';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'components/shared/button';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useRouter } from 'next/router';
import ArrowForward from '@mui/icons-material/ArrowForward';
import ArrowCircleRightOutlined from '@mui/icons-material/ArrowCircleRightOutlined';
import ArrowCircleLeftOutlined from '@mui/icons-material/ArrowCircleLeftOutlined';
import { getCount } from 'api/contacts';
import SmartSyncOverlay from 'components/overlays/smart-sync-overlay';
import { getUserConsentForGoogleEmail } from '@api/google';
const MainSidebar = ({
  tabs,
  openedTab,
  openedSubtab,
  setOpenedTab,
  setOpenedSubtab,
  className,
  collapsable,
  importContacts,
}) => {
  const router = useRouter();
  const contacts = useSelector((state) => state.contacts.data);
  const count = useSelector((state) => state.global.count);
  const dispatch = useDispatch();
  const isSubtabActive = (currentSubtab) => {
    return openedSubtab == currentSubtab;
  };
  const pinned = useSelector((state) => state.global.expandedMenu);
  const [loadingActivateSS, setLoadingActivateSS] = useState(false);
  const [collapseMainTab, setCollapseMainTab] = useState(false);
  const [showSSOverlay, setShowSSOverlay] = useState(false);

  const getCountForSubtab = (subtab) => {
    return count && count[subtab.count_key] ? count[subtab.count_key] : 0;
  };

  const activateSmartSync = async () => {
    setLoadingActivateSS(true);
    try {
      const { data } = await getUserConsentForGoogleEmail();
      console.log('get google authorize', data);
      window.location.href = data.redirect_uri;
    } catch (error) {
      console.log('error occurredw with google import');
    }
  };

  const narrowMenu = () => {
    return (
      <>
        {tabs.map((tab) => {
          return (
            <div className="accordion w-inherit" key={tab.id}>
              <Link
                href="#"
                className={`flex items-center h-10 justify-between px-2 py-4 mx-3 rounded-md ${
                  openedTab == tab.id && 'bg-lightBlue1 text-lightBlue3'
                }`}
                onClick={() => {
                  setOpenedTab(tab.id);
                  router.push(tab.href);
                }}>
                <div
                  className={`flex items-center ${
                    openedTab == tab.id ? 'text-lightBlue3' : 'text-gray5'
                  }`}
                  title={tab.name}>
                  {tab.icon}
                </div>
              </Link>
            </div>
          );
        })}
        {importContacts && (
          <>
            <hr className="my-2 mx-4" />
            <div
              onClick={() => importContacts()}
              className={`cursor-pointer mx-3 px-2 py-2 rounded-md flex items-center text-gray5 `}>
              <UploadFile className="h-5 w-5 text-gray5 cursor-pointer" />
            </div>
          </>
        )}
      </>
    );
  };
  const expandedMenu = () => {
    return (
      <>
        {tabs.map((tab) => {
          return (
            <div className="accordion w-inherit" key={tab.id}>
              <Link
                href="#"
                className={`flex items-center h-10 justify-between px-2 py-4 mx-3  mr-8 rounded-md ${
                  openedTab == tab.id && 'bg-lightBlue1 text-lightBlue3'
                }`}
                onClick={() => {
                  if (openedTab == tab.id) {
                    setCollapseMainTab(!collapseMainTab);
                  }
                  setOpenedTab(tab.id);
                  router.push(tab.href);
                }}>
                <div
                  onClick={() => !tab.subtab && setOpenedTab(tab.id)}
                  className={`flex items-center ${
                    openedTab == tab.id ? 'text-lightBlue3' : 'text-gray5'
                  }`}>
                  {tab.icon}
                  <Text
                    h4
                    className={`ml-3 ${
                      openedTab == tab.id ? 'text-lightBlue3' : 'text-gray5'
                    }`}>
                    {tab.name}
                  </Text>
                </div>

                {tab.subtab && (
                  <ChevronDownIcon
                    className={`text-gray3 h-5 w-5 transition-all duration-300 ${
                      !collapseMainTab && openedTab == tab.id
                        ? 'rotate-180'
                        : ''
                    }`}
                  />
                )}
              </Link>
              {tab.subtab && (
                <div
                  className={
                    !collapseMainTab && openedTab == tab.id ? `ml-11` : `hidden`
                  }>
                  {tab.subtab.map((subtab) => {
                    return (
                      <a
                        key={`${subtab.id}`}
                        href="#"
                        className={`transition-all duration-200 flex items-center ${
                          isSubtabActive(`${subtab.id}`)
                            ? 'text-lightBlue3'
                            : 'text-gray4'
                        }`}
                        onClick={() => setOpenedSubtab(subtab.id)}>
                        {subtab.icon ? subtab.icon : subtab.dot}
                        <Text
                          h4
                          className={`px-[10px] py-[10px] ${
                            isSubtabActive(`${subtab.id}`)
                              ? 'text-lightBlue3'
                              : 'text-gray4'
                          }`}>
                          {subtab.name} ({getCountForSubtab(subtab)})
                        </Text>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
        {importContacts && (
          <>
            <hr className="my-4 mx-4" />
            <div
              onClick={() => importContacts()}
              className={`cursor-pointer mx-3 px-2 py-2 rounded-md flex items-center text-gray5 `}>
              <UploadFile className="h-5 w-5 text-gray5 cursor-pointer" />
              <Text h4 className={`ml-3 text-gray5`}>
                {pinned && 'Import Contacts from CSV'}
              </Text>
            </div>
          </>
        )}
      </>
    );
  };

  return (
    <div
      className={`relative accordion-wrapper pt-6 pb-3 h-full ${className} transition-all flex flex-col justify-between ${
        pinned ? 'w-[315px]' : 'w-[62px]'
      }`}>
      {showSSOverlay && (
        <SmartSyncOverlay
          handleAction={() => activateSmartSync()}
          loading={loadingActivateSS}
          handleCloseOverlay={() => setShowSSOverlay(false)}
        />
      )}
      <div>
        {pinned ? expandedMenu() : narrowMenu()}
        {pinned && (
          <>
            <div className=" w-auto bg-[#EFF6FF] p-3 pb-0 text-sm m-3">
              Import all your contacts from “Google Contacts” in the CRM.
              <a
                onClick={() =>
                  router.push({
                    pathname: '/contacts/no-contact/',
                    query: { start_importing: true },
                  })
                }
                className=" cursor-pointer text-[#2563EB] py-3 pt-6 font-bold flex items-center justify-end">
                Import Google Contacts <ArrowForward className="ml-2 h-5" />
              </a>
            </div>
            <div className="w-auto bg-purple1 p-3 pb-0 text-sm m-3">
              <span className="font-bold">AI algorithms </span>
              intelligently analyze each contact's information from Gmail,
              swiftly identifying their type and status.
              <a
                onClick={() => setShowSSOverlay(true)}
                className="cursor-pointer py-3 pt-6 flex items-center justify-end font-bold text-purple6">
                Setup Smart Sync
                <ArrowForward className="ml-2 h-5" />
              </a>
            </div>
          </>
        )}
      </div>
      {!pinned && (
        <a
          onClick={() =>
            router.push({
              pathname: '/contacts/no-contact/',
              query: { start_importing: true },
            })
          }
          className="!text-blue2 cursor-pointer mt-10 font-medium hover:text-lightBlue4 flex items-center h-10 justify-between px-2 py-4 mx-3 rounded-md">
          <AccountCircle className="h-5" />
        </a>
      )}

      {collapsable && (
        <div
          onClick={() => dispatch(setExpandedMenu(!pinned))}
          className="absolute bg-white text-gray-400 cursor-pointer z-20"
          style={{ right: '-15px', top: '29px' }}>
          {pinned ? (
            <div className="">
              <ArrowCircleLeftOutlined className=" text-3xl" />
            </div>
          ) : (
            <div className="">
              <ArrowCircleRightOutlined className=" text-3xl" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MainSidebar;
