import Dropdown from 'components/shared/dropdown';
import Button from 'components/shared/button';
import Avatar from 'components/shared/avatar';
import { inputs, steps } from './list';
import Radio from 'components/shared/radio';
import StatusSelect from 'components/status-select';
import MultiStepOverlay from 'components/shared/form/multistep-form';
import { importSourceOptions } from 'global/variables';
import { useFormik } from 'formik';
import Input from 'components/shared/input';
import { useState } from 'react';
import * as contactServices from 'api/contacts';
import Overlay from 'components/shared/overlay';
import TagsInput from 'components/tagsInput';
import { findTagsOption } from 'global/functions';
import { useSelector } from 'react-redux';

const EditContactOverlay = ({
  className,
  handleClose,
  title,
  client,
  afterUpdate,
  handleFetchContactRequired,
}) => {
  const steps = [
    {
      id: 1,
      name: 'General Information',
      href: '#',
      status: 'current',
    },
    // { id: 2, name: 'Type and Status', href: '#' },
  ];

  const [loading, setLoading] = useState(false);

  const openedTab = useSelector((state) => state.global.openedTab);

  const resetForm = () => {
    handleClose();
  };

  //* FORMIK *//
  const formik = useFormik({
    initialValues: {
      first_name: client?.first_name,
      last_name: client?.last_name,
      email: client?.email,
      phone_number: client?.phone_number,
      import_source: client?.import_source,
      tags: client?.tags,
    },
  });

  const editClient = async () => {
    try {
      const res = await contactServices.updateContact(
        client?.id,
        formik.values
      );
      console.log(formik.values, 'edit contact', client?.id);
      if (handleFetchContactRequired) {
        handleFetchContactRequired();
      } else {
        afterUpdate();
      }
    } catch (error) {
      console.log(error);
    }
    resetForm();
  };
  return (
    <Overlay
      // className="w-[632px]"
      handleCloseOverlay={resetForm}
      title={title}
      className={className}
      // className={className}
      // handleClose={resetForm}
      // steps={steps}
      // currentStep={currentStep}
      // nextStep={nextStep}
      // prevStep={prevStep}
      // changeStep={(arg) => setCurrentStep(arg)}
      // title={title}
      // submit={editClient}
    >
      <div className="p-5">
        {/* <div className="flex items-center mb-6">
          <Avatar size="large" className="mr-4" />
          <Button white label="Edit" />
        </div> */}
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-12">
            <Input
              type="text"
              label="First Name"
              id="first_name"
              className=""
              onChange={formik.handleChange}
              value={formik.values.first_name}
            />
            <Input
              type="text"
              label="Last Name"
              id="last_name"
              className=""
              onChange={formik.handleChange}
              value={formik.values.last_name}
            />
            <Input
              type="email"
              label="Email"
              id="email"
              className=""
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <Input
              type="text"
              label="Phone"
              id="phone_number"
              className=""
              onChange={formik.handleChange}
              value={formik.values.phone_number}
            />
            {/* <Input
                  type="text"
                  label="Source"
                  id="import_source"
                  className="mb-6 float-left w-[100%]"
                  onChange={formik.handleChange}
                  value={formik.values.import_source}
                /> */}
            <Dropdown
              label="Source"
              activeIcon={false}
              options={importSourceOptions}
              className=""
              handleSelect={(source) =>
                (formik.values.import_source = source.name)
              }
              initialSelect={formik.values.import_source}
              placeHolder={formik.values.import_source ? null : 'Choose'}
            />
            <TagsInput
              label="Tags"
              typeOfContact={openedTab}
              value={findTagsOption(formik.values.tags, openedTab)}
              onChange={(choice) => {
                formik.setFieldValue(
                  'tags',
                  choice.map((el) => el.label)
                );
              }}
            />
          </div>
        </form>
      </div>
      <div className="flex items-center justify-between py-4 px-6 space-x-2 fixed-categorize-menu">
        <div></div>
        <div>
          <Button
            className="mr-3"
            label="Cancel"
            white
            onClick={handleClose}
          ></Button>
          <Button
            label="Save"
            loading={loading}
            // rightIcon={<ArrowRightIcon height={15} />}
            onClick={() => {
              setLoading(true);
              editClient();
            }}
          ></Button>
        </div>
      </div>
    </Overlay>
  );
};

export default EditContactOverlay;
