import Button from 'components/shared/button';
import Avatar from 'components/shared/avatar';
import Radio from 'components/shared/radio';
import { useEffect, useState } from 'react';
import StatusSelect from 'components/status-select';
import MultiStepOverlay from 'components/shared/form/multistep-form';
import { useFormik } from 'formik';
import Input from 'components/shared/input';
import { useDispatch } from 'react-redux';
import { setOpenedTab, setOpenedSubtab } from 'store/global/slice';
// import * as contactServices from 'api/contacts';
import { addContact, getContacts, findContactByEmail } from 'api/contacts';
import { addContactLocally, setContacts } from 'store/contacts/slice';
import { findTagsOption, formatPhoneNumber } from 'global/functions';
import Dropdown from 'components/shared/dropdown';
import { leadSourceOptions, multiselectOptionsClients, phoneNumberRules } from 'global/variables';
import * as Yup from 'yup';
import DropdownWithSearch from '@components/dropdownWithSearch';
import { useSelector } from 'react-redux';
import Chip from 'components/shared/chip';
import NotificationAlert from 'components/shared/alert/notification-alert';
import { types } from 'global/variables';
import { setRefetchData } from 'store/global/slice';
import TextArea from '@components/shared/textarea';
import SimpleBar from 'simplebar-react';
import Overlay from '@components/shared/overlay';
import { ArrowRightIcon } from '@heroicons/react/outline';

const categoryIds = {
  'Add Client': JSON.stringify(types[0].types.map((type) => type.id)),
  'Add Professional': JSON.stringify(types[1].types.map((type) => type.id)),
};

const globalTabs = {
  'Add Client': 0,
  'Add Professional': 1,
};

const AddClientManuallyOverlay = ({ handleClose, title, options, statuses }) => {
  const vendorSubtypes = useSelector((state) => state.global.vendorSubtypes);

  const [vendorSubtypesFormatted, setVendorSubtypesFormatted] = useState();
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [existingContactEmailError, setExistingContactEmailError] = useState('');
  const [existingContactEmail, setExistingContactEmail] = useState('');
  const [newLeadSource, setNewLeadSource] = useState(
    leadSourceOptions.map((option) => ({
      ...option,
      value: option.label,
    })),
  );

  const openedTab = useSelector((state) => state.global.openedTab);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const AddContactSchema = Yup.object().shape({
    first_name: Yup.string().required('Field can not be empty'),
    last_name: Yup.string().required('Field can not be empty'),
    email: Yup.string().required('Field can not be empty').email('Not a proper email'),
    phone_number: Yup.string()
      .matches(phoneNumberRules, {
        message: 'Not a proper format phone number',
      })
      .nullable(),
    selectedContactType: Yup.string().required('Contact type is required'),
    selectedContactSubtype: Yup.string().when('selectedContactType', {
      is: (val) => val == 8,
      then: Yup.string().required('Contact subtype is required'),
      otherwise: Yup.string().notRequired(),
    }),
  });

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      summary: null,
      lead_source: '',
      import_source: 'Manually Added',
      tags: [],
      selectedContactType: '',
      selectedContactSubtype: '',
      selectedStatus: '',
    },
    validationSchema: AddContactSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      try {
        const { data } = await findContactByEmail({ email: values.email });
        if (data) {
          setExistingContactEmailError('This email already exists!');
          setExistingContactEmail(values.email);
        }
      } catch (error) {
        if (error?.response?.status === 404) {
          setExistingContactEmailError('');
          setExistingContactEmail('');
          addClient();
          handleClose();
        }
      }
      setSubmitting(false);
      setLoading(false);
    },
  });
  const { errors, touched } = formik;
  const openedSubtab = useSelector((state) => state.global.openedSubtab);

  useEffect(() => {
    console.log(formik.values);
  }, [formik.values]);
  const addClient = async () => {
    let subtabs = [[2, 3, 4, 5, 7, 16], [9, 10], [8], [11]];

    try {
      let type =
        formik.values.selectedContactType == 8
          ? formik.values.selectedContactSubtype
          : formik.values.selectedContactType;
      let status = formik.values.selectedStatus ? formik.values.selectedStatus : 1;

      const contactToAdd = {
        first_name: formik.values.first_name,
        last_name: formik.values.last_name,
        email: formik.values.email,
        phone_number: formik.values.phone_number,
        summary: formik.values.summary,
        lead_source: formik.values.lead_source,
        import_source: 'Manually Added',
        tags: formik.values.tags,
        category_id: type,
        status_id: status,
      };

      addContact(contactToAdd).then(() => dispatch(setRefetchData(true)));

      let subtabValue = 0;
      subtabs.forEach((subtab, index) => {
        console.log(subtab, index, formik.values.selectedStatus);
        if (subtab.includes(formik.values.selectedStatus)) {
          subtabValue = index;
        }
      });

      // dispatch(addContactLocally(contactToAdd));
      dispatch(setOpenedTab(globalTabs[title]));
      if (openedSubtab === -1) {
        return;
      } else if (formik.values.selectedContactType === 8 && formik.values.selectedContactType === 19) {
        setOpenedSubtab(0);
      } else if (formik.values.selectedContactType === 12) {
        dispatch(setOpenedSubtab(1));
      } else if (formik.values.selectedContactType === 9) {
        dispatch(setOpenedSubtab(2));
      } else {
        dispatch(setOpenedSubtab(subtabValue));
      }
      setTimeout(() => {
        handleClose();
      }, 1500);
    } catch (error) {
      handleClose();
    }
  };

  useEffect(() => {
    // if (formik.dirty || !isUnapprovedAI) {
    let isClient = title == 'Add Client' ? true : false;
    const { selectedContactType, selectedContactSubtype, selectedStatus } = formik.values;
    if (isClient && selectedContactType && selectedStatus) {
      //if client
      setSubmitDisabled(false);
    } else if (!isClient && selectedContactType) {
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
    } else {
      setSubmitDisabled(true);
    }
    // } else {
    //   setSubmitDisabled(true);
    // }
  }, [formik.values]);

  useEffect(() => {
    setVendorSubtypesFormatted(
      vendorSubtypes?.map((item) => ({
        value: item.id,
        label: item.name,
      })),
    );
  }, [vendorSubtypes]);

  return (
    <Overlay handleCloseOverlay={handleClose} title={title} className={`w-[1150px]`}>
      <div className="flex min-h-[500px]">
        <SimpleBar autoHide={true} style={{ maxHeight: '500px', width: '100%', height: '100%' }}>
          <form onSubmit={formik.handleSubmit} className="grid grid-cols-2 gap-4 mb-6 p-6 pt-0 flex-1">
            <Input
              type="text"
              required
              label="First Name"
              id="first_name"
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
              onChange={formik.handleChange}
              value={formik.values.last_name}
              error={errors.last_name && touched.last_name}
              errorText={errors.last_name}
            />
            <Input
              type="email"
              label="Email"
              required
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
              errorText={errors.email ? errors.email : existingContactEmailError ? existingContactEmailError : null}
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
            <TextArea
              className="min-h-[100px] z-10  focus:ring-1 focus:ring-blue1 focus:border-blue1"
              id="summary"
              label="Summary"
              name={'summary'}
              handleChange={formik.handleChange}
              value={formik.values.summary}
            />
            <div className={'grid grid-cols-2 gap-4 col-span-full'}>
              <div>
                <DropdownWithSearch
                  bottom={'-58px'}
                  options={newLeadSource}
                  label="Lead Source"
                  value={newLeadSource?.find((vendor) => vendor.value == formik.values.lead_source)}
                  onChange={(source) => formik.setValues({ ...formik.values, ['lead_source']: source.label })}
                  placeHolder={formik.values.lead_source ? formik.values.lead_source : 'Choose'}
                  maxMenuHeight={200}
                />
              </div>
              <div className={`${!isMenuOpen ? 'mb-0' : 'mb-[120px]'}`}>
                <DropdownWithSearch
                  onMenuOpen={() => setIsMenuOpen(true)}
                  isMulti
                  bottom={'-59px'}
                  maxMenuHeight={200}
                  onMenuClose={() => setIsMenuOpen(false)}
                  options={multiselectOptionsClients}
                  value={findTagsOption(formik.values.tags)}
                  onChange={(choice) => {
                    formik.setFieldValue(
                      'tags',
                      choice.map((el) => el.label),
                    );
                  }}
                  label="Priority"
                />
              </div>
            </div>
          </form>
        </SimpleBar>

        <div className={'w-[1px] h-[500px] border-r border-gray-200'} />
        <SimpleBar autoHide={true} style={{ maxHeight: '500px', width: '100%', height: '100%' }}>
          <div className={'p-6 pt-0 flex-1'}>
            <Radio
              required
              options={options}
              className="mb-4"
              label="What kind of contact is this for you?"
              selectedOption={formik.values.selectedContactType}
              setSelectedOption={(e) => formik.setValues({ ...formik.values, selectedContactType: e })}
              error={errors.selectedContactType && touched.selectedContactType}
              errorText={errors.selectedContactType}
            />
            {formik.values.selectedContactType == 8 ? (
              <div className={'pb-[300px]'}>
                <DropdownWithSearch
                  value={vendorSubtypesFormatted?.find(
                    (vendor) => vendor.value == formik.values.selectedContactSubtype,
                  )}
                  placeholder="Start typing to search or select one of the options"
                  options={vendorSubtypesFormatted}
                  typeOfContact={openedTab}
                  required
                  label="What kind of vendor is this for you?"
                  onChange={(type) => {
                    formik.setFieldValue('selectedContactSubtype', type.value);
                  }}
                  maxMenuHeight={230}
                />
                {errors.selectedContactSubtype && touched.selectedContactSubtype && errors.selectedContactSubtype && (
                  <NotificationAlert className="mt-2 p-2" type={'error'}>
                    {errors.selectedContactSubtype}
                  </NotificationAlert>
                )}
              </div>
            ) : (
              ![8, 9, 12, 15].includes(formik.values.selectedContactType) &&
              formik.values.selectedContactType && (
                <div className={'mt-2'}>
                  <StatusSelect
                    selectedStatus={formik.values.selectedStatus}
                    setSelectedStatus={(e) => formik.setFieldValue('selectedStatus', e)}
                    required
                    label="In what stage of communication?"
                    statuses={statuses}
                    error={errors.selectedStatus && touched.selectedStatus}
                    errorText={errors.selectedStatus}
                  />
                </div>
              )
            )}
          </div>
        </SimpleBar>
      </div>
      <div className="flex items-center justify-end py-4 px-6 space-x-2 fixed-categorize-menu">
        <Button label="Cancel" white onClick={handleClose}></Button>
        <Button
          label="Save Changes"
          loading={loading}
          disabled={submitDisabled}
          // rightIcon={<ArrowRightIcon height={15} />}
          onClick={() => {
            setLoading(false);

            formik.submitForm();
          }}></Button>
      </div>
    </Overlay>
  );
};

export default AddClientManuallyOverlay;
