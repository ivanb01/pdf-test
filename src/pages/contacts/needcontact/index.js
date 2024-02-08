import Layout from 'components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Loader from '@components/shared/loader';
import { getContacts } from '@api/contacts';
import { setAllContacts } from '@store/contacts/slice';
import Search from '@components/shared/input/search';
import SimpleBar from 'simplebar-react';
import Table from '@components/shared/table';
import { setClientsFilters, setOpenedTab } from 'store/global/slice';
import { allStatusesQuickEdit, multiselectOptionsClients } from '@global/variables';
import { filterLastCommuncationDate, isHealthyCommuncationDate } from '@global/functions';
import AddActivity from '@components/overlays/add-activity';
import withAuth from '@components/withAuth';
import FloatingAlert from '@components/shared/alert/floating-alert';
import { useRouter } from 'next/router';
import SwitchComponent from '@components/Switch';
import Accordion from '@components/shared/accordion';
import FilterList from '@mui/icons-material/FilterList';
import Button from '@components/shared/button';
import SlideOver from '@components/shared/slideOver';
import Chip from '@components/shared/chip';
import { TrashIcon } from '@heroicons/react/solid';
import Text from '@components/shared/text';
import ReviewContact from '@components/overlays/review-contact';

const index = () => {
  const router = useRouter();

  const dispatch = useDispatch();
  const allContacts = useSelector((state) => state.contacts.allContacts);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditContact, setShowEditContact] = useState(false);
  const [addActivityPopup, setAddActivityPopup] = useState(false);
  const [open, setOpen] = useState(false);
  const [clientsFilters, setClientsFilters] = useState({});
  const [filteredContacts, setFilteredContacts] = useState();
  const contacts_to_be_displayed =
    allContacts &&
    allContacts.data &&
    allContacts.data.filter((contact) => {
      const categoryType = contact.category_1?.toLowerCase() + 's';
      if (categoryType !== 'clients') {
        return false;
      }
      const isHealthyCommunication = isHealthyCommuncationDate(contact.last_communication_date);
      return (
        (contact.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.last_name.toLowerCase().includes(searchTerm.toLowerCase())) &&
        !isHealthyCommunication
      );
    });

  const tabs = [
    {
      title: 'CLIENT TYPES',
      content: ['Landlord', 'Renter', 'Buyer', 'Seller'],
      value: 'category_2',
    },
    {
      title: 'ADDED SOURCE',
      content: ['Google Contacts', 'Smart Sync A.I.', 'Manually Added'],
      value: 'import_source_text',
    },
    {
      title: 'CLIENT STATUS',
      content: allStatusesQuickEdit['clients'].map((item) => item.label),
      value: 'status_2',
    },
    {
      title: 'PRIORITY',
      content: multiselectOptionsClients.map((option) => option.label),
      value: 'tags',
    },
  ];
  const handleFilterClick = (selectedFilter, filterType, isOnlyOneFilter) => () => {
    let filtersCopy = { ...clientsFilters };
    if (filtersCopy[filterType]) {
      if (filtersCopy[filterType].includes(selectedFilter)) {
        filtersCopy[filterType] = filtersCopy[filterType].filter((element) => element !== selectedFilter);
        if (filtersCopy[filterType].length < 1) {
          delete filtersCopy[filterType];
        }
      } else {
        if (isOnlyOneFilter) {
          filtersCopy[filterType] = [selectedFilter];
        } else {
          filtersCopy[filterType] = [...filtersCopy[filterType], selectedFilter];
        }
      }
    } else {
      filtersCopy[filterType] = [selectedFilter];
    }

    setClientsFilters(filtersCopy);
  };

  useEffect(() => {
    dispatch(setOpenedTab(2));
  }, []);

  const getNeedToCommunicateContacts = () => {
    setFilteredContacts(contacts_to_be_displayed);
  };

  const filterContacts = () => {
    let contactsState = contacts_to_be_displayed;
    Object.keys(clientsFilters).map((key) => {
      if (key == 'last_communication_date') {
        contactsState = contactsState.filter((contact) =>
          filterLastCommuncationDate(contact[key], clientsFilters[key][0], contact.category_1, contact.status_2),
        );
        setFilteredContacts(contactsState);
      } else if (key == 'import_source_text' && clientsFilters['import_source_text'] == 'Manually Added') {
        contactsState = contactsState.filter(
          (contact) =>
            contact.import_source_text != 'Google Contacts' &&
            contact.import_source_text != 'Smart Sync A.I.' &&
            contact.import_source_text != 'Gmail',
        );
        setFilteredContacts(contactsState);
      } else if (key == 'is_in_campaign') {
        let booleanFilter = clientsFilters[key].map((filter) => campaignFilterMeaning[filter]);
        contactsState = contactsState.filter((contact) => booleanFilter.includes(contact[key]));
        setFilteredContacts(contactsState);
      } else {
        contactsState = contactsState.filter((contact) => {
          if (Array.isArray(contact[key])) {
            return contact[key].reduce(
              (accumulator, current) => accumulator || clientsFilters[key].includes(current),
              false,
            );
          }
          return clientsFilters[key].includes(contact[key]);
        });
        setFilteredContacts(contactsState);
      }
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
    getNeedToCommunicateContacts();
  }, [allContacts, searchTerm]);
  useEffect(() => {
    filterContacts();
    if (Object.keys(clientsFilters).length === 0) {
      setFilteredContacts(contacts_to_be_displayed);
    }
  }, [clientsFilters, searchTerm]);
  const removeFilter = (filterToRemove, filterType) => {
    let filtersCopy = { ...clientsFilters };

    filtersCopy[filterType] = filtersCopy[filterType].filter((element) => element !== filterToRemove);
    if (filtersCopy[filterType].length < 1) {
      delete filtersCopy[filterType];
    }

    setClientsFilters(filtersCopy);
  };

  const [unapprovedContacts, setUnapprovedContacts] = useState([]);

  useEffect(() => {
    const ai_unapproved = allContacts?.data?.filter(
      (client) =>
        ['GmailAI', 'Smart Sync A.I.', 'Gmail'].includes(client.import_source) &&
        (client.approved_ai === false || client.approved_ai === null) &&
        client.category_1 !== 'Uncategorized',
    );
    setUnapprovedContacts(ai_unapproved);
  }, [allContacts]);

  return (
    <Layout>
      {loading ? (
        <Loader />
      ) : (
        <>
          <FloatingAlert
            inProp={unapprovedContacts?.length > 0}
            onClick={() => router.push('/ai-summary')}
            buttonText={'Review Now'}
            className="mx-[21px] mt-[14px]"
            message={`${unapprovedContacts?.length} New Smart Synced contacts were imported from Gmail and need to be reviewed.`}
            type="smart-sync"
          />
          <div className={'flex justify-between items-center p-6 py-4'}>
            <div className="flex items-center">
              <h3 className={'text-xl leading-7 font-medium mr-4'}>Contacts that you need to communicate with</h3>
              {filteredContacts?.filter(
                (contact) =>
                  ['GmailAI', 'Smart Sync A.I.', 'Gmail'].includes(contact.import_source_text) && !contact.approved_ai,
              ).length > 0 && <SwitchComponent label="Unapproved AI Contacts" />}
            </div>
            <div className={'flex gap-2'}>
              <Button
                secondary
                leftIcon={
                  <div className={'relative'}>
                    {Object.keys(clientsFilters).length > 0 && (
                      <div
                        className={
                          'absolute top-[-14px] left-[63px] border-2 border-lightBlue1 bg-lightBlue3 h-[14px] w-[14px] rounded-xl'
                        }></div>
                    )}
                    <FilterList className="w-5 h-5" />
                  </div>
                }
                label="Filter"
                className="mr-4"
                onClick={() => setOpen(true)}
                iconSize="w-5 h-5"
              />
              <Search
                placeholder="Search here..."
                className="mr-4 text-sm"
                onInput={(event) => {
                  setSearchTerm(event.target.value);
                }}
              />
            </div>
          </div>
          {Object.keys(clientsFilters).length > 0 && (
            <div className="w-full border-t border-gray2 px-6 py-3">
              <div className="flex justify-between">
                <div className="flex flex-wrap items-center w-[100%]">
                  <div className="mr-2 text-gray5 text-sm ">
                    {filteredContacts.length}
                    {filteredContacts.length == 1 ? ' result' : ' results'} for:
                  </div>
                  {Object.keys(clientsFilters).map((key, index) =>
                    clientsFilters[key].map((filter, i) => (
                      <Chip
                        closable
                        removeChip={(filterToRemove) => removeFilter(filterToRemove, key)}
                        key={`${index}${i}`}
                        active
                        label={filter}
                        className="mr-1"
                      />
                    )),
                  )}
                </div>
                <div
                  className="flex flex-row items-center cursor-pointer"
                  onClick={() => {
                    setClientsFilters({});
                  }}>
                  <TrashIcon height={20} className="text-gray3 mr-1" />
                  <Text p className="whitespace-nowrap">
                    Clear Filter
                  </Text>
                </div>
              </div>
            </div>
          )}
          <div
            className="w-auto relative flex"
            style={{
              height: `calc(100vh - ${
                unapprovedContacts.length > 0 || Object.keys(clientsFilters).length > 0
                  ? '300px'
                  : unapprovedContacts.length > 0 && Object.keys(clientsFilters).length > 0
                  ? '210px'
                  : '160px'
              })`,
              overflow: 'hidden',
            }}>
            <div className={` relative h-full w-full`} style={{ height: '100%', overflow: 'hidden' }}>
              <SimpleBar autoHide style={{ height: '100%', maxHeight: '100%' }}>
                <Table
                  tableFor={'needToContact'}
                  data={filteredContacts}
                  handleCardEdit={(contact) => {
                    setShowEditContact(contact);
                    setAddActivityPopup(true);
                  }}
                />
              </SimpleBar>
            </div>
          </div>
          {addActivityPopup && (
            <ReviewContact
              showToast
              client={showEditContact}
              setClient={setShowEditContact}
              handleClose={() => setAddActivityPopup(false)}
              title="Edit Client"
            />
          )}
          <SlideOver
            open={open}
            setOpen={setOpen}
            title="Clients Filters"
            className="top-[70px]"
            buttons={
              <>
                <Button
                  disabled={!Object.values(clientsFilters).flat().length > 0}
                  white
                  label="Clear Filter"
                  onClick={() => {
                    setClientsFilters({});
                  }}
                />
              </>
            }>
            <Accordion tabs={tabs} handleClick={handleFilterClick} activeSelections={clientsFilters} defaultOpen />
          </SlideOver>
        </>
      )}
    </Layout>
  );
};

export default withAuth(index);
