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

const Onboarding = ({ setStartedOnboarding }) => {
  const [step, setStep] = useState(0);

  const nextStep = () => {
    setStep(step + 1);
  };

  const firstStep = () => {
    return (
      <>
        <WelcomePopup setStartedOnboarding={setStartedOnboarding} closeModal={() => nextStep()} />
      </>
    );
  };

  return <>{step === 0 ? firstStep() : <></>}</>;
};

export default Onboarding;
