import React, { useState, useEffect, useCallback } from 'react';
import Input, { RadioButton } from '@components/shared/input';
import Dropdown from '@components/shared/dropdown';
import { DOCUMENT_PLACEHOLDERS } from '../utils/constants';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useFormik, FormikProvider, Field, getIn } from 'formik';
import * as Yup from 'yup';
import AddDocument from '../AddDocumentOverlay';
import InputDropdown from './InputDropdown';
import Image from 'next/image';
import Button from '@components/shared/button';
import { USA_STATES } from '../utils/constants';
import moment from 'moment';
import { usePostPropertyApplication } from 'containers/Applications/queries/mutations';
import FileInput from './FileInput';
import OccupantsList from './OccupantsLlist';
import ApplicationSentSuccess from '/public/animations/application-sent-success.gif';
import clsx from 'clsx';
import CircularProgress from '@mui/material/CircularProgress';
import ApplyFormErrorImage from '/public/icons/apply-form-error.svg';
import { useRouter } from 'next/router';
import DropdownWithSearch from '@components/dropdownWithSearch';
import uuid from 'react-uuid';
import AgreementOverlay from '../AgreementOverlay';
import { useSendEmail } from '@helpers/queries/mutations';
import ApplicationSubmitBody from '../EmailTemplates/ApplicationSubmit';
import { render as renderEmail } from '@react-email/components';
import { useStripe, useElements, Elements, PaymentElement, AddressElement } from '@stripe/react-stripe-js';
import toast from 'react-hot-toast';
import useStripePayment from '../utils/hooks/useStripePayment';
const documentType = {
  bank_statement_1: 'BANK STATEMENT 1',
  bank_statement_2: 'BANK STATEMENT 2',
  employment_letter: 'EMPLOYMENT_LETTER',
  paystub_1: 'PAYSTUB_1',
  paystub_2: 'PAYSTUB_2',
  photo_id_copy: 'PHOTO_ID_COPY',
  tax_returns: 'TAX_RETURNS_1',
  tax_returns_2: 'TAX_RETURNS_2',
  w2: 'W2',
  other_documents: 'OTHER',
};

const TEST_FORM_VALUES = {
  agent_name: 'Ivan',
  property_id: '1b9ce199',
  contractor_id: 1,
  contractor_name: 'Contractor Tester',
  contractor_email: 'contractor@tester.com',
  apartment_number: '5a',
  property_address: 'Property Address',
  property_unit_number: 'Property Unit Number',
  property_city: 'Property City',
  property_state: 'ALASKA',
  // property_state: { id: 3, label: "Alaska", value: "alaska" },
  property_zip_code: 'Property Zip Code',
  monthly_rent: 1000.0,
  lease_start_date: '2024-02-17',
  lease_end_date: '2024-02-17',
  landlord: 'Landlord',
  landlord_address: 'Landlord Address',
  landlord_phone_number: '3768748763893',
  client_first_name: 'John',
  client_last_name: 'Doe',
  client_email: 'ivanbralic95@gmail.com',
  client_birth_date: '1980-01-01',
  client_phone_number: '348767846876783',
  client_permanent_address: 'Perm 123',
  client_unit_number: 'Unit 123',
  client_city: 'Client City',
  client_state: 'ALASKA',
  client_zip_code: '387478',
  client_ssn: '37848745836892798',
  client_has_pets: false,
  client_pets_description: '',
  client_is_guarantor: false,
  client_is_interested_in_guarantor: false,
  client_additional_comment: '',
  client_signature: null,
  employer: 'Employer',
  employer_address: 'Employer Address',
  contact_person: 'Contact Person',
  contact_person_number: '478487469837938',
  position_title: 'Work',
  annual_compensation: 1000000.0,
  employment_length: '',
  employed_since_date: '2024-02-17',
  previous_employer: null,
  previous_employer_address: null,
  previous_employer_contact_person: null,
  previous_employer_position_title: null,
  previous_employer_annual_compensation: 0.0,
  previous_employer_employment_length: '',
  previous_employer_employed_since_date: null,
  credit_report_status: 'CHECKED',
  bank_name: null,
  account_type: null,
  account_number: null,
  accountant: null,
  accountant_phone_number: null,
  emergency_contact_name: 'Emergency Contact',
  emergency_contact_phone_number: '7486486487647',
  need_moving_services: false,
  move_in_date: null,
  occupants: [
    {
      full_name: 'John Doe',
      email: 'john@doe.com',
    },
  ],
  documents: [
    {
      document_type: 'EMPLOYMENT_LETTER',
      name: 'Fitbit',
      name_with_format: 'fitbit.jpg',
      url: 'featured_properties/fitbit.jpg',
      file_size: null,
    },
    {
      document_type: 'OTHER',
      name: 'Fitbit',
      name_with_format: 'fitbit.jpg',
      url: 'featured_properties/fitbit.jpg',
      file_size: null,
    },
    {
      document_type: 'PAYSTUB_1',
      name: 'Fitbit',
      name_with_format: 'fitbit.jpg',
      url: 'featured_properties/fitbit.jpg',
      file_size: null,
    },
    {
      document_type: 'PAYSTUB_2',
      name: 'Fitbit',
      name_with_format: 'fitbit.jpg',
      url: 'featured_properties/fitbit.jpg',
      file_size: null,
    },
    {
      document_type: 'PHOTO_ID_COPY',
      name: 'Fitbit',
      name_with_format: 'fitbit.jpg',
      url: 'featured_properties/fitbit.jpg',
      file_size: null,
    },
    {
      document_type: 'TAX_RETURNS_1',
      name: 'Fitbit',
      name_with_format: 'fitbit.jpg',
      url: 'featured_properties/fitbit.jpg',
      file_size: null,
    },
    {
      document_type: 'TAX_RETURNS_2',
      name: 'Fitbit',
      name_with_format: 'fitbit.jpg',
      url: 'featured_properties/fitbit.jpg',
      file_size: null,
    },
    {
      document_type: 'W2',
      name: 'Fitbit',
      name_with_format: 'fitbit.jpg',
      url: 'featured_properties/fitbit.jpg',
      file_size: null,
    },
  ],
};
const ApplyForm = () => {
  const router = useRouter();
  const [isAddDocumentOverlayOpened, setAddDocumentOverlayOpened] = useState(false);

  const [propertySelected, setPropertySelected] = useState(null);
  const [propertySelectedImageUrl, setPropertySelectedImageUrl] = useState(null);
  const [agreementSelected, setAgreementSelected] = useState(false);
  const [isAgreementModalOpen, setAgreementModalOpen] = useState(false);

  const validationSchema = Yup.object({
    agent_name: Yup.string().required('Agent name is a required field!'),
    property_address: Yup.string().required('Property address is a required field!'),
    property_id: Yup.string().required('Property ID is a required field!'),
    pets: Yup.string(),
    petType: Yup.string(),
    otherOccupant: Yup.string(),
    lease_start_date: Yup.string().required('Lease start date is a required field!'),
    lease_end_date: Yup.string().required('Lease end date is a required field!'),
    client_first_name: Yup.string().required('First name is a required field!'),
    client_last_name: Yup.string().required('Last name is a required field!'),
    client_email: Yup.string().email().required('Email address is a required field!'),
    client_birth_date: Yup.date().required('Date of birth is a required field!'),
    client_phone_number: Yup.string().required('Phone number is a required field!'),
    client_permanent_address: Yup.string().required('Permanent address is a required field!'),
    client_state: Yup.string().required('State is a required field!'),
    client_city: Yup.string().required('City is a required field!'),
    client_unit_number: Yup.string().required('Unit numbers is a required field!'),
    client_zip_code: Yup.string().required('Zip is a required field!'),
    client_ssn: Yup.string().required('Social securty number is a required field!'),
    client_has_pets: Yup.bool(),
    client_pets_description: Yup.string().when('client_has_pets', {
      is: true,
      then: Yup.string().required('Please specify pet.'),
    }),
    client_additional_comment: Yup.string(),
    existing_occupant: Yup.bool(),
    landlord: Yup.string().required('Current landlord name is a required field!'),
    landlord_phone_number: Yup.string().required('Current landlord phone number is a required field!'),

    monthly_rent: Yup.string().required('Monthly rent is a required field!'),
    occupants: Yup.array().of(
      Yup.object().shape({
        id: Yup.string(),
        full_name: Yup.string().required('Occupant name is a required field!'),
        email: Yup.string().required('Email is a required field!'),
        phone_number: Yup.string().required('Phone number is a required field!'),
        relationship_description: Yup.string().required('Relationship is a required field!'),
      }),
    ),

    // property_state: Yup.string().required('State is a required field!'),
    // property_state: Yup.object().shape({
    //   id: Yup.string().required("State is a required field!"),
    //   label: Yup.string().required("State is a required field!"),
    //   value: Yup.string().required("State is a required field!"),
    // }),
    property_state: Yup.string().required('State is a required field!'),

    property_city: Yup.string().required('City is a required field!'),
    property_unit_number: Yup.string().required('Unit numbers is a required field!'),
    property_zip_code: Yup.string().required('Zip is a required field!'),

    current_state: Yup.string().required('State is a required field!'),
    current_city: Yup.string().required('City is a required field!'),
    current_unit_number: Yup.string().required('Unit numbers is a required field!'),
    current_zip_code: Yup.string().required('Zip is a required field!'),
    current_addess: Yup.string().required('Current address is a required field!'),

    employer: Yup.string().required('Employer is a required field!'),
    employer_address: Yup.string().required('Employer Address is a required field!'),
    contact_person: Yup.string().required('Contact person is a required field!'),
    contact_person_number: Yup.string().required('Contact person number is a required field!'),

    position_title: Yup.string().required('Position title is a required field!'),
    annual_compensation: Yup.string().required('Annual compensation is a required field!'),
    employment_length: Yup.string().required('Employment length is a required field!'),
    employed_since_date: Yup.string().required('Employment date is a required field!'),
    employed_since_month: Yup.number().integer().min(1).max(12),
    employed_since_year: Yup.number().integer(),

    emergency_contact_name: Yup.string().required('Emergency contact is a required field!'),
    emergency_contact_phone_number: Yup.string().required('Emergency contact phone number is a required field!'),

    need_moving_services: Yup.bool(),
    move_in_date: Yup.string()
      .when('need_moving_services', {
        is: true,
        then: Yup.string().required('Moving service date is required!'),
      })
      .nullable(true),

    client_signature: Yup.object()
      .shape({
        untrimmedCanvas: Yup.string().required('Signature is required!'),
        imageData: Yup.string().required(),
        width: Yup.number().required(),
        height: Yup.number().required(),
      })
      .typeError('Signature is required!'),
  });

  const { mutate: mutateSendEmail } = useSendEmail();

  const onPaymentError = (error) => {
    toast.error(error.message);
  };
  const { elements, loading, statusMessage, errorMessage, handleSubmitPayment, paymentStatus, isErrorOnPayment } =
    useStripePayment({
      onError: onPaymentError,
    });

  const onSubmitSuccess = async (data, variables) => {
    console.log('variables', variables);
    if (variables.do_credit_check) {
      await handleSubmitPayment(data.data);
    } else {
      const emailBody = {
        to: [variables.client_email],
        subject: 'Opgny Property Application',
        body: renderEmail(
          <ApplicationSubmitBody email={variables.client_email} first_name={variables.client_first_name} />,
          {
            pretty: true,
          },
        ),
      };

      mutateSendEmail(emailBody);
    }
  };

  const {
    mutate: mutatePostApplication,
    isPending: isPendingPostApplication,
    isSuccess: isSuccessPostApplication,
    isError: isErrorPostApplication,
    reset: resetMutation,
  } = usePostPropertyApplication({
    onSuccess: onSubmitSuccess,
  });

  const formik = useFormik({
    initialValues: {
      accountant: '',
      accountant_contact: '',
      account_number: '',
      account_type: '',
      agent_id: 2234,
      agent_email: 'agent@agent.com',
      agent_name: '',
      annual_compensation: '',
      apartment_number: '',
      bank_name: '',
      client_additional_comment: '',
      client_birth_date: '',
      client_city: '',
      client_email: '',
      client_first_name: '',
      client_has_pets: false,
      client_last_name: '',
      client_phone_number: '',
      client_permanent_address: '',
      client_ssn: '',
      client_state: '',
      client_pets_description: '',
      client_signature: '',
      client_unit_number: '',
      client_zip_code: '',
      client_is_guarantor: false,
      client_is_interested_in_guarantor: false,
      credit_report_status: 'CHECKED',
      contact_person: '',
      contact_person_number: '',
      contractor_id: 1,
      contractor_name: 'Contractor Tester',
      contractor_email: 'contractor@tester.com',
      current_addess: '',
      current_city: '',
      current_state: '',
      current_unit_number: '',
      current_zip_code: '',
      documents: {
        employment_letter: null,
        paystub_1: null,
        paystub_2: null,
        tax_returns: null,
        tax_returns_2: null,
        bank_statement_1: null,
        bank_statement_2: null,
        photo_id_copy: null,
        w2: null,
        other_documents: null,
      },
      emergency_contact_name: '',
      emergency_contact_phone_number: '',
      employer: '',
      employer_address: '',
      employment_length: '',
      employed_since_date: '',
      employed_since_month: 0,
      employed_since_year: 0,
      existing_occupant: false,
      do_credit_check: true,
      landlord: '',
      landlord_address: '',
      landlord_phone_number: '',
      monthly_rent: '',
      lease_start_date: '',
      lease_end_date: '',
      move_in_date: moment().format('YYYY-MM-DD'),
      need_moving_services: false,
      occupants: [],
      position_title: '',
      previous_employer: '',
      previous_employer_address: '',
      previous_contact_person: '',
      previous_position_title: '',
      previous_annual_compensation: 0.0,
      previous_employment_length: '',
      previous_employer_contact_number: '',
      previous_employed_since_month: 1,
      previous_employed_since_year: 0,
      previous_employer_employed_since_date: null,
      property_address: '',
      property_city: '',
      property_id: '0',
      property_state: {
        id: '',
        label: '',
        value: '',
      },
      property_unit_number: '',
      property_zip_code: '',
      signature: null,
    },
    validationSchema: validationSchema,
    onReset: async (values, formikBag) => {
      setPropertySelected(null);
      setPropertySelectedImageUrl(null);
      setTimeout(() => formikBag.setFieldValue('occupants', []));
      setTimeout(() => formikBag.setFieldValue('client_state', ''));
    },

    onSubmit: async (values) => {
      if (values.do_credit_check) {
        try {
          const response = await elements.submit();
          if (Object.keys(response).length) return;
        } catch (error) {
          return;
        }
      }

      const filteredOtherDocuments = filterOtherDocuments(formik.values.documents.other_documents);
      let documents = formik.values.documents;

      documents = Object.entries(documents)
        .map(([key, value]) => {
          if (key !== 'other_documents' && !!value)
            return { ...documents[key], document_type: documentType[key], form_name: key };
        })
        .filter((document) => !!document);

      documents = [...documents, ...filteredOtherDocuments];

      const filteredValues = {
        ...values,
        // property_state: formik.values.property_state.value,
        documents,
        signature: null,
        annual_compensation: parseFloat(values.annual_compensation),
      };

      mutatePostApplication(filteredValues);
    },
  });

  console.log(formik.values);
  console.log(formik.errors);

  const filterOtherDocuments = (otherDocuments) => {
    if (!(otherDocuments && typeof otherDocuments === 'object' && !!Object.keys(otherDocuments).length)) return [];

    return Object.values(otherDocuments).map((value) => ({ ...value, document_type: 'OTHER' }));
  };

  useEffect(() => {
    if (!formik.values.employed_since_date) return;

    formik.setFieldValue('employment_length', setEmploymentLength(formik.values.employed_since_date));
  }, [formik.values.employed_since_date]);

  useEffect(() => {
    if (!formik.values.previous_employer_employed_since_date) return;

    formik.setFieldValue(
      'previous_employment_length',
      setEmploymentLength(formik.values.previous_employer_employed_since_date),
    );
  }, [formik.values.previous_employer_employed_since_date]);

  const setEmploymentLength = (date) => {
    const year = date.slice(0, 4);
    const month = date.slice(5, 7);
    formik.setFieldValue('employed_since_month', parseInt(month));
    formik.setFieldValue('employed_since_year', parseInt(year));
    const employmentLengthDays = moment().diff(date, 'days');
    const employmentLengthMonths = moment().diff(date, 'months');
    const employmentLengthYears = moment().diff(date, 'years');
    let employmentLength = '';
    if (employmentLengthYears < 0 || employmentLengthMonths < 0 || employmentLengthDays < 0) {
      employmentLength = '0';
      formik.setFieldValue('employment_length', employmentLength);
      return;
    }
    if (employmentLengthYears) {
      employmentLength = `${employmentLengthYears} year${employmentLengthYears !== 1 ? 's' : ''}`;
    } else if (employmentLengthMonths) {
      employmentLength = `${employmentLengthMonths} month${employmentLengthMonths !== 1 ? 's' : ''}`;
    } else if (employmentLengthDays) {
      employmentLength = `${employmentLengthDays} day${employmentLengthDays !== 1 ? 's' : ''}`;
    }

    return employmentLength;
  };

  const onListItemCLick = async (listing) => {
    setPropertySelected(listing);
    const image = listing.PHOTOS.find((photo) => photo.PHOTO_URL.includes('https://rls.realty.mx'));
    if (image) setPropertySelectedImageUrl(image.PHOTO_URL);
    else setPropertySelectedImageUrl(null);

    await formik.setFieldValue('property_address', listing.ADDRESS);
    await formik.setFieldValue('property_id', listing.ID.toString());
    await formik.setFieldValue('monthly_rent', listing.PRICE);

    listing?.CITY && (await formik.setFieldValue('property_city', listing.CITY));
    // listing?.STATE &&
    //   (await formik.setFieldValue("property_state", {
    //     id: uuid(),
    //     label: listing.STATE,
    //     value: listing.STATE,
    //   }));
    listing?.STATE && (await formik.setFieldValue('property_state', listing.STATE));
    listing?.UNIT_NUMBER && (await formik.setFieldValue('property_unit_number', listing.UNIT_NUMBER));
    listing?.ZIP_CODE && (await formik.setFieldValue('property_zip_code', listing.ZIP_CODE));
  };

  const onListingRemove = () => {
    setPropertySelected(null);
    setPropertySelectedImageUrl(null);
    formik.setFieldValue('property_address', '');
    formik.setFieldValue('property_id', '');
    formik.setFieldValue('monthly_rent', '');
  };

  const resetApplication = () => {
    resetMutation();
    formik.resetForm(formik.initialValues);
  };

  const resetAfterSuccess = () => {
    // setTimeout(() => {
    //   resetApplication();
    // }, 8000);
  };

  useEffect(() => {
    if (isSuccessPostApplication) resetAfterSuccess();
  }, [isSuccessPostApplication]);

  if (isErrorPostApplication) {
    return (
      <div className="w-full h-full p-[50px] text-center text-[24px] font-medium leading-[32px] text-gray6">
        <div className="py-[233px] flex flex-col justify-center items-center">
          <Image src={ApplyFormErrorImage} />
          <p className="text-lg	text-gray7 leading-6 font-medium mb-3">Oh no! Something went wrong!</p>
          <p className="text-sm	text-gray5 leading-5 mb-10">
            We’re working on fixing the problem. Please refresh the page and try again.
          </p>
          <Button label={'Refresh'} onClick={router.reload} />
        </div>
      </div>
    );
  }

  if (isSuccessPostApplication) {
    return (
      <div className="w-full h-full flex flex-col  justify-center items-center p-[50px] text-center text-[24px] font-medium leading-[32px] text-gray6">
        <div className="py-[233px] flex flex-col justify-center items-center">
          <Image src={ApplicationSentSuccess} width={250} height={250} className="mb-[60px]" />
          <p>All good!</p>
          <p>Application was submitted successfully!</p>
          <p className="text-base font-medium text-gray4 leading-[24px] mt-[12px]">
            Please check your gmail, we’ve sent you an email confirmation too.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <div className="w-full h-full">
            <div>
              <div className="bg-white ">
                <div className="w-full flex justify-center flex-col divide-y-[1px] ">
                  <div className="w-full sm:w-1/2 pt-[24px] pb-[50px]">
                    <Input
                      label="*Your Agent"
                      placeholder={'Search here'}
                      name="agent_name"
                      value={formik.values.agent_name}
                      onChange={formik.handleChange}
                      error={formik.touched.agent_name && formik.errors.agent_name}
                      errorText={formik.touched.agent_name && formik.errors.agent_name}
                    />
                  </div>
                  <div className="flex flex-col py-[50px] gap-6">
                    <p className="leading-6 font-medium text-base">Client's Information</p>
                    <div className="flex flex-col sm:flex-none sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      <Input
                        label="*Client First Name"
                        className={'col-span-2 [&_input]:h-[38px]'}
                        name="client_first_name"
                        value={formik.values.client_first_name}
                        onChange={formik.handleChange}
                        error={formik.touched.client_first_name && formik.errors.client_first_name}
                        errorText={formik.touched.client_first_name && formik.errors.client_first_name}
                      />
                      <Input
                        label="*Client Last Name"
                        className={'col-span-2 [&_input]:h-[38px]'}
                        name="client_last_name"
                        value={formik.values.client_last_name}
                        onChange={formik.handleChange}
                        error={formik.touched.client_last_name && formik.errors.client_last_name}
                        errorText={formik.touched.client_last_name && formik.errors.client_last_name}
                      />
                      <Input
                        label="*Phone Number"
                        type="phone"
                        className={'[&_input]:h-[38px]'}
                        value={formik.values.client_phone_number}
                        name="client_phone_number"
                        onChange={formik.handleChange}
                        error={formik.touched.client_phone_number && formik.errors.client_phone_number}
                        errorText={formik.touched.client_phone_number && formik.errors.client_phone_number}
                      />
                      <Input
                        name="client_birth_date"
                        onChange={(e) => {
                          formik.setFieldValue('client_birth_date', e.target.value);
                        }}
                        label="*Date of Birth"
                        value={formik.values.client_birth_date}
                        type="date"
                        className={'[&_input]:h-[38px]'}
                        error={formik.touched.client_birth_date && formik.errors.client_birth_date}
                        errorText={formik.touched.client_birth_date && formik.errors.client_birth_date}
                      />
                      <Input
                        name="client_email"
                        onChange={formik.handleChange}
                        label="*Email Address"
                        value={formik.values.client_email}
                        className={'[&_input]:h-[38px]'}
                        error={formik.touched.client_email && formik.errors.client_email}
                        errorText={formik.touched.client_email && formik.errors.client_email}
                      />
                      <Input
                        label="*Social Security Number"
                        className={'[&_input]:h-[38px] '}
                        name="client_ssn"
                        onChange={formik.handleChange}
                        value={formik.values.client_ssn}
                        error={formik.touched.client_ssn && formik.errors.client_ssn}
                        errorText={formik.touched.client_ssn && formik.errors.client_ssn}
                      />
                      <Input
                        label="*Permanent Address"
                        className={'col-span-2 [&_input]:h-[38px]'}
                        name="client_permanent_address"
                        value={formik.values.client_permanent_address}
                        onChange={formik.handleChange}
                        error={formik.touched.client_permanent_address && formik.errors.client_permanent_address}
                        errorText={formik.touched.client_permanent_address && formik.errors.client_permanent_address}
                      />

                      <div className="grid grid-cols-4 col-span-2 gap-[24px]">
                        <Input
                          label="*Unit number"
                          className={'[&_input]:h-[38px]'}
                          name="client_unit_number"
                          value={formik.values.client_unit_number}
                          onChange={formik.handleChange}
                          error={formik.touched.client_unit_number && formik.errors.client_unit_number}
                          errorText={formik.touched.client_unit_number && formik.errors.client_unit_number}
                        />
                        <Dropdown
                          options={USA_STATES?.map((state, index) => {
                            return { id: index, label: state, value: state };
                          })}
                          handleSelect={(value) => {
                            formik.setFieldValue('client_state', value.value);
                          }}
                          initialSelect={''}
                          label={'*State'}
                          className={'[&_input]:h-[38px]'}
                          name="client_state"
                          // value={formik.values.client_state}
                          error={formik.touched.client_state && formik.errors.client_state}
                          errorText={formik.touched.client_state && formik.errors.client_state}
                        />

                        <Input
                          label="*City"
                          className={'[&_input]:h-[38px]'}
                          name="client_city"
                          value={formik.values.client_city}
                          onChange={formik.handleChange}
                          error={formik.touched.client_city && formik.errors.client_city}
                          errorText={formik.touched.client_city && formik.errors.client_city}
                        />
                        <Input
                          label="*Zip"
                          className={'[&_input]:h-[38px]'}
                          name="client_zip_code"
                          onChange={formik.handleChange}
                          value={formik.values.client_zip_code}
                          error={formik.touched.client_zip_code && formik.errors.client_zip_code}
                          errorText={formik.touched.client_zip_code && formik.errors.client_zip_code}
                        />
                      </div>

                      <div className="flex flex-col gap-[4px] col-span-4">
                        <p className="text-gray4 text-sm font-medium leading-5">*Do you have pets?</p>
                        <div className="h-[38px] flex gap-[18px] items-center font-medium leading-4 text-sm">
                          <Field
                            component={RadioButton}
                            name="client_has_pets"
                            id="Yes"
                            label="Yes"
                            onChange={(e) => formik.setFieldValue('client_has_pets', true)}
                            checked={formik.values.client_has_pets ? true : false}
                          />
                          <Field
                            component={RadioButton}
                            name="client_has_pets"
                            id="No"
                            label="No"
                            checked={formik.values.client_has_pets ? false : true}
                            onChange={(e) => formik.setFieldValue('client_has_pets', false)}
                          />
                        </div>
                      </div>
                      <Input
                        label="Please Specify (if pets)"
                        readonly={!formik.values.client_has_pets}
                        className={
                          !formik.values.client_has_pets
                            ? '[&_input]:bg-gray10 focus:[&_input]:border-borderColor focus:[&_input]:ring-0'
                            : ''
                        }
                        value={formik.values.client_pets_description}
                        onChange={formik.handleChange}
                        name="client_pets_description"
                        error={formik.touched.client_pets_description && formik.errors.client_pets_description}
                        errorText={formik.touched.client_pets_description && formik.errors.client_pets_description}
                      />
                    </div>
                  </div>

                  <OccupantsList />
                  <div className="py-[50px]">
                    <p className="leading-6 font-medium text-base">Rental Information</p>

                    <div className="grid grid-cols-4 gap-6 pt-6 ">
                      <div className="col-span-4 w-1/2 pr-[12px]">
                        <InputDropdown onListItemClick={onListItemCLick} />
                      </div>

                      {/* {propertySelected && (
                            <div className="bg-gray10">
                              <div className="p-4 bg-gray10 ">
                                <div className="flex gap-[10px] items-center relative">
                                  {propertySelectedImageUrl && (
                                    <div className="h-[72px] w-[72px] flex justify-center items-center">
                                      <Image
                                        className="rounded object-cover"
                                        src={propertySelectedImageUrl}
                                        alt=""
                                        width={0}
                                        height={0}
                                        sizes="100vw"
                                        style={{ width: 'auto', height: '100%' }}
                                      />
                                    </div>
                                  )}
                                  <div className="flex flex-col font-medium leadin-5 text-sm text-gray7 grow gap-[6px]">
                                    <p>{propertySelected.LISTING_TITLE}</p>
                                    <p className="text-gray4">{propertySelected.NEIGHBORHOODS}</p>
                                    <p>
                                      ${propertySelected.PRICE}
                                      <span className="text-gray4">/mo</span>
                                    </p>
                                  </div>
                                  <div className="absolute right-0 top-0 flex text-blue2 cursor-pointer  gap-2 items-center">
                                    <button
                                      onClick={() => {
                                        onListingRemove();
                                        // setPropertySelected(null);
                                      }}>
                                      <RemoveCircleIcon className="h-4 w-4 text-overlayBackground" />
                                    </button>
                                    <OpenInNewIcon className="w-4 h-4" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          )} */}
                      <Input
                        id="property_address"
                        name="property_address"
                        label="*Property Address"
                        className={'[&_input]:h-[38px] col-span-2'}
                        value={formik.values.property_address}
                        onChange={formik.handleChange}
                        readonly={!!propertySelected}
                        error={
                          formik.touched.property_address &&
                          formik.errors.property_address &&
                          !formik.values.property_address
                        }
                        errorText={formik.touched.property_address && formik.errors.property_address}
                      />

                      <div className="grid grid-cols-4 col-span-2 gap-[24px]">
                        <Input
                          label="*Unit number"
                          className={'[&_input]:h-[38px]'}
                          name="property_unit_number"
                          value={formik.values.property_unit_number}
                          onChange={formik.handleChange}
                          error={formik.touched.property_unit_number && formik.errors.property_unit_number}
                          errorText={formik.touched.property_unit_number && formik.errors.property_unit_number}
                        />
                        <div className="col-span-1">
                          <DropdownWithSearch
                            indicatorStyles={{ display: 'none' }}
                            options={USA_STATES?.map((state, index) => {
                              return { id: index, label: state, value: state };
                            })}
                            label="*State"
                            value={formik.values.property_state}
                            onChange={(value) => {
                              formik.setFieldValue('property_state', value);
                            }}
                            className="col-span-1"
                            placeholder={''}
                            error={formik.touched.property_state?.id && formik.errors.property_state?.id}
                            errorText={formik.touched.property_state?.id && formik.errors.property_state?.id}
                          />
                        </div>

                        <Input
                          label="*City"
                          className={'[&_input]:h-[38px]'}
                          name="property_city"
                          value={formik.values.property_city}
                          onChange={formik.handleChange}
                          error={formik.touched.property_city && formik.errors.property_city}
                          errorText={formik.touched.property_city && formik.errors.property_city}
                        />
                        <Input
                          label="*Zip"
                          className={'[&_input]:h-[38px]'}
                          name="property_zip_code"
                          onChange={formik.handleChange}
                          value={formik.values.property_zip_code}
                          error={formik.touched.property_zip_code && formik.errors.property_zip_code}
                          errorText={formik.touched.property_zip_code && formik.errors.property_zip_code}
                        />
                      </div>
                      <Input
                        label="*Lease Start Date"
                        id={'lease_start_date'}
                        name={'lease_start_date'}
                        type="date"
                        className={'[&_input]:h-[38px] col-span-2'}
                        value={formik.values.lease_start_date}
                        onChange={(e) => {
                          formik.setFieldValue('lease_start_date', e.target.value);
                        }}
                        error={formik.touched.lease_start_date && formik.errors.lease_start_date}
                        errorText={formik.touched.lease_start_date && formik.errors.lease_start_date}
                      />
                      <Input
                        label="*Lease End Date"
                        type="date"
                        className={'[&_input]:h-[38px] col-span-2'}
                        id={'lease_end_date'}
                        name={'lease_end_date'}
                        value={formik.values.lease_end_date}
                        onChange={(e) => {
                          formik.setFieldValue('lease_end_date', e.target.value);
                        }}
                        error={formik.touched.lease_end_date && formik.errors.lease_end_date}
                        errorText={formik.touched.lease_end_date && formik.errors.lease_end_date}
                      />

                      <Input
                        label="*Proposed Monthly Rent"
                        name="monthly_rent"
                        id="monthly_rent"
                        type={'money'}
                        value={formik.values.monthly_rent}
                        className={'[&_input]:h-[38px]'}
                        onChange={(e) => {
                          formik.setFieldValue('monthly_rent', e);
                        }}
                        error={formik.touched.monthly_rent && formik.errors.monthly_rent}
                        errorText={formik.touched.monthly_rent && formik.errors.monthly_rent}
                      />
                      <div className="flex flex-col gap-[4px] col-span-4">
                        <p className="text-gray4 text-sm font-medium leading-5">*Are you a guarantor?</p>
                        <div className="h-[38px] flex gap-[18px] items-center font-medium leading-4 text-sm">
                          <Field
                            component={RadioButton}
                            name="client_is_guarantor"
                            id="Yes"
                            label="Yes"
                            onChange={(e) => formik.setFieldValue('client_is_guarantor', true)}
                            checked={formik.values.client_is_guarantor ? true : false}
                          />
                          <Field
                            component={RadioButton}
                            name="client_is_guarantor"
                            id="No"
                            label="No"
                            checked={formik.values.client_is_guarantor ? false : true}
                            onChange={(e) => formik.setFieldValue('client_is_guarantor', false)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="py-[50px]">
                    <p className="leading-6 font-medium text-base">Rental History</p>

                    <div className="grid grid-cols-4 gap-6 pt-6 ">
                      <Input
                        id="current_addess"
                        name="current_addess"
                        label="*Current Address"
                        className={'[&_input]:h-[38px] col-span-2'}
                        value={formik.values.current_addess}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.current_addess && formik.errors.current_addess && !formik.values.current_addess
                        }
                        errorText={formik.touched.current_addess && formik.errors.current_addess}
                      />
                      <div className="grid grid-cols-4 col-span-2 gap-[24px]">
                        <Input
                          label="*Unit number"
                          className={'[&_input]:h-[38px]'}
                          name="current_unit_number"
                          value={formik.values.current_unit_number}
                          onChange={formik.handleChange}
                          error={formik.touched.current_unit_number && formik.errors.current_unit_number}
                          errorText={formik.touched.current_unit_number && formik.errors.current_unit_number}
                        />
                        <Dropdown
                          options={USA_STATES?.map((state, index) => {
                            return { id: index, label: state, value: state };
                          })}
                          handleSelect={(value) => {
                            formik.setFieldValue('current_state', value.value);
                          }}
                          initialSelect={''}
                          label={'*State'}
                          className={'[&_input]:h-[38px]'}
                          name="current_state"
                          value={formik.values.current_state}
                          error={formik.touched.current_state && formik.errors.current_state}
                          errorText={formik.touched.current_state && formik.errors.current_state}
                        />

                        <Input
                          label="*City"
                          className={'[&_input]:h-[38px]'}
                          name="current_city"
                          value={formik.values.current_city}
                          onChange={formik.handleChange}
                          error={formik.touched.current_city && formik.errors.current_city}
                          errorText={formik.touched.current_city && formik.errors.current_city}
                        />
                        <Input
                          label="*Zip"
                          className={'[&_input]:h-[38px]'}
                          name="current_zip_code"
                          onChange={formik.handleChange}
                          value={formik.values.current_zip_code}
                          error={formik.touched.current_zip_code && formik.errors.current_zip_code}
                          errorText={formik.touched.current_zip_code && formik.errors.current_zip_code}
                        />
                      </div>

                      <Input
                        label="*Current Landlord Name"
                        name="landlord"
                        id="landlord"
                        className={'[&_input]:h-[38px] col-span-2'}
                        value={formik.values.landlord}
                        onChange={formik.handleChange}
                        error={formik.touched.landlord && formik.errors.landlord}
                        errorText={formik.touched.landlord && formik.errors.landlord}
                      />

                      <Input
                        label="*Landlord's phone"
                        name="landlord_phone_number"
                        id="landlord_phone_number"
                        className={'[&_input]:h-[38px] col-span-2'}
                        type="phone"
                        value={formik.values.landlord_phone_number}
                        onChange={formik.handleChange}
                        error={formik.touched.landlord_phone_number && formik.errors.landlord_phone_number}
                        errorText={formik.touched.landlord_phone_number && formik.errors.landlord_phone_number}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col py-[50px] gap-6">
                    <span className="leading-6 font-medium text-base">Employment Information</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
                      <Input
                        label="*Employer"
                        name="employer"
                        onChange={formik.handleChange}
                        value={formik.values.employer}
                        error={formik.touched.employer && formik.errors.employer}
                        errorText={formik.touched.employer && formik.errors.employer}
                      />
                      <Input
                        label="*Employer Address"
                        name="employer_address"
                        onChange={formik.handleChange}
                        value={formik.values.employer_address}
                        error={formik.touched.employer_address && formik.errors.employer_address}
                        errorText={formik.touched.employer_address && formik.errors.employer_address}
                      />
                      <Input
                        label="*Contact Person"
                        name="contact_person"
                        onChange={formik.handleChange}
                        value={formik.values.contact_person}
                        error={formik.touched.contact_person && formik.errors.contact_person}
                        errorText={formik.touched.contact_person && formik.errors.contact_person}
                      />
                      <Input
                        label="*Contact Person Number"
                        type="phone"
                        name="contact_person_number"
                        onChange={formik.handleChange}
                        value={formik.values.contact_person_number}
                        error={formik.touched.contact_person_number && formik.errors.contact_person_number}
                        errorText={formik.touched.contact_person_number && formik.errors.contact_person_number}
                      />
                      <Input
                        label="*Position Title"
                        name="position_title"
                        onChange={formik.handleChange}
                        value={formik.values.position_title}
                        error={formik.touched.position_title && formik.errors.position_title}
                        errorText={formik.touched.position_title && formik.errors.position_title}
                      />
                      <Input
                        label="*Annual Compensation"
                        name="annual_compensation"
                        onChange={formik.handleChange}
                        value={formik.values.annual_compensation}
                        error={formik.touched.annual_compensation && formik.errors.annual_compensation}
                        errorText={formik.touched.annual_compensation && formik.errors.annual_compensation}
                      />
                      <Input
                        label="*Employment Length"
                        readonly={true}
                        value={formik.values.employment_length}
                        error={formik.touched.employment_length && formik.errors.employment_length}
                        errorText={formik.touched.employment_length && formik.errors.employment_length}
                      />
                      <Input
                        label="*Employed Since"
                        name="employed_since_date"
                        onChange={(e) => {
                          formik.setFieldValue('employed_since_date', e.target.value);
                        }}
                        value={formik.values.employed_since_date}
                        error={formik.touched.employed_since_date && formik.errors.employed_since_date}
                        errorText={formik.touched.employed_since_date && formik.errors.employed_since_date}
                        type="date"
                        className={'[&_input]:h-[38px]'}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col py-[50px] gap-6">
                    <span className="leading-6 font-medium text-base">Previuos Employer Information</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
                      <Input
                        label="Previous Employer"
                        name="previous_employer"
                        onChange={formik.handleChange}
                        value={formik.values.previous_employer}
                      />
                      <Input
                        label="Previous Employer Address"
                        name="previous_employer_address"
                        onChange={formik.handleChange}
                        value={formik.values.previous_employer_address}
                      />
                      <Input
                        label="Previous Employer Contact Person"
                        name="previous_contact_person"
                        onChange={formik.handleChange}
                        value={formik.values.previous_contact_person}
                      />
                      <Input
                        label="Previous Employer Contact Person Number"
                        type="phone"
                        name="previous_employer_contact_number"
                        onChange={formik.handleChange}
                        value={formik.values.previous_employer_contact_number}
                      />
                      <Input
                        label="Previous Position Title"
                        name="previous_position_title"
                        onChange={formik.handleChange}
                        value={formik.values.previous_position_title}
                      />
                      <Input
                        label="Previous Annual Compensation"
                        name="previous_annual_compensation"
                        onChange={formik.handleChange}
                        value={formik.values.previous_annual_compensation}
                      />
                      <Input
                        label="Previous Employment Length"
                        readonly={true}
                        value={formik.values.previous_employment_length}
                      />
                      <Input
                        label="Employed Since"
                        name="previous_employer_employed_since_date"
                        onChange={formik.handleChange}
                        value={formik.values.previous_employer_employed_since_date}
                        type="date"
                        className={'[&_input]:h-[38px]'}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col py-[50px] gap-6">
                    <div className="flex items-center justify-between">
                      <span className="leading-6 font-medium text-base">Documents</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
                      <FileInput
                        title={'Employment letter'}
                        name={'documents.employment_letter'}
                        error={
                          formik.touched?.documents?.employment_letter && formik.errors?.documents?.employment_letter
                        }
                        errorText={
                          formik.touched?.documents?.employment_letter && formik.errors?.documents?.employment_letter
                        }
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
                      {DOCUMENT_PLACEHOLDERS.map(({ id, title, form_name }) => {
                        return (
                          <FileInput
                            key={id}
                            title={title}
                            name={`documents.${form_name}`}
                            error={
                              getIn(formik.touched?.documents, form_name) && getIn(formik.errors?.documents, form_name)
                            }
                            errorText={
                              getIn(formik.touched?.documents, form_name) && getIn(formik.errors?.documents, form_name)
                            }
                          />
                        );
                      })}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
                      {formik.values.documents?.other_documents &&
                        Object.entries(formik.values.documents?.other_documents)
                          .map(([key, value]) => {
                            return { id: key, ...value };
                          })
                          .map((document) => {
                            return (
                              <FileInput
                                key={document.id}
                                title={document.name}
                                name={`documents.other_documents.${document.id}`}
                                onRemove={() => {
                                  let other_documents = formik.values.documents.other_documents;
                                  const currentFile = getIn(formik.values, `documents.other_documents.${document.id}`);
                                  delete other_documents[currentFile.id];
                                  if (!!Object.keys(other_documents).lenght)
                                    formik.setFieldValue('documents.other_documents', other_documents);
                                  else formik.setFieldValue('documents.other_documents', null);
                                }}
                              />
                            );
                          })}
                    </div>
                    <div className="max-w-fit">
                      <Button
                        white
                        leftIcon={<UploadFileIcon className="h-4 w-4 text-overlayBackground" />}
                        label={'Upload other Document'}
                        onClick={() => {
                          setAddDocumentOverlayOpened(true);
                        }}
                      />
                    </div>
                  </div>
                  <div className="py-[50px]">
                    <div className="p-4 rounded-md bg-gray10 text-gray4 text-sm font-medium leading-5 ">
                      <div className="flex gap-3 items-center mb-[2px]">
                        <input
                          name="do_credit_check"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-lightBlue3 focus:ring-lightBlue3"
                          onChange={(e) => {
                            formik.handleChange(e);
                          }}
                          value={formik.values.do_credit_check}
                          checked={formik.values.do_credit_check}
                        />
                        <p className="font-medium ">Include Credit Check</p>
                      </div>
                      <div className="flex flex-col pl-[28px] gap-6 [&_input]:h-[38px] mb-[24px]">
                        <p className="font-normal">
                          Landlords want to ensure that they will be paid the rent they are owed when they let out a
                          property. A credit check can help give them information about the tenant's previous history
                          when it comes to paying back debts. The cost of a credit check is $20.00.{' '}
                        </p>
                        {/* <div className="flex flex-col md:flex-row gap-6 w-full">
                          <Input
                            label="Name on Card"
                            className={"w-full max-w-[292px]"}
                            placeholder="Name and Last Name"
                          />
                          <div className="flex flex-col w-full max-w-[292px] relative h-[99px]">
                            <div className="absolute top-0 z-[5] focus-within:z-[5] w-full">
                              <Input
                                label="Card Details"
                                className={"[&_input]:rounded-none [&_input]:rounded-t-lg "}
                                placeholder="Card Number"
                              />
                            </div>

                            <div className="flex h-[99px] relative">
                              <div className="w-[calc(50%+1px)] max-w-[146.5px] absolute bottom-0 left-0 z-0 focus-within:z-[5]">
                                <Input
                                  className={
                                    "[&_div]:mt-0 [&_input]:border-[1px] [&_input]:border-t-[1px] [&_input]:rounded-none [&_input]:rounded-bl-lg "
                                  }
                                  placeholder="exp date"
                                  label=""
                                />
                              </div>
                              <div className="w-[calc(50%+1px)] max-w-[146.5px] absolute bottom-0 z-0 right-0 focus-within:z-[5]">
                                <Input
                                  label=""
                                  className={"[&_div]:mt-0 [&_input]:rounded-none [&_input]:rounded-br-lg "}
                                  placeholder="CVV"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col w-full max-w-[292px] relative h-[99px]">
                            <div className="w-full absolute top-0 z-0 focus-within:z-10">
                              <Input
                                label="Billing Address"
                                className={"w-full [&_input]:rounded-none [&_input]:rounded-t-lg"}
                                placeholder="Address"
                              />
                            </div>
                            <div className="w-full absolute bottom-0 z-0 focus-within:z-10">
                              <Input
                                className={
                                  "w-full [&_div]:mt-0  [&_input]:border-[1px]  focus:[&_input]:border-t-[1px] [&_input]:rounded-none [&_input]:rounded-b-lg"
                                }
                                placeholder="Zip Code"
                              />
                            </div>
                          </div>
                        </div> */}
                      </div>
                      <div className="pl-[28px]">
                        <PaymentElement onReady={(event) => console.log('CHANGE', event)} />
                        <AddressElement options={{ mode: 'billing' }} />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col w-full gap-6 py-[50px] [&_input]:h-[38px]">
                    <span className="leading-6 font-medium text-base">Financials</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
                      <Input
                        label="Bank Name"
                        name="bank_name"
                        value={formik.values.bank_name}
                        onChange={formik.handleChange}
                      />
                      <Dropdown
                        options={[]}
                        label={'Type of Account'}
                        name="account_type"
                        value={formik.values.account_type}
                        onChange={formik.handleChange}
                      />
                      <Input
                        label="Account Number"
                        name="account_number"
                        value={formik.values.account_number}
                        onChange={formik.handleChange}
                      />
                      <Input
                        label="Accountant"
                        name="accountant"
                        value={formik.values.accountant}
                        onChange={formik.handleChange}
                      />
                      <Input
                        label="Accountat Number"
                        type="phone"
                        name="accountant_contact"
                        value={formik.values.accountant_contact}
                        onChange={formik.handleChange}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col w-full gap-[50px] pb-6  pt-[50px]">
                    <div className="space-y-6">
                      <span className="leading-6 font-medium text-base">Other Info</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 [&_input]:h-[38px]">
                        <Input
                          label="*Emergency contact"
                          name="emergency_contact_name"
                          onChange={formik.handleChange}
                          value={formik.values.emergency_contact_name}
                          error={formik.touched.emergency_contact_name && formik.errors.emergency_contact_name}
                          errorText={formik.touched.emergency_contact_name && formik.errors.emergency_contact_name}
                        />
                        <Input
                          label="*Emergency Contact Phone Number"
                          type="phone"
                          name="emergency_contact_phone_number"
                          onChange={formik.handleChange}
                          value={formik.values.emergency_contact_phone_number}
                          error={
                            formik.touched.emergency_contact_phone_number &&
                            formik.errors.emergency_contact_phone_number
                          }
                          errorText={
                            formik.touched.emergency_contact_phone_number &&
                            formik.errors.emergency_contact_phone_number
                          }
                        />
                      </div>
                      <div className="p-4 rounded-md bg-gray10 text-gray4 text-sm font-medium leading-5">
                        <div className="flex gap-3 items-center mb-[2px]">
                          <input
                            name="need_moving_services"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-lightBlue3 focus:ring-lightBlue3"
                            onChange={(e) => {
                              formik.handleChange(e);
                            }}
                            value={formik.values.need_moving_services}
                            checked={formik.values.need_moving_services}
                          />
                          <p className="font-medium ">I Want Moving Services</p>
                        </div>
                        <div className="flex flex-col pl-[28px] gap-6 [&_input]:h-[38px] ">
                          <p className="font-normal">
                            Please reach out to me with information about the following discounted service from the
                            Oxford family network.
                          </p>
                          <div className=" w-full max-w-[292px]">
                            <Input
                              label="Moving Date"
                              type="date"
                              name="move_in_date"
                              value={formik.values.need_moving_services ? formik.values.move_in_date : ''}
                              readonly={!formik.values.need_moving_services}
                              onChange={(e) => {
                                formik.setFieldValue('move_in_date', e.target.value);
                              }}
                              error={
                                formik.values.need_moving_services &&
                                formik.touched.move_in_date &&
                                formik.errors.move_in_date
                              }
                              errorText={
                                formik.values.need_moving_services &&
                                formik.touched.move_in_date &&
                                formik.errors.move_in_date
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="leading-6 font-medium text-base mb-6">Your Signature</span>
                      <div className="max-w-[608px] max-h-[170px]">
                        <Input
                          onSignatureEnd={(url) => {
                            formik.setFieldValue(`client_signature`, url);
                          }}
                          onSignatureClear={() => {
                            formik.setFieldValue(`client_signature`, null);
                          }}
                          type={'signature'}
                          error={
                            (formik.errors.client_signature || formik.errors.client_signature?.untrimmedCanvas) &&
                            formik.touched.client_signature
                          }
                          errorText={
                            formik.errors.client_signature?.untrimmedCanvas
                              ? formik.errors.client_signature.untrimmedCanvas
                              : formik.errors.client_signature
                          }
                          className="h-[170px]"
                        />
                      </div>
                    </div>
                    <div className=" flex justify-between">
                      <div className="flex items-center gap-[12px] p-[16px] bg-gray10 rounded-md	">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-lightBlue3 focus:ring-lightBlue3"
                          onChange={(e) => {
                            setAgreementSelected(e.target.checked);
                          }}
                          value={agreementSelected}
                          checked={agreementSelected}
                        />
                        <p className="text-gray7 text-[14px] font-medium leading-5">
                          I agree to this{' '}
                          <button
                            type="button"
                            className="text-[#2563EB] underline"
                            onClick={() => setAgreementModalOpen(true)}>
                            Application Agreement
                          </button>{' '}
                          and understand that my credit check fee is non-refundable.
                        </p>
                      </div>

                      <button
                        type="submit"
                        disabled={!agreementSelected}
                        className={clsx(
                          'flex justify-center items-center w-full max-w-[320px]  bg-[#3B82F6] py-[13px] px-[25px] rounded-md text-white',
                          {
                            'opacity-50': !agreementSelected,
                            'opacity-100': agreementSelected,
                          },
                        )}>
                        {isPendingPostApplication ? (
                          <CircularProgress size={20} sx={{ color: 'white' }}></CircularProgress>
                        ) : (
                          'Submit'
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        {isAddDocumentOverlayOpened && (
          <AddDocument handleClose={() => setAddDocumentOverlayOpened(false)} name="documents.other_documents" />
        )}
        {isAgreementModalOpen && (
          <AgreementOverlay
            handleClose={() => setAgreementModalOpen(false)}
            handleAgree={() => {
              setAgreementModalOpen(false);
              setAgreementSelected(true);
            }}
          />
        )}
      </FormikProvider>
    </>
  );
};

export default ApplyForm;
