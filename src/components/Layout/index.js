import { useState, useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenedTab, setOpenedSubtab, setInitializeTabs } from 'store/global/slice';
import Group from '@mui/icons-material/Group';
import PermContactCalendar from '@mui/icons-material/PermContactCalendar';
import InfoIcon from '@mui/icons-material/Info';
import Error from '@mui/icons-material/Error';
import Help from '@mui/icons-material/Help';
import Delete from '@mui/icons-material/Delete';
import { getContacts } from 'api/contacts';
import MainSidebar from 'components/shared/accordion/main-sidebar';
import MainMenu from 'components/shared/menu';
import { Contacts } from '@mui/icons-material';
import SetupGmail from 'components/SetupGmail';
import { setAllContacts } from 'store/contacts/slice';
import AddContactManuallyOverlay from 'components/overlays/add-contact/add-contact-manually';
import { useRouter } from 'next/router';
import DeleteIcon from '@mui/icons-material/Delete';
import Loader from 'components/shared/loader';
import ContactPage from '@mui/icons-material/ContactPage';
import Diversity3 from '@mui/icons-material/Diversity3';
import { Auth } from 'aws-amplify';
import { getCount } from 'api/contacts';
import { setCount, setRefetchData } from 'store/global/slice';
import { setUser } from 'store/global/slice';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Diversity3Icon from '@mui/icons-material/Diversity3';

const Layout = ({ children }) => {
  const router = useRouter();

  const dispatch = useDispatch();
  const refetchData = useSelector((state) => state.global.refetchData);
  const count = useSelector((state) => state.global.count);

  const tourOptions = {
    defaultStepOptions: {
      cancelIcon: {
        enabled: true,
      },
    },
    useModalOverlay: true,
  };

  const importContacts = () => {
    setShowImportFromCsvOverlay(true);
  };

  const [tabs] = useState([
    {
      id: 0,
      name: 'Clients',
      label: 'Clients in the Funnel',
      groupName: 'In Communication',
      href: 'clients',
      icon: <Group className="h-5 w-5" />,
      count: 0,
      count_key: 'clients_total',
      subtab: [
        {
          id: 0,
          name: 'In the Funnel',
          dot: <span className="h-2 w-2 rounded-full bg-lightBlue3" />,
          count: 0,
          count_key: 'clients_in_funnel',
        },
        {
          id: 1,
          name: 'Closed',
          dot: <span className="h-2 w-2 rounded-full bg-green6" />,
          count: 0,
          count_key: 'clients_closed',
        },
        {
          id: 2,
          name: 'On Hold',
          dot: <span className="h-2 w-2 rounded-full bg-orange1" />,
          count: 0,
          count_key: 'clients_on_hold',
        },
        {
          id: 3,
          name: 'Dropped',
          dot: <span className="h-2 w-2 rounded-full bg-red3" />,
          count: 0,
          count_key: 'clients_dropped',
        },
      ],
    },
    {
      id: 1,
      name: 'Professionals',
      label: 'Professionals',
      href: 'professionals',
      groupName: 'In Communication',
      icon: <PermContactCalendar className="h-5 w-5" />,
      count: 0,
      count_key: 'professionals_total',
      subtab: [
        {
          id: 0,
          name: 'Vendor',
          count: 0,
          count_key: 'professionals_vendor',
        },
        {
          id: 1,
          name: 'Agent',
          count: 0,
          count_key: 'professional_agent',
        },
        {
          id: 2,
          name: 'Unspecified',
          count: 0,
          count_key: 'professional_unspecified',
        },
      ],
    },
    {
      id: 2,
      groupName: 'Needs Attention',
      name: 'Need to Contact',
      label: 'Need to Contact',
      href: 'needcontact',
      count: 0,
      count_key: '',
      icon: <LocalPhoneIcon className={'h-5 w-5'} />,
    },
    {
      id: 3,
      name: 'Still Unknown',
      label: 'Still Unknown',
      groupName: 'Needs Attention',
      href: 'unknown',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path
            d="M10.0186 11.6655C9.47938 12.5075 9.16671 13.5086 9.16671 14.5828C9.16671 15.9413 9.66688 17.1831 10.4932 18.134C9.83021 18.2674 9.10946 18.3336 8.33338 18.3336C5.48259 18.3336 3.38012 17.4402 2.09499 15.6365C1.81835 15.2483 1.66968 14.7834 1.66968 14.3067V13.5401C1.66968 12.505 2.50873 11.666 3.54374 11.666L10.0186 11.6655ZM14.5834 9.99943C17.1147 9.99943 19.1667 12.0514 19.1667 14.5828C19.1667 17.114 17.1147 19.1661 14.5834 19.1661C12.0521 19.1661 10 17.114 10 14.5828C10 12.0514 12.0521 9.99943 14.5834 9.99943ZM14.5834 16.4585C14.296 16.4585 14.063 16.6915 14.063 16.979C14.063 17.2664 14.296 17.4994 14.5834 17.4994C14.8708 17.4994 15.1038 17.2664 15.1038 16.979C15.1038 16.6915 14.8708 16.4585 14.5834 16.4585ZM14.5835 11.5611C13.7101 11.5611 13.0299 12.2423 13.039 13.1897C13.0411 13.4198 13.2295 13.6046 13.4596 13.6023C13.6897 13.6002 13.8745 13.4118 13.8722 13.1817C13.8676 12.6992 14.172 12.3944 14.5835 12.3944C14.977 12.3944 15.2946 12.721 15.2946 13.1857C15.2946 13.3459 15.2485 13.4709 15.108 13.6536L15.0296 13.7502L14.9471 13.8446L14.726 14.0863L14.6123 14.2173C14.2929 14.5979 14.1668 14.8777 14.1668 15.309C14.1668 15.5392 14.3533 15.7257 14.5835 15.7257C14.8135 15.7257 15.0001 15.5392 15.0001 15.309C15.0001 15.1397 15.0489 15.0099 15.1991 14.8172L15.2699 14.7304L15.354 14.6342L15.5755 14.3921L15.6876 14.2629C16.0029 13.8872 16.128 13.6102 16.128 13.1857C16.128 12.2659 15.4426 11.5611 14.5835 11.5611ZM8.33338 1.66992C10.6345 1.66992 12.5 3.53541 12.5 5.83659C12.5 8.13778 10.6345 10.0033 8.33338 10.0033C6.03221 10.0033 4.16673 8.13778 4.16673 5.83659C4.16673 3.53541 6.03221 1.66992 8.33338 1.66992Z"
            fill="currentColor"
          />
        </svg>
      ),
      count: 0,
      count_key: 'uncategorized_unknown',
    },
    {
      id: 4,
      name: 'Need to Categorize',
      groupName: 'Needs Attention',
      icon: <InfoIcon className={'h-5 w-5'} />,
      href: 'uncategorized',
    },
    {
      id: 5,
      name: 'Family & Friends',
      label: 'Family & Friends',
      href: 'family',
      icon: <Diversity3Icon className={'h-5 w-5'} />,
      groupName: 'Other',
    },
    {
      id: 6,
      name: 'Trash',
      label: 'Trash',
      href: 'trash',
      groupName: 'Other',
      count: 0,
      count_key: 'trash',
      icon: <DeleteIcon className={'h-5 w-5'} />,
    },
  ]);
  const { tabs: storeTabs } = useSelector((state) => state.global);
  useLayoutEffect(() => {
    if (storeTabs.length === 0) {
      dispatch(setInitializeTabs(tabs.length));
    }
  }, [storeTabs]);

  const openedTab = useSelector((state) => state.global.openedTab);
  const openedSubtab = useSelector((state) => state.global.openedSubtab);

  const allContacts = useSelector((state) => state.contacts.allContacts.data);
  const skippedEmptyState = useSelector((state) => state.global.skippedEmptyState);

  const handleOpenedTab = (tab) => {
    dispatch(setOpenedTab(tab));
    // dispatch(setOpenedSubtab(0));
  };
  const handleOpenedSubtab = (subtab) => {
    dispatch(setOpenedSubtab(subtab));
  };

  const getCurrentUser = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      dispatch(setUser(user.username));
      const days = 7;
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + days);
      document.cookie = `isAuthenticated=true; expires=${expiryDate.toUTCString()};`;
      localStorage.setItem('user', JSON.stringify(user.username));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentUser();
    getCount().then((data) => {
      dispatch(setCount(data.data));
    });
  }, []);

  return (
    <>
      <MainMenu />
      {/* <Tour for={openedTab == 0 ? 'clients' : 'professionals'} /> */}
      {allContacts && !allContacts.length && !skippedEmptyState ? (
        <>
          <Loader />
          {/* <div
            className="w-full flex items-center justify-center pt-[68px] overflow-y-scroll"
            style={{ height: 'calc(100vh - 70px)' }}
          >
            <SetupGmail
              setShowImportingOverlay={setShowImportingOverlay}
              setshowAddContactManuallyOverlay={
                setShowAddContactManuallyOverlay
              }
            />
          </div>
          {showAddContactManuallyOverlay && (
            <AddContactManuallyOverlay
                handleClose={() => setShowAddContactManuallyOverlay(false)}
                title="Add Contact"

              />
          )} */}
        </>
      ) : (
        <div className=" layout-fixed-height h-full w-full flex items-center justify-center">
          <div className="border-t border-gray2 flex h-full min-h-full w-full">
            <div className="h-auto border-r border-gray2 main-menu-wrapper bg-white">
              <MainSidebar
                collapsable
                className=""
                tabs={tabs}
                openedTab={openedTab}
                openedSubtab={openedSubtab}
                setOpenedTab={(tab) => handleOpenedTab(tab)}
                setOpenedSubtab={(tab) => handleOpenedSubtab(tab)}
              />
            </div>
            <div className=" flex h-auto min-h-full w-full">
              <div className="w-full relative">{children}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Layout;
