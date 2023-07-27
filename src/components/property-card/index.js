import { formatPrice } from '@global/functions';
import room from '/public/images/room.svg';
import bathroom from '/public/images/bathroom.svg';
import sqft from '/public/images/sqft.svg';
import share from '/public/images/share.svg';

const PropertyCard = ({ property }) => {
  return (
    <div className="border border-gray-200 rounded-[4px]">
      <div className="h-[160px] relative">
        <img
          className="object-cover h-full w-full"
          src={property.PHOTOS[0].PHOTO_URL}></img>
        <div className="flex items-center justify-between absolute bottom-2 left-2 right-2">
          <div className="flex items-center justify-center border border-cyan-800 bg-cyan-50 rounded-full text-cyan-800 h-fit px-2 py-1 text-[10px] font-medium">
            for Rent
          </div>
          <img className="h-7 w-7" src={share.src} alt="" />
        </div>
      </div>
      <div className="p-3 text-sm">
        <div className="mb-4">
          <div className="font-semibold text-black mb-[6px]">
            {property.PROPERTY_TYPE} in {property.ADDRESS}
          </div>
          <div className=" text-gray-600">
            {property.ADDRESS}, {property.CITY}, {property.STATE}{' '}
            {property.ZIP_CODE}
          </div>
        </div>
        <div className="mb-3 flex font-medium">
          <div className="mr-3 bg-gray-100 text-gray-500 flex items-center p-[6px] rounded-[4px]">
            <img className="mr-2" src={room.src} alt="" />
            {property.TOTAL_ROOMS}
          </div>
          <div className="mr-3 bg-gray-100 text-gray-500 flex items-center p-[6px] rounded-[4px]">
            <img className="mr-2" src={bathroom.src} alt="" />
            {property.BATHROOMS}
          </div>
          <div className="bg-gray-100 text-gray-500 flex items-center p-[6px] rounded-[4px]">
            <img className="mr-1" src={sqft.src} alt="" />
            {property.SQUARE_FOOTAGE} sqft
          </div>
        </div>
        <div className="font-semibold text-gray-900 text-base">
          {formatPrice(property.PRICE)}
          {property.STATUS.toLowerCase() == 'for rent' && (
            <span className="text-gray-500 font-normal">/month</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
