import Button from 'components/shared/button';
import Text from 'components/shared/text';
import Overlay from 'components/shared/overlay';
import img from '/public/images/onboarding.png';
import img2 from '/public/images/oneline.png';
import img3 from '/public/images/third-step.png';
import img4 from '/public/images/fourth.png';
import { useState } from 'react';
import ArrowBack from '@mui/icons-material/ArrowBack';
import WelcomePopup from '@components/overlays/welcome-popup';

const Onboarding = ({ closeModal, handleAction, loading, setStartedOnboarding, setShowSSOverlay }) => {
  const [step, setStep] = useState(0);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const firstStep = () => {
    return (
      <WelcomePopup
        closeModal={() => {
          nextStep();
          closeModal();
        }}
        setStartedOnboarding={setShowSSOverlay}
      />
    );
  };

  const secondStep = () => {
    return (
      <>
        <div></div>
        <div className="mb-6 text-center">
          <div className="flex justify-center">
            <img className="mb-2" src={img2.src}></img>
          </div>
          <div className="text-lg font-semibold text-gray-900 mb-3">Sync with G-mail Directly</div>
          <div className="text-xs text-gray-900">
            By using “Gmail Smart sync contacts” and Google Contacts, your clients will show up in your dashboard
            without needing to add them manually.
          </div>
        </div>
        <div className="flex items-center justify-end mt-6">
          <Button loading={loading} primary onClick={() => nextStep()}>
            Next
          </Button>
        </div>
      </>
    );
  };
  const thirdStep = () => {
    return (
      <>
        <div className="mb-6 text-center">
          <div className="flex justify-center">
            <img className="mb-2" src={img3.src}></img>
          </div>
          <div className="text-lg font-semibold text-gray-900 mb-3">
            Organizing your contacts will generate you 50% more income!
          </div>
          <div className="text-xs text-gray-900">
            80% of sales require a minimum of 5 follow up calls, and it takes an average of 18 calls to connect with a
            client. This tool is designed to boost your engagement with clients and is proven to close more deals.
          </div>
        </div>
        <div className="flex items-center justify-between mt-6">
          <Button loading={loading} secondary leftIcon={<ArrowBack className="h-4" />} onClick={() => prevStep()}>
            Back
          </Button>
          <Button loading={loading} primary onClick={() => nextStep()}>
            Next
          </Button>
        </div>
      </>
    );
  };
  const fourthStep = () => {
    return (
      <>
        <div className="mb-6 text-center">
          <div className="flex justify-center">
            <img className="mb-2" src={img4.src}></img>
          </div>
          <div className="text-lg font-semibold text-gray-900 mb-3">Run campaign easier than ever</div>
          <div className="text-xs text-gray-900">
            Automate the events. Improve your communication. Improve your daily work.
          </div>
        </div>
        <div className="flex items-center justify-between mt-6">
          <div className="w-1/3">
            <Button
              loading={loading}
              leftIcon={<ArrowBack className="h-4" />}
              secondary
              onClick={() => prevStep()}
              label="Back"
            />
          </div>
          <div className="w-1/3 text-right">
            <Button
              loading={loading}
              primary
              onClick={() => {
                closeModal();
                setStartedOnboarding(true);
              }}
              label="Start the Onboard"
            />
          </div>
        </div>
      </>
    );
  };

  return <>{step === 0 && firstStep()}</>;
};

export default Onboarding;
