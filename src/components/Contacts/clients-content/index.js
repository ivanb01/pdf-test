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
import { multiselectOptionsClients, multiselectOptionsProfessionals } from 'global/variables';
import GlobalAlert from 'components/shared/alert/global-alert';
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

const Clients = ({ setShowAddContactOverlay, onSearch, handleCardEdit, unapprovedContacts }) => {
  const dispatch = useDispatch();

  let currentView = localStorage.getItem('currentView') ? localStorage.getItem('currentView') : 0;
  const [filters, setFilters] = useState({});
  const [filtersCleared, setFiltersCleared] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentButton, setCurrentButton] = useState(currentView);
  const openedTab = useSelector((state) => state.global.openedTab);
  const openedSubtab = useSelector((state) => state.global.openedSubtab);
  const contacts = useSelector((state) => state.contacts.allContacts.data);
  const clients = useSelector((state) => state.contacts.clients);
  const [searchTerm, setSearchTerm] = useState('');

  const handleViewChange = (viewId) => {
    setCurrentButton(viewId);
    localStorage.setItem('currentView', viewId);
  };
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
      content: ['Google Contacts', 'Smart Sync A.I.', 'Gmail', 'Manually Added'],
      value: 'import_source_text',
    },
    {
      title: 'CLIENT STATUS',
      content: allStatusesQuickEdit['clients'].map((item) => item.label),
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

  useEffect(() => {
    if (contacts.length) {
      dispatch(setClients(contacts.filter((contact) => contact.category_1 == 'Client')));
    }
  }, [contacts]);

  const filterContacts = () => {
    if (filtersCleared) {
      dispatch(setClients(contacts.filter((contact) => contact.category_1 == 'Client')));
      setFiltersCleared(false);
      return;
    }
    let contactsState = contacts.filter((contact) => contact.category_1 == 'Client');
    Object.keys(filters).map((key) => {
      if (key == 'last_communication_date') {
        contactsState = contactsState.filter((contact) =>
          filterLastCommuncationDate(contact[key], filters[key][0], contact.category_1, contact.status_2),
        );
      } else if (key == 'import_source_text' && filters['import_source_text'] == 'Manually Added') {
        contactsState = contactsState.filter(
          (contact) =>
            contact.import_source_text != 'Google Contacts' &&
            contact.import_source_text != 'Smart Sync A.I.' &&
            contact.import_source_text != 'Gmail',
        );
      } else if (key == 'is_in_campaign') {
        let booleanFilter = filters[key].map((filter) => campaignFilterMeaning[filter]);
        contactsState = contactsState.filter((contact) => booleanFilter.includes(contact[key]));
      } else {
        contactsState = contactsState.filter((contact) => {
          if (Array.isArray(contact[key])) {
            return contact[key].reduce((accumulator, current) => accumulator || filters[key].includes(current), false);
          }
          return filters[key].includes(contact[key]);
        });
      }
    });

    dispatch(setClients(contactsState));
  };

  const handleFilterClick = (selectedFilter, filterType, isOnlyOneFilter) => () => {
    let filtersCopy = { ...filters };
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
    setFilters(filtersCopy);

    if (Object.keys(filtersCopy).length === 0) {
      setFiltersCleared(true);
    }
  };

  const removeFilter = (filterToRemove, filterType) => {
    let filtersCopy = { ...filters };

    filtersCopy[filterType] = filtersCopy[filterType].filter((element) => element !== filterToRemove);
    if (filtersCopy[filterType].length < 1) {
      delete filtersCopy[filterType];
    }

    // console.log('filters', filtersCopy)
    setFilters(filtersCopy);

    if (Object.keys(filtersCopy).length === 0) {
      setFiltersCleared(true);
    }
  };

  const getFilterCount = () => {
    return clients.filter(
      (contact) =>
        contact.category_1 == 'Client' &&
        contact?.status_1.toLowerCase() === clientStatuses[openedSubtab].statusMainTitle.toLowerCase(),
    ).length;
  };

  useEffect(() => {
    filterContacts();
  }, [filters]);
  useEffect(() => {
    setSearchTerm('');
  }, [openedSubtab]);

  // const handleFilteredContacts = (filteredContacts) => {
  //   dispatch(
  //     setClients((prevState) => {
  //       // Merge the new filteredContacts with the existing ones
  //       const mergedContacts = [...prevState, ...filteredContacts];
  //
  //       // Sort the merged array
  //       mergedContacts.sort((a, b) => a.name.localeCompare(b.name));
  //
  //       return mergedContacts;
  //     }),
  //   );
  // };

  const handleFilteredContacts = (status, sortOrder) => {
    let filteredClients = clients.filter((client) => client.status_2 === status);

    filteredClients.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.first_name.localeCompare(b.first_name);
      } else if (sortOrder === 'desc') {
        return b.first_name.localeCompare(a.first_name);
      }
    });

    dispatch(setClients([...new Set([...filteredClients, ...clients])]));
    return filteredClients;
  };

  return (
    <>
      <div className="absolute left-0 top-0 right-0 bottom-0 flex flex-col">
        {unapprovedContacts > 0 && (
          <GlobalAlert
            message={`${unapprovedContacts} New Smart Synced Contacts need to be reviewed. Please review and make any change before you start the communication.`}
            type="smart-sync"
          />
        )}
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center justify-between w-full">
            <Text h3 className="text-gray7 text-xl">
              {clientStatusMainTitlesUpdated[clientStatuses[openedSubtab].statusMainTitle]}
              {/* {openedTab} - {openedSubtab} */}
            </Text>
            <div className="flex items-center justify-self-end">
              <Search
                placeholder="Search"
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
        {Object.keys(filters).length > 0 && (
          <div className="w-full border-t border-gray2 px-6 py-3">
            <div className="flex justify-between">
              <div className="flex flex-wrap items-center w-[100%]">
                <div className="mr-2 text-gray5 text-sm ">
                  {getFilterCount()}
                  {getFilterCount() ? ' result' : ' results'} for:
                </div>
                {Object.keys(filters).map((key, index) =>
                  filters[key].map((filter, i) => (
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
                  setFilters({});
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
            style={{
              maxWidth: '100%',
              height: '100%',
              background: '#f9fafb',
            }}>
            <div className="flex flex-row bg-gray10 w-fit h-full board-view">
              {clientStatuses[openedSubtab]?.statuses.map((status, index) => (
                <>
                  <Column
                    handleFilteredContacts={handleFilteredContacts}
                    key={index}
                    status={status}
                    categoryType="clients"
                    handleCardEdit={handleCardEdit}
                    searchTerm={searchTerm}
                  />
                </>
              ))}
            </div>
          </SimpleBar>
        ) : (
          <div className="w-auto relative flex" style={{ height: 'calc(100vh - 170px)' }}>
            <div className={`border border-gray-200 overflow-hidden relative h-full w-full`}>
              <SimpleBar autoHide style={{ height: '100%', maxHeight: '100%' }}>
                <Table
                  handleFilteredContacts={handleFilteredContacts}
                  tableFor="contactsList"
                  categoryType="clients"
                  handleCardEdit={handleCardEdit}
                  searchTerm={searchTerm}
                />
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
            {Object.values(filters).flat().length > 0 && (
              <Button
                white
                label="Clear Filter"
                onClick={() => {
                  setFiltersCleared(true);
                  setFilters({});
                }}
              />
            )}
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
        <Accordion tabs={tabs} handleClick={handleFilterClick} activeSelections={filters} defaultOpen />
      </SlideOver>
    </>
  );
};

export default Clients;
