import PropertyCard from '@components/property-card';
import MainMenu from '@components/shared/menu';
import lookingForEmpty from '/public/images/looking-for-empty.svg';
import Dropdown from '@components/shared/dropdown';
import Search from '@components/shared/input/search';
import { NYCneighborhoods, rentalPriceOptions, salePriceOptions } from '@global/variables';
import fetchJsonp from 'fetch-jsonp';
import SimpleBar from 'simplebar-react';
import Loader from '@components/shared/loader';
import Button from '@components/shared/button';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import React, { useState, useRef, useMemo, useEffect, useLayoutEffect } from 'react';
import MinMaxPrice from '@components/shared/dropdown/MinMaxPrice';
import { MultiSelect } from 'react-multi-select-component';
import FilterPropertiesDropdown from '@components/shared/dropdown/FilterPropertiesDropdown';
import withAuth from '@components/withAuth';
import PropertyFilters from '@components/overlays/property-filters';
import { AtSymbolIcon, MailIcon } from '@heroicons/react/outline';
import SlideOver from '@components/shared/slideOver';
import { useSelector } from 'react-redux';
import { getInitials, searchContacts } from '@global/functions';

const options = [
  { label: 'Grapes 🍇', value: 'grapes' },
  { label: 'Mango 🥭', value: 'mango' },
  { label: 'Strawberry 🍓', value: 'strawberry', disabled: true },
];

const index = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDANJRHsYVmytQVpYGdPYsEKAivfzIHlwo',
  });
  const center = useMemo(() => ({ lat: 40.8585107, lng: -73.9327812 }), [40.8585107, -73.9327812]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [filterValue, setFilterValue] = useState('newest');
  const [searchKey, setSearchKey] = useState('');
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [status, setStatus] = useState();
  const [bedrooms, setBedrooms] = useState();
  const [bathrooms, setBathrooms] = useState();
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [open, setOpen] = useState(true);
  const [selectedAmenities, setSelectedAmenities] = useState('');

  const selectAmenities = (a) => {
    setSelectedAmenities(a);
  };
  const getFromNumber = () => {
    return (page - 1) * 21 + 1;
  };
  const getToNumber = () => {
    return Math.min(page * 21, properties.TOTAL_COUNT);
  };
  const onFiltersChange = (filter) => {
    setFilterValue(filter);
  };

  const bathroomOptions = [
    {
      id: 0,
      label: 1,
    },
    {
      id: 1,
      label: 2,
    },

    {
      id: 2,
      label: 3,
    },
    {
      id: 3,
      label: 4,
    },
    {
      id: 4,
      label: 5,
    },
    {
      id: 5,
      label: 6,
    },
    {
      id: 6,
      label: 7,
    },
    {
      id: 7,
      label: 8,
    },
    {
      id: 8,
      label: 9,
    },
    {
      id: 9,
      label: 10,
    },
    {
      id: 10,
      label: '10+',
    },
  ];
  const bedroomsOptions = [
    {
      id: 0,
      label: 1,
    },
    {
      id: 1,
      label: 2,
    },

    {
      id: 2,
      label: 3,
    },
    {
      id: 3,
      label: 4,
    },
    {
      id: 4,
      label: 5,
    },
    {
      id: 5,
      label: 6,
    },
    {
      id: 6,
      label: 7,
    },
    {
      id: 7,
      label: 8,
    },
    {
      id: 8,
      label: 9,
    },
    {
      id: 9,
      label: 10,
    },
    {
      id: 10,
      label: '10+',
    },
  ];

  const forOptions = [
    {
      id: 0,
      label: 'For Sale',
    },
    {
      id: 1,
      label: 'For Rent',
    },
  ];

  const fetchProperties = async (filterValue, page = 1) => {
    setLoading(true);
    let params = {
      apikey: '4d7139716e6b4a72',
      callback: 'callback',
      page: page,
      amenities: selectedAmenities,
    };
    if (filterValue === 'newest') {
      params['sort'] = 'date';
      params['order'] = 'desc';
    }
    if (filterValue === 'oldest') {
      params['sort'] = 'date';
      params['order'] = 'asc';
    }
    if (filterValue === 'minPrice') {
      params['sort'] = 'price';
      params['order'] = 'asc';
    }
    if (filterValue === 'maxPrice') {
      params['sort'] = 'price';
      params['order'] = 'desc';
    }
    if (searchKey) {
      params['address'] = searchKey;
      params['page'] = 1;
    }
    if (status) params['status'] = status.id == 0 ? 1 : 2;
    if (neighborhoods.length)
      params['neighborhood_id'] = neighborhoods.map((neighborhood) => neighborhood.value).join(',');
    if (bedrooms) {
      params['bedsMin'] = bedrooms.label == '10+' ? 10 : bedrooms.label;
    }
    if (bathrooms) {
      params['bathMin'] = bathrooms.label == '10+' ? 10 : bathrooms.label;
    }
    if (minPrice) {
      params['priceMin'] = minPrice;
    }
    if (maxPrice) {
      params['priceMax'] = maxPrice;
    }
    const urlParams = new URLSearchParams({
      ...params,
    });

    const url = 'https://dataapi.realtymx.com/listings?' + urlParams.toString();
    console.log(url);

    await fetchJsonp(url)
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);
        setLoading(false);
      });
  };

  const resetFilters = () => {
    setMinPrice();
    setMaxPrice();
    setNeighborhoods([]);
    setStatus();
    setBedrooms();
    setBathrooms();
    setSearchKey('');
  };
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const setWindowDimensions = () => {
    setWindowWidth(window.innerWidth);
  };
  useLayoutEffect(() => {
    window.addEventListener('resize', setWindowDimensions);
    return () => {
      window.removeEventListener('resize', setWindowDimensions);
    };
  }, []);
  useEffect(() => {
    fetchProperties(filterValue, page);
  }, [bedrooms, bathrooms, neighborhoods, searchKey, status, minPrice, maxPrice, filterValue, selectedAmenities]);

  let [options, setOptions] = useState([...rentalPriceOptions, ...salePriceOptions].sort((a, b) => a.value - b.value));

  useEffect(() => {
    if (typeof status?.id !== 'undefined') {
      setOptions(status.id == 1 ? rentalPriceOptions : salePriceOptions);
      setMinPrice();
      setMaxPrice();
    }
  }, [status]);

  const sortOptionsByChecked = (options, selectedValues) => {
    const selectedOptions = options.filter((option) => selectedValues.some((value) => value.value === option.value));
    const unselectedOptions = options.filter((option) => !selectedValues.some((value) => value.value === option.value));

    return [...selectedOptions, ...unselectedOptions];
  };

  const sortedNeighborhoods = sortOptionsByChecked(NYCneighborhoods, neighborhoods);
  const [openFilters, setOpenFilters] = useState(false);
  const [sendMethod, setSendMethod] = useState(1);

  const contacts = useSelector((state) => state.contacts.allContacts.data);
  const [filteredContacts, setFilteredContacts] = useState(null);
  const [selectedContacts, setSelectedContacts] = useState([]);

  useEffect(() => {
    setFilteredContacts(
      sendMethod == 1
        ? contacts?.filter((contact) => contact.email)
        : contacts?.filter((contact) => contact.phone_number),
    );
  }, [contacts]);

  const handleSearch = (searchTerm) => {
    const filteredArray = searchContacts(contacts, searchTerm);
    setFilteredContacts(filteredArray.data);
  };

  return (
    <>
      <MainMenu />
      <div className="border border-b">
        <div className="flex p-6">
          <Search
            className="w-[250px] mr-4 text-sm"
            placeholder="Search by address"
            onInput={(event) => {
              setSearchKey(event.target.value);
            }}
            value={searchKey}
          />
          {/* <SearchSelectInput
              options={NYCneighborhoods}
              className="mr-4"
              placeholder="Neighborhood"
              onChange={(choice) => {
                let choices = choice.map((el) => el.value);
                setNeighborhoods(choices);
              }}
              value={valueOptions(neighborhoods, NYCneighborhoods)}
            /> */}
          <MultiSelect
            options={sortedNeighborhoods}
            value={neighborhoods}
            onChange={(neighborhood) => {
              setNeighborhoods(neighborhood);
            }}
            labelledBy="Select Neighborhoods"
            overrideStrings={{
              selectSomeItems: 'Select Neighborhoods',
            }}
            className="mr-4"
          />
          <Dropdown
            options={forOptions}
            className="mr-4 w-[130px]"
            placeHolder="Status"
            handleSelect={(choice) => {
              setStatus(choice);
            }}
            initialSelect={status?.label}
          />
          {/* <Dropdown
            options={NYCneighborhoods}
            className="mr-4"
            placeHolder="type: Choose"
            handleSelect={(choice) => {
              let choices = choice.map((el) => el.initialSelect);
              setNeighborhoods(choices);
            }}
          /> */}
          <Dropdown
            options={bedroomsOptions}
            className="mr-4 w-[140px]"
            placeHolder="Bedrooms"
            afterLabel="Beds"
            handleSelect={(choice) => {
              setBedrooms(choice);
            }}
            initialSelect={bedrooms?.label}
          />
          <Dropdown
            options={bathroomOptions}
            className="mr-4 w-[140px]"
            placeHolder="Bathrooms"
            afterLabel="Baths"
            handleSelect={(choice) => {
              setBathrooms(choice);
            }}
            initialSelect={bathrooms?.label}
          />
          <MinMaxPrice
            // options={bathroomOptions}
            label={'Min/Max Price'}
            className="mr-4 min-w-[170px]"
            minPrice={minPrice}
            maxPrice={maxPrice}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
            options={options}
          />
          <Button className="min-w-[120px]" primary onClick={() => setOpenFilters(true)}>
            Filters
          </Button>
          <Button onClick={() => resetFilters()} className="min-w-[120px] ml-2" primary>
            Clear Filters
          </Button>
          {/* <Dropdown
            placeHolder="Choose Type*"
            activeIcon={false}
            options={typeOptions}
            activeClasses="bg-lightBlue1"
            handleSelect={(relationshipType) => handleChooseRelationshipType(relationshipType)}></Dropdown> */}
        </div>
      </div>
      {loading ? (
        <div className="relative h-full w-full">
          <Loader></Loader>
        </div>
      ) : properties.LISTINGS && properties.LISTINGS.length ? (
        <div className="flex items-center justify-between">
          <div className="w-full">
            <SimpleBar style={{ maxHeight: 'calc(100vh - 156px)' }}>
              <div className="p-6">
                <div className={'flex items-center justify-between mb-6'}>
                  <div className="text-gray-900 text-sm font-normal">
                    {properties.TOTAL_COUNT.toLocaleString()} total properties. These properties are sourced from REBNY
                    database.
                  </div>
                  <div className={'flex items-center gap-2'}>
                    <p className="text-gray6 font-inter font-normal leading-5 text-sm mt-1">Sort by</p>
                    <FilterPropertiesDropdown onFiltersChange={onFiltersChange} />
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-6">
                  {properties.LISTINGS.map((property, index) => (
                    <PropertyCard
                      setSelected={setSelectedProperties}
                      selected={selectedProperties.includes(property.ID)}
                      key={index}
                      property={property}
                    />
                  ))}
                </div>
                {properties.TOTAL_COUNT > 21 && (
                  <nav className="flex items-center justify-between bg-white py-3 pb-0 mt-5" aria-label="Pagination">
                    <div className="hidden sm:block">
                      <p className="text-sm text-gray-700">
                        Showing{' '}
                        <span className="font-medium">
                          {getFromNumber()
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                        </span>
                        to{' '}
                        <span className="font-medium">
                          {getToNumber()
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        </span>{' '}
                        of{' '}
                        <span className="font-medium">
                          {properties.TOTAL_COUNT.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        </span>{' '}
                        results
                      </p>
                    </div>
                    <div className="flex flex-1 justify-between sm:justify-end">
                      {getFromNumber() != 1 && (
                        <a
                          href="#"
                          onClick={() => {
                            fetchProperties(filterValue, page - 1);
                            setPage(page - 1);
                          }}
                          className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0">
                          Previous
                        </a>
                      )}
                      {getToNumber() != properties.TOTAL_COUNT && (
                        <a
                          href="#"
                          onClick={() => {
                            fetchProperties(filterValue, page + 1);
                            setPage(page + 1);
                          }}
                          className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0">
                          Next
                        </a>
                      )}
                    </div>
                  </nav>
                )}
              </div>
            </SimpleBar>
            {selectedProperties.length > 0 && (
              <div className="custom-box-shadow-2 px-6 py-[14px] fixed left-0 bottom-0 right-0 bg-white flex items-center justify-between">
                <div className=" bg-gray1 px-[14px] py-[10px] w-fit">
                  <span className="font-semibold text-gray7">{selectedProperties.length}</span>
                  <span className="text-gray8 font-medium">
                    {' '}
                    {selectedProperties.length == 1 ? 'Property' : 'Properties'} selected
                  </span>
                </div>
                <div className="flex">
                  <Button white label="Save" className="mr-3" />
                  <Button
                    primary
                    leftIcon={<MailIcon />}
                    label="Send via Email"
                    className="mr-3"
                    onClick={() => {
                      setSendMethod(1);
                      setOpen(true);
                    }}
                  />
                  <Button
                    primary
                    leftIcon={<AtSymbolIcon />}
                    label="Send via SMS"
                    onClick={() => {
                      setSendMethod(2);
                      setOpen(true);
                    }}
                  />
                </div>
              </div>
            )}
          </div>
          {/* <div className="w-1/2">
            {isLoaded && (
              <GoogleMap mapContainerClassName="map-container" center={center} zoom={15}>
                <MarkerF
                  key="marker_1"
                  position={{
                    lat: 40.8585107,
                    lng: -73.9327812,
                  }}
                />
              </GoogleMap>
            )}
          </div> */}
        </div>
      ) : (
        <div className=" h-full flex items-center justify-center">
          <div className="flex items-center justify-center flex-col text-center">
            <img src={lookingForEmpty.src} alt="" />
            <div className="mt-6">
              <div className="text-sm text-black font-medium">No Property Found</div>
              <div className="text-xs leading-5 font-normal text-black mt-[6px] ">
                No property with these details found, please try again!
              </div>
            </div>
          </div>
        </div>
      )}
      {openFilters && (
        <PropertyFilters selectAmenities={selectAmenities} open={openFilters} setOpen={() => setOpenFilters(false)} />
      )}
      <SlideOver
        open={open}
        noHeader
        setOpen={setOpen}
        title={sendMethod == 1 ? 'Send via Email' : 'Send via SMS'}
        withBackdrop
        buttons={
          <>
            <Button
              // disabled={!Object.values(clientsFilters).flat().length > 0}
              transparent
              label="Preview"
            />
            {sendMethod == 1 ? (
              <Button
                primary
                leftIcon={<MailIcon />}
                label="Send via Email"
                disabled={!selectedContacts.length || !selectedProperties.length}
              />
            ) : (
              <Button
                primary
                leftIcon={<AtSymbolIcon />}
                label="Send via SMS"
                disabled={!selectedContacts.length || !selectedProperties.length}
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
        <div>
          <div className="font-semibold text-gray7">Select Clients</div>
          <Search
            placeholder={`Search for clients`}
            className="w-full text-sm mt-2"
            onInput={(event) => handleSearch(event.target.value)}
            // value={searchTerm}
            // onInput={(event) => setSearchTerm(event.target.value)}
          />
          <div className="my-4">
            <span className="font-semibold text-gray7">{selectedContacts.length}</span>
            <span className="text-gray8 font-medium">
              {' '}
              {selectedProperties.length == 1 ? 'Contact' : 'Contacts'} selected
            </span>
          </div>
          <SimpleBar autoHide={false} className="-mr-4" style={{ maxHeight: '300px' }}>
            {filteredContacts &&
              filteredContacts.map((contact) => (
                <div className={'flex justify-between items-center mb-5 mr-4'}>
                  <div className="flex gap-4">
                    <div>
                      {contact.profile_image_path ? (
                        <img
                          className="inline-block h-10 w-10 rounded-full"
                          src={contact.profile_image_path}
                          alt={contact.first_name}
                        />
                      ) : (
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">
                          <span className="text-sm font-medium leading-none text-white">
                            {getInitials(contact.first_name + ' ' + contact.last_name).toUpperCase()}
                          </span>
                        </span>
                      )}
                    </div>
                    <div>
                      <h6 className={'text-sm leading-5 text-gray7 font-semibold '}>
                        {contact.first_name} {contact.last_name}
                      </h6>
                      <h6
                        className={
                          ' text-sm leading-5 font-medium text-gray5 ellipsis-email xl:min-w-[230px] lg:w-[130px]'
                        }
                        title={contact.email}>
                        {contact.email}
                      </h6>
                    </div>
                  </div>
                  <div>
                    {selectedContacts.includes(contact.id) ? (
                      <button
                        className="text-sm font-semibold px-3 py-[6px] text-[#B91C1C]"
                        onClick={() =>
                          setSelectedContacts((prevSelected) => prevSelected.filter((id) => id !== contact.id))
                        }>
                        Remove
                      </button>
                    ) : (
                      <button
                        className="bg-[#DBEAFE] text-lightBlue3 text-sm px-3 py-[6px] font-medium rounded-md"
                        onClick={() => setSelectedContacts((prevSelected) => [...prevSelected, contact.id])}>
                        Select
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </SimpleBar>
          <hr className="my-3" />
          <div className="font-semibold text-gray7">Properties</div>
          <div className="my-4">
            <span className="font-semibold text-gray7">{selectedProperties.length}</span>
            <span className="text-gray8 font-medium">
              {' '}
              {selectedProperties.length == 1 ? 'Property' : 'Properties'} selected
            </span>
          </div>
        </div>
      </SlideOver>
    </>
  );
};

export default withAuth(index);

// export async function getServerSideProps(context) {
//   return {
//     props: {
//       requiresAuth: true,
//     },
//   };
// }
