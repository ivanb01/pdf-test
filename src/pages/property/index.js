import oneLineLogo from '/public/images/oneline-logo.svg';
import one from '/public/images/property/1.png';
import two from '/public/images/property/2.png';
import three from '/public/images/property/3.png';
import four from '/public/images/property/4.png';
import five from '/public/images/property/5.png';
import FsLightbox from 'fslightbox-react';
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
import Button from '@components/shared/button';

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
      name: 'Common Charges',
      value: data.COMMON_CHARGES,
    },
    {
      id: 1,
      name: 'Maintenance',
      value: data.MAINTENANCE,
    },
    {
      id: 2,
      name: 'Taxes',
      value: data.TAXES,
    },
    {
      id: 3,
      name: 'Deductible',
      value: data.DEDUCTIBLE,
    },
    {
      id: 4,
      name: 'Down Payment',
      value: data.DOWN_PAYMENT,
    },
    {
      id: 5,
      name: 'Available date',
      value: data.DATE_AVAILABLE,
    },
    {
      id: 6,
      name: 'Property type',
      value: data.PROPERTY_TYPE,
    },
    {
      id: 7,
      name: 'Approx SF',
      value: data.SQUARE_FOOTAGE,
    },
    {
      id: 8,
      name: 'Stories',
      value: data.STORIES,
    },
    {
      id: 9,
      name: 'Unit Number',
      value: data.UNIT_NUMBER,
    },
    // {
    //   id: 10,
    //   name: 'Tour',
    //   value: data.VTOUR ?? data.VTOUR2,
    // },
  ];

  const getOtherDetails = () => {
    if (data.STATUS.toLowerCase().includes('sale')) {
      otherDetails.push(
        {
          id: 11,
          name: 'Closing Date',
          value: data.CLOSING_DATE,
        },
        {
          id: 12,
          name: 'Closing price',
          value: data.CLOSING_PRICE,
        },
      );
    }
    return otherDetails;
  };

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

  const [toggler, setToggler] = useState(false);
  const filteredArray =
    data.PHOTOS.length > 0 && data.PHOTOS.filter((item) => item.ORIGINAL_URL.toLowerCase().includes('floor'));

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
        <div className="md:mt-10 mt-5 pb-10 flex justify-between">
          <div className="w-[700px] mr-20">
            <div className="property-details">
              <div className="text-gray7 text-xl mb-6 font-medium">Property Details</div>
              <div className="flex justify-between items-center">
                <div className="flex mr-6 items-center" key={index}>
                  <div className={'flex'}>
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
                </div>
                <div>
                  {filteredArray.length > 0 && (
                    <Button secondary onClick={() => setToggler(!toggler)}>
                      <div className={'mr-1.5'}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M7.1999 3.99974V2.39966H4.7999C3.47486 2.39966 2.3999 3.47462 2.3999 4.79966V19.2001C2.3999 20.5252 3.47486 21.6001 4.7999 21.6001H21.5999V3.99974H7.1999ZM3.99998 4.79966C3.99998 4.35878 4.35926 3.99974 4.7999 3.99974H5.59982V16.8001H4.7999C4.5179 16.8001 4.2515 16.858 3.99998 16.947V4.79966ZM19.9998 20.0001H4.7999C4.35926 20.0001 3.99998 19.6408 3.99998 19.2001C3.99998 18.7578 4.35926 18.4002 4.7999 18.4002H7.1999V13.5997H10.3998V18.4002H13.6V16.8001H11.9999V13.5997H13.6V11.9997H7.1999V8.79974H10.3998V10.3998H11.9999V8.79974H16.7999V11.9997H15.1998V13.5997H16.7999V16.8001H15.1998V18.4002H18.4V7.19966H7.1999V5.59982H19.9998V20.0001Z"
                            fill="#0EA5E9"
                          />
                        </svg>
                      </div>
                      See Floor-plan
                    </Button>
                  )}
                </div>
              </div>
              <div className="mt-6" dangerouslySetInnerHTML={{ __html: data.DESCRIPTION }}></div>
            </div>
            {(differentiateAmenities(data.AMENITIES).mainAmenitiesPerProperty.length > 0 ||
              differentiateAmenities(data.AMENITIES).capitalizedRemainingAmenities.length > 0) && (
              <div className="mt-10">
                <div className="text-gray7 text-xl mb-4 font-medium">Property Amenities</div>
                <div className={'w-[700px]'}>
                  <div className="grid grid-cols-3 gap-6 items-center mb-6">
                    {differentiateAmenities(data.AMENITIES).mainAmenitiesPerProperty.length > 0 &&
                      differentiateAmenities(data.AMENITIES).mainAmenitiesPerProperty.map((amenity, index) => {
                        const matchedAmenity = propertyAmenities.find(
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
                  <div className={'flex flex-wrap'} style={{ gap: '5px' }}>
                    {differentiateAmenities(data.AMENITIES).capitalizedRemainingAmenities.length > 0 &&
                      differentiateAmenities(data.AMENITIES).capitalizedRemainingAmenities.map(
                        (remaining, index) =>
                          remaining.length > 0 && (
                            <div
                              key={index}
                              style={{ borderRadius: '20px' }}
                              className={'mb-2 text-gray6 border border-solid border-borderColor bg-gray1 '}>
                              <p className={'text-sm leading-4 font-medium px-[10px] py-1.5 text-gray-6'}>
                                {' '}
                                {remaining}
                              </p>
                            </div>
                          ),
                      )}
                  </div>
                </div>
              </div>
            )}
            <div className="mt-[50px] mb-[50px]">
              <div className="text-gray7 text-xl mb-6 font-medium">Other Details</div>
              <div className="flex flex-wrap">
                {getOtherDetails().map((detail, index) => {
                  if (detail.value !== undefined && detail.value !== '') {
                    return (
                      <div className="md:w-1/4 sm:w-1/3 w-1/2 mb-4" key={index}>
                        <div className="text-gray4 text-sm">{detail.name}</div>
                        <div className="text-sm text-gray7 mt-1">{detail.value}</div>
                      </div>
                    );
                  }
                  return null;
                })}
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
            <div className="w-auto custom-box-shadow p-6 h-fit min-w-[400px]">
              {/* <div className="text-gray-900 text-base mb-2">Contact the property agent directly</div> */}
              <div className="flex items-center">
                <div className="mr-4 w-24 h-24 rounded-lg">
                  <img
                    src={data.AGENT_IMAGE ? data.AGENT_IMAGE : placeholder.src}
                    className="object-cover rounded-lg"
                    alt=""
                  />
                </div>
                <div className=" break-words">
                  <div className="text-gray-500 text-sm">
                    <div className="font-medium text-lg text-gray-900">{data.AGENT_NAME}</div>
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
        <FsLightbox
          types={[...new Array(filteredArray.length).fill('image')]}
          toggler={toggler}
          zoomIncrement={0.5}
          sources={filteredArray.map((item) => item.ORIGINAL_URL)}
        />
      </div>
    </>
  );
};
export default index;
