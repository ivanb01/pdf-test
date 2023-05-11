import Layout from 'components/Layout';
import Clients from 'components/Contacts/clients-content';
import { useState, useEffect } from 'react';
import { setOpenedTab, setOpenedSubtab } from 'store/global/slice';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from 'api/contacts';
import { setContacts, updateContacts } from 'store/contacts/slice';
import Loader from 'components/shared/loader';
import AddClientManuallyOverlay from 'components/overlays/add-client/add-client-manually';
import { clientStatuses, clientOptions } from 'global/variables';
import { getContactsSearch } from 'api/contacts';
import { globalTabsStates } from 'global/variables';
import { searchContacts } from 'global/functions';
import EditContactOverlay from 'components/overlays/edit-client';
import dynamic from 'next/dynamic';
const Tour = dynamic(() => import('components/onboarding/tour'), {
  ssr: false,
});

const index = () => {
  const dispatch = useDispatch();

  const [showEditContact, setShowEditContact] = useState(false);
  const [contactToEdit, setContactToEdit] = useState(null);
  const [showAddContactOverlay, setShowAddContactOverlay] = useState(false);
  const [contactsCopy, setContactsCopy] = useState();
  const contacts = useSelector((state) => state.contacts.data);

  const [loading, setLoading] = useState(true);

  const openedTab = useSelector((state) => state.global.openedTab);
  const openedSubtab = useSelector((state) => state.global.openedSubtab);

  const searchClients = (term) => {
    let filteredArray = searchContacts(contactsCopy.data, term);
    console.log('filteredarray', filteredArray);
    dispatch(setContacts(filteredArray));
  };

  useEffect(() => {
    setLoading(true);
  }, [openedTab]);

  useEffect(() => {
    getContacts('4,5,6,7').then((data) => {
      setContactsCopy(data.data);
    });
  }, [contacts]);

  const fetchClients = () => {
    setLoading(true);
    getContacts('4,5,6,7').then((data) => {
      dispatch(setContacts(data.data));
      setContactsCopy(data.data);
      setLoading(false);
    });
  };
  useEffect(() => {
    fetchClients();
    dispatch(setOpenedTab(0));
    dispatch(setOpenedSubtab(0));
  }, []);
  return (
    <Layout>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Clients
            handleCardEdit={(contact) => {
              setShowEditContact(true);
              setContactToEdit(contact);
            }}
            setShowAddContactOverlay={setShowAddContactOverlay}
            onSearch={searchClients}
          />
          {/* <Tour for={'clients'} /> */}
        </>
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
