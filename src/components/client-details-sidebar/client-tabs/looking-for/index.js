// import Accordion from 'components/shared/accordion';
import Input from 'components/shared/input';
import { useFormik } from 'formik';
import bedroomBlack from '/public/images/bedroom-black.svg';
import bathroomBlack from '/public/images/bathroom-black.svg';
import room from '/public/images/room-black.svg';
import bedroom from '/public/images/bedroom.svg';
import bathroom from '/public/images/bathroom.svg';
import usd from '/public/images/usd.svg';
import Image from 'next/image';
import Accordion from 'components/shared/accordion';
import { useEffect, useState, Fragment, useLayoutEffect } from 'react';
import Button from 'components/shared/button';
import * as contactServices from 'api/contacts';
import * as Yup from 'yup';
import { NYCneighborhoods } from 'global/variables';
import SearchSelectInput from 'components/shared/search-select-input';
import toast from 'react-hot-toast';
import SimpleBar from 'simplebar-react';
// import { ArrowRightIcon } from '@heroicons/react/solid';
import ArrowForward from '@mui/icons-material/ArrowForward';
import Loader from '@components/shared/loader';
import PropertyCard from '@components/property-card';

export default function LookingFor({ contactId }) {
  const LookingPropertySchema = Yup.object().shape({
    neighborhood_ids: Yup.array().required('Field is required'),
    bedrooms: Yup.number()
      .integer('Must be integer')
      .min(0, 'Minimum value is 0'),
    bathrooms: Yup.number()
      .integer('Must be integer')
      .min(0, 'Minimum value is 0'),
    budget_min: Yup.number()
      .integer('Must be integer')
      .min(0, 'Minimum value is 0'),
    // budget_min: Yup.number().transform((o, v) => Number(v.replace(/,/g, ''))).min(0, 'Minimum value is 0'),
    budget_max: Yup.number()
      .integer('Must be integer')
      .min(0, 'Minimum value is 0')
      .when('budget_min', {
        is: (val) => val && val >= 0,
        then: Yup.number().min(
          Yup.ref('budget_min'),
          'Max budget must be greater than min budget',
        ),
      }),
  });

  //* FORMIK *//
  const [lookingForState, setLookingForState] = useState(1);
  const [loadingButton, setLoadingButton] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);
  const [propertyInterests, setPropertyInterests] = useState();
  const [loadingPropertyInterests, setLoadingPropertyInterests] =
    useState(true);

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
    onSubmit: (values, { setFieldValue }) => {
      console.log('looking property', values);
      setFieldValue('budget_min', parseFloat(values.budget_min));
      setFieldValue('budget_max', parseFloat(values.budget_max));
      console.log(formik.isValid);
      if (formik.isValid) {
        // handleAddSubmit({
        //   ...values,
        //   budget_min: parseFloat(values.budget_min),
        //   budget_max: parseFloat(values.budget_max),
        // });
      }
    },
  });

  const { errors, touched } = formik;

  const handleAddSubmit = async (values) => {
    setLoadingButton(true);
    try {
      const res = await contactServices.addContactLookingProperty(
        contactId,
        values,
      );
      console.log('add', res);
      setLoadingButton(false);
      toast.success('Changes were successfully saved');
    } catch (error) {
      console.log(error);
      setLoadingButton(false);
    }
  };

  const fetchLookingProperties = async () => {
    try {
      const { data } = await contactServices.getContactLookingProperties(
        contactId,
      );
      const lookingProperties = data.data;
      if (lookingProperties.length > 0) {
        formik.setValues({
          neighborhood_ids: lookingProperties[0].neighborhood_ids,
          looking_action: lookingProperties[0].looking_action,
          bedrooms:
            lookingProperties[0].bedrooms != 0
              ? lookingProperties[0].bedrooms
              : '',
          bathrooms:
            lookingProperties[0].bathrooms != 0
              ? lookingProperties[0].bathrooms
              : '',
          budget_min:
            lookingProperties[0].budget_min != 0
              ? lookingProperties[0].budget_min
              : '',
          budget_max:
            lookingProperties[0].budget_max != 0
              ? lookingProperties[0].budget_max
              : '',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLookingProperties();
  }, [contactId]);

  useLayoutEffect(() => {
    console.log(formik);
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
    const propertyInterests = [
      {
        ID: 1204120,
        PHOTOS: [
          {
            ORIGINAL_URL:
              'https://media.perchwell.com/property_images/pictures/038/645/561/original/PI-5895t4e6ej.jpg?1685033538',
            PHOTO_TITLE: ' ',
            PHOTO_URL:
              'https://rls.realty.mx/images/assets/1204120_130729036.jpg',
            SORT_ORDER: 1,
            LISTING_ID: 1204120,
            WIDTH: 1024,
            HEIGHT: 683,
          },
          {
            ORIGINAL_URL:
              'https://media.perchwell.com/property_images/pictures/038/645/559/original/PI-5895t49jjv.jpg?1685033538',
            PHOTO_TITLE: ' ',
            PHOTO_URL:
              'https://rls.realty.mx/images/assets/1204120_130729037.jpg',
            SORT_ORDER: 2,
            LISTING_ID: 1204120,
            WIDTH: 1024,
            HEIGHT: 683,
          },
          {
            ORIGINAL_URL:
              'https://media.perchwell.com/property_images/pictures/038/645/560/original/PI-5895t4c3sj.jpg?1685033538',
            PHOTO_TITLE: ' ',
            PHOTO_URL:
              'https://rls.realty.mx/images/assets/1204120_130729038.jpg',
            SORT_ORDER: 3,
            LISTING_ID: 1204120,
            WIDTH: 1024,
            HEIGHT: 683,
          },
          {
            ORIGINAL_URL:
              'https://media.perchwell.com/property_images/pictures/038/645/556/original/PI-5895t3pc4e.jpg?1685033537',
            PHOTO_TITLE: ' ',
            PHOTO_URL:
              'https://rls.realty.mx/images/assets/1204120_130729039.jpg',
            SORT_ORDER: 4,
            LISTING_ID: 1204120,
            WIDTH: 1024,
            HEIGHT: 683,
          },
          {
            ORIGINAL_URL:
              'https://media.perchwell.com/property_images/pictures/038/645/553/original/PI-5895t30j32.jpg?1685033537',
            PHOTO_TITLE: ' ',
            PHOTO_URL:
              'https://rls.realty.mx/images/assets/1204120_130729040.jpg',
            SORT_ORDER: 5,
            LISTING_ID: 1204120,
            WIDTH: 512,
            HEIGHT: 768,
          },
          {
            ORIGINAL_URL:
              'https://media.perchwell.com/property_images/pictures/038/645/555/original/PI-5895t3j3fk.jpg?1685033537',
            PHOTO_TITLE: ' ',
            PHOTO_URL:
              'https://rls.realty.mx/images/assets/1204120_130729041.jpg',
            SORT_ORDER: 6,
            LISTING_ID: 1204120,
            WIDTH: 1024,
            HEIGHT: 683,
          },
          {
            ORIGINAL_URL:
              'https://media.perchwell.com/property_images/pictures/038/645/557/original/PI-5895t3qdvj.jpg?1685033538',
            PHOTO_TITLE: ' ',
            PHOTO_URL:
              'https://rls.realty.mx/images/assets/1204120_130729042.jpg',
            SORT_ORDER: 7,
            LISTING_ID: 1204120,
            WIDTH: 1024,
            HEIGHT: 683,
          },
          {
            ORIGINAL_URL:
              'https://media.perchwell.com/property_images/pictures/038/645/554/original/PI-5895t3i1e8.jpg?1685033537',
            PHOTO_TITLE: ' ',
            PHOTO_URL:
              'https://rls.realty.mx/images/assets/1204120_130729043.jpg',
            SORT_ORDER: 8,
            LISTING_ID: 1204120,
            WIDTH: 1024,
            HEIGHT: 683,
          },
          {
            ORIGINAL_URL:
              'https://media.perchwell.com/property_images/pictures/038/645/558/original/PI-5895t3t2ml.jpg?1685033537',
            PHOTO_TITLE: ' ',
            PHOTO_URL:
              'https://rls.realty.mx/images/assets/1204120_130729044.jpg',
            SORT_ORDER: 9,
            LISTING_ID: 1204120,
            WIDTH: 1024,
            HEIGHT: 683,
          },
          {
            ORIGINAL_URL:
              'https://media.perchwell.com/property_images/pictures/038/645/552/original/PI-5895t2esmu.jpg?1685033536',
            PHOTO_TITLE: ' ',
            PHOTO_URL:
              'https://rls.realty.mx/images/assets/1204120_130729045.jpg',
            SORT_ORDER: 10,
            LISTING_ID: 1204120,
            WIDTH: 512,
            HEIGHT: 768,
          },
          {
            ORIGINAL_URL:
              'https://media.perchwell.com/property_images/pictures/038/645/551/original/PI-5895t1o9qg.jpg?1685033536',
            PHOTO_TITLE: 'Floor Plan',
            PHOTO_URL:
              'https://rls.realty.mx/images/assets/1204120_130729046.jpg',
            SORT_ORDER: 12,
            LISTING_ID: 1204120,
            WIDTH: 1001,
            HEIGHT: 768,
          },
          {
            ORIGINAL_URL:
              'https://media.perchwell.com/property_images/pictures/038/645/562/original/PI-5895t535th.jpg?1685033539',
            PHOTO_TITLE: ' ',
            PHOTO_URL:
              'https://rls.realty.mx/images/assets/1204120_130729047.jpg',
            SORT_ORDER: 12,
            LISTING_ID: 1204120,
            WIDTH: 1024,
            HEIGHT: 683,
          },
        ],
        NEIGHBORHOOD_ID: 52,
        BATHROOMS: 1,
        COMPANY_NAME: 'Level Group Inc',
        MAX_LEASE_TERM: 0,
        LISTING_TITLE: 'Bennett Avenue',
        CONDITION: 'Excellent',
        FLOOR_NUMBER: '3',
        STORIES: 8,
        DESCRIPTION:
          "Pristine, fully renovated one bedroom home with park and garden views!  \n\nEnjoy the solid new French Oak wide-plank floors throughout the efficient layout.  Create memorable meals in the open-concept kitchen with quartz countertops, white cabinetry, subway tile backsplash, high-end Haier fridge, stainless steel Whirlpool dishwasher, and GE stove and micro.  New bath with marble floors. Walk-in closet.\n\nFort Tryon Gardens is a well-managed and financially sound 7-building, 350-unit co-op perfectly situated next to the beautiful Fort Tryon Park, one of New York City's most dramatic, with breathtaking Hudson River views, the exquisite Heather Garden and the world-famous Cloisters Museum. Being next to the park is like having a billionaire's backyard.  Ample nearby commerce, including supermarkets and a diverse selection of restaurants, characterize the area. The co-op has made significant infrastructure improvements in recent years, including a brand-new roof, video intercom system, and various plumbing upgrades. The complex has a friendly and diligent staff, with resident Superintendent. Pets are welcome, including your canine friends. The building is situated near the 1-train and, best of all, the A-train express line is right across the street.\n\nAll viewings are by appointment only. The co-op allows co-purchasing and pied a terre. The Special Capital Assessment ending June 30, 024 allocates $124.05 per month to this unit.  Some photos are virtually staged.",
        BUILDING_ID: 5641,
        DATE_CREATE: '2023-05-25 12:53:00',
        STREET: 'Bennett Avenue',
        CROSS_STREET: '190/191 sts',
        CITY: 'NEW YORK',
        UNIT_NUMBER: '3D',
        STREET_NUMBER: '259',
        TOTAL_ROOMS: 3,
        STATUS: 'For Sale',
        AMENITIES:
          'Elevator,Garage,Laundry,Bicycle Room,Storage,Park View,Courtyard,Pied a Terre,',
        PRICE: 399000,
        ADDRESS: '259 Bennett Avenue, Unit 3D',
        NEIGHBORHOODS: 'Washington Heights',
        STATE: 'NY',
        BEDROOMS: 1,
        PROPERTY_TYPE: 'Condop',
        SQUARE_FOOTAGE: 2500,
      },
      {
        ID: 1204120,
        PHOTOS: [
          {
            ORIGINAL_URL:
              'https://media.perchwell.com/property_images/pictures/038/645/560/original/PI-5895t4c3sj.jpg?1685033538',
            PHOTO_TITLE: ' ',
            PHOTO_URL:
              'https://rls.realty.mx/images/assets/1204120_130729038.jpg',
            SORT_ORDER: 3,
            LISTING_ID: 1204120,
            WIDTH: 1024,
            HEIGHT: 683,
          },
          {
            ORIGINAL_URL:
              'https://media.perchwell.com/property_images/pictures/038/645/556/original/PI-5895t3pc4e.jpg?1685033537',
            PHOTO_TITLE: ' ',
            PHOTO_URL:
              'https://rls.realty.mx/images/assets/1204120_130729039.jpg',
            SORT_ORDER: 4,
            LISTING_ID: 1204120,
            WIDTH: 1024,
            HEIGHT: 683,
          },
          {
            ORIGINAL_URL:
              'https://media.perchwell.com/property_images/pictures/038/645/553/original/PI-5895t30j32.jpg?1685033537',
            PHOTO_TITLE: ' ',
            PHOTO_URL:
              'https://rls.realty.mx/images/assets/1204120_130729040.jpg',
            SORT_ORDER: 5,
            LISTING_ID: 1204120,
            WIDTH: 512,
            HEIGHT: 768,
          },
          {
            ORIGINAL_URL:
              'https://media.perchwell.com/property_images/pictures/038/645/555/original/PI-5895t3j3fk.jpg?1685033537',
            PHOTO_TITLE: ' ',
            PHOTO_URL:
              'https://rls.realty.mx/images/assets/1204120_130729041.jpg',
            SORT_ORDER: 6,
            LISTING_ID: 1204120,
            WIDTH: 1024,
            HEIGHT: 683,
          },
          {
            ORIGINAL_URL:
              'https://media.perchwell.com/property_images/pictures/038/645/557/original/PI-5895t3qdvj.jpg?1685033538',
            PHOTO_TITLE: ' ',
            PHOTO_URL:
              'https://rls.realty.mx/images/assets/1204120_130729042.jpg',
            SORT_ORDER: 7,
            LISTING_ID: 1204120,
            WIDTH: 1024,
            HEIGHT: 683,
          },
          {
            ORIGINAL_URL:
              'https://media.perchwell.com/property_images/pictures/038/645/554/original/PI-5895t3i1e8.jpg?1685033537',
            PHOTO_TITLE: ' ',
            PHOTO_URL:
              'https://rls.realty.mx/images/assets/1204120_130729043.jpg',
            SORT_ORDER: 8,
            LISTING_ID: 1204120,
            WIDTH: 1024,
            HEIGHT: 683,
          },
          {
            ORIGINAL_URL:
              'https://media.perchwell.com/property_images/pictures/038/645/558/original/PI-5895t3t2ml.jpg?1685033537',
            PHOTO_TITLE: ' ',
            PHOTO_URL:
              'https://rls.realty.mx/images/assets/1204120_130729044.jpg',
            SORT_ORDER: 9,
            LISTING_ID: 1204120,
            WIDTH: 1024,
            HEIGHT: 683,
          },
          {
            ORIGINAL_URL:
              'https://media.perchwell.com/property_images/pictures/038/645/552/original/PI-5895t2esmu.jpg?1685033536',
            PHOTO_TITLE: ' ',
            PHOTO_URL:
              'https://rls.realty.mx/images/assets/1204120_130729045.jpg',
            SORT_ORDER: 10,
            LISTING_ID: 1204120,
            WIDTH: 512,
            HEIGHT: 768,
          },
          {
            ORIGINAL_URL:
              'https://media.perchwell.com/property_images/pictures/038/645/551/original/PI-5895t1o9qg.jpg?1685033536',
            PHOTO_TITLE: 'Floor Plan',
            PHOTO_URL:
              'https://rls.realty.mx/images/assets/1204120_130729046.jpg',
            SORT_ORDER: 12,
            LISTING_ID: 1204120,
            WIDTH: 1001,
            HEIGHT: 768,
          },
          {
            ORIGINAL_URL:
              'https://media.perchwell.com/property_images/pictures/038/645/562/original/PI-5895t535th.jpg?1685033539',
            PHOTO_TITLE: ' ',
            PHOTO_URL:
              'https://rls.realty.mx/images/assets/1204120_130729047.jpg',
            SORT_ORDER: 12,
            LISTING_ID: 1204120,
            WIDTH: 1024,
            HEIGHT: 683,
          },
        ],
        NEIGHBORHOOD_ID: 52,
        BATHROOMS: 1,
        COMPANY_NAME: 'Level Group Inc',
        MAX_LEASE_TERM: 0,
        LISTING_TITLE: '5th Avenue',
        CONDITION: 'Excellent',
        FLOOR_NUMBER: '3',
        STORIES: 8,
        DESCRIPTION:
          "Pristine, fully renovated one bedroom home with park and garden views!  \n\nEnjoy the solid new French Oak wide-plank floors throughout the efficient layout.  Create memorable meals in the open-concept kitchen with quartz countertops, white cabinetry, subway tile backsplash, high-end Haier fridge, stainless steel Whirlpool dishwasher, and GE stove and micro.  New bath with marble floors. Walk-in closet.\n\nFort Tryon Gardens is a well-managed and financially sound 7-building, 350-unit co-op perfectly situated next to the beautiful Fort Tryon Park, one of New York City's most dramatic, with breathtaking Hudson River views, the exquisite Heather Garden and the world-famous Cloisters Museum. Being next to the park is like having a billionaire's backyard.  Ample nearby commerce, including supermarkets and a diverse selection of restaurants, characterize the area. The co-op has made significant infrastructure improvements in recent years, including a brand-new roof, video intercom system, and various plumbing upgrades. The complex has a friendly and diligent staff, with resident Superintendent. Pets are welcome, including your canine friends. The building is situated near the 1-train and, best of all, the A-train express line is right across the street.\n\nAll viewings are by appointment only. The co-op allows co-purchasing and pied a terre. The Special Capital Assessment ending June 30, 024 allocates $124.05 per month to this unit.  Some photos are virtually staged.",
        BUILDING_ID: 5641,
        DATE_CREATE: '2023-05-25 12:53:00',
        STREET: '5th Avenue',
        CROSS_STREET: '184/125 sts',
        CITY: 'NEW YORK',
        UNIT_NUMBER: '3D',
        STREET_NUMBER: '259',
        TOTAL_ROOMS: 3,
        STATUS: 'For Rent',
        AMENITIES:
          'Elevator,Garage,Laundry,Bicycle Room,Storage,Park View,Courtyard,Pied a Terre,',
        PRICE: 399000,
        ADDRESS: '5th Avenue, Unit 3C',
        NEIGHBORHOODS: 'Washington Heights',
        STATE: 'NY',
        BEDROOMS: 1,
        PROPERTY_TYPE: 'Penthouse',
        SQUARE_FOOTAGE: 1980,
      },
    ];
    setTimeout(() => {
      setPropertyInterests(propertyInterests);
      setLoadingPropertyInterests(false);
    }, 2000);
  };

  useEffect(() => {
    fetchPropertyInterests();
  }, []);

  const PropertyDetail = ({
    className,
    label,
    value,
    iconAfter,
    textAfter,
  }) => {
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
    <SimpleBar autoHide style={{ maxHeight: 'calc(100vh - 222px)' }}>
      {lookingForState == 0 ? (
        <div className="flex bg-white flex-row details-tabs-fixed-height items-center justify-center">
          <div className="max-w-[600px]">
            <div className="p-6">
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-[60px] text-center">
                  <div className="text-black font-medium text-lg mb-3">
                    No Property Suggested
                  </div>
                  <div className="text-black text-sm">
                    Please fill the Property Interests so we can suggest
                    properties for this contact
                  </div>
                </div>
                <div className="mx-auto relative">
                  <SearchSelectInput
                    label="Neighborhood"
                    options={NYCneighborhoods}
                    value={valueOptions(
                      formik.values.neighborhood_ids,
                      NYCneighborhoods,
                    )}
                    onChange={(choice) => {
                      let choices = choice.map((el) => el.value);
                      formik.setFieldValue('neighborhood_ids', choices);
                    }}
                    error={errors.neighborhood_ids && touched.neighborhood_ids}
                    errorText={errors.neighborhood_ids}
                  />
                  {/* <Input
                id="neighborhood_ids"
                type="number"
                label="Neighborhood"
                iconAfter={<SearchIcon className="text-gray3" height={20} />}
                onChange={formik.handleChange}
                value={formik.values.neighborhood_ids}
                error={errors.neighborhood_ids && touched.neighborhood_ids}
                errorText={errors.neighborhood_ids}
              /> */}
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
        <div className="bg-white relative">
          {loadingPropertyInterests ? (
            <Loader message="Please wait we're searching for matched properties"></Loader>
          ) : (
            <>
              <header className="bg-gray-50 p-6">
                <div className="flex items-center justify-between mb-4 text-sm">
                  <div className="text-gray-900 font-medium flex items-center">
                    Property Interests
                    <div className="ml-4 flex items-center justify-center border border-cyan-800 bg-cyan-50 rounded-full text-cyan-800 h-fit px-2 py-0 text-[10px] font-medium">
                      for Rent
                    </div>
                  </div>
                  <div className="cursor-pointer">Edit</div>
                </div>
                <PropertyDetail
                  className="mb-4"
                  label="Neighborhood"
                  value="West Village"
                />
                <div className="grid grid-cols-4">
                  <PropertyDetail
                    label="Rooms"
                    value="3"
                    iconAfter={<Image src={room} height={20} />}
                  />
                  <PropertyDetail
                    label="Bedrooms"
                    value="3"
                    iconAfter={<Image src={bedroomBlack} height={20} />}
                  />
                  <PropertyDetail
                    label="Bathrooms"
                    value="2"
                    iconAfter={<Image src={bathroomBlack} height={20} />}
                  />
                  <PropertyDetail
                    label="Price Min / Max"
                    value="$1,100 - $2,500"
                    textAfter="monthly"
                  />
                </div>
              </header>
              <div className="p-6">
                <div className="mb-4 text-gray-900 text-sm font-medium">
                  {propertyInterests.length} suggested properties
                </div>
                <div className="grid grid-cols-3 gap-6">
                  {propertyInterests.map((property) => (
                    <PropertyCard property={property}></PropertyCard>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </SimpleBar>
  );
}
