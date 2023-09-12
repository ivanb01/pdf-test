import { formatPrice, getBaseUrl } from '@global/functions';
import room from '/public/images/room.svg';
import bathroom from '/public/images/bathroom.svg';
import sqft from '/public/images/sqft.svg';
import share from '/public/images/share.svg';
import placeholder from '/public/images/img-placeholder.png';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import link from '/public/images/link-2.svg';
import { useEffect, useState } from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

const ImageGallery = ({ images, id }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const showButtons = images.length > 1;
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
      <a href={`${getBaseUrl()}/property?id=${id}`} target="_blank">
        <img
          className="object-cover h-full w-full"
          src={images.length > 0 ? images[currentIndex].PHOTO_URL : placeholder.src}
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

const PropertyCard = ({ property }) => {
  const router = useRouter();

  return (
    <div className="border border-gray-200 rounded-[4px]">
      <div className="h-[160px] relative">
        <ImageGallery images={property.PHOTOS} id={property.ID} />
        <div className="absolute bottom-2 left-2 flex items-center justify-center border border-cyan-800 bg-cyan-50 rounded-full text-cyan-800 h-fit px-2 py-1 text-[10px] font-medium">
          {property.STATUS}
        </div>
        <a
          className="cursor-pointer absolute bottom-2 right-2"
          onClick={() => {
            navigator.clipboard.writeText(`${getBaseUrl()}/property?id=${property.ID}`);
            toast.success('Link copied to clipboard');
          }}>
          <img className="h-7 w-7" src={link.src} alt="" />
        </a>
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
          <div className="mr-3 bg-gray-100 text-gray-500 flex items-center p-[6px] rounded-[4px]">
            <img className="mr-2" src={room.src} alt="" />
            {property.BEDROOMS}
          </div>
          <div className="mr-3 bg-gray-100 text-gray-500 flex items-center p-[6px] rounded-[4px]">
            <img className="mr-2" src={bathroom.src} alt="" />
            {property.BATHROOMS}
          </div>
          {property.SQUARE_FOOTAGE != 0 && (
            <div className="bg-gray-100 text-gray-500 flex items-center p-[6px] rounded-[4px]">
              <img className="mr-1" src={sqft.src} alt="" />
              {property.SQUARE_FOOTAGE} sqft
            </div>
          )}
        </div>
        <div className="font-semibold text-gray-900 text-base">
          {formatPrice(property.PRICE)}
          {property.STATUS.toLowerCase() == 'for rent' && <span className="text-gray-500 font-normal">/month</span>}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
