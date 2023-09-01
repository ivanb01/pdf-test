import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenedTab, setOpenedSubtab } from 'store/global/slice';
import Group from '@mui/icons-material/Group';
import PermContactCalendar from '@mui/icons-material/PermContactCalendar';
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
      icon: <PermContactCalendar className="h-5 w-5" />,
      count: 0,
      count_key: 'professionals_total',
      subtab: [
        {
          id: 0,
          name: 'Vendor',
          dot: <span className="h-2 w-2 rounded-full bg-lightBlue3" />,
          count: 0,
          count_key: 'professionals_vendor',
        },
        {
          id: 1,
          name: 'Agent',
          dot: <span className="h-2 w-2 rounded-full bg-red3" />,
          count: 0,
          count_key: 'professional_agent',
        },
        {
          id: 2,
          name: 'Unspecified',
          dot: <span className="h-2 w-2 rounded-full bg-gray3" />,
          count: 0,
          count_key: 'professional_unspecified',
        },
      ],
    },
    {
      id: 3,
      name: 'Other',
      label: 'Other Contacts',
      href: 'other',
      count: 0,
      count_key: 'other_total',
      icon: <ContactPage className="h-5 w-5" />,
      subtab: [
        {
          id: 0,
          name: 'Family & Friends',
          icon: <Diversity3 className="h-4 w-4" />,
          count: 0,
          count_key: 'other_family_friends',
        },
        {
          id: 1,
          name: 'Unknown',
          icon: <Help className="h-4 w-4" />,
          count: 0,
          count_key: 'uncategorized_unknown',
        },
        // {
        //   id: 1,
        //   name: 'Unknown',
        //   icon: <Help className="h-4 w-4" />,
        //   count: 0,
        // },
        // {
        //   id: 2,
        //   name: 'Trash',
        //   icon: <Delete className="h-4 w-4" />,
        //   count: 0,
        // },
      ],
    },
    {
      id: 2,
      name: 'Uncategorized',
      label: 'Uncategorized Contacts',
      href: 'uncategorized',
      count: 0,
      count_key: 'uncategorized_new_records',
      icon: <Error className="h-5 w-5" />,
      subtab: [
        {
          id: 0,
          name: 'New Records',
          icon: <Group className="h-4 w-4" />,
          count: 0,
          count_key: 'uncategorized_new_records',
        },
        // {
        //   id: 1,
        //   name: 'Unknown',
        //   icon: <Help className="h-4 w-4" />,
        //   count: 0,
        // },
        // {
        //   id: 2,
        //   name: 'Trash',
        //   icon: <Delete className="h-4 w-4" />,
        //   count: 0,
        // },
      ],
    },
    {
      id: 4,
      name: 'Trash',
      label: 'Trash',
      href: 'trash',
      count: 0,
      count_key: 'trash',
      icon: <DeleteIcon className={'w-5 h-5'} />,
    },
  ]);

  const openedTab = useSelector((state) => state.global.openedTab);
  const openedSubtab = useSelector((state) => state.global.openedSubtab);
  const allContacts = useSelector((state) => state.contacts.allContacts.data);
  const skippedEmptyState = useSelector((state) => state.global.skippedEmptyState);

  const handleOpenedTab = (tab) => {
    dispatch(setOpenedTab(tab));
    dispatch(setOpenedSubtab(0));
  };
  const handleOpenedSubtab = (subtab) => {
    dispatch(setOpenedSubtab(subtab));
  };

  const getCurrentUser = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      dispatch(setUser(user.username));
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
                // importContacts={importContacts}
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
