import Button from 'components/shared/button';
import Avatar from 'components/shared/avatar';
import Radio from 'components/shared/radio';
import { useState } from 'react';
import StatusSelect from 'components/status-select';
import MultiStepOverlay from 'components/shared/form/multistep-form';
import { useFormik } from 'formik';
import Input from 'components/shared/input';
// import { addContact } from 'store/contact/actions';
import { useDispatch } from 'react-redux';
import { setOpenedTab, setOpenedSubtab } from 'store/global/slice';
import * as contactServices from 'api/contacts';
import { setContacts } from 'store/contacts/slice';
import { formatPhoneNumber } from 'global/functions';
import Dropdown from 'components/shared/dropdown';
import { importSourceOptions, phoneNumberRules } from 'global/variables';
import ChipInput from 'components/shared/input/chipInput';
import * as Yup from 'yup';
import Select from 'react-select';
import Chip from 'components/shared/chip';

const multiselectOptions = [
  { value: 'super-high-priority', label: 'Super High Priority!' },
  { value: 'high-priority', label: 'High Priority' },
  { value: 'low-priority', label: 'Low Priority' },
  { value: 'lawyer', label: 'Lawyer' },
  { value: 'contractor', label: 'Contractor' },
  { value: 'mortgage-broker', label: 'Mortagage Broker' },
  { value: 'title-agent', label: 'Title Agent' },
  { value: 'agent', label: 'Agent' },
  { value: 'friend', label: 'Friend' },
  { value: 'family', label: 'Family' },
  { value: 'mover', label: 'Mover' },
  { value: 'photographer', label: 'Photographer' },
  { value: 'staging', label: 'Staging' },
  { value: 'home-inspector', label: 'Home Inspector' },
  { value: 'finance', label: 'Finance' },
  { value: 'insurance', label: 'Insurance' },
  { value: 'appraiser', label: 'Appraiser' },
  { value: 'handyman', label: 'Handyman' },
];

const categoryIds = {
  'Add Client': '4,5,6,7',
  'Add Professional': '8,9,12',
};

const globalTabs = {
  'Add Client': 0,
  'Add Professional': 1,
};

const AddClientManuallyOverlay = ({
  handleClose,
  title,
  options,
  statuses,
}) => {
  const steps = [
    {
      id: 1,
      name: 'General Information',
      href: '#',
      status: 'current',
    },
    { id: 2, name: 'Type and Status', href: '#' },
  ];

  const [currentStep, setCurrentStep] = useState(1);

  const dispatch = useDispatch();

  const AddContactSchema = Yup.object().shape({
    first_name: Yup.string().required('Field can not be empty'),
    last_name: Yup.string().required('Field can not be empty'),
    email: Yup.string()
      .required('Field can not be empty')
      .email('Not a proper email'),
    phone_number: Yup.string()
      .required('Field can not be empty')
      .matches(phoneNumberRules, {
        message: 'Not a proper format phone number',
      }),
  });

  const AddContactSchema2 = Yup.object().shape({
    selectedContactType: Yup.string().required('Contact type is required'),
    selectedStatus: Yup.string().required('Contact status is required'),
  });

  //* FORMIK *//
  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      import_source: '',
      tags: ['test'],
    },
    validationSchema: AddContactSchema,
    onSubmit: (values) => {
      setCurrentStep(currentStep + 1);
    },
  });
  const { errors, touched, submitForm: submitForm1 } = formik;

  //* FORMIK-STEP-2 *//
  const formikStep2 = useFormik({
    initialValues: {
      selectedContactType: '',
      selectedStatus: '',
    },
    validationSchema: AddContactSchema2,
    onSubmit: async (values, { setSubmitting }) => {
      await addClient();
      setSubmitting(false);
    },
  });
  const {
    errors: errors2,
    touched: touched2,
    submitForm: submitForm2,
    setFieldValue: setFieldValue2,
    isSubmitting: isSubmitting2,
  } = formikStep2;

  const nextStep = () => {
    submitForm1();
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const removeChip = (tagToRemove) => {
    let newArray = formik.values.tags.filter((tag) => tag !== tagToRemove);
    formik.setFieldValue('tags', newArray);
  };

  const addChip = (tagToAdd) => {
    console.log(tagToAdd);
    let newArray = formik.values.tags;
    const tagAdded = newArray.includes(tagToAdd);
    !tagAdded && newArray.push(tagToAdd);
    console.log('newTags', newArray);
    formik.setFieldValue('tags', newArray);
  };

  const addClient = async () => {
    let subtabs = [[2, 3, 4, 5, 7, 16], [9, 10], [8], [11]];

    try {
      const contactToAdd = {
        ...formik.values,
        category_id: formikStep2.values.selectedContactType,
        status_id: formikStep2.values.selectedStatus,
      };

      console.log('contact to add: ', contactToAdd);

      const res = await contactServices.addContact(contactToAdd);
      const { data } = await contactServices.getContacts(categoryIds[title]);

      let subtabValue = 0;
      subtabs.forEach((subtab, index) => {
        console.log(subtab, index, formikStep2.values.selectedStatus);
        if (subtab.includes(formikStep2.values.selectedStatus)) {
          subtabValue = index;
        }
      });

      dispatch(setContacts(data));
      dispatch(setOpenedTab(globalTabs[title]));
      dispatch(setOpenedSubtab(subtabValue));
      handleClose();
    } catch (error) {
      console.log(error);
      handleClose();
    }
  };
  return (
    <MultiStepOverlay
      className="max-w-[635px]"
      handleClose={handleClose}
      steps={steps}
      currentStep={currentStep}
      nextStep={nextStep}
      prevStep={prevStep}
      // changeStep={(arg) => setCurrentStep(arg)}
      title={title}
      submit={submitForm2}
      isSubmittingButton={isSubmitting2}
    >
      <div className="step">
        {currentStep == 1 ? (
          <div>
            <div className="flex items-center mb-6">
              <Avatar size="large" className="mr-4" />
              <Button white label="Upload Photo" />
            </div>
            <div>
              <form onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-2 gap-4 mb-12">
                  <Input
                    type="text"
                    label="First Name"
                    id="first_name"
                    onChange={formik.handleChange}
                    value={formik.values.first_name}
                    error={errors.first_name && touched.first_name}
                    errorText={errors.first_name}
                  />
                  <Input
                    type="text"
                    label="Last Name"
                    id="last_name"
                    onChange={formik.handleChange}
                    value={formik.values.last_name}
                    error={errors.last_name && touched.last_name}
                    errorText={errors.last_name}
                  />

                  <Input
                    type="email"
                    label="Email"
                    id="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    error={errors.email && touched.email}
                    errorText={errors.email}
                  />
                  <Input
                    type="text"
                    label="Phone"
                    id="phone_number"
                    onChange={formik.handleChange}
                    value={formatPhoneNumber(formik.values.phone_number)}
                    placeholder="ex: (555) 555-5555"
                    error={errors.phone_number && touched.phone_number}
                    errorText={errors.phone_number}
                  />
                  <Dropdown
                    white
                    label="Source"
                    activeIcon={false}
                    options={importSourceOptions}
                    handleSelect={(source) =>
                      (formik.values.import_source = source.name)
                    }
                    initialSelect={formik.values.import_source}
                    placeHolder={formik.values.import_source ? null : 'Choose'}
                  />
                  <div className="w-full custom-chipinput-styles col-span-2">
                    <div className="block text-sm font-medium text-gray6 mb-1">
                      Tags
                    </div>
                    <Select
                      isMulti
                      options={multiselectOptions}
                      onChange={(choice) => {
                        formik.setFieldValue(
                          'tags',
                          choice.map((el) => el.label)
                        );
                      }}
                    ></Select>
                  </div>
                  {/* <ChipInput
                    label="Tags"
                    optional
                    className="col-span-2"
                    selections={formik.values.tags}
                    placeholder="Write tag and hit enter"
                    removeChip={removeChip}
                    addChip={addChip}
                  /> */}
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div>
            <Radio
              options={options}
              label="What kind of contact is this for you?"
              selectedContactType={formikStep2.values.selectedContactType}
              changeContactType={(e) =>
                setFieldValue2('selectedContactType', e)
              }
              className="mb-6"
              error={
                errors2.selectedContactType && touched2.selectedContactType
              }
              errorText={errors2.selectedContactType}
            />
            <StatusSelect
              selectedStatus={formikStep2.values.selectedStatus}
              setSelectedStatus={(e) => setFieldValue2('selectedStatus', e)}
              label="In what stage of communication?"
              statuses={statuses}
              error={errors2.selectedStatus && touched2.selectedStatus}
              errorText={errors2.selectedStatus}
            />
          </div>
        )}
      </div>
    </MultiStepOverlay>
  );
};

export default AddClientManuallyOverlay;
