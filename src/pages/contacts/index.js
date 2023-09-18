import MainMenu from 'components/shared/menu';
// import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import ContactsSyncedOverlay from 'components/overlays/categorized-successfully/contacts-synced';
import AddContactManuallyOverlay from 'components/overlays/add-contact/add-contact-manually';
import ImportingFromGmail from 'components/overlays/importing-from-gmail';
import Group from '@mui/icons-material/Group';
import PermContactCalendar from '@mui/icons-material/PermContactCalendar';
import Error from '@mui/icons-material/Error';
import Help from '@mui/icons-material/Help';
import Delete from '@mui/icons-material/Delete';
import SetupGmail from 'components/SetupGmail';
import SuccessfullyCategorized from 'components/overlays/successfully-categorized';
import StartCategorizing from 'components/overlays/start-categorizing';
import AssignToCampaign from 'components/overlays/assign-to-campaign';
import UnassignOverlay from 'components/overlays/unassign';
import dynamic from 'next/dynamic';
import AddContactOverlay from 'components/overlays/add-contact';
import ImportFromCsv from 'components/overlays/add-contact/import-from-csv';
import { setOpenedTab, setOpenedSubtab } from 'store/global/slice';
import { useSelector, useDispatch } from 'react-redux';

const Tour = dynamic(() => import('components/onboarding/tour'), {
  ssr: false,
});

// import { getContacts } from 'store/contact/actions';

const Contacts = ({ data }) => {
  const dispatch = useDispatch();
  //* TOUR OPTIONS *//
  const tourOptions = {
    defaultStepOptions: {
      cancelIcon: {
        enabled: true,
      },
    },
    useModalOverlay: true,
  };

  //* SAVED STATE (inputs, checkboxes, family values ETC...) *//
  const [selectedContactType, setSelectedContactType] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState(0);
  const [selectedCard, setSelectedCard] = useState(0);
  const [selectedUncategorized, setSelectedUncategorized] = useState([]);
  const [selectedUncategorizedContactType, setSelectedUncategorizedContactType] = useState(null);
  const [selectedUncategorizedContactStatus, setSelectedUncategorizedContactStatus] = useState(null);

  //* TABS, MENUS (state for tabs, subtabs, menus etc...) ETC... *//
  const [uploadingDocument, setUploadingDocument] = useState(false);
  const [uploadedDocument, setUploadedDocument] = useState(0);
  const [currentTab, setCurrentTab] = useState(0);
  const openedTab = useSelector((state) => state.global.openedTab);
  const openedSubtab = useSelector((state) => state.global.openedSubtab);

  // SHOW/HIDE ELEMENTS
  const [showImportFromCsvOverlay, setShowImportFromCsvOverlay] = useState(false);
  const [showAddContactOverlay, setShowAddContactOverlay] = useState(false);
  const [showAddContactManuallyOverlay, setShowAddContactManuallyOverlay] = useState(false);
  const [showContactsSyncedOverlay, setShowContactsSyncedOverlay] = useState(false);
  const [showImportingOverlay, setShowImportingOverlay] = useState(false);
  const [showSuccessfullyCategorized, setShowSuccessfullyCategorized] = useState(false);
  const [showStartCategorizing, setShowStartCategorizing] = useState(false);
  const [showAssignToCampaign, setShowAssignToCampaign] = useState(false);
  const [showUnassignFromCampaign, setShowUnassignFromCampaign] = useState(false);

  //* FUNCTIONS *//
  const importContacts = () => {
    console.log('test');
    setShowImportFromCsvOverlay(true);
  };
  const handleCloseContactsSynced = () => {
    setShowContactsSyncedOverlay(false);
  };
  const closeImportingOverlay = () => {
    setShowImportingOverlay(false);
  };
  const handleCardClick = (id) => {
    console.log(id);
  };
  const handleOpenedTab = (tab) => {
    dispatch(setOpenedTab(tab));
    dispatch(setOpenedSubtab(0));
  };
  const handleOpenedSubtab = (tab) => {
    dispatch(setOpenedSubtab(tab));
  };
  const handleSelectUncategorized = (contact, event) => {
    let row = document.querySelector('#row_' + event.target.id.split('_')[1]);
    if (event.target.checked) {
      row.classList.add('bg-lightBlue1');
      setSelectedUncategorized((prevState) => [...prevState, contact]);
    } else {
      row.classList.remove('bg-lightBlue1');
      let newUncategorized = selectedUncategorized.filter((element) => element.email != contact.email);
      setSelectedUncategorized(newUncategorized);
    }
  };
  const getCount = (type) => {
    let arrayOfContacts = clientTypeCards.filter((client) => client.type == type);
    let count = 0;
    arrayOfContacts.forEach((contacts) => {
      if (contacts.data) {
        count += contacts.data.length;
      }
    });

    return count;
  };

  const handleCategorization = () => {
    console.log(selectedUncategorized, selectedUncategorizedContactType, selectedUncategorizedContactStatus);
  };

  const handleAddContactManually = () => {
    setShowAddContactManuallyOverlay(true);
    setShowAddContactOverlay(false);
  };

  //* DATA *//
  // const dispatch = useDispatch();
  // const { _data: contacts = [], count } = useSelector((state) => state.contacts);

  const [contactsLocal, setContactsLocal] = useState([
    {
      tenant: 'Oxford',
      email: 'blendk@outlook.com',
      first_name: 'Blendar',
      last_name: 'Kabashi',
      phone_number: '049487720',
      type: 0,
      status: 0,
      active: 0,
      note: 'Test Note',
      created_at: '2022-05-18 15:00:00',
      modified_at: '2022-05-18 15:00:00',
      last_communication: '2022-05-18 15:00:00',
      next_communication: '2022-06-18 15:00:00',
    },
    {
      tenant: 'Oxford',
      email: 'gentk@outlook.com',
      first_name: 'Gent',
      last_name: 'Kabashi',
      phone_number: '049487720',
      type: 0,
      status: 0,
      active: 0,
      note: 'Test Note',
      created_at: '2022-05-18 15:00:00',
      modified_at: '2022-05-18 15:00:00',
      last_communication: '2022-05-18 15:00:00',
      next_communication: '2022-06-18 15:00:00',
    },
    {
      tenant: 'Oxford',
      email: 'blendk1@outlook.com',
      first_name: 'Drin',
      last_name: 'Fejzullahu',
      phone_number: '049487720',
      type: 0,
      status: 0,
      active: 0,
      note: 'Test Note',
      created_at: '2022-05-18 15:00:00',
      modified_at: '2022-05-18 15:00:00',
      last_communication: '2022-05-18 15:00:00',
      next_communication: '2022-06-18 15:00:00',
    },
    {
      tenant: 'Oxford',
      email: 'blendk2@outlook.com',
      first_name: 'Drin',
      last_name: 'Fejzullahu',
      phone_number: '049487720',
      type: 0,
      status: 0,
      active: 0,
      note: 'Test Note',
      created_at: '2022-05-18 15:00:00',
      modified_at: '2022-05-18 15:00:00',
      last_communication: '2022-05-18 15:00:00',
      next_communication: '2022-06-18 15:00:00',
    },
    {
      tenant: 'Oxford',
      email: 'blendk3@outlook.com',
      first_name: 'Drin',
      last_name: 'Fejzullahu',
      phone_number: '049487720',
      type: 0,
      status: 0,
      active: 0,
      note: 'Test Note',
      created_at: '2022-05-18 15:00:00',
      modified_at: '2022-05-18 15:00:00',
      last_communication: '2022-05-18 15:00:00',
      next_communication: '2022-06-18 15:00:00',
    },
    {
      tenant: 'Oxford',
      email: 'blendk4@outlook.com',
      first_name: 'Drin',
      last_name: 'Fejzullahu',
      phone_number: '049487720',
      type: 0,
      status: 0,
      active: 0,
      note: 'Test Note',
      created_at: '2022-05-18 15:00:00',
      modified_at: '2022-05-18 15:00:00',
      last_communication: '2022-05-18 15:00:00',
      next_communication: '2022-06-18 15:00:00',
    },
    {
      tenant: 'Oxford',
      email: 'blendk5@outlook.com',
      first_name: 'Drin',
      last_name: 'Fejzullahu',
      phone_number: '049487720',
      type: 0,
      status: 0,
      active: 0,
      note: 'Test Note',
      created_at: '2022-05-18 15:00:00',
      modified_at: '2022-05-18 15:00:00',
      last_communication: '2022-05-18 15:00:00',
      next_communication: '2022-06-18 15:00:00',
    },
    {
      tenant: 'Oxford',
      email: 'blendk6@outlook.com',
      first_name: 'Drin',
      last_name: 'Fejzullahu',
      phone_number: '049487720',
      type: 0,
      status: 0,
      active: 0,
      note: 'Test Note',
      created_at: '2022-05-18 15:00:00',
      modified_at: '2022-05-18 15:00:00',
      last_communication: '2022-05-18 15:00:00',
      next_communication: '2022-06-18 15:00:00',
    },
    {
      tenant: 'Oxford',
      email: 'blendk7@outlook.com',
      first_name: 'Drin',
      last_name: 'Fejzullahu',
      phone_number: '049487720',
      type: 0,
      status: 0,
      active: 0,
      note: 'Test Note',
      created_at: '2022-05-18 15:00:00',
      modified_at: '2022-05-18 15:00:00',
      last_communication: '2022-05-18 15:00:00',
      next_communication: '2022-06-18 15:00:00',
    },
    {
      tenant: 'Oxford',
      email: 'blendk8@outlook.com',
      first_name: 'Drin',
      last_name: 'Fejzullahu',
      phone_number: '049487720',
      type: 0,
      status: 0,
      active: 0,
      note: 'Test Note',
      created_at: '2022-05-18 15:00:00',
      modified_at: '2022-05-18 15:00:00',
      last_communication: '2022-05-18 15:00:00',
      next_communication: '2022-06-18 15:00:00',
    },
    {
      tenant: 'Oxford',
      email: 'blendk9@outlook.com',
      first_name: 'Drin',
      last_name: 'Fejzullahu',
      phone_number: '049487720',
      type: 0,
      status: 0,
      active: 0,
      note: 'Test Note',
      created_at: '2022-05-18 15:00:00',
      modified_at: '2022-05-18 15:00:00',
      last_communication: '2022-05-18 15:00:00',
      next_communication: '2022-06-18 15:00:00',
    },
    {
      tenant: 'Oxford',
      email: 'blendk10@outlook.com',
      first_name: 'Drin',
      last_name: 'Fejzullahu',
      phone_number: '049487720',
      type: 0,
      status: 0,
      active: 0,
      note: 'Test Note',
      created_at: '2022-05-18 15:00:00',
      modified_at: '2022-05-18 15:00:00',
      last_communication: '2022-05-18 15:00:00',
      next_communication: '2022-06-18 15:00:00',
    },
    {
      tenant: 'Oxford',
      email: 'blendk11@outlook.com',
      first_name: 'Drin',
      last_name: 'Fejzullahu',
      phone_number: '049487720',
      type: 0,
      status: 0,
      active: 0,
      note: 'Test Note',
      created_at: '2022-05-18 15:00:00',
      modified_at: '2022-05-18 15:00:00',
      last_communication: '2022-05-18 15:00:00',
      next_communication: '2022-06-18 15:00:00',
    },
    {
      tenant: 'Oxford',
      email: 'blendk12@outlook.com',
      first_name: 'Drin',
      last_name: 'Fejzullahu',
      phone_number: '049487720',
      type: 0,
      status: 0,
      active: 0,
      note: 'Test Note',
      created_at: '2022-05-18 15:00:00',
      modified_at: '2022-05-18 15:00:00',
      last_communication: '2022-05-18 15:00:00',
      next_communication: '2022-06-18 15:00:00',
    },
  ]);

  const [uncategorizedContacts, setUncategorizedContacts] = useState([
    {
      tenant: 'Oxford',
      email: 'blendk@outlook.com',
      first_name: 'Blendar',
      last_name: 'Kabashi',
      phone_number: '049487720',
      type: null,
      status: null,
      active: 0,
      note: 'Test Note',
      created_at: '2022-05-18 15:00:00',
      modified_at: '2022-05-18 15:00:00',
      last_communication: '2022-05-18 15:00:00',
      next_communication: '2022-06-18 15:00:00',
    },
    {
      tenant: 'Oxford',
      email: 'gentk@outlook.com',
      first_name: 'Gent',
      last_name: 'Kabashi',
      phone_number: '049487720',
      type: null,
      status: null,
      active: 0,
      note: 'Test Note',
      created_at: '2022-05-18 15:00:00',
      modified_at: '2022-05-18 15:00:00',
      last_communication: '2022-05-18 15:00:00',
      next_communication: '2022-06-18 15:00:00',
    },
    {
      tenant: 'Oxford',
      email: 'blendk1@outlook.com',
      first_name: 'Drin',
      last_name: 'Fejzullahu',
      phone_number: '049487720',
      type: null,
      status: null,
      active: 0,
      note: 'Test Note',
      created_at: '2022-05-18 15:00:00',
      modified_at: '2022-05-18 15:00:00',
      last_communication: '2022-05-18 15:00:00',
      next_communication: '2022-06-18 15:00:00',
    },
    {
      tenant: 'Oxford',
      email: 'blendk2@outlook.com',
      first_name: 'Drin',
      last_name: 'Fejzullahu',
      phone_number: '049487720',
      type: null,
      status: null,
      active: 0,
      note: 'Test Note',
      created_at: '2022-05-18 15:00:00',
      modified_at: '2022-05-18 15:00:00',
      last_communication: '2022-05-18 15:00:00',
      next_communication: '2022-06-18 15:00:00',
    },
    {
      tenant: 'Oxford',
      email: 'blendk3@outlook.com',
      first_name: 'Drin',
      last_name: 'Fejzullahu',
      phone_number: '049487720',
      type: null,
      status: null,
      active: 0,
      note: 'Test Note',
      created_at: '2022-05-18 15:00:00',
      modified_at: '2022-05-18 15:00:00',
      last_communication: '2022-05-18 15:00:00',
      next_communication: '2022-06-18 15:00:00',
    },
    {
      tenant: 'Oxford',
      email: 'blendk4@outlook.com',
      first_name: 'Drin',
      last_name: 'Fejzullahu',
      phone_number: '049487720',
      type: null,
      status: null,
      active: 0,
      note: 'Test Note',
      created_at: '2022-05-18 15:00:00',
      modified_at: '2022-05-18 15:00:00',
      last_communication: '2022-05-18 15:00:00',
      next_communication: '2022-06-18 15:00:00',
    },
    {
      tenant: 'Oxford',
      email: 'blendk5@outlook.com',
      first_name: 'Drin',
      last_name: 'Fejzullahu',
      phone_number: '049487720',
      type: null,
      status: null,
      active: 0,
      note: 'Test Note',
      created_at: '2022-05-18 15:00:00',
      modified_at: '2022-05-18 15:00:00',
      last_communication: '2022-05-18 15:00:00',
      next_communication: '2022-06-18 15:00:00',
    },
    {
      tenant: 'Oxford',
      email: 'blendk6@outlook.com',
      first_name: 'Drin',
      last_name: 'Fejzullahu',
      phone_number: '049487720',
      type: null,
      status: null,
      active: 0,
      note: 'Test Note',
      created_at: '2022-05-18 15:00:00',
      modified_at: '2022-05-18 15:00:00',
      last_communication: '2022-05-18 15:00:00',
      next_communication: '2022-06-18 15:00:00',
    },
    {
      tenant: 'Oxford',
      email: 'blendk7@outlook.com',
      first_name: 'Drin',
      last_name: 'Fejzullahu',
      phone_number: '049487720',
      type: null,
      status: null,
      active: 0,
      note: 'Test Note',
      created_at: '2022-05-18 15:00:00',
      modified_at: '2022-05-18 15:00:00',
      last_communication: '2022-05-18 15:00:00',
      next_communication: '2022-06-18 15:00:00',
    },
    {
      tenant: 'Oxford',
      email: 'blendk8@outlook.com',
      first_name: 'Drin',
      last_name: 'Fejzullahu',
      phone_number: '049487720',
      type: null,
      status: null,
      active: 0,
      note: 'Test Note',
      created_at: '2022-05-18 15:00:00',
      modified_at: '2022-05-18 15:00:00',
      last_communication: '2022-05-18 15:00:00',
      next_communication: '2022-06-18 15:00:00',
    },
    {
      tenant: 'Oxford',
      email: 'blendk9@outlook.com',
      first_name: 'Drin',
      last_name: 'Fejzullahu',
      phone_number: '049487720',
      type: null,
      status: null,
      active: 0,
      note: 'Test Note',
      created_at: '2022-05-18 15:00:00',
      modified_at: '2022-05-18 15:00:00',
      last_communication: '2022-05-18 15:00:00',
      next_communication: '2022-06-18 15:00:00',
    },
    {
      tenant: 'Oxford',
      email: 'blendk10@outlook.com',
      first_name: 'Drin',
      last_name: 'Fejzullahu',
      phone_number: '049487720',
      type: null,
      status: null,
      active: 0,
      note: 'Test Note',
      created_at: '2022-05-18 15:00:00',
      modified_at: '2022-05-18 15:00:00',
      last_communication: '2022-05-18 15:00:00',
      next_communication: '2022-06-18 15:00:00',
    },
    {
      tenant: 'Oxford',
      email: 'blendk11@outlook.com',
      first_name: 'Drin',
      last_name: 'Fejzullahu',
      phone_number: '049487720',
      type: null,
      status: null,
      active: 0,
      note: 'Test Note',
      created_at: '2022-05-18 15:00:00',
      modified_at: '2022-05-18 15:00:00',
      last_communication: '2022-05-18 15:00:00',
      next_communication: '2022-06-18 15:00:00',
    },
    {
      tenant: 'Oxford',
      email: 'blendk12@outlook.com',
      first_name: 'Drin',
      last_name: 'Fejzullahu',
      phone_number: '049487720',
      type: null,
      status: null,
      active: 0,
      note: 'Test Note',
      created_at: '2022-05-18 15:00:00',
      modified_at: '2022-05-18 15:00:00',
      last_communication: '2022-05-18 15:00:00',
      next_communication: '2022-06-18 15:00:00',
    },
  ]);

  const clientTypeCards = [
    {
      id: 0,
      tabId: 0,
      name: 'New Lead',
      type: 'funnel',
      className: 'bg-lightBlue1',
    },
    {
      id: 1,
      tabId: 0,
      name: 'Attempted Contact',
      type: 'funnel',
      className: 'bg-lightBlue2',
      data: [
        {
          avatar: '',
          name: 'Test 1',
          type: 'Landlord',
          email: 'blendk@outlook.com',
          status: 'In Communication',
          lastCommunication: 'Today',
          campaign: true,
        },
        {
          avatar: '',
          name: 'Test 2',
          type: 'Buyer',
          email: 'blendk1@outlook.com',
          status: 'In Communication',
          lastCommunication: 'Today',
          campaign: false,
        },
      ],
    },
    ,
    {
      id: 2,
      tabId: 0,
      name: 'In Communication',
      type: 'funnel',
      className: 'bg-indigo1',
      data: [
        {
          avatar: '',
          name: 'Name Lastname',
          email: 'name@outlook.com',
          type: 'Renter',
          status: 'In Communication',
          lastCommunication: 'Today',
          campaign: true,
        },
        {
          avatar: '',
          name: 'Name Lastname',
          type: 'Renter',
          email: 'name2@outlook.com',
          status: 'In Communication',
          lastCommunication: 'Today',
          campaign: true,
        },
      ],
    },
    {
      id: 3,
      tabId: 0,
      name: 'Appointment Set',
      type: 'funnel',
      className: 'bg-indigo2',
    },

    {
      id: 4,
      tabId: 0,
      name: 'Actively Working',
      type: 'funnel',
      className: 'bg-indigo3',
    },
    {
      id: 5,
      tabId: 0,
      name: 'Offer Submitted',
      type: 'funnel',
      className: 'bg-purple5',
    },

    {
      id: 6,
      tabId: 1,
      name: 'Contract Signed',
      type: 'closed-clients',
      className: 'bg-green2',
    },
    {
      id: 7,
      tabId: 1,
      name: 'Closed ',
      type: 'closed-clients',
      className: 'bg-green3',
    },
    {
      id: 8,
      tabId: 2,
      name: 'On Hold',
      type: 'on-hold',
      className: 'bg-orange2',
    },
    {
      id: 9,
      tabId: 3,
      name: 'Dropped',
      type: 'dropped',
      className: 'bg-rose1',
    },
  ];

  const professionalsTypeCards = [
    {
      id: 0,
      tabId: 0,
      name: 'No Relationship',
      type: 'active',
      className: 'bg-lightBlue1',
    },
    {
      id: 1,
      tabId: 0,
      name: 'Loose Relationship',
      type: 'active',
      className: 'bg-lightBlue2',
      data: [
        {
          avatar: '',
          name: 'Test 1',
          type: 'Landlord',
          status: 'In Communication',
          lastCommunication: 'Today',
          campaign: true,
        },
        {
          avatar: '',
          name: 'Test 2',
          type: 'Buyer',
          status: 'In Communication',
          lastCommunication: 'Today',
          campaign: false,
        },
      ],
    },
    ,
    {
      id: 2,
      tabId: 0,
      name: 'Strong Relationship',
      type: 'active',
      className: 'bg-indigo1',
      data: [
        {
          avatar: '',
          name: 'Name Lastname',
          type: 'Renter',
          status: 'In Communication',
          lastCommunication: 'Today',
          campaign: true,
        },
        {
          avatar: '',
          name: 'Name Lastname',
          type: 'Renter',
          status: 'In Communication',
          lastCommunication: 'Today',
          campaign: true,
        },
      ],
    },
    {
      id: 3,
      tabId: 1,
      name: 'Dropped',
      type: 'dropped',
      className: 'bg-indigo2',
    },
  ];

  const [tabs] = useState([
    {
      id: 0,
      name: 'Clients',
      label: 'Clients in the Funnel',
      href: 'contacts/clients-contacts',
      icon: <Group className="h-5 w-5" />,
      subtab: [
        {
          id: 0,
          name: 'In the Funnel',
          dot: <span className="h-2 w-2 rounded-full bg-lightBlue3" />,
          count: getCount('funnel'),
        },
        {
          id: 1,
          name: 'Closed Clients',
          dot: <span className="h-2 w-2 rounded-full bg-green6" />,
          count: getCount('closed-contacts'),
        },
        {
          id: 2,
          name: 'On Hold',
          dot: <span className="h-2 w-2 rounded-full bg-orange1" />,
          count: getCount('on-hold'),
        },
        {
          id: 3,
          name: 'Dropped',
          dot: <span className="h-2 w-2 rounded-full bg-red3" />,
          count: getCount('dropped'),
        },
      ],
    },
    {
      id: 1,
      name: 'Professionals',
      label: 'Professionals',
      href: 'contacts/professionals-contacts',
      icon: <PermContactCalendar className="h-5 w-5" />,
      subtab: [
        {
          id: 0,
          name: 'Active',
          dot: <span className="h-2 w-2 rounded-full bg-lightBlue3" />,
          count: 5,
        },
        {
          id: 1,
          name: 'Dropped',
          dot: <span className="h-2 w-2 rounded-full bg-red3" />,
          count: 10,
        },
      ],
    },
    {
      id: 2,
      name: 'Uncategorized',
      label: 'Uncategorized Contacts',
      href: 'contacts/uncategorized-contacts',
      icon: <Error className="h-5 w-5" />,
      subtab: [
        {
          id: 0,
          name: 'New Records',
          icon: <Group className="h-4 w-4" />,
          count: 5,
        },
        {
          id: 1,
          name: 'Unknown',
          icon: <Help className="h-4 w-4" />,
          count: 10,
        },
        // {
        //   id: 2,
        //   name: 'Trash',
        //   icon: <Delete className="h-4 w-4" />,
        //   count: 5,
        // },
      ],
    },
  ]);

  return (
    <>
      <MainMenu />
      {/* <Tour for={openedTab == 0 ? 'clients' : 'professionals'} /> */}
      <div className="h-full w-full flex items-center justify-center" style={{ height: 'calc(100vh - 70px)' }}>
        <SetupGmail
          setShowImportingOverlay={setShowImportingOverlay}
          setshowAddContactManuallyOverlay={setShowAddContactManuallyOverlay}
        />
      </div>
      {showAddContactManuallyOverlay && (
        <AddContactManuallyOverlay
          selectedContactType={selectedContactType}
          setSelectedContactType={(arg) => setSelectedContactType(arg)}
          selectedStatus={selectedStatus}
          setSelectedStatus={(arg) => setSelectedStatus(arg)}
          selectedCard={selectedCard}
          setSelectedCard={(arg) => setSelectedCard(arg)}
          handleClose={() => setShowAddContactManuallyOverlay(false)}
          title="Add Contact"
        />
      )}
      {showContactsSyncedOverlay && <ContactsSyncedOverlay handleCloseOverlay={handleCloseContactsSynced} />}
      {showImportingOverlay && <ImportingFromGmail progress="52" handleCloseOverlay={closeImportingOverlay} />}
      {showSuccessfullyCategorized && (
        <SuccessfullyCategorized
          totalCategorized={13}
          totalUncategorized={uncategorizedContacts.length}
          handleCloseOverlay={() => setShowSuccessfullyCategorized(false)}
        />
      )}
      {showStartCategorizing && (
        <StartCategorizing uncategorizedContacts={35} handleCloseOverlay={() => setShowStartCategorizing(false)} />
      )}
      {showAssignToCampaign && (
        <AssignToCampaign
          contacts={uncategorizedContacts[0]}
          handleCloseOverlay={() => setShowAssignToCampaign(false)}
        />
      )}
      {showUnassignFromCampaign && <UnassignOverlay handleCloseOverlay={() => setShowAssignToCampaign(false)} />}
      {showAddContactOverlay && (
        <AddContactOverlay
          title="Add Contact"
          addManually={() => handleAddContactManually()}
          handleClose={() => setShowAddContactOverlay(false)}
        />
      )}
      {showImportFromCsvOverlay && (
        <ImportFromCsv
          title="Import CSV"
          setUploadingDocument={setUploadingDocument}
          onUploadDocument={setUploadedDocument}
          handleClose={() => setShowImportFromCsvOverlay(false)}
        />
      )}
    </>
  );
};

export default Contacts;

export async function getStaticProps(context) {
  return {
    props: {
      requiresAuth: true,
    },
  };
}
