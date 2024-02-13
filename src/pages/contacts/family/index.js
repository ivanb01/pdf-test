import SimpleBar from 'simplebar-react';
import Table from 'components/shared/table';
import Other from 'components/Contacts/other-content';
import { useEffect, useState } from 'react';
import Layout from 'components/Layout';
import Loader from 'components/shared/loader';
import { getContacts, updateContact } from 'api/contacts';
import Text from 'components/shared/text';
import Search from 'components/shared/input/search';
import Button from 'components/shared/button';
import { useDispatch, useSelector } from 'react-redux';
import { setContacts, updateContactLocally } from 'store/contacts/slice';
import { setOpenedTab, setOpenedSubtab, setRefetchData } from 'store/global/slice';
import { searchContacts } from 'global/functions';
import GlobalAlert from '@components/shared/alert/global-alert';
import withAuth from '@components/withAuth';
import FloatingAlert from '@components/shared/alert/floating-alert';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReviewContact from '@components/overlays/review-contact';

const index = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [searchKey, setSearchKey] = useState('');
  const [loading, setLoading] = useState(true);
  const [familyAndFriends, setFamilyAndFriends] = useState(null);
  const [unknown, setUnknown] = useState(null);
  const [actualContact, setActualContact] = useState(null);
  const openedTab = useSelector((state) => state.global.openedTab);
  const openedSubtab = useSelector((state) => state.global.openedSubtab);
  const allContacts = useSelector((state) => state.contacts.allContacts);

  const fetchOther = () => {
    let other = {
      ...allContacts,
      data: allContacts.data.filter(
        (contact) => contact.category_id === 13 || contact.category_id === 14 || contact.category_id === 2,
      ),
    };
    const contacts = other.data;
    const contactsFamilyFriends = contacts.filter(
      (contact) => contact.category_id === 13 || contact.category_id === 14,
    );
    const contactsUnknown = contacts.filter((contact) => contact.category_id === 2);
    dispatch(setContacts(other));
    setFamilyAndFriends(contactsFamilyFriends);
    setUnknown(contactsUnknown);
    setActualContact(contactsFamilyFriends);
    setLoading(false);
  };

  useEffect(() => {
    // setLoading(true);
    if (allContacts.data && !searchKey.length) {
      fetchOther();
    }
    dispatch(setOpenedTab(5));
    // dispatch(setOpenedSubtab(0));
  }, [allContacts.data]);

  useEffect(() => {
    if (allContacts.data) {
      fetchOther();
    }
  }, []);

  const onSearch = (term) => {
    const contactsCopy = familyAndFriends;
    const filteredArray = searchContacts(contactsCopy, term);
    setActualContact(filteredArray?.data);
    console.log(term, filteredArray);
  };

  const [unapprovedContacts, setUnapprovedContacts] = useState([]);

  useEffect(() => {
    const ai_unapproved = allContacts?.data?.filter(
      (client) =>
        ['GmailAI', 'Smart Sync A.I.', 'Gmail'].includes(client.import_source) &&
        (client.approved_ai === false || client.approved_ai === null),
    );
    setUnapprovedContacts(ai_unapproved);
  }, [allContacts]);

  const handleAction = async (data) => {
    try {
      let newData = {};
      newData.category_id = 3;
      toast.custom(
        (t) => (
          <div
            className={`${
              t.visible ? 'animate-enter' : 'animate-leave'
            } shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 bg-gray-700 text-gray-50`}>
            <div className="flex gap-2 p-4 word-break items-center">
              <CheckCircleIcon className={'text-green-500'} />
              <h1 className={'text-sm leading-5 font-medium'}>
                {data.first_name} {data.last_name} {'moved to Trash'}
              </h1>
            </div>
            <div className="flex rounded-tr-lg rounded-br-lg p-4 bg-gray-600 text-gray-100">
              <button
                onClick={() => {
                  toast.dismiss(t.id);
                  dispatch(updateContactLocally({ ...data, category_id: 14 }));
                  updateContact(data.id, { ...newData, category_id: 14 }).then(() => dispatch(setRefetchData(true)));
                }}
                className="w-full border border-transparent rounded-none rounded-r-lg flex items-center justify-center text-sm leading-5 font-medium font-medium">
                Undo
              </button>
            </div>
          </div>
        ),
        { duration: 0 },
      );
      dispatch(updateContactLocally({ ...data, category_id: 3 }));
      updateContact(data.id, newData).then(() => dispatch(setRefetchData(true)));
    } catch (error) {}
  };
  const [showEditContact, setShowEditContact] = useState(false);
  const [contactToEdit, setContactToEdit] = useState(null);

  return (
    <Layout>
      {loading ? (
        <Loader />
      ) : familyAndFriends?.length ? (
        <>
          <div className="absolute left-0 top-0 right-0 bottom-0 flex flex-col">
            <FloatingAlert
              inProp={unapprovedContacts.length > 0}
              onClick={() => router.push('/ai-summary')}
              buttonText={'Review Now'}
              className="mx-[21px] mt-[14px]"
              message={`${unapprovedContacts.length} New Smart Synced contacts were imported from Gmail and need to be reviewed.`}
              type="smart-sync"
            />
            <div className="p-6 py-4 flex items-center justify-between">
              <div className="flex items-center justify-between w-full">
                <Text h3 className="text-gray7 text-xl">
                  Family & Friends
                </Text>
                <div className="flex items-center justify-self-end">
                  <Search
                    placeholder="Search"
                    className="mr-4 text-sm"
                    value={searchKey}
                    onInput={(event) => {
                      setSearchKey(event.target.value);
                      onSearch(event.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="w-auto relative flex" style={{ height: 'calc(100vh - 160px)' }}>
              <div className={`border border-gray-200 overflow-hidden relative h-full w-full`}>
                <SimpleBar autoHide style={{ maxHeight: '100%', height: '100%' }}>
                  <Table
                    tableFor="other"
                    data={actualContact}
                    handleAction={handleAction}
                    handleCardEdit={(contact) => {
                      setShowEditContact(true);
                      setContactToEdit(contact);
                    }}
                  />
                </SimpleBar>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full mx-auto my-0">
          <lottie-player
            src="/animations/family.json"
            loop
            autoplay
            style={{ width: '420px', height: '300px' }}></lottie-player>
          <Text h3 className="text-gray7 mt-4 mb-2 text-center">
            You have no contacts categorized as family and friends.
          </Text>
        </div>
      )}
      {showEditContact && (
        <ReviewContact
          showToast
          client={contactToEdit}
          setClient={setContactToEdit}
          handleClose={() => setShowEditContact(false)}
          title="Edit Family & Friends"
        />
      )}
    </Layout>
  );
};

export default withAuth(index);
