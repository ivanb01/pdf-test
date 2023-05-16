import MultiStepOverlay from 'components/shared/form/multistep-form';
import { useEffect, useState } from 'react';
import Text from 'components/shared/text';
import CircleStepNumber from 'components/shared/circle-step-number';
import ContactTypeSelect from 'components/contact/contact-type-select';
import StatusSelect from 'components/status-select';
import { types } from 'global/variables';
import { professionalsStatuses, clientStatuses } from 'global/variables';
import { updateContact } from 'api/contacts';
import { useDispatch } from 'react-redux';
import { setRefetchData } from 'store/global/slice';
import { useRouter } from 'next/router';
const UpdateTypeStatus = ({ client, handleClose }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const nextStep = () => {
    if (currentStep === 2) {
      submitForm1();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const changeTypeAndStatus = () => {
    setIsSubmitting(true);
    if ([2, 3, 13, 14].includes(selectedType)) {
      setSelectedStatus(1);
    }
    updateContact(client.id, {
      category_id: selectedType,
      status_id: selectedStatus,
    }).then(() => {
      setIsSubmitting(false);
      handleClose();
      dispatch(setRefetchData(true));
    });
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedType, setSelectedType] = useState(client.category_id);
  const [selectedStatus, setSelectedStatus] = useState(client.status_id);
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    if ([2, 3, 13, 14].includes(selectedType)) {
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
    <MultiStepOverlay
      handleClose={handleClose}
      hideHeader
      className="max-w-[850px] min-w-[850px]"
      steps={steps}
      currentStep={currentStep}
      nextStep={nextStep}
      prevStep={prevStep}
      title={'Edit Type & Status'}
      submit={changeTypeAndStatus}
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
              <Text h3>In what stage of communication?</Text>
            </div>
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
          </div>
        )}
      </div>
    </MultiStepOverlay>
  );
};

export default UpdateTypeStatus;
