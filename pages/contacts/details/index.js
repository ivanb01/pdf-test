import { useState } from 'react';
import Breadcrumbs from 'components/shared/breadcrumbs';
import MainMenu from 'components/shared/menu';
import ClientDetailsSidebar from 'components/client-details-sidebar';
import Tabs from 'components/shared/tabs';
import { tabs } from 'components/client-details-sidebar/list';
import { menuItems } from 'global/variables';
import { useRouter } from 'next/router';
import backArrow from 'public/images/back-arrow.svg';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import * as contactServices from 'api/contacts';
import Loader from 'components/shared/loader';
import { setRefetchData } from 'store/global/slice';
import {
  getContactNotes,
  getContact,
  getContactActivities,
} from 'api/contacts';
import { getContactCampaign } from 'api/campaign';
import {
  setActivityLogData,
  setNotesData,
  setCampaignsData,
} from 'store/clientDetails/slice';

export default function Details() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;

  const refetchData = useSelector((state) => state.global.refetchData);
  const contacts = useSelector((state) => state.contacts.data.data);
  // const contact = contacts.find((contact) => contact.id == id);
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchContactRequired, setFetchContactRequired] = useState(false);
  const handleFetchContactRequired = () => {
    setFetchContactRequired((prev) => !prev);
  };
  const [current, setCurrent] = useState(0);

  const [overlays, setOverlays] = useState({
    deleteClient: false,
    editClient: false,
    assignCampaign: false,
    unassignCampaign: false,
  });
  const handleDeleteClientChange = (state) => () =>
    setOverlays({ deleteClient: state });
  const handleEditClientChange = (state) => () =>
    setOverlays({ editClient: state });
  const handleAssignCampaignChange = (state) => () =>
    setOverlays({ assignCampaign: state });
  const handleUnassignCampaignChange = (state) => () =>
    setOverlays({ unassignCampaign: state });

  const localTabs = tabs(id, contact, handleFetchContactRequired);

  const fetchContact = async () => {
    // setLoading(true);
    try {
      const { data } = await getContact(id);
      setContact(data);
      const campaignsData = await getContactCampaign(id);
      dispatch(setCampaignsData(campaignsData.data));
      setLoading(false);
      const notesData = await getContactNotes(id);
      const activityLogData = await getContactActivities(id);
      dispatch(setNotesData(notesData.data.data));
      dispatch(setActivityLogData(activityLogData.data.data));
      // setLoading(false);
      console.log('get contact', id, data);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   if (router.query.campaigns) {
  //     setCurrent(1);
  //   }
  // }, []);

  useEffect(() => {
    if (refetchData) {
      fetchContact().then(() => dispatch(setRefetchData(false)));
    }
    console.log('refetched');
  }, [refetchData]);

  useEffect(() => {
    id && fetchContact();
  }, [fetchContactRequired, id]);

  return (
    <>
      <MainMenu fixed />
      <div className="client-details-page-wrapper">
        <div className="p-6 inline-block">
          <a
            href="#"
            onClick={() => router.back()}
            className="items-center flex"
          >
            <Image className="cursor-pointer" src={backArrow} />
            <div className="ml-2 font-medium">Back to Clients</div>
          </a>
        </div>
        {/* <Breadcrumbs className="bg-white pl-6 py-6 border-b border-gray-2" /> */}
        {!id || loading ? (
          <Loader />
        ) : (
          <div className="flex flex-row border-t border-gray-2">
            <ClientDetailsSidebar
              client={contact}
              handleFetchContactRequired={handleFetchContactRequired}
              // afterUpdate={fetchContact}
            />
            <Tabs
              current={current}
              setCurrent={setCurrent}
              className="px-6 pb-6"
              tabs={localTabs}
            />
          </div>
        )}
      </div>
    </>
  );
}

export async function getStaticProps(context) {
  return {
    props: {
      requiresAuth: true,
    },
  };
}

// export const getStaticPaths = async () => {
//   return {
//     paths: [],
//     fallback: 'blocking',
//   };
// };
