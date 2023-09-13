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

const EditLookingFor = ({ title, handleClose, className, data }) => {
  const dispatch = useDispatch();
  const [loadingButton, setLoadingButton] = useState(false);
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

  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      neighborhood_ids: data.neighborhood_ids,
      looking_action: 'sell',
      bedrooms: data.bedrooms_max ? data.bedrooms_max : null,
      bathrooms: data.bathrooms_max ? data.bathrooms_max : null,
      budget_min: data.budget_min ? data.budget_min : null,
      budget_max: data.budget_max ? data.budget_max : null,
    },
    validationSchema: LookingPropertySchema,
    onSubmit: (values, { setFieldValue }) => {
      setFieldValue('budget_min', parseFloat(values.budget_min));
      setFieldValue('budget_max', parseFloat(values.budget_max));

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
      const res = await contactServices.addContactLookingProperty(data.contact_id, values);
      toast.success('Changes have been saved successfully!');
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

export default EditLookingFor;
