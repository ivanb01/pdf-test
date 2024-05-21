import { useFormik } from 'formik';
import { useState, useEffect, useRef } from 'react';
import Overlay from 'components/shared/overlay';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Dropdown from 'components/shared/dropdown';
import {
  clientOptions,
  leadSourceOptions,
  priorityOptions,
  multiselectOptionsClients,
  othersOptions,
  professionalsOptions,
} from 'global/variables';
import Input from 'components/shared/input';
import { findContactByEmail, updateContact } from 'api/contacts';
import { findTagsOption, formatDateLL } from 'global/functions';
import { setOpenedSubtab, setRefetchData, setRefetchPart } from 'store/global/slice';
import Radio from 'components/shared/radio';
import Button from 'components/shared/button';
import { contactTypes } from 'global/variables';
import StatusSelect from 'components/status-select';
import { statuses } from 'global/variables';
import Chip from 'components/shared/chip';
import SimpleBar from 'simplebar-react';
import AI from '/public/images/ai.svg';
import newTab from '/public/images/new-tab.svg';
import info from '/public/images/info.svg';
import Delete from '@mui/icons-material/Delete';
import CheckCircle from '@mui/icons-material/CheckCircle';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import DropdownWithSearch from '@components/dropdownWithSearch';
import Loader from '@components/shared/loader';
import NotificationAlert from '@components/shared/alert/notification-alert';
import GlobalAlert from '@components/shared/alert/global-alert';
import { unassignContactFromCampaign } from '@api/campaign';
import { updateContactLocally } from '@store/contacts/slice';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TextArea from '@components/shared/textarea';
import { Dropdown as SimpleDropdown } from 'react-multi-select-component';
import { setAIUnApprovedContacts, setTotal } from '@store/AIUnapproved/slice';
import * as contactServices from '@api/contacts';

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
  const vendorSubtypes = useSelector((state) => state.global.vendorSubtypes);

  const dispatch = useDispatch();
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [loadingEmail, setLoadingEmail] = useState(true);
  const [existingContactEmailError, setExistingContactEmailError] = useState(undefined);
  const [existingContactEmail, setExistingContactEmail] = useState('');
  const allContacts = useSelector((state) => state.contacts.allContacts.data);
  const openedTab = useSelector((state) => state.global.openedTab);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const initialClientCategoryId = useRef(client.category_1);
  const [vendorSubtypesFormatted, setVendorSubtypesFormatted] = useState();
  const [newLeadSource, setNewLeadSource] = useState(
    leadSourceOptions.map((option) => ({
      ...option,
      value: option.label,
    })),
  );
  const [newPriority, setPriority] = useState(
    priorityOptions.map((option) => ({
      ...option,
      value: option.label,
    })),
  );

  const isUnapprovedAI = !(
    ['GmailAI', 'Gmail', 'Smart Sync A.I.'].includes(client.import_source) &&
    client.approved_ai !== true &&
    !router.pathname.toLowerCase().includes('trash')
  );

  const getLookingAction = (category) => {
    const lowerCaseCategory = category?.toLowerCase();
    if (lowerCaseCategory === 'buyer') {
      return 1;
    } else if (lowerCaseCategory === 'landlord') {
      return 22;
    } else if (lowerCaseCategory === 'seller') {
      return 19;
    } else {
      return 2;
    }
  };
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
      summary: client?.summary ? client?.summary : client.ai_email_summary ? client.ai_email_summary : null,
      lead_source: client?.lead_source,
      priority: client?.priority,
      tags: client?.tags,
      selectedContactCategory:
        client?.category_1 == 'Client'
          ? 0
          : client?.category_1 == 'Professional'
            ? 1
            : client?.category_1 === 'Trash'
              ? 4
              : 2,
      selectedContactType: client?.category_id,
      selectedContactSubtype: client?.category_id,
      selectedStatus: client?.status_id,
    },
    onSubmit: async (values) => {
      if (formik.values.email !== formik.initialValues.email) {
        setUpdating(true);
        await userAlreadyExists(values.email)
          .then((response) => {
            if (response === undefined) {
              setExistingContactEmailError('');
              setExistingContactEmail('');
              handleSubmit(values);
            } else {
              setExistingContactEmailError('This email already exists!');
              setExistingContactEmail(values.email);
            }
          })
          .catch(() => {
            setExistingContactEmailError('');
            setExistingContactEmail('');
          })
          .finally(() => {
            setUpdating(false);
          });
      } else {
        handleSubmit(values).then(async () => {
          await contactServices
            .addContactLookingProperty(client?.id, { looking_action: getLookingAction(values?.category_2) })
            .then(() => {
              dispatch(setRefetchPart('looking-for'));
            });
        });
      }
    },
  });
  const ai_unapproved_contacts_redux = useSelector((state) => state.AIAUnapprovedContacts.ai_unapproved_contacts);

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
      if (!router.pathname.includes('ai-summary')) {
        if (afterSubmit) afterSubmit(client?.id, newData);
      }

      if (redirectAfterMoveToTrash) router.push('/contacts/clients');

      if (router.pathname.includes('ai-summary')) {
        const removeItemsFromTable = ai_unapproved_contacts_redux.filter((contact) => contact.id !== client.id);
        const totalContacts = ai_unapproved_contacts_redux.length;
        dispatch(setTotal(totalContacts - 1));
        dispatch(setAIUnApprovedContacts(removeItemsFromTable));
      }

      toast.custom(
        (t) => (
          <div
            className={`${
              t.visible ? 'animate-enter' : 'animate-leave'
            } shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 bg-gray-700 text-gray-50`}
          >
            <div className="flex gap-2 p-4 word-break items-center">
              <CheckCircleIcon className={'text-green-500'} />
              <h1 className={'text-sm leading-5 font-medium'}>
                {newData.first_name} {newData.last_name} moved to Trash
              </h1>
            </div>
            <div className="flex rounded-tr-lg rounded-br-lg p-4 bg-gray-600 text-gray-100">
              <button
                onClick={() => {
                  updateContact(client.id, {
                    ...newData,
                    approved_ai: false,
                  }).then(() => dispatch(setRefetchData(true)));
                  if (afterSubmit) {
                    dispatch(setTotal(ai_unapproved_contacts_redux.length));
                    afterSubmit(client?.id, { ...newData, approved_ai: false });
                  }
                  toast.dismiss(t.id);
                }}
                className="w-full border border-transparent rounded-none rounded-r-lg flex items-center justify-center text-sm leading-5 font-medium"
              >
                Undo
              </button>
            </div>
          </div>
        ),
        { duration: 0 },
      );
    } catch (error) {
      toast.error(error);
    }
  };

  const restoreContact = (newData) => {
    dispatch(updateContactLocally(newData));
    updateContact(newData.id, newData).catch(() => {
      toast.error('An error occurred, please refresh page');
    });
  };
  useEffect(() => {
    // This code will run whenever existingContactEmailError changes
    if (existingContactEmailError !== undefined && existingContactEmailError.length > 0) {
      return;
    }
    // Rest of your handleSubmit logic goes here
  }, [existingContactEmailError]);

  const handleSubmit = async (values) => {
    if (existingContactEmailError !== undefined && existingContactEmailError.length > 0) {
      return;
    }
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

    const category =
      values.selectedContactCategory === 0
        ? clientOptions.find((client) => client.id === category_id)?.name
        : values.selectedContactCategory === 1 && values.selectedContactType === 8
          ? vendorSubtypesFormatted?.find((vendor) => vendor.value == formik.values.selectedContactSubtype).label
          : client.category_2;

    let status_id = category_id == 3 ? 1 : values.selectedStatus;
    const baseData = {
      ...client,
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      phone_number: values.phone_number,
      category_id: category_id,
      status_id: status_id == '' ? 1 : status_id,
      category_2: category,
      summary: values.summary,
      category_1: contactTypes.find((type) => type.id == values.selectedContactCategory).name,
    };

    const newData = !isUnapprovedAI
      ? {
          ...baseData,
          approved_ai: true,
          lead_source: values.lead_source,
          tags: values.tags,
          priority: values.priority,
        }
      : {
          ...baseData,
          lead_source: values.lead_source,
          tags: values.tags,
          priority: values.priority,
        };

    try {
      let shouldExecuteRemainingCode = true;
      if (router.pathname.includes('trash')) {
        if (newData.category_id !== 3) {
          shouldExecuteRemainingCode = false;
          toast.custom((t) => (
            <div
              className={`${
                t.visible ? 'animate-enter' : 'animate-leave'
              } shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 bg-gray-700 text-gray-50`}
              style={{ width: '316px' }}
            >
              <div className="flex gap-2 p-4 ">
                <CheckCircleIcon className={'text-green-500'} />
                <h1 className={'text-sm leading-5 font-medium'}>
                  {newData.first_name} {newData.last_name}
                  {' restored in Contacts successfully!'}
                </h1>
              </div>
              <div className="flex rounded-tr-lg rounded-br-lg  p-4   bg-gray-600 text-gray-100">
                <button
                  onClick={() => {
                    restoreContact({ ...newData, category_id: 3 });
                    toast.dismiss(t.id);
                  }}
                  className="w-full border border-transparent rounded-none rounded-r-lg flex items-center justify-center text-sm leading-5 font-medium"
                >
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
          // unassignContactFromCampaign(client.campaign_id, client.id);
        }
      }
      if (newData.category_id === 3 && router.pathname.includes('details')) {
        // const lowercaseCategory = initialClientCategoryId.current.toLowerCase();
        // const targetCategory = ['trash', 'uncategorized'].includes(lowercaseCategory) && lowercaseCategory;
        // console.log(lowercaseCategory);
        router.push('/contacts/trash');
      }

      // make changes to global state
      dispatch(updateContactLocally(newData));
      setUpdating(false);
      handleClose();

      // function that runs conditionally on submit if prop is given

      // api call to update user
      updateContact(client?.id, newData).then(() => dispatch(setRefetchData(true)));
      if (afterSubmit) {
        afterSubmit(client.id, newData);
      }

      // toaster message
      if (router.pathname.toLowerCase().includes('details')) {
        dispatch(setOpenedSubtab(0));
      }

      if (router.pathname.includes('ai-summary')) {
        const removeItemsFromTable = ai_unapproved_contacts_redux.filter((contact) => contact.id !== client.id);
        const totalContacts = ai_unapproved_contacts_redux.length;
        dispatch(setTotal(totalContacts - 1));
        dispatch(setAIUnApprovedContacts(removeItemsFromTable));
      }
      if (shouldExecuteRemainingCode) {
        if (isUnapprovedAI) {
          toast.success('Changes have been saved successfully!');
        } else if (!isUnapprovedAI) {
          toast.custom(
            (t) => (
              <div
                className={`${
                  t.visible ? 'animate-enter' : 'animate-leave'
                } shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 bg-gray-700 text-gray-50`}
              >
                <div className="flex gap-2 p-4 word-break items-center">
                  <CheckCircleIcon className={'text-green-500'} />
                  <h1 className={'text-sm leading-5 font-medium'}>
                    {newData.first_name} {newData.last_name} "Marked as Correct"!
                  </h1>
                </div>
                <div className="flex rounded-tr-lg rounded-br-lg p-4 bg-gray-600 text-gray-100">
                  <button
                    onClick={() => {
                      toast.dismiss(t.id);
                      updateContact(client.id, {
                        ...newData,
                        approved_ai: false,
                      }).then(() => dispatch(setRefetchData(true)));
                      if (afterSubmit) {
                        dispatch(setTotal(ai_unapproved_contacts_redux.length));
                        afterSubmit(client.id, { ...newData, approved_ai: false });
                      }
                    }}
                    className="w-full border border-transparent rounded-none rounded-r-lg flex items-center justify-center text-sm leading-5 font-medium"
                  >
                    Undo
                  </button>
                </div>
              </div>
            ),
            { duration: 0 },
          );
        }
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleChooseActivityType = (id) => {
    formik.setFieldValue('type_of_activity_id', id);
  };

  useEffect(() => {
    if (formik.dirty || !isUnapprovedAI) {
      const { selectedContactCategory, selectedContactType, selectedContactSubtype, selectedStatus } = formik.values;
      if (selectedContactCategory == 0 && selectedContactType && selectedStatus) {
        //if client
        setSubmitDisabled(false);
      } else if (selectedContactCategory == 1 && selectedContactType) {
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
      } else if (selectedContactCategory == 2 && selectedContactType) {
        // if family
        setSubmitDisabled(false);
      } else if (selectedContactCategory == 3 || selectedContactCategory == 4) {
        setSubmitDisabled(false);
      } else {
        setSubmitDisabled(true);
      }
    } else {
      setSubmitDisabled(true);
    }
  }, [formik.values, formik.dirty]);

  useEffect(() => {
    if (formik.dirty) {
      if (
        formik.values.first_name.length === 0 ||
        formik.values.last_name.length === 0 ||
        formik.values.email.length === 0
      ) {
        setSubmitDisabled(true);
      }
    }
  }, [formik.values, formik.dirty]);

  useEffect(() => {
    setVendorSubtypesFormatted(
      vendorSubtypes?.map((item) => ({
        value: item.id,
        label: item.name,
      })),
    );
  }, [vendorSubtypes]);

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
            loading={removing}
          >
            Move to Trash
          </Button>
          <Button
            className={`${
              updating && 'bg-[#10B981]'
            } hover:bg-[#10B981] hover:text-white bg-green-50 text-[#10B981] active:bg-[#10B981]`}
            leftIcon={<CheckCircle />}
            coloredButton
            disabled={submitDisabled}
            onClick={() => submitForm()}
            loading={updating}
          >
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
          <Button disabled={submitDisabled} primary onClick={() => submitForm()} loading={updating}>
            {router.pathname.includes('/trash') ? 'Restore Contact' : 'Save Changes'}
          </Button>
        </div>
      </>
    );
  };

  useEffect(() => {
    if ('ai_email_summary' in client) {
      setLoadingEmail(false);
    }
  }, []);
  const userAlreadyExists = async (email) => {
    try {
      const { data } = await findContactByEmail({ email: email });
      return data;
    } catch (error) {}
  };

  return (
    <Overlay
      handleCloseOverlay={!hideCloseButton && handleClose}
      title={title}
      className={`${className} w-full lg:w-[1150px]`}
    >
      <div className="flex min-h-[500px] flex-col lg:flex-row">
        <div className={`w-full lg:w-1/2 border-r border-borderColor`}>
          {/*<SimpleBar autoHide={true} style={{ maxHeight: '500px' }}>*/}
          <form className="p-6 pt-0" onSubmit={formik.handleSubmit}>
            {client.campaign_name && (
              <GlobalAlert
                smallText
                noBorder
                rounded
                type="warning"
                className="mb-4"
                message={`This contact is already in "${client.campaign_name}" campaign. Changing type or status will remove it from the campaign. However, you can always assign it to another campaign inside of the client details page.`}
              />
            )}
            <div className="grid grid-cols-2 gap-4 gap-y-4 mb-6">
              <Input
                type="text"
                required
                label="First Name"
                id="first_name"
                className=""
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
                className=""
                onChange={formik.handleChange}
                value={formik.values.last_name}
                error={errors.last_name && touched.last_name}
                errorText={errors.last_name}
              />
              <Input
                required
                type="email"
                label="Email"
                id="email"
                className=""
                // readonly={isUnapprovedAI}
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
            <TextArea
              className="min-h-[100px] z-10  focus:ring-1 focus:ring-blue1 focus:border-blue1"
              id="summary"
              label="Summary"
              name={'summary'}
              link={client.email_link}
              handleChange={formik.handleChange}
              value={formik.values.summary}
            />
            <div className="text-xs mb-6 text-gray6">
              {client.created_at && (
                <div className="mt-2">
                  <span className="font-medium">Date imported:</span> {formatDateLL(client.created_at)}
                </div>
              )}
              <div className="flex items-center">
                {client.email_subject && (
                  <div className="mt-0.5">
                    <span className="font-medium">Subject: </span>
                    {client.email_subject}
                    <span />
                  </div>
                )}
              </div>
            </div>
            <div className={'grid grid-cols-2 gap-4 col-span-full'}>
              <div>
                <DropdownWithSearch
                  bottom={'-58px'}
                  options={newLeadSource}
                  label="Lead Source"
                  value={newLeadSource?.find((vendor) => vendor.value == formik.values.lead_source)}
                  onChange={(source) => formik.setValues({ ...formik.values, lead_source: source.label })}
                  placeHolder={formik.values.lead_source ? formik.values.lead_source : 'Choose'}
                  maxMenuHeight={200}
                />
              </div>
              <div>
                <DropdownWithSearch
                  bottom={'-58px'}
                  options={newPriority}
                  label="Priority"
                  value={newPriority?.find((vendor) => vendor.value == formik.values.priority)}
                  onChange={(el) => formik.setValues({ ...formik.values, priority: el.label })}
                  placeHolder={formik.values.priority ? formik.values.priority : 'Choose'}
                  maxMenuHeight={200}
                />
              </div>
            </div>
          </form>
          {/*</SimpleBar>*/}
        </div>
        <div className="w-full lg:w-1/2 relative">
          <SimpleBar className="max-h-full md:max-h-[510px]" autoHide={true} style={{ height: '100%' }}>
            <div className="p-6 pt-0">
              <Radio
                options={contactTypes}
                required
                label="What kind of contact is this for you?"
                selectedOption={formik.values.selectedContactCategory}
                setSelectedOption={(e) => {
                  formik.setFieldValue('selectedContactCategory', e);
                  if (e == 1) {
                    formik.setFieldValue('selectedContactType', 8);
                  } else {
                    formik.setFieldValue('selectedContactType', '');
                  }
                  formik.setFieldValue('selectedContactSubtype', '');
                  formik.setFieldValue('selectedStatus', '');
                }}
                ternary
                className="mb-6"
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
                  required
                  label="What type?"
                  selectedOption={
                    formik.values.selectedContactCategory == 1 &&
                    vendorSubtypes?.map((item) => item.id).includes(formik.values.selectedContactType)
                      ? 8
                      : formik.values.selectedContactType
                  }
                  setSelectedOption={(e) => {
                    formik.setFieldValue('selectedContactType', e);
                    formik.setFieldValue('selectedContactSubtype', '');
                  }}
                  className="mb-6"
                  name="type-of-contact"
                  error={errors.selectedContactType && touched.selectedContactType}
                  errorText={errors.selectedContactType}
                />
              )}
              {vendorSubtypes?.map((item) => item.id).includes(formik.values.selectedContactType) ||
              formik.values.selectedContactType == 8 ? (
                <>
                  {/* <div className="text-gray7 mb-3 text-sm font-medium">What kind of vendor?</div> */}

                  {/* <Chip
                        selectedStatus={type.id == formik.values.selectedContactSubtype}
                        key={type.id}
                        label={type.name}
                        className="mr-3 mb-3"
                        onClick={() => formik.setFieldValue('selectedContactSubtype', type.id)}
                      /> */}
                  <DropdownWithSearch
                    placeholder="Start typing to search or select one of the options"
                    value={vendorSubtypesFormatted?.find(
                      (vendor) => vendor.value == formik.values.selectedContactSubtype,
                    )}
                    options={vendorSubtypesFormatted}
                    typeOfContact={openedTab}
                    required
                    label="What kind of vendor is this for you"
                    onChange={(type) => {
                      formik.setFieldValue('selectedContactSubtype', type.value);
                      formik.setFieldValue('selectedContactType', type.value);
                    }}
                    maxMenuHeight={230}
                  />
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
                    required
                    setSelectedStatus={(e) => formik.setFieldValue('selectedStatus', e)}
                    label="In what stage of communication?"
                    statuses={statuses}
                    error={errors.selectedStatus && touched.selectedStatus}
                    errorText={errors.selectedStatus}
                  />
                )
              )}

              {/* <div>
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
                <div className="text-xs mt-2">Date Imported: {formatDateLL(client.created_at)}</div>
              </div>
              <hr className="my-4" />
              <div className="text-gray-900 text-sm">{client.summary ?? client.ai_email_summary}</div> */}
            </div>
          </SimpleBar>
        </div>
      </div>
      <div className="flex items-center justify-between py-4 px-6 space-x-2 fixed-categorize-menu">
        {!isUnapprovedAI ? reviewAIContactButtons() : reviewContactButtons()}
      </div>
    </Overlay>
  );
};

export default ReviewContact;
