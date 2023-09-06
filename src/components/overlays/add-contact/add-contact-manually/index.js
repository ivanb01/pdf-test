import Text from 'components/shared/text';
import Button from 'components/shared/button';
import ContactCategoryCard from 'components/contact/contact-category-card';
import Avatar from 'components/shared/avatar';
import Radio from 'components/shared/radio';
import { useEffect, useState } from 'react';
import StatusSelect from 'components/status-select';
import MultiStepOverlay from 'components/shared/form/multistep-form';
import { UserGroupIcon } from '@heroicons/react/outline';
import { IdentificationIcon } from '@heroicons/react/solid';
import { useFormik } from 'formik';
import Input from 'components/shared/input';
import Dropdown from 'components/shared/dropdown';
import TagsInput from 'components/tagsInput';
// import * as contactServices from 'api/contacts';
import { addContact, getContacts, findContactByEmail } from 'api/contacts';
import { useSelector, useDispatch } from 'react-redux';
import { setOpenedTab, setOpenedSubtab } from 'store/global/slice';
import { setContacts } from 'store/contacts/slice';
import {
  leadSourceOptions,
  phoneNumberRules,
  clientStatuses,
  clientOptions,
  professionalsStatuses,
  professionalsOptions,
} from 'global/variables';
import * as Yup from 'yup';
import { useRouter } from 'next/router';

const categoryIds = {
  0: '4,5,6,7',
  1: '8,9,12',
};

const AddContactManuallyOverlay = ({ handleClose, title }) => {
  const router = useRouter();

  const steps = [
    { id: 1, name: 'Contact Group', href: '#' },
    {
      id: 2,
      name: 'General Information',
      href: '#',
      status: 'current',
    },
    { id: 3, name: 'Type and Status', href: '#' },
  ];

  const [cards, setCards] = useState([
    {
      id: 0,
      name: 'Client',
      description: 'Clients are renters, buyers, landlords or tenants that you can close a deal with and earn income.',
      icon: <UserGroupIcon height={25} className="text-lightBlue3" />,
    },
    {
      id: 1,
      name: 'Professional',
      description:
        'Professionals are people who help you close transactions like agents, lawyers, movers, title companies, photographers etc.',
      icon: <IdentificationIcon height={25} className="text-lightBlue3" />,
    },
  ]);

  const [existingContactEmailError, setExistingContactEmailError] = useState('');
  const [existingContactEmail, setExistingContactEmail] = useState('');

  const [selectedContact, setSelectedContact] = useState(0);

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
    selectedStatus: Yup.string().required('Contact status is required'),
  });

  //* FORMIK-STEP-2 *//
  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      import_source: 'Manually Added',
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

  //* FORMIK-STEP-3 *//
  const formik2 = useFormik({
    initialValues: {
      selectedContactType: '',
      selectedStatus: '',
    },
    validationSchema: AddContactSchema2,
    onSubmit: async (values, { setSubmitting }) => {
      await addContact();
      setSubmitting(false);
    },
  });
  const {
    errors: errors2,
    touched: touched2,
    submitForm: submitForm2,
    setFieldValue: setFieldValue2,
    isSubmitting: isSubmitting2,
  } = formik2;

  const nextStep = () => {
    if (currentStep === 2) {
      submitForm1();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const addContact = async () => {
    let subtabs = [[2, 3, 4, 5, 7, 16], [9, 10], [8], [11]];

    try {
      const contactToAdd = {
        ...formik.values,
        category_id: formik2.values.selectedContactType,
        status_id: formik2.values.selectedStatus,
      };

      console.log('contact to add: ', contactToAdd);

      const res = await addContact(contactToAdd);
      const { data } = await getContacts(categoryIds[selectedContact]);

      let subtabValue = 0;
      subtabs.forEach((subtab, index) => {
        console.log(subtab, index, formik2.values.selectedStatus);
        if (subtab.includes(formik2.values.selectedStatus)) {
          subtabValue = index;
        }
      });

      dispatch(setContacts(data));
      dispatch(setOpenedTab(selectedContact));
      dispatch(setOpenedSubtab(subtabValue));
      router.push({
        pathname: `/contacts/${selectedContact === 0 ? 'clients' : 'professionals'}`,
      });
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
            <Text h4 className="text-gray7 text-center mb-6">
              Please choose what is the contact you are adding?
            </Text>
            <div className="flex flex-col items-center justify-center">
              {cards.map((card) => (
                <ContactCategoryCard
                  key={card.id}
                  id={card.id}
                  name={card.name}
                  description={card.description}
                  icon={card.icon}
                  setSelectedCard={setSelectedContact}
                  selectedCard={selectedContact}
                />
              ))}
            </div>
          </div>
        ) : currentStep == 2 ? (
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
                    placeHolder={'Choose'}
                  />
                  <TagsInput
                    typeOfContact={selectedContact}
                    label="Priority"
                    onChange={(choice) => {
                      formik.setFieldValue(
                        'tags',
                        choice.map((el) => el.label),
                      );
                    }}
                  />
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div>
            <Radio
              options={selectedContact === 0 ? clientOptions : professionalsOptions}
              label="What kind of contact is this for you?"
              selectedOption={formik2.values.selectedContactType}
              setSelectedOption={(e) => setFieldValue2('selectedContactType', e)}
              className="mb-6"
              error={errors2.selectedContactType && touched2.selectedContactType}
              errorText={errors2.selectedContactType}
            />
            <StatusSelect
              selectedStatus={formik2.values.selectedStatus}
              setSelectedStatus={(e) => setFieldValue2('selectedStatus', e)}
              label="In what stage of communication?"
              statuses={selectedContact === 0 ? clientStatuses : professionalsStatuses}
              error={errors2.selectedStatus && touched2.selectedStatus}
              errorText={errors2.selectedStatus}
            />
          </div>
        )}
      </div>
    </MultiStepOverlay>
  );
};

export default AddContactManuallyOverlay;
