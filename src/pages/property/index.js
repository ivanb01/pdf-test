import oneLineLogo from '/public/images/oneline-logo.svg';
import one from '/public/images/property/1.png';
import two from '/public/images/property/2.png';
import three from '/public/images/property/3.png';
import four from '/public/images/property/4.png';
import five from '/public/images/property/5.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import Image from 'next/image';
import location from '/public/images/location.png';
import { useState } from 'react';
import rooms from '/public/images/property/rooms.svg';
import beds from '/public/images/property/beds.svg';
import bathrooms from '/public/images/property/bathrooms.svg';
import balcony from '/public/images/property/balcony.svg';
import fireplace from '/public/images/property/fireplace.svg';
import childrenPlayroom from '/public/images/property/childrenPlayroom.svg';
import furnished from '/public/images/property/funished.svg';
import healthClub from '/public/images/property/healthClub.svg';
import wifi from '/public/images/property/wifi.svg';
import nursey from '/public/images/property/nursey.svg';
import concierge from '/public/images/property/concierge.svg';
import garage from '/public/images/property/garage.svg';
import laundry from '/public/images/property/laundry.svg';
import pool from '/public/images/property/pool.svg';
import lounge from '/public/images/property/lounge.svg';
import bicycleRoom from '/public/images/property/bicycleroom.svg';
import doorman from '/public/images/property/doorman.svg';
import garden from '/public/images/property/garden.svg';
import microwave from '/public/images/property/microwave.svg';
import storage from '/public/images/property/storage.svg';
import elevator from '/public/images/property/elevator.svg';
import SimpleBar from 'simplebar-react';
import ArrowForward from '@mui/icons-material/ArrowForward';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { useRef, useMemo } from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { formatPrice } from '@global/functions';
import fetchJsonp from 'fetch-jsonp';
import Loader from '@components/shared/loader';
import placeholder from '/public/images/placeholder.png';
import { EmailOutlined, EmailRounded, Phone } from '@mui/icons-material';
import { Auth } from 'aws-amplify';

const index = () => {
  const router = useRouter();
  const id = router.query.id;
  const scrollElement = useRef(null);
  const pictures = [one, one, one, one, one, one, one, one];
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    MONTHSFREEREQMINLEASE: '',
    CLOSING_DATE: '',
    OPEN_HOUSE_REMARK: '',
    HEATING_SYSTEM: '',
    ID: 1204120,
    PHOTOS: [
      {
        ORIGINAL_URL:
          'https://media.perchwell.com/property_images/pictures/038/645/561/original/PI-5895t4e6ej.jpg?1685033538',
        PHOTO_TITLE: ' ',
        PHOTO_URL: 'https://rls.realty.mx/images/assets/1204120_130729036.jpg',
        SORT_ORDER: 1,
        LISTING_ID: 1204120,
        WIDTH: 1024,
        HEIGHT: 683,
      },
      {
        ORIGINAL_URL:
          'https://media.perchwell.com/property_images/pictures/038/645/559/original/PI-5895t49jjv.jpg?1685033538',
        PHOTO_TITLE: ' ',
        PHOTO_URL: 'https://rls.realty.mx/images/assets/1204120_130729037.jpg',
        SORT_ORDER: 2,
        LISTING_ID: 1204120,
        WIDTH: 1024,
        HEIGHT: 683,
      },
      {
        ORIGINAL_URL:
          'https://media.perchwell.com/property_images/pictures/038/645/560/original/PI-5895t4c3sj.jpg?1685033538',
        PHOTO_TITLE: ' ',
        PHOTO_URL: 'https://rls.realty.mx/images/assets/1204120_130729038.jpg',
        SORT_ORDER: 3,
        LISTING_ID: 1204120,
        WIDTH: 1024,
        HEIGHT: 683,
      },
      {
        ORIGINAL_URL:
          'https://media.perchwell.com/property_images/pictures/038/645/556/original/PI-5895t3pc4e.jpg?1685033537',
        PHOTO_TITLE: ' ',
        PHOTO_URL: 'https://rls.realty.mx/images/assets/1204120_130729039.jpg',
        SORT_ORDER: 4,
        LISTING_ID: 1204120,
        WIDTH: 1024,
        HEIGHT: 683,
      },
      {
        ORIGINAL_URL:
          'https://media.perchwell.com/property_images/pictures/038/645/553/original/PI-5895t30j32.jpg?1685033537',
        PHOTO_TITLE: ' ',
        PHOTO_URL: 'https://rls.realty.mx/images/assets/1204120_130729040.jpg',
        SORT_ORDER: 5,
        LISTING_ID: 1204120,
        WIDTH: 512,
        HEIGHT: 768,
      },
      {
        ORIGINAL_URL:
          'https://media.perchwell.com/property_images/pictures/038/645/555/original/PI-5895t3j3fk.jpg?1685033537',
        PHOTO_TITLE: ' ',
        PHOTO_URL: 'https://rls.realty.mx/images/assets/1204120_130729041.jpg',
        SORT_ORDER: 6,
        LISTING_ID: 1204120,
        WIDTH: 1024,
        HEIGHT: 683,
      },
      {
        ORIGINAL_URL:
          'https://media.perchwell.com/property_images/pictures/038/645/557/original/PI-5895t3qdvj.jpg?1685033538',
        PHOTO_TITLE: ' ',
        PHOTO_URL: 'https://rls.realty.mx/images/assets/1204120_130729042.jpg',
        SORT_ORDER: 7,
        LISTING_ID: 1204120,
        WIDTH: 1024,
        HEIGHT: 683,
      },
      {
        ORIGINAL_URL:
          'https://media.perchwell.com/property_images/pictures/038/645/554/original/PI-5895t3i1e8.jpg?1685033537',
        PHOTO_TITLE: ' ',
        PHOTO_URL: 'https://rls.realty.mx/images/assets/1204120_130729043.jpg',
        SORT_ORDER: 8,
        LISTING_ID: 1204120,
        WIDTH: 1024,
        HEIGHT: 683,
      },
      {
        ORIGINAL_URL:
          'https://media.perchwell.com/property_images/pictures/038/645/558/original/PI-5895t3t2ml.jpg?1685033537',
        PHOTO_TITLE: ' ',
        PHOTO_URL: 'https://rls.realty.mx/images/assets/1204120_130729044.jpg',
        SORT_ORDER: 9,
        LISTING_ID: 1204120,
        WIDTH: 1024,
        HEIGHT: 683,
      },
      {
        ORIGINAL_URL:
          'https://media.perchwell.com/property_images/pictures/038/645/552/original/PI-5895t2esmu.jpg?1685033536',
        PHOTO_TITLE: ' ',
        PHOTO_URL: 'https://rls.realty.mx/images/assets/1204120_130729045.jpg',
        SORT_ORDER: 10,
        LISTING_ID: 1204120,
        WIDTH: 512,
        HEIGHT: 768,
      },
      {
        ORIGINAL_URL:
          'https://media.perchwell.com/property_images/pictures/038/645/551/original/PI-5895t1o9qg.jpg?1685033536',
        PHOTO_TITLE: 'Floor Plan',
        PHOTO_URL: 'https://rls.realty.mx/images/assets/1204120_130729046.jpg',
        SORT_ORDER: 12,
        LISTING_ID: 1204120,
        WIDTH: 1001,
        HEIGHT: 768,
      },
      {
        ORIGINAL_URL:
          'https://media.perchwell.com/property_images/pictures/038/645/562/original/PI-5895t535th.jpg?1685033539',
        PHOTO_TITLE: ' ',
        PHOTO_URL: 'https://rls.realty.mx/images/assets/1204120_130729047.jpg',
        SORT_ORDER: 12,
        LISTING_ID: 1204120,
        WIDTH: 1024,
        HEIGHT: 683,
      },
    ],
    NEIGHBORHOOD_ID: 52,
    REBNY_AGENT_ID: 'RBNY-35674',
    BATHROOMS: 1,
    UTILITIESINCLUDED: '',
    AGENT_IMAGE: '',
    EXPOSURE_REMARK: '',
    COMPANY_NAME: 'Level Group Inc',
    MAX_LEASE_TERM: 0,
    LISTING_TITLE: 'Bennett Avenue',
    CONDITION: 'Excellent',
    OPEN_HOUSE_END_4: '',
    MIN_LEASE_TERM: 0,
    OPEN_HOUSE_END_2: '',
    OPEN_HOUSE_END_3: '',
    OPEN_HOUSE_END_1: '',
    FLOOR_NUMBER: '3',
    DOWN_PAYMENT: '10%',
    NUM_IMAGES: 12,
    STORIES: 8,
    VTOUR: '',
    URL: 'http://www.levelgroup.com',
    COMMON_CHARGES: 0,
    DESCRIPTION:
      "Pristine, fully renovated one bedroom home with park and garden views!  \n\nEnjoy the solid new French Oak wide-plank floors throughout the efficient layout.  Create memorable meals in the open-concept kitchen with quartz countertops, white cabinetry, subway tile backsplash, high-end Haier fridge, stainless steel Whirlpool dishwasher, and GE stove and micro.  New bath with marble floors. Walk-in closet.\n\nFort Tryon Gardens is a well-managed and financially sound 7-building, 350-unit co-op perfectly situated next to the beautiful Fort Tryon Park, one of New York City's most dramatic, with breathtaking Hudson River views, the exquisite Heather Garden and the world-famous Cloisters Museum. Being next to the park is like having a billionaire's backyard.  Ample nearby commerce, including supermarkets and a diverse selection of restaurants, characterize the area. The co-op has made significant infrastructure improvements in recent years, including a brand-new roof, video intercom system, and various plumbing upgrades. The complex has a friendly and diligent staff, with resident Superintendent. Pets are welcome, including your canine friends. The building is situated near the 1-train and, best of all, the A-train express line is right across the street.\n\nAll viewings are by appointment only. The co-op allows co-purchasing and pied a terre. The Special Capital Assessment ending June 30, 024 allocates $124.05 per month to this unit.  Some photos are virtually staged.",
    BUILDING_ID: 5641,
    DATE_CREATE: '2023-05-25 12:53:00',
    AGENT_MOBILE: '',
    SOURCEDB: 'ROLEX',
    OPEN_HOUSE_REMARK_2: '',
    OPEN_HOUSE_REMARK_4: '',
    OPEN_HOUSE_REMARK_3: '',
    STREET: 'Bennett Avenue',
    CUSTOMFIELDS: '',
    OFF_MARKET_STATUS: '',
    CONCESSION: '',
    CROSS_STREET: '190/191 sts',
    FREEMONTH: '',
    CITY: 'NEW YORK',
    BROKER_NOTE: 'Original Price: 399000\rEmail agent. Register client name.',
    STREETEASY_LINK: 'http://streeteasy.com/building/259-bennett-avenue-new_york',
    UNIT_NUMBER: '3D',
    OFFICE_ID: 848,
    VENDOR_AGENT_ID: '',
    STREET_NUMBER: '259',
    AGENT_NAME: 'Stephen Love',
    TOTAL_ROOMS: 3,
    STATUS: 'For Sale',
    AMENITIES: 'Elevator,Garage,Laundry,Bicycle Room,Storage,Park View,Courtyard,Pied a Terre,',
    KEYCODE: '',
    IDX: 1,
    NETRENT: '',
    OFFICE_PHONE: '(212) 994-9965',
    COBROKE_FEE: '2.5%',
    PRICE: 399000,
    NEWDEVELOPMENT: 0,
    SECURITYDEPOSIT: '',
    NAME: '',
    MAINTENANCE: 766,
    OPEN_HOUSE_START_3: '',
    PETS_POLICY: 'Pets OK',
    OPEN_HOUSE_START_4: '',
    OPEN_HOUSE_START_1: '',
    ADDRESS: '259 Bennett Avenue, Unit 3D',
    AGENT_EMAIL: 'love@levelgroup.com',
    OPEN_HOUSE_START_2: '',
    DATE_LISTED: '2023-05-25',
    SQUARE_FOOTAGE: 0,
    LATITUDE: 40.8585107,
    BOROUGH: 'Manhattan',
    VOW: 1,
    NEIGHBORHOODS: 'Washington Heights',
    VTOUR2: '',
    ZIP_CODE: '10040',
    LONGITUDE: -73.9327812,
    TAXES: 0,
    STATE: 'NY',
    NO_SHARES: 309,
    REBNY_LISTING_ID: 'PRCH-7581570',
    CYOF: 0,
    HIDEADDRESS: 0,
    DEDUCTIBLE: '0%',
    BEDROOMS: 1,
    AGENT_PHONE: '(646) 221-6576',
    COOLING_SYSTEM: '',
    PROPERTY_TYPE: 'Condop',
    OP: '',
    BUILDING_ACCESS_NOTE: '',
    DATE_AVAILABLE: '',
    LISTING_CATEGORY: 'Exclusive',
    CLOSING_PRICE: '',
    DATE_UPDATE: '2023-06-20 08:44:00',
  });

  const [position, setPosition] = useState({
    lat: data.extras_latitude,
    lng: data.extras_longitude,
  });

  const propertyDetails = [
    {
      id: 0,
      name: 'Rooms',
      value: data.TOTAL_ROOMS,
      icon: rooms,
    },
    {
      id: 1,
      name: 'Bedrooms',
      value: data.BEDROOMS,
      icon: beds,
    },
    {
      id: 2,
      name: 'Bathrooms',
      value: data.BATHROOMS,
      icon: bathrooms,
    },
  ];

  const propertyAmenities = [
    {
      name: 'Firebase',
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
  const otherDetails = [
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
  ];

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDANJRHsYVmytQVpYGdPYsEKAivfzIHlwo',
  });
  const center = useMemo(() => ({ lat: data.LATITUDE, lng: data.LONGITUDE }), [data.LATITUDE, data.LONGITUDE]);

  const scrollToMap = () => {
    var element = document.querySelector('#map-section');
    element.scrollIntoView({ behavior: 'smooth' });
  };
  const fetchProperty = async () => {
    let params = {
      apikey: '4d7139716e6b4a72',
      callback: 'callback',
      id: id,
    };
    const urlParams = new URLSearchParams({
      ...params,
    });
    const url = 'https://dataapi.realtymx.com/listings?' + urlParams.toString();

    await fetchJsonp(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.LISTINGS[0]) {
          setData(data.LISTINGS[0]);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (id) {
      fetchProperty();
    }
  }, [id]);

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

  useEffect(() => {
    Auth.currentAuthenticatedUser().then((res) => {
      if (res) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
  }, []);

  return loading ? (
    <div className="h-full w-full relative">
      <Loader />
    </div>
  ) : (
    <>
      <div className="bg-white p-6 flex items-center properties-container">
        <Image src={oneLineLogo} alt="" className="h-[20px] w-full" />
      </div>
      <div className="flex md:h-[500px] h-[300px] relative">
        {data.PHOTOS.length == 1 ? (
          <div className="w-full h-full">
            <img src={data.PHOTOS[0].PHOTO_URL} className="object-cover w-full h-full object-center" />
          </div>
        ) : data.PHOTOS.length == 2 ? (
          <>
            <div className="md:w-1/2 w-full h-full pr-3">
              <img src={data.PHOTOS[0].PHOTO_URL} className="object-cover w-full h-full object-center" />
            </div>
            <div className="md:w-1/2 w-full h-full">
              <img src={data.PHOTOS[1].PHOTO_URL} className="object-cover w-full h-full object-center" />
            </div>
          </>
        ) : (
          <>
            <Swiper
              scrollbar={{ draggable: true }}
              slidesPerView={3}
              loop
              spaceBetween={12}
              navigation
              modules={[Pagination, Navigation, Scrollbar]}>
              {data.PHOTOS.map((picture, index) => (
                <SwiperSlide key={index} className="mr-3 last:mr-0 md:w-2/5 w-full">
                  <img
                    src={picture.PHOTO_URL}
                    alt={`Image ${index + 1}`}
                    className="object-cover w-full h-full object-center"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        )}
      </div>
      <div className="properties-container">
        <div className="flex md:flex-row flex-col justify-between border-gray2 border-b md:pb-0 pb-[20px]">
          <div className="md:py-5 pt-5">
            <div className="flex md:flex-row flex-col md:items-center items-start">
              <div className="order-2 md:order-1 text-[#111827] font-semibold md:mr-2 text-xl md:text-2xl">
                {data.PROPERTY_TYPE} in {data.ADDRESS}
              </div>
              <div className="order-1 md:order-2 md:mb-0 mb-3 min-w-[90px] flex items-center justify-center border border-[#0891B2] bg-[#ECFEFF] rounded-full text-[#155E75] h-fit px-2 py-1 text-xs font-medium">
                {data.STATUS}
              </div>
            </div>
            <div className="flex items-center mt-3">
              <Image src={location} alt="" />
              <div
                className="ml-3 text-[#1F2937] md:text-base text-sm hover:underline cursor-pointer"
                onClick={() => scrollToMap()}>
                {data.ADDRESS}, {data.CITY}, {data.STATE} {data.ZIP_CODE}
              </div>
            </div>
          </div>
          <div>
            <div className="md:flex hidden mt-0 clip-path min-w-[285px] bg-[#EFF7FA] h-full px-4 items-center justify-end text-gray7 font-semibold text-xl">
              {formatPrice(data.PRICE)}
              {data.STATUS.toLowerCase() == 'for rent' && <span className="font-normal">&nbsp;month</span>}
            </div>
            <div className="md:hidden mt-3 min-w-[205px] h-full md:px-4 flex items-center md:justify-end text-gray7 font-semibold text-lg">
              {formatPrice(data.PRICE)}
              {data.STATUS.toLowerCase() == 'for rent' && <span className="font-normal">&nbsp;month</span>}
            </div>
          </div>
        </div>
        <div className="md:mt-10 mt-5 pb-10 flex">
          <div className="mr-20">
            <div className="property-details">
              <div className="text-gray7 text-xl mb-6 font-medium">Property Details</div>
              <div className="flex">
                {propertyDetails.map(
                  (propertyDetail, index) =>
                    propertyDetail.value != 0 && (
                      <div className="flex mr-6 items-center" key={index}>
                        <div className="md:block hidden">
                          <Image src={propertyDetail.icon} />
                        </div>
                        <span className="md:mx-2 mr-2 font-semibold">{propertyDetail.value}</span>
                        {propertyDetail.name}
                      </div>
                    ),
                )}
              </div>
              <div className="mt-6" dangerouslySetInnerHTML={{ __html: data.DESCRIPTION }}></div>
            </div>
            {differentiateAmenities(data.AMENITIES).mainAmenitiesPerProperty.length > 0 ||
              (differentiateAmenities(data.AMENITIES).capitalizedRemainingAmenities.length > 0 && (
                <div className="mt-10">
                  <div className="text-gray7 text-xl mb-4 font-medium">Property Amenities</div>
                  <div className={'w-[700px]'}>
                    <div className="grid grid-cols-3 gap-6 items-center  mb-4">
                      {differentiateAmenities(data.AMENITIES).mainAmenitiesPerProperty.length > 0 &&
                        differentiateAmenities(data.AMENITIES).mainAmenitiesPerProperty.map((amenity, index) => {
                          const matchedAmenity = propertyAmenities.find(
                            (item) => item.name.toLowerCase() === amenity.toLowerCase(),
                          );
                          return (
                            <div className="flex-1 flex items-center gap-1.5 text-[#111827]" key={index}>
                              {matchedAmenity && <Image src={matchedAmenity.icon} />}
                              {matchedAmenity && <span className="ml-2">{matchedAmenity.name}</span>}
                            </div>
                          );
                        })}
                    </div>
                    <div className={'flex flex-wrap'} style={{ gap: '5px' }}>
                      {differentiateAmenities(data.AMENITIES).capitalizedRemainingAmenities.length > 0 &&
                        differentiateAmenities(data.AMENITIES).capitalizedRemainingAmenities.map(
                          (remaining, index) =>
                            remaining.length > 0 && (
                              <div
                                key={index}
                                style={{ borderRadius: '20px' }}
                                className={'mb-2 text-gray6 border border-solid border-borderColor bg-gray1 '}>
                                <p className={'text-sm leading-4 font-medium py-2 px-1.5 text-gray-6'}> {remaining}</p>
                              </div>
                            ),
                        )}
                    </div>
                  </div>
                </div>
              ))}
            <div className="mt-10">
              <div className="text-gray7 text-xl mb-6 font-medium">Other Details</div>
              <div className="flex flex-wrap">
                {otherDetails.map(
                  (detail, index) =>
                    detail.value && (
                      <div className="md:w-1/4 sm:w-1/3 w-1/2 mb-4" key={index}>
                        <div className="text-gray4 text-sm">{detail.name}</div>
                        <div className="text-sm text-gray7 mt-1">{detail.value}</div>
                      </div>
                    ),
                )}
              </div>
            </div>
            <div className="mt-10 mb-[100px]">
              <div className="text-gray7 text-xl font-medium">Property Location</div>
              <div className="text-gray5 my-2">{data.ADDRESS}</div>
              <div className="" id="map-section">
                {isLoaded && (
                  <GoogleMap mapContainerClassName="map-container" center={center} zoom={15}>
                    <MarkerF
                      key="marker_1"
                      position={{
                        lat: data.LATITUDE,
                        lng: data.LONGITUDE,
                      }}
                    />
                  </GoogleMap>
                )}
              </div>
            </div>
          </div>
          {isAuthenticated && (
            <div className="">
              <div className="text-gray7 text-xl mb-6 font-medium">Listing Agent</div>
              {/* <div className="text-gray-900 text-base mb-2">Contact the property agent directly</div> */}
              <div className="flex items-center">
                <div className="mr-4 w-24 h-24 rounded-lg">
                  <img
                    src={data.AGENT_IMAGE ? data.AGENT_IMAGE : placeholder.src}
                    className="object-cover rounded-lg"
                    alt=""
                  />
                </div>
                <div className="max-w-[200px] break-words">
                  <div className="font-medium text-lg text-gray-900">{data.AGENT_NAME}</div>
                  <div className="text-gray-500">
                    <a className="block">{data.COMPANY_NAME}</a>
                    <a className="block hover:underline" href={`mailto:${data.AGENT_EMAIL}`}>
                      {data.AGENT_EMAIL}
                    </a>
                    <a className="block hover:underline" href={`tel:${data.AGENT_PHONE}`}>
                      {data.AGENT_PHONE}
                    </a>
                  </div>
                  {/* <div className="flex mt-2">
                  <a
                    className="flex mr-2 items-center justify-center h-[35px] w-[35px] bg-purple-500 rounded-full "
                    href={`email:${data.AGENT_EMAIL}`}>
                    <EmailRounded className="text-white" />
                  </a>
                  <a
                    className="flex items-center justify-center h-[35px] w-[35px] bg-teal-400 rounded-full "
                    href={`tel:${data.AGENT_PHONE}`}>
                    <Phone className="text-white" />
                  </a>
                </div> */}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default index;
