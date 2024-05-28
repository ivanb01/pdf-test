import Layout from 'components/Layout';
import Professionals from 'components/Contacts/professionals-content';
import { useState, useEffect } from 'react';
import { setOpenedTab, setRefetchData } from 'store/global/slice';
import { useDispatch, useSelector } from 'react-redux';
import { setContacts, setProfessionals } from 'store/contacts/slice';
import Loader from 'components/shared/loader';
import { professionalsStatuses, professionalsOptions } from 'global/variables';
import AddClientManuallyOverlay from 'components/overlays/add-client/add-client-manually';
import { searchContacts } from 'global/functions';
import { types } from 'global/variables';
import ReviewContact from '@components/overlays/review-contact';
import withAuth from '@components/withAuth';

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
    dispatch(setProfessionals(filteredArray.data));
  };

  useEffect(() => {
    // setLoading(true);
  }, [openedTab]);

  const fetchProfessionals = () => {
    let professionalsTypes = types[1].types.map((type) => type.id);

    let professionals = {
      ...allContacts,
      data: allContacts.data.filter((contact) => professionalsTypes.includes(contact.category_id)),
    };
    // getContacts(professionalsTypes).then((data) => {
    //   console.log(data.data, professionals);
    // });
    // console.log(professionals, professionalsTypes);
    dispatch(setContacts(professionals));
    setProfessionalsCopy(professionals);
    setLoading(false);
    dispatch(setOpenedTab(1));
  };

  useEffect(() => {
    // setLoading(true);
    if (allContacts.data) {
      fetchProfessionals();
    }
  }, [allContacts]);

  useEffect(() => {
    if (refetchData) {
      fetchProfessionals();
      dispatch(setRefetchData(false));
    }
  }, [refetchData]);

  const [unapprovedContacts, setUnapprovedContacts] = useState([]);

  useEffect(() => {
    const ai_unapproved = allContacts?.data?.filter(
      (client) =>
        ['GmailAI', 'Smart Sync A.I.', 'Gmail'].includes(client.import_source) &&
        (client.approved_ai === false || client.approved_ai === null),
    );
    setUnapprovedContacts(ai_unapproved);
  }, [allContacts]);

  return (
    <Layout>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Professionals
            setShowAddContactOverlay={setShowAddContactOverlay}
            onSearch={searchProfessionals}
            unapprovedContacts={unapprovedContacts.length > 0 ? unapprovedContacts : 0}
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
        <ReviewContact
          showToast
          client={contactToEdit}
          setClient={setContactToEdit}
          handleClose={() => setShowEditContact(false)}
          title="Edit Professional"
        />
      )}
    </Layout>
  );
};

export default withAuth(index);

// export async function getServerSideProps(context) {
//   return {
//     props: {
//       requiresAuth: true,
//     },
//   };
// }
