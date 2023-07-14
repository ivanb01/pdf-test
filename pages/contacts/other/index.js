import SimpleBar from 'simplebar-react';
import Table from 'components/shared/table';
import Other from 'components/Contacts/other-content';
import { useState } from 'react';
import Layout from 'components/Layout';
import Loader from 'components/shared/loader';
import { useEffect } from 'react';
import { getContacts } from 'api/contacts';
import Text from 'components/shared/text';
import Search from 'components/shared/input/search';
import Button from 'components/shared/button';
import { useDispatch, useSelector } from 'react-redux';
import { setContacts } from 'store/contacts/slice';
import { setOpenedTab, setOpenedSubtab } from 'store/global/slice';
import { searchContacts } from 'global/functions';

const index = () => {
  const dispatch = useDispatch();
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
        (contact) =>
          contact.category_id === 13 ||
          contact.category_id === 14 ||
          contact.category_id === 2
      ),
    };
    const contacts = other.data;
    const contactsFamilyFriends = contacts.filter(
      (contact) => contact.category_id === 13 || contact.category_id === 14
    );
    const contactsUnknown = contacts.filter(
      (contact) => contact.category_id === 2
    );
    dispatch(setContacts(other));
    setFamilyAndFriends(contactsFamilyFriends);
    setUnknown(contactsUnknown);
    openedSubtab === 0
      ? setActualContact(contactsFamilyFriends)
      : setActualContact(contactsUnknown);
    setLoading(false);
  };

  useEffect(() => {
    // setLoading(true);
    if (allContacts.data) {
      fetchOther();
    }
    dispatch(setOpenedTab(3));
    dispatch(setOpenedSubtab(0));
  }, [allContacts]);

  useEffect(() => {
    if (allContacts.data) {
      fetchOther();
    }
  }, [openedSubtab]);

  const onSearch = (term) => {
    const contactsCopy = openedSubtab === 0 ? familyAndFriends : unknown;
    const filteredArray = searchContacts(contactsCopy, term);
    setActualContact(filteredArray?.data);
  };

  return (
    <Layout>
      {loading ? (
        <Loader />
      ) : (openedSubtab == 0 && familyAndFriends?.length) ||
        (openedSubtab == 1 && unknown?.length) ? (
        <>
          <div className="absolute left-0 top-0 right-0 bottom-0 flex flex-col">
            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center justify-between w-full">
                <Text h3 className="text-gray7 text-xl">
                  {openedSubtab == 0 ? 'Family & Friends' : 'Unknown'}
                </Text>
                <div className="flex items-center justify-self-end">
                  <Search
                    placeholder="Search"
                    className="mr-4 text-sm"
                    onInput={(event) => onSearch(event.target.value)}
                  />
                </div>
              </div>
            </div>

            <div
              className="w-auto relative flex"
              style={{ height: 'calc(100vh - 160px)' }}
            >
              <div
                className={`border border-gray-200 overflow-hidden relative h-full w-full`}
              >
                <SimpleBar autoHide={true} style={{ maxHeight: '100%' }}>
                  <Table tableFor="other" data={actualContact} />
                </SimpleBar>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full mx-auto my-0">
          <lottie-player
            src="https://assets2.lottiefiles.com/packages/lf20_lnc7r5pw.json"
            loop
            autoplay
            style={{ width: '420px', height: '300px' }}
          ></lottie-player>
          <Text h3 className="text-gray7 mt-4 mb-2 text-center">
            {openedSubtab == 0
              ? 'You have no contacts categorized as family and friends.'
              : 'You have no contacts categorized as unknown.'}
          </Text>
        </div>
      )}
    </Layout>
  );
};

export default index;
