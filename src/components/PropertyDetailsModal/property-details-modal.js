import { useEffect, useState, useRef } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import Loader from '@components/shared/loader';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import Image from 'next/image';
import rooms from '../../../public/images/property/rooms.svg';
import beds from '../../../public/images/property/beds.svg';
import bathrooms from '../../../public/images/property/bathrooms.svg';
import SimpleBar from 'simplebar-react';
import PropertyOverlay from '@components/PropertyDetailsModal/property-overlay';
import PropertiesCarousel from '@components/property-details/properties-carousel';
import PropertyMainDetails from '@components/property-details/property-main-details';
import PropertyAmenities from '@components/property-details/property-amenities';
import PropertyLocation from '@components/property-details/property-location';
import Button from '@components/shared/button';
import TextArea from '@components/shared/textarea';
import PropertyOtherDetails from '@components/property-details/property-other-details';
import PopoverComponent from '@components/shared/Popover';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';

const PortfolioPopup = ({
  handleCloseOverlay,
  property,
  totalNumberOfProperties,
  onNextClick,
  onPrevClick,
  propertyIndex,
  addClientFeedback,
  status,
  note,
}) => {
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
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setData(property);
    setLoading(false);
  }, [property]);
  const propertyDetails = [
    {
      id: 0,
      name: 'Rooms',
      value: data?.TOTAL_ROOMS,
      icon: rooms,
    },
    {
      id: 1,
      name: 'Bedrooms',
      value: data?.BEDROOMS,
      icon: beds,
    },
    {
      id: 2,
      name: 'Bathrooms',
      value: data?.BATHROOMS,
      icon: bathrooms,
    },
  ];

  const [openFeedback, setOpenFeedback] = useState(false);
  const [value, setValue] = useState('');
  return (
    <PropertyOverlay
      onNextClick={() => onNextClick(property)}
      onPrevClick={() => onPrevClick(property)}
      className={'max-w-[1077px] h-[80vh] w-[100%]'}
      handleCloseOverlay={handleCloseOverlay}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className={'px-6 py-[13px] flex justify-between border-b border-gray1 items-center'}>
            <h4 className={'text-base leading-6 font-semibold'}>
              {propertyIndex + 1}/{totalNumberOfProperties} Properties to review
            </h4>
            <div className={'flex items-center gap-2 '}>
              {status !== 'disliked' ? (
                <PopoverComponent
                  side={'bottom'}
                  align={'center'}
                  style={{ backgroundColor: 'white' }}
                  triggerElement={
                    <button
                      className={`h-[40px] hover:bg-black hover:text-white items-center justify-center flex gap-[10px] px-[10px] py-5 border border-borderColor rounded-[222px] w-[125px] ${status === 'disliked' ? 'bg-black text-white' : 'bg-white'}`}>
                      <ThumbDownAltOutlinedIcon className={'h-[17px] w-[17px]'} />
                      <span className={'text-sm leading-6 font-semibold'}>Dislike</span>
                    </button>
                  }>
                  <div className="max-w-[252px] bg-white">
                    <TextArea
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenFeedback(true);
                      }}
                      className={'min-h-[90px]'}
                      handleChange={(e) => {
                        setValue(e.target.value);
                      }}
                      value={
                        !openFeedback
                          ? 'Please give us your opinion about this property. It will help us improve for next time.'
                          : value
                      }
                    />
                    <Button
                      primary
                      disabled={value.length < 9}
                      className={'min-w-[252px] mt-[14px]'}
                      onClick={(e) => {
                        e.stopPropagation();
                        addClientFeedback(property.ID, 'disliked', value);
                        setValue('');
                      }}>
                      Send your feedback
                    </Button>
                  </div>
                </PopoverComponent>
              ) : (
                <button
                  onClick={() => {
                    addClientFeedback(property.ID, 'saved', value);
                  }}
                  className={`h-[40px] hover:bg-black hover:text-white items-center justify-center flex gap-[10px] px-[10px] py-5 border border-borderColor rounded-[222px] w-[125px] ${status === 'disliked' ? 'bg-black text-white' : 'bg-white'}`}>
                  <ThumbDownAltOutlinedIcon className={'h-[17px] w-[17px]'} />
                  <span className={'text-sm leading-6 font-semibold'}>Dislike</span>
                </button>
              )}
              <button
                onClick={() => {
                  if (status === 'liked') {
                    addClientFeedback(property.ID, 'saved', '');
                    return;
                  }
                  addClientFeedback(property.ID, 'liked', '');
                }}
                className={`${status === 'liked' ? 'bg-black text-white' : 'bg-white'} h-[40px] items-center justify-center flex gap-[10px] px-[10px] py-5 border border-borderColor rounded-[222px] w-[105px]`}>
                <ThumbUpAltOutlinedIcon className={'h-[17px] w-[17px]'} />
                <span className={'text-sm leading-6 font-semibold '}>Like</span>
              </button>
            </div>
          </div>
          <SimpleBar style={{ height: '80vh' }}>
            <div className={'mt-4 mb-4'}>
              <PropertiesCarousel data={data} />
              <div className="properties-container">
                <PropertyMainDetails data={data} />
                {status === 'disliked' && (
                  <div className={'py-[16px] px-5 bg-gray1 flex gap-4  flex-col mt-6 mb-[-20px]'}>
                    <div className={'flex gap-2 flex-col'}>
                      <h6 className={'text-base  font-semibold text-gray7'}>Client’s thoughts</h6>
                      <div className={'h-[2px] w-5 bg-lightBlue3'}></div>
                    </div>
                    <p className={'text-base  font-normal text-gray7'}>{value.length > 0 ? value : note}</p>
                  </div>
                )}
                <div className="md:mt-10 mt-5 pb-4 flex justify-between">
                  <div className="w-[700px] mr-20">
                    <div className="property-details">
                      <div className="text-gray7 text-xl mb-6 font-medium">Property Details</div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
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
                      </div>
                      <div className="mt-6" dangerouslySetInnerHTML={{ __html: data?.DESCRIPTION }}></div>
                    </div>
                    <PropertyAmenities data={data} />
                    <PropertyOtherDetails data={data} />
                    <div className="mt-10 mb-[20px]">
                      <PropertyLocation data={data} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SimpleBar>
        </>
      )}
    </PropertyOverlay>
  );
};

export default PortfolioPopup;
