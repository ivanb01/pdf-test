import { ChevronDownIcon } from '@heroicons/react/solid';
import Text from 'components/shared/text';
import { useState } from 'react';
import MenuOpen from '@mui/icons-material/MenuOpen';
import Menu from '@mui/icons-material/Menu';
import Link from 'components/Link';
import Router from 'next/router';
import { setExpandedMenu } from 'store/global/slice';
import { useDispatch, useSelector } from 'react-redux';
import SimpleBar from 'simplebar-react';
const ContactCampaignsSidebar = ({
  tabs,
  openedTab,
  openedSubtab,
  setOpenedTab,
  setOpenedSubtab,
  className,
  collapsable,
  importContacts,
}) => {
  const dispatch = useDispatch();
  const isSubtabActive = (currentSubtab) => {
    return openedSubtab == currentSubtab;
  };
  const pinned = useSelector((state) => state.global.expandedMenu);
  const [collapseMainTab, setCollapseMainTab] = useState(false);

  return (
    <div
      className={`accordion-wrapper h-full ${className} transition-all flex flex-col justify-between ${
        pinned ? 'w-[290px]' : 'w-[62px]'
      }`}
    >
      <div>
        <SimpleBar style={{ maxHeight: 'calc(100vh - 145px)' }}>
          <div className="pt-6 pb-3">
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
                    }}
                  >
                    <div
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
                    <ChevronDownIcon
                      className={`text-gray3 h-5 w-5 transition-all duration-300 ${
                        !collapseMainTab && openedTab == tab.id
                          ? 'rotate-180'
                          : ''
                      }`}
                    />
                  </Link>
                  <div
                    className={
                      !collapseMainTab && openedTab == tab.id
                        ? `ml-11`
                        : `hidden`
                    }
                  >
                    {tab.subtab.map((subtab) => {
                      return (
                        <a
                          key={`${subtab.campaign_id}`}
                          href="#"
                          className={`transition-all duration-200 flex items-center ${
                            isSubtabActive(`${subtab.campaign_id}`)
                              ? 'text-lightBlue3'
                              : 'text-gray4'
                          }`}
                          onClick={() => setOpenedSubtab(subtab.campaign_id)}
                        >
                          {subtab.icon ? subtab.icon : subtab.dot}
                          <Text
                            h4
                            className={`px-[10px] py-[10px] ${
                              isSubtabActive(`${subtab.campaign_id}`)
                                ? 'text-lightBlue3'
                                : 'text-gray4'
                            }`}
                          >
                            {subtab.campaign_name} (
                            {subtab.contact_assigned_count} /{' '}
                            {console.log('subtab', subtab)}
                            {subtab.contact_unassigned_count +
                              subtab.contact_assigned_count}
                            )
                          </Text>
                        </a>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </SimpleBar>
      </div>
    </div>
  );
};

export default ContactCampaignsSidebar;
