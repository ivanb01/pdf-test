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
import toast from 'react-hot-toast';
import TagsInput from '@components/tagsInput';
import { getAIData } from '@api/aiSmartSync';
import Loader from '@components/shared/loader';
import Alert from '@components/shared/alert';
import NotificationAlert from '@components/shared/alert/notification-alert';
import GlobalAlert from '@components/shared/alert/global-alert';
import { unassignContactFromCampaign } from '@api/campaign';
import { updateContactLocally } from '@store/contacts/slice';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { setAllContacts } from 'store/contacts/slice';

const ReviewContact = ({
  className,
  handleClose,
  showToast,
  redirectAfterMoveToTrash,
  title,
  client,
  setClient,
  afterUpdate,
  refetchData,
  hideCloseButton,
  afterSubmit,
}) => {
  const isUnapprovedAI = client.import_source == 'GmailAI' && client.approved_ai != true;
  const dispatch = useDispatch();
  const router = useRouter();

  const [updating, setUpdating] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [loadingEmail, setLoadingEmail] = useState(true);
  const [existingContactEmailError, setExistingContactEmailError] = useState('');
  const [existingContactEmail, setExistingContactEmail] = useState('');
  const allContacts = useSelector((state) => state.contacts.allContacts.data);
  const openedTab = useSelector((state) => state.global.openedTab);

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
          : client?.category_1 === 'Trash'
          ? 4
          : 3,
      selectedContactType: client?.category_id,
      selectedContactSubtype: client?.category_id,
      selectedStatus: client?.status_id,
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const { errors, touched, submitForm, isSubmitting } = formik;

  const removeFromCRM = async () => {
    setRemoving(true);
    try {
      let newData = { ...client, approved_ai: true, category_id: 3 };

      // do changes locally, remove button loader, close
      dispatch(updateContactLocally(newData));
      setRemoving(false);
      handleClose();

      // make api call in the background to update contact
      updateContact(client.id, newData).then(() => dispatch(setRefetchData(true)));
      // if aftersubmit prop is given, call the function
      if (afterSubmit) afterSubmit(client?.id, newData);

      // if redirectAfterMoveToTrash prop is given redirect
      if (redirectAfterMoveToTrash) router.push('/contacts/clients');

      // show toaster message
      toast.success(`${newData.first_name + ' ' + newData.last_name} moved to Trash`);
    } catch (error) {
      toast.error(error);
    }
  };
  const restoreContact = (newData) => {
    const updatedData = allContacts.map((item) => {
      if (item.id === newData.id) {
        return newData;
      } else {
        return item;
      }
    });
    setAllContacts(updatedData);
    updateContact(newData.id, newData).catch(() => {
      toast.error('An error occurred, please refresh page');
    });
  };

  const handleSubmit = async (values) => {
    setUpdating(true);

    let category_id;
    if (values.selectedContactCategory === 3) {
      category_id = 1;
    } else if (values.selectedContactCategory === 4) {
      category_id = 3;
    } else if (values.selectedContactType === 8) {
      category_id = values.selectedContactSubtype;
    } else {
      category_id = values.selectedContactType;
    }

    const status_id = values.selectedContactCategory === 0 ? values.selectedStatus : 1;

    const category =
      values.selectedContactCategory === 0
        ? clientOptions.find((client) => client.id === category_id).name
        : client.category_2;

    const baseData = {
      ...client,
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      phone_number: values.phone_number,
      category_id: category_id,
      status_id: status_id,
      category_2: category,
      category_1: contactTypes.find((type) => type.id == values.selectedContactCategory).name,
    };

    const newData = isUnapprovedAI
      ? {
          ...baseData,
          approved_ai: true,
        }
      : {
          ...baseData,
          lead_source: values.lead_source,
          tags: values.tags,
        };

    try {
      let shouldExecuteRemainingCode = true;
      let action = isUnapprovedAI ? 'marked as correct' : 'updated successfully';
      if (router.pathname.includes('trash')) {
        if (newData.category_id !== 3) {
          toast.custom((t) => (
            <div
              className={`${
                t.visible ? 'animate-enter' : 'animate-leave'
              } shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 bg-gray-700 text-gray-50`}
              style={{ width: '316px' }}>
              <div className="flex gap-2 p-4 ">
                <CheckCircleIcon className={'text-green-500'} />
                <h1 className={'text-sm leading-5 font-medium'}>
                  {newData.first_name} {newData.last_name}
                  {' restored successfully!'}
                </h1>
              </div>
              <div className="flex rounded-tr-lg rounded-br-lg  p-4   bg-gray-600 text-gray-100">
                <button
                  onClick={() => {
                    restoreContact({ ...newData, category_id: 3 });
                    toast.dismiss(t.id);
                  }}
                  className="w-full border border-transparent rounded-none rounded-r-lg flex items-center justify-center text-sm leading-5 font-medium font-medium">
                  Undo
                </button>
              </div>
            </div>
          ));
        }
      }
      if (client.category_id != category_id || client.status_id != status_id) {
        // remove from campaign if changing category or status or if changed to TRASH
        if (client.campaign_id) {
          unassignContactFromCampaign(client.campaign_id, client.id);
        }
      }

      // make changes to global state
      dispatch(updateContactLocally(newData));
      setUpdating(false);
      handleClose();

      // function that runs conditionally on submit if prop is given
      if (afterSubmit) {
        afterSubmit(client?.id, newData);
      }

      // api call to update user
      updateContact(client?.id, newData).then(() => dispatch(setRefetchData(true)));

      // toaster message

      if (shouldExecuteRemainingCode) {
        toast.success(`${newData.first_name + ' ' + newData.last_name} ${action}`);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleChooseActivityType = (id) => {
    formik.setFieldValue('type_of_activity_id', id);
  };

  const reviewAIContactButtons = () => {
    return (
      <>
        <div className="flex items-center text-sm text-gray-900">
          <img src={info.src} alt="" className="mr-1" />
          This contact was imported from Gmail by AI. Please review so you can start the communication.
        </div>
        <div className="flex">
          <Button
            className={`${
              removing && 'bg-red-500'
            } hover:bg-red-500 bg-red-50 text-red-500 hover:text-white active:bg-red-500 mr-4`}
            leftIcon={<Delete />}
            coloredButton
            onClick={() => removeFromCRM()}
            loading={removing}>
            Move to Trash
          </Button>
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
        </div>
      </>
    );
  };

  const reviewContactButtons = () => {
    return (
      <>
        <div className="flex items-center text-sm text-gray-900"></div>
        <div className="flex">
          <Button className={` mr-4`} white onClick={() => handleClose()}>
            Cancel
          </Button>
          <Button primary onClick={() => submitForm()} loading={updating}>
            {router.pathname.includes('/trash') ? 'Restore Client' : 'Save Changes'}
          </Button>
        </div>
      </>
    );
  };

  const fetchAISummary = async () => {
    try {
      const { data } = await getAIData(client.id);
      setClient({
        ...client,
        ai_email_summary: data.ai_email_summary,
        email_link: data.email_link,
        email_subject: data.email_subject,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingEmail(false);
    }
  };

  useEffect(() => {
    if ('ai_email_summary' in client) {
      setLoadingEmail(false);
    } else {
      if (isUnapprovedAI) {
        fetchAISummary();
      }
    }
  }, []);

  return (
    <Overlay
      handleCloseOverlay={!hideCloseButton && handleClose}
      title={title}
      className={`${className} ${!isUnapprovedAI && 'w-[635px]'}`}>
      <div className="flex min-h-[420px]">
        <div className={`${isUnapprovedAI ? 'w-1/2 border-r border-borderColor' : 'w-full'}`}>
          <SimpleBar autoHide={true} style={{ maxHeight: '420px' }}>
            <form className="p-6 pt-0" onSubmit={formik.handleSubmit}>
              {client.campaign_name && (
                <GlobalAlert
                  smallText
                  noBorder
                  rounded
                  type="warning"
                  message={`This contact is already in "${client.campaign_name}" campaign. Changing type or status will remove it from the campaign. However, you can always assign it to another campaign inside of the client details page.`}
                />
              )}
              <div className="grid grid-cols-2 gap-4 gap-y-4 mb-6 mt-6">
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
                  error={(errors.email && touched.email) || existingContactEmailError}
                  errorText={errors.email ? errors.email : existingContactEmailError ? existingContactEmailError : null}
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
              {!isUnapprovedAI && (
                <>
                  <Dropdown
                    label="Lead Source"
                    activeIcon={false}
                    options={leadSourceOptions}
                    className="mb-6"
                    handleSelect={(source) => (formik.values.lead_source = source.name)}
                    initialSelect={formik.values.lead_source}
                    placeHolder={formik.values.lead_source ? formik.values.lead_source : 'Choose'}
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
                </>
              )}
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
                className="mb-6 mt-6"
                name="category-of-contact"
                error={errors.selectedContactCategory && touched.selectedContactCategory}
                errorText={errors.selectedContactCategory}
              />
              {![3, 4].includes(formik.values.selectedContactCategory) && (
                <Radio
                  options={
                    formik.values.selectedContactCategory == 0
                      ? clientOptions
                      : formik.values.selectedContactCategory == 1
                      ? professionalsOptions
                      : othersOptions
                  }
                  label="What type?"
                  selectedOption={
                    formik.values.selectedContactCategory == 1 &&
                    [8, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26].includes(formik.values.selectedContactType)
                      ? 8
                      : formik.values.selectedContactType
                  }
                  setSelectedOption={(e) => formik.setFieldValue('selectedContactType', e)}
                  className="mb-6"
                  name="type-of-contact"
                  error={errors.selectedContactType && touched.selectedContactType}
                  errorText={errors.selectedContactType}
                />
              )}
              {[8, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26].includes(formik.values.selectedContactType) ? (
                <>
                  <div className="text-gray7 mb-3 text-sm font-medium">What kind of vendor?</div>
                  <div className="flex flex-wrap">
                    {vendorTypes.map((type) => (
                      <Chip
                        selectedStatus={type.id == formik.values.selectedContactSubtype}
                        key={type.id}
                        label={type.name}
                        className="mr-3 mb-3"
                        onClick={() => formik.setFieldValue('selectedContactSubtype', type.id)}
                      />
                    ))}
                  </div>
                  {errors.selectedContactSubtype && touched.selectedContactSubtype && errors.selectedContactSubtype && (
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
                    setSelectedStatus={(e) => formik.setFieldValue('selectedStatus', e)}
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
        {isUnapprovedAI && (
          <div className="w-1/2 relative">
            {loadingEmail ? (
              <Loader />
            ) : (
              <SimpleBar autoHide={true} style={{ maxHeight: '400px' }}>
                <div className="p-6">
                  <div>
                    <div className="flex items-center mb-2">
                      <img src={AI.src} alt="" />
                      <span className="ml-1 text-gray-900 text-sm">AI Smart Synced Contact</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-gray-900 font-medium text-lg max-w-[60%]">{client.email_subject}</div>
                      <a
                        target="_blank"
                        href={client.email_link}
                        className="cursor-pointer flex items-center text-sm text-gray-900 underline"
                        rel="noreferrer">
                        View the email source
                        <img src={newTab.src} alt="" className="ml-1" />
                      </a>
                    </div>
                  </div>
                  <hr className="my-4" />
                  <div className="text-gray-900 text-sm">{client.ai_email_summary}</div>
                </div>
              </SimpleBar>
            )}
          </div>
        )}
      </div>
      <div className="flex items-center justify-between py-4 px-6 space-x-2 fixed-categorize-menu">
        {isUnapprovedAI ? reviewAIContactButtons() : reviewContactButtons()}
      </div>
    </Overlay>
  );
};

export default ReviewContact;
