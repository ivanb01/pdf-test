import Button from 'components/shared/button';
import Avatar from 'components/shared/avatar';
import Radio from 'components/shared/radio';
import { useEffect, useState } from 'react';
import StatusSelect from 'components/status-select';
import MultiStepOverlay from 'components/shared/form/multistep-form';
import { useFormik } from 'formik';
import Input from 'components/shared/input';
import { useDispatch } from 'react-redux';
import { setOpenedTab, setOpenedSubtab } from 'store/global/slice';
// import * as contactServices from 'api/contacts';
import { addContact, getContacts, findContactByEmail } from 'api/contacts';
import { addContactLocally, setContacts } from 'store/contacts/slice';
import { findTagsOption, formatPhoneNumber } from 'global/functions';
import Dropdown from 'components/shared/dropdown';
import { leadSourceOptions, multiselectOptionsClients, phoneNumberRules } from 'global/variables';
import * as Yup from 'yup';
import DropdownWithSearch from '@components/dropdownWithSearch';
import { useSelector } from 'react-redux';
import Chip from 'components/shared/chip';
import NotificationAlert from 'components/shared/alert/notification-alert';
import { types } from 'global/variables';
import { setRefetchData } from 'store/global/slice';
import TextArea from '@components/shared/textarea';
import SimpleBar from 'simplebar-react';

const categoryIds = {
  'Add Client': JSON.stringify(types[0].types.map((type) => type.id)),
  'Add Professional': JSON.stringify(types[1].types.map((type) => type.id)),
};

const globalTabs = {
  'Add Client': 0,
  'Add Professional': 1,
};

const AddClientManuallyOverlay = ({ handleClose, title, options, statuses }) => {
  const vendorSubtypes = useSelector((state) => state.global.vendorSubtypes);

  const steps = [
    {
      id: 1,
      name: 'General Information',
      href: '#',
      status: 'current',
    },
    { id: 2, name: title == 'Add Client' ? 'Type and Status' : 'Type and Subtype', href: '#' },
  ];

  const [vendorSubtypesFormatted, setVendorSubtypesFormatted] = useState();
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [existingContactEmailError, setExistingContactEmailError] = useState('');
  const [existingContactEmail, setExistingContactEmail] = useState('');

  const [currentStep, setCurrentStep] = useState(1);

  const openedTab = useSelector((state) => state.global.openedTab);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
      summary: null,
      lead_source: '',
      import_source: 'Manually Added',
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
      addClient();
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
    // if (!existingContactEmailError && emailValidated) setCurrentStep(currentStep + 1);
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

      addContact(contactToAdd);

      let subtabValue = 0;
      subtabs.forEach((subtab, index) => {
        console.log(subtab, index, formikStep2.values.selectedStatus);
        if (subtab.includes(formikStep2.values.selectedStatus)) {
          subtabValue = index;
        }
      });
      // dispatch(addContactLocally(contactToAdd));
      dispatch(setRefetchData(true));
      dispatch(setOpenedTab(globalTabs[title]));
      dispatch(setOpenedSubtab(subtabValue));
      setTimeout(() => {
        handleClose();
      }, 1500);
    } catch (error) {
      console.log(error);
      handleClose();
    }
  };

  useEffect(() => {
    // if (formik.dirty || !isUnapprovedAI) {
    let isClient = title == 'Add Client' ? true : false;
    const { selectedContactType, selectedContactSubtype, selectedStatus } = formikStep2.values;
    if (isClient && selectedContactType && selectedStatus) {
      //if client
      setSubmitDisabled(false);
    } else if (!isClient && selectedContactType) {
      //if professional
      if (selectedContactType == 8) {
        if (selectedContactSubtype) {
          setSubmitDisabled(false);
        } else {
          setSubmitDisabled(true);
        }
      } else {
        setSubmitDisabled(false);
      }
    } else {
      setSubmitDisabled(true);
    }
    // } else {
    //   setSubmitDisabled(true);
    // }
  }, [formikStep2.values]);

  useEffect(() => {
    setVendorSubtypesFormatted(
      vendorSubtypes?.map((item) => ({
        value: item.id,
        label: item.name,
      })),
    );
  }, [vendorSubtypes]);

  return (
    <MultiStepOverlay
      className="max-w-[730px] min-w-[730px]"
      handleClose={handleClose}
      steps={steps}
      currentStep={currentStep}
      nextStep={nextStep}
      prevStep={prevStep}
      disabled={submitDisabled}
      // changeStep={(arg) => setCurrentStep(arg)}
      title={title}
      submit={submitForm2}
      isSubmittingNextButton={isSubmitting1}
      isSubmittingButton={isSubmitting2}>
      <div className="step">
        {currentStep == 1 ? (
          <SimpleBar
            style={{ maxHeight: '360px', height: '100%', padding: '24px', paddingTop: 0, paddingBottom: 0 }}
            autoHide={true}>
            <div>
              {/* <div className="flex items-center mb-6">
              <Avatar size="large" className="mr-4" />
              <Button white label="Upload Photo" />
            </div> */}
              <div>
                <form onSubmit={formik.handleSubmit}>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <Input
                      type="text"
                      required
                      label="First Name"
                      id="first_name"
                      onChange={formik.handleChange}
                      value={formik.values.first_name}
                      error={errors.first_name && touched.first_name}
                      errorText={errors.first_name}
                    />
                    <Input
                      required
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
                      required
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
                    <TextArea
                      className="min-h-[100px] z-10  focus:ring-1 focus:ring-blue1 focus:border-blue1"
                      id="summary"
                      label="Summary"
                      name={'summary'}
                      handleChange={formik.handleChange}
                      value={formik.values.summary}
                    />
                    <div className={'grid grid-cols-2 gap-4 col-span-full'}>
                      <div>
                        <Dropdown
                          openClassName={'mb-2 h-[245px]'}
                          className="col-span-2 mb-5"
                          white
                          label="Lead Source"
                          activeIcon={false}
                          options={leadSourceOptions}
                          handleSelect={(source) =>
                            formik.setValues({ ...formik.values, ['lead_source']: source.label })
                          }
                          initialSelect={formik.values.lead_source}
                          placeHolder={formik.values.lead_source ? formik.values.lead_source : 'Choose'}
                        />
                      </div>
                      <div className={`${!isMenuOpen ? 'mb-0' : 'mb-[120px]'}`}>
                        <DropdownWithSearch
                          onMenuOpen={() => setIsMenuOpen(true)}
                          isMulti
                          onMenuClose={() => setIsMenuOpen(false)}
                          options={multiselectOptionsClients}
                          value={findTagsOption(formik.values.tags)}
                          onChange={(choice) => {
                            formik.setFieldValue(
                              'tags',
                              choice.map((el) => el.label),
                            );
                          }}
                          label="Priority"
                        />
                      </div>
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
          </SimpleBar>
        ) : (
          <div className={'p-6 pt-0'}>
            <Radio
              required
              options={options}
              className="mb-4"
              label="What kind of contact is this for you?"
              selectedOption={formikStep2.values.selectedContactType}
              setSelectedOption={(e) => setFieldValue2('selectedContactType', e)}
              error={errors2.selectedContactType && touched2.selectedContactType}
              errorText={errors2.selectedContactType}
            />
            {formikStep2.values.selectedContactType == 8 ? (
              <>
                <DropdownWithSearch
                  value={vendorSubtypesFormatted?.find(
                    (vendor) => vendor.value == formikStep2.values.selectedContactSubtype,
                  )}
                  options={vendorSubtypesFormatted}
                  typeOfContact={openedTab}
                  required
                  label="What kind of vendor is this for you?"
                  onChange={(type) => {
                    formikStep2.setFieldValue('selectedContactSubtype', type.value);
                  }}
                  maxMenuHeight={230}
                />
                {errors2.selectedContactSubtype &&
                  touched2.selectedContactSubtype &&
                  errors2.selectedContactSubtype && (
                    <NotificationAlert className="mt-2 p-2" type={'error'}>
                      {errors2.selectedContactSubtype}
                    </NotificationAlert>
                  )}
              </>
            ) : (
              ![8, 9, 12, 15].includes(formikStep2.values.selectedContactType) &&
              formikStep2.values.selectedContactType && (
                <div className={'mt-2'}>
                  <StatusSelect
                    selectedStatus={formikStep2.values.selectedStatus}
                    setSelectedStatus={(e) => setFieldValue2('selectedStatus', e)}
                    required
                    label="In what stage of communication?"
                    statuses={statuses}
                    error={errors2.selectedStatus && touched2.selectedStatus}
                    errorText={errors2.selectedStatus}
                  />
                </div>
              )
            )}
          </div>
        )}
      </div>
    </MultiStepOverlay>
  );
};

export default AddClientManuallyOverlay;
