import { useContext, useEffect } from 'react';
import { ShepherdTour, ShepherdTourContext } from 'react-shepherd';
import onboarding_step_one from '/public/images/onboarding/onboarding-1.svg';
import clients_onboarding_step_two from '/public/images/onboarding/clients-onboarding-step-2.svg';
import clients_onboarding_step_three from '/public/images/onboarding/clients-onboarding-step-3.svg';

const clientSteps = [
  {
    id: 'intro',
    attachTo: { element: '.clients', on: 'right' },
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
    text: `
    <div class="onboarding-custom">
      <div class="title mb-4">Clients</div>
      <div class="description">Contacts who help you close deals.</div>
      <hr class="w-full mb-4" ></hr>
      <div class="title blue">In The Funnel</div>
      <div class="description">Clients you're actively working with. These require lots of attention.</div>
      <div class="title green">Closed Clients</div>
      <div class="description">Clients who are about to close or closed. These require less attention.</div>
      <div class="title orange">On Hold</div>
      <div class="description">Clients that are not in the funnel, but you want to stay in touch with in the future.</div>
      <div class="title red">Dropped</div>
      <div class="description">Clients who you were working with, but decided to give up on.</div>
      <div class="onboarding-progress">1 of 7</div>
    </div>`,
  },
  {
    id: 'intro',
    attachTo: { element: '.bg-purple1.flex-row', on: 'top' },
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
    text: `
    <div class="onboarding-custom">
      <div class="title">Status Blocks</div>
      <div class="description">Your clients will be placed here depending on their stage in the sales process. </div>
      <div class="onboarding-progress">2 of 7</div>
    </div>`,
  },
  {
    id: 'intro',
    attachTo: { element: '.bg-purple1.flex-row svg path', on: 'top' },
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
    text: `
    <div class="onboarding-custom">
      <div class="title">Communication Guideline</div>
      <div class="description">Every status block tells you how often you need to contact the client to maintain a healthy relationship.</div>
        <div class="w-full flex">
          <div class="flex items-center mr-2 text-white">
            <div class="h-[13px] w-[13px] rounded bg-green5 mr-1" ></div>
            <div>Healthy</div>
          </div>
          <div class="flex items-center mr-2 text-white">
            <div class="h-[13px] w-[13px] rounded bg-red5 mr-1" ></div>
            <div>Unhealthy</div>
          </div>
        </div>
      <div class="onboarding-progress">3 of 7</div>
    </div>`,
  },
  {
    id: 'intro',
    attachTo: { element: '.professionals', on: 'left' },
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
    text: `
    <div class="onboarding-custom">
      <div class="title mb-4">Professionals</div>
      <div class="description">Contacts that help you close deals, but don't buy, sell or rent real estate.</div>
      <hr class="w-full mb-4" ></hr>
      <div class="title">Vendors</div>
      <div class="description">Contacts that help you close deals, but don't buy, sell or rent real estate.</div>
      <div class="title">Agents</div>
      <div class="description">Other real estate agents you work with to close deals.</div>
      <div class="onboarding-progress">4 of 7</div>
    </div>`,
  },
  {
    id: 'intro',
    attachTo: { element: '.needs-attention', on: 'left' },
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
    text: `
    <div class="onboarding-custom">
      <div class="title mb-4">Need to Contact</div>
      <div class="description">These are contacts that you need to contact to keep a healthy communication.</div>
      <div class="title">Still Unknown</div>
      <div class="description">Contacts who you don’t know, but you want to keep in CRM until you remember who they are.</div>
      <div class="title">Need to Categorize</div>
      <div class="description">Contacts you have not categorized yet</div>
      <div class="onboarding-progress">5 of 7</div>
    </div>`,
  },
  {
    id: 'intro',
    attachTo: { element: '.other', on: 'left' },
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
    text: `
    <div class="onboarding-custom">
      <div class="title mb-4">Family & Friends</div>
      <div class="description">Contacts that you import in CRM and are family and friends.</div>
      <div class="title">Trash</div>
      <div class="description">Contacts that you move to trash will appear here.</div>
      <div class="onboarding-progress">6 of 7</div>
    </div>`,
  },
  {
    id: 'intro',
    attachTo: { element: '.setup-smart-sync', on: 'left' },
    buttons: [
      {
        classes: 'shepherd-button-primary back',
        text: 'back',
        type: 'back',
      },
      {
        classes: 'shepherd-button-primary last',
        text: 'Finish',
        type: 'next',
      },
    ],
    text: `
    <div class="onboarding-custom">
      <div class="title mb-4">Setup Smart Sync</div>
      <div class="description">Click "Setup" to automatically import Google contacts, and activate AI Smart Sync. <br/><br/>Smart Sync will pull in and auto-categorize your contacts from Gmail, as new emails come in.</div>
      <div class="onboarding-progress">7 of 7</div>
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
      <div class="description">Contacts that are imported, but you don’t know where to place them.</div>
      <div class="title mb-0">Trash</div>
      <div class="description">Contacts that you don’t need to communicate or put in trash will appear here.</div>
    </div>`,
  },
];

const tourOptions = {
  defaultStepOptions: {
    classes: 'shepherd-theme-custom',
    cancelIcon: {
      enabled: false,
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
      <ShepherdTour steps={props.for == 'clients' ? clientSteps : uncategorizedSteps} tourOptions={tourOptions}>
        <TourInstance />
      </ShepherdTour>
    </>
  );
}
