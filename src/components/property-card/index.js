import { formatPrice, getBaseUrl } from '@global/functions';
import room from '/public/images/room.svg';
import bathroom from '/public/images/bathroom.svg';
import sqft from '/public/images/sqft.svg';
import placeholder from '/public/images/img-placeholder.png';
import { toast } from 'react-hot-toast';
import link from '/public/images/link-2.svg';
import { useState } from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { ExclamationCircleIcon } from '@heroicons/react/solid';
import TooltipComponent from '@components/shared/tooltip';

const ImageGallery = ({ images, property, url }) => {
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
      <a href={url} target="_blank" rel="noreferrer">
        <img
          className="object-cover h-full w-full"
          src={images?.length > 0 ? images[currentIndex].PHOTO_URL : placeholder.src}
          alt="Gallery Image"
        />
      </a>
      {showPrevButton && (
        <div
          className={
            'absolute top-[65px] left-3 h-[30px] w-[30px] rounded-full bg-black bg-opacity-60 flex items-center justify-center text-white cursor-pointer'
          }>
          <KeyboardArrowLeftIcon onClick={() => showPrevImage()} />
        </div>
      )}
      {showNextButton && (
        <div
          className={
            'absolute right-3 top-[65px] h-[30px] w-[30px] rounded-full bg-black bg-opacity-60 flex items-center justify-center text-white cursor-pointer'
          }>
          <KeyboardArrowRightIcon onClick={() => showNextImage()} />
        </div>
      )}
    </>
  );
};

const PropertyCard = ({ property, selected, setSelected }) => {
  let status = '';
  if (property.STATUS == 'Rented') {
    status = '&status=22';
  } else if (property.STATUS == 'Sold') {
    status = '&status=19';
  }
  let url = `${getBaseUrl()}/property?id=${property.ID}` + status;

  return (
    <div
      className={`border transition-all border-gray-200 rounded-[4px] ${
        selected && ' border border-lightBlue3 custom-box-shadow'
      }`}>
      <div className="h-[160px] relative">
        <ImageGallery images={property.PHOTOS} property={property} url={url} />
        <div
          className={`absolute bottom-2 left-2 flex items-center justify-center border ${
            property.STATUS.toLowerCase() === 'sold'
              ? 'bg-indigo-50 border-indigo-600 text-indigo-600'
              : 'border-cyan-800 bg-cyan-50'
          } rounded-full text-cyan-800 h-fit px-2 py-1 text-[10px] font-medium`}>
          {property.STATUS}
        </div>
        <TooltipComponent
          side={'bottom'}
          align={'center'}
          triggerElement={
            <a
              className="cursor-pointer absolute bottom-2 right-2"
              onClick={() => {
                navigator.clipboard.writeText(url);
                toast.success('Link copied to clipboard');
              }}>
              <img className="h-7 w-7" src={link.src} alt="" />
            </a>
          }>
          <p className={'text-[10px]  text-white font-medium'}>Copy Link</p>
        </TooltipComponent>
      </div>
      <div className="p-3 text-sm">
        <div className="mb-4">
          <div className="font-semibold text-black mb-[6px]">
            {property.PROPERTY_TYPE} in {property.ADDRESS}
          </div>
          <div className=" text-gray-600">
            {property.ADDRESS} <br />
            {property.NEIGHBORHOODS}, {property.CITY}, {property.STATE} {property.ZIP_CODE}
          </div>
        </div>
        <div className="mb-3 flex font-medium">
          <div className="mr-3 bg-gray-100 text-gray-500 flex items-center p-[6px] rounded-[222px]">
            <img className="mr-2" src={room.src} alt="" />
            {property.BEDROOMS}
          </div>
          <div className="mr-3 bg-gray-100 text-gray-500 flex items-center p-[6px] rounded-[222px]">
            <img className="mr-2" src={bathroom.src} alt="" />
            {property.BATHROOMS}
          </div>
          {property.SQUARE_FOOTAGE != 0 && (
            <div className="bg-gray-100 text-gray-500 flex items-center p-[6px] rounded-[222px]">
              <img className="mr-1" src={sqft.src} alt="" />
              {property.SQUARE_FOOTAGE} sqft
            </div>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div className="font-semibold text-gray-900 text-base">
            {formatPrice(property.PRICE)}
            {property.STATUS.toLowerCase() == 'for rent' && <span className="text-gray-500 font-normal">/month</span>}
          </div>
          <div class="form-checkbox">
            <input
              type="checkbox"
              id={`checkbox-${property.ID}`}
              class="hidden"
              onChange={(event) => {
                if (event.target.checked) {
                  setSelected((prevSelected) => [...prevSelected, property]);
                } else {
                  setSelected((prevSelected) => prevSelected.filter((item) => item !== property));
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
      </div>
    </div>
  );
};

export default PropertyCard;
