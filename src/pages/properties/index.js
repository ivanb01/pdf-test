import PropertyCard from '@components/property-card';
import MainMenu from '@components/shared/menu';
import lookingForEmpty from '/public/images/looking-for-empty.svg';
import { useState } from 'react';
import Dropdown from '@components/shared/dropdown';
import Search from '@components/shared/input/search';
import { NYCneighborhoods } from '@global/variables';
import SearchSelectInput from '@components/shared/search-select-input';

const index = () => {
  const [properties, setData] = useState([
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
  ]);

  const getFromNumber = () => {
    return (page - 1) * 21 + 1;
  };
  const getToNumber = () => {
    return Math.min(page * 21, properties.length);
  };

  const [neighborhoods, setNeighborhoods] = useState();

  return (
    <>
      <MainMenu />
      <div className="p-6 pb-0">
        <div className="flex">
          <SearchSelectInput
            options={NYCneighborhoods}
            placeholder="in: Choose Neighborhood"
            onChange={(choice) => {
              let choices = choice.map((el) => el.value);
              setNeighborhoods(choices);
            }}
          />
          <SearchSelectInput
            options={NYCneighborhoods}
            placeholder="for: Choose"
            onChange={(choice) => {
              let choices = choice.map((el) => el.value);
              setNeighborhoods(choices);
            }}
          />
          <SearchSelectInput
            options={NYCneighborhoods}
            placeholder="type: Choose"
            onChange={(choice) => {
              let choices = choice.map((el) => el.value);
              setNeighborhoods(choices);
            }}
          />
          <SearchSelectInput
            options={NYCneighborhoods}
            placeholder="Bedrooms: -"
            onChange={(choice) => {
              let choices = choice.map((el) => el.value);
              setNeighborhoods(choices);
            }}
          />
          <SearchSelectInput
            options={NYCneighborhoods}
            placeholder="Bathrooms: -"
            onChange={(choice) => {
              let choices = choice.map((el) => el.value);
              setNeighborhoods(choices);
            }}
          />
          <Dropdown
            placeHolder="Choose Type*"
            activeIcon={false}
            options={NYCneighborhoods}
            activeClasses="bg-lightBlue1"
            handleSelect={(relationshipType) => handleChooseRelationshipType(relationshipType)}></Dropdown>
        </div>
      </div>
      <div className="p-6">
        {properties && properties.length ? (
          <>
            <div className="mb-4 text-gray-900 text-sm font-medium">{properties.length} suggested properties</div>
            <div className="grid grid-cols-4 gap-6">
              {properties.map((property, index) => (
                <PropertyCard key={index} property={property}></PropertyCard>
              ))}
            </div>
            {properties.length > 21 && (
              <nav className="flex items-center justify-between bg-white py-3 pb-0 mt-5" aria-label="Pagination">
                <div className="hidden sm:block">
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{getFromNumber()}</span> to{' '}
                    <span className="font-medium">{getToNumber()}</span> of{' '}
                    <span className="font-medium">{properties.length}</span> results
                  </p>
                </div>
                <div className="flex flex-1 justify-between sm:justify-end">
                  {getFromNumber() != 1 && (
                    <a
                      href="#"
                      onClick={() => {
                        // fetchPropertyInterests(lookingForData[0], page - 1);
                        // setPage(page - 1);
                      }}
                      className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0">
                      Previous
                    </a>
                  )}
                  {getToNumber() != properties.length && (
                    <a
                      href="#"
                      onClick={() => {
                        // fetchPropertyInterests(lookingForData[0], page + 1);
                        // setPage(page + 1);
                      }}
                      className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0">
                      Next
                    </a>
                  )}
                </div>
              </nav>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center flex-col text-center mt-6">
            <img src={lookingForEmpty.src} alt="" />
            <div className="mt-6 text-sm">
              <div className="text-gray-900 font-medium">No matched properties for this contact yet.</div>
              <div className="text-gray-500 mt-[6px]">
                Whenever we have property that matched these interest, will list here.
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default index;
