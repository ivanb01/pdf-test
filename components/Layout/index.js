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
import dynamic from 'next/dynamic';
import { Contacts } from '@mui/icons-material';
import SetupGmail from 'pages/contacts/SetupGmail';
import { setAllContacts } from 'store/contacts/slice';
const Tour = dynamic(() => import('components/onboarding/tour'), {
  ssr: false,
});

const Layout = ({ children }) => {
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
          name: 'Active',
          dot: <span className="h-2 w-2 rounded-full bg-lightBlue3" />,
          count: 0,
        },
        {
          id: 1,
          name: 'Dropped',
          dot: <span className="h-2 w-2 rounded-full bg-red3" />,
          count: 0,
        },
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
        {
          id: 1,
          name: 'Unknown',
          icon: <Help className="h-4 w-4" />,
          count: 0,
        },
        {
          id: 2,
          name: 'Trash',
          icon: <Delete className="h-4 w-4" />,
          count: 0,
        },
      ],
    },
  ]);
  const openedTab = useSelector((state) => state.global.openedTab);
  const openedSubtab = useSelector((state) => state.global.openedSubtab);
  const allContacts = useSelector((state) => state.contacts.allContacts.data);

  const [showAddContactManuallyOverlay, setShowAddContactManuallyOverlay] =
    useState(false);
  const [showImportingOverlay, setShowImportingOverlay] = useState(false);

  const handleOpenedTab = (tab) => {
    dispatch(setOpenedTab(tab));
    dispatch(setOpenedSubtab(0));
  };
  const handleOpenedSubtab = (subtab) => {
    dispatch(setOpenedSubtab(subtab));
  };

  useEffect(() => {
    getContacts('1,2,3,4,5,6,7,8,9,12,').then((data) => {
      dispatch(setAllContacts(data.data));
    });
  }, []);
  return (
    <>
      <MainMenu />
      {/* <Tour for={openedTab == 0 ? 'clients' : 'professionals'} /> */}
      {allContacts && !allContacts.length ? (
        <div
          className="h-full w-full flex items-center justify-center pt-[68px]"
          style={{ height: 'calc(100vh - 70px)' }}
        >
          <SetupGmail
            setShowImportingOverlay={setShowImportingOverlay}
            setshowAddContactManuallyOverlay={setShowAddContactManuallyOverlay}
          />
        </div>
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
