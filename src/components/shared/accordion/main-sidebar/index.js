import { ChevronDownIcon } from '@heroicons/react/solid';
import Text from 'components/shared/text';
import React, { useState, useEffect } from 'react';
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
import Image from 'next/image';
import GoogleContact from '../../../../../public/images/GoogleContact.png';

const Tour = dynamic(() => import('components/onboarding/tour'), {
  ssr: false,
});
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import SubMenuContent from '@components/shared/SubMenuCard';
import AIChip from '@components/shared/chip/ai-chip';
import { isHealthyCommuncationDate } from '@global/functions';
import Overlay from '@components/shared/overlay';

const getNeedToCommunicateContacts = (allContacts) => {
  if (!allContacts) {
    return;
  }
  return (
    allContacts &&
    allContacts.filter((contact) => {
      const categoryType = contact?.category_1?.toLowerCase() + 's';
      if (categoryType !== 'clients') {
        return false;
      }
      let isHealthyCommunication = isHealthyCommuncationDate(contact.last_communication_date);
      return !isHealthyCommunication;
    }).length
  );
};
const getCountForTabOrSubtab = (count_key, count, allContacts) => {
  if (!count || !allContacts) {
    return;
  }
  if (count_key === 'need_to_contact' && allContacts) {
    return '(' + getNeedToCommunicateContacts(allContacts) + ')';
  } else if (count_key === 'other_total') {
    return '(' + (count && count[count_key] ? count['other_family_friends'] + count['uncategorized_unknown'] : 0) + ')';
  } else {
    return '(' + (count && count[count_key] ? count[count_key] : 0) + ')';
  }
};
const MainSidebar = ({ tabs, openedTab, setOpenedTab, className, collapsable, importContacts }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const count = useSelector((state) => state.global.count);
  const userGaveConsent = useSelector((state) => state.global.userGaveConsent);
  const pinned = useSelector((state) => state.global.expandedMenu);
  const [loadingActivateSS, setLoadingActivateSS] = useState(false);
  const [showSSOverlay, setShowSSOverlay] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [finishedOnboarding, setFinishedOnboarding] = useState(false);
  const [startedOnboarding, setStartedOnboarding] = useState(false);
  const allContacts = useSelector((state) => state.contacts.allContacts.data);
  const activateSmartSync = async () => {
    setLoadingActivateSS(true);
    if (!localStorage.getItem('finishedTour')) {
      localStorage.setItem('finishedTour', true);
      localStorage.setItem('openTour', true);
    }
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

  useEffect(() => {
    let finishedTour = localStorage.getItem('finishedTour') ? localStorage.getItem('finishedTour') : false;
    setFinishedOnboarding(finishedTour);
  }, []);

  const groupedTabs = {};

  tabs.forEach((tab) => {
    if (!groupedTabs[tab.groupName]) {
      groupedTabs[tab.groupName] = [];
    }
    groupedTabs[tab.groupName].push(tab);
  });
  const openedSubtab = useSelector((state) => state.global.openedSubtab);
  const narrowMenu = (openedTab, openedSubtab) => {
    const isSubtabActive = (currentSubtab, tabId) => {
      return openedSubtab == currentSubtab && openedTab == tabId;
    };
    const allContacts = useSelector((state) => state.contacts.allContacts.data);

    const showPulse = (tab) => {
      if (allContacts) {
        if (tab.href == 'needcontact') {
          return (
            allContacts.filter((contact) => {
              const categoryType = contact?.category_1?.toLowerCase() + 's';
              if (categoryType !== 'clients') {
                return false;
              }
              let isHealthyCommunication = isHealthyCommuncationDate(contact.last_communication_date);
              return !isHealthyCommunication;
            }).length > 0
          );
        }
      }
    };

    return (
      <div className="accordion w-inherit cursor-pointer">
        {tabs.map((tab) => {
          return (
            <SubMenuContent
              side={'start'}
              align={'bottom'}
              style={{ marginLeft: '62px' }}
              triggerElement={
                <div>
                  <Link
                    href="#"
                    className={`hover:bg-gray1 relative flex cursor-pointer  items-center  h-10 justify-center px-2 py-4 mx-3 rounded-md  ${
                      openedTab == tab.id && 'bg-lightBlue1 text-lightBlue3'
                    }`}
                    onClick={() => {
                      setOpenedTab(tab.id);
                      router.push(tab.href);
                      setExpandedTab({ id: tab.id, opened: true });
                    }}>
                    <div
                      className={` flex items-center cursor-pointer ${
                        openedTab == tab.id ? 'text-lightBlue3' : 'text-gray5'
                      }`}
                      title={tab.name}>
                      <div title={''}>{tab.icon}</div>
                      {showPulse(tab) && (
                        <span class="absolute right-0 top-2 flex h-2 w-2 ml-4">
                          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                          <span class="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                        </span>
                      )}
                    </div>
                  </Link>
                </div>
              }>
              {tab.subtab ? (
                <div className={`absolute flex flex-col bg-white border border-gray2 rounded-md`}>
                  {tab.subtab.map((t) => (
                    <div
                      className={`hover:bg-gray1 rounded-md ${
                        isSubtabActive(t.id, tab.id)
                          ? 'text-lightBlue3 bg-lightBlue1 font-semibold'
                          : 'text-gray4 font-medium'
                      }`}>
                      <div
                        role={'button'}
                        onClick={() => {
                          setOpenedTab(tab.id);
                          dispatch(setOpenedSubtab(t.id));
                          router.push(tab.href);
                        }}
                        className={`px-5 py-3 gap-[5px] transition-all duration-200 text-gray4 text-sm relative flex items-center`}>
                        {t?.dot}
                        <div className={'w-max'}>{t.name}</div>
                        <p>{getCountForTabOrSubtab(t.count_key, count, allContacts)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={`absolute flex mt-1 shadowCustom`}>
                  <div className={'bg-gray8 h-4 w-4 mt-[10px] ml-[-10px] rotate-45'}></div>
                  <div
                    className={`px-3 text-sm w-max leading-5 font-semibold  py-2 flex flex-col bg-gray8 ml-[-10px] rounded-md z-10 text-white`}>
                    {tab.name}
                  </div>
                </div>
              )}
            </SubMenuContent>
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
      </div>
    );
  };

  const expandedMenu = () => {
    const allContacts = useSelector((state) => state.contacts.allContacts.data);

    return (
      <SimpleBar autoHide={true} style={{ maxHeight: '72vh' }}>
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
        {showSSOverlay ? (
          <>
            <SmartSyncOverlay
              handleAction={() => activateSmartSync()}
              loading={loadingActivateSS}
              handleCloseOverlay={() => setShowSSOverlay(false)}
            />
          </>
        ) : (
          <></>
        )}
        {!finishedOnboarding &&
          showOnboarding &&
          !userGaveConsent?.includes('gmail') &&
          !userGaveConsent?.includes('contacts') && <Onboarding setStartedOnboarding={setShowSSOverlay} />}
        <div>
          {pinned ? expandedMenu() : narrowMenu(openedTab, openedSubtab)}
          {pinned && (
            <>
              {userGaveConsent && (
                <>
                  {userGaveConsent?.includes('gmail') && userGaveConsent?.includes('contacts') && (
                    <>
                      <div
                        className={`absolute flex gap-[10px] bg-white mb-[-10px] absoluteWidth bottom-6 transition-all w-auto text-gray-700 p-3 pb-0 text-sm mx-3`}>
                        <div className={'relative  w-6 mt-1'}>
                          <img
                            src={checkmark.src}
                            className="h-[13px] w-[13px] border border-white absolute top-[-13px] left-[11px] rounded-full"
                          />
                          <Image src={GoogleContact} height={20} width={20} style={{ marginTop: '-6px' }} />
                        </div>
                        <TooltipComponent
                          side={'bottom'}
                          align={'start'}
                          style={{ marginBottom: '12px' }}
                          triggerElement={
                            <div className={'relative  w-6 mt-1 h-4'}>
                              <img
                                src={checkmark.src}
                                className="h-[15px] w-[15px] absolute top-[-10px]   rounded-full left-[13px] border border-white"
                              />
                              <AIChip reviewed={false} />
                            </div>
                          }>
                          <div className={`w-[270px] pointer-events-none text-xs text-white bg-neutral1 rounded-lg`}>
                            <p className="">
                              From now on each new contact that you will communicate in Gmail will be synced here and
                              categorized by AI.
                            </p>
                          </div>
                        </TooltipComponent>
                        <a
                          onClick={() =>
                            router.push({
                              pathname: '/contacts/clients/',
                              query: { start_importing: true },
                            })
                          }
                          className="group cursor-pointer ml-5 pt-0 flex items-center justify-start font-semibold text-blue-600">
                          Re-import
                          <ArrowForward className="ml-2 h-5 group-hover:translate-x-1 transition-all" />
                        </a>
                      </div>
                    </>
                  )}
                  {!userGaveConsent?.includes('gmail') && !userGaveConsent?.includes('contacts') && (
                    <div
                      className={` p-3  border border-purple-400 rounded-xl transition-all w-auto bg-purple-50 text-xs m-3 setup-smart-sync`}>
                      <div className="text-xs font-semibold text-gray6">
                        Setup <span className="font-bold text-gray-900">“Gmail Smart Sync Contacts by AI”</span> and{' '}
                        <span className="font-bold text-gray-900">“Import Google Contacts”</span> in order to import
                        contacts from Gmail.
                      </div>
                      <button
                        onClick={() => setShowSSOverlay(true)}
                        type="button"
                        className="flex mt-2 bg-[#EDDDFD] rounded-md px-2 py-1.5 text-sm items-center font-medium text-gray7 ml-auto hover:bg-purple-200 focus:outline-none">
                        Setup <ArrowForward className="ml-2 h-4 group-hover:translate-x-1 transition-all" />
                      </button>
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
            style={{ right: '-13px', bottom: pinned ? '10px' : '20px', zIndex: 100 }}>
            <div className="">
              <Image height={26} width={26} src={pinned ? ArrowLeft.src : ArrowRight.src} />
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
    setOpenedTab(-1);
    if (openedSubtab !== -1) {
      setOpenedSubtab(-1);
    } else {
      setOpenedSubtab(openedSubtab);
    }

    dispatch(setExpandedTab({ id: 0, opened: true }));
  }, []);

  const isSubtabActive = (currentSubtab, tabId) => {
    return openedSubtab == currentSubtab && openedTab == tabId;
  };
  const router = useRouter();
  const count = useSelector((state) => state.global.count);

  const findOpenedId = (tabId) => {
    return tabs.length > 0 && tabs.find((tab) => tab.id === tabId);
  };

  useEffect(() => {
    if (openedTab !== 0 && openedTab !== 1) {
      dispatch(setExpandedTab({ id: 0, opened: false }));
      dispatch(setExpandedTab({ id: 1, opened: false }));
    }
  }, [openedTab]);
  useEffect(() => {
    console.log(openedSubtab, 'openedSubtab');
  }, [openedSubtab]);

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

  const allContacts = useSelector((state) => state.contacts.allContacts.data);

  const showPulse = (tab) => {
    if (allContacts) {
      if (tab.href == 'needcontact') {
        return (
          allContacts.filter((contact) => {
            const categoryType = contact?.category_1?.toLowerCase() + 's';
            if (categoryType !== 'clients') {
              return false;
            }
            let isHealthyCommunication = isHealthyCommuncationDate(contact.last_communication_date);
            return !isHealthyCommunication;
          }).length > 0
        );
      }
    }
  };

  return (
    <div className={`accordion w-inherit  ${tab.name.toLowerCase()}`} key={tab.id}>
      <Link
        href="#"
        onClick={() => {
          handleTabClick();
        }}
        className={`flex items-center h-8 justify-between w-inherit ${openedTab === tab.id && ' text-lightBlue3'} ${
          (openedTab === 4 && tab.id === 4) ||
          (openedTab === 2 && tab.id === 2) ||
          (openedTab === 3 && tab.id === 3) ||
          (openedTab === 5 && tab.id === 5) ||
          (openedTab === 6 && tab.id === 6)
            ? 'bg-lightBlue1'
            : ''
        }`}>
        <div className={'flex items-center h-8 justify-between pl-2 pr-3 hover:bg-gray1 w-[241px]'}>
          <div className={` flex items-center ${openedTab === tab.id ? 'text-lightBlue3' : 'text-gray3'} `}>
            {tab.icon}
            <Text h4 className={`pl-3 pr-1 py-[0px] ${openedTab === tab.id ? 'text-lightBlue3' : 'text-gray5'}`}>
              {tab.name}
            </Text>
            <Text h4 className={`py-[0px] ${openedTab === tab.id ? 'text-lightBlue3' : 'text-gray5'}`}>
              {getCountForTabOrSubtab(tab.count_key, count, allContacts)}
            </Text>
            {showPulse(tab) && (
              <span class="relative flex h-2 w-2 ml-4">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
              </span>
            )}
          </div>

          {tab.subtab && (
            <ArrowDropDownIcon
              className={`text-gray3 h-5 w-5 transition-all duration-300 ${
                findOpenedId(tab.id).opened ? 'rotate-180' : ''
              }`}
            />
          )}
        </div>
      </Link>
      {tab.subtab && (
        <div className={findOpenedId(tab.id).opened ? `` : `hidden`}>
          {tab.subtab.map((subtab) => {
            return (
              <a
                key={`${subtab.id}`}
                href="#"
                className={`h-8 hover:bg-gray1 px-10 transition-all duration-200 flex items-center ${
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
                <Text
                  h4
                  className={`pl-1 ${subtab.icon || (subtab.dot && 'pl-[5px]')}  py-[10px]  ${
                    isSubtabActive(subtab.id, tab.id) ? 'text-lightBlue3' : 'text-gray4'
                  }`}>
                  {getCountForTabOrSubtab(subtab.count_key, count, allContacts)}
                </Text>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
};
