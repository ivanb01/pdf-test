import React, { useState } from "react";
import Input from "@components/shared/input";
import { useFormik } from "formik";
import clsx from "clsx";
import * as Yup from "yup";
import { usePostPropertyApplication } from "../queries/mutations";
import toast from "react-hot-toast";
import { useStripe, useElements, Elements, PaymentElement, AddressElement } from "@stripe/react-stripe-js";
import useStripePayment from "../utils/hooks/useStripePayment";
import moment from "moment";
import ApplicationSubmitBody from "../EmailTemplates/ApplicationSubmit";
import { render as renderEmail } from "@react-email/components";

const CreditCheckForm = () => {
  const [agreementSelected, setAgreementSelected] = useState(false);
  const validationSchema = Yup.object({
    agent_name: Yup.string().required("Agent name is a required field!"),
    property_address: Yup.string().required("Property address is a required field!"),
    property_id: Yup.string().required("Property ID is a required field!"),
    client_email: Yup.string().email().required("Email address is a required field!"),
    client_birth_date: Yup.date().required("Date of birth is a required field!"),
    client_phone_number: Yup.string().required("Phone number is a required field!"),
    client_permanent_address: Yup.string().required("Permanent address is a required field!"),
    client_ssn: Yup.string().required("Social securty number is a required field!"),
    client_signature: Yup.object()
      .shape({
        untrimmedCanvas: Yup.string().required("Signature is required!"),
        imageData: Yup.string().required(),
        width: Yup.number().required(),
        height: Yup.number().required(),
      })
      .typeError("Signature is required!"),
    need_moving_services: Yup.bool(),
    move_in_date: Yup.string()
      .when("need_moving_services", {
        is: true,
        then: Yup.string().required("Moving service date is required!"),
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
    console.log("variables", variables);
    await handleSubmitPayment(data.data);
    // const emailBody = {
    //   to: [variables.client_email],
    //   subject: "Opgny Property Application",
    //   body: renderEmail(
    //     <ApplicationSubmitBody email={variables.client_email} first_name={variables.client_first_name} />,
    //     {
    //       pretty: true,
    //     },
    //   ),
    // };
    // mutateSendEmail(emailBody);
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
      accountant: "",
      accountant_contact: "",
      account_number: "",
      account_type: "",
      agent_id: 2234,
      agent_email: "agent@agent.com",
      agent_name: "",
      annual_compensation: 0.0,
      apartment_number: "",
      bank_name: "",
      client_additional_comment: "",
      client_birth_date: "",
      client_city: "",
      client_email: "",
      client_first_name: "",
      client_has_pets: false,
      client_last_name: "",
      client_phone_number: "",
      client_permanent_address: "",
      client_ssn: "",
      client_state: "",
      client_pets_description: "",
      client_signature: "",
      client_unit_number: "",
      client_zip_code: "",
      client_is_guarantor: false,
      client_is_interested_in_guarantor: false,
      credit_report_status: "CHECKED",
      contact_person: "",
      contact_person_number: "",
      contractor_id: 1,
      contractor_name: "Contractor Tester",
      contractor_email: "contractor@tester.com",
      current_addess: "",
      current_city: "",
      current_state: "",
      current_unit_number: "",
      current_zip_code: "",
      documents: [],
      emergency_contact_name: "",
      emergency_contact_phone_number: "",
      employer: "",
      employer_address: "",
      employment_length: "",
      employed_since_date: "1970-01-01",

      employed_since_month: 0,
      employed_since_year: 0,
      existing_occupant: false,
      do_credit_check: true,
      landlord: "",
      landlord_address: "",
      landlord_phone_number: "",
      monthly_rent: 0.0,
      lease_start_date: "1970-01-01",
      lease_end_date: "1970-01-01",

      move_in_date: moment().format("YYYY-MM-DD"),
      need_moving_services: false,
      occupants: [],
      position_title: "",
      previous_employer: "",
      previous_employer_address: "",
      previous_contact_person: "",
      previous_position_title: "",
      previous_annual_compensation: 0.0,
      previous_employment_length: "",
      previous_employer_contact_number: "",
      previous_employed_since_month: 1,
      previous_employed_since_year: 0,
      previous_employer_employed_since_date: null,
      property_address: "",
      property_city: "",
      property_id: "0",
      property_state: "",
      property_unit_number: "",
      property_zip_code: "",
      signature: null,
    },
    validationSchema: validationSchema,
    // onReset: async (values, formikBag) => {
    //   setPropertySelected(null);
    //   setPropertySelectedImageUrl(null);
    //   setTimeout(() => formikBag.setFieldValue("occupants", []));
    //   setTimeout(() => formikBag.setFieldValue("client_state", ""));
    // },

    onSubmit: async (values) => {
      console.log("SUBMIT");

      try {
        const response = await elements.submit();
        if (Object.keys(response).length) return;
      } catch (error) {
        return;
      }

      mutatePostApplication({
        ...values,
      });
    },
  });

  return (
    <form className="py-[50px] space-y-[24px]" onSubmit={formik.handleSubmit}>
      <p className="text-gray7 font-medium">General Information</p>
      <div className="grid grid-cols-4 gap-[24px] leading-5">
        <Input
          className={"col-span-3"}
          label="Apartment address you are applying for*"
          name="property_address"
          value={formik.values.property_address}
          onChange={formik.handleChange}
          error={formik.touched.property_address && formik.errors.property_address}
          errorText={formik.touched.property_address && formik.errors.property_address}
        />
        <Input
          label="Select the agent*"
          name="agent_name"
          onChange={formik.handleChange}
          error={formik.touched.agent_name && formik.errors.agent_name}
          errorText={formik.touched.agent_name && formik.errors.agent_name}
        />
        <Input
          className={"col-span-3"}
          label="Permanent Address*"
          name={"client_permanent_address"}
          value={formik.values.client_permanent_address}
          onChange={formik.handleChange}
          error={formik.touched.client_permanent_address && formik.errors.client_permanent_address}
          errorText={formik.touched.client_permanent_address && formik.errors.client_permanent_address}
        />
        <Input
          label="ZIP"
          name={"client_zip_code"}
          value={formik.values.client_zip_code}
          onChange={formik.handleChange}
          error={formik.touched.client_zip_code && formik.errors.client_zip_code}
          errorText={formik.touched.client_zip_code && formik.errors.client_zip_code}
        />
        <Input
          label="Email address*"
          name={"client_email"}
          value={formik.values.client_email}
          onChange={formik.handleChange}
          error={formik.touched.client_email && formik.errors.client_email}
          errorText={formik.touched.client_email && formik.errors.client_email}
        />
        <Input
          label="Date of Birth*"
          name={"client_birth_date"}
          type="date"
          value={formik.values.client_birth_date}
          onChange={(event) => {
            formik.setFieldValue("client_birth_date", event.target.value);
          }}
          error={formik.touched.client_birth_date && formik.errors.client_birth_date}
          errorText={formik.touched.client_birth_date && formik.errors.client_birth_date}
        />
        <Input
          label="Phone Number*"
          name={"client_phone_number"}
          value={formik.values.client_phone_number}
          onChange={formik.handleChange}
          error={formik.touched.client_phone_number && formik.errors.client_phone_number}
          errorText={formik.touched.client_phone_number && formik.errors.client_phone_number}
        />
        <Input
          label="SSN*"
          name={"client_ssn"}
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
                value={formik.values.need_moving_services ? formik.values.move_in_date : ""}
                readonly={!formik.values.need_moving_services}
                onChange={formik.handleChange}
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
              back debts. The cost of a credit check is $20.00.{" "}
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
                options={{ mode: "billing" }}
                onChange={(event) => {
                  formik.setFieldValue("client_first_name", event.value.name);
                  // if (event.complete) {
                  // }
                }}
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
              I agree to this{" "}
              <button type="button" className="text-[#2563EB] underline ">
                Credit Check Agreement
              </button>{" "}
              and understand that my credit check fee is non-refundable.
            </p>
          </div>

          <button
            disabled={!agreementSelected}
            className={clsx("w-full max-w-[320px] bg-[#3B82F6] py-[13px] px-[25px] rounded-md text-white", {
              "opacity-50": !agreementSelected,
              "opacity-100": agreementSelected,
            })}>
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreditCheckForm;
