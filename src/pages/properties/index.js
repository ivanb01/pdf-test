import PropertyCard from '@components/property-card';
import MainMenu from '@components/shared/menu';
import lookingForEmpty from '/public/images/looking-for-empty.svg';
import saved from '/public/images/saved.svg';
import sent from '/public/images/sent.svg';
import Dropdown from '@components/shared/dropdown';
import Search from '@components/shared/input/search';
import { render } from '@react-email/components';
import {
  bathroomsOptions,
  data,
  NYCneighborhoods,
  rentalPriceOptions,
  roomsOptions,
  salePriceOptions,
} from '@global/variables';
import fetchJsonp from 'fetch-jsonp';
import SimpleBar from 'simplebar-react';
import Loader from '@components/shared/loader';
import Input from '@components/shared/input';
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
import { formatDateStringMDY, getInitials, searchContacts } from '@global/functions';
import { ImageGallery } from '@components/overlays/order-template';
import placeholder from '/public/images/img-placeholder.png';
import List from '@components/NestedCheckbox/List';
import { ChevronDownIcon } from '@heroicons/react/solid';
import CloseIcon from '@mui/icons-material/Close';
import { setAmenities } from '@store/global/slice';
import { sendEmail } from '@api/marketing';
import { Tailwind, Button as Btn } from '@react-email/components';
import { Html } from '@react-email/html';
import Emails from '../../components/shared/emails';
import { useDispatch } from 'react-redux';
import CreateCampaignSidebar from '@components/CampaignActionSidebar/CreateCampaignSidebar';
import { addContactActivity } from '@api/contacts';
import FilterList from '@mui/icons-material/FilterList';
import Close from '@mui/icons-material/Close';
import chevronDown from '/public/images/ch-down.svg';
import EditCampaignSidebar from '@components/CampaignActionSidebar/EditCampaignSidebar';

const options = [
  { label: 'Grapes 🍇', value: 'grapes' },
  { label: 'Mango 🥭', value: 'mango' },
  { label: 'Strawberry 🍓', value: 'strawberry', disabled: true },
];

const statuss = Object.freeze({
  unchecked: 0,
  checked: 1,
  indeterminate: -1,
});

const index = () => {
  const dispatch = useDispatch();

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
  const [open, setOpen] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState('');
  const [showProperties, setShowProperties] = useState(true);

  const setStatuss = (root, status) => {
    root.status = status;
    if (Array.isArray(root.items)) {
      return root.items.forEach((item) => {
        setStatuss(item, status);
      });
    }
  };

  const computeStatus = (items) => {
    let checked = 0;
    let indeterminate = 0;

    items.forEach((item) => {
      if (item.status && item.status === statuss?.checked) checked++;
      if (item.status && item.status === statuss?.indeterminate) indeterminate++;
    });

    if (checked === items.length) {
      return statuss.checked;
    } else if (checked > 0 || indeterminate > 0) {
      return statuss.indeterminate;
    }
  };

  const traverse = (root, needle, status) => {
    let id;
    let items;

    if (Array.isArray(root)) {
      items = root;
    } else {
      id = root.id;
      items = root.items;
    }

    // return if needle is found
    // we don't have to compute the status of the items if root.id === needle
    if (id === needle) {
      return setStatuss(root, status);
    }

    if (!items) {
      return root;
    } else {
      items.forEach((item) => traverse(item, needle, status));
      root.status = computeStatus(items);
    }
  };

  const [items, setItems] = useState(data);
  const compute = (checkboxId, status) => {
    traverse(items, checkboxId, status);
    setItems(items.slice());
  };
  const initializeStatus = () => {
    const updatedData = items.map((category) => ({
      ...category,
      status: 0,
      items: category.items.map((item) => ({ ...item, status: 0 })),
    }));

    setItems(updatedData);
  };

  const [datav2, setDatav2] = useState([]);

  useEffect(() => {
    // Use a temporary variable to store the new data
    const newData = [];
    const idsOfNeighboorhoods = [];

    items.forEach((d) => {
      if (d.status === 1) {
        newData.push(d.name);
        d.items.forEach((i) => {
          if (i.status === 1) {
            idsOfNeighboorhoods.push(i.id);
          }
        });
      } else {
        d.items.forEach((i) => {
          if (i.status === 1) {
            newData.push(i.name);
            idsOfNeighboorhoods.push(i.id);
          }
        });
      }
    });

    console.log(newData, 'newData');

    const idsString = idsOfNeighboorhoods.join(',');
    setIds(idsString);

    // Set the new data in the state
    setDatav2(newData);
  }, [items]);

  const selectAmenities = (a) => {
    setSelectedAmenities(a);
  };
  useEffect(() => {
    console.log(selectedAmenities, 'selectedAmenities');
  }, [selectedAmenities]);
  const getFromNumber = () => {
    return (page - 1) * 21 + 1;
  };
  const getToNumber = () => {
    return Math.min(page * 21, properties.TOTAL_COUNT);
  };
  const onFiltersChange = (filter) => {
    setFilterValue(filter);
  };

  // const bathroomOptions = [
  //   {
  //     id: 0,
  //     label: 1,
  //   },
  //   {
  //     id: 1,
  //     label: 2,
  //   },

  //   {
  //     id: 2,
  //     label: 3,
  //   },
  //   {
  //     id: 3,
  //     label: 4,
  //   },
  //   {
  //     id: 4,
  //     label: 5,
  //   },
  //   {
  //     id: 5,
  //     label: 6,
  //   },
  //   {
  //     id: 6,
  //     label: 7,
  //   },
  //   {
  //     id: 7,
  //     label: 8,
  //   },
  //   {
  //     id: 8,
  //     label: 9,
  //   },
  //   {
  //     id: 9,
  //     label: 10,
  //   },
  //   {
  //     id: 10,
  //     label: '10+',
  //   },
  // ];
  // const bedroomsOptions = [
  //   {
  //     id: 0,
  //     label: '1+',
  //   },
  //   {
  //     id: 1,
  //     label: '2+',
  //   },

  //   {
  //     id: 2,
  //     label: '3+',
  //   },
  //   {
  //     id: 3,
  //     label: '4+',
  //   },
  //   {
  //     id: 4,
  //     label: '5+',
  //   },
  //   {
  //     id: 5,
  //     label: '6+',
  //   },
  //   {
  //     id: 6,
  //     label: '7+',
  //   },
  //   {
  //     id: 7,
  //     label: '8+',
  //   },
  //   {
  //     id: 8,
  //     label: '9+',
  //   },
  //   {
  //     id: 9,
  //     label: '10+',
  //   },
  // ];

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
  const [ids, setIds] = useState();
  const removeNullUndefined = (obj) => {
    const cleanedObj = {};
    for (const key in obj) {
      if (obj[key] !== null && obj[key] !== undefined) {
        cleanedObj[key] = obj[key];
      }
    }
    return cleanedObj;
  };
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
    if (ids?.length) params['neighborhood_id'] = ids;
    if (bedrooms) {
      params['bedsMin'] = bedrooms.value;
    }
    if (bathrooms) {
      params['bathMin'] = bathrooms.value;
    }
    if (minPrice) {
      params['priceMin'] = minPrice;
    }
    if (maxPrice) {
      params['priceMax'] = maxPrice;
    }
    params = removeNullUndefined(params);

    const urlParams = new URLSearchParams(params);

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
    setSelectedAmenities('');
    setSelectedProperties([]);
    setMinPrice();
    setMaxPrice();
    setNeighborhoods([]);
    setStatus();
    setBedrooms();
    setBathrooms();
    setSearchKey('');
    setDatav2([]);
    initializeStatus();
    dispatch(setAmenities([]));
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
  }, [bedrooms, bathrooms, ids, neighborhoods, searchKey, status, minPrice, maxPrice, filterValue, selectedAmenities]);

  let [options, setOptions] = useState([...rentalPriceOptions, ...salePriceOptions].sort((a, b) => a.value - b.value));

  const [openDropdown, setOpenDropdown] = useState(false);
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
  const user = useSelector((state) => state.global.user);

  const [filteredContacts, setFilteredContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [propertiesSent, setPropertiesSent] = useState(false);

  function filterAndSortContacts(contacts, condition) {
    return contacts
      ?.filter(condition)
      .sort((a, b) => a.first_name.localeCompare(b.first_name))
      .map((contact) => ({
        value: contact.id,
        label: `${contact.first_name} ${contact.last_name}`,
        first_name: contact.first_name,
        last_name: contact.last_name,
        email: contact.email,
        profile_image_path: contact.profile_image_path,
      }));
  }

  function isClientContact(contact) {
    return (
      contact.category_1 == 'Client' &&
      !(contact.import_source_text == 'Smart Sync A.I.' && contact.approved_ai === null)
    );
  }

  useEffect(() => {
    console.log(sendMethod);
    setFilteredContacts(
      sendMethod == 1
        ? filterAndSortContacts(contacts, (contact) => contact.email && isClientContact(contact))
        : filterAndSortContacts(contacts, (contact) => contact.phone_number && isClientContact(contact)),
    );
  }, [contacts, sendMethod]);

  const handleSearch = (searchTerm) => {
    const filteredArray = searchContacts(contacts, searchTerm);
    setFilteredContacts(filteredArray.data);
  };

  const [chunkedArray, setChunkedArray] = useState([]);

  useEffect(() => {
    const chunkedArray = [];
    for (let i = 0; i < selectedProperties.length; i += 2) {
      chunkedArray.push(selectedProperties.slice(i, i + 2));
    }

    setChunkedArray(chunkedArray);
  }, [selectedProperties]);
  const [loadingEmails, setLoadingEmails] = useState(false);

  const _sendEmail = () => {
    const propertyIds = selectedProperties.map((property) => `"${property.PROPERTY_TYPE} in ${property.ADDRESS}"`);
    setLoadingEmails(true);
    selectedContacts.map((c) => {
      addContactActivity(c.value, {
        type_of_activity_id: 28,
        description: `These properties were sent to this user on ${formatDateStringMDY(new Date())}: ${propertyIds.join(
          ',  ',
        )} `,
      });
      sendEmail(
        [c.email],
        `Hi ${c.first_name}, Check out these new properties.`,
        `${render(<Emails chunkedArray={chunkedArray} firstName={c.first_name} agentName={user} />, {
          pretty: true,
        })}`,
      ).then((res) => {
        setLoadingEmails(false);
        setPropertiesSent(true);
        resetPropertySelection();
      });
    });
  };

  const sendSMS = () => {
    setPropertiesSent(true);
    console.log(selectedContacts, selectedProperties, 'sms');
    resetPropertySelection();
  };

  const resetPropertySelection = () => {
    setSelectedContacts([]);
    setSelectedProperties([]);
  };
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setPropertiesSent(false);
        setSelectedContacts([]);
      }, 500);
    }
  }, [open]);

  const [neighborhoodsSearch, setNeighborhoodsSearch] = useState('');
  useEffect(() => {
    if (openDropdown === false) {
      setNeighborhoodsSearch('');
    }
  }, [openDropdown]);
  useEffect(() => {
    if (document.querySelector('.side-overlay-wrapper')) {
      if (propertiesSent) {
        document.querySelector('.side-overlay-wrapper').classList.add('justify-center');
      } else {
        document.querySelector('.side-overlay-wrapper').classList.remove('justify-center');
      }
    }
  }, [propertiesSent]);

  const SelectedProperty = ({ property, setSelected, selected }) => {
    return (
      <div className="bg-gray10 border border-gray1 flex items-center justify-between p-[10px] rounded-lg mb-2">
        <div className="flex items-center">
          <img
            className="h-[50px] w-[85px] object-cover rounded-lg mr-3"
            src={property?.PHOTOS?.length ? property.PHOTOS[0].PHOTO_URL : placeholder.src}
          />
          <div className="font-semibold text-gray7 mr-3 text-[14px]">
            {property.PROPERTY_TYPE} in {property.ADDRESS}
          </div>
        </div>
        <div class="form-checkbox">
          <input
            type="checkbox"
            id={`checkbox-${property.ID}`}
            class="hidden"
            onChange={(event) => {
              if (event.target.checked) {
                setSelected((prevSelected) => prevSelected.filter((item) => item.ID !== property.ID));
              } else {
                setSelected((prevSelected) => [...prevSelected, property]);
              }
            }}
          />
          <label htmlFor={`checkbox-${property.ID}`} class="flex items-center cursor-pointer">
            <div
              class={`${
                selected ? 'bg-lightBlue3' : 'border border-gray-300'
              } relative rounded-full w-6 h-6 flex flex-shrink-0 justify-center items-center`}>
              {selected && (
                <svg
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  version="1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  enable-background="new 0 0 48 48">
                  <polygon fill="white" points="40.6,12.1 17,35.7 7.4,26.1 4.6,29 17,41.3 43.4,14.9" />
                </svg>
              )}
            </div>
          </label>
        </div>
      </div>
    );
  };
  const filterData = (data, searchTerm) => {
    return data.reduce((result, item) => {
      const isParentMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase());

      const filteredItems = item.items.filter((subItem) =>
        subItem.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );

      if (isParentMatch && filteredItems.length === 0) {
        result.push(item);
      } else if (filteredItems.length > 0) {
        result.push({ ...item, items: filteredItems });
      }

      return result;
    }, []);
  };
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, [setOpenDropdown]);

  const [openSidebar, setOpenSidebar] = useState(true);
  const isSelected = (option) => selectedContacts.some((selected) => selected.value === option.value);

  const sortedOptions = filteredContacts?.sort((a, b) => {
    const aIsSelected = isSelected(a);
    const bIsSelected = isSelected(b);

    if (aIsSelected && !bIsSelected) {
      return -1;
    } else if (!aIsSelected && bIsSelected) {
      return 1;
    }
    return 0;
  });

  useEffect(() => {
    console.log(selectedProperties);
  }, [selectedProperties]);

  return (
    <>
      <MainMenu />
      <EditCampaignSidebar open={openSidebar} setOpen={setOpenSidebar} rounded />
      <div className="border border-b">
        <div className="flex p-6 gap-4">
          <Search
            className="w-[250px]  text-sm"
            placeholder="Search by address"
            onInput={(event) => {
              setSearchKey(event.target.value);
            }}
            value={searchKey}
          />
          <div
            ref={dropdownRef}
            className={
              'min-w-[170px] flex justify-between h-[38px] px-2 py-[9px] relative border border-gray-300 text-sm font-medium text-[#808080] rounded-md'
            }
            style={{ flex: 1, maxWidth: '300px', position: 'relative' }}
            onClick={() => {
              setOpenDropdown(!openDropdown);
              setTimeout(() => {
                document.querySelector(`#custom-dropdown-search`)?.focus();
              }, 200);
            }}>
            <div className={'max-w-[300px] overflow-hidden whitespace-nowrap overflow-ellipsis font-normal'}>
              {datav2.length > 0 ? datav2.join(',') : 'Select Neighborhood'}
            </div>
            <div className={'flex'}>
              {datav2.length > 0 && (
                <CloseIcon
                  className={`transition-all h-5 w-5 text-gray3 cursor-pointer`}
                  aria-hidden="true"
                  onClick={(e) => {
                    e.stopPropagation();
                    initializeStatus();
                    setDatav2([]);
                  }}
                />
              )}
              <ChevronDownIcon
                className={`transition-all h-5 w-5 text-gray3 ${openDropdown && 'rotate-180'}`}
                aria-hidden="true"
              />
            </div>
            {openDropdown && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenDropdown(true);
                }}
                className={
                  'flex-1 left-0 py-3 pl-[10px] z-10 absolute top-[45px] shadow-lg w-[500px] bg-white max-h-[250px] rounded-md  text-base ring-1 ring-black ring-opacity-5  focus:outline-none sm:text-sm'
                }>
                <SimpleBar style={{ maxHeight: '235px', height: '100%', paddingRight: '12px' }}>
                  <input
                    className={` text-sm mb-2 text-gray8 pl-3 border border-gray2 rounded-lg bg-white px-[13px] h-[35px] w-full  mt-1 ml-0.5 outline-none focus:ring-1 focus:ring-blue1 focus:border-blue1 z-[9999999]`}
                    id={`custom-dropdown-search`}
                    type={'text'}
                    placeholder={'Select'}
                    onChange={(e) => setNeighborhoodsSearch(e.target.value)}
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      setOpenDropdown(true);
                    }}
                  />
                  {filterData(items, neighborhoodsSearch).length > 0 ? (
                    <div className={'mt-2'}>
                      <List
                        items={filterData(items, neighborhoodsSearch)}
                        compute={compute}
                        setOpenDropdown={setOpenDropdown}
                      />
                    </div>
                  ) : (
                    <div className={'text-sm mb-1 text-gray8 text-center mt-2'}>No Neighborhood with this name</div>
                  )}
                </SimpleBar>
              </div>
            )}
          </div>
          <Dropdown
            options={forOptions}
            className=" w-[130px]"
            placeHolder="Status"
            handleSelect={(choice) => {
              setStatus(choice);
            }}
            initialSelect={status}
          />

          <Dropdown
            options={roomsOptions}
            className=" min-w-[120px]"
            placeHolder="Bedrooms"
            afterLabel="Beds"
            handleSelect={(choice) => {
              setBedrooms(choice);
            }}
            initialSelect={bedrooms}
          />
          <Dropdown
            options={bathroomsOptions}
            className="w-[140px]"
            placeHolder="Bathrooms"
            afterLabel="Baths"
            handleSelect={(choice) => {
              setBathrooms(choice);
            }}
            initialSelect={bathrooms}
          />
          <MinMaxPrice
            // options={bathroomOptions}
            label={'Min/Max Price'}
            className="min-w-[170px] font-normal"
            minPrice={minPrice}
            maxPrice={maxPrice}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
            options={options}
          />
          <Button
            className="min-w-[120px]"
            leftIcon={
              <div className={'relative'}>
                {selectedAmenities.length > 0 && selectedAmenities.split(',').length > 0 && (
                  <div
                    className={
                      'absolute flex items-center justify-center top-[-17px] left-[77px] border-2 border-lightBlue3 bg-white h-[20px] w-[20px] rounded-xl text-xs text-lightBlue3'
                    }>
                    {selectedAmenities.split(',').length}
                  </div>
                )}
                <FilterList className="w-5 h-5 mt-[-2px]" />
              </div>
            }
            primary
            onClick={() => setOpenFilters(true)}>
            Filters
          </Button>
          <Button white onClick={() => resetFilters()} className="min-w-[120px]">
            Clear All
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
              <div className={`p-6 ${selectedProperties.length > 0 && 'pb-[100px]'}`}>
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
                      isSelected={selectedProperties.map((property) => property.ID).includes(property.ID)}
                      selected={selectedProperties}
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
                  {/*<Button*/}
                  {/*  primary*/}
                  {/*  leftIcon={<AtSymbolIcon />}*/}
                  {/*  label="Send via SMS"*/}
                  {/*  onClick={() => {*/}
                  {/*    setSendMethod(2);*/}
                  {/*    setOpen(true);*/}
                  {/*  }}*/}
                  {/*/>*/}
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
      <PropertyFilters
        selectAmenities={selectAmenities}
        open={openFilters}
        setOpen={() => setOpenFilters(false)}
        selectedAmenities={selectedAmenities}
      />
      <SlideOver
        open={open}
        setOpen={setOpen}
        withBackdrop
        noHeader={!propertiesSent}
        buttons={
          propertiesSent ? null : (
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
                  loading={loadingEmails}
                  label="Send via Email"
                  onClick={() => _sendEmail()}
                  disabled={!selectedContacts.length || !selectedProperties.length}
                />
              ) : (
                <Button
                  primary
                  leftIcon={<AtSymbolIcon />}
                  label="Send via SMS"
                  onClick={() => sendSMS()}
                  disabled={!selectedContacts.length || !selectedProperties.length}
                />
              )}
            </>
          )
        }>
        {propertiesSent ? (
          <div className="text-center">
            <lottie-player
              src="/animations/aisummary1.json"
              background="transparent"
              speed="1"
              style={{ height: '200px' }}
              autoplay></lottie-player>
            <div className="text-gray7 font-semibold text-[18px] -mt-7">
              Properties have been successfully sent to your clients!
            </div>
            {/*<div className=" mt-2">*/}
            {/*  All properties that are <img className="inline-block mr-1" src={sent.src} /> are also{' '}*/}
            {/*  <img className="inline-block mr-1" src={saved.src} /> on the clients detail page.*/}
            {/*</div>*/}
            <Button
              primary
              label="Back to Properties"
              onClick={() => {
                setTimeout(() => {
                  setPropertiesSent(false);
                  setSelectedContacts([]);
                }, 500);
                setOpen(false);
              }}
              className="mt-6"
            />
          </div>
        ) : (
          <div className="">
            <div className="flex items-center justify-between  mb-2">
              <div className="font-semibold text-gray7 text-[20px]">Select clients</div>
              <button
                type="button"
                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                onClick={() => setOpen(false)}>
                <span className="sr-only">Close panel</span>
                <Close className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            {/* <Search
              placeholder={`Search for clients`}
              className="w-full text-sm mt-2"
              onInput={(event) => handleSearch(event.target.value)}
              // value={searchTerm}
              // onInput={(event) => setSearchTerm(event.target.value)}
            /> */}
            {filteredContacts && filteredContacts.length && (
              <MultiSelect
                options={sortedOptions}
                value={selectedContacts}
                onChange={(contacts) => {
                  setSelectedContacts(contacts);
                }}
                labelledBy="Search for clients"
                overrideStrings={{
                  selectSomeItems: 'Selected clients will appear here',
                }}
              />
            )}
            <div className="my-4">
              <span className="font-semibold text-gray7 text-[18px]">{selectedContacts.length}</span>
              <span className="text-gray8 text-[14px] font-medium">
                {' '}
                {selectedContacts.length == 1 ? 'Client' : 'Clients'} selected
              </span>
            </div>
            <SimpleBar autoHide={false} className="-mr-4" style={{ maxHeight: '300px' }}>
              {selectedContacts &&
                selectedContacts.map((contact) => (
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
                      <button
                        className="text-sm font-semibold px-3 py-[6px] text-[#B91C1C]"
                        onClick={() =>
                          setSelectedContacts((prevSelected) =>
                            prevSelected.filter((prevContact) => prevContact.value !== contact.value),
                          )
                        }>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
            </SimpleBar>
            <hr className="my-3" />
            <div className="flex items-center justify-between">
              <div className="font-semibold text-gray7 text-[20px]">Properties</div>
              <a
                className={`cursor-pointer transition-all ${showProperties ? '' : 'rotate-180'}`}
                onClick={() => setShowProperties(!showProperties)}>
                <img src={chevronDown.src} />
              </a>
            </div>
            <div className="my-4">
              <span className="font-semibold text-gray7 text-[18px]">{selectedProperties.length}</span>
              <span className="text-gray8 font-medium text-[14px]">
                {' '}
                {selectedProperties.length == 1 ? 'Property' : 'Properties'} selected
              </span>
            </div>
            {showProperties && (
              <>
                {selectedProperties.map((property) => (
                  <SelectedProperty property={property} setSelected={setSelectedProperties} selected={true} />
                ))}
              </>
            )}
          </div>
        )}
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
