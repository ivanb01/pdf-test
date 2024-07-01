import Text from 'components/shared/text';
import Button from 'components/shared/button';
import Search from 'components/shared/input/search';
import SimpleBar from 'simplebar-react';
import FilterList from '@mui/icons-material/FilterList';
import Add from '@mui/icons-material/Add';
import Column from 'components/column';
import SlideOver from 'components/shared/slideOver';
import { useState, useEffect } from 'react';
import ViewColumn from '@mui/icons-material/ViewColumn';
import TableRows from '@mui/icons-material/TableRows';
import Accordion from 'components/shared/accordion';
import ButtonsSlider from 'components/shared/button/buttonsSlider';
import Table from 'components/shared/table';
import { multiselectOptionsClients, statuses } from 'global/variables';
import { useRouter } from 'next/router';
import { clientStatuses, clientStatusMainTitlesUpdated, filtersForLastCommunicationDate } from 'global/variables';
import { filterLastCommuncationDate, getTotalCountOfAllValues } from 'global/functions';
import { useSelector, useDispatch } from 'react-redux';
import { setClients, setContacts } from 'store/contacts/slice';
import Chip from 'components/shared/chip';
import { TrashIcon } from '@heroicons/react/solid';
import { setClientsFilters } from '@store/global/slice';
import FloatingAlert from '@components/shared/alert/floating-alert';
import { useRef } from 'react';
import SwitchComponent from '@components/Switch';
import ContactsListTable from '@components/shared/table/ContactsListTable';
import SearchContactsTable from '@components/shared/table/SearchContactsTable';

const buttons = [
  {
    id: 0,
    icon: <ViewColumn className="h-5 w-5" />,
  },
  {
    id: 1,
    icon: <TableRows className="h-5 w-5" />,
  },
];

const Clients = ({
  setShowAddContactOverlay,
  onSearch,
  handleCardEdit,
  unapprovedContacts,
  handleViewChange,
  currentButton,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const scrollRef = useRef();
  const clientsFilters = useSelector((state) => state.global.clientsFilters);
  const [filtersCleared, setFiltersCleared] = useState(false);
  const [open, setOpen] = useState(false);
  const openedTab = useSelector((state) => state.global.openedTab);
  const openedSubtab = useSelector((state) => state.global.openedSubtab);
  const contacts = useSelector((state) => state.contacts.allContacts.data);
  const clients = useSelector((state) => state.contacts.clients);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredContacts, setFilteredContacts] = useState(contacts);

  useEffect(() => {
    console.log(contacts, 'contacts');
    setFilteredContacts(contacts);
  }, [contacts, openedSubtab]);

  const tabs = [
    {
      title: 'CLIENT TYPES',
      content: ['Landlord', 'Renter', 'Buyer', 'Seller'],
      value: 'category_2',
    },
    {
      title: 'LAST COMMUNICATION',
      content: Object.keys(filtersForLastCommunicationDate),
      value: 'last_communication_date',
      onlyOneValue: true,
    },
    {
      title: 'ADDED SOURCE',
      content: ['Google Contacts', 'Smart Sync A.I.', 'Manually Added'],
      value: 'import_source_text',
    },
    {
      title: 'CLIENT STATUS',
      content:
        openedSubtab === -1
          ? clientStatuses.flatMap((i) => i.statuses.flatMap((s) => s.name))
          : clientStatuses[openedSubtab].statuses.map((item) => item.name),
      value: 'status_2',
    },
    {
      title: 'CAMPAIGN',
      content: ['In Campaign', 'Not In Campaign'],
      value: 'is_in_campaign',
    },
    {
      title: 'PRIORITY',
      content: multiselectOptionsClients.map((option) => option.label),
      value: 'tags',
    },
  ];
  const campaignFilterMeaning = {
    'In Campaign': 'assigned',
    'Not In Campaign': null,
  };

  function hasAnyProperties(obj) {
    for (let prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        return true;
      }
    }
    return false;
  }

  useEffect(() => {
    if (contacts.length && !hasAnyProperties(clientsFilters)) {
      dispatch(
        setClients(
          contacts.filter(
            (contact) =>
              contact.category_1 == 'Client' &&
              contact.status_1.toLowerCase() === statuses[openedSubtab]?.statusMainTitle.toLowerCase(),
          ),
        ),
      );
    }
  }, [openedSubtab, clientsFilters]);

  const filterContacts = (contactsList) => {
    let contactsState =
      openedSubtab !== -1
        ? contactsList.filter(
            (contact) =>
              contact.category_1 == 'Client' &&
              contact.status_1.toLowerCase() === statuses[openedSubtab]?.statusMainTitle.toLowerCase(),
          )
        : contactsList.filter((contact) => contact.category_1 == 'Client');

    Object.keys(clientsFilters).forEach((key) => {
      if (key === 'last_communication_date') {
        contactsState = contactsState.filter((contact) =>
          filterLastCommuncationDate(contact[key], clientsFilters[key][0], contact.category_1, contact.status_2),
        );
      } else if (key === 'import_source_text' && clientsFilters['import_source_text'] === 'Manually Added') {
        contactsState = contactsState.filter(
          (contact) =>
            contact.import_source_text !== 'Google Contacts' &&
            contact.import_source_text !== 'Smart Sync A.I.' &&
            contact.import_source_text !== 'Gmail',
        );
      } else if (key === 'is_in_campaign') {
        let booleanFilter = clientsFilters[key].map((filter) => campaignFilterMeaning[filter]);
        contactsState = contactsState.filter((contact) => booleanFilter.includes(contact[key]));
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
      }
    });

    setFilteredContacts(contactsState);
    return contactsState;
  };

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

    dispatch(setClientsFilters(filtersCopy));

    if (Object.keys(filtersCopy).length === 0) {
      setFiltersCleared(true);
    }
  };

  const removeFilter = (filterToRemove, filterType) => {
    let filtersCopy = { ...clientsFilters };

    filtersCopy[filterType] = filtersCopy[filterType].filter((element) => element !== filterToRemove);
    if (filtersCopy[filterType].length < 1) {
      delete filtersCopy[filterType];
    }

    dispatch(setClientsFilters(filtersCopy));

    if (Object.keys(filtersCopy).length === 0) {
      setFiltersCleared(true);
    }
  };
  const hideUnapproved = useSelector((state) => state.global.hideUnapproved);

  const sorted = useSelector((state) => state.global.sorted);
  useEffect(() => {
    console.log(contacts, 'contacts');
    let filtered = filterContacts(contacts);
    setFilteredContacts(filtered);
    statuses.forEach((status) =>
      status.statuses.forEach((s) =>
        handleFilteredContacts(s.name, sorted.find((sortedItem) => sortedItem.name === s.name)?.sorted, filtered),
      ),
    );
  }, [clientsFilters, contacts, openedSubtab, hideUnapproved]);

  useEffect(() => {
    setFiltersCleared(true);
    dispatch(setClientsFilters({}));
  }, [openedSubtab]);
  useEffect(() => {
    setSearchTerm('');
  }, [openedSubtab]);
  const handleFilteredContacts = (status, sortOrder, contactsList = filteredContacts) => {
    let filteredClients = contactsList
      .filter((client) => client.status_2 === status)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    dispatch(setContacts([...new Set([...filteredClients, ...contacts])]));
    setFilteredContacts((prevContacts) => {
      const updatedContacts = [...new Set([...filteredClients, ...prevContacts])];
      return updatedContacts;
    });
    return filteredClients;
  };

  useEffect(() => {
    const handleScroll = (event) => {
      if (event.target.scrollLeft > 80 && document.querySelector('.arrow') !== null) {
        document.querySelector('.arrow').style.opacity = '0';
      }
    };

    const scrollElement = scrollRef.current?.getScrollElement();
    scrollElement?.addEventListener('scroll', handleScroll);

    return () => scrollElement?.removeEventListener('scroll', handleScroll);
  }, [openedSubtab]);

  const showUnapprovedToggle = () => {
    console.log(openedSubtab);
    if (openedSubtab == -1) {
      return (
        contacts.filter(
          (contact) =>
            ['GmailAI', 'Smart Sync A.I.', 'Gmail'].includes(contact.import_source_text) &&
            !contact.approved_ai &&
            contact.category_1 == 'Client',
        ).length > 0
      );
    } else {
      return (
        contacts.filter(
          (contact) =>
            ['GmailAI', 'Smart Sync A.I.', 'Gmail'].includes(contact.import_source_text) &&
            !contact.approved_ai &&
            contact.category_1 == 'Client' &&
            contact.status_1.toLowerCase() == clientStatuses[openedSubtab].statusMainTitle.toLowerCase(),
        ).length > 0
      );
    }
  };

  const getCount = () => {
    if (hideUnapproved) {
      return (
        filteredContacts.length -
        filteredContacts.filter(
          (contact) =>
            ['GmailAI', 'Smart Sync A.I.', 'Gmail'].includes(contact.import_source_text) &&
            contact.approved_ai !== true &&
            contact.category_1 === 'Client',
        ).length
      );
    } else {
      return filteredContacts.length;
    }
  };
  return (
    <>
      <div className="absolute left-0 top-0 right-0 bottom-0 flex flex-col">
        <FloatingAlert
          inProp={unapprovedContacts.length > 0}
          onClick={() => router.push('/ai-summary')}
          buttonText={'Review Now'}
          className="mx-[21px] mt-[14px]"
          message={`${unapprovedContacts.length} New Smart Synced contacts were imported from Gmail and need to be reviewed.`}
        />
        <div className="p-6 py-4 flex items-center justify-between">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <Text h3 className="text-gray7 text-xl mr-4">
                {openedSubtab === -1
                  ? 'All Clients'
                  : clientStatusMainTitlesUpdated[clientStatuses[openedSubtab].statusMainTitle]}
              </Text>
              {showUnapprovedToggle() && <SwitchComponent label="Unapproved AI Contacts" />}
            </div>
            <div className="flex items-center justify-self-end">
              <Search
                placeholder={`Search ${
                  openedSubtab !== -1
                    ? clientStatusMainTitlesUpdated[clientStatuses[openedSubtab]?.statusMainTitle]?.toLowerCase()
                    : 'Clients'
                }`}
                className="mr-4 text-sm"
                value={searchTerm}
                onInput={(event) => setSearchTerm(event.target.value)}
              />
              <Button
                secondary
                leftIcon={
                  <div className={'relative'}>
                    {Object.keys(clientsFilters).length > 0 && (
                      <div
                        className={
                          'absolute flex items-center justify-center top-[-14px] left-[63px] border-2 border-lightBlue1 bg-lightBlue3 h-[20px] w-[20px] rounded-xl text-xs text-white'
                        }>
                        {getTotalCountOfAllValues(clientsFilters)}
                      </div>
                    )}
                    <FilterList className="w-5 h-5" />
                  </div>
                }
                label="Filter"
                className="mr-4"
                onClick={() => setOpen(true)}
                iconSize="w-5 h-5"
              />
              <ButtonsSlider
                noCount
                buttons={buttons}
                currentButton={currentButton}
                onClick={handleViewChange}
                className="mr-4"
              />
              <Button
                primary
                leftIcon={<Add className="w-5 h-5" />}
                iconSize="w-5 h-5"
                label="Add Client"
                onClick={setShowAddContactOverlay}
              />
            </div>
          </div>
        </div>
        {Object.keys(clientsFilters).length > 0 && (
          <div className="w-full border-t border-gray2 px-6 py-3">
            <div className="flex justify-between">
              <div className="flex flex-wrap items-center w-[100%] gap-[2px]">
                <div className="mr-2 text-gray5 text-sm ">
                  {getCount()}
                  {getCount() == 1 ? ' result' : ' results'} for:
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
                  setFiltersCleared(true);
                  dispatch(setClientsFilters({}));
                }}>
                <TrashIcon height={20} className="text-gray3 mr-1" />
                <Text p className="whitespace-nowrap">
                  Clear Filter
                </Text>
              </div>
            </div>
          </div>
        )}
        {currentButton == 0 ? (
          <SimpleBar
            autoHide
            ref={scrollRef}
            style={{
              maxWidth: '100%',
              height:
                Object.values(clientsFilters).flat().length > 0 && unapprovedContacts?.length > 0
                  ? 'calc(100vh - 276px)'
                  : Object.values(clientsFilters).flat().length > 0 && unapprovedContacts?.length === undefined
                    ? 'calc(100vh - 203px)'
                    : Object.values(clientsFilters).flat().length === 0 && unapprovedContacts.length > 0
                      ? 'calc(100vh - 223px)'
                      : 'calc(100vh - 155px)',
              background: '#f9fafb',
            }}>
            <div className="flex flex-row bg-gray10 w-fit h-full board-view">
              {openedSubtab === -1
                ? clientStatuses.map((item) => {
                    return item.statuses.map((status, index) => {
                      return (
                        <Column
                          handleFilteredContacts={handleFilteredContacts}
                          contacts={filteredContacts}
                          key={index}
                          status={status}
                          categoryType="clients"
                          handleCardEdit={handleCardEdit}
                          searchTerm={searchTerm}
                        />
                      );
                    });
                  })
                : clientStatuses[openedSubtab]?.statuses.map((status, index) => (
                    <Column
                      handleFilteredContacts={handleFilteredContacts}
                      contacts={filteredContacts}
                      key={index}
                      status={status}
                      categoryType="clients"
                      handleCardEdit={handleCardEdit}
                      searchTerm={searchTerm}
                    />
                  ))}
            </div>
          </SimpleBar>
        ) : (
          <div className="w-auto relative flex" style={{ height: 'calc(100vh - 160px)' }}>
            <div className={`border border-gray-200 overflow-hidden relative h-full w-full`}>
              <SimpleBar autoHide style={{ height: '100%', maxHeight: '100%' }}>
                <div className={!searchTerm.length && 'hidden'}>
                  <SearchContactsTable
                    handleFilteredContacts={handleFilteredContacts}
                    contacts={filteredContacts}
                    tableFor="contactsList"
                    categoryType="clients"
                    handleCardEdit={handleCardEdit}
                    searchTerm={searchTerm}
                  />
                </div>
                <div className={searchTerm.length && 'hidden'}>
                  <ContactsListTable
                    handleFilteredContacts={handleFilteredContacts}
                    contacts={filteredContacts}
                    tableFor="contactsList"
                    categoryType="clients"
                    handleCardEdit={handleCardEdit}
                    searchTerm={searchTerm}
                  />
                </div>
              </SimpleBar>
            </div>
          </div>
        )}
      </div>
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
                setFiltersCleared(true);
                dispatch(setClientsFilters({}));
              }}
            />
            {/* <Button
              onClick={filterContacts}
              primary
              label="See Results"
              disabled={
                !Object.values(filters).flat().length && !filtersCleared
              }
            /> */}
          </>
        }>
        <Accordion tabs={tabs} handleClick={handleFilterClick} activeSelections={clientsFilters} defaultOpen />
      </SlideOver>
    </>
  );
};

export default Clients;
