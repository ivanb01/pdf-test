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
import { multiselectOptionsClients, multiselectOptionsProfessionals, statuses } from 'global/variables';
import GlobalAlert from 'components/shared/alert/global-alert';
import { useRouter } from 'next/router';
import {
  clientStatuses,
  clientStatusMainTitlesUpdated,
  allStatusesQuickEdit,
  filtersForLastCommunicationDate,
} from 'global/variables';
import { filterLastCommuncationDate } from 'global/functions';
import { useSelector, useDispatch } from 'react-redux';
import { setClients, setContacts } from 'store/contacts/slice';
import Chip from 'components/shared/chip';
import { TrashIcon } from '@heroicons/react/solid';
import { setClientsFilters, setOpenedSubtab } from '@store/global/slice';
import { ArrowRight } from '@mui/icons-material';
import FloatingAlert from '@components/shared/alert/floating-alert';
import { useRef } from 'react';
import Switch from '@components/Switch';
import SwitchComponent from '@components/Switch';

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
          ? clientStatuses.map((i) => i.statuses.map((s) => s.name))
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

  const filterContacts = () => {
    // if (filtersCleared && hasAnyProperties(clientsFilters)) {
    //   dispatch(
    //     setClients(
    //       contacts.filter(
    //         (contact) =>
    //           contact.category_1 == 'Client' &&
    //           contact.status_1.toLowerCase() === statuses[openedSubtab]?.statusMainTitle.toLowerCase(),
    //       ),
    //     ),
    //   );
    //   setFiltersCleared(false);
    //   return;
    // }
    let contactsState = contacts.filter(
      (contact) =>
        contact.category_1 == 'Client' &&
        contact.status_1.toLowerCase() === statuses[openedSubtab]?.statusMainTitle.toLowerCase(),
    );
    Object.keys(clientsFilters).map((key) => {
      if (key == 'last_communication_date') {
        contactsState = contactsState.filter((contact) =>
          filterLastCommuncationDate(contact[key], clientsFilters[key][0], contact.category_1, contact.status_2),
        );
      } else if (key == 'import_source_text' && clientsFilters['import_source_text'] == 'Manually Added') {
        contactsState = contactsState.filter(
          (contact) =>
            contact.import_source_text != 'Google Contacts' &&
            contact.import_source_text != 'Smart Sync A.I.' &&
            contact.import_source_text != 'Gmail',
        );
      } else if (key == 'is_in_campaign') {
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

    // console.log('filters', filtersCopy)
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

  const getFilterCount = () => {
    return filteredContacts.filter(
      (contact) =>
        contact.category_1 == 'Client' &&
        contact?.status_1.toLowerCase() === clientStatuses[openedSubtab].statusMainTitle.toLowerCase(),
    ).length;
  };

  useEffect(() => {
    // filterContacts();
  }, [clientsFilters, contacts, openedSubtab]);
  useEffect(() => {
    setSearchTerm('');
  }, [openedSubtab]);
  const handleFilteredContacts = (status, sortOrder) => {
    let filteredClients = contacts.filter((client) => client.status_2 === status);

    filteredClients.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.first_name.localeCompare(b.first_name);
      } else if (sortOrder === 'desc') {
        return b.first_name.localeCompare(a.first_name);
      }
    });

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

    // return () => scrollElement?.removeEventListener('scroll', handleScroll);
  }, [openedSubtab]);

  return (
    <>
      <div className="absolute left-0 top-0 right-0 bottom-0 flex flex-col">
        <FloatingAlert
          inProp={unapprovedContacts > 0}
          onClick={() => router.push('/ai-summary')}
          buttonText={'Review Now'}
          className="mx-[21px] mt-[14px]"
          message={`${unapprovedContacts} New Smart Synced contacts were imported from Gmail and need to be reviewed.`}
        />
        <div className="p-6 py-4 flex items-center justify-between">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <Text h3 className="text-gray7 text-xl mr-4">
                {openedSubtab === -1
                  ? 'Clients'
                  : clientStatusMainTitlesUpdated[clientStatuses[openedSubtab].statusMainTitle]}
              </Text>
              {contacts.filter(
                (contact) =>
                  ['GmailAI', 'Smart Sync A.I.', 'Gmail'].includes(contact.import_source_text) &&
                  !contact.approved_ai &&
                  contact.category_1 == 'Client',
              ).length > 0 && <SwitchComponent label="Unapproved AI Contacts" />}
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
                leftIcon={<FilterList className="w-5 h-5" />}
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
              height: '100%',
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
          <div className="w-auto relative flex" style={{ height: 'calc(100vh - 170px)' }}>
            <div className={`border border-gray-200 overflow-hidden relative h-full w-full`}>
              {/*<SimpleBar autoHide style={{ height: '100%', maxHeight: '100%' }}>*/}
              <Table
                handleFilteredContacts={handleFilteredContacts}
                contacts={filteredContacts}
                tableFor="contactsList"
                categoryType="clients"
                handleCardEdit={handleCardEdit}
                searchTerm={searchTerm}
              />
              {/*</SimpleBar>*/}
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
