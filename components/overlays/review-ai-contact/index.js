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
import AI from 'public/images/ai.svg';
import newTab from 'public/images/new-tab.svg';
import info from 'public/images/info.svg';
import Delete from '@mui/icons-material/Delete';
import CheckCircle from '@mui/icons-material/CheckCircle';

const ReviewAIContact = ({
  className,
  handleClose,
  title,
  client,
  afterUpdate,
  refetchData,
}) => {
  const dispatch = useDispatch();

  const [loadingButton, setLoadingButton] = useState(false);

  const openedTab = useSelector((state) => state.global.openedTab);

  const [existingContactEmailError, setExistingContactEmailError] =
    useState('');
  const [existingContactEmail, setExistingContactEmail] = useState('');
  // const resetForm = () => {
  //   handleClose();
  // };

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
          : 2,
      selectedContactType: client?.category_id,
      selectedContactSubtype: '',
      selectedStatus: client?.status_id,
    },
    onSubmit: (values) => {
      console.log(values, client);
      // handleSubmit();
    },
  });

  const { errors, touched, submitForm, isSubmitting } = formik;

  const handleSubmit = async (values) => {
    setLoadingButton(true);
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
  };

  // const editClient = async (values) => {
  //   try {
  //     await updateContact(client?.id, values);
  //     console.log(values, 'edit contact', client?.id);
  //     dispatch(setRefetchData(true));
  //     handleClose();
  //   } catch (error) {
  //     console.log(error);
  //     handleClose();
  //   }
  // };

  const handleChooseActivityType = (id) => {
    formik.setFieldValue('type_of_activity_id', id);
  };

  return (
    <Overlay
      handleCloseOverlay={handleClose}
      title={title}
      className={className}
    >
      <div className="flex">
        <div className="w-1/2 border-r border-borderColor">
          <SimpleBar autoHide={true} style={{ maxHeight: '400px' }}>
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
                            type.id
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
                ![2, 3, 8, 12, 13, 14, 15].includes(
                  formik.values.selectedContactType
                ) &&
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
                  <div className="text-gray-900 font-medium text-lg">
                    Rental Property Availability
                  </div>
                  <div className="flex items-center text-sm text-gray-900 underline">
                    View the email source
                    <img src={newTab.src} alt="" className="ml-1" />
                  </div>
                </div>
              </div>
              <hr className="my-4" />
              <div className="text-gray-900 text-sm">
                Dear [Landlord's Name],
                <br />
                <br />
                I hope this email finds you well. My name is [Your Name], and I
                am writing to express my interest in the rental property listed
                at [Property Address]. After browsing through various listings,
                your property stood out to me, and I believe it could be an
                ideal place for me to call home.
                <br />
                I would like to gather some additional information about the
                property, as well as inquire about its availability. Firstly,
                could you kindly confirm if the property is still available for
                rent? If so, I would greatly appreciate any details you could
                provide regarding the terms of the lease, including the monthly
                rental amount, security deposit requirements, and any other
                associated costs.
                <br />
                <br />
                Furthermore, I am interested in learning more about the property
                itself. Could you please provide a brief description of its
                features, such as the number of bedrooms and bathrooms, square
                footage, and any notable amenities? Additionally, I would be
                grateful if you could share any photographs or floor plans to
                help me visualize the layout. As a responsible tenant, I believe
                in maintaining a clean and well-maintained living space. I would
                like to inquire about the utility arrangements for the property.
                Are the utilities included in the rental price, or would I be
                responsible for arranging and covering these costs separately?
                Moreover, I would like to know if there are any specific
                requirements or criteria that you consider when selecting
                tenants. I am a reliable and respectful individual with a stable
                income, and I can provide references upon request. Please let me
                know if there are any documents or forms I need to complete as
                part of the application process. Finally, I would be grateful if
                you could inform me of the preferred method and timing for
                viewing the property. I would love the opportunity to schedule a
                visit to see the space firsthand and further discuss the rental
                details. Thank you for considering my inquiry. I look forward to
                hearing from you and potentially taking the next steps in
                renting this property. Should you require any additional
                information or have any questions, please do not hesitate to
                reach me at [Your Phone Number] or [Your Email Address]. <br />
                <br />
                Sincerely, <br />
                [Your Name]
                <br /> [Your Contact Information]
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
          <button
            className="hover:bg-red-500 hover:text-white transition-all text-sm min-w-[185px] flex items-center justify-center mr-4 font-medium py-[6px] px-3 rounded-[4px] bg-red-50 text-red-500"
            onClick={handleClose}
          >
            <Delete /> <span className="ml-2">Delete from CRM</span>
          </button>
          <button
            // rightIcon={<ArrowRightIcon height={15} />}
            className="hover:bg-[#10B981] hover:text-white transition-all text-sm min-w-[185px] flex items-center justify-center font-medium py-[6px] px-3 rounded-[4px] bg-green-50 text-[#10B981]"
            onClick={() => {
              setLoadingButton(true);
              submitForm();
            }}
          >
            <CheckCircle />
            <span className="ml-2">Mark as Correct</span>
          </button>
        </div>
      </div>
    </Overlay>
  );
};

export default ReviewAIContact;
