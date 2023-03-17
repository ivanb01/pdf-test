import Text from 'components/shared/text';
import Button from 'components/shared/button';
import Search from 'components/shared/input/search';
import SimpleBar from 'simplebar-react';
import FilterList from '@mui/icons-material/FilterList';
import ViewColumn from '@mui/icons-material/ViewColumn';
import TableRows from '@mui/icons-material/TableRows';
import Add from '@mui/icons-material/Add';
import Column from 'components/column';
import SlideOver from 'components/shared/slideOver';
import { useState } from 'react';
import Accordion from 'components/shared/accordion';
import { professionalsStatuses } from 'global/variables';
import { useSelector, useDispatch } from 'react-redux';
import { updateContacts } from 'store/contacts/slice';
import ButtonsSlider from 'components/shared/button/buttonsSlider';
import Table from 'components/shared/table';

const Professionals = ({
  professionalsTypeCards,
  setShowAddContactOverlay,
  onSearch,
}) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({});
  const [hideFilter, setHideFilter] = useState(false);
  const [currentButton, setCurrentButton] = useState(0);
  const [filtersCleared, setFiltersCleared] = useState(false);
  const openedTab = useSelector((state) => state.global.openedTab);
  const openedSubtab = useSelector((state) => state.global.openedSubtab);
  const contacts = useSelector((state) => state.contacts.data.data);
  const [contactsOriginal, setContactsOriginal] = useState([...contacts]);

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
  const tabs = [
    {
      title: 'PROFESSIONAL TYPES',
      content: ['Vendor', 'Agent', 'Other'],
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
        'No Relationship',
        'Loose Relationship',
        'Strong Relationship',
        'Dropped',
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

  const filterContacts = () => {
    if (filtersCleared) {
      console.log('filters cleared');
      dispatch(updateContacts(contactsOriginal));
      setOpen(false);
      return;
    }
    let filteredContacts = [];
    Object.keys(filters).map((key) => {
      filteredContacts = contactsOriginal.filter((contact) =>
        filters[key].includes(contact[key])
      );
    });
    dispatch(updateContacts(filteredContacts));
    setOpen(false);
  };
  const handleFilterClick = (selectedFilter, category) => () => {
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
  return (
    <>
      <div className="absolute left-0 top-0 right-0 bottom-0 flex flex-col">
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center justify-between w-full">
            <Text h3 className="text-gray7 text-xl">
              {professionalsStatuses[openedSubtab].statusMainTitle}
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
                iconSize="w-5 h-5"
                label="Filter"
                className="mr-4"
                onClick={() => setOpen(true)}
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
                label="Add Professional"
                onClick={setShowAddContactOverlay}
              />
            </div>
          </div>
        </div>
        {currentButton == 0 ? (
          <SimpleBar
            autoHide={true}
            style={{
              maxWidth: '100%',
              height: '100%',
              background: '#f9fafb',
            }}
          >
            <div className="flex flex-row bg-gray10 w-fit h-full">
              {professionalsStatuses[openedSubtab]?.statuses.map(
                (status, index) => (
                  <Column
                    status={status}
                    key={index}
                    categoryType="professionals"
                  />
                )
              )}
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
                <Table tableFor="contactsList" />
              </SimpleBar>
            </div>
          </div>
        )}
      </div>
      <SlideOver
        open={open}
        setOpen={setOpen}
        title="Professionals Filters"
        className="top-[70px]"
        buttons={
          <>
            <Button
              white
              label="Clear Filters"
              onClick={() => {
                setFiltersCleared(true);
                setFilters({});
              }}
            />
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

export default Professionals;
