import Layout from 'components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Loader from '@components/shared/loader';
import { bulkUpdateContacts, getContacts } from '@api/contacts';
import { setAllContacts } from '@store/contacts/slice';
import Search from '@components/shared/input/search';
import SimpleBar from 'simplebar-react';
import Table from '@components/shared/table';

import { setOpenedTab } from 'store/global/slice';
import GlobalAlert from '@components/shared/alert/global-alert';
import { healthLastCommunicationDate } from '@global/variables';
import { isHealthyCommuncationDate } from '@global/functions';
import AddActivity from '@components/overlays/add-activity';
const index = () => {
  const dispatch = useDispatch();
  const allContacts = useSelector((state) => state.contacts.allContacts);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditContact, setShowEditContact] = useState(false);
  const [addActivityPopup, setAddActivityPopup] = useState(false);
  const unapprovedContacts = useSelector((state) => state.global.unapprovedContacts);

  useEffect(() => {
    dispatch(setOpenedTab(2));
  }, []);

  const getNeedToCommunicateContacts = () => {
    return allContacts.data.filter((contact) => {
      const categoryType = contact?.category_1?.toLowerCase() + 's';
      if (categoryType !== 'clients') {
        return false;
      }
      let isHealthyCommunication = isHealthyCommuncationDate(contact.last_communication_date);
      return (
        (contact.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.last_name.toLowerCase().includes(searchTerm.toLowerCase())) &&
        !isHealthyCommunication
      );
    });
  };

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
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (allContacts.data !== undefined) {
      console.log(getNeedToCommunicateContacts());
      console.log(allContacts.data.length);
    }
  }, [allContacts]);

  const unapprovedContactsLength = unapprovedContacts?.data.filter(
    (contact) => contact.category_1 != 'Uncategorized',
  ).length;

  return (
    <Layout>
      {loading ? (
        <Loader />
      ) : (
        <>
          {unapprovedContactsLength > 0 && (
            <GlobalAlert
              message={`${unapprovedContactsLength} New Smart Synced Contacts need to be reviewed. Please review and make any change before you start the communication.`}
              type="smart-sync"
            />
          )}
          <div className={'flex justify-between items-center p-6'}>
            <h3 className={'text-xl leading-7 font-medium'}>Contacts that you need to communicate</h3>
            <Search
              placeholder="Search here..."
              className="mr-4 text-sm"
              onInput={(event) => {
                setSearchTerm(event.target.value);
              }}
            />
          </div>
          <div
            className="w-auto relative flex"
            style={{ height: `calc(100vh - ${unapprovedContactsLength > 0 ? '220px' : '160px'})`, overflow: 'hidden' }}>
            <div className={` relative h-full w-full`} style={{ height: '100%', overflow: 'hidden' }}>
              <SimpleBar autoHide style={{ height: '100%', maxHeight: '100%' }}>
                <Table
                  tableFor={'needToContact'}
                  data={getNeedToCommunicateContacts()}
                  handleCardEdit={(contact) => {
                    setShowEditContact(contact);
                    setAddActivityPopup(true);
                  }}
                />
              </SimpleBar>
            </div>
          </div>
          {addActivityPopup && (
            <AddActivity
              clientId={showEditContact.id}
              className="min-w-[550px]"
              title={`Add Activity`}
              setAddActivityPopup={setAddActivityPopup}
              handleClose={() => setAddActivityPopup(false)}
            />
          )}
        </>
      )}
    </Layout>
  );
};

export default index;
