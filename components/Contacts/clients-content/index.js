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
import GlobalAlert from 'components/shared/alert/global-alert';
import { clientStatuses } from 'global/variables';
import { useSelector, useDispatch } from 'react-redux';
import { updateContacts } from 'store/contacts/slice';
import Chip from 'components/shared/chip';

const Clients = ({ setShowAddContactOverlay, onSearch, handleCardEdit }) => {
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState();
  const [uncategorizedContacts, setUncategorizedContacts] = useState([
    {
      tenant: 'Oxford',
      email: 'blendk@outlook.com',
      first_name: 'Blendar',
      last_name: 'Kabashi',
      phone_number: '049487720',
      type: null,
      status: null,
      active: 0,
      note: 'Test Note',
      created_at: '2022-05-18 15:00:00',
      modified_at: '2022-05-18 15:00:00',
      last_communication: '2022-05-18 15:00:00',
      next_communication: '2022-06-18 15:00:00',
    },
    {
      tenant: 'Oxford',
      email: 'gentk@outlook.com',
      first_name: 'Gent',
      last_name: 'Kabashi',
      phone_number: '049487720',
      type: null,
      status: null,
      active: 0,
      note: 'Test Note',
      created_at: '2022-05-18 15:00:00',
      modified_at: '2022-05-18 15:00:00',
      last_communication: '2022-05-18 15:00:00',
      next_communication: '2022-06-18 15:00:00',
    },
    {
      tenant: 'Oxford',
      email: 'blendk1@outlook.com',
      first_name: 'Drin',
      last_name: 'Fejzullahu',
      phone_number: '049487720',
      type: null,
      status: null,
      active: 0,
      note: 'Test Note',
      created_at: '2022-05-18 15:00:00',
      modified_at: '2022-05-18 15:00:00',
      last_communication: '2022-05-18 15:00:00',
      next_communication: '2022-06-18 15:00:00',
    },
    {
      tenant: 'Oxford',
      email: 'blendk2@outlook.com',
      first_name: 'Drin',
      last_name: 'Fejzullahu',
      phone_number: '049487720',
      type: null,
      status: null,
      active: 0,
      note: 'Test Note',
      created_at: '2022-05-18 15:00:00',
      modified_at: '2022-05-18 15:00:00',
      last_communication: '2022-05-18 15:00:00',
      next_communication: '2022-06-18 15:00:00',
    },
    {
      tenant: 'Oxford',
      email: 'blendk3@outlook.com',
      first_name: 'Drin',
      last_name: 'Fejzullahu',
      phone_number: '049487720',
      type: null,
      status: null,
      active: 0,
      note: 'Test Note',
      created_at: '2022-05-18 15:00:00',
      modified_at: '2022-05-18 15:00:00',
      last_communication: '2022-05-18 15:00:00',
      next_communication: '2022-06-18 15:00:00',
    },
    {
      tenant: 'Oxford',
      email: 'blendk4@outlook.com',
      first_name: 'Drin',
      last_name: 'Fejzullahu',
      phone_number: '049487720',
      type: null,
      status: null,
      active: 0,
      note: 'Test Note',
      created_at: '2022-05-18 15:00:00',
      modified_at: '2022-05-18 15:00:00',
      last_communication: '2022-05-18 15:00:00',
      next_communication: '2022-06-18 15:00:00',
    },
    {
      tenant: 'Oxford',
      email: 'blendk5@outlook.com',
      first_name: 'Drin',
      last_name: 'Fejzullahu',
      phone_number: '049487720',
      type: null,
      status: null,
      active: 0,
      note: 'Test Note',
      created_at: '2022-05-18 15:00:00',
      modified_at: '2022-05-18 15:00:00',
      last_communication: '2022-05-18 15:00:00',
      next_communication: '2022-06-18 15:00:00',
    },
    {
      tenant: 'Oxford',
      email: 'blendk6@outlook.com',
      first_name: 'Drin',
      last_name: 'Fejzullahu',
      phone_number: '049487720',
      type: null,
      status: null,
      active: 0,
      note: 'Test Note',
      created_at: '2022-05-18 15:00:00',
      modified_at: '2022-05-18 15:00:00',
      last_communication: '2022-05-18 15:00:00',
      next_communication: '2022-06-18 15:00:00',
    },
    {
      tenant: 'Oxford',
      email: 'blendk7@outlook.com',
      first_name: 'Drin',
      last_name: 'Fejzullahu',
      phone_number: '049487720',
      type: null,
      status: null,
      active: 0,
      note: 'Test Note',
      created_at: '2022-05-18 15:00:00',
      modified_at: '2022-05-18 15:00:00',
      last_communication: '2022-05-18 15:00:00',
      next_communication: '2022-06-18 15:00:00',
    },
    {
      tenant: 'Oxford',
      email: 'blendk8@outlook.com',
      first_name: 'Drin',
      last_name: 'Fejzullahu',
      phone_number: '049487720',
      type: null,
      status: null,
      active: 0,
      note: 'Test Note',
      created_at: '2022-05-18 15:00:00',
      modified_at: '2022-05-18 15:00:00',
      last_communication: '2022-05-18 15:00:00',
      next_communication: '2022-06-18 15:00:00',
    },
    {
      tenant: 'Oxford',
      email: 'blendk9@outlook.com',
      first_name: 'Drin',
      last_name: 'Fejzullahu',
      phone_number: '049487720',
      type: null,
      status: null,
      active: 0,
      note: 'Test Note',
      created_at: '2022-05-18 15:00:00',
      modified_at: '2022-05-18 15:00:00',
      last_communication: '2022-05-18 15:00:00',
      next_communication: '2022-06-18 15:00:00',
    },
    {
      tenant: 'Oxford',
      email: 'blendk10@outlook.com',
      first_name: 'Drin',
      last_name: 'Fejzullahu',
      phone_number: '049487720',
      type: null,
      status: null,
      active: 0,
      note: 'Test Note',
      created_at: '2022-05-18 15:00:00',
      modified_at: '2022-05-18 15:00:00',
      last_communication: '2022-05-18 15:00:00',
      next_communication: '2022-06-18 15:00:00',
    },
    {
      tenant: 'Oxford',
      email: 'blendk11@outlook.com',
      first_name: 'Drin',
      last_name: 'Fejzullahu',
      phone_number: '049487720',
      type: null,
      status: null,
      active: 0,
      note: 'Test Note',
      created_at: '2022-05-18 15:00:00',
      modified_at: '2022-05-18 15:00:00',
      last_communication: '2022-05-18 15:00:00',
      next_communication: '2022-06-18 15:00:00',
    },
    {
      tenant: 'Oxford',
      email: 'blendk12@outlook.com',
      first_name: 'Drin',
      last_name: 'Fejzullahu',
      phone_number: '049487720',
      type: null,
      status: null,
      active: 0,
      note: 'Test Note',
      created_at: '2022-05-18 15:00:00',
      modified_at: '2022-05-18 15:00:00',
      last_communication: '2022-05-18 15:00:00',
      next_communication: '2022-06-18 15:00:00',
    },
  ]);

  const [filters, setFilters] = useState({});
  const [hideFilter, setHideFilter] = useState(false);
  const tabs = [
    {
      title: 'CLIENT TYPES',
      content: ['Landlord', 'Renter', 'Buyer', 'Seller'],
      value: 'category_2',
    },
    {
      title: 'LAST COMMUNICATION',
      content: [
        'Up to Date',
        'Today',
        '1 Week ago',
        '2 Weeks ago',
        '1 Month ago',
      ],
      value: 'last_communication_date',
    },
    {
      title: 'CLIENT STATUS',
      content: [
        'New Lead',
        'Attempted Contact',
        'In Communication',
        'Appointment Set',
        'Actively Working',
      ],
      value: 'status_2',
    },
    {
      title: 'CAMPAIGN',
      content: ['Assigned Clients', 'Unassigned Clients'],
      value: 'campaign',
    },
    {
      title: 'TAGS',
      content: ['Tag 1', 'Tag 2', 'Tag 3'],
      value: 'tags',
    },
  ];
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

  const [showFiltersBar, setShowFiltersBar] = useState(false);
  const [filtersArray, setFiltersArray] = useState([]);
  const [filtersCleared, setFiltersCleared] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentButton, setCurrentButton] = useState(0);
  const openedTab = useSelector((state) => state.global.openedTab);
  const openedSubtab = useSelector((state) => state.global.openedSubtab);
  const contacts = useSelector((state) => state.contacts.data.data);
  const [contactsOriginal, setContactsOriginal] = useState([...contacts]);

  // useEffect(() => {
  //   const delayDebounceFn = setTimeout(() => {
  //     onSearch(searchTerm);
  //     // Send Axios request here
  //   }, 2000);

  //   return () => clearTimeout(delayDebounceFn);
  // }, [searchTerm]);
  const filterContacts = () => {
    // filters = category: ['today', 'yesterday'], last_comm: ['tomorrow','etc']
    // contacts = [{last_comm: today}, {last_comm: today}, {last_comm: today}]
    if (filtersCleared) {
      dispatch(updateContacts(contactsOriginal));
      setOpen(false);
      setFiltersCleared(false);
      setFiltersArray([]);
      return;
    }
    let filteredContacts = [];
    Object.keys(filters).map((key) => {
      filteredContacts = contactsOriginal.filter((contact) =>
        filters[key].includes(contact[key])
      );
    });
    dispatch(updateContacts(filteredContacts));
    setFiltersArray([].concat(...Object.values(filters)));
    setShowFiltersBar(true);
    setOpen(false);
  };
  const handleFilterClick = (selectedFilter, category) => () => {
    console.log(selectedFilter, category);
    let filtersCopy = { ...filters };
    if (filtersCopy[category]) {
      if (filtersCopy[category].includes(selectedFilter)) {
        filtersCopy[category] = filtersCopy[category].filter(
          (element) => element != selectedFilter
        );
      } else {
        filtersCopy[category] = [...filtersCopy[category], selectedFilter];
      }
    } else {
      filtersCopy[category] = [selectedFilter];
    }
    setFilters(filtersCopy);
  };

  const removeChip = (valueToRemove) => {
    for (const prop in filters) {
      if (filters.hasOwnProperty(prop)) {
        const propArray = filters[prop];
        const indexToRemove = propArray.indexOf(valueToRemove);

        if (indexToRemove !== -1) {
          // If the value is found, remove it from the array
          propArray.splice(indexToRemove, 1);
        }
      }
    }
    setFiltersCleared(true, () => {
      setFiltersArray(
        filtersArray.filter((filter) => filter !== valueToRemove),
        () => {
          filterContacts();
        }
      );
    });
  };
  return (
    <>
      <div className="absolute left-0 top-0 right-0 bottom-0 flex flex-col">
        {/* <GlobalAlert
          message="You didn’t setup your Google Account yet. For a better experience of the CRM we recommend you to setup your account."
          type="error"
        /> */}
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center justify-between w-full">
            <Text h3 className="text-gray7 text-xl">
              {clientStatuses[openedSubtab].statusMainTitle}
              {/* {openedTab} - {openedSubtab} */}
            </Text>
            <div className="flex items-center justify-self-end">
              <Search
                placeholder="Search"
                className="mr-4 text-sm"
                onInput={(event) => onSearch(event.target.value)}
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
                buttons={buttons}
                currentButton={currentButton}
                onClick={setCurrentButton}
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
        {/* {console.log(filtersArray)} */}
        {showFiltersBar && filtersArray.length > 0 && (
          <div className="w-full border-t border-gray2 px-6 py-3">
            <div className="flex items-center">
              <div className="mr-2">
                {filtersArray.length}{' '}
                {filtersArray.length == 1 ? 'result' : 'results'} for:
              </div>
              {filtersArray.map((filter, index) => (
                <Chip
                  // closable
                  removeChip={removeChip}
                  key={index}
                  active
                  label={filter}
                  className="mr-1"
                />
              ))}
            </div>
          </div>
        )}
        {currentButton == 0 ? (
          <SimpleBar
            autoHide={true}
            style={{
              maxWidth: '100%',
              height: '100%',
              background: '#f9fafb',
            }}
          >
            <div className="flex flex-row bg-gray10 w-fit h-full board-view">
              {clientStatuses[openedSubtab]?.statuses.map((status, index) => (
                <Column
                  key={index}
                  status={status}
                  categoryType="clients"
                  handleCardEdit={handleCardEdit}
                />
              ))}
            </div>
          </SimpleBar>
        ) : (
          <div
            className="w-auto relative flex"
            style={{ height: 'calc(100vh - 160px)' }}
          >
            <div
              className={`border border-gray-200 overflow-hidden relative h-full w-full`}
            >
              <SimpleBar autoHide={true} style={{ maxHeight: '100%' }}>
                <Table tableFor="contactsList" categoryType="clients" handleCardEdit={handleCardEdit}/>
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
            {Object.values(filters).flat().length > 0 ? (
              <Button
                white
                label="Clear Filters"
                onClick={() => {
                  setFiltersCleared(true);
                  setFilters({});
                }}
              />
            ) : (
              <div className="opacity-0"></div>
            )}
            <Button
              onClick={filterContacts}
              primary
              label="See Results"
              disabled={
                !Object.values(filters).flat().length && !filtersCleared
              }
            />
          </>
        }
      >
        <Accordion
          tabs={tabs}
          handleClick={handleFilterClick}
          activeSelections={filters}
          defaultOpen={true}
        />
      </SlideOver>
    </>
  );
};

export default Clients;
