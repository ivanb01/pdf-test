// import Accordion from 'components/shared/accordion';
import { useFormik } from 'formik';
import filter from '/public/images/filter.svg';
import lookingForEmpty from '/public/images/looking-for-empty.svg';
import { useEffect, useState, Fragment, useLayoutEffect } from 'react';
import Button from 'components/shared/button';
import * as contactServices from 'api/contacts';
import * as Yup from 'yup';
import { NYCneighborhoods } from 'global/variables';
import toast from 'react-hot-toast';
import SimpleBar from 'simplebar-react';
import Loader from '@components/shared/loader';
import PropertyCard from '@components/property-card';
import { useSelector } from 'react-redux';
import { setRefetchPart } from '@store/global/slice';
import { useDispatch } from 'react-redux';
import fetchJsonp from 'fetch-jsonp';
import { useRouter } from 'next/router';
import EditLookingForPopup from '@components/overlays/edit-looking-for-popup';
import AddLookingForPopup from '@components/overlays/add-looking-for-popup';
import TabsWithPills from '@components/shared/tabs/tabsWithPills';

export default function PropertiesSection({ contactId, category, noSelect }) {
  const refetchPart = useSelector((state) => state.global.refetchPart);
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

  const [lookingForData, setLookingForData] = useState();
  const [filtersCount, setFiltersCount] = useState(0);

  const getLookingFor = () => {
    return new Promise((resolve, reject) => {
      contactServices
        .getContactLookingProperties(contactId)
        .then((propertiesResponse) => {
          const propertiesData = propertiesResponse.data;
          setLookingForData(propertiesData.data);
          let newFiltersCount = 0;
          if (propertiesData.data[0]) {
            if (propertiesData.data[0].bathrooms_min || propertiesData.data[0].bathrooms_max) {
              newFiltersCount += 1;
            }
            if (propertiesData.data[0].bedrooms_min || propertiesData.data[0].bedrooms_max) {
              newFiltersCount += 1;
            }
            if (propertiesData.data[0].budget_min || propertiesData.data[0].budget_max) {
              newFiltersCount += 1;
            }
            if (propertiesData.data[0].neighborhood_ids && propertiesData.data[0].neighborhood_ids.length > 0) {
              newFiltersCount += 1;
            }
          }
          setFiltersCount(newFiltersCount);
          console.log('request done');
          resolve(propertiesData.data);
        })
        .catch((error) => {
          console.log(error);
          toast.error('Error fetching looking for');
          reject(error);
        });
    });
  };

  // const lookingForData = useSelector((state) => state.clientDetails.lookingForData);
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
      const lookingProperties = await getLookingFor();

      if (lookingProperties && lookingProperties[0]) {
        formik.setValues({
          neighborhood_ids: lookingProperties[0].neighborhood_ids,
          bedrooms: lookingProperties[0].bedrooms_min != 0 ? lookingProperties[0].bedrooms_min : '',
          bathrooms: lookingProperties[0].bathrooms_min != 0 ? lookingProperties[0].bathrooms_min : '',
          budget_min: lookingProperties[0].budget_min != 0 ? lookingProperties[0].budget_min : '',
          budget_max: lookingProperties[0].budget_max != 0 ? lookingProperties[0].budget_max : '',
        });
        fetchProperties(lookingProperties[0], page, filterValue);
        console.log(lookingProperties[0], page, filterValue);
      } else {
        fetchProperties(formik.values, page, filterValue);
      }
      setLoadingPropertyInterests(false);
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
    console.log(url);
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

  const getNeighborhoodShortVersion = () => {
    const { neighborhood_ids } = formik.values;
    if (!neighborhood_ids.length) return null;

    const neighborhoods = neighborhood_ids.map((id) => NYCneighborhoods.find((n) => n.value === id)?.label);

    if (neighborhoods.length > 2) {
      return `${neighborhoods[0]}, ${neighborhoods[1]}, +${neighborhoods.length - 2} more`;
    }
    return neighborhoods.join(', ');
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
    initializePropertyInterests();
  }, [category]);

  useEffect(() => {
    if (refetchPart == 'looking-for') {
      initializePropertyInterests();
      dispatch(setRefetchPart(null));
    }
  }, [refetchPart]);

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

  const PropertyDetail = ({ className, label, value, iconAfter, textAfter, title }) => {
    return (
      <div className={`${className} text-sm`}>
        <div className="mb-1 text-gray-500 font-medium">{label}</div>
        <div className="text-gray-900 flex items-center flex-nowrap sm:flex-wrap" title={title}>
          <span className="mr-1">{value == 0 ? 'Any' : value}</span> {iconAfter && iconAfter}{' '}
          {textAfter && <span className="text-gray-500">{textAfter}</span>}
        </div>
      </div>
    );
  };

  const tabs = [
    { name: 'All', href: '#' },
    { name: 'Portfolio', href: '#', count: 4 },
    // { name: 'Sent', href: '#' },
    { name: 'Liked', href: '#' },
    { name: 'Disliked', href: '#' },
    // { name: 'Applied', href: '#' },
    // { name: 'Sold', href: '#' },
  ];

  const [propertiesCurrentTab, setPropertiesCurrentTab] = useState(0);

  function formatPrice(value) {
    if (!isNaN(value)) {
      const num = parseFloat(value);

      if (num >= 1000) {
        if (num % 1000 !== 0 && num % 100 === 0) {
          return `$${(num / 1000).toFixed(1)}k`;
        } else if (num % 1000 === 0) {
          return `$${(num / 1000).toFixed(0)}k`;
        }
        return `$${num.toLocaleString()}`;
      } else {
        return `$${num}`;
      }
    } else {
      return `$${value}`;
    }
  }

  return (
    <>
      {showAddPopup && (
        <AddLookingForPopup
          action={getLookingAction()}
          contactId={contactId}
          title="Edit Property Interests"
          className="w-[580px]"
          handleClose={() => setShowAddPopup(false)}
        />
      )}
      {showEditPopup && (
        <EditLookingForPopup
          action={getLookingAction()}
          contactId={contactId}
          data={lookingForData[0]}
          title={lookingForData[0] ? 'Edit Property Interests' : 'Add Property Interests'}
          className="w-full md:w-[670px]"
          handleClose={() => setShowEditPopup(false)}
        />
      )}
      {loading ? (
        <div className="relative details-tabs-fixed-height bg-white">
          <Loader></Loader>
        </div>
      ) : (
        <SimpleBar autoHide>
          <div className="bg-white relative scrollable-area" style={{ minHeight: 'calc(100vh - 158px)' }}>
            {loadingPropertyInterests || propertyInterests === undefined ? (
              <Loader message="Please wait we're searching for matched properties"></Loader>
            ) : (
              <>
                <div className="">
                  <div className="flex justify-between items-center pt-[9px] pr-[9px]">
                    <div className="font-semibold">Properties</div>
                    <Button
                      count={filtersCount}
                      leftIcon={<img src={filter.src}></img>}
                      white
                      onClick={() => setShowEditPopup(true)}>
                      Client Preferences
                    </Button>
                  </div>
                  <TabsWithPills
                    propertiesCurrentTab={propertiesCurrentTab}
                    setPropertiesCurrentTab={setPropertiesCurrentTab}
                    className="py-4"
                    tabs={tabs}
                  />
                  {propertyInterests && propertyInterests.length ? (
                    <>
                      {/* <div className="mb-4 text-gray-900 text-xs font-normal flex justify-between items-center">
                        <div>
                          {category.toLowerCase() !== 'landlord' && category.toLowerCase() !== 'seller' && (
                            <>
                              {allPropertiesCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} properties
                              recommended
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
                          )}{' '}
                          from the REBNY database.
                        </div>

                        <div className={'flex items-center gap-2'}>
                          <p
                            className="text-gray6 font-inter font-normal leading-5 text-sm"
                            style={{ marginTop: '3px' }}>
                            Sort by
                          </p>
                          <FilterPropertiesDropdown onFiltersChange={onFiltersChange} />
                        </div>
                      </div> */}
                      <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {propertyInterests.map((property, index) => (
                          <PropertyCard noSelect={noSelect} key={index} property={property}></PropertyCard>
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
                                  fetchProperties(lookingForData[0], page - 1, filterValue).then(() =>
                                    setTimeout(() => {
                                      document.querySelector('.scrollable-area').scrollIntoView({
                                        behavior: 'smooth',
                                      });
                                    }, 200),
                                  );
                                  setPage(page - 1);
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
                                  fetchProperties(lookingForData[0], page + 1, filterValue).then(() =>
                                    setTimeout(() => {
                                      document.querySelector('.scrollable-area').scrollIntoView({
                                        behavior: 'smooth',
                                      });
                                    }, 200),
                                  );
                                  setPage(page + 1);
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
