import PropertyCard from '@components/property-card';
import MainMenu from '@components/shared/menu';
import lookingForEmpty from '/public/images/looking-for-empty.svg';
import Dropdown from '@components/shared/dropdown';
import Search from '@components/shared/input/search';
import { NYCneighborhoods } from '@global/variables';
import SearchSelectInput from '@components/shared/search-select-input';
import fetchJsonp from 'fetch-jsonp';
import { useEffect, useState } from 'react';
import SimpleBar from 'simplebar-react';
import Loader from '@components/shared/loader';
import Button from '@components/shared/button';
import { valueOptions } from '@global/functions';

const index = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const [searchKey, setSearchKey] = useState();
  const [neighborhoods, setNeighborhoods] = useState();
  const [status, setStatus] = useState();
  const [bedrooms, setBedrooms] = useState();
  const [bathrooms, setBathrooms] = useState();

  const getFromNumber = () => {
    return (page - 1) * 21 + 1;
  };
  const getToNumber = () => {
    return Math.min(page * 21, properties.TOTAL_COUNT);
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

  const typeOptions = [
    {
      id: 0,
      label: 'For Sale',
    },
    {
      id: 1,
      label: 'For Rent',
    },
  ];

  const fetchProperties = async (page) => {
    setLoading(true);
    let params = {
      apikey: '4d7139716e6b4a72',
      callback: 'callback',
    };

    if (searchKey) params['address'] = searchKey;
    if (status) params['status'] = status.id == 0 ? 1 : 2;
    if (neighborhoods) params['neighborhood_id'] = neighborhoods.join(',');
    if (bedrooms) {
      params['bedsMin'] = bedrooms.label == '10+' ? 10 : bedrooms.label;
    }
    if (bathrooms) {
      params['bathMin'] = bathrooms.label == '10+' ? 10 : bathrooms.label;
    }
    const urlParams = new URLSearchParams({
      ...params,
    });

    const url = 'https://dataapi.realtymx.com/listings?' + urlParams.toString();

    await fetchJsonp(url)
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);
        setLoading(false);
      });
  };

  const resetFilters = () => {
    setNeighborhoods();
    setStatus();
    setBedrooms();
    setBathrooms();
    setSearchKey();
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    fetchProperties();
  }, [bedrooms, bathrooms, neighborhoods, status, searchKey]);

  return (
    <>
      <MainMenu />
      <div className="p-6 border border-b">
        <div className="flex">
          <Search
            className="h-[38px] min-w-[450px] mr-4"
            placeholder="Search for properties"
            onInput={(event) => {
              setSearchKey(event.target.value);
            }}
            value={searchKey}
          />
          <SearchSelectInput
            options={NYCneighborhoods}
            className="mr-4"
            placeholder="in: Choose Neighborhood"
            onChange={(choice) => {
              let choices = choice.map((el) => el.value);
              setNeighborhoods(choices);
            }}
            value={valueOptions(neighborhoods, NYCneighborhoods)}
          />
          <Dropdown
            options={forOptions}
            className="mr-4"
            placeHolder="for: Choose"
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
            className="mr-4"
            placeHolder="Bedrooms: -"
            handleSelect={(choice) => {
              setBedrooms(choice);
            }}
            initialSelect={bedrooms?.label}
          />
          <Dropdown
            options={bathroomOptions}
            className="mr-4"
            placeHolder="Bathrooms: -"
            handleSelect={(choice) => {
              setBathrooms(choice);
            }}
            initialSelect={bathrooms?.label}
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
        <SimpleBar style={{ maxHeight: 'calc(100vh - 155px)' }}>
          <div className="p-6">
            <div className="mb-4 text-gray-900 text-sm font-medium">
              {properties.TOTAL_COUNT.toLocaleString()} total properties
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
                    Showing <span className="font-medium">{getFromNumber()}</span> to{' '}
                    <span className="font-medium">{getToNumber()}</span> of{' '}
                    <span className="font-medium">{properties.TOTAL_COUNT.toLocaleString()}</span> results
                  </p>
                </div>
                <div className="flex flex-1 justify-between sm:justify-end">
                  {getFromNumber() != 1 && (
                    <a
                      href="#"
                      onClick={() => {
                        fetchProperties(page - 1);
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
                        fetchProperties(page + 1);
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
      ) : (
        <div className="p-6">
          <div className="flex items-center justify-center flex-col text-center mt-6">
            <img src={lookingForEmpty.src} alt="" />
            <div className="mt-6 text-sm">
              <div className="text-gray-900 font-medium">No matched properties for this contact yet.</div>
              <div className="text-gray-500 mt-[6px] font-light">
                Whenever we have properties that match these interests, we will list them here.
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default index;
