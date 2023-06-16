import oneLineLogo from 'public/images/oneline-logo.svg';
import one from 'public/images/property/1.png';
import two from 'public/images/property/2.png';
import three from 'public/images/property/3.png';
import four from 'public/images/property/4.png';
import five from 'public/images/property/5.png';
import Image from 'next/image';
import location from 'public/images/location.png';
import { useState } from 'react';
import rooms from 'public/images/property/rooms.svg';
import beds from 'public/images/property/beds.svg';
import bathrooms from 'public/images/property/bathrooms.svg';
import balcony from 'public/images/property/balcony.svg';
import ac from 'public/images/property/ac.svg';
import backyard from 'public/images/property/backyard.svg';
import tv from 'public/images/property/tv.svg';
import smoke from 'public/images/property/smoke.svg';
import pets from 'public/images/property/pets.svg';
import fridge from 'public/images/property/fridge.svg';
import propertyLocation from 'public/images/property/location.png';
import SimpleBar from 'simplebar-react';
import ArrowForward from '@mui/icons-material/ArrowForward';
import { useRef, useMemo } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

const index = () => {
  const scrollElement = useRef(null);
  const pictures = [one, one, one, one, one, one, one, one];

  const [data, setData] = useState({
    ismls: 0,
    iscompany: 1,
    financials_freemonth: 0,
    main_zipcode: '10023',
    agents_coagent_phone: '',
    essentials_rooms: 10,
    extras_latitude: 40.772495,
    families: 0,
    built: 2002,
    agents_agent_name: 'Listing Manager',
    essentials_beds: 4.5,
    agents_coagent_name: '',
    idx: 0,
    agents_coagent_image: '',
    agents_coagent_id: '',
    essentials_video: '',
    lease_term_min: 12,
    essentials_size: 0,
    extras_openhouse: 0,
    agents_coagent_email: '',
    main_image:
      'https://images.realty.mx/618441d41cce47dbcfd9bed6e5ff64e6/images/assets/245748_56272005.jpg',
    main_street: 'Broadway',
    main_id: 245748,
    lease_term_max: 12,
    essentials_bath: 4.5,
    vow: 0,
    main_apt: '28G/28H',
    extras_nofee: 0,
    available_date: 'Immediately',
    extras_featured: 0,
    financials_monthsfreereqminlease: 0,
    financials_concession: '',
    main_cross: 'W 64TH & W 65TH ST.',
    essentials_units: 0,
    extras_webtitle: '',
    agents_agent_email: 'applymedia@gmail.com',
    main_hide_address: 1,
    agents_agent_id: 1,
    access_note: '212-769-1930',
    main_status: 'For Rent',
    essentials_type: 'Apartment',
    main_category: 0,
    agents_agent_phone: '646.723.2345',
    main_neighborhood: 'Upper West Side',
    main_address: 'W 64TH & W 65TH ST. Upper West Side',
    main_house: '1930',
    essentials_pets: 'Pets OK',
    city: 'New York',
    financials_price: 36900,
    extras_longitude: -73.98187,
    financials_taxes: 0,
    date_update: 'June, 12 2023 14:12:00',
    mls_no: '',
    agents_agent_image: '',
    description:
      'This is a unique opportunity to own two adjacent buildings in the heart of NYC. 662 9th Avenue is an eight family with a commercial downstairs and two cell towers on top while 373 46th Street is a four floor fully commercial building. There is significant upside for the right developer to build up an additional 5000sqFt over 662 9th Avenue & potentially more when you combine 373 46th street which is next door to 662 9th avenue. Property has new boiler, gas lines, new intercom systems in all units, new roof & electric stoves in all residential units. Both properties can be delivered fully vacant or left as is. A Time Square area expansion is also being considered and this building would fall under the re-zone. Pro Forma / current RR available on request.',
  });

  const [propertyDetails, setPropertyDetails] = useState([
    {
      id: 0,
      name: 'Rooms',
      value: data.essentials_rooms,
      icon: rooms,
    },
    {
      id: 1,
      name: 'Beds',
      value: data.essentials_beds,
      icon: beds,
    },
    {
      id: 2,
      name: 'Bathrooms',
      value: data.essentials_bath,
      icon: bathrooms,
    },
    // {
    //   id: 3,
    //   name: 'Balcony',
    //   value: data.,
    //   icon: balcony,
    // },
  ]);
  const [propertyAmenities, setPropertyAmenities] = useState([
    {
      id: 0,
      name: 'TV',
      value: true,
      icon: tv,
    },
    {
      id: 1,
      name: 'Air Conditioning',
      value: true,
      icon: ac,
    },
    {
      id: 2,
      name: 'Pets',
      value: true,
      icon: pets,
    },
    {
      id: 3,
      name: 'Refrigerator',
      value: true,
      icon: fridge,
    },
    {
      id: 4,
      name: 'Back Yard',
      value: true,
      icon: backyard,
    },
    {
      id: 5,
      name: 'Smoke Alarm',
      value: true,
      icon: smoke,
    },
  ]);
  const [otherDetails, setOtherDetails] = useState([
    {
      id: 0,
      name: 'Available Date',
      value: '01/01/2023',
    },
    {
      id: 1,
      name: 'RE Taxes',
      value: '$85,156',
    },
    {
      id: 2,
      name: 'Floors/Apts',
      value: '5/8',
    },
    {
      id: 3,
      name: 'Ownership Type',
      value: 'Income Property',
    },
    {
      id: 4,
      name: 'Building Type',
      value: 'Pre-War Low-Rise',
    },
    {
      id: 5,
      name: 'Service Level',
      value: 'Video Intercom',
    },
    {
      id: 6,
      name: 'Black/Lot',
      value: '1037/1',
    },
    {
      id: 7,
      name: 'Approx SF',
      value: '3,450',
    },
    {
      id: 8,
      name: 'Lot Size (W x D)',
      value: '60’x100’',
    },
    {
      id: 9,
      name: 'Year Built',
      value: '1920',
    },
  ]);

  const scrollRight = () => {
    if (window.innerWidth < 767) {
      document.querySelector('.simplebar-content-wrapper').scrollLeft += 438;
    } else {
      document.querySelector('.simplebar-content-wrapper').scrollLeft += 500;
    }
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg',
  });
  const center = useMemo(
    () => ({ lat: data.extras_latitude, lng: data.extras_longitude }),
    []
  );

  return (
    <>
      <div className="bg-white p-6 flex items-center properties-container">
        <Image src={oneLineLogo} alt="" className="h-[20px] w-full" />
      </div>
      <div className="flex md:h-[500px] h-[300px] relative">
        <div
          onClick={scrollRight}
          className="cursor-pointer animate-bounce z-10 absolute top-1/2 -translate-y-1/2 right-5 bg-[#00000099] flex items-center justify-center md:p-4 p-2 rounded-full"
        >
          <ArrowForward className="text-white md:text-2xl text-sm" />
        </div>
        {pictures.length == 1 ? (
          <div className="w-full h-full pr-3">
            <img
              src={pictures[0].src}
              // style={{ backgroundImage: `url("${pictures[0]}")` }}
              className="object-cover w-full h-full object-center"
            />
          </div>
        ) : pictures.length == 2 ? (
          <>
            <div className="md:w-1/2 w-full h-full pr-3">
              <img
                src={pictures[0].src}
                // style={{ backgroundImage: `url("${pictures[0]}")` }}
                className="object-cover w-full h-full object-center"
              />
            </div>
            <div className="md:w-1/2 w-full h-full">
              <img
                src={pictures[1].src}
                // style={{ backgroundImage: `url("${pictures[0]}")` }}
                className="object-cover w-full h-full object-center"
              />
            </div>
          </>
        ) : (
          <>
            <SimpleBar className="w-full d-webkit overflow-y-hidden">
              <div className="w-full d-webkit h-full">
                {pictures.map((picture, index) => (
                  <div key={index} className="mr-3 last:mr-0 md:w-2/5 w-full">
                    <img
                      src={picture.src}
                      alt={`Image ${index + 1}`}
                      className="object-cover w-full h-full object-center"
                    />
                  </div>
                ))}
              </div>
            </SimpleBar>
          </>
        )}
        {/* <div className="w-1/2 h-full pr-3 left-image">
          <Image
            src={pictures[0]}
            // style={{ backgroundImage: `url("${pictures[0]}")` }}
            className="next-image h-full w-full bg-cover bg-no-repeat"
          />
        </div>
        <div className="w-1/2 grid grid-cols-2 grid-rows-2 gap-3">
          {pictures.slice(1).map((picture, index) => (
            <Image
              key={index}
              src={picture}
              // style={{ backgroundImage: `url("${picture}")` }}
              className="h-full bg-cover bg-no-repeat"
            />
          ))}
        </div> */}
      </div>
      <div className="properties-container">
        <div className="flex md:flex-row flex-col justify-between border-gray2 border-b md:pb-0 pb-[20px]">
          <div className="md:py-5 pt-5">
            <div className="flex md:flex-row flex-col md:items-center items-start">
              <div className="order-2 md:order-1 text-[#111827] font-semibold md:mr-2 text-xl md:text-2xl">
                {data.essentials_type} {data.main_status} in{' '}
                {data.main_neighborhood}
              </div>
              <div className="order-1 md:order-2 md:mb-0 mb-3 min-w-[90px] flex items-center justify-center border border-[#0891B2] bg-[#ECFEFF] rounded-full text-[#155E75] h-fit px-2 py-1 text-xs font-medium">
                {data.main_status}
              </div>
            </div>
            <div className="flex items-center mt-3">
              <Image src={location} alt="" />
              <div className="ml-3 text-[#1F2937] md:text-base text-sm">
                {data.main_address}
              </div>
            </div>
          </div>
          <div>
            <div className="md:flex hidden mt-0 clip-path min-w-[205px] bg-[#EFF7FA] h-full px-4 items-center justify-end text-gray7 font-semibold text-xl">
              $1,250 <span className="font-normal">&nbsp;month</span>
            </div>
            <div className="md:hidden mt-3 min-w-[205px] h-full md:px-4 flex items-center md:justify-end text-gray7 font-semibold text-lg">
              $1,250 <span className="font-normal">&nbsp;month</span>
            </div>
          </div>
        </div>
        <div className="max-w-[700px] md:mt-10 mt-5 pb-10">
          <div className="property-details">
            <div className="text-gray7 text-xl mb-6 font-medium">
              Property Details
            </div>
            <div className="flex">
              {propertyDetails.map(
                (propertyDetail) =>
                  propertyDetail.value != 0 && (
                    <div className="flex mr-6 items-center">
                      <div className="md:block hidden">
                        <Image src={propertyDetail.icon} />
                      </div>
                      <span className="md:mx-2 mr-2 font-semibold">
                        {propertyDetail.value}
                      </span>
                      {propertyDetail.name}
                    </div>
                  )
              )}
            </div>
            <div className="mt-6">{data.description}</div>
          </div>
          <div className="mt-10">
            <div className="text-gray7 text-xl mb-6 font-medium">
              Property Amenities
            </div>
            <div className="flex flex-wrap">
              {propertyAmenities.map(
                (amenity) =>
                  amenity.value && (
                    <div className="flex w-1/2 md:w-1/3 mb-4 px-2">
                      <Image src={amenity.icon} />
                      <span className="ml-2">{amenity.name}</span>
                    </div>
                  )
              )}
            </div>
          </div>
          <div className="mt-10">
            <div className="text-gray7 text-xl mb-6 font-medium">
              Other Details
            </div>
            <div className="flex flex-wrap">
              {otherDetails.map(
                (detail) =>
                  detail.value && (
                    <div className="md:w-1/4 sm:w-1/3 w-1/2 mb-4">
                      <div className="text-gray4 text-sm">{detail.name}</div>
                      <div className="text-sm text-gray7 mt-1">
                        {detail.value}
                      </div>
                    </div>
                  )
              )}
            </div>
          </div>
          <div className="mt-10 mb-[100px]">
            <div className="text-gray7 text-xl font-medium">
              Property Location
            </div>
            <div className="text-gray5 my-2">{data.main_address}</div>
            <div className="">
              {isLoaded && (
                <GoogleMap
                  mapContainerClassName="map-container"
                  center={center}
                  zoom={10}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
