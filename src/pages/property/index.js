import oneLineLogo from '/public/images/oneline-logo.svg';
import one from '/public/images/property/1.png';
import FsLightbox from 'fslightbox-react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import Image from 'next/image';
import { useState } from 'react';
import rooms from '/public/images/property/rooms.svg';
import beds from '/public/images/property/beds.svg';
import bathrooms from '/public/images/property/bathrooms.svg';
import { useRef, useMemo } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import fetchJsonp from 'fetch-jsonp';
import Loader from '@components/shared/loader';
import placeholder from '/public/images/placeholder.png';
import { Auth } from 'aws-amplify';
import Button from '@components/shared/button';
import GlobalAlert from '@components/shared/alert/global-alert';
import 'react-medium-image-zoom/dist/styles.css';
import PropertiesCarousel from '@components/property-details/properties-carousel';
import PropertyMainDetails from '@components/property-details/property-main-details';
import PropertyAmenities from '@components/property-details/property-amenities';
import PropertyLocation from '@components/property-details/property-location';

const index = () => {
  const router = useRouter();
  const id = router.query.id;
  const status = router.query.status;
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

  const otherPropertyDetails = [
    {
      id: 0,
      name: 'Fee:',
      value: data.COBROKE_FEE,
    },
    {
      id: 0,
      name: 'Listing Type:',
      value: data.LISTING_CATEGORY,
    },
  ];

  const otherDetails = [
    {
      id: 0,
      name: 'Common Charges',
      value: data.COMMON_CHARGES
        ? `$${data.COMMON_CHARGES.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
        : data.COMMON_CHARGES,
    },
    {
      id: 1,
      name: 'Maintenance',
      value: data.MAINTENANCE
        ? `$${data.MAINTENANCE.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
        : data.MAINTENANCE,
    },
    {
      id: 2,
      name: 'Taxes',
      value: data.TAXES ? `$${data.TAXES.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}` : data.TAXES,
    },
    {
      id: 3,
      name: 'Deductible',
      value: data.DEDUCTIBLE,
    },
    {
      id: 4,
      name: 'Down Payment',
      value: data.DOWN_PAYMENT === '0%' ? undefined : data.DOWN_PAYMENT,
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
      value: data.SQUARE_FOOTAGE.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
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

  const checkAllItems = (details) => {
    return details.every(
      (detail) =>
        detail.value === undefined ||
        detail.value === 0 ||
        detail.value.length === 0 ||
        (typeof detail.value === 'string' && detail?.value.slice(-1) === '%' && detail.value.slice(0, -1) === '0'),
    );
  };

  const fetchProperty = async () => {
    let params = {
      apikey: '4d7139716e6b4a72',
      callback: 'callback',
      id: id,
    };
    if (status) {
      params['status'] = status;
    }
    const urlParams = new URLSearchParams({
      ...params,
    });
    const url = 'https://dataapi.realtymx.com/listings?' + urlParams.toString();

    console.log(url);
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

  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    slide: 1,
  });

  return loading ? (
    <div className="h-full w-full relative">
      <Loader />
    </div>
  ) : (
    <>
      <div className="bg-white p-6 flex items-center properties-container">
        <Image src={oneLineLogo} alt="" className="h-[20px] w-full" />
      </div>
      <PropertiesCarousel data={data} />
      <div className="properties-container">
        <PropertyMainDetails data={data} />
        <div className="md:mt-10 mt-5 pb-10 flex justify-between">
          <div className="w-[700px] mr-20">
            <div className="property-details">
              <div className="text-gray7 text-xl mb-6 font-medium">Property Details</div>
              <div className="flex justify-between items-center">
                <div className="flex items-center" key={index}>
                  <div className={'flex gap-6 items-center'}>
                    {propertyDetails.map(
                      (propertyDetail, index) =>
                        propertyDetail.value != 0 && (
                          <div className="flex items-center" key={index}>
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
                <div className={'flex gap-3'}>
                  {filteredArray.length > 0 && (
                    <Button
                      secondary
                      onClick={() => setToggler(!toggler)}
                      className={'py-[9px] px-[13px] text-lightBlue5'}>
                      <div className={'mr-1.5'}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M7.1999 3.99974V2.39966H4.7999C3.47486 2.39966 2.3999 3.47462 2.3999 4.79966V19.2001C2.3999 20.5252 3.47486 21.6001 4.7999 21.6001H21.5999V3.99974H7.1999ZM3.99998 4.79966C3.99998 4.35878 4.35926 3.99974 4.7999 3.99974H5.59982V16.8001H4.7999C4.5179 16.8001 4.2515 16.858 3.99998 16.947V4.79966ZM19.9998 20.0001H4.7999C4.35926 20.0001 3.99998 19.6408 3.99998 19.2001C3.99998 18.7578 4.35926 18.4002 4.7999 18.4002H7.1999V13.5997H10.3998V18.4002H13.6V16.8001H11.9999V13.5997H13.6V11.9997H7.1999V8.79974H10.3998V10.3998H11.9999V8.79974H16.7999V11.9997H15.1998V13.5997H16.7999V16.8001H15.1998V18.4002H18.4V7.19966H7.1999V5.59982H19.9998V20.0001Z"
                            fill="#0EA5E9"
                          />
                        </svg>
                      </div>
                      {data.VTOUR2 || data.VTOUR ? 'Floorplan' : 'See Floor plan'}
                    </Button>
                  )}
                  {(data.VTOUR || data.VTOUR2) && (data.VTOUR.length > 0 || data.VTOUR2.length > 0) && (
                    <a href={data.VTOUR ?? data.VTOUR2} target="_blank" rel="noopener noreferrer">
                      <Button secondary className={'py-[9px] px-[13px] text-lightBlue5'}>
                        <div className={'mr-1.5'}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none">
                            <path
                              d="M16 10.27L11 7.38C10.6961 7.20455 10.3514 7.11214 10.0005 7.11205C9.64962 7.11196 9.30487 7.20419 9.00089 7.37949C8.69691 7.55478 8.44441 7.80697 8.26872 8.11072C8.09304 8.41447 8.00036 8.7591 8 9.11V14.89C8.00036 15.2407 8.09295 15.5852 8.26847 15.8888C8.44398 16.1925 8.69627 16.4446 9 16.62C9.30404 16.7955 9.64893 16.8879 10 16.8879C10.3511 16.8879 10.696 16.7955 11 16.62L16 13.73C16.3031 13.5542 16.5547 13.3018 16.7295 12.9982C16.9044 12.6946 16.9965 12.3504 16.9965 12C16.9965 11.6496 16.9044 11.3054 16.7295 11.0018C16.5547 10.6982 16.3031 10.4458 16 10.27ZM15 12L10 14.89V9.11L15 12ZM12 2C10.0222 2 8.08879 2.58649 6.4443 3.6853C4.79981 4.78412 3.51809 6.3459 2.76121 8.17317C2.00433 10.0004 1.8063 12.0111 2.19215 13.9509C2.578 15.8907 3.53041 17.6725 4.92894 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8079C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7363 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM12 20C10.4178 20 8.87104 19.5308 7.55544 18.6518C6.23985 17.7727 5.21447 16.5233 4.60897 15.0615C4.00347 13.5997 3.84504 11.9911 4.15372 10.4393C4.4624 8.88743 5.22433 7.46197 6.34315 6.34315C7.46197 5.22433 8.88743 4.4624 10.4393 4.15372C11.9911 3.84504 13.5997 4.00346 15.0615 4.60896C16.5233 5.21447 17.7727 6.23984 18.6518 7.55544C19.5308 8.87103 20 10.4177 20 12C20 14.1217 19.1572 16.1566 17.6569 17.6569C16.1566 19.1571 14.1217 20 12 20Z"
                              fill="#0EA5E9"
                            />
                          </svg>
                        </div>
                        Virtual Tour
                      </Button>
                    </a>
                  )}
                </div>
              </div>
              <div className="mt-6" dangerouslySetInnerHTML={{ __html: data.DESCRIPTION }}></div>
            </div>
            <PropertyAmenities data={data} />
            {!checkAllItems(getOtherDetails()) && (
              <div className="mt-[50px] mb-[50px]">
                <div className="text-gray7 text-xl mb-6 font-medium">Other Details</div>
                <div className="flex flex-wrap">
                  {getOtherDetails().map((detail, index) => {
                    if (
                      detail.value !== undefined &&
                      detail.value !== '' &&
                      detail.value != 0 &&
                      !(
                        typeof detail.value === 'string' &&
                        detail?.value.slice(-1) === '%' &&
                        detail.value.slice(0, -1) === '0'
                      )
                    ) {
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
            )}
            <div className="mt-10 mb-[100px]">
              <PropertyLocation data={data} />
            </div>
          </div>
          {isAuthenticated && (
            <div className="transition-all w-auto custom-box-shadow p-6 h-fit min-w-[400px]">
              {/* <div className="text-gray-900 text-base mb-2">Contact the property agent directly</div> */}
              <GlobalAlert
                className="mb-4 font-semibold"
                smallText
                noBorder
                rounded
                type="warning"
                message={`NOTE: The information in this box is only visible to you. It will not show when you share the link with someone.`}
              />
              <div className={' opacity-50 hover:opacity-100'}>
                <div className="text-gray7 text-xl mb-3 font-medium ">Listing Agent</div>

                <div className="flex items-center ">
                  <div className="mr-4 w-24 h-24 rounded-lg">
                    <img
                      src={data.AGENT_IMAGE ? data.AGENT_IMAGE : placeholder.src}
                      className="object-cover rounded-lg"
                      alt=""
                    />
                  </div>
                  <div className=" break-words">
                    <div className="text-gray-500 text-sm">
                      <div className="font-medium text-base text-gray-900">{data.AGENT_NAME}</div>
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

                <div className={'mt-10'}>
                  <div className="text-gray7 text-xl mb-3 font-medium">Property Details</div>
                  <div className="flex flex-wrap">
                    {otherPropertyDetails.map((detail, index) => (
                      <div className="w-1/2 mb-4" key={index}>
                        <div className="text-gray4 text-sm">{detail.name}</div>
                        <div className="text-sm text-gray7 mt-1">{detail.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <>
          <FsLightbox
            types={[...new Array(filteredArray?.length).fill('image')]}
            toggler={toggler}
            zoomIncrement={0.5}
            sources={filteredArray?.map((item) => item.ORIGINAL_URL)}
          />

          <FsLightbox
            types={[...new Array(data?.PHOTOS?.length).fill('image')]}
            toggler={lightboxController.toggler}
            zoomIncrement={0.5}
            sourceIndex={lightboxController.slide}
            sources={data?.PHOTOS?.map((i) => i.PHOTO_URL)}
          />
        </>
      </div>
    </>
  );
};
export default index;
