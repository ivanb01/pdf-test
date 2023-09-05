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
import { getUserConsentForGoogleEmail, getUserConsentStatus } from '@api/google';
import googleContactsIcon from '/public/images/google-contacts.png';
import checkmark from '/public/images/checkmark.svg';
import Info from '@mui/icons-material/Info';
import TooltipComponent from '@components/shared/tooltip';
import { setOpenedTab, setOpenedSubtab, setExpandedTab } from 'store/global/slice';
import SimpleBar from 'simplebar-react';

const MainSidebar = ({ tabs, openedTab, setOpenedTab, className, collapsable, importContacts }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const userGaveConsent = useSelector((state) => state.global.userGaveConsent);
  const pinned = useSelector((state) => state.global.expandedMenu);
  const [loadingActivateSS, setLoadingActivateSS] = useState(false);
  const [showSSOverlay, setShowSSOverlay] = useState(false);

  const activateSmartSync = async () => {
    setLoadingActivateSS(true);
    try {
      const { data } = await getUserConsentForGoogleEmail();
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
      <SimpleBar autoHide style={{ maxHeight: '60vh' }}>
        {tabs.map((tab) => {
          return <TabBar tab={tab} />;
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
      </SimpleBar>
    );
  };

  return (
    <>
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
              {userGaveConsent && (
                <>
                  {userGaveConsent?.includes('gmail') && userGaveConsent?.includes('contacts') && (
                    <div className={`transition-all w-auto bg-blue-50 text-gray-700 p-3 pb-0 text-sm mx-3 mt-6`}>
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
                          <img src={googleContactsIcon.src} className="h-[17px] w-[17px]" />
                          <div className="ml-[6px] font-medium">Google Contacts: Active</div>
                        </div>
                        <div></div>
                      </div>
                      Click this button whenever you want to import your Google Contacts
                      <a
                        onClick={() =>
                          router.push({
                            pathname: '/contacts/no-contact/',
                            query: { start_importing: true },
                          })
                        }
                        className="group cursor-pointer py-3 pt-6 flex items-center justify-start font-semibold text-blue-600">
                        Import Google Contacts
                        <ArrowForward className="ml-2 h-5 group-hover:translate-x-1 transition-all" />
                      </a>
                    </div>
                  )}
                  {!userGaveConsent?.includes('gmail') && !userGaveConsent?.includes('contacts') && (
                    <div className={`transition-all w-auto bg-purple1 p-3 pb-0 text-xs m-3`}>
                      Setup <span className="font-bold">“Smart Sync Contacts by AI”</span> and{' '}
                      <span className="font-bold">“Import Google Contacts”</span> in order to import contact from Gmail.
                      <a
                        className="group cursor-pointer py-3 pt-6 flex items-center justify-end font-medium text-purple6"
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
            className="absolute cursor-pointer z-10"
            style={{ right: '-13px', bottom: pinned ? '10px' : '20px' }}>
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
    return () => {
      {
        tabs.map((tab) => {
          dispatch(
            setExpandedTab({
              id: tab.id,
              opened: false,
            }),
          );
        });
      }
    };
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
    return tabs.find((tab) => tab.id === tabId);
  };

  const handleTabClick = () => {
    if (tab.id === 4) {
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
    <div className={`accordion w-inherit`} key={tab.id}>
      <Link
        href="#"
        className={`flex items-center h-10 justify-between px-2 py-4 mx-3 ${tab.id === 4 && 'border-t'} ${
          openedTab === tab.id && ' text-lightBlue3'
        } ${openedTab === 4 && tab.id === 4 ? 'bg-lightBlue1' : ''}`}
        onClick={handleTabClick}>
        <div className={`flex items-center ${openedTab === tab.id ? 'text-lightBlue3' : 'text-gray5'} `}>
          {tab.icon}
          <Text h4 className={`px-[10px] py-[10px] ${openedTab === tab.id ? 'text-lightBlue3' : 'text-gray5'}`}>
            {tab.name} ({getCountForTabOrSubtab(tab.count_key)})
          </Text>
        </div>

        {tab.subtab && (
          <ChevronDownIcon
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
                className={` pl-11 mx-3 transition-all duration-200 flex items-center ${
                  isSubtabActive(subtab.id, tab.id) ? 'text-lightBlue3 bg-lightBlue1' : 'text-gray4'
                }`}
                onClick={() => handleSubtabClick(subtab.id)}>
                {subtab.icon ? subtab.icon : subtab.dot}
                <Text
                  h4
                  className={`px-[10px] py-[10px] ${
                    isSubtabActive(subtab.id, tab.id) ? 'text-lightBlue3' : 'text-gray4'
                  }`}>
                  {subtab.name} ({getCountForTabOrSubtab(subtab.count_key)})
                </Text>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
};
