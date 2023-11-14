import PropertyCard from '@components/property-card';
import MainMenu from '@components/shared/menu';
import lookingForEmpty from '/public/images/looking-for-empty.svg';
import Dropdown from '@components/shared/dropdown';
import Search from '@components/shared/input/search';
import { NYCneighborhoods, rentalPriceOptions, salePriceOptions } from '@global/variables';
import SearchSelectInput from '@components/shared/search-select-input';
import fetchJsonp from 'fetch-jsonp';
import SimpleBar from 'simplebar-react';
import Loader from '@components/shared/loader';
import Button from '@components/shared/button';
import { valueOptions } from '@global/functions';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import React, { useState, useRef, useMemo, useEffect } from 'react';
import MinMaxPrice from '@components/shared/dropdown/MinMaxPrice';
import { MultiSelect } from 'react-multi-select-component';
import FilterPropertiesDropdown from '@components/shared/dropdown/FilterPropertiesDropdown';
import withAuth from '@components/withAuth';

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
    if (searchKey) params['address'] = searchKey;
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

  useEffect(() => {
    fetchProperties(filterValue, page);
  }, [bedrooms, bathrooms, neighborhoods, searchKey, status, minPrice, maxPrice, filterValue]);

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
            label="Min/Max Price"
            className="mr-4 w-[220px]"
            minPrice={minPrice}
            maxPrice={maxPrice}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
            options={options}
          />
          <Button onClick={() => resetFilters()} className="min-w-[120px]" primary>
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
            <SimpleBar style={{ maxHeight: 'calc(100vh - 155px)' }}>
              <div className="p-6">
                <div className={'flex items-center justify-between mb-6'}>
                  <div className="text-gray-900 text-sm font-medium">
                    {properties.TOTAL_COUNT.toLocaleString()} total properties. These properties are sourced from
                    REALTYMX database.
                  </div>
                  <div className={'flex items-center gap-2'}>
                    <p className="text-gray6 font-inter font-normal leading-5 text-sm mt-1">Sort by</p>
                    <FilterPropertiesDropdown onFiltersChange={onFiltersChange} />
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-6">
                  {properties.LISTINGS.map((property, index) => (
                    <PropertyCard key={index} property={property}></PropertyCard>
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
