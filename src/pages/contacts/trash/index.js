import Layout from 'components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Loader from '@components/shared/loader';
import { getContacts } from '@api/contacts';
import { setAllContacts } from '@store/contacts/slice';
import Search from '@components/shared/input/search';
import SimpleBar from 'simplebar-react';
import Table from '@components/shared/table';
import ReviewContact from '@components/overlays/review-contact';

const index = () => {
  const dispatch = useDispatch();
  const allContacts = useSelector((state) => state.contacts.allContacts);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditContact, setShowEditContact] = useState(false);
  const [contactToEdit, setContactToEdit] = useState(null);
  useEffect(() => {
    if (allContacts.data === undefined) {
      getContacts('1,2,3,4,5,6,7,8,9,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27')
        .then((data) => {
          dispatch(setAllContacts(data.data));
        })
        .finally(() => {
          setLoading(false);
        });
    }

    if (allContacts.data !== undefined) {
      console.log('hello here');
      setLoading(false);
      onSearch(searchTerm);
    }
  }, []);
  // useEffect(() => {
  //   allContacts && console.log(allContacts.data.filter((d) => d.category_id === 3));
  // }, [allContacts]);
  const onSearch = (searchTerm) => {
    console.log(allContacts.data.filter((d) => d.category_id === 3));
    const filteredItems =
      allContacts &&
      allContacts.data.filter(
        (d) =>
          searchTerm.split(' ').every((word) => {
            const lowercaseWord = word.toLowerCase();
            return (
              d.first_name.toLowerCase().includes(lowercaseWord) || d.last_name.toLowerCase().includes(lowercaseWord)
            );
          }) && d.category_id === 3,
      );
    return filteredItems;
  };
  return (
    <Layout>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className={'flex justify-between items-center p-6'}>
            <h3 className={'text-xl leading-7 font-medium'}>Trash</h3>
            <Search
              placeholder="Search"
              className="mr-4 text-sm"
              onInput={(event) => {
                setSearchTerm(event.target.value);
                onSearch(event.target.value);
              }}
            />
          </div>
          <div className="w-auto relative flex" style={{ height: 'calc(100vh - 160px)', overflow: 'hidden' }}>
            <div className={` relative h-full w-full`} style={{ height: '100%', overflow: 'hidden' }}>
              <SimpleBar autoHide style={{ height: '100%', maxHeight: '100%' }}>
                <Table
                  tableFor={'trash'}
                  data={onSearch(searchTerm)}
                  handleCardEdit={(contact) => {
                    setShowEditContact(true);
                    setContactToEdit(contact);
                  }}
                />
              </SimpleBar>
            </div>
          </div>
          {showEditContact && (
            <ReviewContact
              showToast
              client={contactToEdit}
              setClient={setContactToEdit}
              handleClose={() => setShowEditContact(false)}
              title="Edit Professional"
            />
          )}
        </>
      )}
    </Layout>
  );
};

export default index;
