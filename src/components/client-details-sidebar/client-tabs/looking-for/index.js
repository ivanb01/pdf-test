// import Accordion from 'components/shared/accordion';
import Input from 'components/shared/input';
import { useFormik } from 'formik';
import bedroomBlack from '/public/images/bedroom-black.svg';
import bathroomBlack from '/public/images/bathroom-black.svg';
import room from '/public/images/room-black.svg';
import bedroom from '/public/images/bedroom.svg';
import bathroom from '/public/images/bathroom.svg';
import lookingForEmpty from '/public/images/looking-for-empty.svg';
import usd from '/public/images/usd.svg';
import Image from 'next/image';
import { useEffect, useState, Fragment, useLayoutEffect } from 'react';
import Button from 'components/shared/button';
import * as contactServices from 'api/contacts';
import * as Yup from 'yup';
import { NYCneighborhoods } from 'global/variables';
import SearchSelectInput from 'components/shared/search-select-input';
import toast from 'react-hot-toast';
import SimpleBar from 'simplebar-react';
import ArrowForward from '@mui/icons-material/ArrowForward';
import Loader from '@components/shared/loader';
import PropertyCard from '@components/property-card';
import EditLookingFor from '@components/overlays/edit-looking-for';
import { getProperties } from '@api/realtyMX';
import { formatPrice } from '@global/functions';
import { useSelector } from 'react-redux';

export default function LookingFor({ contactId }) {
  const LookingPropertySchema = Yup.object().shape({
    neighborhood_ids: Yup.array().required('Field is required'),
    bedrooms: Yup.number().integer('Must be integer').min(0, 'Minimum value is 0'),
    bathrooms: Yup.number().integer('Must be integer').min(0, 'Minimum value is 0'),
    budget_min: Yup.number().min(0, 'Budget Min should be greater than 0').typeError('Budget Min should be an integer'),
    budget_max: Yup.number()
      .typeError('Budget Max should be an integer')
      .when('budget_min', (budget_min, schema) => {
        if (budget_min === undefined || isNaN(budget_min)) {
          return;
        } else {
          return schema
            .required('Field can not be left blank.')
            .typeError('Budget Max should be an integer')
            .moreThan(budget_min, 'Budget Max be greater than Budget Min');
        }
      }),
  });

  const lookingForData = useSelector((state) => state.clientDetails.lookingForData);

  //* FORMIK *//
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [lookingForState, setLookingForState] = useState(0);
  const [loadingButton, setLoadingButton] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);
  const [propertyInterests, setPropertyInterests] = useState();
  const [loadingPropertyInterests, setLoadingPropertyInterests] = useState(true);

  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      neighborhood_ids: '',
      looking_action: 'sell',
      bedrooms: '',
      bathrooms: '',
      budget_min: '',
      budget_max: '',
    },
    validationSchema: LookingPropertySchema,
    onSubmit: (values) => {
      console.log(values, 'valuesssssss');
      if (formik.isValid) {
        handleAddSubmit({
          ...values,
          budget_min: values.budget_min === '' ? null : Number(values.budget_min),
          budget_max: values.budget_max === '' ? null : Number(values.budget_max),
        });
      }
    },
  });

  const { errors, touched } = formik;

  const handleAddSubmit = async (values) => {
    setLoadingButton(true);
    try {
      const res = await contactServices.addContactLookingProperty(contactId, values);
      console.log('add', res);
      setLoadingButton(false);
      toast.success('Changes were successfully saved');
    } catch (error) {
      console.log(error);
      setLoadingButton(false);
    } finally {
      setLookingForState(1);
    }
  };

  const fetchLookingProperties = () => {
    try {
      const lookingProperties = lookingForData.data;
      if (lookingProperties.length > 0) {
        formik.setValues({
          neighborhood_ids: lookingProperties[0].neighborhood_ids,
          looking_action: lookingProperties[0].looking_action,
          bedrooms: lookingProperties[0].bedrooms_min != 0 ? lookingProperties[0].bedrooms_min : '',
          bathrooms: lookingProperties[0].bathrooms_min != 0 ? lookingProperties[0].bathrooms_min : '',
          budget_min: lookingProperties[0].budget_min != 0 ? lookingProperties[0].budget_min : '',
          budget_max: lookingProperties[0].budget_max != 0 ? lookingProperties[0].budget_max : '',
        });
        setLookingForState(1);
        fetchPropertyInterests();
      } else {
        setLookingForState(0);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLookingProperties();
  }, [contactId]);

  useLayoutEffect(() => {
    if (formik.isValid) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [formik]);

  const valueOptions = (selectedOptions, multiselectOptions) => {
    if (!selectedOptions) {
      return null;
    }
    const options = selectedOptions.map((el) => {
      return multiselectOptions.find((option) => option.value === el);
    });
    return options;
  };

  const fetchPropertyInterests = () => {
    setLoadingPropertyInterests(true);
    // getProperties(formik.values);
    const data = {
      TOTAL_COUNT: 832,
      LISTINGS: [
        {
          MONTHSFREEREQMINLEASE: '',
          CLOSING_DATE: '',
          OPEN_HOUSE_REMARK: '',
          HEATING_SYSTEM: '',
          ID: 1215844,
          PHOTOS: [
            {
              ORIGINAL_URL: 'https://brickandmortar.resoftsys.com/assets/uploads/property_images/1103.jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1215844_130901588.jpg',
              SORT_ORDER: 1,
              LISTING_ID: 1215844,
              WIDTH: 1024,
              HEIGHT: 683,
            },
            {
              ORIGINAL_URL: 'https://brickandmortar.resoftsys.com/assets/uploads/property_images/552a8144.jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1215844_130901589.jpg',
              SORT_ORDER: 2,
              LISTING_ID: 1215844,
              WIDTH: 1024,
              HEIGHT: 683,
            },
            {
              ORIGINAL_URL:
                'https://brickandmortar.resoftsys.com/assets/uploads/property_images/screenshot_2023_07_13_at_12_10_34_pm.png',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1215844_130901590.jpg',
              SORT_ORDER: 3,
              LISTING_ID: 1215844,
              WIDTH: 1024,
              HEIGHT: 682,
            },
            {
              ORIGINAL_URL: 'https://brickandmortar.resoftsys.com/assets/uploads/property_images/552a8145.jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1215844_130901591.jpg',
              SORT_ORDER: 4,
              LISTING_ID: 1215844,
              WIDTH: 1024,
              HEIGHT: 683,
            },
            {
              ORIGINAL_URL: 'https://brickandmortar.resoftsys.com/assets/uploads/property_images/552a8146.jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1215844_130901592.jpg',
              SORT_ORDER: 5,
              LISTING_ID: 1215844,
              WIDTH: 1024,
              HEIGHT: 683,
            },
            {
              ORIGINAL_URL: 'https://brickandmortar.resoftsys.com/assets/uploads/property_images/552a8147.jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1215844_130901593.jpg',
              SORT_ORDER: 6,
              LISTING_ID: 1215844,
              WIDTH: 1024,
              HEIGHT: 683,
            },
            {
              ORIGINAL_URL:
                'https://brickandmortar.resoftsys.com/assets/uploads/property_images/screenshot_2023_07_13_at_12_10_54_pm.png',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1215844_130901594.jpg',
              SORT_ORDER: 7,
              LISTING_ID: 1215844,
              WIDTH: 1024,
              HEIGHT: 682,
            },
            {
              ORIGINAL_URL:
                'https://brickandmortar.resoftsys.com/assets/uploads/property_images/austin_nichols_lobby.jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1215844_130901595.jpg',
              SORT_ORDER: 8,
              LISTING_ID: 1215844,
              WIDTH: 1024,
              HEIGHT: 683,
            },
            {
              ORIGINAL_URL:
                'https://brickandmortar.resoftsys.com/assets/uploads/property_images/austin_nichols_club_room.jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1215844_130901596.jpg',
              SORT_ORDER: 9,
              LISTING_ID: 1215844,
              WIDTH: 1024,
              HEIGHT: 683,
            },
            {
              ORIGINAL_URL:
                'https://brickandmortar.resoftsys.com/assets/uploads/property_images/austin_nichols_club_room_2.jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1215844_130901597.jpg',
              SORT_ORDER: 10,
              LISTING_ID: 1215844,
              WIDTH: 1024,
              HEIGHT: 683,
            },
            {
              ORIGINAL_URL:
                'https://brickandmortar.resoftsys.com/assets/uploads/property_images/screenshot_2023_07_13_at_12_11_41_pm.png',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1215844_130901598.jpg',
              SORT_ORDER: 11,
              LISTING_ID: 1215844,
              WIDTH: 1024,
              HEIGHT: 682,
            },
            {
              ORIGINAL_URL:
                'https://brickandmortar.resoftsys.com/assets/uploads/property_images/austin_nichols_fitness_center.jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1215844_130901599.jpg',
              SORT_ORDER: 12,
              LISTING_ID: 1215844,
              WIDTH: 1024,
              HEIGHT: 683,
            },
            {
              ORIGINAL_URL:
                'https://brickandmortar.resoftsys.com/assets/uploads/property_images/screenshot_2023_07_13_at_12_12_15_pm.png',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1215844_130901600.jpg',
              SORT_ORDER: 13,
              LISTING_ID: 1215844,
              WIDTH: 1024,
              HEIGHT: 658,
            },
            {
              ORIGINAL_URL:
                'https://brickandmortar.resoftsys.com/assets/uploads/property_images/austin_nichols_outdoor_seating.jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1215844_130901601.jpg',
              SORT_ORDER: 14,
              LISTING_ID: 1215844,
              WIDTH: 1024,
              HEIGHT: 683,
            },
            {
              ORIGINAL_URL:
                'https://brickandmortar.resoftsys.com/assets/uploads/property_images/austin_nichols_courtyard_at_night.jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1215844_130901602.jpg',
              SORT_ORDER: 15,
              LISTING_ID: 1215844,
              WIDTH: 1024,
              HEIGHT: 678,
            },
          ],
          NEIGHBORHOOD_ID: 106,
          REBNY_AGENT_ID: 'RBNY-59971',
          BATHROOMS: 1.0,
          UTILITIESINCLUDED: '',
          AGENT_IMAGE: '',
          EXPOSURE_REMARK: '',
          COMPANY_NAME: 'Brick & Mortar LLC',
          MAX_LEASE_TERM: 24,
          LISTING_TITLE: 'Kent Avenue',
          CONDITION: '',
          OPEN_HOUSE_END_4: '',
          MIN_LEASE_TERM: 12,
          OPEN_HOUSE_END_2: '',
          OPEN_HOUSE_END_3: '',
          OPEN_HOUSE_END_1: '',
          FLOOR_NUMBER: '',
          DOWN_PAYMENT: '0%',
          NUM_IMAGES: 15,
          STORIES: 7,
          VTOUR: '',
          URL: 'https://brickandmortar.com/listing/for-rent/184_kent_avenue_unit_d612/rj_5843',
          COMMON_CHARGES: 0.0,
          DESCRIPTION:
            "Built in 1915 as a Grocery Trade, then later converted into a Bourbon distillery, Austin Nichols House has been expertly preserved and converted into a beacon of contemporary loft living. Situated in prime Williamsburg, Austin Nichols House is one of only a few landmarked buildings nestled along the Brooklyn Waterfront offering Manhattan Skyline views, tranquil outdoor space and the North Williamsburg Ferry Landing located outside of the buildings front door. Boasting over 30,000 square feet of amenity space, residents enjoy a waterfront gym, childrens playroom, landscaped courtyard and roof deck, residents lounge with catering kitchen, co-working spaces, movie theatre, music rehearsal room, zen garden, and building garage. This is unlike any living experience New York has ever seen. Unit D612 sits atop the building, on the 6th Floor, looking out over an incredibly well manicured garden, with tons of sunlight pouring in. Note this is currently the ONLY studio available in Williamsburg's Northside.",
          CATEGORY: 2,
          BUILDING_ID: 41352,
          DATE_CREATE: '2023-07-13 13:12:00',
          AGENT_MOBILE: '',
          SOURCEDB: 'ROLEX',
          OPEN_HOUSE_REMARK_2: '',
          OPEN_HOUSE_REMARK_4: '',
          OPEN_HOUSE_REMARK_3: '',
          STREET: 'Kent Avenue',
          CUSTOMFIELDS: '',
          OFF_MARKET_STATUS: '',
          CONCESSION: '',
          CROSS_STREET: 'North 4th',
          FREEMONTH: '',
          CITY: 'Brooklyn',
          BROKER_NOTE: 'Call Rolan',
          STREETEASY_LINK: 'http://streeteasy.com/building/184-kent-avenue-brooklyn',
          UNIT_NUMBER: 'D612',
          OFFICE_ID: 1123,
          VENDOR_AGENT_ID: '',
          STREET_NUMBER: '184',
          AGENT_NAME: 'Rolan Sereny',
          TOTAL_ROOMS: 2.0,
          STATUS: 'For Rent',
          AMENITIES:
            'Washer,Laundry In Unit,Doorman,Elevator,Health Club,Garage,Laundry,Bicycle Room,WiFi,Children Playroom,Courtyard,',
          KEYCODE: '',
          IDX: 1,
          NETRENT: '',
          COBROKE_FEE: '15%',
          OFFICE_PHONE: '(305) 494-1020',
          PRICE: 3300,
          NEWDEVELOPMENT: 0,
          SECURITYDEPOSIT: '',
          NAME: '184 Kent',
          MAINTENANCE: 0.0,
          OPEN_HOUSE_START_3: '',
          PETS_POLICY: 'Pets OK',
          OPEN_HOUSE_START_4: '',
          OPEN_HOUSE_START_1: '',
          ADDRESS: '184 Kent Avenue, Unit D612',
          AGENT_EMAIL: 'rs@brickandmortar.com',
          OPEN_HOUSE_START_2: '',
          DATE_LISTED: '2023-07-13',
          SQUARE_FOOTAGE: 0,
          LATITUDE: 40.7187346,
          BOROUGH: 'Brooklyn',
          VOW: 1,
          NEIGHBORHOODS: 'Williamsburg',
          VTOUR2: '',
          ZIP_CODE: '11249',
          LONGITUDE: -73.964565,
          TAXES: 0,
          STATE: 'NY',
          NO_SHARES: 0,
          REBNY_LISTING_ID: 'RSFT-00120000005843',
          CYOF: 0,
          HIDEADDRESS: 0,
          DEDUCTIBLE: '0%',
          BEDROOMS: 0.0,
          AGENT_PHONE: '(305) 494-1020',
          COOLING_SYSTEM: 'Central AC',
          PROPERTY_TYPE: 'Condo',
          OP: '',
          BUILDING_ACCESS_NOTE: '',
          DATE_AVAILABLE: '2023-08-31',
          LISTING_CATEGORY: 'Exclusive',
          CLOSING_PRICE: '',
          DATE_UPDATE: '2023-07-27 06:12:00',
        },
        {
          MONTHSFREEREQMINLEASE: '',
          CLOSING_DATE: '',
          OPEN_HOUSE_REMARK: '',
          HEATING_SYSTEM: '',
          ID: 1217381,
          PHOTOS: [
            {
              ORIGINAL_URL:
                'https://brickandmortar.resoftsys.com/assets/uploads/property_images/228_Metropolitan_8_-_0_(4).jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1217381_130926421.jpg',
              SORT_ORDER: 1,
              LISTING_ID: 1217381,
              WIDTH: 1024,
              HEIGHT: 485,
            },
            {
              ORIGINAL_URL:
                'https://brickandmortar.resoftsys.com/assets/uploads/property_images/228_Metropolitan_8_-_0_(12).jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1217381_130926422.jpg',
              SORT_ORDER: 2,
              LISTING_ID: 1217381,
              WIDTH: 1024,
              HEIGHT: 485,
            },
            {
              ORIGINAL_URL:
                'https://brickandmortar.resoftsys.com/assets/uploads/property_images/228_Metropolitan_8_-_0_(11).jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1217381_130926423.jpg',
              SORT_ORDER: 3,
              LISTING_ID: 1217381,
              WIDTH: 1024,
              HEIGHT: 485,
            },
            {
              ORIGINAL_URL:
                'https://brickandmortar.resoftsys.com/assets/uploads/property_images/228_Metropolitan_8_-_0_(10).jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1217381_130926424.jpg',
              SORT_ORDER: 4,
              LISTING_ID: 1217381,
              WIDTH: 1024,
              HEIGHT: 485,
            },
            {
              ORIGINAL_URL:
                'https://brickandmortar.resoftsys.com/assets/uploads/property_images/228_Metropolitan_8_-_0_(2).jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1217381_130926425.jpg',
              SORT_ORDER: 5,
              LISTING_ID: 1217381,
              WIDTH: 1024,
              HEIGHT: 485,
            },
            {
              ORIGINAL_URL:
                'https://brickandmortar.resoftsys.com/assets/uploads/property_images/228_Metropolitan_8_-_0_(9).jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1217381_130926426.jpg',
              SORT_ORDER: 6,
              LISTING_ID: 1217381,
              WIDTH: 1024,
              HEIGHT: 485,
            },
            {
              ORIGINAL_URL:
                'https://brickandmortar.resoftsys.com/assets/uploads/property_images/228_Metropolitan_8_-_0_(13).jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1217381_130926427.jpg',
              SORT_ORDER: 7,
              LISTING_ID: 1217381,
              WIDTH: 1024,
              HEIGHT: 485,
            },
            {
              ORIGINAL_URL:
                'https://brickandmortar.resoftsys.com/assets/uploads/property_images/228_Metropolitan_8_-_0_(5).jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1217381_130926428.jpg',
              SORT_ORDER: 8,
              LISTING_ID: 1217381,
              WIDTH: 1024,
              HEIGHT: 485,
            },
            {
              ORIGINAL_URL:
                'https://brickandmortar.resoftsys.com/assets/uploads/property_images/228_Metropolitan_8_-_0_(7).jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1217381_130926429.jpg',
              SORT_ORDER: 9,
              LISTING_ID: 1217381,
              WIDTH: 1024,
              HEIGHT: 485,
            },
            {
              ORIGINAL_URL:
                'https://brickandmortar.resoftsys.com/assets/uploads/property_images/228_Metropolitan_8_-_0_(8).jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1217381_130926430.jpg',
              SORT_ORDER: 10,
              LISTING_ID: 1217381,
              WIDTH: 1024,
              HEIGHT: 485,
            },
          ],
          NEIGHBORHOOD_ID: 106,
          REBNY_AGENT_ID: 'RBNY-65573',
          BATHROOMS: 1.0,
          UTILITIESINCLUDED: '',
          AGENT_IMAGE: '',
          EXPOSURE_REMARK: '',
          COMPANY_NAME: 'Brick & Mortar LLC',
          MAX_LEASE_TERM: 24,
          LISTING_TITLE: 'Metropolitan Avenue',
          CONDITION: '',
          OPEN_HOUSE_END_4: '',
          MIN_LEASE_TERM: 12,
          OPEN_HOUSE_END_2: '',
          OPEN_HOUSE_END_3: '',
          OPEN_HOUSE_END_1: '',
          FLOOR_NUMBER: '',
          DOWN_PAYMENT: '0%',
          NUM_IMAGES: 10,
          STORIES: 0,
          VTOUR: '',
          URL: 'https://brickandmortar.com/listing/for-rent/228_metropolitan_avenue_unit_08/rj_5859',
          COMMON_CHARGES: 0.0,
          DESCRIPTION:
            "Our thoughts . . . .\r\n\r\nHere's an exciting chance to live in North Williamsburg, Brooklyn! \r\n\r\nIt's right in the center, and guess what? It's just across the street from the Williamsburg Apple Store! One of the many added bonuses! \r\n\r\nThe apartment is available tentatively for a September 15th, 2023 move-in-date.\r\n\r\nThis true two-bedroom apartment epitomizes tranquility amid the bustling metropolis, providing an idyllic respite from the city's incessant hum. Positioned in close proximity to the myriad offerings of Williamsburg and its surroundings, the residence grants unfettered access to the vibrant urban landscape.\r\n\r\nWithin a short distance lies the Bedford Ave L train, ensuring swift and efficient commuting possibilities. Additionally, both heat and hot water services are included in the rent.\r\n\r\nCats are OK, sorry no dogs allowed.\r\n\r\nCall today to schedule a showing.",
          CATEGORY: 2,
          BUILDING_ID: 85273,
          DATE_CREATE: '2023-07-20 11:54:00',
          AGENT_MOBILE: '',
          SOURCEDB: 'ROLEX',
          OPEN_HOUSE_REMARK_2: '',
          OPEN_HOUSE_REMARK_4: '',
          OPEN_HOUSE_REMARK_3: '',
          STREET: 'Metropolitan Avenue',
          CUSTOMFIELDS: '',
          OFF_MARKET_STATUS: '',
          CONCESSION: '',
          CROSS_STREET: 'Bedford Avenue/Driggs Avenue',
          FREEMONTH: '',
          CITY: 'Brooklyn',
          BROKER_NOTE: 'Call Listing Agent',
          STREETEASY_LINK: '',
          UNIT_NUMBER: '08',
          OFFICE_ID: 1123,
          VENDOR_AGENT_ID: '',
          STREET_NUMBER: '228',
          AGENT_NAME: 'Martin Olsen',
          TOTAL_ROOMS: 3.0,
          STATUS: 'For Rent',
          AMENITIES: '',
          KEYCODE: '',
          IDX: 1,
          NETRENT: '',
          COBROKE_FEE: '15%',
          OFFICE_PHONE: '(305) 494-1020',
          PRICE: 3000,
          NEWDEVELOPMENT: 0,
          SECURITYDEPOSIT: '',
          NAME: '',
          MAINTENANCE: 0.0,
          OPEN_HOUSE_START_3: '',
          PETS_POLICY: 'Cats Only',
          OPEN_HOUSE_START_4: '',
          OPEN_HOUSE_START_1: '',
          ADDRESS: '228 Metropolitan Avenue, Unit 08',
          AGENT_EMAIL: 'martin@brickandmortar.com',
          OPEN_HOUSE_START_2: '',
          DATE_LISTED: '2023-07-20',
          SQUARE_FOOTAGE: 0,
          LATITUDE: 40.7148551941,
          BOROUGH: 'Brooklyn',
          VOW: 1,
          NEIGHBORHOODS: 'Williamsburg',
          VTOUR2: '',
          ZIP_CODE: '11211',
          LONGITUDE: -73.9598464966,
          TAXES: 0,
          STATE: 'NY',
          NO_SHARES: 0,
          REBNY_LISTING_ID: 'RSFT-00120000005859',
          CYOF: 0,
          HIDEADDRESS: 0,
          DEDUCTIBLE: '0%',
          BEDROOMS: 2.0,
          AGENT_PHONE: '(718) 809-1099',
          COOLING_SYSTEM: '',
          PROPERTY_TYPE: 'Condo',
          OP: '',
          BUILDING_ACCESS_NOTE: '',
          DATE_AVAILABLE: '2023-09-14',
          LISTING_CATEGORY: 'Exclusive',
          CLOSING_PRICE: '',
          DATE_UPDATE: '2023-07-27 06:12:00',
        },
        {
          MONTHSFREEREQMINLEASE: '',
          CLOSING_DATE: '',
          OPEN_HOUSE_REMARK: '',
          HEATING_SYSTEM: '',
          ID: 1218023,
          PHOTOS: [
            {
              ORIGINAL_URL: 'https://brickandmortar.resoftsys.com/assets/uploads/property_images/1105.jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1218023_130937135.jpg',
              SORT_ORDER: 3,
              LISTING_ID: 1218023,
              WIDTH: 1024,
              HEIGHT: 683,
            },
            {
              ORIGINAL_URL: 'https://brickandmortar.resoftsys.com/assets/uploads/property_images/285.jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1218023_130937136.jpg',
              SORT_ORDER: 4,
              LISTING_ID: 1218023,
              WIDTH: 1024,
              HEIGHT: 683,
            },
            {
              ORIGINAL_URL: 'https://brickandmortar.resoftsys.com/assets/uploads/property_images/375.jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1218023_130937137.jpg',
              SORT_ORDER: 5,
              LISTING_ID: 1218023,
              WIDTH: 1024,
              HEIGHT: 683,
            },
            {
              ORIGINAL_URL: 'https://brickandmortar.resoftsys.com/assets/uploads/property_images/483.jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1218023_130937138.jpg',
              SORT_ORDER: 6,
              LISTING_ID: 1218023,
              WIDTH: 1024,
              HEIGHT: 683,
            },
            {
              ORIGINAL_URL: 'https://brickandmortar.resoftsys.com/assets/uploads/property_images/574.jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1218023_130937139.jpg',
              SORT_ORDER: 7,
              LISTING_ID: 1218023,
              WIDTH: 1024,
              HEIGHT: 683,
            },
            {
              ORIGINAL_URL: 'https://brickandmortar.resoftsys.com/assets/uploads/property_images/670.jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1218023_130937140.jpg',
              SORT_ORDER: 8,
              LISTING_ID: 1218023,
              WIDTH: 1024,
              HEIGHT: 683,
            },
            {
              ORIGINAL_URL: 'https://brickandmortar.resoftsys.com/assets/uploads/property_images/771.jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1218023_130937141.jpg',
              SORT_ORDER: 9,
              LISTING_ID: 1218023,
              WIDTH: 1024,
              HEIGHT: 683,
            },
            {
              ORIGINAL_URL:
                'https://brickandmortar.resoftsys.com/assets/uploads/property_images/1520_myrtle_avenue_2.jpg',
              PHOTO_TITLE: 'Floor Plan',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1218023_130937143.jpg',
              SORT_ORDER: 9,
              LISTING_ID: 1218023,
              WIDTH: 1024,
              HEIGHT: 725,
            },
            {
              ORIGINAL_URL: 'https://brickandmortar.resoftsys.com/assets/uploads/property_images/848.jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1218023_130937142.jpg',
              SORT_ORDER: 10,
              LISTING_ID: 1218023,
              WIDTH: 1024,
              HEIGHT: 683,
            },
          ],
          NEIGHBORHOOD_ID: 64,
          REBNY_AGENT_ID: 'RBNY-76419',
          BATHROOMS: 1.0,
          UTILITIESINCLUDED: '',
          AGENT_IMAGE: '',
          EXPOSURE_REMARK: '',
          COMPANY_NAME: 'Brick & Mortar LLC',
          MAX_LEASE_TERM: 24,
          LISTING_TITLE: 'Myrtle Avenue',
          CONDITION: '',
          OPEN_HOUSE_END_4: '',
          MIN_LEASE_TERM: 12,
          OPEN_HOUSE_END_2: '',
          OPEN_HOUSE_END_3: '',
          OPEN_HOUSE_END_1: '',
          FLOOR_NUMBER: '',
          DOWN_PAYMENT: '0%',
          NUM_IMAGES: 9,
          STORIES: 0,
          VTOUR: '',
          URL: 'https://brickandmortar.com/listing/for-rent/1520_myrtle_avenue_unit_2l/rj_5871',
          COMMON_CHARGES: 0.0,
          DESCRIPTION:
            "Welcome to this newly renovated 1.5 bedroom apartment. This floor through apartment offers a bedroom, with an additional space for a home office, nursery, or home gym. Additionally, the home has wood floors, stainless steel appliances in the kitchen, and is in close proximity to the train. The M and L train are under a minute. The supermarket, Food Bazaar, is maybe 2 minutes away . *Heat and hot water included.\r\n\r\nJust on the border of Bushwick/Ridgwood, home to great food, bars, and more.  Onderdonk Cafe, Porcelain, Dromedary Urban Tiki Bar, Old Stanleys, Talon Bar, Honey Moon Coffee shop, Rudy's Pastry shop (yum), and soo much more.",
          CATEGORY: 2,
          BUILDING_ID: 85854,
          DATE_CREATE: '2023-07-24 11:15:00',
          AGENT_MOBILE: '',
          SOURCEDB: 'ROLEX',
          OPEN_HOUSE_REMARK_2: '',
          OPEN_HOUSE_REMARK_4: '',
          OPEN_HOUSE_REMARK_3: '',
          STREET: 'Myrtle Avenue',
          CUSTOMFIELDS: '',
          OFF_MARKET_STATUS: '',
          CONCESSION: '',
          CROSS_STREET: '',
          FREEMONTH: '',
          CITY: 'Brooklyn',
          BROKER_NOTE: 'Call Listing Agent',
          STREETEASY_LINK: '',
          UNIT_NUMBER: '2L',
          OFFICE_ID: 1123,
          VENDOR_AGENT_ID: '',
          STREET_NUMBER: '1520',
          AGENT_NAME: 'David Soltero',
          TOTAL_ROOMS: 4.0,
          STATUS: 'For Rent',
          AMENITIES: '',
          KEYCODE: '',
          IDX: 1,
          NETRENT: '',
          COBROKE_FEE: '0%',
          OFFICE_PHONE: '(305) 494-1020',
          PRICE: 2400,
          NEWDEVELOPMENT: 0,
          SECURITYDEPOSIT: '',
          NAME: '',
          MAINTENANCE: 0.0,
          OPEN_HOUSE_START_3: '',
          PETS_POLICY: 'Case By Case',
          OPEN_HOUSE_START_4: '',
          OPEN_HOUSE_START_1: '',
          ADDRESS: '1520 Myrtle Avenue, Unit 2L',
          AGENT_EMAIL: 'dsoltero@brickandmortar.com',
          OPEN_HOUSE_START_2: '',
          DATE_LISTED: '2023-07-24',
          SQUARE_FOOTAGE: 0,
          LATITUDE: 40.6991920471,
          BOROUGH: 'Brooklyn',
          VOW: 1,
          NEIGHBORHOODS: 'Bushwick',
          VTOUR2: '',
          ZIP_CODE: '11237',
          LONGITUDE: -73.9130477905,
          TAXES: 0,
          STATE: 'NY',
          NO_SHARES: 0,
          REBNY_LISTING_ID: 'RSFT-00120000005871',
          CYOF: 1,
          HIDEADDRESS: 0,
          DEDUCTIBLE: '0%',
          BEDROOMS: 2.0,
          AGENT_PHONE: '(718) 599-0869',
          COOLING_SYSTEM: '',
          PROPERTY_TYPE: 'Apartment',
          OP: '',
          BUILDING_ACCESS_NOTE: '',
          DATE_AVAILABLE: '',
          LISTING_CATEGORY: 'Exclusive',
          CLOSING_PRICE: '',
          DATE_UPDATE: '2023-07-27 06:12:00',
        },
        {
          MONTHSFREEREQMINLEASE: '',
          CLOSING_DATE: '',
          OPEN_HOUSE_REMARK: '',
          HEATING_SYSTEM: '',
          ID: 1212953,
          PHOTOS: [],
          NEIGHBORHOOD_ID: 101,
          REBNY_AGENT_ID: 'RBNY-113599',
          BATHROOMS: 1.0,
          UTILITIESINCLUDED: '',
          AGENT_IMAGE: '',
          EXPOSURE_REMARK: '',
          COMPANY_NAME: 'Nest Seekers LLC',
          MAX_LEASE_TERM: 12,
          LISTING_TITLE: 'Ocean Avenue',
          CONDITION: 'Excellent',
          OPEN_HOUSE_END_4: '',
          MIN_LEASE_TERM: 12,
          OPEN_HOUSE_END_2: '',
          OPEN_HOUSE_END_3: '',
          OPEN_HOUSE_END_1: '',
          FLOOR_NUMBER: '',
          DOWN_PAYMENT: '0%',
          NUM_IMAGES: 0,
          STORIES: 7,
          VTOUR: '',
          URL: 'https://www.nestseekers.com/2481ocean.com',
          COMMON_CHARGES: 0.0,
          DESCRIPTION:
            "Enter this oversized 1 BED/1BATH luxury unit and feel an immediate relief to be home to an open living space lay out.<br><br>The oversized bedroom features large windows and a oversized closet for all your storage. Wake up and open the doors to your Juliet balcony in your bedroom. Beautiful sunlight throughout the unit. The large east facing windows in the living room let in beautiful bright sunlight and give an open view. The kitchen features stainless-steel appliances, a sleek modern design.<br><br>Each unit features a concealed washer dryer in unit. Assigned parking is available at an extra fee while spots last.<br><br>South Brooklyn's neighborhood of Homecrest is rapidly growing and provides convenient transportation to Manhattan with the B & Q train. Take the B or Q in the opposite direction for fast access to South Brooklyn's beaches. Enjoy the laid-back feel of living in a town where others dream to vacation. Madison is known for its many shops along Kings Highway and  Avenue U and offers a neighborhood hospital, post office, banks, playgrounds, and more!<br><br>one month broker fee applies !",
          CATEGORY: 2,
          BUILDING_ID: 111844,
          DATE_CREATE: '2023-06-30 12:37:00',
          AGENT_MOBILE: '',
          SOURCEDB: 'ROLEX',
          OPEN_HOUSE_REMARK_2: '',
          OPEN_HOUSE_REMARK_4: '',
          OPEN_HOUSE_REMARK_3: '',
          STREET: 'Ocean Avenue',
          CUSTOMFIELDS: '',
          OFF_MARKET_STATUS: '',
          CONCESSION: '',
          CROSS_STREET: 'Avenue S/Avenue T',
          FREEMONTH: '',
          CITY: 'Brooklyn',
          BROKER_NOTE: 'By Appointment Only\rCompensation Remarks: 1 Month Commission Fee\rLease Term: TwelveMonths',
          STREETEASY_LINK: '',
          UNIT_NUMBER: '6I',
          OFFICE_ID: 692,
          VENDOR_AGENT_ID: '',
          STREET_NUMBER: '2481',
          AGENT_NAME: 'Annael Kamar',
          TOTAL_ROOMS: 3.0,
          STATUS: 'For Rent',
          AMENITIES: 'Balcony,Washer,Laundry In Unit,Elevator,Laundry,',
          KEYCODE: '',
          IDX: 1,
          NETRENT: '',
          COBROKE_FEE: '0%',
          OFFICE_PHONE: '(212) 252-8772',
          PRICE: 2600,
          NEWDEVELOPMENT: 0,
          SECURITYDEPOSIT: '$ 2600',
          NAME: '',
          MAINTENANCE: 0.0,
          OPEN_HOUSE_START_3: '',
          PETS_POLICY: 'No Pets',
          OPEN_HOUSE_START_4: '',
          OPEN_HOUSE_START_1: '',
          ADDRESS: '2481 Ocean Avenue, Unit 6I',
          AGENT_EMAIL: 'annaelk@nestseekers.com',
          OPEN_HOUSE_START_2: '',
          DATE_LISTED: '2023-06-30',
          SQUARE_FOOTAGE: 900,
          LATITUDE: 40.6010818481,
          BOROUGH: 'Brooklyn',
          VOW: 1,
          NEIGHBORHOODS: 'Sheepshead Bay',
          VTOUR2: '',
          ZIP_CODE: '11229',
          LONGITUDE: -73.9513473511,
          TAXES: 0,
          STATE: 'NY',
          NO_SHARES: 0,
          REBNY_LISTING_ID: 'OLRS-2046016',
          CYOF: 0,
          HIDEADDRESS: 0,
          DEDUCTIBLE: '0%',
          BEDROOMS: 1.0,
          AGENT_PHONE: '(347) 522-4767',
          COOLING_SYSTEM: '',
          PROPERTY_TYPE: 'Apartment',
          OP: '',
          BUILDING_ACCESS_NOTE: '',
          DATE_AVAILABLE: '',
          LISTING_CATEGORY: 'Exclusive',
          CLOSING_PRICE: '',
          DATE_UPDATE: '2023-07-27 06:08:00',
        },
        {
          MONTHSFREEREQMINLEASE: '',
          CLOSING_DATE: '',
          OPEN_HOUSE_REMARK: '',
          HEATING_SYSTEM: '',
          ID: 1213091,
          PHOTOS: [
            {
              ORIGINAL_URL:
                'https://www.compass.com/m/p-ohp_7,op_192/0/eb729b7c-aeab-4dcf-ad8a-0b8778913b4b/origin.jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1213091_130860194.jpg',
              SORT_ORDER: 1,
              LISTING_ID: 1213091,
              WIDTH: 1024,
              HEIGHT: 683,
            },
            {
              ORIGINAL_URL:
                'https://www.compass.com/m/p-ohp_7,op_192/0/b72bb2c0-a8a7-43a4-902e-bfdc1efc396e/origin.jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1213091_130860195.jpg',
              SORT_ORDER: 2,
              LISTING_ID: 1213091,
              WIDTH: 1024,
              HEIGHT: 683,
            },
            {
              ORIGINAL_URL:
                'https://www.compass.com/m/p-ohp_7,op_192/0/e999c897-7172-45b2-81ea-0a8a0c362810/origin.jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1213091_130860196.jpg',
              SORT_ORDER: 3,
              LISTING_ID: 1213091,
              WIDTH: 1024,
              HEIGHT: 683,
            },
            {
              ORIGINAL_URL:
                'https://www.compass.com/m/p-ohp_7,op_192/0/e0928be0-da16-4384-9afb-d5dbd53cf5f5/origin.jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1213091_130860197.jpg',
              SORT_ORDER: 4,
              LISTING_ID: 1213091,
              WIDTH: 1024,
              HEIGHT: 683,
            },
            {
              ORIGINAL_URL:
                'https://www.compass.com/m/p-ohp_7,op_192/0/16ec5a92-1e13-4102-903b-aa0803694815/origin.jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1213091_130860198.jpg',
              SORT_ORDER: 5,
              LISTING_ID: 1213091,
              WIDTH: 1024,
              HEIGHT: 683,
            },
            {
              ORIGINAL_URL:
                'https://www.compass.com/m/p-ohp_7,op_192/0/a213e3c3-5468-41b6-ad4c-88593f997358/origin.jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1213091_130860199.jpg',
              SORT_ORDER: 6,
              LISTING_ID: 1213091,
              WIDTH: 1024,
              HEIGHT: 683,
            },
            {
              ORIGINAL_URL: 'https://www.compass.com/m/p-ohp_7,op_39/0/c69f260b-ff12-462e-8613-b335d55a50f2/origin.jpg',
              PHOTO_TITLE: 'Floor Plan',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1213091_130860200.jpg',
              SORT_ORDER: 7,
              LISTING_ID: 1213091,
              WIDTH: 712,
              HEIGHT: 768,
            },
          ],
          NEIGHBORHOOD_ID: 387,
          REBNY_AGENT_ID: 'RBNY-102461',
          BATHROOMS: 1.0,
          UTILITIESINCLUDED: '',
          AGENT_IMAGE: '',
          EXPOSURE_REMARK: '',
          COMPANY_NAME: 'Compass',
          MAX_LEASE_TERM: 12,
          LISTING_TITLE: 'West 34th Street',
          CONDITION: '',
          OPEN_HOUSE_END_4: '',
          MIN_LEASE_TERM: 12,
          OPEN_HOUSE_END_2: '',
          OPEN_HOUSE_END_3: '',
          OPEN_HOUSE_END_1: '',
          FLOOR_NUMBER: '10',
          DOWN_PAYMENT: '0%',
          NUM_IMAGES: 7,
          STORIES: 18,
          VTOUR: '',
          URL: 'https://www.compass.com/listing/1345128232136179961/view',
          COMMON_CHARGES: 0.0,
          DESCRIPTION:
            'Welcome to Apartment 10L at 430 West 34th Street, located in the heart of Hudson Yards. As you enter this alcoved studio you are immediately greeted by the south-facing sunny city views. The large living area comfortably fits a king-size bed, a work-from-home setup, and a full living space. The two large closets offer custom storage solutions. The alcoved renovated kitchen features a suite of stainless steel appliances including a dishwasher. The bathroom offers sleek modern finishes and great storage. Additionally, the unit features hardwood floors, through-wall AC, a large bright windows.\n\n430 West 34th Street features a 24-hours doorman, roof deck, laundry room,  and updated hallways and lobby. The building is centrally located just minutes from Penn Station, The Shops & Restaurants at Hudson Yards, Whole Foods, and The Highline. \n\nTransportation nearby: A, C, E, 1, 2, 3, 7.',
          CATEGORY: 2,
          BUILDING_ID: 5369,
          DATE_CREATE: '2023-06-30 19:52:00',
          AGENT_MOBILE: '',
          SOURCEDB: 'ROLEX',
          OPEN_HOUSE_REMARK_2: '',
          OPEN_HOUSE_REMARK_4: '',
          OPEN_HOUSE_REMARK_3: '',
          STREET: 'West 34th Street',
          CUSTOMFIELDS: '',
          OFF_MARKET_STATUS: '',
          CONCESSION: '',
          CROSS_STREET: '9th & 10th Avenues',
          FREEMONTH: '',
          CITY: 'NEW YORK',
          BROKER_NOTE: 'Agent Shows\rCompensation Remarks: Contact Agent\rLease Term: TwelveMonths',
          STREETEASY_LINK: 'http://streeteasy.com/building/430-west-34-street-new_york',
          UNIT_NUMBER: '10L',
          OFFICE_ID: 910,
          VENDOR_AGENT_ID: '',
          STREET_NUMBER: '430',
          AGENT_NAME: 'Batsheva Loeb',
          TOTAL_ROOMS: 2.5,
          STATUS: 'For Rent',
          AMENITIES: 'Doorman,Elevator,Laundry,Bicycle Room,Storage,Roof Deck,City View,Pied a Terre,',
          KEYCODE: '',
          IDX: 1,
          NETRENT: '',
          COBROKE_FEE: '0%',
          OFFICE_PHONE: '(212) 913-9085',
          PRICE: 3100,
          NEWDEVELOPMENT: 0,
          SECURITYDEPOSIT: '',
          NAME: '',
          MAINTENANCE: 0.0,
          OPEN_HOUSE_START_3: '',
          PETS_POLICY: 'Pets OK',
          OPEN_HOUSE_START_4: '',
          OPEN_HOUSE_START_1: '',
          ADDRESS: '430 West 34th Street, Unit 10L',
          AGENT_EMAIL: 'batsheva.loeb@compass.com',
          OPEN_HOUSE_START_2: '',
          DATE_LISTED: '2023-06-30',
          SQUARE_FOOTAGE: 0,
          LATITUDE: 40.753661,
          BOROUGH: 'Manhattan',
          VOW: 1,
          NEIGHBORHOODS: 'Hudson Yards',
          VTOUR2: '',
          ZIP_CODE: '10001',
          LONGITUDE: -73.997669,
          TAXES: 0,
          STATE: 'NY',
          NO_SHARES: 0,
          REBNY_LISTING_ID: 'OLRS-00011821284',
          CYOF: 0,
          HIDEADDRESS: 0,
          DEDUCTIBLE: '0%',
          BEDROOMS: 0.0,
          AGENT_PHONE: '(443) 509-4721',
          COOLING_SYSTEM: '',
          PROPERTY_TYPE: 'Coop',
          OP: '',
          BUILDING_ACCESS_NOTE:
            'MANAGEMENT: Lawrence Properties 855 Ave of the Americas,  New York NY 10001 Jack Terebola 868-8320\rSUPER: Pasquale D Onofrio 244-7318\r',
          DATE_AVAILABLE: '2023-09-01',
          LISTING_CATEGORY: 'Exclusive',
          CLOSING_PRICE: '',
          DATE_UPDATE: '2023-07-27 06:05:00',
        },
        {
          MONTHSFREEREQMINLEASE: '',
          CLOSING_DATE: '',
          OPEN_HOUSE_REMARK: '',
          HEATING_SYSTEM: '',
          ID: 1213118,
          PHOTOS: [
            {
              ORIGINAL_URL:
                'https://images.realty.mx/ecda8ff7933831de47cded3bb238b613/images/assets/1750633_116522384.jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1213118_130860864.jpg',
              SORT_ORDER: 1,
              LISTING_ID: 1213118,
              WIDTH: 1024,
              HEIGHT: 683,
            },
            {
              ORIGINAL_URL:
                'https://images.realty.mx/ecda8ff7933831de47cded3bb238b613/images/assets/1750633_116522382.jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1213118_130860865.jpg',
              SORT_ORDER: 2,
              LISTING_ID: 1213118,
              WIDTH: 1024,
              HEIGHT: 683,
            },
            {
              ORIGINAL_URL:
                'https://images.realty.mx/ecda8ff7933831de47cded3bb238b613/images/assets/1750633_116522385.jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1213118_130860866.jpg',
              SORT_ORDER: 3,
              LISTING_ID: 1213118,
              WIDTH: 1024,
              HEIGHT: 683,
            },
            {
              ORIGINAL_URL:
                'https://images.realty.mx/ecda8ff7933831de47cded3bb238b613/images/assets/1750633_116522383.jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1213118_130860867.jpg',
              SORT_ORDER: 4,
              LISTING_ID: 1213118,
              WIDTH: 1024,
              HEIGHT: 683,
            },
            {
              ORIGINAL_URL:
                'https://images.realty.mx/ecda8ff7933831de47cded3bb238b613/images/assets/1750633_116522386.jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1213118_130860868.jpg',
              SORT_ORDER: 5,
              LISTING_ID: 1213118,
              WIDTH: 455,
              HEIGHT: 683,
            },
          ],
          NEIGHBORHOOD_ID: 335,
          REBNY_AGENT_ID: 'RBNY-45385',
          BATHROOMS: 1.0,
          UTILITIESINCLUDED: '',
          AGENT_IMAGE: '',
          EXPOSURE_REMARK: '',
          COMPANY_NAME: 'Bond New York Properties LLC',
          MAX_LEASE_TERM: 12,
          LISTING_TITLE: 'East 33rd Street',
          CONDITION: 'New Mint',
          OPEN_HOUSE_END_4: '',
          MIN_LEASE_TERM: 12,
          OPEN_HOUSE_END_2: '',
          OPEN_HOUSE_END_3: '',
          OPEN_HOUSE_END_1: '',
          FLOOR_NUMBER: '',
          DOWN_PAYMENT: '0%',
          NUM_IMAGES: 5,
          STORIES: 4,
          VTOUR: 'https://my.matterport.com/show/?m=6oQwcgLadVD',
          URL: 'https://www.bondnewyork.com/index.cfm?page=details&id=1750633',
          COMMON_CHARGES: 0.0,
          DESCRIPTION:
            "Great Studio in Murray Hill Prime. Beautiful open space. Open kitchen, Arched doorway. Large closet. This is an intimate walk up building located on 33rd street and Third Avenue, great location. Close to: shopping, restaurants, night life, fine dining, Trader Joes, Fairway, 24 hour pharmacy's, major trains and more.<br><br><br><br><br><br>BOND New York Properties is a licensed real estate broker that proudly supports equal housing opportunity.",
          CATEGORY: 2,
          BUILDING_ID: 38608,
          DATE_CREATE: '2023-07-01 09:31:00',
          AGENT_MOBILE: '',
          SOURCEDB: 'ROLEX',
          OPEN_HOUSE_REMARK_2: '',
          OPEN_HOUSE_REMARK_4: '',
          OPEN_HOUSE_REMARK_3: '',
          STREET: 'East 33rd Street',
          CUSTOMFIELDS: '',
          OFF_MARKET_STATUS: '',
          CONCESSION: '',
          CROSS_STREET: 'Lexington Ave/3rd Ave',
          FREEMONTH: '',
          CITY: 'New York',
          BROKER_NOTE: 'Please email: moran@bondnewyork.com\rLease Term: TwelveMonths',
          STREETEASY_LINK: 'http://streeteasy.com/building/167-east-33-street-manhattan',
          UNIT_NUMBER: '4B',
          OFFICE_ID: 187,
          VENDOR_AGENT_ID: '',
          STREET_NUMBER: '167',
          AGENT_NAME: 'Moran Khousravi',
          TOTAL_ROOMS: 2.0,
          STATUS: 'For Rent',
          AMENITIES: '',
          KEYCODE: '',
          IDX: 1,
          NETRENT: '',
          COBROKE_FEE: '7.5%',
          OFFICE_PHONE: '(212) 582-2009',
          PRICE: 2500,
          NEWDEVELOPMENT: 0,
          SECURITYDEPOSIT: '',
          NAME: '',
          MAINTENANCE: 0.0,
          OPEN_HOUSE_START_3: '',
          PETS_POLICY: 'No Pets',
          OPEN_HOUSE_START_4: '',
          OPEN_HOUSE_START_1: '',
          ADDRESS: '167 East 33rd Street, Unit 4B',
          AGENT_EMAIL: 'moran@bondnewyork.com',
          OPEN_HOUSE_START_2: '',
          DATE_LISTED: '2023-07-01',
          SQUARE_FOOTAGE: 0,
          LATITUDE: 40.7454193,
          BOROUGH: 'Manhattan',
          VOW: 1,
          NEIGHBORHOODS: 'Kips Bay',
          VTOUR2: '',
          ZIP_CODE: '10016',
          LONGITUDE: -73.9789761,
          TAXES: 0,
          STATE: 'NY',
          NO_SHARES: 0,
          REBNY_LISTING_ID: 'RLMX-91067',
          CYOF: 0,
          HIDEADDRESS: 0,
          DEDUCTIBLE: '0%',
          BEDROOMS: 0.0,
          AGENT_PHONE: '(917) 392-4085',
          COOLING_SYSTEM: '',
          PROPERTY_TYPE: 'Apartment',
          OP: '',
          BUILDING_ACCESS_NOTE: '',
          DATE_AVAILABLE: '',
          LISTING_CATEGORY: 'Exclusive',
          CLOSING_PRICE: '',
          DATE_UPDATE: '2023-07-27 06:05:00',
        },
        {
          MONTHSFREEREQMINLEASE: '',
          CLOSING_DATE: '',
          OPEN_HOUSE_REMARK: '',
          HEATING_SYSTEM: '',
          ID: 1214996,
          PHOTOS: [
            {
              ORIGINAL_URL:
                'https://images.realty.mx/ecda8ff7933831de47cded3bb238b613/images/assets/1757407_116708173.jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1214996_130888924.jpg',
              SORT_ORDER: 1,
              LISTING_ID: 1214996,
              WIDTH: 1024,
              HEIGHT: 576,
            },
            {
              ORIGINAL_URL:
                'https://images.realty.mx/ecda8ff7933831de47cded3bb238b613/images/assets/1757407_116708174.jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1214996_130888925.jpg',
              SORT_ORDER: 2,
              LISTING_ID: 1214996,
              WIDTH: 1024,
              HEIGHT: 576,
            },
            {
              ORIGINAL_URL:
                'https://images.realty.mx/ecda8ff7933831de47cded3bb238b613/images/assets/1757407_116708175.jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1214996_130888926.jpg',
              SORT_ORDER: 3,
              LISTING_ID: 1214996,
              WIDTH: 1024,
              HEIGHT: 576,
            },
            {
              ORIGINAL_URL:
                'https://images.realty.mx/ecda8ff7933831de47cded3bb238b613/images/assets/1757407_116708177.jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1214996_130888927.jpg',
              SORT_ORDER: 4,
              LISTING_ID: 1214996,
              WIDTH: 1024,
              HEIGHT: 576,
            },
            {
              ORIGINAL_URL:
                'https://images.realty.mx/ecda8ff7933831de47cded3bb238b613/images/assets/1757407_116708179.jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1214996_130888928.jpg',
              SORT_ORDER: 5,
              LISTING_ID: 1214996,
              WIDTH: 1024,
              HEIGHT: 681,
            },
            {
              ORIGINAL_URL:
                'https://images.realty.mx/ecda8ff7933831de47cded3bb238b613/images/assets/1757407_116708182.jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1214996_130888929.jpg',
              SORT_ORDER: 6,
              LISTING_ID: 1214996,
              WIDTH: 1024,
              HEIGHT: 681,
            },
            {
              ORIGINAL_URL:
                'https://images.realty.mx/ecda8ff7933831de47cded3bb238b613/images/assets/1757407_116708187.jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1214996_130888930.jpg',
              SORT_ORDER: 7,
              LISTING_ID: 1214996,
              WIDTH: 1024,
              HEIGHT: 681,
            },
            {
              ORIGINAL_URL:
                'https://images.realty.mx/ecda8ff7933831de47cded3bb238b613/images/assets/1757407_116708188.jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1214996_130888931.jpg',
              SORT_ORDER: 8,
              LISTING_ID: 1214996,
              WIDTH: 1024,
              HEIGHT: 681,
            },
          ],
          NEIGHBORHOOD_ID: 335,
          REBNY_AGENT_ID: 'RBNY-45385',
          BATHROOMS: 1.0,
          UTILITIESINCLUDED: '',
          AGENT_IMAGE: '',
          EXPOSURE_REMARK: '',
          COMPANY_NAME: 'Bond New York Properties LLC',
          MAX_LEASE_TERM: 12,
          LISTING_TITLE: 'East 33rd Street',
          CONDITION: 'New Mint',
          OPEN_HOUSE_END_4: '',
          MIN_LEASE_TERM: 12,
          OPEN_HOUSE_END_2: '',
          OPEN_HOUSE_END_3: '',
          OPEN_HOUSE_END_1: '',
          FLOOR_NUMBER: '',
          DOWN_PAYMENT: '0%',
          NUM_IMAGES: 8,
          STORIES: 4,
          VTOUR: 'https://my.matterport.com/show/?m=SpoHuaB8JSJ',
          URL: 'https://www.bondnewyork.com/index.cfm?page=details&id=1757407',
          COMMON_CHARGES: 0.0,
          DESCRIPTION:
            'Stunning Studio, Murray Hill prime.<br>Great Studio in Murray Hill Prime. Beautiful open space. Open kitchen, stainless steel appliances. Large closet. This is an intimate walk up building located on 33rd street and Third Avenue, great location. Close to: shopping, restaurants, night life, fine dining, Trader Joes, Fairway, 24 hour pharmacys, major trains and more.<br><br><br><br><br><br>BOND New York Properties is a licensed real estate broker that proudly supports equal housing opportunity.',
          CATEGORY: 2,
          BUILDING_ID: 38608,
          DATE_CREATE: '2023-07-10 19:02:00',
          AGENT_MOBILE: '',
          SOURCEDB: 'ROLEX',
          OPEN_HOUSE_REMARK_2: '',
          OPEN_HOUSE_REMARK_4: '',
          OPEN_HOUSE_REMARK_3: '',
          STREET: 'East 33rd Street',
          CUSTOMFIELDS: '',
          OFF_MARKET_STATUS: '',
          CONCESSION: '',
          CROSS_STREET: 'Lexington Ave/3rd Ave',
          FREEMONTH: '',
          CITY: 'New York',
          BROKER_NOTE: 'Please email: moran@bondnewyork.com\rLease Term: TwelveMonths',
          STREETEASY_LINK: 'http://streeteasy.com/building/167-east-33-street-manhattan',
          UNIT_NUMBER: '3B',
          OFFICE_ID: 187,
          VENDOR_AGENT_ID: '',
          STREET_NUMBER: '167',
          AGENT_NAME: 'Moran Khousravi',
          TOTAL_ROOMS: 2.0,
          STATUS: 'For Rent',
          AMENITIES: '',
          KEYCODE: '',
          IDX: 1,
          NETRENT: '',
          COBROKE_FEE: '7.5%',
          OFFICE_PHONE: '(212) 582-2009',
          PRICE: 2600,
          NEWDEVELOPMENT: 0,
          SECURITYDEPOSIT: '',
          NAME: '',
          MAINTENANCE: 0.0,
          OPEN_HOUSE_START_3: '',
          PETS_POLICY: 'No Pets',
          OPEN_HOUSE_START_4: '',
          OPEN_HOUSE_START_1: '',
          ADDRESS: '167 East 33rd Street, Unit 3B',
          AGENT_EMAIL: 'moran@bondnewyork.com',
          OPEN_HOUSE_START_2: '',
          DATE_LISTED: '2023-07-10',
          SQUARE_FOOTAGE: 0,
          LATITUDE: 40.7454193,
          BOROUGH: 'Manhattan',
          VOW: 1,
          NEIGHBORHOODS: 'Kips Bay',
          VTOUR2: '',
          ZIP_CODE: '10016',
          LONGITUDE: -73.9789761,
          TAXES: 0,
          STATE: 'NY',
          NO_SHARES: 0,
          REBNY_LISTING_ID: 'RLMX-91297',
          CYOF: 0,
          HIDEADDRESS: 0,
          DEDUCTIBLE: '0%',
          BEDROOMS: 0.0,
          AGENT_PHONE: '(917) 392-4085',
          COOLING_SYSTEM: '',
          PROPERTY_TYPE: 'Apartment',
          OP: '',
          BUILDING_ACCESS_NOTE: '',
          DATE_AVAILABLE: '',
          LISTING_CATEGORY: 'Exclusive',
          CLOSING_PRICE: '',
          DATE_UPDATE: '2023-07-27 06:05:00',
        },
        {
          MONTHSFREEREQMINLEASE: '',
          CLOSING_DATE: '',
          OPEN_HOUSE_REMARK: '',
          HEATING_SYSTEM: '',
          ID: 1215273,
          PHOTOS: [
            {
              ORIGINAL_URL: 'https://www.compass.com/m/p-ohp_7,op_46/0/7282a161-b476-49f9-9d90-c9423055cd70/origin.jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1215273_130893219.jpg',
              SORT_ORDER: 1,
              LISTING_ID: 1215273,
              WIDTH: 1024,
              HEIGHT: 684,
            },
            {
              ORIGINAL_URL: 'https://www.compass.com/m/p-ohp_7,op_46/0/059c5e66-c4ca-48c1-935d-56dd77b4eaa6/origin.jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1215273_130893220.jpg',
              SORT_ORDER: 2,
              LISTING_ID: 1215273,
              WIDTH: 1024,
              HEIGHT: 684,
            },
            {
              ORIGINAL_URL: 'https://www.compass.com/m/p-ohp_7,op_46/0/f03b6b4b-52a2-4169-8b8b-cce30a279fbc/origin.jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1215273_130893221.jpg',
              SORT_ORDER: 3,
              LISTING_ID: 1215273,
              WIDTH: 1024,
              HEIGHT: 684,
            },
            {
              ORIGINAL_URL: 'https://www.compass.com/m/p-ohp_7,op_46/0/9c679eb0-afbf-47fd-b2b4-dac18aeadac0/origin.jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1215273_130893222.jpg',
              SORT_ORDER: 4,
              LISTING_ID: 1215273,
              WIDTH: 1024,
              HEIGHT: 684,
            },
            {
              ORIGINAL_URL: 'https://www.compass.com/m/p-ohp_7,op_26/0/e256227b-18ea-4380-8e35-9e0bd7dd59d0/origin.jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1215273_130893223.jpg',
              SORT_ORDER: 5,
              LISTING_ID: 1215273,
              WIDTH: 1024,
              HEIGHT: 768,
            },
            {
              ORIGINAL_URL: 'https://www.compass.com/m/p-ohp_7,op_63/0/fecfc1e5-c303-4e2c-bc2f-e152cf26514a/origin.jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1215273_130893224.jpg',
              SORT_ORDER: 6,
              LISTING_ID: 1215273,
              WIDTH: 1024,
              HEIGHT: 680,
            },
            {
              ORIGINAL_URL: 'https://www.compass.com/m/p-ohp_7,op_25/0/0ffa4cae-af03-4618-b92d-8c99ad0cc657/origin.jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1215273_130893225.jpg',
              SORT_ORDER: 7,
              LISTING_ID: 1215273,
              WIDTH: 1024,
              HEIGHT: 683,
            },
            {
              ORIGINAL_URL: 'https://www.compass.com/m/p-ohp_7,op_26/0/261293fd-2735-450a-a886-c5bb2a573bcc/origin.jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1215273_130893226.jpg',
              SORT_ORDER: 8,
              LISTING_ID: 1215273,
              WIDTH: 1024,
              HEIGHT: 768,
            },
            {
              ORIGINAL_URL: 'https://www.compass.com/m/p-ohp_7,op_26/0/3ae0bfca-35a3-46b6-b06b-392dda54017c/origin.jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1215273_130893227.jpg',
              SORT_ORDER: 9,
              LISTING_ID: 1215273,
              WIDTH: 1024,
              HEIGHT: 768,
            },
            {
              ORIGINAL_URL: 'https://www.compass.com/m/p-ohp_7,op_26/0/57e7af71-e449-400a-a0f2-16fc7d2bcc90/origin.jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1215273_130893228.jpg',
              SORT_ORDER: 10,
              LISTING_ID: 1215273,
              WIDTH: 1024,
              HEIGHT: 768,
            },
          ],
          NEIGHBORHOOD_ID: 4,
          REBNY_AGENT_ID: 'RBNY-63809',
          BATHROOMS: 1.0,
          UTILITIESINCLUDED: '',
          AGENT_IMAGE: '',
          EXPOSURE_REMARK: '',
          COMPANY_NAME: 'Compass',
          MAX_LEASE_TERM: 12,
          LISTING_TITLE: 'West 57th Street',
          CONDITION: 'Excellent',
          OPEN_HOUSE_END_4: '',
          MIN_LEASE_TERM: 12,
          OPEN_HOUSE_END_2: '',
          OPEN_HOUSE_END_3: '',
          OPEN_HOUSE_END_1: '',
          FLOOR_NUMBER: '2',
          DOWN_PAYMENT: '0%',
          NUM_IMAGES: 10,
          STORIES: 6,
          VTOUR: 'https://www.youtube.com/watch?v=T1w8z0Qt46c',
          URL: 'https://www.compass.com/listing/1352997025253682545/view',
          COMMON_CHARGES: 0.0,
          DESCRIPTION:
            '421 West 57th Street Apt 2E  Available for September 8  See video tour  Sorry No Pets Allowed :(\n\nThoughtfully renovated studio apt with condo finishes. This home features engineer hardwood floors through out, high loft like ceilings, recess lighting with dimmers and exposed white brick. The kitchen has a full size Bosch refrigerator and Dish washer, microwave, custom cabinetry with additional storage, granite counter tops with a breakfast bar. The open living/sleeping area can fit a full size couch, coffee table, entertainment center, desk, dresser and an armoire. The bathroom is a good size. The elevator building has a live in super, laundry in the basement and bike and storage cages available for an additional fee.\n\nJust a short distance to Lincoln Center, Carnegie Hall, Central Park, Time Warner Center, Alvin Ailey, Fordham University, John Jay College, and Columbus Circle. Trains, A, C, B, D, 1, 9, N, R and Buses M11, M7, M104 and M57 a short distance away for your convenience.\n\n#mrmidtownwest',
          CATEGORY: 2,
          BUILDING_ID: 3443,
          DATE_CREATE: '2023-07-11 16:52:00',
          AGENT_MOBILE: '',
          SOURCEDB: 'ROLEX',
          OPEN_HOUSE_REMARK_2: '',
          OPEN_HOUSE_REMARK_4: '',
          OPEN_HOUSE_REMARK_3: '',
          STREET: 'West 57th Street',
          CUSTOMFIELDS: '',
          OFF_MARKET_STATUS: '',
          CONCESSION: '',
          CROSS_STREET: '9th & 10th Avenue',
          FREEMONTH: '',
          CITY: 'New York',
          BROKER_NOTE: 'Agent Shows\rLease Term: TwelveMonths',
          STREETEASY_LINK: 'http://streeteasy.com/building/421-west-57-street-new_york',
          UNIT_NUMBER: '2E',
          OFFICE_ID: 910,
          VENDOR_AGENT_ID: '',
          STREET_NUMBER: '421',
          AGENT_NAME: 'Juan Rosado',
          TOTAL_ROOMS: 2.0,
          STATUS: 'For Rent',
          AMENITIES: 'Elevator,Laundry,Bicycle Room,Storage,Pied a Terre,',
          KEYCODE: '',
          IDX: 1,
          NETRENT: '',
          COBROKE_FEE: '7.5%',
          OFFICE_PHONE: '(212) 913-9085',
          PRICE: 2800,
          NEWDEVELOPMENT: 0,
          SECURITYDEPOSIT: '',
          NAME: '',
          MAINTENANCE: 0.0,
          OPEN_HOUSE_START_3: '',
          PETS_POLICY: 'No Pets',
          OPEN_HOUSE_START_4: '',
          OPEN_HOUSE_START_1: '',
          ADDRESS: '421 West 57th Street, Unit 2E',
          AGENT_EMAIL: 'juan.rosado@compass.com',
          OPEN_HOUSE_START_2: '',
          DATE_LISTED: '2023-07-11',
          SQUARE_FOOTAGE: 0,
          LATITUDE: 40.7685403,
          BOROUGH: '',
          VOW: 1,
          NEIGHBORHOODS: 'Midtown West',
          VTOUR2: '',
          ZIP_CODE: '10019',
          LONGITUDE: -73.9864923,
          TAXES: 0,
          STATE: 'NY',
          NO_SHARES: 0,
          REBNY_LISTING_ID: 'OLRS-00011898187',
          CYOF: 0,
          HIDEADDRESS: 0,
          DEDUCTIBLE: '0%',
          BEDROOMS: 0.0,
          AGENT_PHONE: '(917) 992-4380',
          COOLING_SYSTEM: '',
          PROPERTY_TYPE: 'Coop',
          OP: '',
          BUILDING_ACCESS_NOTE:
            'MANAGEMENT: Gerard Picasso Managing Phone: 2128076969 Contact: Gerard Picaso\rSUPER: 2124893963 Carlos Hart\r',
          DATE_AVAILABLE: '2023-09-08',
          LISTING_CATEGORY: 'Exclusive',
          CLOSING_PRICE: '',
          DATE_UPDATE: '2023-07-27 06:05:00',
        },
        {
          MONTHSFREEREQMINLEASE: '',
          CLOSING_DATE: '',
          OPEN_HOUSE_REMARK: '',
          HEATING_SYSTEM: '',
          ID: 1216897,
          PHOTOS: [
            {
              ORIGINAL_URL: 'https://www.compass.com/m/p-ohp_7,op_38/0/7141b27b-525f-42b5-84a2-bbf307e9b555/origin.jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1216897_130919167.jpg',
              SORT_ORDER: 1,
              LISTING_ID: 1216897,
              WIDTH: 1024,
              HEIGHT: 571,
            },
            {
              ORIGINAL_URL: 'https://www.compass.com/m/p-ohp_7,op_38/0/ebcfd20c-96c2-4fd6-8f7d-4db194a3c929/origin.jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1216897_130919168.jpg',
              SORT_ORDER: 2,
              LISTING_ID: 1216897,
              WIDTH: 1024,
              HEIGHT: 573,
            },
            {
              ORIGINAL_URL: 'https://www.compass.com/m/p-ohp_7,op_38/0/6a0d54d4-2b94-4643-a7ab-893a046a15a4/origin.jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1216897_130919169.jpg',
              SORT_ORDER: 3,
              LISTING_ID: 1216897,
              WIDTH: 1024,
              HEIGHT: 574,
            },
            {
              ORIGINAL_URL: 'https://www.compass.com/m/p-ohp_7,op_38/0/46c57b1b-50b6-4b52-a062-805344e93166/origin.jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1216897_130919170.jpg',
              SORT_ORDER: 4,
              LISTING_ID: 1216897,
              WIDTH: 1024,
              HEIGHT: 576,
            },
            {
              ORIGINAL_URL: 'https://www.compass.com/m/p-ohp_7,op_38/0/ffc5d7e3-8c3a-440a-b4d5-7a358a223426/origin.jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1216897_130919171.jpg',
              SORT_ORDER: 5,
              LISTING_ID: 1216897,
              WIDTH: 1024,
              HEIGHT: 575,
            },
            {
              ORIGINAL_URL: 'https://www.compass.com/m/p-ohp_7,op_38/0/44398049-3b8a-4f82-a0e9-e56afb20c3f8/origin.jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1216897_130919172.jpg',
              SORT_ORDER: 6,
              LISTING_ID: 1216897,
              WIDTH: 1024,
              HEIGHT: 577,
            },
            {
              ORIGINAL_URL: 'https://www.compass.com/m/p-ohp_7,op_38/0/9edaf8cb-93e7-4bf8-bd3a-3bbb8c5a5be2/origin.jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1216897_130919173.jpg',
              SORT_ORDER: 7,
              LISTING_ID: 1216897,
              WIDTH: 1024,
              HEIGHT: 577,
            },
            {
              ORIGINAL_URL: 'https://www.compass.com/m/p-ohp_7,op_38/0/c71dc05f-fdfe-4a15-b90a-2e1a83f2ac29/origin.jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1216897_130919174.jpg',
              SORT_ORDER: 8,
              LISTING_ID: 1216897,
              WIDTH: 1024,
              HEIGHT: 573,
            },
            {
              ORIGINAL_URL: 'https://www.compass.com/m/p-ohp_7,op_38/0/534f5100-9172-428a-a63a-114ad8bb1401/origin.jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1216897_130919175.jpg',
              SORT_ORDER: 9,
              LISTING_ID: 1216897,
              WIDTH: 1024,
              HEIGHT: 574,
            },
          ],
          NEIGHBORHOOD_ID: 85,
          REBNY_AGENT_ID: 'RBNY-71770',
          BATHROOMS: 1.0,
          UTILITIESINCLUDED: '',
          AGENT_IMAGE: '',
          EXPOSURE_REMARK: '',
          COMPANY_NAME: 'Compass',
          MAX_LEASE_TERM: 12,
          LISTING_TITLE: 'Manhattan Avenue',
          CONDITION: '',
          OPEN_HOUSE_END_4: '',
          MIN_LEASE_TERM: 12,
          OPEN_HOUSE_END_2: '',
          OPEN_HOUSE_END_3: '',
          OPEN_HOUSE_END_1: '',
          FLOOR_NUMBER: '3',
          DOWN_PAYMENT: '0%',
          NUM_IMAGES: 9,
          STORIES: 3,
          VTOUR: '',
          URL: 'https://www.compass.com/listing/1358036686767562409/view',
          COMMON_CHARGES: 0.0,
          DESCRIPTION:
            'For videos of all our units visit instagram @BrokeringBrooklyn\n\nGorgeously 1.5 Bedroom Near McCarren Park!\n\nThis lovely home features an eat in kitchen with dishwasher, king size bedroom, separate home study, spacious living room right off the kitchen, a spa inspired bathroom. Your private deck awaits outside your kitchen door.\n\nJust 1 block to the Graham Ave shopping district!\n\nHeat and hot water included.\n\nNO PETS, NO EXCEPTIONS.',
          CATEGORY: 2,
          BUILDING_ID: 86884,
          DATE_CREATE: '2023-07-18 14:43:00',
          AGENT_MOBILE: '',
          SOURCEDB: 'ROLEX',
          OPEN_HOUSE_REMARK_2: '',
          OPEN_HOUSE_REMARK_4: '',
          OPEN_HOUSE_REMARK_3: '',
          STREET: 'Manhattan Avenue',
          CUSTOMFIELDS: '',
          OFF_MARKET_STATUS: '',
          CONCESSION: '',
          CROSS_STREET: '',
          FREEMONTH: '',
          CITY: 'Brooklyn',
          BROKER_NOTE: 'Agent Shows\rLease Term: TwelveMonths',
          STREETEASY_LINK: '',
          UNIT_NUMBER: '3R',
          OFFICE_ID: 910,
          VENDOR_AGENT_ID: '',
          STREET_NUMBER: '380',
          AGENT_NAME: 'Stefania Rovera',
          TOTAL_ROOMS: 4.0,
          STATUS: 'For Rent',
          AMENITIES: 'Balcony,Convertible,',
          KEYCODE: '',
          IDX: 1,
          NETRENT: '',
          COBROKE_FEE: '7.5%',
          OFFICE_PHONE: '(212) 913-9085',
          PRICE: 3250,
          NEWDEVELOPMENT: 0,
          SECURITYDEPOSIT: '',
          NAME: '',
          MAINTENANCE: 0.0,
          OPEN_HOUSE_START_3: '',
          PETS_POLICY: 'Pets OK',
          OPEN_HOUSE_START_4: '',
          OPEN_HOUSE_START_1: '',
          ADDRESS: '380 Manhattan Avenue, Unit 3R',
          AGENT_EMAIL: 'stefania.rovera@compass.com',
          OPEN_HOUSE_START_2: '',
          DATE_LISTED: '2023-07-18',
          SQUARE_FOOTAGE: 0,
          LATITUDE: 40.7171096802,
          BOROUGH: 'Brooklyn',
          VOW: 1,
          NEIGHBORHOODS: 'Greenpoint',
          VTOUR2: '',
          ZIP_CODE: '11211',
          LONGITUDE: -73.9462356567,
          TAXES: 0,
          STATE: 'NY',
          NO_SHARES: 0,
          REBNY_LISTING_ID: 'OLRS-1718898',
          CYOF: 0,
          HIDEADDRESS: 0,
          DEDUCTIBLE: '0%',
          BEDROOMS: 1.0,
          AGENT_PHONE: '(718) 360-8686',
          COOLING_SYSTEM: 'Window/Wall',
          PROPERTY_TYPE: 'Townhouse',
          OP: '',
          BUILDING_ACCESS_NOTE: '',
          DATE_AVAILABLE: '2023-08-15',
          LISTING_CATEGORY: 'Exclusive',
          CLOSING_PRICE: '',
          DATE_UPDATE: '2023-07-27 06:05:00',
        },
        {
          MONTHSFREEREQMINLEASE: '',
          CLOSING_DATE: '',
          OPEN_HOUSE_REMARK: '',
          HEATING_SYSTEM: '',
          ID: 1217287,
          PHOTOS: [
            {
              ORIGINAL_URL: 'https://www.compass.com/m/p-ohp_7,op_37/0/917c48c5-8faf-4b22-9cc9-5a8d9892c39c/origin.jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1217287_130924731.jpg',
              SORT_ORDER: 1,
              LISTING_ID: 1217287,
              WIDTH: 1024,
              HEIGHT: 683,
            },
            {
              ORIGINAL_URL: 'https://www.compass.com/m/p-ohp_7,op_37/0/666b8e83-ba2d-4f80-aef3-62a8ab1e7054/origin.jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1217287_130924732.jpg',
              SORT_ORDER: 2,
              LISTING_ID: 1217287,
              WIDTH: 1024,
              HEIGHT: 683,
            },
            {
              ORIGINAL_URL: 'https://www.compass.com/m/p-ohp_7,op_56/0/1f97e2c7-036a-49d9-90a8-938689436680/origin.jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1217287_130924733.jpg',
              SORT_ORDER: 3,
              LISTING_ID: 1217287,
              WIDTH: 512,
              HEIGHT: 768,
            },
            {
              ORIGINAL_URL: 'https://www.compass.com/m/p-ohp_7,op_56/0/1511fe37-c4e9-4a80-95d1-53abba86d356/origin.jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1217287_130924734.jpg',
              SORT_ORDER: 4,
              LISTING_ID: 1217287,
              WIDTH: 512,
              HEIGHT: 768,
            },
            {
              ORIGINAL_URL: 'https://www.compass.com/m/p-ohp_7,op_56/0/30886827-c3e3-4ed0-8997-163bfb0bc2f6/origin.jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1217287_130924735.jpg',
              SORT_ORDER: 5,
              LISTING_ID: 1217287,
              WIDTH: 512,
              HEIGHT: 768,
            },
            {
              ORIGINAL_URL: 'https://www.compass.com/m/p-ohp_7,op_37/0/b509c0fc-4e44-409c-bc44-453720a009d0/origin.jpg',
              PHOTO_TITLE: ' ',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1217287_130924736.jpg',
              SORT_ORDER: 6,
              LISTING_ID: 1217287,
              WIDTH: 1024,
              HEIGHT: 683,
            },
            {
              ORIGINAL_URL:
                'https://www.compass.com/m/p-ohp_7,op_231/0/eabc1b8d-c004-460e-a318-0dd2e822216e/origin.jpg',
              PHOTO_TITLE: 'Floor Plan',
              PHOTO_URL: 'https://rls.realty.mx/images/assets/1217287_130924737.jpg',
              SORT_ORDER: 7,
              LISTING_ID: 1217287,
              WIDTH: 593,
              HEIGHT: 768,
            },
          ],
          NEIGHBORHOOD_ID: 387,
          REBNY_AGENT_ID: 'RBNY-95203',
          BATHROOMS: 1.0,
          UTILITIESINCLUDED: '',
          AGENT_IMAGE: '',
          EXPOSURE_REMARK: '',
          COMPANY_NAME: 'Compass',
          MAX_LEASE_TERM: 24,
          LISTING_TITLE: 'West 34th Street',
          CONDITION: 'Excellent',
          OPEN_HOUSE_END_4: '',
          MIN_LEASE_TERM: 12,
          OPEN_HOUSE_END_2: '',
          OPEN_HOUSE_END_3: '',
          OPEN_HOUSE_END_1: '',
          FLOOR_NUMBER: '7',
          DOWN_PAYMENT: '0%',
          NUM_IMAGES: 7,
          STORIES: 18,
          VTOUR: '',
          URL: 'https://www.compass.com/listing/1358994907301462361/view',
          COMMON_CHARGES: 0.0,
          DESCRIPTION:
            'Located on West 34th Street in Hudson Yards, this oversized alcove studio is on a high floor in Convention Overlook, a full service cooperative.\n\nTucked away in the building, this large pin-drop quiet alcove studio offers bright southern exposure and modern finishes. The lovely residence has been fully renovated and features a spacious and open layout, brand new floors, large 14.5 ft picture window viewing the new Hudson Yards development, plentiful storage, and wall-through air conditioning.\n\nThe separate and renovated kitchen features cabinetry with quartz countertops, stainless steel backsplash, and a full suite of stainless steel appliances including a Whirlpool five burner gas range, Samsung refrigerator and microwave. A dressing area, complete with a spacious closet and built-in drawers and shelving, seamlessly connects to the modern bathroom from the sleeping alcove.\n\nPerfectly located, 430 West 34th Street is just moments away from The Shops and Restaurants at Hudson Yards, Whole Foods, Equinox, The Highline, and many transportation options at Penn Station. This 178 resident full service cooperative was built in 1963 and offers amenities such a 24-hour doorman, a furnished and landscaped roof deck with breathtaking views of Midtown Manhattan, live-in super, central laundry, updated lobby, and bike storage.\n\nPlease note: Landlord will pay commission on two year lease.',
          CATEGORY: 2,
          BUILDING_ID: 5369,
          DATE_CREATE: '2023-07-19 22:57:00',
          AGENT_MOBILE: '',
          SOURCEDB: 'ROLEX',
          OPEN_HOUSE_REMARK_2: '',
          OPEN_HOUSE_REMARK_4: '',
          OPEN_HOUSE_REMARK_3: '',
          STREET: 'West 34th Street',
          CUSTOMFIELDS: '',
          OFF_MARKET_STATUS: '',
          CONCESSION: '',
          CROSS_STREET: '9th & 10th Avenues',
          FREEMONTH: '',
          CITY: 'NEW YORK',
          BROKER_NOTE: 'Agent Shows\rLease Term: Negotiable',
          STREETEASY_LINK: 'http://streeteasy.com/building/430-west-34-street-new_york',
          UNIT_NUMBER: '7A',
          OFFICE_ID: 910,
          VENDOR_AGENT_ID: '',
          STREET_NUMBER: '430',
          AGENT_NAME: 'Anthony Lucia',
          TOTAL_ROOMS: 2.5,
          STATUS: 'For Rent',
          AMENITIES: 'Doorman,Elevator,Laundry,Bicycle Room,Storage,Roof Deck,City View,Pied a Terre,',
          KEYCODE: '',
          IDX: 1,
          NETRENT: '',
          COBROKE_FEE: '0%',
          OFFICE_PHONE: '(212) 913-9085',
          PRICE: 3400,
          NEWDEVELOPMENT: 0,
          SECURITYDEPOSIT: '',
          NAME: '',
          MAINTENANCE: 0.0,
          OPEN_HOUSE_START_3: '',
          PETS_POLICY: 'Pets OK',
          OPEN_HOUSE_START_4: '',
          OPEN_HOUSE_START_1: '',
          ADDRESS: '430 West 34th Street, Unit 7A',
          AGENT_EMAIL: 'anthonylucia@compass.com',
          OPEN_HOUSE_START_2: '',
          DATE_LISTED: '2023-07-19',
          SQUARE_FOOTAGE: 0,
          LATITUDE: 40.753661,
          BOROUGH: 'Manhattan',
          VOW: 1,
          NEIGHBORHOODS: 'Hudson Yards',
          VTOUR2: '',
          ZIP_CODE: '10001',
          LONGITUDE: -73.997669,
          TAXES: 0,
          STATE: 'NY',
          NO_SHARES: 0,
          REBNY_LISTING_ID: 'OLRS-1439746',
          CYOF: 1,
          HIDEADDRESS: 0,
          DEDUCTIBLE: '0%',
          BEDROOMS: 0.0,
          AGENT_PHONE: '(917) 971-3534',
          COOLING_SYSTEM: '',
          PROPERTY_TYPE: 'Coop',
          OP: '',
          BUILDING_ACCESS_NOTE:
            'MANAGEMENT: Lawrence Properties 855 Ave of the Americas,  New York NY 10001 Jack Terebola 868-8320\rSUPER: Pasquale D Onofrio 244-7318\r',
          DATE_AVAILABLE: '',
          LISTING_CATEGORY: 'Exclusive',
          CLOSING_PRICE: '',
          DATE_UPDATE: '2023-07-27 06:05:00',
        },
      ],
    };
    setTimeout(() => {
      setPropertyInterests(data.LISTINGS);
      setLoadingPropertyInterests(false);
    }, 2000);
  };

  const PropertyDetail = ({ className, label, value, iconAfter, textAfter }) => {
    return (
      <div className={`${className} text-sm`}>
        <div className="mb-1 text-gray-500 font-medium">{label}</div>
        <div className="text-gray-900 flex items-center">
          <span className="mr-1">{value}</span> {iconAfter && iconAfter}{' '}
          {textAfter && <span className="text-gray-500">{textAfter}</span>}
        </div>
      </div>
    );
  };
  return (
    <>
      {showPopup && <EditLookingFor title="Edit Property Interests" handleClose={() => setShowPopup(false)} />}
      {loading ? (
        <div className="relative details-tabs-fixed-height bg-white">
          <Loader></Loader>
        </div>
      ) : (
        <SimpleBar autoHide style={{ maxHeight: 'calc(100vh - 222px)' }}>
          {lookingForState == 0 ? (
            <div className="flex bg-white flex-row details-tabs-fixed-height items-center justify-center">
              <div className="max-w-[600px]">
                <div className="p-6">
                  <form onSubmit={formik.handleSubmit}>
                    <div className="mb-[60px] text-center">
                      <div className="text-black font-medium text-lg mb-3">No Property Suggested</div>
                      <div className="text-black text-sm">
                        Please fill the Property Interests so we can suggest properties for this contact
                      </div>
                    </div>
                    <div className="mx-auto relative">
                      <SearchSelectInput
                        label="Neighborhood"
                        options={NYCneighborhoods}
                        value={valueOptions(formik.values.neighborhood_ids, NYCneighborhoods)}
                        onChange={(choice) => {
                          let choices = choice.map((el) => el.value);
                          formik.setFieldValue('neighborhood_ids', choices);
                        }}
                        error={errors.neighborhood_ids && touched.neighborhood_ids}
                        errorText={errors.neighborhood_ids}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <Input
                        id="bedrooms"
                        type="number"
                        label="Bedrooms"
                        className="col-span-1"
                        iconAfter={<Image src={bedroom} height={20} />}
                        onChange={formik.handleChange}
                        value={formik.values.bedrooms}
                        error={errors.bedrooms && touched.bedrooms}
                        errorText={errors.bedrooms}
                      />
                      <Input
                        id="bathrooms"
                        type="number"
                        label="Bathrooms"
                        iconAfter={<Image src={bathroom} height={20} />}
                        className="col-span-1"
                        onChange={formik.handleChange}
                        value={formik.values.bathrooms}
                        error={errors.bathrooms && touched.bathrooms}
                        errorText={errors.bathrooms}
                      />
                      <Input
                        id="budget_min"
                        type="money"
                        label="Budget Min"
                        iconAfter={<Image src={usd} height={20} />}
                        className="col-span-1"
                        onChange={(val) => formik.setFieldValue('budget_min', val)}
                        value={formik.values.budget_min}
                        error={errors.budget_min && touched.budget_min}
                        errorText={errors.budget_min}
                      />
                      <Input
                        id="budget_max"
                        type="money"
                        label="Budget Max"
                        iconAfter={<Image src={usd} height={20} />}
                        className="col-span-1"
                        onChange={(val) => formik.setFieldValue('budget_max', val)}
                        value={formik.values.budget_max}
                        error={errors.budget_max && touched.budget_max}
                        errorText={errors.budget_max}
                      />
                    </div>
                    {/* <Accordion
                tabs={tabs}
                activeSelections={selections}
                defaultOpen
              /> */}
                    <div className="text-right">
                      <Button
                        label="Save Property Interests"
                        rightIcon={<ArrowForward className="h-4" />}
                        type="submit"
                        primary
                        className="mt-6"
                        loading={loadingButton}
                        disabled={disabledButton}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white relative" style={{ minHeight: 'calc(100vh - 222px)' }}>
              {loadingPropertyInterests ? (
                <Loader message="Please wait we're searching for matched properties"></Loader>
              ) : (
                <>
                  <header className="bg-gray-50 p-6">
                    <div className="flex items-center justify-between mb-4 text-sm">
                      <div className="text-gray-900 font-medium flex items-center">
                        Property Interests
                        <div className="ml-4 flex items-center justify-center border border-cyan-800 bg-cyan-50 rounded-full text-cyan-800 h-fit px-2 py-0 text-[10px] font-medium">
                          {formik.values.looking_action == 'sell' ? 'for Sale' : 'for Rent'}
                        </div>
                      </div>
                      <div className="cursor-pointer" onClick={() => setShowPopup(true)}>
                        Edit
                      </div>
                    </div>
                    <PropertyDetail className="mb-4" label="Neighborhood" value="West Village" />
                    <div className="grid grid-cols-4">
                      <PropertyDetail
                        label="Rooms"
                        value={formik.values.bedrooms}
                        iconAfter={<Image src={room} height={20} />}
                      />
                      <PropertyDetail
                        label="Bedrooms"
                        value={formik.values.bedrooms}
                        iconAfter={<Image src={bedroomBlack} height={20} />}
                      />
                      <PropertyDetail
                        label="Bathrooms"
                        value={formik.values.bathrooms}
                        iconAfter={<Image src={bathroomBlack} height={20} />}
                      />
                      <PropertyDetail
                        label="Price Min / Max"
                        value={`${formatPrice(formik.values.budget_min)} - ${formatPrice(formik.values.budget_max)}`}
                        {...(formik.values.looking_action == 'rent' && {
                          textAfter: 'monthly',
                        })}
                      />
                    </div>
                  </header>
                  <div className="p-6">
                    {propertyInterests && propertyInterests.length ? (
                      <>
                        <div className="mb-4 text-gray-900 text-sm font-medium">
                          {propertyInterests.length} suggested properties
                        </div>
                        <div className="grid grid-cols-3 gap-6">
                          {propertyInterests.map((property) => (
                            <PropertyCard property={property}></PropertyCard>
                          ))}
                        </div>
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
              )}
            </div>
          )}
        </SimpleBar>
      )}
    </>
  );
}
