import Layout from '@components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setOpenedTab } from '@store/global/slice';
import FloatingAlert from '@components/shared/alert/floating-alert';
import SwitchComponent from '@components/Switch';
import Button from '@components/shared/button';
import { getTotalCountOfAllValues } from '@global/functions';
import FilterList from '@mui/icons-material/FilterList';
import Search from '@components/shared/input/search';
import Chip from '@components/shared/chip';
import { TrashIcon } from '@heroicons/react/solid';
import Text from '@components/shared/text';
import SimpleBar from 'simplebar-react';
import ReviewContact from '@components/overlays/review-contact';
import SlideOver from '@components/shared/slideOver';
import Accordion from '@components/shared/accordion';
import { useRouter } from 'next/router';
import AllContactsTable from '@components/shared/table/AllContactsTable';
import Loader from '@components/shared/loader';
import { getContacts, getContactsPaginated } from '@api/contacts';
import { setAllContacts } from '@store/contacts/slice';
import { useQuery } from '@tanstack/react-query';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { debounce } from '@mui/material';
import DropdownWithSearch from '@components/dropdownWithSearch';

const AllContacts = () => {
  const dispatch = useDispatch();
  const hideUnapproved = useSelector((state) => state.global.hideUnapproved);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(null);
  const [showEditContact, setShowEditContact] = useState(false);
  const [addActivityPopup, setAddActivityPopup] = useState(false);
  const [open, setOpen] = useState(false);
  const [clientsFilters, setClientsFilters] = useState({});
  const [filteredContacts, setFilteredContacts] = useState();
  const [unapprovedContacts, setUnapprovedContacts] = useState([]);
  const [initialLoadDone, setInitialLoadDone] = useState(false);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(20);
  const [contacts, setContacts] = useState([]);
  const allContacts = useSelector((state) => state.contacts.allContacts.data);
  const [categoryNames, setCategoryNames] = useState([]);

  const { isFetching, isLoading, isError, error, data, isPreviousData } = useQuery({
    queryKey: ['clients', offset, searchTerm, categoryNames],
    queryFn: async () => {
      const data = await getContactsPaginated(offset, limit, searchTerm, null, categoryNames);
      if (offset >= 20) {
        console.log('adding', data.data.data);
        setContacts((prev) => [...prev, ...data.data.data]);
      } else {
        console.log('setting', data.data.data);
        setContacts(data.data.data);
      }
      setInitialLoadDone(true);
      return data.data;
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const handleSearch = (value) => {
    setOffset(0);
    setSearchTerm(value);
  };

  const debouncedOnChange = debounce(handleSearch, 500);

  const loadMore = () => {
    setOffset(offset + 20);
  };

  const [infiniteRef] = useInfiniteScroll({
    hasNextPage: true,
    loading: isFetching,
    onLoadMore: loadMore,
    disabled: !!error,
  });

  const router = useRouter();

  useEffect(() => {
    const ai_unapproved = allContacts?.filter(
      (client) =>
        ['GmailAI', 'Smart Sync A.I.', 'Gmail'].includes(client.import_source) &&
        (client.approved_ai === false || client.approved_ai === null),
    );
    setUnapprovedContacts(ai_unapproved);
  }, [allContacts]);

  useEffect(() => {
    console.log(contacts);
  }, [contacts]);

  useEffect(() => {
    dispatch(setOpenedTab(-1));
  }, []);
  // useEffect(() => {
  //   if (allContacts.data === undefined) {
  //     getContacts('1,2,3,4,5,6,7,8,9,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27')
  //       .then((data) => {
  //         dispatch(setAllContacts(data.data));
  //       })
  //       .finally(() => {
  //         setLoading(false);
  //       });
  //   }

  //   if (allContacts.data !== undefined) {
  //     setLoading(false);
  //   }
  // }, []);
  // const filterContacts = () => {
  //   console.log(clientsFilters);
  //   let contactsState = allContacts.data;
  //   Object.keys(clientsFilters).forEach((key) => {
  //     if (clientsFilters[key].includes('Other')) {
  //       contactsState = contactsState.filter((contact) => {
  //         if (Array.isArray(contact[key])) {
  //           return contact[key].some((current) => {
  //             clientsFilters[key].includes(current) || current.category_2.includes('Unknown');
  //           });
  //         }

  //         return clientsFilters[key].includes(contact[key]) || contact.category_2.includes('Unknown');
  //       });
  //     } else if (clientsFilters[key].includes('Uncategorized')) {
  //       contactsState = contactsState.filter((contact) => {
  //         if (Array.isArray(contact[key])) {
  //           return contact[key].some((current) => {
  //             clientsFilters[key].includes(current) || current.category_2.includes('Unknown');
  //           });
  //         }

  //         return clientsFilters[key].includes(contact[key]) && !contact.category_2.includes('Unknown');
  //       });
  //     } else {
  //       contactsState = contactsState.filter((contact) => {
  //         if (Array.isArray(contact[key])) {
  //           return contact[key].some((current) => clientsFilters[key].includes(current));
  //         }
  //         return clientsFilters[key].includes(contact[key]);
  //       });
  //     }

  //     setFilteredContacts(contactsState);
  //   });
  // };

  // useEffect(() => {
  //   if (allContacts?.data?.length === 0) {
  //     return;
  //   }
  //   filterContacts();
  //   if (Object.keys(clientsFilters).length === 0) {
  //     setFilteredContacts(allContacts?.data?.filter((c) => c.category_1 !== 'Trash'));
  //   }
  // }, [clientsFilters, searchTerm, allContacts]);
  // const handleFilterClick = (selectedFilter, filterType, isOnlyOneFilter) => () => {
  //   let filtersCopy = { ...clientsFilters };
  //   if (filtersCopy[filterType]) {
  //     if (filtersCopy[filterType].includes(selectedFilter)) {
  //       filtersCopy[filterType] = filtersCopy[filterType].filter((element) => element !== selectedFilter);
  //       if (filtersCopy[filterType].length < 1) {
  //         delete filtersCopy[filterType];
  //       }
  //     } else {
  //       if (isOnlyOneFilter) {
  //         filtersCopy[filterType] = [selectedFilter];
  //       } else {
  //         filtersCopy[filterType] = [...filtersCopy[filterType], selectedFilter];
  //       }
  //     }
  //   } else {
  //     filtersCopy[filterType] = [selectedFilter];
  //   }
  //   setClientsFilters(filtersCopy);
  // };

  // useEffect(() => {
  //   if (searchTerm.length > 0) {
  //     const filterBySearchTerm = filteredContacts.filter(
  //       (contact) =>
  //         contact.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //         contact.last_name.toLowerCase().includes(searchTerm.toLowerCase()),
  //     );
  //     setFilteredContacts(filterBySearchTerm);
  //   }
  // }, [searchTerm]);
  const getCount = () => {
    if (hideUnapproved) {
      return (
        filteredContacts?.length -
        filteredContacts?.filter(
          (contact) =>
            ['GmailAI', 'Smart Sync A.I.', 'Gmail'].includes(contact.import_source_text) &&
            contact.approved_ai !== true &&
            clientsFilters?.category_1?.includes(contact?.category_1),
        ).length
      );
    } else {
      return filteredContacts?.length;
    }
  };
  const tabs = [
    {
      title: 'CATEGORY',
      content: ['Client', 'Professional', 'Uncategorized', 'Other'],
      value: 'category_1',
    },
  ];
  const removeFilter = (filterToRemove, filterType) => {
    let filtersCopy = { ...clientsFilters };

    filtersCopy[filterType] = filtersCopy[filterType].filter((element) => element !== filterToRemove);
    if (filtersCopy[filterType].length < 1) {
      delete filtersCopy[filterType];
    }

    setClientsFilters(filtersCopy);
  };

  return (
    <Layout>
      {false ? (
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
              <h3 className={'text-xl leading-7 font-medium mr-4'}>All Contacts</h3>
              {allContacts?.filter(
                (contact) =>
                  ['GmailAI', 'Smart Sync A.I.', 'Gmail'].includes(contact.import_source_text) && !contact.approved_ai,
              ).length > 0 && <SwitchComponent label="Unapproved AI Contacts" />}
            </div>
            <div className={'flex gap-2'}>
              <DropdownWithSearch
                placeholder="Filter..."
                className="min-w-[250px]"
                maxMenuHeight={200}
                isMulti
                options={[
                  { value: 'Client', label: 'Clients' },
                  { value: 'Professional', label: 'Professionals' },
                  { value: 'Other', label: 'Other' },
                  { value: 'Uncategorized', label: 'Uncategorized' },
                  { value: 'Trash', label: 'Trash' },
                ]}
                onChange={(choices) => {
                  setCategoryNames(choices.map((item) => item.value).join(','));
                  setOffset(0);
                }}
              />
              <Search
                placeholder="Search here..."
                className="mr-4 text-sm"
                onChange={(event) => {
                  debouncedOnChange(event.target.value);
                }}
              />
            </div> */}
          </div>
          {/* {Object.keys(clientsFilters).length > 0 && (
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
                    setClientsFilters({});
                  }}>
                  <TrashIcon height={20} className="text-gray3 mr-1" />
                  <Text p className="whitespace-nowrap">
                    Clear Filter
                  </Text>
                </div>
              </div>
            </div>
          )} */}
          <div
            className="w-auto relative flex"
            style={{
              height: `calc(100vh - ${
                unapprovedContacts?.length > 0 || Object.keys(clientsFilters).length > 0 ? '206px' : '129px'
              })`,
              overflow: 'hidden',
            }}>
            <div className={` relative h-full w-full`} style={{ height: '100%', overflow: 'hidden' }}>
              <SimpleBar autoHide style={{ height: '100%', maxHeight: '100%' }}>
                {!initialLoadDone ? (
                  <Loader />
                ) : (
                  <AllContactsTable
                    tableFor={'needToContact'}
                    data={contacts}
                    handleCardEdit={(contact) => {
                      setShowEditContact(contact);
                      setAddActivityPopup(true);
                    }}
                    infiniteScrollRef={infiniteRef}
                    showInfiniteScroll={data?.count >= limit}
                  />
                )}
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
          {/* <SlideOver
            open={open}
            setOpen={setOpen}
            title="All Contacts Filter"
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
          </SlideOver> */}
        </>
      )}
    </Layout>
  );
};

export default AllContacts;
