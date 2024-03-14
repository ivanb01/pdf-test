import Image from 'next/image';
import location from '../../../public/images/location.png';
import { formatPrice } from '@global/functions';

const PropertyMainDetails = ({ data }) => {
  const scrollToMap = () => {
    var element = document.querySelector('#map-section');
    element.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div className="flex md:flex-row flex-col justify-between border-gray2 border-b md:pb-0 pb-[20px]">
      <div className="md:py-5 pt-5">
        <div className="flex md:flex-row flex-col md:items-center items-start">
          <div className="order-2 md:order-1 text-[#111827] font-semibold md:mr-2 text-xl md:text-2xl">
            {data?.PROPERTY_TYPE} in {data?.ADDRESS}
          </div>
          <div
            className={`order-1 md:order-2 md:mb-0 mb-3 min-w-[90px] flex items-center justify-center border ${
              data?.STATUS?.toLowerCase() === 'sold' || data?.STATUS?.toLowerCase() === 'for sale'
                ? 'bg-indigo-50 border-indigo-600 text-indigo-600'
                : 'border-cyan-800 bg-cyan-50 text-cyan-800'
            } rounded-full h-fit px-2 py-1 text-xs font-medium`}>
            {data?.STATUS}
          </div>
        </div>
        <div className="flex items-center mt-3">
          <Image src={location} alt="" />
          <div
            className="ml-3 text-[#1F2937] md:text-base text-sm hover:underline cursor-pointer"
            onClick={() => scrollToMap()}>
            {data?.ADDRESS}, {data?.CITY}, {data?.STATE} {data?.ZIP_CODE}
          </div>
        </div>
      </div>
      <div>
        <div className="md:flex hidden mt-0 clipPath min-w-[285px] bg-[#EFF7FA] h-full px-4 items-center justify-end text-gray7 font-semibold text-xl">
          {formatPrice(data.PRICE)}
          {data.STATUS.toLowerCase() == 'for rent' && <span className="font-normal">&nbsp;monthly</span>}
        </div>
        <div className="md:hidden mt-3 min-w-[205px] h-full md:px-4 flex items-center md:justify-end text-gray7 font-semibold text-lg">
          {formatPrice(data.PRICE)}
          {data.STATUS.toLowerCase() == 'for rent' && <span className="font-normal">&nbsp;monthly</span>}
        </div>
      </div>
    </div>
  );
};

export default PropertyMainDetails;
