import MultiStepOverlay from 'components/shared/form/multistep-form';
import { useEffect, useState } from 'react';
import Text from 'components/shared/text';
import CircleStepNumber from 'components/shared/circle-step-number';
import ContactTypeSelect from 'components/contact/contact-type-select';
import StatusSelect from 'components/status-select';
import { types } from 'global/variables';
import { professionalsStatuses, clientStatuses } from 'global/variables';
import { updateContact } from 'api/contacts';
import ChangeStatus from 'components/overlays/change-contact-status';
import { unassignContactFromCampaign } from 'api/campaign';
import { vendorTypes } from 'global/variables';
import Chip from 'components/shared/chip';
import { setRefetchData } from 'store/global/slice';
import { useDispatch, useSelector } from 'react-redux';

const UpdateTypeStatus = ({ contact, handleClose }) => {
  const dispatch = useDispatch();

  const refetchData = useSelector((state) => state.global.refetchData);

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedType, setSelectedType] = useState(contact.category_id);
  const [selectedStatus, setSelectedStatus] = useState(contact.status_id);
  const [steps, setSteps] = useState([]);
  const [changeStatusModal, setChangeStatusModal] = useState(false);

  const editContact = async () => {
    setIsSubmitting(true);
    let status = selectedStatus;
    if (
      [8, 12, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26].includes(
        selectedType
      )
    ) {
      status = 1;
    }
    try {
      const contactToEdit = {
        category_id: selectedType,
        status_id: status,
      };
      await updateContact(contact?.id, contactToEdit);
      setIsSubmitting(false);
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async () => {
    try {
      if (
        contact?.is_in_campaign === 'assigned' &&
        (contact?.status_id !== selectedStatus ||
          contact?.category_id !== selectedType)
      ) {
        setChangeStatusModal(true);
      } else {
        await editContact();
        dispatch(setRefetchData(true));

        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeStatusAndCampaign = async () => {
    try {
      await unassignContactFromCampaign(contact.campaign_id, contact.id);
      await editContact();
      dispatch(setRefetchData(true));
      handleClose();
      setChangeStatusModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if ([2, 3, 12, 13, 14].includes(selectedType)) {
      setSteps([{ id: 1, name: 'Select Category', href: '#' }]);
    } else {
      setSteps([
        { id: 1, name: 'Select Category', href: '#' },
        {
          id: 2,
          name: 'Select Type',
          href: '#',
        },
      ]);
    }
  }, [selectedType]);

  return (
    <>
      <MultiStepOverlay
        handleClose={handleClose}
        hideHeader
        className="max-w-[850px] min-w-[850px]"
        steps={steps}
        currentStep={currentStep}
        nextStep={nextStep}
        prevStep={prevStep}
        title={'Edit Type & Status'}
        submit={handleSubmit}
        isSubmittingButton={isSubmitting}
        changeStep={(arg) => setCurrentStep(arg)}
        // submit={submitForm2}
        // isSubmittingButton={isSubmitting2}
      >
        <div className="step">
          {currentStep == 1 ? (
            <div>
              <div className="flex items-center mb-6">
                <CircleStepNumber number={1} className="mr-2" />
                <Text h3>What type of contact is this?</Text>
              </div>
              <div className="grid grid-cols-3 gap-4 px-9 mb-6">
                {types.map((type, index) => {
                  return (
                    <div key={index}>
                      <ContactTypeSelect
                        type={type}
                        setSelectedType={setSelectedType}
                        selectedType={selectedType}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center mb-6">
                <CircleStepNumber number={2} className="mr-2" />
                <Text h3>
                  {[8, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26].includes(
                    selectedType
                  )
                    ? 'What kind of vendor?'
                    : 'In what stage of communication?'}
                </Text>
              </div>
              {[8, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26].includes(
                selectedType
              ) ? (
                <div className="flex flex-wrap">
                  {vendorTypes.map((type) => (
                    <Chip
                      selectedStatus={type.id == selectedType}
                      key={type.id}
                      label={type.name}
                      className="mr-3 mb-3"
                      onClick={() => setSelectedType(type.id)}
                    />
                  ))}
                </div>
              ) : (
                <StatusSelect
                  className="px-9"
                  selectedStatus={selectedStatus}
                  setSelectedStatus={setSelectedStatus}
                  statuses={
                    [8, 9, 12].includes(selectedType)
                      ? professionalsStatuses
                      : clientStatuses
                  }
                />
              )}
            </div>
          )}
        </div>
      </MultiStepOverlay>

      {changeStatusModal && (
        <ChangeStatus
          handleCloseOverlay={() => setChangeStatusModal(false)}
          onSubmit={handleChangeStatusAndCampaign}
        />
      )}
    </>
  );
};

export default UpdateTypeStatus;
