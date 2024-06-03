import DropdownWithSearch from '@components/dropdownWithSearch';
import Input from '@components/shared/input';
import { CircularProgress } from '@mui/material';
import { render as renderEmail } from '@react-email/components';
import { AddressElement, PaymentElement } from '@stripe/react-stripe-js';
import clsx from 'clsx';
import { useFormik } from 'formik';
import { useState } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import AgreementOverlay from '../AgreementOverlay';
import InputDropdown from '../ApplyForm/InputDropdown';
import ApplicationSubmitBody from '../EmailTemplates/ApplicationSubmit';
import { usePostPropertyApplication } from '../queries/mutations';
import { USA_STATES, getFullNameFromAbbreviations } from '../utils/constants';
import useStripePayment from '../utils/hooks/useStripePayment';

// const TEST = {
//   // property_id: '1b9ce199',
//   // contractor_id: 1,
//   // contractor_name: 'Contractor Tester',
//   // contractor_email: 'contractor@tester.com',
//   // apartment_number: '5a',
//   // property_address: 'Property Address',
//   // property_unit_number: 'Property Unit Number',
//   // property_city: 'Property City',
//   // property_state: 'ALASKA',
//   // property_zip_code: '12345',

//   // monthly_rent: 1000.0,
//   // lease_start_date: '2023-02-17',
//   // lease_end_date: '2024-02-17',
//   // landlord: 'Landlord',
//   // landlord_address: 'Landlord Address',
//   // landlord_phone_number: '3768748763893',
//   // client_first_name: 'John',
//   // client_last_name: 'Doe',
//   // client_email: 'john@doe.com',
//   // client_birth_date: '1980-01-01',

//   client_phone_number: '348767846876783',
//   client_permanent_address: 'Perm 123',
//   client_unit_number: 'Unit 123',
//   client_city: 'Client City',
//   client_state: 'ALASKA',
//   client_zip_code: '12345',
//   client_ssn: '999010001',

//   // client_has_pets: false,
//   // client_pets_description: '',
//   // client_is_guarantor: false,
//   // client_is_interested_in_guarantor: false,
//   // client_additional_comment: '',
//   // client_signature: {
//   //   trimmed_signature_data: 'hello',
//   //   untrimmed_signature_data: 'world',
//   // },

//   employer: 'Employer',
//   employer_address: 'Employer Address',
//   contact_person: 'Contact Person',
//   contact_person_phone_number: '478487469837938',
//   position_title: 'Work',
//   annual_compensation: 1000000.0,
//   employment_length: '',
//   employed_since_date: '2024-02-17',
//   previous_employer: null,
//   previous_employer_address: null,
//   previous_employer_contact_person: null,
//   previous_employer_position_title: null,
//   previous_employer_annual_compensation: 0.0,
//   previous_employer_employment_length: '',
//   previous_employer_employed_since_date: null,
//   credit_report_status: 'CHECKED',
//   do_credit_check: true,
//   bank_name: null,
//   account_type: null,
//   account_number: null,
//   accountant: null,
//   accountant_phone_number: null,
//   emergency_contact_name: 'Emergency Contact',
//   emergency_contact_phone_number: '7486486487647',
//   need_moving_services: false,
//   move_in_date: null,
//   occupants: [
//     {
//       full_name: 'John Doe',
//       email: 'john@doe.com',
//     },
//   ],
//   documents: [
//     {
//       document_type: 'EMPLOYMENT_LETTER',
//       name: 'Fitbit',
//       name_with_format: 'fitbit.jpg',
//       url: 'featured_properties/fitbit.jpg',
//       file_size: null,
//     },
//     {
//       document_type: 'OTHER',
//       name: 'Fitbit',
//       name_with_format: 'fitbit.jpg',
//       url: 'featured_properties/fitbit.jpg',
//       file_size: null,
//     },
//     {
//       document_type: 'PAYSTUB_1',
//       name: 'Fitbit',
//       name_with_format: 'fitbit.jpg',
//       url: 'featured_properties/fitbit.jpg',
//       file_size: null,
//     },
//     {
//       document_type: 'PAYSTUB_2',
//       name: 'Fitbit',
//       name_with_format: 'fitbit.jpg',
//       url: 'featured_properties/fitbit.jpg',
//       file_size: null,
//     },
//     {
//       document_type: 'PHOTO_ID_COPY',
//       name: 'Fitbit',
//       name_with_format: 'fitbit.jpg',
//       url: 'featured_properties/fitbit.jpg',
//       file_size: null,
//     },
//     {
//       document_type: 'TAX_RETURNS_1',
//       name: 'Fitbit',
//       name_with_format: 'fitbit.jpg',
//       url: 'featured_properties/fitbit.jpg',
//       file_size: null,
//     },
//     {
//       document_type: 'TAX_RETURNS_2',
//       name: 'Fitbit',
//       name_with_format: 'fitbit.jpg',
//       url: 'featured_properties/fitbit.jpg',
//       file_size: null,
//     },
//     {
//       document_type: 'W2',
//       name: 'Fitbit',
//       name_with_format: 'fitbit.jpg',
//       url: 'featured_properties/fitbit.jpg',
//       file_size: null,
//     },
//   ],
//   recipients: [
//     {
//       name: 'John',
//       email: 'john@doe.com',
//     },
//   ],
// };

const CreditCheckForm = () => {
  const [agreementSelected, setAgreementSelected] = useState(false);
  const [isAgreementModalOpen, setAgreementModalOpen] = useState(false);

  const validationSchema = Yup.object({
    agent_name: Yup.string().required('Agent name is a required field!'),
    property_address: Yup.string().required('Property address is a required field!'),
    property_id: Yup.string().required('Property ID is a required field!'),

    client_birth_date: Yup.date()
      .max(new Date(), 'Date of birth cannot be in the future')
      .required('Date of birth is a required field'),
    client_email: Yup.string()
      .email('Please provide a valid email address.')
      .required('Email address is a required field!'),
    client_first_name: Yup.string().required('First name is a required field!'),
    client_last_name: Yup.string().required('Last name is a required field!'),
    client_phone_number: Yup.string().required('Phone number is a required field!'),
    client_permanent_address: Yup.string().required('Permanent address is a required field!'),
    client_ssn: Yup.string()
      .required('Social securty number is a required field!')
      .length(9, 'Social securty number be exactly 9 digits long!')
      .matches(
        /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/,
        'Social securty number field should contain only digits!',
      ),

    client_zip_code: Yup.string()
      .required('Zip code is a required field!')
      .length(5, 'Zip code be exactly 5 digits long!')
      .matches(
        /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/,
        'Zip code field should contain only digits!',
      ),

    client_signature: Yup.object()
      .shape({
        untrimmedCanvas: Yup.string().required('Signature is required!'),
        imageData: Yup.string().required(),
        width: Yup.number().required(),
        height: Yup.number().required(),
      })
      .typeError('Signature is required!'),
    need_moving_services: Yup.bool(),
    move_in_date: Yup.string()
      .when('need_moving_services', {
        is: true,
        then: Yup.string().required('Moving service date is required!'),
      })
      .nullable(true),
  });

  const onPaymentError = (error) => {
    toast.error(error.message);
  };
  const { elements, loading, statusMessage, errorMessage, handleSubmitPayment, paymentStatus, isErrorOnPayment } =
    useStripePayment({
      onError: onPaymentError,
    });

  const onSubmitSuccess = async (data, variables) => {
    await handleSubmitPayment(data.data);
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
      annual_compensation: 0.0,
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
      documents: [],
      emergency_contact_name: '',
      emergency_contact_phone_number: '',
      employer: '',
      employer_address: '',
      employment_length: '',
      employed_since_date: '1970-01-01',

      employed_since_month: 0,
      employed_since_year: 0,
      existing_occupant: false,
      do_credit_check: true,
      landlord: '',
      landlord_address: '',
      landlord_phone_number: '',
      monthly_rent: 0.0,
      lease_start_date: '1970-01-01',
      lease_end_date: '1970-01-01',
      move_in_date: '',
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
      property_state: '',
      property_unit_number: '',
      property_zip_code: '',
      signature: null,
    },
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      try {
        const response = await elements.submit();
        //  if (Object.keys(response).length) return;
        if (response.error) {
          toast.error(response.error.message);
          return;
        }
      } catch (error) {
        toast.error(error.message);
        return;
      }

      const { property_state } = values;
      let stateValue = typeof property_state === 'object' ? property_state.value : property_state;

      try {
        if (propertyStateValue.length === 2) {
          stateValue = getFullNameFromAbbreviations[stateValue];
        }
      } catch (error) {
        // Do nothing since the state is already in correct format
      }

      mutatePostApplication({
        ...values,
        annual_compensation: 1000000.0,
        do_credit_check: true,
        property_id: '1b9ce199', // TODO use real property id when in production
        lease_start_date: '2024-05-10',
        lease_end_date: '2024-09-10',
        client_zip_code: '10001',
        property_state: stateValue,
        current_state: stateValue,
        signature: null,
        monthly_rent: 1000.0,
        lease_start_date: '2023-02-17',
        lease_end_date: '2024-02-17',
        client_unit_number: 'Unit 123',
        client_city: 'Client City',
        client_state: 'ALASKA',

        documents: [
          {
            document_type: 'PHOTO_ID_COPY',
            name: 'Fitbit',
            name_with_format: 'fitbit.jpg',
            url: 'featured_properties/fitbit.jpg',
            file_size: null,
          },
        ],
      });
    },
  });

  const [dropdownOptions, setDropdownOptions] = useState(USA_STATES);

  const [propertySelected, setPropertySelected] = useState(null);
  const [propertySelectedImageUrl, setPropertySelectedImageUrl] = useState(null);

  const onListItemCLick = async (listing) => {
    setPropertySelected(listing);
    const image = listing.PHOTOS.find((photo) => photo.PHOTO_URL.includes('https://rls.realty.mx'));
    if (image) setPropertySelectedImageUrl(image.PHOTO_URL);
    else setPropertySelectedImageUrl(null);

    await formik.setFieldValue('property_address', listing.ADDRESS);
    await formik.setFieldValue('property_id', listing.ID.toString());
    await formik.setFieldValue('monthly_rent', listing.PRICE);

    listing?.CITY && (await formik.setFieldValue('property_city', listing.CITY));
    listing?.STATE &&
      (await formik.setFieldValue('property_state', {
        id: '',
        label: listing.STATE,
        value: listing.STATE,
      }));
    listing?.UNIT_NUMBER && (await formik.setFieldValue('property_unit_number', listing.UNIT_NUMBER));
    listing?.ZIP_CODE && (await formik.setFieldValue('property_zip_code', listing.ZIP_CODE));
  };

  return (
    <form className="py-[50px] space-y-[24px]" onSubmit={formik.handleSubmit}>
      <p className="text-gray7 font-medium">General Information</p>
      <div className="grid grid-cols-2 gap-[24px] leading-5">
        <InputDropdown label="Apartment address you are applying for*" onListItemClick={onListItemCLick} />
        <Input
          label="Select the agent*"
          name="agent_name"
          onChange={formik.handleChange}
          error={formik.touched.agent_name && formik.errors.agent_name}
          errorText={formik.touched.agent_name && formik.errors.agent_name}
        />
      </div>
      <div className="grid grid-cols-4 gap-6 pt-6">
        <Input
          id="property_address"
          name="property_address"
          label="*Property Address"
          className={'[&_input]:h-[38px] col-span-2'}
          value={formik.values.property_address}
          onChange={formik.handleChange}
          readonly={!!propertySelected}
          error={formik.touched.property_address && formik.errors.property_address && !formik.values.property_address}
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
              options={dropdownOptions?.map((state, index) => {
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
      </div>
      <div className="grid grid-cols-4 gap-[24px] leading-5">
        <Input
          label="First Name*"
          className={'col-span-2 [&_input]:h-[38px]'}
          name="client_first_name"
          value={formik.values.client_first_name}
          onChange={formik.handleChange}
          error={formik.touched.client_first_name && formik.errors.client_first_name}
          errorText={formik.touched.client_first_name && formik.errors.client_first_name}
        />
        <Input
          label="Last Name*"
          className={'col-span-2 [&_input]:h-[38px]'}
          name="client_last_name"
          value={formik.values.client_last_name}
          onChange={formik.handleChange}
          error={formik.touched.client_last_name && formik.errors.client_last_name}
          errorText={formik.touched.client_last_name && formik.errors.client_last_name}
        />
        <Input
          className={'col-span-3'}
          label="Permanent Address*"
          name={'client_permanent_address'}
          value={formik.values.client_permanent_address}
          onChange={formik.handleChange}
          error={formik.touched.client_permanent_address && formik.errors.client_permanent_address}
          errorText={formik.touched.client_permanent_address && formik.errors.client_permanent_address}
        />
        <Input
          label="ZIP*"
          name={'client_zip_code'}
          value={formik.values.client_zip_code}
          onChange={formik.handleChange}
          error={formik.touched.client_zip_code && formik.errors.client_zip_code}
          errorText={formik.touched.client_zip_code && formik.errors.client_zip_code}
        />
        <Input
          label="Email address*"
          name={'client_email'}
          value={formik.values.client_email}
          onChange={formik.handleChange}
          error={formik.touched.client_email && formik.errors.client_email}
          errorText={formik.touched.client_email && formik.errors.client_email}
        />
        <Input
          label="Date of Birth*"
          name={'client_birth_date'}
          type="date"
          value={formik.values.client_birth_date}
          onChange={(event) => {
            formik.setFieldValue('client_birth_date', event.target.value);
          }}
          error={formik.touched.client_birth_date && formik.errors.client_birth_date}
          errorText={formik.touched.client_birth_date && formik.errors.client_birth_date}
        />
        <Input
          label="Phone Number*"
          name={'client_phone_number'}
          value={formik.values.client_phone_number}
          onChange={formik.handleChange}
          error={formik.touched.client_phone_number && formik.errors.client_phone_number}
          errorText={formik.touched.client_phone_number && formik.errors.client_phone_number}
        />
        <Input
          label="SSN*"
          name={'client_ssn'}
          value={formik.values.client_ssn}
          onChange={formik.handleChange}
          error={formik.touched.client_ssn && formik.errors.client_ssn}
          errorText={formik.touched.client_ssn && formik.errors.client_ssn}
        />
        <div className="p-4 rounded-md bg-gray10 text-gray4 text-sm font-medium leading-5 col-span-2">
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
              Please reach out to me with information about the following discounted service from the Oxford family
              network.
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
                error={formik.values.need_moving_services && formik.touched.move_in_date && formik.errors.move_in_date}
                errorText={
                  formik.values.need_moving_services && formik.touched.move_in_date && formik.errors.move_in_date
                }
              />
            </div>
          </div>
        </div>
        <div className="col-span-2 w-full h-full">
          <div className="space-y-[4px]">
            <Input
              onSignatureEnd={(url) => {
                formik.setFieldValue(`client_signature`, url);
              }}
              onSignatureClear={() => {
                formik.setFieldValue(`client_signature`, null);
              }}
              type="signature"
              label="Please sign here:"
              error={
                (formik.errors.client_signature || formik.errors.client_signature?.untrimmedCanvas) &&
                formik.touched.client_signature
              }
              errorText={
                formik.errors.client_signature?.untrimmedCanvas
                  ? formik.errors.client_signature.untrimmedCanvas
                  : formik.errors.client_signature
              }
            />
          </div>
        </div>
        <div className="p-4 rounded-md bg-gray10 text-gray4 text-sm font-medium leading-5 col-span-4">
          {/* <div className="flex gap-3 items-center mb-[2px]">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-lightBlue3 focus:ring-lightBlue3"
              checked
              onChange={() => {}}
            />
            <p className="font-medium ">Include Credit Check</p>
          </div> */}
          <div className="flex flex-col gap-6 [&_input]:h-[38px] ">
            <p className="font-normal">
              Landlords want to ensure that they will be paid the rent they are owed when they let out a property. A
              credit check can help give them information about the tenant's previous history when it comes to paying
              back debts. The cost of a credit check is $20.00.{' '}
            </p>
            {/* <div className="flex flex-col md:flex-row gap-6 w-full">
              <Input label="Name on Card" className={"w-full max-w-[292px]"} placeholder="Name and Last Name" />
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
            <div className="">
              <PaymentElement />
              <AddressElement
                options={{ mode: 'billing' }}
                // onChange={(event) => {
                //   formik.setFieldValue('client_first_name', event.value.name);
                //   // if (event.complete) {
                //   // }
                // }}
              />
            </div>
          </div>
        </div>
        <div className="pt-[50px] flex justify-between col-span-4">
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
              <button type="button" className="text-[#2563EB] underline " onClick={() => setAgreementModalOpen(true)}>
                Credit Check Agreement
              </button>{' '}
              and understand that my credit check fee is non-refundable.
            </p>
          </div>

          <button
            disabled={!agreementSelected}
            className={clsx('w-full max-w-[320px] bg-[#3B82F6] py-[13px] px-[25px] rounded-md text-white', {
              'opacity-50': !agreementSelected,
              'opacity-100': agreementSelected,
            })}>
            {isPendingPostApplication ? <CircularProgress size={15} sx={{ color: 'white' }} /> : <span>Submit</span>}
          </button>
        </div>
      </div>
      {isAgreementModalOpen && (
        <AgreementOverlay
          handleClose={() => setAgreementModalOpen(false)}
          handleAgree={() => {
            setAgreementModalOpen(false);
            setAgreementSelected(true);
          }}
        />
      )}
    </form>
  );
};

export default CreditCheckForm;
