// import Accordion from 'components/shared/accordion';
import Input from 'components/shared/input';
import { useFormik } from 'formik';
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
  const [loadingButton, setLoadingButton] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);

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

  return (
    <SimpleBar autoHide style={{ maxHeight: 'calc(100vh - 222px)' }}>
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
    </SimpleBar>
  );
}
