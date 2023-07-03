import Layout from 'components/Layout';
import Professionals from 'components/Contacts/professionals-content';
import { useState, useEffect } from 'react';
import {
  setOpenedTab,
  setOpenedSubtab,
  setRefetchData,
} from 'store/global/slice';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from 'api/contacts';
import { setContacts, updateContacts } from 'store/contacts/slice';
import Loader from 'components/shared/loader';
import { professionalsStatuses, professionalsOptions } from 'global/variables';
import AddClientManuallyOverlay from 'components/overlays/add-client/add-client-manually';
import { searchContacts } from 'global/functions';
import EditContactOverlay from 'components/overlays/edit-client';
import { types } from 'global/variables';

const index = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [professionalsCopy, setProfessionalsCopy] = useState();
  const [showAddContactOverlay, setShowAddContactOverlay] = useState(false);
  const [showEditContact, setShowEditContact] = useState(false);
  const [contactToEdit, setContactToEdit] = useState(null);
  const openedTab = useSelector((state) => state.global.openedTab);
  const refetchData = useSelector((state) => state.global.refetchData);
  const allContacts = useSelector((state) => state.contacts.allContacts);

  const searchProfessionals = (term) => {
    let filteredArray = searchContacts(professionalsCopy.data, term);
    dispatch(updateContacts(filteredArray.data));
  };

  useEffect(() => {
    setLoading(true);
  }, [openedTab]);

  const fetchProfessionals = () => {
    let professionalsTypes = types[1].types.map((type) => type.id);

    let professionals = {
      ...allContacts,
      data: allContacts.data.filter((contact) =>
        professionalsTypes.includes(contact.category_id)
      ),
    };
    // getContacts(professionalsTypes).then((data) => {
    //   console.log(data.data, professionals);
    // });
    // console.log(professionals, professionalsTypes);
    dispatch(setContacts(professionals));
    setProfessionalsCopy(professionals);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    if (allContacts.data) {
      fetchProfessionals();
    }
    dispatch(setOpenedTab(1));
    dispatch(setOpenedSubtab(0));
  }, [allContacts]);

  useEffect(() => {
    if (refetchData) {
      fetchProfessionals();
      dispatch(setRefetchData(false));
    }
  }, [refetchData]);

  return (
    <Layout>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Professionals
            setShowAddContactOverlay={setShowAddContactOverlay}
            onSearch={searchProfessionals}
            handleCardEdit={(contact) => {
              setShowEditContact(true);
              setContactToEdit(contact);
            }}
          />
        </>
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
