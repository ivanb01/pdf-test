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
import { formatPrice, valueOptions } from '@global/functions';
import { useSelector } from 'react-redux';
import { setRefetchPart } from '@store/global/slice';
import { useDispatch } from 'react-redux';
import fetchJsonp from 'fetch-jsonp';

export default function LookingFor({ contactId, category }) {
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
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [lookingForState, setLookingForState] = useState(0);
  const [loadingButton, setLoadingButton] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);
  const [propertyInterests, setPropertyInterests] = useState();
  const [loadingPropertyInterests, setLoadingPropertyInterests] = useState(true);

  const getLookingAction = () => {
    return category.toLowerCase() == 'buyer' || category.toLowerCase() == 'seller' ? 1 : 2;
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
          looking_action: values.looking_action,
          bedrooms_min: values.bedrooms,
          bedrooms_max: values.bedrooms,
          bathrooms_min: values.bathrooms,
          bathrooms_max: values.bathrooms,
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
      await contactServices.addContactLookingProperty(contactId, values);
      setLoadingButton(false);
      toast.success('Property interests saved successfully!');
      dispatch(setRefetchPart('looking-for'));
      setLookingForState(1);
    } catch (error) {
      console.log(error);
      setLoadingButton(false);
    }
  };

  const fetchLookingProperties = async () => {
    try {
      const lookingProperties = lookingForData;
      if (lookingProperties[0]) {
        formik.setValues({
          neighborhood_ids: lookingProperties[0].neighborhood_ids,
          bedrooms: lookingProperties[0].bedrooms_min != 0 ? lookingProperties[0].bedrooms_min : '',
          bathrooms: lookingProperties[0].bathrooms_min != 0 ? lookingProperties[0].bathrooms_min : '',
          budget_min: lookingProperties[0].budget_min != 0 ? lookingProperties[0].budget_min : '',
          budget_max: lookingProperties[0].budget_max != 0 ? lookingProperties[0].budget_max : '',
        });
        setLookingForState(1);
        fetchPropertyInterests(lookingProperties[0]);
      } else {
        console.log('sett');
        setLookingForState(0);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (lookingForData != null) fetchLookingProperties();
  }, [contactId, lookingForData, refetchData]);

  useLayoutEffect(() => {
    if (formik.isValid) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [formik]);

  const fetchPropertyInterests = async (values) => {
    setLoadingPropertyInterests(true);
    let filters = values;
    let params = {
      apikey: '4d7139716e6b4a72',
      callback: 'callback',
    };
    params['status'] = getLookingAction();
    if (filters.neighborhood_ids) params['neighborhood_id'] = filters.neighborhood_ids.join(',');
    if (filters.budget_min) params['priceMin'] = filters.budget_min;
    if (filters.budget_max) params['priceMax'] = filters.budget_max;
    if (filters.bedrooms_min) {
      params['bedsMin'] = filters.bedrooms_min;
    }
    if (filters.bedrooms_max) {
      params['bedsMax'] = filters.bedrooms_max;
    }

    if (filters.bathrooms_min) {
      params['bathMin'] = filters.bathrooms_min;
    }
    if (filters.bathrooms_max) {
      params['bathMax'] = filters.bathrooms_max;
    }

    const urlParams = new URLSearchParams({
      ...params,
    });

    const url = 'https://dataapi.realtymx.com/listings?' + urlParams.toString();

    console.log(url);
    const data = await fetchJsonp(url)
      .then((res) => res.json())
      .then((data) => {
        return data;
      });

    setPropertyInterests(data.LISTINGS);
    setLoadingPropertyInterests(false);
  };

  const getNeighborhoodValue = () => {
    let neighborhoods = [];
    formik.values.neighborhood_ids.forEach((element) => {
      neighborhoods.push(NYCneighborhoods.find((neighborhood) => neighborhood.value == element).label);
    });
    return neighborhoods.join(', ');
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
      {showPopup && (
        <EditLookingFor
          data={lookingForData[0]}
          title="Edit Property Interests"
          handleClose={() => setShowPopup(false)}
        />
      )}
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
                          {formik.values.looking_action == 1 ? 'for Sale' : 'for Rent'}
                        </div>
                      </div>
                      <div className="cursor-pointer" onClick={() => setShowPopup(true)}>
                        Edit
                      </div>
                    </div>
                    <PropertyDetail className="mb-4" label="Neighborhood" value={getNeighborhoodValue()} />
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
                        {...(formik.values.looking_action == 2 && {
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
                          {propertyInterests.map((property, index) => (
                            <PropertyCard key={index} property={property}></PropertyCard>
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
