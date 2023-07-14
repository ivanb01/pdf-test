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
import GoogleContactsIcon from 'public/images/google-contacts.png';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useRouter } from 'next/router';
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
  const dispatch = useDispatch();
  const isSubtabActive = (currentSubtab) => {
    return openedSubtab == currentSubtab;
  };
  const pinned = useSelector((state) => state.global.expandedMenu);
  const [collapseMainTab, setCollapseMainTab] = useState(false);

  const getCount = (subtab) => {
    if (subtab === 'New Records') {
      subtab = 'New Record';
    }
    if (!contacts.metadata) {
      return 0;
    }
    if (subtab == 'Family & Friends') {
      const familyCount = contacts.metadata.category['Family'] || 0;
      const friendsCount = contacts.metadata.category['Friend'] || 0;
      return familyCount + friendsCount;
    }
    if (subtab == 'Unknown') {
      return contacts.metadata.category['Unknown'] || 0;
    }
    if (subtab == 'Agent') {
      return contacts.metadata.category['Agent'] || 0;
    }
    if (subtab == 'Vendor') {
      let category = contacts.metadata.category;
      const agentCount = category['Agent'] || 0;
      const vendorCount = category['Vendor'] || 0;
      const othersCount =
        Object.values(category).reduce((total, count) => total + count, 0) -
        agentCount -
        vendorCount;
      return othersCount;
    }
    if (subtab == 'Unspecified') {
      let category = contacts.metadata.category;
      return category['Unspecified'];
    }

    return openedTab === 2
      ? contacts.metadata.category[subtab] || 0
      : contacts.metadata.status[subtab] || 0;
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
                }}
              >
                <div
                  className={`flex items-center ${
                    openedTab == tab.id ? 'text-lightBlue3' : 'text-gray5'
                  }`}
                  title={tab.name}
                >
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
              className={`cursor-pointer mx-3 px-2 py-2 rounded-md flex items-center text-gray5 `}
            >
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
                className={`flex items-center h-10 justify-between px-2 py-4 mx-3 rounded-md ${
                  openedTab == tab.id && 'bg-lightBlue1 text-lightBlue3'
                }`}
                onClick={() => {
                  if (openedTab == tab.id) {
                    setCollapseMainTab(!collapseMainTab);
                  }
                  setOpenedTab(tab.id);
                  router.push(tab.href);
                }}
              >
                <div
                  onClick={() => !tab.subtab && setOpenedTab(tab.id)}
                  className={`flex items-center ${
                    openedTab == tab.id ? 'text-lightBlue3' : 'text-gray5'
                  }`}
                >
                  {tab.icon}
                  <Text
                    h4
                    className={`ml-3 ${
                      openedTab == tab.id ? 'text-lightBlue3' : 'text-gray5'
                    }`}
                  >
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
                  }
                >
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
                        onClick={() => setOpenedSubtab(subtab.id)}
                      >
                        {subtab.icon ? subtab.icon : subtab.dot}
                        <Text
                          h4
                          className={`px-[10px] py-[10px] ${
                            isSubtabActive(`${subtab.id}`)
                              ? 'text-lightBlue3'
                              : 'text-gray4'
                          }`}
                        >
                          {subtab.name}
                          {/* ({getCount(subtab.name)}) */}
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
              className={`cursor-pointer mx-3 px-2 py-2 rounded-md flex items-center text-gray5 `}
            >
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
      className={`accordion-wrapper pt-6 pb-3 h-full ${className} transition-all flex flex-col justify-between ${
        pinned ? 'w-[290px]' : 'w-[62px]'
      }`}
    >
      <div>
        {pinned ? expandedMenu() : narrowMenu()}

        {pinned && (
          <div className=" w-auto bg-[#EFF6FF] p-3 text-sm m-3">
            <span className="font-bold">Keep in mind:</span> Your contacts need
            to be logged in on "Google Contacts" in order to be imported here.
            <Button
              white
              iconSize="w-5"
              leftIcon={<AccountCircle />}
              className="w-full mt-4"
              color="text-blue2"
              label="Import Google Contacts"
              onClick={() =>
                router.push({
                  pathname: '/contacts/no-contact/',
                  query: { start_importing: true },
                })
              }
            />
          </div>
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
          className="!text-blue2 cursor-pointer mt-10 font-medium hover:text-lightBlue4 flex items-center h-10 justify-between px-2 py-4 mx-3 rounded-md"
        >
          <AccountCircle className="h-5" />
        </a>
      )}

      {collapsable && (
        <a
          href="#"
          onClick={() => dispatch(setExpandedMenu(!pinned))}
          className={`flex items-center h-10 justify-between px-2 py-4 mx-3 rounded-md text-lightBlue3'`}
        >
          <div className={`flex items-center text-gray5 `}>
            {pinned ? (
              <MenuOpen className="h-5 w-5 text-gray5 cursor-pointer" />
            ) : (
              <Menu className="h-5 w-5 text-gray5 cursor-pointer" />
            )}
            {pinned && (
              <Text h4 className={`ml-3 text-gray5`}>
                Collapse Menu
              </Text>
            )}
          </div>
        </a>
      )}
    </div>
  );
};

export default MainSidebar;
