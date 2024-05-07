import React, { useState } from 'react';
import fetchJsonp from 'fetch-jsonp';
import { AsyncPaginate } from 'react-select-async-paginate';
import LaunchIcon from '@mui/icons-material/Launch';
import { getBaseUrl } from '@global/functions';

const AsyncDropdown = ({ formik, updateSelectedProperty, selectedProperty }) => {
  const [label, setLabel] = useState('');
  const [pagination, setPagination] = useState(1);

  const loadOptions = async () => {
    let params = {
      apikey: '4d7139716e6b4a72',
      callback: 'callback',
      limit: 21,
      page: pagination,
    };

    if (label?.length > 0) {
      params['address'] = label
      if (pagination !== 0) {
        setPagination(1);
      }
      params['page'] = pagination;
    } else if (label?.length < 0) {
      setPagination(pagination);
      params['address'] = undefined
    }
    const urlParams = new URLSearchParams({
      ...params,
    });

    const url = 'https://dataapi.realtymx.com/listings?' + urlParams.toString();
    const data = await fetchJsonp(url)
      .then((res) => res.json())
      .then((data) => {
        if (data?.LISTINGS.length > 0) {
          setPagination(pagination + 1);
        }
        return data;
      })
      .catch((error) => {
        console.log(error, 'error');
      });

    return {
      options: data?.LISTINGS ?? [],
      hasMore: data?.LISTINGS.length > 0,
    };
  };


  return <div>
    <div className='block text-sm font-medium text-gray6 mb-1 mt-1'>Search Properties</div>
    <AsyncPaginate
      debounceTimeout={200}
      loadOptions={loadOptions}
      getOptionLabel={(option) => (
        <div className={'flex gap-4 h-[40px]'}>
          <img
            alt={''}
            src={option?.PHOTOS?.length > 0 ? option?.PHOTOS[0]?.PHOTO_URL : ''}
            height={40}
            width={50}
          />
          <div className={'text-gray-600 text-sm flex items-center justify-between flex-1 w-[100%]'}>
            {option?.ADDRESS} <br />
            {option?.NEIGHBORHOODS}, {option?.CITY}, {option?.STATE} {option?.ZIP_CODE}
            <div>
              <LaunchIcon
                className={'h-4 w-4 cursor-pointer'}
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(`${getBaseUrl()}/property?id=${option?.ID}`);
                }}
              />
            </div>
          </div>
        </div>
      )}
      isSearchable
      styles={{
        input: (base) => ({
          ...base,
          input: {
            fontSize: '14px !important',
            borderColor: 'transparent !important',
            '&:focus': {
              borderColor: 'transparent !important',
              boxShadow: 'none !important',
              '--tw-ring-color': 'transparent !important',
            },
          },
        }),
        placeholder: (base) => ({
          ...base,
          fontSize: '14px',
        }),
        control: (base) => ({
          ...base,
          borderRadius: '8px',
          borderColor: '#D1D5DB',
        }),
        singleValue: (base) => ({
          ...base,
          fontSize: '14px',
          zIndex: 9999999999,
        }),
        menu: (base) => ({
          ...base,
          fontSize: '14px',
          borderRadius: 5,
          zIndex: 99,
        }),
        menuList: (base) => ({
          ...base,
          borderRadius: 5,
          maxHeight: '300px',
          '&:hover': {
            color: 'white !important',
          },
        }),
        option: (base, state) => ({
          ...base,
          backgroundColor: 'white',
          color: 'black',
          fontWeight: state.data?.ID === selectedProperty?.ID ? '600' : '400',
          background: state.data?.ID === selectedProperty?.ID ? '#F3F4F6' : 'white',
          '&:hover': {
            background: '#F3F4F6 !important',
            color: 'white !important',
          },
        }),
      }}
      onChange={(i) => {
        updateSelectedProperty(i);
        formik.setFieldValue(
          'listingUrl',
          i == null ? undefined : `${getBaseUrl()}/property?id=${i?.ID}`,
        );
      }}
      onInputChange={(i) => {
        setLabel(i);
      }}
      placeholder='Select Property'
      isClearable
    />
    <div className='block text-sm font-medium text-gray6 mb-[-15px] mt-3'>or</div>
  </div>;
};
export default AsyncDropdown;