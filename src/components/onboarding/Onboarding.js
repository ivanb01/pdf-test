import { useEffect, useState } from 'react';

import Overlay from 'components/shared/overlay';
import IntroductionOverlay from 'components/overlays/categorized-successfully/introduction';
import img_step_one from '/public/images/onboarding-people-icons/step1.png';
import img_step_two from '/public/images/onboarding-people-icons/step2.png';
import img_step_three from '/public/images/onboarding-people-icons/step3.png';
import Button from 'components/shared/button';

const Onboarding = ({ handleOnboardingOverlayVisibile, visible }) => {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const stepHandler = () => {
    if (step == 1) {
      return (
        <IntroductionOverlay
          dialogTitle="Ever asked yourself if there is an easier way?"
          dialogDescription="We’re happy to help you manage your contacts. Lorem Ipsum is simply dummy text of the printing and typesetting industry."
          headerImg={img_step_one}
          introductionPopup
          handleOnboardingOverlayVisibile={handleOnboardingOverlayVisibile}
          visible={visible}>
          <span></span>
          <Button type="button" primary onClick={() => nextStep()}>
            Next
          </Button>
        </IntroductionOverlay>
      );
      // return <StepOne onNextBtnClick={() => nextStep() }></StepOne>
    } else if (step == 2) {
      return (
        <IntroductionOverlay
          dialogTitle="Add or Import clients directly"
          dialogDescription="Lorem Ipsum is simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old."
          headerImg={img_step_two}
          introductionPopup
          handleOnboardingOverlayVisibile={handleOnboardingOverlayVisibile}
          visible={visible}>
          <Button secondary outlined onClick={() => prevStep()}>
            Back
          </Button>
          <Button type="button" primary onClick={() => nextStep()}>
            Next
          </Button>
        </IntroductionOverlay>
      );
      // return <StepTwo onPrevBtnClick={() => prevStep() } onNextBtnClick={() => nextStep() }></StepTwo>
    } else if (step == 3) {
      return (
        <IntroductionOverlay
          dialogTitle="Run campaign easier than ever"
          dialogDescription="Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old."
          headerImg={img_step_three}
          introductionPopup
          handleOnboardingOverlayVisibile={handleOnboardingOverlayVisibile}
          visible={visible}>
          <Button secondary outlined onClick={() => prevStep()}>
            Back
          </Button>
          <Button
            type="button"
            primary
            onClick={handleOnboardingOverlayVisibile(false)}>
            Start Exploring
          </Button>
        </IntroductionOverlay>
      );
      // return <StepThree onDone={ () => setOpen(false) } onPrevBtnClick={() => prevStep() }></StepThree>
    }
  };

  return stepHandler();
};

export default Onboarding;
