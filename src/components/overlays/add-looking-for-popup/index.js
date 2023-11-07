import Button from '@components/shared/button';
import Input from '@components/shared/input';
import Image from 'next/image';
import SearchSelectInput from '@components/shared/search-select-input';
import Overlay from '@components/shared/overlay';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { NYCneighborhoods } from '@global/variables';
import bedroom from '/public/images/bedroom.svg';
import bathroom from '/public/images/bathroom.svg';
import usd from '/public/images/usd.svg';
import * as contactServices from 'api/contacts';
import { valueOptions } from '@global/functions';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setRefetchPart } from '@store/global/slice';
import { toast } from 'react-hot-toast';

const AddLookingForPopup = ({ title, handleClose, className, contactId, action }) => {
  const dispatch = useDispatch();
  const [loadingButton, setLoadingButton] = useState(false);

  const LookingPropertySchema = Yup.object().shape({
    neighborhood_ids: Yup.array()
      .required('Neighborhood IDs are required')
      .min(1, 'Please select at least one neighborhood'),
    bedrooms: Yup.number()
      .integer('Must be integer')
      .min(0, 'Minimum value is 0')
      .transform((value, originalValue) =>
        typeof originalValue === 'string' && originalValue.trim() === '' ? undefined : isNaN(value) ? undefined : value,
      )
      .notRequired(),
    bathrooms: Yup.number()
      .integer('Must be integer')
      .min(0, 'Minimum value is 0')
      .transform((value, originalValue) =>
        typeof originalValue === 'string' && originalValue.trim() === '' ? undefined : isNaN(value) ? undefined : value,
      )
      .notRequired(),
    budget_min: Yup.number()
      .min(0, 'Budget Min should be greater than 0')
      .typeError('Budget Min should be an integer')
      .transform((value, originalValue) =>
        typeof originalValue === 'string' && originalValue.trim() === '' ? undefined : isNaN(value) ? undefined : value,
      )
      .notRequired(),
    budget_max: Yup.number()
      .typeError('Budget Max should be an integer')
      .when('budget_min', (budget_min, schema) => {
        if (budget_min === undefined || isNaN(budget_min)) {
          return;
        } else {
          return schema
            .typeError('Budget Max should be an integer')
            .moreThan(budget_min, 'Budget Max should be greater than Budget Min');
        }
      })
      .transform((value, originalValue) =>
        typeof originalValue === 'string' && originalValue.trim() === '' ? undefined : isNaN(value) ? undefined : value,
      )
      .notRequired(),
  });
  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      neighborhood_ids: '',
      looking_action: action,
      bedrooms: '',
      bathrooms: '',
      budget_min: '',
      budget_max: '',
    },
    validationSchema: LookingPropertySchema,
    onSubmit: (values, { setFieldValue }) => {
      console.log(values.budget_min ? parseFloat(values.budget_min) : null);
      setFieldValue('budget_min', values.budget_min ? parseFloat(values.budget_min) : null);
      setFieldValue('budget_max', values.budget_max ? parseFloat(values.budget_max) : null);

      if (formik.isValid) {
        handleAddSubmit({
          neighborhood_ids: values.neighborhood_ids ? values.neighborhood_ids : null,
          looking_action: values.looking_action ? values.looking_action : null,
          bedrooms_min: values.bedrooms ? values.bedrooms : null,
          bedrooms_max: values.bedrooms ? values.bedrooms : null,
          bathrooms_min: values.bathrooms ? values.bathrooms : null,
          bathrooms_max: values.bathrooms ? values.bathrooms : null,
          budget_min: values.budget_min ? Number(values.budget_min) : null,
          budget_max: values.budget_max ? Number(values.budget_max) : null,
        });
      }
    },
  });
  const { errors, touched } = formik;

  const handleAddSubmit = async (values) => {
    setLoadingButton(true);
    try {
      // console.log(contactId, values);
      const res = await contactServices.addContactLookingProperty(contactId, values);
      toast.success('Changes were successfully saved');
      dispatch(setRefetchPart('looking-for'));
      setTimeout(() => {
        setLoadingButton(false);
        handleClose();
      }, 1000);
    } catch (error) {
      console.log(error);
      setLoadingButton(false);
    }
  };

  return (
    <Overlay
      // className="w-[632px]"
      handleCloseOverlay={handleClose}
      title={title}
      className={className}>
      <div className="p-5">
        <form onSubmit={formik.handleSubmit}>
          <div className="mx-auto relative">
            <SearchSelectInput
              optional
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
          <div className="text-right">
            <Button white label="Cancel" className="mr-2" onClick={handleClose} />
            <Button
              label="Save Changes"
              type="submit"
              primary
              className="mt-6"
              loading={loadingButton}
              disabled={!formik.isValid}
            />
          </div>
        </form>
      </div>
    </Overlay>
  );
};

export default AddLookingForPopup;
