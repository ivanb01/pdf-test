import Button from 'components/shared/button';
import Avatar from 'components/shared/avatar';
import Radio from 'components/shared/radio';
import { useState } from 'react';
import StatusSelect from 'components/status-select';
import MultiStepOverlay from 'components/shared/form/multistep-form';
import { useFormik } from 'formik';
import Input from 'components/shared/input';
import { useDispatch } from 'react-redux';
import { setOpenedTab, setOpenedSubtab } from 'store/global/slice';
// import * as contactServices from 'api/contacts';
import { addContact, getContacts, findContactByEmail } from 'api/contacts';
import { setContacts } from 'store/contacts/slice';
import { findTagsOption, formatPhoneNumber } from 'global/functions';
import Dropdown from 'components/shared/dropdown';
import { leadSourceOptions, phoneNumberRules } from 'global/variables';
import * as Yup from 'yup';
import TagsInput from 'components/tagsInput';
import { useSelector } from 'react-redux';
import { vendorTypes } from 'global/variables';
import Chip from 'components/shared/chip';
import NotificationAlert from 'components/shared/alert/notification-alert';
import { types } from 'global/variables';
import { setRefetchData } from 'store/global/slice';

const categoryIds = {
  'Add Client': JSON.stringify(types[0].types.map((type) => type.id)),
  'Add Professional': JSON.stringify(types[1].types.map((type) => type.id)),
};

const globalTabs = {
  'Add Client': 0,
  'Add Professional': 1,
};

const AddClientManuallyOverlay = ({ handleClose, title, options, statuses }) => {
  const steps = [
    {
      id: 1,
      name: 'General Information',
      href: '#',
      status: 'current',
    },
    { id: 2, name: 'Type and Status', href: '#' },
  ];

  const [existingContactEmailError, setExistingContactEmailError] = useState('');
  const [existingContactEmail, setExistingContactEmail] = useState('');

  const [currentStep, setCurrentStep] = useState(1);

  const openedTab = useSelector((state) => state.global.openedTab);

  const dispatch = useDispatch();

  const AddContactSchema = Yup.object().shape({
    first_name: Yup.string().required('Field can not be empty'),
    last_name: Yup.string().required('Field can not be empty'),
    email: Yup.string().required('Field can not be empty').email('Not a proper email'),
    phone_number: Yup.string()
      // .required('Field can not be empty')
      .matches(phoneNumberRules, {
        message: 'Not a proper format phone number',
      })
      .nullable(),
  });

  const AddContactSchema2 = Yup.object().shape({
    selectedContactType: Yup.string().required('Contact type is required'),
    selectedContactSubtype: Yup.string().when('selectedContactType', {
      is: (val) => val == 8,
      then: Yup.string().required('Contact subtype is required'),
      otherwise: Yup.string().notRequired(),
    }),
  });

  //* FORMIK *//
  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      lead_source: '',
      tags: [],
    },
    validationSchema: AddContactSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const { data } = await findContactByEmail({ email: values.email });
        if (data) {
          setExistingContactEmailError('This email already exists!');
          setExistingContactEmail(values.email);
        }
        dispatch(setRefetchData(true));
      } catch (error) {
        console.log(error);
        if (error.response.status === 404) {
          setExistingContactEmailError('');
          setExistingContactEmail('');
          setCurrentStep(currentStep + 1);
        }
      }
      setSubmitting(false);
    },
  });
  const { errors, touched, submitForm: submitForm1, isSubmitting: isSubmitting1 } = formik;

  //* FORMIK-STEP-2 *//
  const formikStep2 = useFormik({
    initialValues: {
      selectedContactType: '',
      selectedContactSubtype: '',
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

  // const removeChip = (tagToRemove) => {
  //   let newArray = formik.values.tags.filter((tag) => tag !== tagToRemove);
  //   formik.setFieldValue('tags', newArray);
  // };

  // const addChip = (tagToAdd) => {
  //   console.log(tagToAdd);
  //   let newArray = formik.values.tags;
  //   const tagAdded = newArray.includes(tagToAdd);
  //   !tagAdded && newArray.push(tagToAdd);
  //   console.log('newTags', newArray);
  //   formik.setFieldValue('tags', newArray);
  // };

  const addClient = async () => {
    let subtabs = [[2, 3, 4, 5, 7, 16], [9, 10], [8], [11]];

    try {
      let type =
        formikStep2.values.selectedContactType == 8
          ? formikStep2.values.selectedContactSubtype
          : formikStep2.values.selectedContactType;
      let status = formikStep2.values.selectedStatus ? formikStep2.values.selectedStatus : 1;

      const contactToAdd = {
        ...formik.values,
        category_id: type,
        status_id: status,
      };

      console.log('contact to add: ', contactToAdd);

      const res = await addContact(contactToAdd);
      const { data } = await getContacts(categoryIds[title]);

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
      className="max-w-[730px] min-w-[730px]"
      handleClose={handleClose}
      steps={steps}
      currentStep={currentStep}
      nextStep={nextStep}
      prevStep={prevStep}
      // changeStep={(arg) => setCurrentStep(arg)}
      title={title}
      submit={submitForm2}
      isSubmittingNextButton={isSubmitting1}
      isSubmittingButton={isSubmitting2}>
      <div className="step">
        {currentStep == 1 ? (
          <div>
            {/* <div className="flex items-center mb-6">
              <Avatar size="large" className="mr-4" />
              <Button white label="Upload Photo" />
            </div> */}
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
                    // onChange={formik.handleChange}
                    onChange={(e) => {
                      if (existingContactEmail !== e.target.value) {
                        setExistingContactEmailError('');
                      }
                      formik.setFieldValue('email', e.target.value);
                    }}
                    value={formik.values.email}
                    error={(errors.email && touched.email) || existingContactEmailError}
                    errorText={
                      errors.email ? errors.email : existingContactEmailError ? existingContactEmailError : null
                    }
                  />

                  <Input
                    type="phone_number"
                    label="Phone"
                    id="phone_number"
                    onChange={(val) => formik.setFieldValue('phone_number', val)}
                    value={formik.values.phone_number}
                    placeholder="ex: (555) 555-5555"
                    error={errors.phone_number && touched.phone_number}
                    errorText={errors.phone_number}
                  />

                  <Dropdown
                    className="col-span-2"
                    white
                    label="Lead Source"
                    activeIcon={false}
                    options={leadSourceOptions}
                    handleSelect={(source) => (formik.values.lead_source = source.name)}
                    initialSelect={formik.values.lead_source}
                    placeHolder={formik.values.lead_source ? formik.values.lead_source : 'Choose'}
                  />
                  <TagsInput
                    typeOfContact={openedTab}
                    label="Priority"
                    onChange={(choice) => {
                      formik.setFieldValue(
                        'tags',
                        choice.map((el) => el.label),
                      );
                    }}
                  />
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
              selectedOption={formikStep2.values.selectedContactType}
              setSelectedOption={(e) => setFieldValue2('selectedContactType', e)}
              className="mb-6"
              error={errors2.selectedContactType && touched2.selectedContactType}
              errorText={errors2.selectedContactType}
            />
            {formikStep2.values.selectedContactType == 8 ? (
              <>
                <div className="text-gray7 mb-3 text-sm font-medium">What kind of vendor?</div>
                <div className="flex flex-wrap">
                  {vendorTypes.map((type) => (
                    <Chip
                      selectedStatus={type.id == formikStep2.values.selectedContactSubtype}
                      key={type.id}
                      label={type.name}
                      className="mr-3 mb-3"
                      onClick={() => setFieldValue2('selectedContactSubtype', type.id)}
                    />
                  ))}
                </div>
                {errors2.selectedContactSubtype &&
                  touched2.selectedContactSubtype &&
                  errors2.selectedContactSubtype && (
                    <NotificationAlert className="mt-2 p-2" type={'error'}>
                      {errors2.selectedContactSubtype}
                    </NotificationAlert>
                  )}
              </>
            ) : (
              ![8, 12, 15].includes(formikStep2.values.selectedContactType) &&
              formikStep2.values.selectedContactType && (
                <StatusSelect
                  selectedStatus={formikStep2.values.selectedStatus}
                  setSelectedStatus={(e) => setFieldValue2('selectedStatus', e)}
                  label="In what stage of communication?"
                  statuses={statuses}
                  error={errors2.selectedStatus && touched2.selectedStatus}
                  errorText={errors2.selectedStatus}
                />
              )
            )}
          </div>
        )}
      </div>
    </MultiStepOverlay>
  );
};

export default AddClientManuallyOverlay;
