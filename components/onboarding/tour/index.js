import { useContext, useEffect } from 'react';
import { ShepherdTour, ShepherdTourContext } from 'react-shepherd';
import 'shepherd.js/dist/css/shepherd.css';
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
    <div className="onboarding-custom">
      <img src="` +
      onboarding_step_one.src +
      `"></img>
      <div className="title mb-0">Clients</div>
      <div className="description">Contacts who help you close deals.</div>
      <div className="title mb-0">Professionals</div>
      <div className="description">Contacts that you close deals with and make money.</div>
      <div className="title mb-0">Uncategorized</div>
      <div className="description">Put your unknown, junk or spam contacts here.</div>
      <div className="onboarding-progress">1 of 3</div>
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
    <div className="onboarding-custom">
      <img src="` +
      clients_onboarding_step_two.src +
      `"></img>
      <div className="title">Clients</div>
      <div className="title blue">In The Funnel</div>
      <div className="description">Clients with whom your actively working with, trying to close a deal.</div>
      <div className="title green">Closed Clients</div>
      <div className="description">Clients who are about to close or closed, that require less attention.</div>
      <div className="title orange">On Hold</div>
      <div className="description">Clients that are not in the funnel, but you want to stay in touch with in the future.</div>
      <div className="title red">Dropped</div>
      <div className="description">Clients who you were working with, but decided to give up.</div>
      <div className="onboarding-progress">2 of 3</div>
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
    <div className="onboarding-custom">
      <img src="` +
      clients_onboarding_step_three.src +
      `"></img>
      <div className="title">"Status Blocks".</div>
      <div className="description">Your clients will be placed here depending on their stage in the sales process. </div>
      <div className="onboarding-progress">3 of 3</div>
    </div>`,
  },
];
const professionalSteps = [
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
    <div className="onboarding-custom">
      <div className="title">Uncategorized</div>
      <div className="title mb-0">New Records</div>
      <div className="description">New contacts that do not have type and status.</div>
      <div className="title mb-0">Unknown</div>
      <div className="description">Usually contacts that are imported in, but you don’t want to loose them.</div>
      <div className="title mb-0">Trash</div>
      <div className="description">Contacts that you don’t need to communicate.</div>
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

  useEffect(() => {
    if (tour) tour.start();
  }, [tour]);

  return <></>;
}

export default function Tour(props) {
  return (
    <ShepherdTour
      steps={props.for == 'clients' ? clientSteps : professionalSteps}
      tourOptions={tourOptions}
    >
      <TourInstance />
    </ShepherdTour>
  );
}
