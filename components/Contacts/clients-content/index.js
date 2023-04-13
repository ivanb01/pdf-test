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
import { clientStatuses, clientStatusMainTitlesUpdated, allStatusesQuickEdit, filtersForLastCommunicationDate } from 'global/variables';
import { filterLastCommuncationDate } from 'global/functions';
import { useSelector, useDispatch } from 'react-redux';
import { updateContacts } from 'store/contacts/slice';
import Chip from 'components/shared/chip';
import { TrashIcon } from '@heroicons/react/solid';

const tabs = [
  {
    title: 'CLIENT TYPES',
    content: ['Landlord', 'Renter', 'Buyer', 'Seller'],
    value: 'category_2',
  },
  {
    title: 'LAST COMMUNICATION',
    content: Object.keys(filtersForLastCommunicationDate),
    value: 'created_at',
    // value: 'last_communication_date',
    onlyOneValue: true, 
  },
  {
    title: 'CLIENT STATUS',
    content : allStatusesQuickEdit['clients'].map(item=>item.name),
    value: 'status_2',
  },
  {
    title: 'CAMPAIGN',
    content: ['Assigned Clients', 'Unassigned Clients'],
    value: 'campaign',
  },
  {
    title: 'TAGS',
    content: ['tag1', 'tag2', 'tag3'],
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

const Clients = ({ setShowAddContactOverlay, onSearch, handleCardEdit }) => {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({});
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
    if (filtersCleared) {
      dispatch(updateContacts(contactsOriginal));
      setFiltersCleared(false);
      return;
    }

    let contactsState = contactsOriginal;
    Object.keys(filters).map((key) => {
      if(key == 'created_at') {
        contactsState = contactsState.filter((contact) => filterLastCommuncationDate(contact[key], filters[key][0], contact.category_1, contact.status_2));
      } else {
        contactsState = contactsState.filter((contact) => {
          if(Array.isArray(contact[key])) {
            return contact[key].reduce(
                (accumulator, current) => accumulator || filters[key].includes(current),
                false
            )
          } 
          return filters[key].includes(contact[key])
        })
      }
    });

    dispatch(updateContacts(contactsState));
  };

  const handleFilterClick = (selectedFilter, filterType, isOnlyOneFilter) => () => {
    let filtersCopy = { ...filters };

    if (filtersCopy[filterType]) {
      if (filtersCopy[filterType].includes(selectedFilter)) {
        filtersCopy[filterType] = filtersCopy[filterType].filter(element => element !== selectedFilter);
        if(filtersCopy[filterType].length < 1) {
          delete filtersCopy[filterType];
        }
      } else {
        if(isOnlyOneFilter) {
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

    if(Object.keys(filtersCopy).length === 0) {
      setFiltersCleared(true);
    }
  };

  const removeFilter = (filterToRemove, filterType ) => {
    let filtersCopy = { ...filters };

    filtersCopy[filterType] = filtersCopy[filterType].filter(element => element !== filterToRemove);
    if(filtersCopy[filterType].length < 1) {
      delete filtersCopy[filterType];
    }

    // console.log('filters', filtersCopy)
    setFilters(filtersCopy);

    if(Object.keys(filtersCopy).length === 0) {
      setFiltersCleared(true);
    }
  };

  useEffect(()=>{
    filterContacts();
  },[filters])

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
              {clientStatusMainTitlesUpdated[clientStatuses[openedSubtab].statusMainTitle]}
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
                noCount
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
        {Object.keys(filters).length > 0 && (
          <div className="w-full border-t border-gray2 px-6 py-3">
            <div className="flex justify-between">
              <div className="flex flex-wrap items-center w-[100%]">
                <div className="mr-2 text-gray5 text-sm ">
                  {contacts.length}{' '}
                  {contacts.length == 1 ? 'result' : 'results'} for:
                </div>
                {Object.keys(filters).map((key, index) => (
                  filters[key].map((filter, i) => 
                    <Chip
                      closable
                      removeChip={(filterToRemove)=>removeFilter(filterToRemove, key)}
                      key={`${index}${i}`}
                      active
                      label={filter}
                      className="mr-1"
                    />
                  )               
                ))}
                
              </div>
              <div 
                className="flex flex-row items-center cursor-pointer"
                onClick={() => {
                  setFiltersCleared(true);
                  setFilters({});
                }}
              >
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
