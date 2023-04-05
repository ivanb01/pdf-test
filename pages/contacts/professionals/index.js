import Layout from 'components/Layout';
import Professionals from 'components/Contacts/professionals-content';
import { useState, useEffect } from 'react';
import { setOpenedTab, setOpenedSubtab } from 'store/global/slice';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from 'api/contacts';
import { setContacts } from 'store/contacts/slice';
import Loader from 'components/shared/loader';
import { professionalsStatuses } from 'global/variables';
import AddClientManuallyOverlay from 'components/overlays/add-client/add-client-manually';
import { searchContacts } from 'global/functions';
import EditContactOverlay from 'components/overlays/edit-client';


const index = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [professionalsCopy, setProfessionalsCopy] = useState();
  const [showAddContactOverlay, setShowAddContactOverlay] = useState(false);
  const [showEditContact, setShowEditContact] = useState(false);
  const [contactToEdit, setContactToEdit] = useState(null);
  const openedTab = useSelector((state) => state.global.openedTab);

  const searchProfessionals = (term) => {
    let filteredArray = searchContacts(professionalsCopy.data, term);
    dispatch(setContacts(filteredArray));
  };

  useEffect(() => {
    setLoading(true);
  }, [openedTab]);

  useEffect(() => {
    getContacts('8,9,12,').then((data) => {
      dispatch(setContacts(data.data));
      setProfessionalsCopy(data.data);
      setLoading(false);
    });
    dispatch(setOpenedTab(1));
    dispatch(setOpenedSubtab(0));
  }, []);

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

  const professionalsOptions = [
    {
      id: 8,
      name: 'Vendor',
    },
    {
      id: 12,
      name: 'Agent',
    },
    {
      id: 9,
      name: 'Other',
    },
  ];

  return (
    <Layout>
      {loading ? (
        <Loader />
      ) : (
        <Professionals
          setShowAddContactOverlay={setShowAddContactOverlay}
          onSearch={searchProfessionals}
          handleCardEdit={(contact) => {
            setShowEditContact(true);
            setContactToEdit(contact);
          }}
        />
      )}

      {showAddContactOverlay && (
        <AddClientManuallyOverlay
          handleClose={() => setShowAddContactOverlay(false)}
          title="Add Professional"
          options={professionalsOptions}
          statuses={professionalsStatuses}
        />
      )}

      {showEditContact && (
        <EditContactOverlay
          handleClose={() => setShowEditContact(false)}
          title="Edit Professional"
          client={contactToEdit}
          className="w-[635px]"
          afterUpdate={() => console.log('fetching')}
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
