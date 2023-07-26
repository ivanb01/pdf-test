import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import Overlay from 'components/shared/overlay';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Dropdown from 'components/shared/dropdown';
import {
  clientOptions,
  leadSourceOptions,
  othersOptions,
  phoneNumberRules,
  professionalsOptions,
} from 'global/variables';
import Input from 'components/shared/input';
import { updateContact, findContactByEmail } from 'api/contacts';
import { findTagsOption, phoneNumberInputFormat } from 'global/functions';
import * as Yup from 'yup';
import { setRefetchData } from 'store/global/slice';
import Radio from 'components/shared/radio';
import Button from 'components/shared/button';
import { contactTypes } from 'global/variables';
import StatusSelect from 'components/status-select';
import { statuses, vendorTypes } from 'global/variables';
import Chip from 'components/shared/chip';
import SimpleBar from 'simplebar-react';
import AI from '/public/images/ai.svg';
import newTab from '/public/images/new-tab.svg';
import info from '/public/images/info.svg';
import Delete from '@mui/icons-material/Delete';
import CheckCircle from '@mui/icons-material/CheckCircle';
import { useRouter } from 'next/router';

const ReviewAIContact = ({
  className,
  handleClose,
  title,
  client,
  afterUpdate,
  refetchData,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [updating, setUpdating] = useState(false);
  const [removing, setRemoving] = useState(false);

  const openedTab = useSelector((state) => state.global.openedTab);

  const [existingContactEmailError, setExistingContactEmailError] =
    useState('');
  const [existingContactEmail, setExistingContactEmail] = useState('');

  const options = [
    {
      id: 6,
      name: 'Renter',
    },
    {
      id: 4,
      name: 'Buyer',
    },
    {
      id: 5,
      name: 'Seller',
    },
    {
      id: 7,
      name: 'Landlord',
    },
  ];

  const formik = useFormik({
    initialValues: {
      first_name: client?.first_name,
      last_name: client?.last_name,
      email: client?.email,
      phone_number: client?.phone_number ? client?.phone_number : null,
      lead_source: client?.lead_source,
      tags: client?.tags,
      selectedContactCategory:
        client?.category_1 == 'Client'
          ? 0
          : client?.category_1 == 'Professional'
          ? 1
          : client?.category_1 == 'Other'
          ? 2
          : 3,
      selectedContactType: client?.category_id,
      selectedContactSubtype: '',
      selectedStatus: client?.status_id,
    },
    onSubmit: (values) => {
      console.log(values, client);
      handleSubmit(values);
    },
  });

  const { errors, touched, submitForm, isSubmitting } = formik;

  const removeFromCRM = async () => {
    setRemoving(true);
    try {
      await updateContact(client?.id, { approved_ai: true, category_id: 3 });
      handleClose();
    } catch (error) {
      console.log(error);
    } finally {
      setRemoving(false);
    }
  };

  const handleSubmit = async (values) => {
    // console.log(values);
    /*
     *How to mark the contact as approved:
     *Update contact and set approved_ai = True
     */
    setUpdating(true);
    try {
      let category_id = 1;
      let status_id = 1;

      if (values.selectedContactType == 8) {
        category_id = values.selectedContactSubtype;
      } else {
        category_id = values.selectedContactType;
      }
      if (values.selectedContactCategory == 3) {
        category_id = 1;
      }
      if (values.selectedContactCategory == 0) {
        status_id = values.selectedStatus;
      }

      let newData = {
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        phone_number: values.phone_number,
        category_id: category_id,
        status_id: status_id,
        approved_ai: true,
      };
      // if uncategorized then
      await updateContact(client?.id, newData);
      handleClose();
    } catch (error) {
      console.log(error);
    } finally {
      setUpdating(false);
    }
  };

  const handleChooseActivityType = (id) => {
    formik.setFieldValue('type_of_activity_id', id);
  };

  return (
    <Overlay
      handleCloseOverlay={handleClose}
      title={title}
      className={className}>
      <div className="flex min-h-[420px]">
        <div className="w-1/2 border-r border-borderColor">
          <SimpleBar autoHide={true} style={{ maxHeight: '420px' }}>
            <form className="p-6" onSubmit={formik.handleSubmit}>
              <div className="grid grid-cols-2 gap-4 mb-6">
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
                  readonly
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
              </div>
              <Radio
                secondary
                options={contactTypes}
                label="What kind of contact is this for you?"
                selectedOption={formik.values.selectedContactCategory}
                setSelectedOption={(e) => {
                  formik.setFieldValue('selectedContactCategory', e);
                  formik.setFieldValue('selectedContactType', '');
                  formik.setFieldValue('selectedContactSubtype', '');
                  formik.setFieldValue('selectedContactStatus', '');
                }}
                className="mb-6"
                name="category-of-contact"
                error={
                  errors.selectedContactCategory &&
                  touched.selectedContactCategory
                }
                errorText={errors.selectedContactCategory}
              />
              {formik.values.selectedContactCategory !== 3 && (
                <Radio
                  options={
                    formik.values.selectedContactCategory == 0
                      ? clientOptions
                      : formik.values.selectedContactCategory == 1
                      ? professionalsOptions
                      : othersOptions
                  }
                  label="What type?"
                  selectedOption={formik.values.selectedContactType}
                  setSelectedOption={(e) =>
                    formik.setFieldValue('selectedContactType', e)
                  }
                  className="mb-6"
                  name="type-of-contact"
                  error={
                    errors.selectedContactType && touched.selectedContactType
                  }
                  errorText={errors.selectedContactType}
                />
              )}

              {formik.values.selectedContactType == 8 ? (
                <>
                  <div className="text-gray7 mb-3 text-sm font-medium">
                    What kind of vendor?
                  </div>
                  <div className="flex flex-wrap">
                    {vendorTypes.map((type) => (
                      <Chip
                        selectedStatus={
                          type.id == formik.values.selectedContactSubtype
                        }
                        key={type.id}
                        label={type.name}
                        className="mr-3 mb-3"
                        onClick={() =>
                          formik.setFieldValue(
                            'selectedContactSubtype',
                            type.id,
                          )
                        }
                      />
                    ))}
                  </div>
                  {errors.selectedContactSubtype &&
                    touched.selectedContactSubtype &&
                    errors.selectedContactSubtype && (
                      <NotificationAlert className="mt-2 p-2" type={'error'}>
                        {errors.selectedContactSubtype}
                      </NotificationAlert>
                    )}
                </>
              ) : (
                formik.values.selectedContactCategory == 0 &&
                formik.values.selectedContactType && (
                  <StatusSelect
                    selectedStatus={formik.values.selectedStatus}
                    setSelectedStatus={(e) =>
                      formik.setFieldValue('selectedStatus', e)
                    }
                    label="In what stage of communication?"
                    statuses={statuses}
                    error={errors.selectedStatus && touched.selectedStatus}
                    errorText={errors.selectedStatus}
                  />
                )
              )}
            </form>
          </SimpleBar>
        </div>
        <div className="w-1/2">
          <SimpleBar autoHide={true} style={{ maxHeight: '400px' }}>
            <div className="p-6">
              <div>
                <div className="flex items-center mb-2">
                  <img src={AI.src} alt="" />
                  <span className="ml-1 text-gray-900 text-sm">
                    AI Smart Synced Contact
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-gray-900 font-medium text-lg max-w-[60%]">
                    {client.email_subject}
                  </div>
                  <div
                    onClick={() => router.push(client.email_link)}
                    className="cursor-pointer flex items-center text-sm text-gray-900 underline">
                    View the email source
                    <img src={newTab.src} alt="" className="ml-1" />
                  </div>
                </div>
              </div>
              <hr className="my-4" />
              <div className="text-gray-900 text-sm">
                {client.ai_email_summary}
              </div>
            </div>
          </SimpleBar>
        </div>
      </div>
      <div className="flex items-center justify-between py-4 px-6 space-x-2 fixed-categorize-menu">
        <div className="flex items-center text-sm text-gray-900">
          <img src={info.src} alt="" className="mr-1" />
          This contact was imported from Gmail by AI. Please review so you can
          start the communication.
        </div>
        <div className="flex">
          <Button
            className={`${
              removing && 'bg-red-500'
            } hover:bg-red-500 bg-red-50 text-red-500 hover:text-white active:bg-red-500`}
            leftIcon={<Delete />}
            coloredButton
            onClick={() => removeFromCRM()}
            loading={removing}>
            Delete From CRM
          </Button>
          {/* <button
            className="hover:bg-red-500 hover:text-white transition-all text-sm min-w-[185px] flex items-center justify-center mr-4 font-medium py-[6px] px-3 rounded-[4px] bg-red-50 text-red-500"
            onClick={() => removeFromCRM()}>
            {loading ? (
              <CircularProgress
                size={15}
                sx={{ color: 'white' }}></CircularProgress>
            ) : (
              <>
                <Delete /> <span className="ml-2">Delete from CRM</span>
              </>
            )}
          </button> */}
          <Button
            className={`${
              updating && 'bg-[#10B981]'
            } hover:bg-[#10B981] hover:text-white bg-green-50 text-[#10B981] active:bg-[#10B981]`}
            leftIcon={<CheckCircle />}
            coloredButton
            onClick={() => submitForm()}
            loading={updating}>
            Mark as Correct
          </Button>
          {/* <button
            // rightIcon={<ArrowRightIcon height={15} />}
            className="hover:bg-[#10B981] hover:text-white transition-all text-sm min-w-[185px] flex items-center justify-center font-medium py-[6px] px-3 rounded-[4px]"
            onClick={() => {
              submitForm();
            }}>
            <CheckCircle />
            <span className="ml-2">Mark as Correct</span>
          </button> */}
        </div>
      </div>
    </Overlay>
  );
};

export default ReviewAIContact;
