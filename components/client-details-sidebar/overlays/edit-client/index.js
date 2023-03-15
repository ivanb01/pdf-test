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
import * as contactServices from 'api/contacts'


const EditContactOverlay = ({
  handleClose,
  title,
  client,
  handleFetchContactRequired
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

  const resetForm = () => {
    handleClose();
  };

  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };


  //* FORMIK *//
  const formik = useFormik({
    initialValues: {
      first_name: client?.first_name,
      last_name: client?.last_name,
      email: client?.email,
      phone_number: client?.phone_number,
      import_source: client?.import_source,
    },
  });

  const editClient = async () => {
    try {
      const res = await contactServices.updateContact(client?.id, formik.values);
      console.log(formik.values, 'edit contact', client?.id);
      handleFetchContactRequired()
    } catch (error) {
      console.log(error)

    } 
    resetForm();
    
  }
  return (
    <MultiStepOverlay
      handleClose={resetForm}
      steps={steps}
      currentStep={currentStep}
      nextStep={nextStep}
      prevStep={prevStep}
      changeStep={(arg) => setCurrentStep(arg)}
      title={title}
      submit={editClient}
    >
      <div className="step">
        {currentStep == 1 && (
          <div>
            <div className="flex items-center mb-6">
              <Avatar size="large" className="mr-4" />
              <Button white label="Edit" />
            </div>
            <div>
              <form onSubmit={formik.handleSubmit}>
                <Input
                  type="text"
                  label="First Name"
                  id="first_name"
                  className="mb-6 w-[50%] pr-3 float-left"
                  onChange={formik.handleChange}
                  value={formik.values.first_name}
                />
                <Input
                  type="text"
                  label="Last Name"
                  id="last_name"
                  className="mb-6 w-[50%] pl-3 float-left"
                  onChange={formik.handleChange}
                  value={formik.values.last_name}
                />
                <Input
                  type="email"
                  label="Email"
                  id="email"
                  className="mb-6 w-[50%] pr-3 float-left"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                <Input
                  type="text"
                  label="Phone"
                  id="phone_number"
                  className="mb-6 w-[50%] pl-3 float-left"
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
                  className="mb-6 w-52"
                  activeClasses="bg-purple1"
                  handleSelect={(source) => formik.values.import_source = source.name}
                  initialSelect={formik.values.import_source}
                  selectClasses="bg-purple1 rounded-full"
                  placeHolder={formik.values.import_source ? null : 'Choose'}
                />
              </form>
            </div>
          </div>
        ) }
      </div>
    </MultiStepOverlay>
    
  );
};

export default EditContactOverlay;
