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
import { getProperties } from '@api/realtyMX';
import { formatPrice, valueOptions } from '@global/functions';
import { useSelector } from 'react-redux';
import { setRefetchPart } from '@store/global/slice';
import { useDispatch } from 'react-redux';
import fetchJsonp from 'fetch-jsonp';
import { useRouter } from 'next/router';
import Link from '@mui/icons-material/Link';
import LookingForPopup from '@components/overlays/edit-looking-for-popup';
import { ExclamationIcon, PencilIcon, PlusIcon } from '@heroicons/react/solid';
import ArrowLeft from '/public/images/arrow-circle-left.svg';
import Alert from '@components/shared/alert';
import EditLookingForPopup from '@components/overlays/edit-looking-for-popup';
import AddLookingForPopup from '@components/overlays/add-looking-for-popup';
import FilterPropertiesDropdown from '@components/shared/dropdown/FilterPropertiesDropdown';
import properties from 'pages/properties';

export default function LookingFor({ contactId, category }) {
  const router = useRouter();
  const dispatch = useDispatch();
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
  const refetchData = useSelector((state) => state.global.refetchData);

  //* FORMIK *//
  const [page, setPage] = useState(1);
  const [allPropertiesCount, setAllPropertiesCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [expandedHeader, setExpandedHeader] = useState(true);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [lookingForState, setLookingForState] = useState(0);
  const [loadingButton, setLoadingButton] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);
  const [propertyInterests, setPropertyInterests] = useState();
  const [filterValue, setFilterValue] = useState('newest');
  const [loadingPropertyInterests, setLoadingPropertyInterests] = useState(true);

  const getLookingAction = () => {
    const lowerCaseCategory = category.toLowerCase();
    if (lowerCaseCategory === 'buyer') {
      return 1;
    } else if (lowerCaseCategory === 'landlord') {
      return '19,22';
    } else if (lowerCaseCategory === 'seller') {
      return 19;
    } else {
      return 2;
    }
  };

  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      neighborhood_ids: '',
      looking_action: getLookingAction(),
      bedrooms: '',
      bathrooms: '',
      budget_min: '',
      budget_max: '',
    },
    validationSchema: LookingPropertySchema,
    onSubmit: (values) => {
      if (formik.isValid) {
        handleAddSubmit({
          neighborhood_ids: values.neighborhood_ids,
          looking_action: getLookingAction(),
          bedrooms_min: values.bedrooms,
          bedrooms_max: values.bedrooms,
          bathrooms_min: values.bathrooms,
          bathrooms_max: values.bathrooms,
          budget_min: values.budget_min === '' || values.budget_min === 0 ? null : Number(values.budget_min),
          budget_max: values.budget_max === '' || values.budget_max === 0 ? null : Number(values.budget_max),
        });
      }
    },
  });

  const { errors, touched, resetForm } = formik;

  const handleAddSubmit = async (values) => {
    setLoadingButton(true);
    try {
      await contactServices.addContactLookingProperty(contactId, values);
      setLoadingButton(false);
      toast.success('Property interests saved successfully!');
      dispatch(setRefetchPart('looking-for'));
      resetForm();
    } catch (error) {
      console.log(error);
      setLoadingButton(false);
    }
  };

  const initializePropertyInterests = async () => {
    try {
      const lookingProperties = lookingForData;
      if (lookingProperties && lookingProperties[0]) {
        formik.setValues({
          neighborhood_ids: lookingProperties[0].neighborhood_ids,
          bedrooms: lookingProperties[0].bedrooms_min != 0 ? lookingProperties[0].bedrooms_min : '',
          bathrooms: lookingProperties[0].bathrooms_min != 0 ? lookingProperties[0].bathrooms_min : '',
          budget_min: lookingProperties[0].budget_min != 0 ? lookingProperties[0].budget_min : '',
          budget_max: lookingProperties[0].budget_max != 0 ? lookingProperties[0].budget_max : '',
        });
        console.log('ran first');
        fetchProperties(lookingProperties[0], page, filterValue);
      } else {
        console.log('ran second');
        fetchProperties(formik.values, page, filterValue);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProperties = async (values, page, filterValue) => {
    let filters = values;
    let params = {
      apikey: '4d7139716e6b4a72',
      callback: 'callback',
      limit: 21,
      page: page,
    };
    if (filterValue === 'newest') {
      params['sort'] = 'date';
      params['order'] = 'desc';
    }
    if (filterValue === 'oldest') {
      params['sort'] = 'date';
      params['order'] = 'asc';
    }
    if (filterValue === 'minPrice') {
      params['sort'] = 'price';
      params['order'] = 'asc';
    }
    if (filterValue === 'maxPrice') {
      params['sort'] = 'price';
      params['order'] = 'desc';
    }
    params['status'] = getLookingAction();
    if (filters?.neighborhood_ids) params['neighborhood_id'] = filters.neighborhood_ids.join(',');
    if (filters?.budget_min) params['priceMin'] = filters.budget_min;
    if (filters?.budget_max) params['priceMax'] = filters.budget_max;
    if (filters?.bedrooms_min) {
      params['bedsMin'] = filters.bedrooms_min;
    }
    if (filters?.bedrooms_max) {
      params['bedsMax'] = filters.bedrooms_max;
    }

    if (filters?.bathrooms_min) {
      params['bathMin'] = filters.bathrooms_min;
    }
    if (filters?.bathrooms_max) {
      params['bathMax'] = filters.bathrooms_max;
    }

    const urlParams = new URLSearchParams({
      ...params,
    });

    const url = 'https://dataapi.realtymx.com/listings?' + urlParams.toString();
    const options = {
      timeout: 30000,
    };
    const data = await fetchJsonp(url, options)
      .then((res) => res.json())
      .then((data) => {
        setPropertyInterests(data.LISTINGS);
        setAllPropertiesCount(data.TOTAL_COUNT);
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
        setLoadingPropertyInterests(false);
        return data;
      })
      .catch((error) => {
        console.log(error, 'error');
      });
  };

  const getNeighborhoodValue = () => {
    let neighborhoods = [];

    if (formik.values.neighborhood_ids.length) {
      formik.values.neighborhood_ids.forEach((element) => {
        const foundNeighborhood = NYCneighborhoods.find((neighborhood) => neighborhood.value == element);
        neighborhoods.push(foundNeighborhood && foundNeighborhood.label);
      });
      return neighborhoods.length ? neighborhoods.join(', ') : null;
    } else return null;
  };

  const getFromNumber = () => {
    return (page - 1) * 21 + 1;
  };
  const getToNumber = () => {
    return Math.min(page * 21, allPropertiesCount);
  };

  useEffect(() => {
    resetForm();
  }, [router.pathname]);

  useEffect(() => {
    if (lookingForData !== null) initializePropertyInterests();
    // else {
    // fetchProperties(formik.values, page, filterValue);
    // }
    setLoadingPropertyInterests(false);
  }, [contactId, lookingForData, refetchData, filterValue]);

  useLayoutEffect(() => {
    if (formik.isValid) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [formik]);
  const onFiltersChange = (filter) => {
    setFilterValue(filter);
  };

  const PropertyDetail = ({ className, label, value, iconAfter, textAfter }) => {
    return (
      <div className={`${className} text-sm`}>
        <div className="mb-1 text-gray-500 font-medium">{label}</div>
        <div className="text-gray-900 flex items-center">
          <span className="mr-1">{value == 0 ? 'Any' : value}</span> {iconAfter && iconAfter}{' '}
          {textAfter && <span className="text-gray-500">{textAfter}</span>}
        </div>
      </div>
    );
  };

  return (
    <>
      {showAddPopup && (
        <AddLookingForPopup
          action={getLookingAction()}
          contactId={contactId}
          title="Add Property Interests"
          className="w-[580px]"
          handleClose={() => setShowAddPopup(false)}
        />
      )}
      {showEditPopup && (
        <EditLookingForPopup
          action={getLookingAction()}
          data={lookingForData[0]}
          title="Edit Property Interests"
          className="w-[580px]"
          handleClose={() => setShowEditPopup(false)}
        />
      )}
      {loading ? (
        <div className="relative details-tabs-fixed-height bg-white">
          <Loader></Loader>
        </div>
      ) : (
        <SimpleBar autoHide style={{ maxHeight: 'calc(100vh - 222px)' }}>
          <div className="bg-white relative scrollable-area" style={{ minHeight: 'calc(100vh - 222px)' }}>
            {loadingPropertyInterests || propertyInterests === undefined ? (
              <Loader message="Please wait we're searching for matched properties"></Loader>
            ) : (
              <>
                {!lookingForData?.length ? (
                  <Alert type="orange">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <ExclamationIcon className="h-5 w-5 text-orange-600" aria-hidden="true" />
                      </div>
                      <div className="ml-3 flex flex-row justify-between w-[100%] items-center">
                        <p className={`text-sm text-orange-800`}>
                          {category === 'Landlord' || category === 'Seller'
                            ? 'For more accurate recommendations on properties, it is advisable to provide specific property details for comparison.'
                            : "To receive more precise property recommendations tailored to your client's preferences, kindly specify the property interests."}
                        </p>
                        <Button
                          className="p-0"
                          label={
                            category === 'Landlord' || category === 'Seller' ? 'Add Property Details' : 'Add Interests'
                          }
                          leftIcon={<PlusIcon />}
                          primary
                          onClick={() => setShowAddPopup(true)}
                        />
                      </div>
                    </div>
                  </Alert>
                ) : (
                  <header className={`transition-all bg-gray-50 p-6`}>
                    <div className="flex items-center justify-between text-sm">
                      <div className="text-gray-900 font-medium flex items-center">
                        Property Interests
                        {getLookingAction() === 1 ||
                          (getLookingAction() === 2 && (
                            <div className="ml-4 flex items-center justify-center border border-cyan-800 bg-cyan-50 rounded-full text-cyan-800 h-fit px-2 py-0 text-[10px] font-medium">
                              {getLookingAction() == 1 ? 'for Sale' : 'for Rent'}
                            </div>
                          ))}
                      </div>
                      <div className="flex items-center">
                        <Button
                          className="min-w-fit mr-4"
                          onClick={() => setShowEditPopup(true)}
                          white
                          leftIcon={<PencilIcon height={17} className="text-gray6 mr-3" />}>
                          Edit
                        </Button>
                        <div onClick={() => setExpandedHeader(!expandedHeader)} className="cursor-pointer z-10">
                          <div className="">
                            <img
                              className={`transition-all h-7 ${expandedHeader ? 'rotate-90' : '-rotate-90'}`}
                              src={ArrowLeft.src}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {expandedHeader && (
                      <>
                        <PropertyDetail className="mt-4 mb-4" label="Neighborhood" value={getNeighborhoodValue()} />
                        <div className="grid grid-cols-4">
                          <PropertyDetail
                            label="Rooms"
                            value={formik.values.bedrooms ? formik.values.bedrooms : 'Any'}
                            iconAfter={<Image src={room} height={20} />}
                          />
                          <PropertyDetail
                            label="Bedrooms"
                            value={formik.values.bedrooms ? formik.values.bedrooms : 'Any'}
                            iconAfter={<Image src={bedroomBlack} height={20} />}
                          />
                          <PropertyDetail
                            label="Bathrooms"
                            value={formik.values.bathrooms ? formik.values.bathrooms : 'Any'}
                            iconAfter={<Image src={bathroomBlack} height={20} />}
                          />
                          <PropertyDetail
                            label="Price Min / Max"
                            value={`${formik.values.budget_min ? formatPrice(formik.values.budget_min) : 'Any'} - ${
                              formik.values.budget_max ? formatPrice(formik.values.budget_max) : 'Any'
                            }`}
                            {...(getLookingAction() == 2 && {
                              textAfter: 'monthly',
                            })}
                          />
                        </div>
                      </>
                    )}
                  </header>
                )}

                <div className="p-6">
                  {propertyInterests && propertyInterests.length ? (
                    <>
                      <div className="mb-4 text-gray-900 text-sm font-medium flex justify-between items-center">
                        {category.toLowerCase() !== 'landlord' && category.toLowerCase() !== 'seller' && (
                          <>
                            {allPropertiesCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} properties recommended
                            {getLookingAction() === 1 ? ' for sale' : ' for rent'}
                          </>
                        )}
                        {category.toLowerCase() === 'landlord' && (
                          <>
                            {allPropertiesCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} Recommendations on
                            Sold and Rented Properties
                          </>
                        )}
                        {category.toLowerCase() === 'seller' && (
                          <>
                            {allPropertiesCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} Recommendations on
                            Sold Properties
                          </>
                        )}
                        <div className={'flex items-center gap-2'}>
                          <p
                            className="text-gray6 font-inter font-normal leading-5 text-sm"
                            style={{ marginTop: '3px' }}>
                            Sort by
                          </p>
                          <FilterPropertiesDropdown onFiltersChange={onFiltersChange} />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-6">
                        {propertyInterests.map((property, index) => (
                          <PropertyCard key={index} property={property}></PropertyCard>
                        ))}
                      </div>
                      {allPropertiesCount > 21 && (
                        <nav
                          className="flex items-center justify-between bg-white py-3 pb-0 mt-5"
                          aria-label="Pagination">
                          <div className="hidden sm:block">
                            <p className="text-sm text-gray-700">
                              Showing{' '}
                              <span className="font-medium">
                                {getFromNumber()
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                              </span>
                              to{' '}
                              <span className="font-medium">
                                {getToNumber()
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                              </span>
                              of{' '}
                              <span className="font-medium">
                                {allPropertiesCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                              </span>{' '}
                              results
                            </p>
                          </div>
                          <div className="flex flex-1 justify-between sm:justify-end">
                            {getFromNumber() != 1 && (
                              <a
                                href="#"
                                onClick={() => {
                                  fetchProperties(lookingForData[0], page - 1, filterValue);
                                  setPage(page - 1);
                                  document.querySelector('.scrollable-area').scrollIntoView({
                                    behavior: 'smooth',
                                  });
                                  setLoadingPropertyInterests(true);
                                }}
                                className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0">
                                Previous
                              </a>
                            )}
                            {getToNumber() != allPropertiesCount && (
                              <a
                                href="#"
                                onClick={() => {
                                  fetchProperties(lookingForData[0], page + 1, filterValue);
                                  setPage(page + 1);
                                  document.querySelector('.scrollable-area').scrollIntoView({
                                    behavior: 'smooth',
                                  });
                                  setLoadingPropertyInterests(true);
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
            )}
          </div>
          {/* )} */}
        </SimpleBar>
      )}
    </>
  );
}
