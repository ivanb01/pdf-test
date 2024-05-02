import Overlay from '@components/shared/overlay';
import Input from '@components/shared/input';
import TextArea from '@components/shared/textarea';
import Button from '@components/shared/button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, {  useState } from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { sendMarketingEmail } from '@api/marketing';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import AsyncDropdown from '@components/marketing/AsyncDropdown';

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
        .then(() => {
        })
        .catch(() => {
          toast.error('Something went wrong');
        })
        .finally(() => {
        });
    },
  });
  const [selectedProperty, setSelectedProperty] = useState();

  const updateSelectedProperty = (i) => {
    setSelectedProperty(i == null ? undefined : i);
  };
  return (
    <Overlay title={`Order ${name && name}`} handleCloseOverlay={handleCloseOverlay} className='w-[1000px]'>
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
                  <AsyncDropdown formik={formik} updateSelectedProperty={updateSelectedProperty}
                                 selectedProperty={selectedProperty} />
                  <Input
                    type='text'
                    label='Listing URL'
                    required
                    disabled={selectedProperty}
                    value={formik.values.listingUrl ?? ''}
                    id='listingUrl'
                    onChange={(e) => {
                      formik.setFieldValue('listingUrl', e.target.value);
                    }}
                    error={formik.errors.listingUrl && formik.touched.listingUrl}
                    errorText={formik.errors.listingUrl}
                  />
                </>
              )}
              <TextArea
                className='min-h-[120px]'
                id='note'
                name='note'
                label='Note'
                value={formik.values.note}
                optional
                handleChange={formik.handleChange}
              />
            </div>
          </div>
        </div>
        <div
          className='flex items-end justify-end py-4 pr-6'
          style={{ boxShadow: '0px -2px 12px 1px rgba(0, 0, 0, 0.07)' }}>
          <Button className={`mr-4`} white onClick={handleCloseOverlay}>
            Cancel
          </Button>
          <Button primary type={'submit'}>
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
