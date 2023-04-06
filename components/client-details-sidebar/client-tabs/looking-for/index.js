// import Accordion from 'components/shared/accordion';
import Input from 'components/shared/input';
import { useFormik } from 'formik';
import bedroom from 'public/images/bedroom.svg';
import bathroom from 'public/images/bathroom.svg';
import usd from 'public/images/usd.svg';
import { SearchIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import Accordion from 'components/shared/accordion';
import { useEffect, useState } from 'react';
import Button from 'components/shared/button';
import * as contactServices from 'api/contacts';
import { FormatLineSpacing } from '@mui/icons-material';
import * as Yup from 'yup';

export default function LookingFor({ contactId }) {
  const LookingPropertySchema = Yup.object().shape({
    neighborhood_id: Yup.number().required('Field is required'),
    bedrooms_min: Yup.number().min(0, 'Minimum value is 0'),
    bedrooms_max: Yup.number()
      .min(0, 'Minimum value is 0')
      .when('bedrooms_min', {
        is: (val) => val && val >= 0,
        then: Yup.number().min(
          Yup.ref('bedrooms_min'),
          'Max bedrooms must be greater than min bedrooms'
        ),
      }),
    bathrooms_min: Yup.number().min(0, 'Minimum value is 0'),
    bathrooms_max: Yup.number()
      .min(0, 'Minimum value is 0')
      .when('bathrooms_min', {
        is: (val) => val && val >= 0,
        then: Yup.number().min(
          Yup.ref('bathrooms_min'),
          'Max bathrooms must be greater than min bathrooms'
        ),
      }),
    budget_min: Yup.number().min(0, 'Minimum value is 0'),
    // budget_min: Yup.number().transform((o, v) => Number(v.replace(/,/g, ''))).min(0, 'Minimum value is 0'),
    budget_max: Yup.number()
      .min(0, 'Minimum value is 0')
      .when('budget_min', {
        is: (val) => val && val >= 0,
        then: Yup.number().min(
          Yup.ref('budget_min'),
          'Max budget must be greater than min budget'
        ),
      }),
  });

  //* FORMIK *//
  const [selections, setSelections] = useState([]);
  const [loadingButton, setLoadingButton] = useState(false);

  const formik = useFormik({
    initialValues: {
      neighborhood_id: '',
      looking_action: 'sell',
      bedrooms_min: '',
      bedrooms_max: '',
      bathrooms_min: '',
      bathrooms_max: '',
      budget_min: '',
      budget_max: '',
    },
    validationSchema: LookingPropertySchema,
    onSubmit: (values) => {
      console.log('looking property', values);
      handleAddSubmit(values);
    },
  });

  const { errors, touched, setFieldValue } = formik;

  const handleAddSubmit = async (values) => {
    setLoadingButton(true);
    try {
      const res = await contactServices.addContactLookingProperty(
        contactId,
        values
      );
      console.log('add', res);
      // setHasLookingProperty(true);
      setLoadingButton(false);
    } catch (error) {
      console.log(error);
      setLoadingButton(false);
    }
  };

  const fetchLookingProperties = async () => {
    try {
      const { data } = await contactServices.getContactLookingProperties(
        contactId
      );
      const lookingProperties = data.data;
      if (lookingProperties.length > 0) {
        formik.setValues({
          neighborhood_id: lookingProperties[0].neighborhood_id,
          looking_action: lookingProperties[0].looking_action,
          bedrooms_min:
            lookingProperties[0].bedrooms_min != 0
              ? lookingProperties[0].bedrooms_min
              : '',
          bedrooms_max:
            lookingProperties[0].bedrooms_max != 0
              ? lookingProperties[0].bedrooms_max
              : '',
          bathrooms_min:
            lookingProperties[0].bathrooms_min != 0
              ? lookingProperties[0].bathrooms_min
              : '',
          bathrooms_max:
            lookingProperties[0].bathrooms_max != 0
              ? lookingProperties[0].bathrooms_max
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

  const tabs = [
    // {
    //   title: 'NEIGHBORHOOD',
    //   value: 'neighborhood',
    //   content: (
    //     <div className="">
    //       <Input
    //         id="neighborhood_id"
    //         type="number"
    //         label="Neighborhood"
    //         iconAfter={<SearchIcon className="text-gray3" height={20} />}
    //         onChange={formik.handleChange}
    //         value={formik.values.neighborhood_id}
    //         error={errors.neighborhood_id && touched.neighborhood_id}
    //         errorText={errors.neighborhood_id}
    //       />
    //     </div>
    //   ),
    // },
    {
      title: 'AMENITIES',
      value: 'amenities',
      content: (
        <div className="grid grid-cols-2 gap-4">
          <Input
            id="bedrooms_min"
            type="number"
            label="Bedrooms Min"
            iconAfter={<Image src={bedroom} height={20} />}
            className="col-span-1"
            onChange={formik.handleChange}
            value={formik.values.bedrooms_min}
            error={errors.bedrooms_min && touched.bedrooms_min}
            errorText={errors.bedrooms_min}
          />
          <Input
            id="bedrooms_max"
            type="number"
            label="Bedrooms Max"
            className="col-span-1"
            iconAfter={<Image src={bedroom} height={20} />}
            onChange={formik.handleChange}
            value={formik.values.bedrooms_max}
            error={errors.bedrooms_max && touched.bedrooms_max}
            errorText={errors.bedrooms_max}
          />
          <Input
            id="bathrooms_min"
            type="number"
            label="Bathrooms Min"
            iconAfter={<Image src={bathroom} height={20} />}
            className="col-span-1"
            onChange={formik.handleChange}
            value={formik.values.bathrooms_min}
            error={errors.bathrooms_min && touched.bathrooms_min}
            errorText={errors.bathrooms_min}
          />
          <Input
            id="bathrooms_max"
            type="number"
            label="Bathrooms Max"
            className="col-span-1"
            iconAfter={<Image src={bathroom} height={20} />}
            onChange={formik.handleChange}
            value={formik.values.bathrooms_max}
            error={errors.bathrooms_max && touched.bathrooms_max}
            errorText={errors.bathrooms_max}
          />
        </div>
      ),
    },
    {
      title: 'BUDGET MIN/MAX',
      value: 'budget',
      content: (
        <div className="grid grid-cols-2 gap-4">
          <Input
            id="budget_min"
            type="number"
            label="Budget Min"
            iconAfter={<Image src={usd} height={20} />}
            className="col-span-1"
            onChange={formik.handleChange}
            value={formik.values.budget_min}
            error={errors.budget_min && touched.budget_min}
            errorText={errors.budget_min}
          />
          <Input
            id="budget_max"
            type="number"
            label="Budget Max"
            iconAfter={<Image src={usd} height={20} />}
            className="col-span-1"
            // onChange={(e)=>{
            // formik.handleChange('budget_max');
            // console.log(e.target.value, e.target.value.slice(0,-3), Number(e.target.value.replace(',','')))
            // const test = (Number((e.target.value).toString().replace(/\D/g, '')) || '').toLocaleString(undefined, {
            //   minimumFractionDigits: 2,
            //   maximumFractionDigits: 2
            // });
            // test.slice(0,-3).replace(',',''),

            // console.log(
            //   (Number((e.target.value).toString().replace(/\D/g, '')) || '').toLocaleString(),
            //   test,
            //   test.slice(0,-3),
            //   test.slice(0,-3).replace(',',''),

            // )
            // console.log('test', test, e.target.value, test.slice(0,-3).replace(',',''))
            // formik.setFieldValue('budget_max', Number((e.target.value.replace(',',''))));
            // formik.setFieldValue('budget_max', test.slice(0,-3).replace(',',''));

            // }}
            onChange={formik.handleChange}
            value={formik.values.budget_max}
            // value={(Number((formik.values.budget_max).toString().replace(/\D/g, '')) || '').toLocaleString()}
            // value={(Number((formik.values.budget_max).toString().replace(/\D/g, '')) || '').toLocaleString(undefined, {
            //   minimumFractionDigits: 2,
            //   maximumFractionDigits: 2
            // })}
            error={errors.budget_max && touched.budget_max}
            errorText={errors.budget_max}
          />
        </div>
      ),
    },
  ];
  return (
    <div className="flex bg-gray10 flex-row details-tabs-fixed-height overflow-y-scroll">
      <div className="w-[65%] bg-gray10">
        <div className="bg-white p-6 m-[24px]">
          <form onSubmit={formik.handleSubmit}>
            <div className="max-w-3xl mx-auto">
              <Input
                id="neighborhood_id"
                type="number"
                label="Neighborhood"
                iconAfter={<SearchIcon className="text-gray3" height={20} />}
                onChange={formik.handleChange}
                value={formik.values.neighborhood_id}
                error={errors.neighborhood_id && touched.neighborhood_id}
                errorText={errors.neighborhood_id}
              />
            </div>
            <Accordion
              tabs={tabs}
              activeSelections={selections}
              defaultOpen={true}
            />
            <Button
              type="submit"
              primary
              className="mt-6"
              loading={loadingButton}
            >
              Save
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
