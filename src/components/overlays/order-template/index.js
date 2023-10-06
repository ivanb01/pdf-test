import Overlay from '@components/shared/overlay';
import Input from '@components/shared/input';
import TextArea from '@components/shared/textarea';
import Button from '@components/shared/button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
const validationSchemaWithListingUrl = Yup.object({
  listingUrl: Yup.string().url('Invalid URL format').required('Listing URL is required'),
  note: Yup.string().optional(),
});
const validationSchemaWithoutListingUrl = Yup.object({
  note: Yup.string().optional(),
});
const OrderTemplate = ({ template, name, handleCloseOverlay, listingUrl }) => {
  const formik = useFormik({
    initialValues: {
      listingUrl: '',
      note: '',
    },
    validationSchema: listingUrl ? validationSchemaWithListingUrl : validationSchemaWithoutListingUrl,
    onSubmit: (values) => {
      handleCloseOverlay();
      console.log(values, 'values');
    },
  });

  return (
    <Overlay title={`Order ${name && name}`} handleCloseOverlay={handleCloseOverlay} className="w-[1000px]">
      <form onSubmit={formik.handleSubmit}>
        <div className={'flex gap-6 mr-6 ml-6 mb-8 mt-6'}>
          <div className={'flex-1 relative'}>
            <ImageGallery images={template} className={'object-cover'} includeZoom={false} />
          </div>
          <div className={'flex-1 '}>
            <div className={'flex flex-col gap-6 '}>
              {/*<div className={'grid grid-cols-2 gap-6'}>*/}
              {/*  <Input type="text" label="Name" id="name" />*/}
              {/*  <Input type="text" label="Lastname" id="lastname" />*/}
              {/*</div>*/}
              {/*<div className={'grid grid-cols-2 gap-6'}>*/}
              {/*  <Input type="email" label="Email address" id="email" />*/}
              {/*  <Input type="text" label="Phone Number" id="phoneNumber" optional />*/}
              {/*</div>*/}
              {listingUrl && (
                <Input
                  type="text"
                  label="Listing url"
                  id="listingUrl"
                  onChange={formik.handleChange}
                  error={formik.errors.listingUrl && formik.touched.listingUrl}
                  errorText={formik.errors.listingUrl}
                />
              )}
              <TextArea
                className="min-h-[120px]"
                id="note"
                label="Note"
                optional
                onChange={formik.handleChange}></TextArea>
              {/*<div className={'grid grid-cols-2 gap-6'}>*/}
              {/*  <Input*/}
              {/*    type="date"*/}
              {/*    label="I need this to be ready until"*/}
              {/*    id="date"*/}
              {/*    className={'col-span-1'}*/}
              {/*    placeholder={'mm/dd/yyyy'}*/}
              {/*  />*/}
              {/*</div>*/}
            </div>
          </div>
        </div>
        <div
          className="flex items-end justify-end py-4 pr-6"
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
          <img
            className={`${className} w-full rounded-lg`}
            src={images[currentIndex].src}
            style={{ height: '500px' }}
          />
        </Zoom>
      ) : (
        <img className={`${className} w-full rounded-lg`} src={images[currentIndex].src} style={{ height: '500px' }} />
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
