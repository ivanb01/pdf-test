import { useState, useEffect } from 'react';
import Button from '@components/shared/button';
import SearchSelectInput from '@components/shared/search-select-input';
import React from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { FieldArray, Form, Formik } from 'formik';
import Input from '@components/shared/input';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { valueOptions } from '@global/functions';
import uuid from 'react-uuid';
import toast from 'react-hot-toast';
import { useFetchAllClients } from '../queries/queries';
import SendApplicationBody from '../EmailTemplates/SendApplication';
import { render } from '@react-email/components';
import { useSendEmail } from '@helpers/queries/mutations';
import * as Yup from 'yup';

const SendApplicationModal = ({ applicationData, onClose }) => {
  const { data } = useFetchAllClients({
    select: ({ data }) => {
      return data.data.map((client) => ({
        id: client.id,
        label: `${client.first_name} ${client.last_name}`,
        client: client,
        value: client.id,
      }));
    },
  });

  const onSendEmailSuccess = () => {
    onClose();
    toast.success('Email successfully sent!');
  };

  const onSendEmailError = () => {
    toast.error('Unable to send email!');
  };

  const { mutate: mutateSendEmail, isPending: isPendingSendEmail } = useSendEmail({
    onSuccess: onSendEmailSuccess,
    onError: onSendEmailError,
  });

  const handleSubmit = (data, variables) => {
    data.landlords.forEach((landlord) => {
      const emailBody = {
        to: [landlord.client.email],
        subject: 'Opgny Property Application',
        body: render(
          <SendApplicationBody
            landlord_name={landlord.client.first_name}
            client_first_name={applicationData?.client_first_name}
            email={landlord.client.email}
            applicationLink={`${window.location.origin}/public/application-pdf/${applicationData.public_identifier}`}
          />,
          {
            pretty: true,
          },
        ),
      };
      mutateSendEmail(emailBody);
    });

    if (data.contacts.length) {
      data.contacts.forEach((contact) => {
        const emailBody = {
          to: [contact.email],
          subject: 'Opgny Property Application',
          body: render(
            <SendApplicationBody
              landlord_name={contact.name}
              client_first_name={applicationData?.client_first_name}
              email={contact.email}
              applicationLink={`${window.location.origin}/public/application-pdf/${applicationData.id}`}
            />,
            {
              pretty: true,
            },
          ),
        };
        mutateSendEmail(emailBody);
      });
    }
  };

  const ValidationSchema = Yup.object().shape({
    landlords: Yup.array().min(1, 'Landlords are a required field!').required('Lanlords are required is required'),
    contacts: Yup.array().of(
      Yup.object().shape({
        id: Yup.string(),
        name: Yup.string().required('Contact name is a required field!'),
        email: Yup.string().required('Contact email is a required field!'),
      }),
    ),
  });
  return (
    <div
      className={`flex items-center justify-center overflow-y-auto overflow-x-hidden fixed  z-[900] w-full inset-0 h-modal h-full  bg-[#6B7280BF]/[.75] text-base`}>
      <div className={`relative bg-white rounded-lg shadow overflow-scroll w-[90%] max-w-[600px] max-h-[370px] p-6`}>
        <Formik
          initialValues={{
            landlords: [],
            contacts: [],
          }}
          validationSchema={ValidationSchema}
          onSubmit={handleSubmit}>
          {(formik) => {
            console.log(formik.values);
            return (
              <Form>
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-[4px]">
                      <p className="text-base	font-medium leading-6">Send Application</p>
                      <p className="text-sm	font-normal leading-5 text-gray5">
                        Send Application to Landlord or other contact to review.
                      </p>
                    </div>
                    <Button closeButton onClick={onClose} />
                  </div>
                  <div className="">
                    <SearchSelectInput
                      label="Landlord"
                      options={data}
                      value={valueOptions(
                        formik.values.landlords.map((landlord) => landlord.value),
                        data,
                      )}
                      onChange={(choice) => {
                        let choices = choice.map((el) => el);
                        formik.setFieldValue('landlords', choices);
                      }}
                      error={formik.errors.landlords && formik.touched.landlords}
                      errorText={formik.errors.landlords}
                    />
                  </div>

                  <div className="flex flex-col gap-4">
                    <FieldArray
                      name="contacts"
                      validateOnChange={false}
                      render={(arrayHelpers) => {
                        return (
                          <div className="flex flex-col gap-4 ">
                            <button
                              type="button"
                              onClick={() => {
                                arrayHelpers.push({
                                  id: uuid(),
                                  name: '',
                                  email: '',
                                });
                              }}
                              className="flex items-center text-lightBlue3 text-sm font-medium leading-5 gap-[4px] w-fit">
                              <AddCircleIcon className="h-4 w-4" />
                              <span>Add another contact</span>
                            </button>
                            {formik.values.contacts.map((contact, index) => {
                              return (
                                <div key={index} className="flex items-center gap-6 w-full">
                                  <Input
                                    label="Name"
                                    name={`contacts[${index}].name`}
                                    value={formik.values.contacts[index].name}
                                    onChange={formik.handleChange}
                                    className={'w-full'}
                                    error={
                                      formik.errors.contacts &&
                                      formik.touched.contacts &&
                                      formik.touched.contacts[index]?.name &&
                                      formik.errors.contacts[index]?.name
                                    }
                                    errorText={formik.errors.contacts && formik.errors.contacts[index]?.name}
                                  />
                                  <Input
                                    label="Email"
                                    name={`contacts[${index}].email`}
                                    value={formik.values.contacts[index].email}
                                    onChange={formik.handleChange}
                                    className={'w-full'}
                                    error={
                                      formik.errors.contacts &&
                                      formik.touched.contacts &&
                                      formik.touched?.contacts[index]?.email &&
                                      formik.errors?.contacts[index]?.email
                                    }
                                    errorText={formik.errors.contacts && formik.errors.contacts[index]?.email}
                                  />
                                  <button
                                    type="button"
                                    onClick={() => {
                                      arrayHelpers.remove(index);
                                    }}>
                                    <RemoveCircleIcon className="h-4 w-4 text-overlayBackground" />
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        );
                      }}
                    />
                  </div>
                  <div className="flex justify-end gap-3">
                    <Button label={'Cancel'} white className={'min-w-min'} onClick={onClose} />
                    <Button
                      label={'Send'}
                      className={'min-w-min'}
                      onClick={formik.handleSubmit}
                      loading={isPendingSendEmail}
                      // onClick={() => {
                      //   onClose();
                      //   toast(
                      //     (t) => {
                      //       return (
                      //         <div className="min-w-[260px]">
                      //           <span className="">
                      //             Applications was sent <br />
                      //             successfully!
                      //           </span>
                      //           <div className="z-20 absolute right-0 top-0 bottom-0 w-[68px] rounded-r-lg	overflow-hidden">
                      //             <ProgressButton onClick={() => toast.dismiss(t.id)} />
                      //           </div>
                      //         </div>
                      //       );
                      //     },
                      //     {
                      //       icon: <CheckCircleIcon className={'text-green-500'} />,
                      //       duration: 4000,
                      //     },
                      //   );
                      // }}
                    />
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default SendApplicationModal;

const ProgressButton = ({ onClick }) => {
  const [testState, setTestState] = useState(false);
  useEffect(() => {
    setTestState(true);
  }, []);
  return (
    <button className="w-full h-full" onClick={onClick}>
      <div className="relative flex place-content-center w-full h-full ">
        <div
          className={'z-20 absolute left-0 right-0 bg-gray5  transition-[width] duration-[4000ms] ease-linear  '}
          style={{ height: '100%', width: testState ? '100%' : 0 }}
        />
        <div className="w-full h-full absolute z-40 flex items-center justify-center">
          <span className="text-white">Undo</span>
        </div>
      </div>
    </button>
  );
};

{
  /* <button
            type="button"
            onClick={() => {
              formik.values.contacts.push({
                id: uuid(),
                name: '',
                email: '',
              });
              formik.setValues(formik.values);
            }}
            className="flex items-center text-lightBlue3 text-sm font-medium leading-5 gap-[4px]">
            <AddCircleIcon className="h-4 w-4" />
            <span>Add another contact</span>
          </button> */
}
