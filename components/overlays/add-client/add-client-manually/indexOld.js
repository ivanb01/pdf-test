import Text from 'components/shared/text';
import Button from 'components/shared/button';
import Avatar from 'components/shared/avatar';
// import BasicForm from 'components/shared/form';
import { inputs, steps } from './list';
import Radio from 'components/shared/radio';
import StatusSelect from 'components/status-select';
import MultiStepOverlay from 'components/shared/form/multistep-form';
import { useFormik } from 'formik';
import Input from 'components/shared/input';

const AddClientManuallyOverlay = ({
  handleCloseOverlay,
  nextStep,
  prevStep,
  currentStep,
  changeStep,
  title,
  options,
  statuses,
  selectedClientType,
  setSelectedClientType,
  selectedStatus,
  setSelectedStatus,
}) => {
  //* FORMIK *//
  const formik = useFormik({
    initialValues: {},
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = (values) => {
    console.log(values);
    handleAddingProfile(false)();
  };
  return (
    <MultiStepOverlay
      handleClose={handleCloseOverlay}
      steps={steps}
      currentStep={currentStep}
      nextStep={nextStep}
      prevStep={prevStep}
      changeStep={changeStep}
      title={title}
    >
      <div className="step">
        <div className="flex items-center mb-6">
          <Avatar size="large" className="mr-4" />
          <Button white label="Upload Picture" />
        </div>
        <div>
          <form onSubmit={formik.handleSubmit}>
            <Input
              type="text"
              label="First Name"
              id="firstName"
              className="mb-6"
              onChange={formik.handleChange}
            />
            <Input
              type="text"
              label="Last Name"
              id="lastName"
              className="mb-6"
              onChange={formik.handleChange}
            />
            <Input
              type="email"
              label="Email"
              id="phone"
              className="mb-6"
              onChange={formik.handleChange}
            />
            <Input
              type="phone"
              label="Phone"
              id="phone"
              className="mb-6"
              onChange={formik.handleChange}
            />
            <Button type="submit" size="small" primary label="Save" />
          </form>
          {/* <BasicForm
            inputs={inputs}
            customButtons={<a onClick={() => handleSubmit()}></a>}
          /> */}
        </div>
      </div>
      <div className="step hidden">
        <Radio
          options={options}
          label="What kind of client is this for you?"
          selectedContactType={selectedClientType}
          changeContactType={setSelectedClientType}
          className="mb-6"
        />
        <StatusSelect
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          label="In what stage of communication?"
          statuses={statuses}
        />
      </div>
    </MultiStepOverlay>
  );
};

export default AddClientManuallyOverlay;
