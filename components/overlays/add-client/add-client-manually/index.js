import Button from 'components/shared/button';
import Avatar from 'components/shared/avatar';
import Radio from 'components/shared/radio';
import { useState } from 'react';
import StatusSelect from 'components/status-select';
import MultiStepOverlay from 'components/shared/form/multistep-form';
import { useFormik } from 'formik';
import Input from 'components/shared/input';
// import { addContact } from 'store/contact/actions';
import { useDispatch } from 'react-redux';
import { setOpenedTab, setOpenedSubtab } from 'store/global/slice';
import * as contactServices from 'api/contacts';
import { setContacts } from 'store/contacts/slice';
import { clientStatuses } from 'global/variables';
import { formatPhoneNumber } from 'global/functions';
import Dropdown from 'components/shared/dropdown';
import { importSourceOptions } from 'global/variables';
import ChipInput from 'components/shared/input/ChipInput';

const categoryIds = {
  'Add Client': '4,5,6,7',
  'Add Professional': '8,9,12',
};

const globalTabs = {
  'Add Client': 0,
  'Add Professional': 1,
};

const AddClientManuallyOverlay = ({
  handleClose,
  title,
  options,
  statuses,
}) => {
  const steps = [
    {
      id: 1,
      name: 'General Information',
      href: '#',
      status: 'current',
    },
    { id: 2, name: 'Type and Status', href: '#' },
  ];

  const resetForm = () => {
    handleClose();
  };

  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const [selectedContactType, setSelectedContactType] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [globalSubTab, setGlobalSubTab] = useState(0);

  const dispatch = useDispatch();

  //* FORMIK *//
  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      import_source: '',
      tags: [],
    },
  });

  const removeChip = (tagToRemove) => {
    let newArray = formik.values.tags.filter((tag) => tag !== tagToRemove);
    formik.setFieldValue('tags', newArray);
  };
  const addChip = (tagToAdd) => {
    console.log(tagToAdd);
    let newArray = formik.values.tags;
    newArray.push(tagToAdd);
    console.log('newTags', newArray);
    formik.setFieldValue('tags', newArray);
  };

  const addClient = async () => {
    let subtabs = [[2, 3, 4, 5, 7, 16], [9, 10], [8], [11]];

    try {
      const contactToAdd = {
        ...formik.values,
        category_id: selectedContactType,
        status_id: selectedStatus,
      };
      const res = await contactServices.addContact(contactToAdd);
      const { data } = await contactServices.getContacts(categoryIds[title]);

      let subtabValue = 0;
      subtabs.forEach((subtab, index) => {
        console.log(subtab, index, selectedStatus);
        if (subtab.includes(selectedStatus)) {
          subtabValue = index;
        }
      });

      dispatch(setContacts(data));
      dispatch(setOpenedTab(globalTabs[title]));
      dispatch(setOpenedSubtab(subtabValue));
    } catch (error) {
      console.log(error);
    }
    resetForm();
  };
  return (
    <MultiStepOverlay
      handleClose={resetForm}
      steps={steps}
      currentStep={currentStep}
      nextStep={nextStep}
      prevStep={prevStep}
      changeStep={(arg) => setCurrentStep(arg)}
      title={title}
      submit={addClient}
    >
      <div className="step">
        {currentStep == 1 ? (
          <div>
            <div className="flex items-center mb-6">
              <Avatar size="large" className="mr-4" />
              <Button white label="Upload Photo" />
            </div>
            <div>
              <form onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-2 gap-4 mb-12">
                  <Input
                    type="text"
                    label="First Name"
                    id="first_name"
                    onChange={formik.handleChange}
                    value={formik.values.first_name}
                  />
                  <Input
                    type="text"
                    label="Last Name"
                    id="last_name"
                    onChange={formik.handleChange}
                    value={formik.values.last_name}
                  />

                  <Input
                    type="email"
                    label="Email"
                    id="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                  <Input
                    type="text"
                    label="Phone"
                    id="phone_number"
                    onChange={formik.handleChange}
                    value={formatPhoneNumber(formik.values.phone_number)}
                    placeholder="ex: (555) 555-5555"
                  />
                  <Dropdown
                    white
                    label="Source"
                    activeIcon={false}
                    options={importSourceOptions}
                    handleSelect={(source) =>
                      (formik.values.import_source = source.name)
                    }
                    initialSelect={formik.values.import_source}
                    placeHolder={formik.values.import_source ? null : 'Choose'}
                  />
                  <ChipInput
                    label="Tags"
                    optional
                    className="col-span-2"
                    selections={formik.values.tags}
                    placeholder="Write tag and hit enter"
                    removeChip={removeChip}
                    addChip={addChip}
                  />
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div>
            <Radio
              options={options}
              label="What kind of contact is this for you?"
              selectedContactType={selectedContactType}
              changeContactType={setSelectedContactType}
              className="mb-6"
            />
            <StatusSelect
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              label="In what stage of communication?"
              statuses={statuses}
            />
          </div>
        )}
      </div>
    </MultiStepOverlay>
  );
};

export default AddClientManuallyOverlay;
