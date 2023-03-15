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

export default function LookingFor({ contactId }) {
  //* FORMIK *//
  const [selections, setSelections] = useState([]);
  const [hasLookingProperty, setHasLookingProperty] = useState(false);
  const [propertyId, setPropertyId] = useState(null);
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
    onSubmit: (values) => {
      console.log('looking property', values);
      hasLookingProperty ? handleUpdateSubmit(values) : handleAddSubmit(values);
    },
  });

  const handleAddSubmit = async (values) => {
    setLoadingButton(true);
    try {
      const res = await contactServices.addContactLookingProperty(
        contactId,
        values
      );
      console.log('add', res);
      setHasLookingProperty(true);
      setLoadingButton(false);
    } catch (error) {
      console.log(error);
      setLoadingButton(false);
    }
  };

  const handleUpdateSubmit = async (values) => {
    setLoadingButton(true);
    try {
      const { data } = await contactServices.updateContactLookingProperty(
        contactId,
        propertyId,
        values
      );
      console.log('Update', 'propertyId', propertyId, 'values', values);
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
      console.log(
        'lookingProperties',
        lookingProperties,
        lookingProperties.length
      );
      if (lookingProperties.length > 0) {
        formik.setValues({
          neighborhood_id: lookingProperties[0].neighborhood_id,
          looking_action: lookingProperties[0].looking_action,
          bedrooms_min: lookingProperties[0].bedrooms_min,
          bedrooms_max: lookingProperties[0].bedrooms_max,
          bathrooms_min: lookingProperties[0].bathrooms_min,
          bathrooms_max: lookingProperties[0].bathrooms_max,
          budget_min: lookingProperties[0].budget_min,
          budget_max: lookingProperties[0].budget_max,
        });
        setPropertyId(lookingProperties[0].id);
        setHasLookingProperty(true);
      } else {
        setPropertyId(null);
        setHasLookingProperty(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLookingProperties();
  }, [contactId]);

  const tabs = [
    {
      title: 'NEIGHBORHOOD',
      content: (
        <div className="">
          <Input
            id="neighborhood_id"
            type="number"
            label="Neighborhood"
            iconAfter={<SearchIcon className="text-gray3" height={20} />}
            onChange={formik.handleChange}
            value={formik.values.neighborhood_id}
          />
        </div>
      ),
    },
    {
      title: 'AMENITIES',
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
          />
          <Input
            id="bedrooms_max"
            type="number"
            label="Bedrooms Max"
            className="col-span-1"
            iconAfter={<Image src={bedroom} height={20} />}
            onChange={formik.handleChange}
            value={formik.values.bedrooms_max}
          />
          <Input
            id="bathrooms_min"
            type="number"
            label="Bathrooms Min"
            iconAfter={<Image src={bathroom} height={20} />}
            className="col-span-1"
            onChange={formik.handleChange}
            value={formik.values.bathrooms_min}
          />
          <Input
            id="bathrooms_max"
            type="number"
            label="Bathrooms Max"
            className="col-span-1"
            iconAfter={<Image src={bathroom} height={20} />}
            onChange={formik.handleChange}
            value={formik.values.bathrooms_max}
          />
        </div>
      ),
    },
    {
      title: 'BUDGET MIN/MAX',
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
          />
          <Input
            id="budget_max"
            type="number"
            label="Budget Max"
            iconAfter={<Image src={usd} height={20} />}
            className="col-span-1"
            onChange={formik.handleChange}
            value={formik.values.budget_max}
          />
        </div>
      ),
    },
  ];
  return (
    <div className="flex bg-gray10 flex-row details-tabs-fixed-height overflow-y-scroll">
      <div className="w-[65%] bg-gray10">
        {/* <Accordion tabs={tabs} /> */}
        <div className="bg-white p-6 m-[24px]">
          <form onSubmit={formik.handleSubmit}>
            <Accordion
              tabs={tabs}
              handleClick={() => console.log('test')}
              activeSelections={selections}
              defaultOpen={true}
            />
            <Button type="submit" primary className="" loading={loadingButton}>
              Save
            </Button>
          </form>
          {/* <BasicForm customButtons={<div></div>} inputs={inputs} /> */}
        </div>
      </div>
    </div>
  );
}
