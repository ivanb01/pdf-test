import Layout from 'components/Layout';
import Professionals from 'components/Contacts/professionals-content';
import { useState, useEffect } from 'react';
import { setOpenedTab, setOpenedSubtab } from 'store/global/slice';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from 'api/contacts';
import { setContacts } from 'store/contacts/slice';
import Loader from 'components/shared/loader';
import { professionalsStatuses, professionalsOptions } from 'global/variables';
import AddClientManuallyOverlay from 'components/overlays/add-client/add-client-manually';
import { searchContacts } from 'global/functions';

const index = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [professionalsCopy, setProfessionalsCopy] = useState();
  const [showAddContactOverlay, setShowAddContactOverlay] = useState(false);
  const openedTab = useSelector((state) => state.global.openedTab);

  const searchProfessionals = (term) => {
    let filteredArray = searchContacts(professionalsCopy.data, term);
    dispatch(setContacts(filteredArray));
  };

  useEffect(() => {
    setLoading(true);
  }, [openedTab]);

  const fetchProfessionals = () => {
    setLoading(true);
    getContacts('8,9,12,').then((data) => {
      dispatch(setContacts(data.data));
      setProfessionalsCopy(data.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    // getContacts('8,9,12,').then((data) => {
    //   dispatch(setContacts(data.data));
    //   setProfessionalsCopy(data.data);
    //   setLoading(false);
    // });
    fetchProfessionals();
    dispatch(setOpenedTab(1));
    dispatch(setOpenedSubtab(0));
  }, []);

  return (
    <Layout>
      {loading ? (
        <Loader />
      ) : (
        <Professionals
          setShowAddContactOverlay={setShowAddContactOverlay}
          onSearch={searchProfessionals}
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
