import Overlay from '@components/shared/overlay';
import Input from '@components/shared/input';
import TextArea from '@components/shared/textarea';
import Button from '@components/shared/button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { sendMarketingEmail } from '@api/marketing';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { AsyncPaginate } from 'react-select-async-paginate';
import LaunchIcon from '@mui/icons-material/Launch';
import fetchJsonp from 'fetch-jsonp';
import { getBaseUrl } from '@global/functions';
import useDebounce from '@helpers/hooks/useDebouncedSearch';

const validationSchemaWithListingUrl = Yup.object({
  listingUrl: Yup.string()
    .matches(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/, 'Invalid URL format')
    .required('Listing URL is required')
    .defined('Listing URL is required'),
  note: Yup.string().optional(),
});

const validationSchemaWithoutListingUrl = Yup.object({
  note: Yup.string().optional(),
});

const OrderTemplate = ({ template, name, handleCloseOverlay, listingUrl }) => {
  const user = useSelector((state) => state.global.user);

  const _sendMarketingEmail = async (body) => {
    try {
      return await sendMarketingEmail(body);
    } catch (e) {
      toast.error('Something went wrong');
    }
  };

  const formik = useFormik({
    initialValues: listingUrl === true ? { listingUrl: '', note: '' } : { note: '' },
    validationSchema: listingUrl === true ? validationSchemaWithListingUrl : validationSchemaWithoutListingUrl,
    onSubmit: (values) => {
      handleCloseOverlay();
      toast.success('Email was sent successfully!');
      const listingUrlContent = values.listingUrl
        ? `
    <div>
      <p>Here you can find  <a href='${values.listingUrl}'>Listing url</a></p>
    </div>
  `
        : '';

      const noteContent = values.note ? `<p>${values.note}</p>` : '';

      _sendMarketingEmail({
        to: ['marketing@opgny.com'],
        cc: [`${user}`],
        subject: `Order ${name && name}`,
        body: `<html>
<body>
<div>
   ${noteContent}
   ${listingUrlContent}
   </div>
    ${template
      .map(
        (image, index) => `
        <img src='${image}' alt='image ${index}' height='300' width='300' style='object-fit: contain;' />
          `,
      )
      .join('')}
   </body>
    </html>
  `,
      })
        .then(() => {})
        .catch(() => {
          toast.error('Something went wrong');
        })
        .finally(() => {});
    },
  });
  const [label, setLabel] = useState('');
  const [selectedProperty, setSelectedProperty] = useState();
  const [pagination, setPagination] = useState(1);
  const [debounced] = useDebounce(label, 300);

  const loadOptions = async (_, _unused, { inputValue }) => {
    console.log(inputValue, 'inp');
    let params = {
      apikey: '4d7139716e6b4a72',
      callback: 'callback',
      limit: 21,
      page: pagination,
    };
    if (inputValue?.length > 0) {
      params['address'] = inputValue;
      if (pagination !== 0) {
        setPagination(1);
      }
      params['page'] = pagination;
    } else if (inputValue?.length < 0) {
      setPagination(pagination);
    }
    const urlParams = new URLSearchParams({
      ...params,
    });

    const url = 'https://dataapi.realtymx.com/listings?' + urlParams.toString();
    console.log(url, 'url');
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

  useEffect(() => {
    console.log(formik.values.listingUrl);
  }, [formik.values]);
  return (
    <Overlay title={`Order ${name && name}`} handleCloseOverlay={handleCloseOverlay} className="w-[1000px]">
      <form onSubmit={formik.handleSubmit}>
        <div className={'flex gap-6 mr-6 ml-6 mb-8 mt-6'}>
          <div className={'flex-1 relative'}>
            <ImageGallery images={template} className={'object-contain'} includeZoom={false} />
          </div>
          <div className={'flex-1 '}>
            <div className={'flex flex-col gap-6 '}>
              <p className={'text-sm text-gray5 border rounded-xl border-lightBlue2 p-2 pl-4 bg-lightBlue1'}>
                Complete the fields below to customize and generate your listing's or general promotional materials,
                ready for both print and digital use. You will receive the file to your email within 24 Hours.
              </p>
              {listingUrl && (
                <>
                  <div>
                    <div className="block text-sm font-medium text-gray6 mb-1 mt-1">Search Properties</div>
                    <AsyncPaginate
                      loadOptions={loadOptions}
                      getOptionLabel={(option) => (
                        <div className={'flex gap-4'}>
                          <img
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
                          zIndex: 9999,
                        }),
                        singleValue: (base) => ({
                          ...base,
                          fontSize: '14px',
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
                            // background: '#F3F4F6 !important',
                            color: 'white !important',
                          },
                        }),
                        option: (base, state) => ({
                          ...base,
                          backgroundColor: 'white',
                          color: 'black',
                          fontWeight: state.data?.ID === selectedProperty?.ID ? '600' : '400',
                          '&:hover': {
                            background: '#F3F4F6 !important',
                            color: 'white !important',
                          },
                        }),
                      }}
                      onChange={(i) => {
                        setSelectedProperty(i == null ? undefined : i);
                        formik.setFieldValue(
                          'listingUrl',
                          i == null ? undefined : `${getBaseUrl()}/property?id=${i?.ID}`,
                        );
                      }}
                      onInputChange={(i) => {
                        setLabel(i);
                      }}
                      placeholder="Select Property"
                      isClearable
                      additional={{
                        page: 1,
                        inputValue: debounced,
                      }}
                    />
                    <div className="block text-sm font-medium text-gray6 mb-[-15px] mt-3">or</div>
                  </div>

                  <Input
                    type="text"
                    label="Listing URL"
                    required
                    disabled={selectedProperty}
                    value={formik.values.listingUrl ?? ''}
                    id="listingUrl"
                    onChange={(e) => {
                      formik.setFieldValue('listingUrl', e.target.value);
                    }}
                    error={formik.errors.listingUrl && formik.touched.listingUrl}
                    errorText={formik.errors.listingUrl}
                  />
                </>
              )}
              <TextArea
                className="min-h-[120px]"
                id="note"
                name="note"
                label="Note"
                value={formik.values.note}
                optional
                handleChange={formik.handleChange}
              />
            </div>
          </div>
        </div>
        <div
          className="flex items-end justify-end py-4 pr-6"
          style={{ boxShadow: '0px -2px 12px 1px rgba(0, 0, 0, 0.07)' }}>
          <Button className={`mr-4`} white onClick={handleCloseOverlay}>
            Cancel
          </Button>
          <Button primary type={'submit'} disabled={!formik.errors}>
            Send
          </Button>
        </div>
      </form>
    </Overlay>
  );
};

export default OrderTemplate;
export const ImageGallery = ({ images, className, includeZoom }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const showButtons = images?.length > 1;
  const showPrevButton = showButtons && currentIndex > 0;
  const showNextButton = showButtons && currentIndex < images.length - 1;
  const showNextImage = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const showPrevImage = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  return (
    <>
      {includeZoom ? (
        <Zoom zoomMargin={45}>
          <img className={`${className} w-full rounded-lg`} src={images[currentIndex]} style={{ height: '500px' }} />
        </Zoom>
      ) : (
        <img className={`${className} w-full rounded-lg`} src={images[currentIndex]} style={{ height: '500px' }} />
      )}

      {showPrevButton && (
        <div
          className={
            'absolute top-[50%] left-[20px] h-[30px] w-[30px] rounded-full bg-black bg-opacity-60 flex items-center justify-center text-white cursor-pointer'
          }>
          <KeyboardArrowLeftIcon onClick={() => showPrevImage()} />
        </div>
      )}
      {showNextButton && (
        <div
          className={
            'absolute right-[20px] top-[50%] h-[30px] w-[30px] rounded-full bg-black bg-opacity-60 flex items-center justify-center text-white cursor-pointer'
          }>
          <KeyboardArrowRightIcon onClick={() => showNextImage()} />
        </div>
      )}
    </>
  );
};
