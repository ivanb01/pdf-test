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
import { useState, useEffect } from 'react';
import Accordion from 'components/shared/accordion';
import {
  professionalsStatuses,
  professioonalStatusMainTitlesUpdated,
  allStatusesQuickEdit,
  filtersForLastCommunicationDate,
} from 'global/variables';
import { filterLastCommuncationDate } from 'global/functions';
import { useSelector, useDispatch } from 'react-redux';
import { setProfessionals, updateContacts } from 'store/contacts/slice';
import ButtonsSlider from 'components/shared/button/buttonsSlider';
import Table from 'components/shared/table';
import Chip from 'components/shared/chip';
import { clientStatuses } from 'global/variables';
import { TrashIcon } from '@heroicons/react/solid';
import { multiselectOptionsProfessionals } from 'global/variables';
import GlobalAlert from '@components/shared/alert/global-alert';
import { setProfessionalsFilter } from '@store/global/slice';
import FloatingAlert from '@components/shared/alert/floating-alert';

const tabs = [
  {
    title: 'PROFESSIONAL TYPES',
    content: multiselectOptionsProfessionals.map((option) => option.label),
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
];

const campaignFilterMeaning = {
  'In Campaign': 'assigned',
  'Not In Campaign': null,
};

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

const Professionals = ({ setShowAddContactOverlay, onSearch, handleCardEdit, unapprovedContacts }) => {
  const dispatch = useDispatch();
  const professionalsFilters = useSelector((state) => state.global.professionalsFilters);

  const [filters, setFilters] = useState({});
  const [filtersCleared, setFiltersCleared] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentButton, setCurrentButton] = useState(0);
  const openedTab = useSelector((state) => state.global.openedTab);
  const openedSubtab = useSelector((state) => state.global.openedSubtab);
  const contacts = useSelector((state) => state.contacts.allContacts.data);
  const professionals = useSelector((state) => state.contacts.professionals);
  const [contactsOriginalLength, setContactsOriginalLength] = useState(contacts.length);
  const [searchTerm, setSearchTerm] = useState(' ');
  const [filteredProfessionals, setFilteredProfessionals] = useState(contacts);

  useEffect(() => {
    setFilteredProfessionals(contacts);
  }, [contacts]);

  function hasAnyProperties(obj) {
    for (let prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        return true;
      }
    }
    return false;
  }
  useEffect(() => {
    if (contacts.length && !hasAnyProperties(professionalsFilters)) {
      setFilteredProfessionals(contacts.filter((contact) => contact.category_1 == 'Professional'));
    }
  }, [openedSubtab, professionalsFilters]);

  const filterContacts = () => {
    // if (filtersCleared) {
    //   dispatch(setProfessionals(contacts.filter((contact) => contact.category_1 == 'Professional')));
    //   setFiltersCleared(false);
    //   return;
    // }

    let contactsState = contacts.filter((contact) => contact.category_1 == 'Professional');
    Object.keys(professionalsFilters).map((key) => {
      if (key == 'last_communication_date') {
        contactsState = contactsState.filter((contact) =>
          filterLastCommuncationDate(contact[key], professionalsFilters[key][0], contact.category_1, contact.status_2),
        );
      } else if (key == 'is_in_campaign') {
        let booleanFilter = professionalsFilters[key].map((filter) => campaignFilterMeaning[filter]);
        contactsState = contactsState.filter((contact) => booleanFilter.includes(contact[key]));
      } else if (key == 'import_source_text' && professionalsFilters['import_source_text'] == 'Manually Added') {
        contactsState = contactsState.filter(
          (contact) =>
            contact.import_source_text != 'Google Contacts' &&
            contact.import_source_text != 'Smart Sync A.I.' &&
            contact.import_source_text != 'Gmail',
        );
      } else {
        contactsState = contactsState.filter((contact) => {
          if (Array.isArray(contact[key])) {
            return contact[key].reduce(
              (accumulator, current) => accumulator || professionalsFilters[key].includes(current),
              false,
            );
          }
          return professionalsFilters[key].includes(contact[key]);
        });
      }
    });

    setFilteredProfessionals(contactsState);
  };

  const handleFilterClick = (selectedFilter, filterType, isOnlyOneFilter) => () => {
    let filtersCopy = { ...professionalsFilters };

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
    dispatch(setProfessionalsFilter(filtersCopy));

    if (Object.keys(filtersCopy).length === 0) {
      setFiltersCleared(true);
    }
  };

  const removeFilter = (filterToRemove, filterType) => {
    let filtersCopy = { ...professionalsFilters };

    filtersCopy[filterType] = filtersCopy[filterType].filter((element) => element !== filterToRemove);
    if (filtersCopy[filterType].length < 1) {
      delete filtersCopy[filterType];
    }

    // console.log('filters', filtersCopy)
    dispatch(setProfessionalsFilter(filtersCopy));

    if (Object.keys(filtersCopy).length === 0) {
      setFiltersCleared(true);
    }
  };

  const getFilterCount = () => {
    if (openedSubtab == 1) {
      return filteredProfessionals.filter(
        (contact) => contact.category_id == 12 && contact.category_1 == 'Professional',
      ).length;
    } else if (openedSubtab == 2) {
      return filteredProfessionals.filter((contact) => contact.category_id == 9 && contact.category_1 == 'Professional')
        .length;
    } else {
      return filteredProfessionals.filter(
        (contact) => contact.category_id != 12 && contact.category_id != 9 && contact.category_1 == 'Professional',
      ).length;
    }
  };

  useEffect(() => {
    filterContacts();
  }, [professionalsFilters, openedSubtab]);
  useEffect(() => {
    setSearchTerm('');
  }, [openedSubtab]);

  return (
    <>
      <div className="absolute left-0 top-0 right-0 bottom-0 flex flex-col">
        {unapprovedContacts > 0 && (
          <FloatingAlert
            className="mx-[21px] mt-[14px]"
            message={`${unapprovedContacts} New Smart Synced Contacts need to be reviewed. Please review and make any change before you start the communication.`}
            type="smart-sync"
          />
        )}
        <div className="p-6 py-4 flex items-center justify-between">
          <div className="flex items-center justify-between w-full">
            <Text h3 className="text-gray7 text-xl">
              {professionalsStatuses[openedSubtab]?.statusMainTitle}
            </Text>
            <div className="flex items-center justify-self-end">
              <Search
                placeholder={`Search ` + professionalsStatuses[openedSubtab]?.statusMainTitle.toLowerCase()}
                className="mr-4 text-sm"
                value={searchTerm}
                onInput={(event) => setSearchTerm(event.target.value)}
              />
              <Button
                secondary
                leftIcon={<FilterList className="w-5 h-5" />}
                iconSize="w-5 h-5"
                label="Filter"
                className="mr-4"
                onClick={() => setOpen(true)}
              />
              {/* <ButtonsSlider
                noCount
                buttons={buttons}
                currentButton={currentButton}
                onClick={setCurrentButton}
                className="mr-4"
              /> */}
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
        {Object.keys(professionalsFilters).length > 0 && (
          <div className="w-full border-t border-gray2 px-6 py-3">
            <div className="flex justify-between">
              <div className="flex flex-wrap items-center w-[100%]">
                <div className="mr-2 text-gray5 text-sm ">
                  {getFilterCount()}
                  {getFilterCount() == 1 ? ' result' : ' results'} for:
                </div>
                {Object.keys(professionalsFilters).map((key, index) =>
                  professionalsFilters[key].map((filter, i) => (
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
                  dispatch(setProfessionalsFilter({}));
                }}>
                <TrashIcon height={20} className="text-gray3 mr-1" />
                <Text p className="whitespace-nowrap">
                  Clear Filter
                </Text>
              </div>
            </div>
          </div>
        )}
        {/* // <SimpleBar
          //   autoHide={true}
          //   style={{
          //     maxWidth: '100%',
          //     height: '100%',
          //     background: '#f9fafb',
          //   }}
          // >
          //   <div className="flex flex-row bg-gray10 w-fit h-full">
          //     {professionalsStatuses[openedSubtab]?.statuses.map(
          //       (status, index) => (
          //         <Column
          //           status={status}
          //           key={index}
          //           categoryType="professionals"
          //           handleCardEdit={handleCardEdit}
          //         />
          //       )
          //     )}
          //   </div>
          // </SimpleBar> */}
        <div className="w-auto relative flex" style={{ height: 'calc(100vh - 159px)' }}>
          <div className={`border border-gray-200 overflow-hidden relative h-full w-full`}>
            <SimpleBar autoHide style={{ height: '100%', maxHeight: '100%' }}>
              <Table
                data={filteredProfessionals}
                tableFor="professionals"
                categoryType="professionals"
                handleCardEdit={handleCardEdit}
                searchTerm={searchTerm}
              />
            </SimpleBar>
          </div>
        </div>
      </div>
      <SlideOver
        open={open}
        setOpen={setOpen}
        title="Professional Filters"
        className="top-[70px]"
        buttons={
          <>
            {Object.values(professionalsFilters).flat().length > 0 && (
              <Button
                white
                label="Clear Filter"
                onClick={() => {
                  setFiltersCleared(true);
                  dispatch(setProfessionalsFilter({}));
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
        <Accordion tabs={tabs} handleClick={handleFilterClick} activeSelections={professionalsFilters} defaultOpen />
      </SlideOver>
    </>
  );
};

export default Professionals;
