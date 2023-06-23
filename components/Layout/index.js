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
import Loader from 'components/shared/loader';
import ContactPage from '@mui/icons-material/ContactPage';
import Diversity3 from '@mui/icons-material/Diversity3';
import { Auth } from 'aws-amplify';
import { setUser } from 'store/global/slice';

const Layout = ({ children }) => {
  const router = useRouter();

  const dispatch = useDispatch();

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
      subtab: [
        {
          id: 0,
          name: 'In the Funnel',
          dot: <span className="h-2 w-2 rounded-full bg-lightBlue3" />,
          count: 0,
        },
        {
          id: 1,
          name: 'Closed',
          dot: <span className="h-2 w-2 rounded-full bg-green6" />,
          count: 0,
        },
        {
          id: 2,
          name: 'On Hold',
          dot: <span className="h-2 w-2 rounded-full bg-orange1" />,
          count: 0,
        },
        {
          id: 3,
          name: 'Dropped',
          dot: <span className="h-2 w-2 rounded-full bg-red3" />,
          count: 0,
        },
      ],
    },
    {
      id: 1,
      name: 'Professionals',
      label: 'Professionals',
      href: 'professionals',
      icon: <PermContactCalendar className="h-5 w-5" />,
      subtab: [
        {
          id: 0,
          name: 'Vendor',
          dot: <span className="h-2 w-2 rounded-full bg-lightBlue3" />,
          count: 0,
        },
        {
          id: 1,
          name: 'Agent',
          dot: <span className="h-2 w-2 rounded-full bg-red3" />,
          count: 0,
        },
      ],
    },
    {
      id: 3,
      name: 'Other',
      label: 'Other Contacts',
      href: 'other',
      icon: <ContactPage className="h-5 w-5" />,
      subtab: [
        {
          id: 0,
          name: 'Family & Friends',
          icon: <Diversity3 className="h-4 w-4" />,
          count: 0,
        },
        {
          id: 1,
          name: 'Unknown',
          icon: <Help className="h-4 w-4" />,
          count: 0,
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
      icon: <Error className="h-5 w-5" />,
      subtab: [
        {
          id: 0,
          name: 'New Records',
          icon: <Group className="h-4 w-4" />,
          count: 0,
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
  ]);

  const openedTab = useSelector((state) => state.global.openedTab);
  const openedSubtab = useSelector((state) => state.global.openedSubtab);
  const allContacts = useSelector((state) => state.contacts.allContacts.data);
  const skippedEmptyState = useSelector(
    (state) => state.global.skippedEmptyState
  );

  const [showAddContactManuallyOverlay, setShowAddContactManuallyOverlay] =
    useState(false);
  const [showImportingOverlay, setShowImportingOverlay] = useState(false);

  const handleOpenedTab = (tab) => {
    console.log('tab', tab);
    dispatch(setOpenedTab(tab));
    dispatch(setOpenedSubtab(0));
  };
  const handleOpenedSubtab = (subtab) => {
    dispatch(setOpenedSubtab(subtab));
  };

  const getCurrentUser = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      console.log(user.username);
      dispatch(setUser(user.username));
      localStorage.setItem('user', JSON.stringify(user.username));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log('layout initalized')
    getCurrentUser();
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
          <div className="border-t border-gray2 flex h-auto min-h-full w-full">
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
            <div className="border-t border-gray2 flex h-auto min-h-full w-full">
              <div className="w-full relative">{children}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Layout;
