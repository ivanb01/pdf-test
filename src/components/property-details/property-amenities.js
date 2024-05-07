import Image from 'next/image';
import fireplace from '../../../public/images/property/fireplace.svg';
import childrenPlayroom from '../../../public/images/property/childrenPlayroom.svg';
import furnished from '../../../public/images/property/funished.svg';
import healthClub from '../../../public/images/property/healthClub.svg';
import nursey from '../../../public/images/property/nursey.svg';
import wifi from '../../../public/images/property/wifi.svg';
import balcony from '../../../public/images/property/balcony.svg';
import concierge from '../../../public/images/property/concierge.svg';
import garage from '../../../public/images/property/garage.svg';
import laundry from '../../../public/images/property/laundry.svg';
import pool from '../../../public/images/property/pool.svg';
import lounge from '../../../public/images/property/lounge.svg';
import bicycleRoom from '../../../public/images/property/bicycleroom.svg';
import doorman from '../../../public/images/property/doorman.svg';
import garden from '../../../public/images/property/garden.svg';
import microwave from '../../../public/images/property/microwave.svg';
import storage from '../../../public/images/property/storage.svg';
import elevator from '../../../public/images/property/elevator.svg';

const PropertyAmenities = ({ data }) => {
  const differentiateAmenities = (amenities) => {
    const mainAmenities = [
      'Fireplace',
      'Children Playroom',
      'Furnished',
      'Health Club',
      'Nursery',
      'WiFi',
      'Balcony',
      'Concierge',
      'Garage',
      'Laundry',
      'Pool',
      'Lounge',
      'Bicycle Room',
      'Doorman',
      'Garden',
      'Microwave',
      'Storage',
      'Elevator',
    ];

    const allAmenities = amenities.split(',').map((item) => item.trim().toLowerCase());

    const mainAmenitiesPerProperty = mainAmenities.filter((mainAmenity) =>
      allAmenities.some((amenity) => amenity.toLowerCase().includes(mainAmenity.toLowerCase())),
    );

    const remainingAmenities = allAmenities.filter(
      (amenity) =>
        !mainAmenitiesPerProperty.some((mainAmenity) => amenity.toLowerCase().includes(mainAmenity.toLowerCase())),
    );

    const capitalizeFirstLetterOfEachWord = (str) =>
      str.toLowerCase().replace(/(^|\s)\S/g, (match) => match.toUpperCase());

    const capitalizedRemainingAmenities = remainingAmenities.map(capitalizeFirstLetterOfEachWord);

    return { mainAmenitiesPerProperty, capitalizedRemainingAmenities };
  };
  const propertyAmenities = [
    {
      name: 'Fireplace',
      icon: fireplace,
    },
    {
      name: 'Children Playroom',
      icon: childrenPlayroom,
    },
    {
      name: 'Furnished',
      icon: furnished,
    },
    {
      name: 'Health Club',
      icon: healthClub,
    },
    {
      name: 'Nursery',
      icon: nursey,
    },
    {
      name: 'WiFi',
      icon: wifi,
    },
    {
      name: 'Balcony',
      icon: balcony,
    },
    {
      name: 'Concierge',
      icon: concierge,
    },
    { name: 'Garage', icon: garage },
    {
      name: 'Laundry',
      icon: laundry,
    },
    {
      name: 'Pool',
      icon: pool,
    },
    {
      name: 'Lounge',
      icon: lounge,
    },
    {
      name: 'Bicycle Room',
      icon: bicycleRoom,
    },
    {
      name: 'Doorman',
      icon: doorman,
    },
    {
      name: 'Garden',
      icon: garden,
    },
    {
      name: 'Microwave',
      icon: microwave,
    },
    { name: 'Storage', icon: storage },
    { name: 'Elevator', icon: elevator },
  ];

  return (
    (differentiateAmenities(data.AMENITIES).mainAmenitiesPerProperty.length > 0 ||
      differentiateAmenities(data.AMENITIES).capitalizedRemainingAmenities.length > 0) && (
      <div className="mt-10">
        <div className="text-gray7 text-xl mb-4 font-medium">Property Amenities</div>
        <div className={'w-[700px]'}>
          {differentiateAmenities(data.AMENITIES).mainAmenitiesPerProperty.length > 0 && (
            <div className="grid grid-cols-3 gap-6 items-center mb-6">
              {differentiateAmenities(data.AMENITIES).mainAmenitiesPerProperty.length > 0 &&
                differentiateAmenities(data.AMENITIES).mainAmenitiesPerProperty.map((amenity, index) => {
                  const matchedAmenity = propertyAmenities?.find(
                    (item) => item.name.toLowerCase() === amenity.toLowerCase(),
                  );
                  return (
                    <div className="flex-1 flex items-center gap-1.5 text-[#111827]" key={index}>
                      {matchedAmenity && <Image src={matchedAmenity.icon} />}
                      {matchedAmenity && <span>{matchedAmenity.name}</span>}
                    </div>
                  );
                })}
            </div>
          )}
          <div className={'flex flex-wrap'} style={{ gap: '5px' }}>
            {differentiateAmenities(data.AMENITIES).capitalizedRemainingAmenities.length > 0 &&
              differentiateAmenities(data.AMENITIES).capitalizedRemainingAmenities.map(
                (remaining, index) =>
                  remaining.length > 0 && (
                    <div
                      key={index}
                      style={{ borderRadius: '20px' }}
                      className={'mb-2 text-gray6 border border-solid border-borderColor bg-gray1 '}
                    >
                      <p className={'text-sm leading-4 font-medium px-[10px] py-1.5 text-gray-6'}> {remaining}</p>
                    </div>
                  ),
              )}
          </div>
        </div>
      </div>
    )
  );
};

export default PropertyAmenities;
