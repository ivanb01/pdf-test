import Layout from 'components/Layout';
import Clients from 'components/Contacts/clients-content';
import { useState, useEffect } from 'react';
import { setOpenedTab, setOpenedSubtab } from 'store/global/slice';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from 'api/contacts';
import { setContacts, updateContacts } from 'store/contacts/slice';
import Loader from 'components/shared/loader';
import AddClientManuallyOverlay from 'components/overlays/add-client/add-client-manually';
import { clientStatuses } from 'global/variables';
import { getContactsSearch } from 'api/contacts';
import { globalTabsStates } from 'global/variables';
import { searchContacts } from 'global/functions';
import EditContactOverlay from 'components/overlays/edit-client';

const clientOptions = [
  {
    id: 6,
    name: 'Renter',
  },
  {
    id: 4,
    name: 'Buyer',
  },
  {
    id: 5,
    name: 'Seller',
  },
  {
    id: 7,
    name: 'Landlord',
  },
];

const index = () => {
  const dispatch = useDispatch();
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
  const [showEditContact, setShowEditContact] = useState(false);
  const [contactToEdit, setContactToEdit] = useState(null);
  const [showAddContactOverlay, setShowAddContactOverlay] = useState(false);
  const [contactsCopy, setContactsCopy] = useState();
  const contacts = useSelector((state) => state.contacts.data);

  const [loading, setLoading] = useState(true);

  const openedTab = useSelector((state) => state.global.openedTab);
  const openedSubtab = useSelector((state) => state.global.openedSubtab);

  let subtab = globalTabsStates[0][openedSubtab];

  const searchClients = (term) => {
    // console.log(contactsCopy.data, term);
    let filteredArray = searchContacts(contactsCopy.data, term);
    dispatch(setContacts(filteredArray));
    console.log(filteredArray, contacts);
  };

  useEffect(() => {
    setLoading(true);
  }, [openedTab]);

  const fetchClients = () => {
    setLoading(true);
    getContacts('4,5,6,7').then((data) => {
      dispatch(setContacts(data.data));
      setContactsCopy(data.data);
      setLoading(false);
    });
  };
  useEffect(() => {
    // getContactsByCategory('4,').then((data) => {
    // dispatch(setContacts(data.data.data));
    // setLoading(false);
    // });
    fetchClients();
    dispatch(setOpenedTab(0));
    dispatch(setOpenedSubtab(0));
  }, []);
  return (
    <Layout>
      {loading ? (
        <Loader />
      ) : (
        <Clients
          handleCardEdit={(contact) => {
            setShowEditContact(true);
            setContactToEdit(contact);
          }}
          setShowAddContactOverlay={setShowAddContactOverlay}
          onSearch={searchClients}
        />
      )}
      {showAddContactOverlay && (
        <AddClientManuallyOverlay
          handleClose={() => setShowAddContactOverlay(false)}
          title="Add Client"
          options={clientOptions}
          statuses={clientStatuses}
        />
      )}
      {showEditContact && (
        <EditContactOverlay
          handleClose={() => setShowEditContact(false)}
          title="Edit Client"
          client={contactToEdit}
          className="w-[635px]"
          afterUpdate={() => fetchClients()}
        />
      )}
    </Layout>
  );
};

export default index;

export async function getStaticProps(context) {
  return {
    props: {
      requiresAuth: true,
    },
  };
}
