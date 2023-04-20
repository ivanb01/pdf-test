import { useContext, useEffect } from 'react';
import { ShepherdTour, ShepherdTourContext } from 'react-shepherd';
import onboarding_step_one from 'public/images/onboarding/onboarding-1.svg';
import clients_onboarding_step_two from 'public/images/onboarding/clients-onboarding-step-2.svg';
import clients_onboarding_step_three from 'public/images/onboarding/clients-onboarding-step-3.svg';

const clientSteps = [
  {
    id: 'intro',
    attachTo: { element: '.main-menu-wrapper', on: 'right' },
    buttons: [
      {
        classes: 'shepherd-button-primary',
        text: 'Next',
        type: 'next',
      },
    ],
    text:
      `
    <div class="onboarding-custom">
      <img src="` +
      onboarding_step_one.src +
      `"></img>
      <div class="title mb-0">Clients</div>
      <div class="description">Contacts who help you close deals.</div>
      <div class="title mb-0">Professionals</div>
      <div class="description">Contacts that you close deals with and make money.</div>
      <div class="title mb-0">Uncategorized</div>
      <div class="description">Put your unknown, junk or spam contacts here.</div>
      <div class="onboarding-progress">1 of 3</div>
    </div>`,
  },
  {
    id: 'intro',
    attachTo: { element: '.main-menu-wrapper', on: 'right' },
    buttons: [
      {
        classes: 'shepherd-button-primary back',
        text: 'back',
        type: 'back',
      },
      {
        classes: 'shepherd-button-primary',
        text: 'Next',
        type: 'next',
      },
    ],
    text:
      `
    <div class="onboarding-custom">
      <img src="` +
      clients_onboarding_step_two.src +
      `"></img>
      <div class="title">Clients</div>
      <div class="title blue">In The Funnel</div>
      <div class="description">Clients with whom your actively working with, trying to close a deal.</div>
      <div class="title green">Closed Clients</div>
      <div class="description">Clients who are about to close or closed, that require less attention.</div>
      <div class="title orange">On Hold</div>
      <div class="description">Clients that are not in the funnel, but you want to stay in touch with in the future.</div>
      <div class="title red">Dropped</div>
      <div class="description">Clients who you were working with, but decided to give up.</div>
      <div class="onboarding-progress">2 of 3</div>
    </div>`,
  },
  {
    id: 'intro',
    attachTo: { element: '.board-view' },
    buttons: [
      {
        classes: 'shepherd-button-primary back',
        text: 'back',
        type: 'back',
      },
      {
        classes: 'shepherd-button-primary last',
        text: 'Ok',
        type: 'next',
      },
    ],
    text:
      `
    <div class="onboarding-custom">
      <img src="` +
      clients_onboarding_step_three.src +
      `"></img>
      <div class="title">"Status Blocks".</div>
      <div class="description">Your clients will be placed here depending on their stage in the sales process. </div>
      <div class="onboarding-progress">3 of 3</div>
    </div>`,
  },
];
const uncategorizedSteps = [
  {
    id: 'intro',
    attachTo: { element: '.main-menu-wrapper', on: 'right' },
    buttons: [
      {
        classes: 'shepherd-button-primary last',
        text: 'Ok',
        type: 'next',
      },
    ],
    text: `
    <div class="onboarding-custom">
      <div class="title" style="margin-top: 30px;">Uncategorized</div>
      <div class="title mb-0">New Records</div>
      <div class="description">New contacts that do not have type and status.</div>
      <div class="title mb-0">Unknown</div>
      <div class="description">Usually contacts that are imported in, but you don’t want to loose them.</div>
      <div class="title mb-0">Trash</div>
      <div class="description">Contacts that you don’t need to communicate.</div>
    </div>`,
  },
];

const tourOptions = {
  defaultStepOptions: {
    classes: 'shepherd-theme-custom',
    cancelIcon: {
      enabled: true,
    },
  },
  useModalOverlay: true,
};

function TourInstance() {
  const tour = useContext(ShepherdTourContext);
  let functionRan = false;

  useEffect(() => {
    if (!functionRan && tour) {
      tour.start();
      functionRan = true;
    }
  }, [tour]);

  return <></>;
}

export default function Tour(props) {
  return (
    <>
      <ShepherdTour
        steps={props.for == 'clients' ? clientSteps : uncategorizedSteps}
        tourOptions={tourOptions}
      >
        <TourInstance />
      </ShepherdTour>
    </>
  );
}
