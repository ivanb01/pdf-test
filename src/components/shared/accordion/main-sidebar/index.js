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
import { getCount } from 'api/contacts';
import SmartSyncOverlay from 'components/overlays/smart-sync-overlay';
import ArrowLeft from '/public/images/arrow-circle-left.svg';
import ArrowRight from '/public/images/arrow-circle-right.svg';
import { CSSTransition } from 'react-transition-group';
import { setUserGaveConsent } from 'store/global/slice';
import CheckCircle from '@mui/icons-material/CheckCircle';
import {
  getUserConsentForGoogleContactsAndEmail,
  getUserConsentForGoogleEmail,
  getUserConsentStatus,
} from '@api/google';
import googleContactsIcon from '/public/images/google-contacts.png';
import checkmark from '/public/images/checkmark.svg';
import Info from '@mui/icons-material/Info';
import TooltipComponent from '@components/shared/tooltip';
import { setOpenedTab, setOpenedSubtab, setExpandedTab } from 'store/global/slice';
import SimpleBar from 'simplebar-react';
import Onboarding from '@components/overlays/onboarding';
import dynamic from 'next/dynamic';
const Tour = dynamic(() => import('components/onboarding/tour'), {
  ssr: false,
});
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const MainSidebar = ({ tabs, openedTab, setOpenedTab, className, collapsable, importContacts }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const userGaveConsent = useSelector((state) => state.global.userGaveConsent);
  const pinned = useSelector((state) => state.global.expandedMenu);
  const [loadingActivateSS, setLoadingActivateSS] = useState(false);
  const [showSSOverlay, setShowSSOverlay] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [startedOnboarding, setStartedOnboarding] = useState(false);
  const allContacts = useSelector((state) => state.contacts.allContacts.data);

  const activateSmartSync = async () => {
    setLoadingActivateSS(true);
    try {
      const { data } = await getUserConsentForGoogleContactsAndEmail();
      window.location.href = data.redirect_uri;
    } catch (error) {
      console.log('error occurredw with google import');
    }
  };

  useEffect(() => {
    if (allContacts && !allContacts?.length) {
      if (window.location.pathname.includes('/contacts/clients')) setShowOnboarding(true);
    }
  }, [allContacts]);

  const groupedTabs = {};

  tabs.forEach((tab) => {
    if (!groupedTabs[tab.groupName]) {
      groupedTabs[tab.groupName] = [];
    }
    groupedTabs[tab.groupName].push(tab);
  });

  const narrowMenu = () => {
    return (
      <>
        {tabs.map((tab) => {
          return (
            <div className="accordion w-inherit" key={tab.id}>
              <Link
                href="#"
                className={`flex  items-center  h-10 justify-center px-2 py-4 mx-3 rounded-md ${
                  openedTab == tab.id && 'bg-lightBlue1 text-lightBlue3'
                }`}
                onClick={() => {
                  setOpenedTab(tab.id);
                  router.push(tab.href);
                }}>
                <div
                  className={`flex items-center  ${openedTab == tab.id ? 'text-lightBlue3' : 'text-gray5'}`}
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
      <SimpleBar autoHide={true} style={{ maxHeight: '63vh' }}>
        <div className={'mx-3'}>
          {Object.keys(groupedTabs).map((groupName, index) => (
            <div
              key={groupName}
              className={`${index === 0 ? '' : ' pt-4'} ${index == 2 && 'other'} ${index == 1 && 'needs-attention'}`}>
              <h2 className="text-gray4 text-xs font-medium leading-5 uppercase pl-2">{groupName}</h2>
              {groupedTabs[groupName].map((tab) => (
                <TabBar key={tab.id} tab={tab} />
              ))}
            </div>
          ))}
        </div>
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
      </SimpleBar>
    );
  };

  return (
    <>
      <div
        className={`relative accordion-wrapper pt-6 pb-3 h-full ${className} transition-all flex flex-col justify-between ${
          pinned ? 'w-[265px]' : 'w-[62px]'
        }`}>
        {showSSOverlay && (
          <SmartSyncOverlay
            handleAction={() => activateSmartSync()}
            loading={loadingActivateSS}
            handleCloseOverlay={() => setShowSSOverlay(false)}
          />
        )}
        {showOnboarding && !userGaveConsent?.includes('gmail') && !userGaveConsent?.includes('contacts') && (
          <Onboarding handleCloseOverlay={() => setShowOnboarding(false)} setStartedOnboarding={setStartedOnboarding} />
        )}
        {startedOnboarding && <Tour for={'clients'} />}
        <div>
          {pinned ? expandedMenu() : narrowMenu()}
          {pinned && (
            <>
              {userGaveConsent && (
                <>
                  {userGaveConsent?.includes('gmail') && userGaveConsent?.includes('contacts') && (
                    <div
                      className={`absolute  absoluteWidth bottom-6 transition-all w-auto bg-blue-50 text-gray-700 p-3 pb-0 text-sm mx-3 mt-6`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <img src={checkmark.src} className="h-[17px] w-[17px]" />
                          <div className="ml-[6px] font-medium">Smart Sync: Active</div>
                        </div>
                        <TooltipComponent
                          side={'bottom'}
                          align={'start'}
                          triggerElement={<Info className="h-5 w-5 text-gray3 hover:text-gray4" aria-hidden="true" />}>
                          <div className={`w-[270px] pointer-events-none text-xs text-white bg-neutral1 rounded-lg`}>
                            <p className="">
                              From now on each new contact that you will communicate in Gmail will be synced here and
                              categorized by AI.
                            </p>
                          </div>
                        </TooltipComponent>
                      </div>
                      <hr className="my-3" />
                      <div className="flex items-center mb-4">
                        <div className="flex items-center">
                          <img src={checkmark.src} className="h-[17px] w-[17px]" />
                          <div className="ml-[6px] font-medium">Google Contacts: Active</div>
                        </div>
                        <div></div>
                      </div>
                      <a
                        onClick={() =>
                          router.push({
                            pathname: '/contacts/no-contact/',
                            query: { start_importing: true },
                          })
                        }
                        className="group cursor-pointer pb-3 pt-0 flex items-center justify-start font-semibold text-blue-600">
                        Re-import
                        <ArrowForward className="ml-2 h-5 group-hover:translate-x-1 transition-all" />
                      </a>
                    </div>
                  )}
                  {!userGaveConsent?.includes('gmail') && !userGaveConsent?.includes('contacts') && (
                    <div className={`transition-all w-auto bg-purple1 pb-0 text-xs m-3 setup-smart-sync`}>
                      <div className="p-3">
                        Setup <span className="font-bold">“Smart Sync Contacts by AI”</span> and{' '}
                        <span className="font-bold">“Import Google Contacts”</span> in order to import contacts from
                        Gmail.
                      </div>
                      <a
                        className="px-3 bg-purple-100 text-[14px] group cursor-pointer py-3 flex items-center justify-end font-medium text-purple6"
                        onClick={() => setShowSSOverlay(true)}>
                        Setup
                        <ArrowForward className="ml-2 h-5 group-hover:translate-x-1 transition-all" />
                      </a>
                    </div>
                  )}
                </>
              )}
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
            className="absolute cursor-pointer"
            style={{ right: '-13px', bottom: pinned ? '10px' : '20px', zIndex: 1 }}>
            <div className="">
              <img src={pinned ? ArrowLeft.src : ArrowRight.src} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MainSidebar;

const TabBar = ({ tab }) => {
  const dispatch = useDispatch();
  const openedTab = useSelector((state) => state.global.openedTab);
  const tabs = useSelector((state) => state.global.tabs);
  const openedSubtab = useSelector((state) => state.global.openedSubtab);

  useEffect(() => {
    setOpenedTab(0);
    setOpenedSubtab(0);
    dispatch(setExpandedTab({ id: 0, opened: true }));
  }, []);

  const isSubtabActive = (currentSubtab, tabId) => {
    return openedSubtab == currentSubtab && openedTab == tabId;
  };
  const router = useRouter();
  const count = useSelector((state) => state.global.count);

  const getCountForTabOrSubtab = (count_key) => {
    if (count_key === 'other_total') {
      return count && count[count_key] ? count['other_family_friends'] + count['uncategorized_unknown'] : 0;
    }
    return count && count[count_key] ? count[count_key] : 0;
  };

  const findOpenedId = (tabId) => {
    return tabs.length > 0 && tabs.find((tab) => tab.id === tabId);
  };

  useEffect(() => {
    if (openedTab !== 0 && openedTab !== 1) {
      dispatch(setExpandedTab({ id: 0, opened: false }));
      dispatch(setExpandedTab({ id: 1, opened: false }));
    }
  }, [openedTab]);

  const handleTabClick = () => {
    if (tab.id === 4 || tab.id === 5 || tab.id === 2 || tab.id === 3 || tab.id === 6) {
      router.push(tab.href);
    }
    dispatch(setExpandedTab({ id: tab.id, opened: !findOpenedId(tab.id).opened }));
  };

  const handleSubtabClick = (subtabId) => {
    dispatch(setOpenedTab(tab.id));
    dispatch(setOpenedSubtab(subtabId));
    router.push(tab.href);
  };

  return (
    <div className={`accordion w-inherit ${tab.name.toLowerCase()}`} key={tab.id}>
      <Link
        href="#"
        className={`flex items-center h-8 justify-between pl-2 pr-3 ${openedTab === tab.id && ' text-lightBlue3'} ${
          (openedTab === 4 && tab.id === 4) ||
          (openedTab === 2 && tab.id === 2) ||
          (openedTab === 3 && tab.id === 3) ||
          (openedTab === 5 && tab.id === 5) ||
          (openedTab === 6 && tab.id === 6)
            ? 'bg-lightBlue1'
            : ''
        }`}
        onClick={handleTabClick}>
        <div className={`flex items-center ${openedTab === tab.id ? 'text-lightBlue3' : 'text-gray3'} `}>
          {tab.icon}
          <Text h4 className={`px-3 py-[0px] ${openedTab === tab.id ? 'text-lightBlue3' : 'text-gray5'}`}>
            {tab.name}
          </Text>
        </div>

        {tab.subtab && (
          <ArrowDropDownIcon
            className={`text-gray3 h-5 w-5 transition-all duration-300 ${
              findOpenedId(tab.id).opened ? 'rotate-180' : ''
            }`}
          />
        )}
      </Link>
      {tab.subtab && (
        <div className={findOpenedId(tab.id).opened ? `` : `hidden`}>
          {tab.subtab.map((subtab) => {
            return (
              <a
                key={`${subtab.id}`}
                href="#"
                className={`h-8 px-10 transition-all duration-200 flex items-center ${
                  isSubtabActive(subtab.id, tab.id) ? 'text-lightBlue3 bg-lightBlue1' : 'text-gray4'
                }`}
                onClick={() => handleSubtabClick(subtab.id)}>
                {subtab.icon ? subtab.icon : subtab.dot}
                <Text
                  h4
                  className={` ${subtab.icon || (subtab.dot && 'pl-[10px]')} py-[10px] ${
                    isSubtabActive(subtab.id, tab.id) ? 'text-lightBlue3' : 'text-gray4'
                  }`}>
                  {subtab.name}
                </Text>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
};
