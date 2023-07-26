import { formatPrice } from '@global/functions';
const PropertyCard = ({ property }) => {
  return (
    <div className="border border-gray-200 rounded-[4px]">
      <div className="h-[160px]">
        <img
          className="object-cover h-full w-full"
          src={property.PHOTOS[0].PHOTO_URL}></img>
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
        <div className="mb-3"></div>
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
