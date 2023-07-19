import Dropdown from 'components/shared/dropdown';
import Button from 'components/shared/button';
import Avatar from 'components/shared/avatar';
import { inputs, steps } from './list';
import Radio from 'components/shared/radio';
import StatusSelect from 'components/status-select';
import MultiStepOverlay from 'components/shared/form/multistep-form';
import { leadSourceOptions, phoneNumberRules } from 'global/variables';
import { useFormik } from 'formik';
import Input from 'components/shared/input';
import { useState, useEffect } from 'react';
// import * as contactServices from 'api/contacts';
import { updateContact, findContactByEmail } from 'api/contacts';
import Overlay from 'components/shared/overlay';
import TagsInput from 'components/tagsInput';
import { findTagsOption, phoneNumberInputFormat } from 'global/functions';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { setRefetchData } from 'store/global/slice';

const EditContactOverlay = ({ className, handleClose, title, client }) => {
  const steps = [
    {
      id: 1,
      name: 'General Information',
      href: '#',
      status: 'current',
    },
    // { id: 2, name: 'Type and Status', href: '#' },
  ];

  const dispatch = useDispatch();

  const [existingContactEmailError, setExistingContactEmailError] =
    useState('');
  const [existingContactEmail, setExistingContactEmail] = useState('');

  const [loadingButton, setLoadingButton] = useState(false);

  const openedTab = useSelector((state) => state.global.openedTab);

  // const resetForm = () => {
  //   handleClose();
  // };

  const AddContactSchema = Yup.object().shape({
    first_name: Yup.string().required('Field can not be empty'),
    last_name: Yup.string().required('Field can not be empty'),
    email: Yup.string()
      .required('Field can not be empty')
      .email('Not a proper email'),
    phone_number: Yup.string()
      // .required('Field can not be empty')
      .matches(phoneNumberRules, {
        message: 'Not a proper format phone number',
      })
      .nullable(),
  });

  //* FORMIK *//
  const formik = useFormik({
    initialValues: {
      first_name: client?.first_name,
      last_name: client?.last_name,
      email: client?.email,
      phone_number: client?.phone_number ? client?.phone_number : null,
      lead_source: client?.lead_source,
      tags: client?.tags,
    },
    validationSchema: AddContactSchema,
    onSubmit: async (values, { setSubmitting }) => {
      // await editClient(values);
      // setSubmitting(false);
      try {
        if (client?.email === values.email) {
          await editClient(values);
        } else {
          const { data } = await findContactByEmail({ email: values.email });
          if (data) {
            setExistingContactEmailError('This email already exists!');
            setExistingContactEmail(values.email);
          }
        }
      } catch (error) {
        console.log(error);
        if (error.response.status === 404) {
          setExistingContactEmailError('');
          setExistingContactEmail('');
          await editClient(values);
        }
      }
      setSubmitting(false);
    },
  });

  const { errors, touched, submitForm, isSubmitting } = formik;

  useEffect(() => {
    setLoadingButton(isSubmitting);
  }, [isSubmitting]);

  const editClient = async (values) => {
    try {
      await updateContact(client?.id, values);
      console.log(values, 'edit contact', client?.id);
      dispatch(setRefetchData(true));
      handleClose();
    } catch (error) {
      console.log(error);
      handleClose();
    }
  };
  return (
    <Overlay
      // className="w-[632px]"
      handleCloseOverlay={handleClose}
      title={title}
      className={className}
    >
      <div className="p-5">
        {/* <div className="flex items-center mb-6">
          <Avatar size="large" className="mr-4" />
          <Button white label="Edit" />
        </div> */}
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-12">
            <Input
              type="text"
              label="First Name"
              id="first_name"
              className=""
              onChange={formik.handleChange}
              value={formik.values.first_name}
              error={errors.first_name && touched.first_name}
              errorText={errors.first_name}
            />
            <Input
              type="text"
              label="Last Name"
              id="last_name"
              className=""
              onChange={formik.handleChange}
              value={formik.values.last_name}
              error={errors.last_name && touched.last_name}
              errorText={errors.last_name}
            />
            <Input
              type="email"
              label="Email"
              id="email"
              className=""
              // onChange={formik.handleChange}
              onChange={(e) => {
                if (existingContactEmail !== e.target.value) {
                  setExistingContactEmailError('');
                }
                formik.setFieldValue('email', e.target.value);
              }}
              value={formik.values.email}
              error={
                (errors.email && touched.email) || existingContactEmailError
              }
              errorText={
                errors.email
                  ? errors.email
                  : existingContactEmailError
                  ? existingContactEmailError
                  : null
              }
            />
            <Input
              type="phone_number"
              label="Phone"
              id="phone_number"
              onChange={(val) => formik.setFieldValue('phone_number', val)}
              value={formik.values.phone_number}
              error={errors.phone_number && touched.phone_number}
              errorText={errors.phone_number}
            />
            <Dropdown
              label="Lead Source"
              activeIcon={false}
              options={leadSourceOptions}
              className="col-span-2"
              handleSelect={(source) =>
                (formik.values.lead_source = source.name)
              }
              initialSelect={formik.values.lead_source}
              placeHolder={
                formik.values.lead_source ? formik.values.lead_source : 'Choose'
              }
            />
            <TagsInput
              label="Tags"
              typeOfContact={openedTab}
              value={findTagsOption(formik.values.tags, openedTab)}
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
      <div className="flex items-center justify-between py-4 px-6 space-x-2 fixed-categorize-menu">
        <div></div>
        <div>
          <Button
            className="mr-3"
            label="Cancel"
            white
            onClick={handleClose}
          ></Button>
          <Button
            label="Save"
            loading={loadingButton}
            // rightIcon={<ArrowRightIcon height={15} />}
            onClick={() => {
              setLoadingButton(true);
              submitForm();
            }}
          ></Button>
        </div>
      </div>
    </Overlay>
  );
};

export default EditContactOverlay;
