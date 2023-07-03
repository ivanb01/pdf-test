import Layout from 'components/Layout';
import Clients from 'components/Contacts/clients-content';
import { useState, useEffect } from 'react';
import {
  setOpenedTab,
  setOpenedSubtab,
  setRefetchData,
} from 'store/global/slice';
import { useDispatch, useSelector } from 'react-redux';
import { bulkUpdateContacts, getContacts } from 'api/contacts';
import { setContacts, updateContacts } from 'store/contacts/slice';
import Loader from 'components/shared/loader';
import AddClientManuallyOverlay from 'components/overlays/add-client/add-client-manually';
import { clientStatuses, clientOptions } from 'global/variables';
import { getContactsSearch } from 'api/contacts';
import { globalTabsStates } from 'global/variables';
import { searchContacts } from 'global/functions';
import EditContactOverlay from 'components/overlays/edit-client';
import dynamic from 'next/dynamic';
import GlobalAlert from 'components/shared/alert/global-alert';
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
  const allContacts = useSelector((state) => state.contacts.allContacts);

  const [loading, setLoading] = useState(true);

  const refetchData = useSelector((state) => state.global.refetchData);
  const openedTab = useSelector((state) => state.global.openedTab);
  const openedSubtab = useSelector((state) => state.global.openedSubtab);

  const searchClients = (term) => {
    let filteredArray = searchContacts(contactsCopy.data, term);
    dispatch(updateContacts(filteredArray.data));
  };

  useEffect(() => {
    setLoading(true);
  }, [openedTab]);

  const fetchClients = () => {
    let clients = {
      ...allContacts,
      data: allContacts.data.filter((contact) =>
        [4, 5, 6, 7].includes(contact.category_id)
      ),
    };
    dispatch(setContacts(clients));
    setContactsCopy(clients);
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    if (allContacts.data) {
      fetchClients();
    }
    bulkUpdateContacts();
    dispatch(setOpenedTab(0));
    dispatch(setOpenedSubtab(0));
  }, [allContacts]);
  useEffect(() => {
    if (refetchData) {
      fetchClients();
      dispatch(setOpenedTab(0));
      dispatch(setOpenedSubtab(0));
      dispatch(setRefetchData(false));
    }
  }, [refetchData]);
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
