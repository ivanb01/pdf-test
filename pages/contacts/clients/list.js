import { UserIcon, ArrowCircleRightIcon } from '@heroicons/react/solid';
import { MailIcon, SpeakerphoneIcon } from '@heroicons/react/outline';

export const tabs = [
  {
    title: 'CLIENT TYPES',
    content: ['Landlord', 'Renter', 'Buyer', 'Selller'],
    iconLeft: <UserIcon className="text-gray3" height={20} />,
  },
  {
    title: 'LAST COMMUNICATION',
    content: [
      'Up to Date',
      'Today',
      '1 Week ago',
      '2 Weeks ago',
      '1 Month ago',
    ],
    iconLeft: <MailIcon className="text-gray3" height={20} />,
  },
  {
    title: 'CLIENT STATUS',
    content: [
      'New Lead',
      'Attempted Contact',
      'In Communication',
      'Appointment Set',
      'Actively Working',
    ],
    iconLeft: <UserIcon className="text-gray3" height={20} />,
  },
  {
    title: 'CAMPAIGN',
    content: ['Assigned Clients', 'Unassigned Clients'],
    iconLeft: <SpeakerphoneIcon className="text-gray3" height={20} />,
  },
  {
    title: 'TAGS',
    content: ['Tag 1', 'Tag 2', 'Tag 3'],
    iconLeft: <ArrowCircleRightIcon className="text-gray3" height={20} />,
  },
];

export const sliderTabs = [
  {
    id: 0,
    name: 'In the Funnel',
    count: 0,
  },
  {
    id: 1,
    name: 'Closed Clients',
    count: 0,
  },
  {
    id: 2,
    name: 'On Hold',
    count: 0,
  },
  {
    id: 3,
    name: 'Dropped',
    count: 0,
  },
];

export const clientTypeCards = [
  {
    tabId: 0,
    name: 'New Lead',
    type: 'funnel',
    className: 'bg-lightBlue1',
  },
  {
    tabId: 0,
    name: 'Attempted Contact',
    type: 'funnel',
    className: 'bg-lightBlue2',
    data: [
      {
        avatar: '',
        name: 'Test 1',
        type: 'Landlord',
        status: 'In Communication',
        lastCommunication: 'Today',
        campaign: true,
      },
      {
        avatar: '',
        name: 'Test 2',
        type: 'Buyer',
        status: 'In Communication',
        lastCommunication: 'Today',
        campaign: false,
      },
    ],
  },
  ,
  {
    tabId: 0,
    name: 'In Communication (1)',
    type: 'funnel',
    className: 'bg-indigo1',
    data: [
      {
        avatar: '',
        name: 'Name Lastname',
        type: 'Renter',
        status: 'In Communication',
        lastCommunication: 'Today',
        campaign: true,
      },
      {
        avatar: '',
        name: 'Name Lastname',
        type: 'Renter',
        status: 'In Communication',
        lastCommunication: 'Today',
        campaign: true,
      },
    ],
  },
  {
    tabId: 0,
    name: 'Appointment Set',
    type: 'funnel',
    className: 'bg-indigo2',
  },

  {
    tabId: 0,
    name: 'Actively Working',
    type: 'funnel',
    className: 'bg-indigo3',
  },
  {
    tabId: 0,
    name: 'Offer Submitted',
    type: 'funnel',
    className: 'bg-purple5',
  },

  {
    tabId: 1,
    name: 'Contract Signed',
    type: 'closed-clients',
    className: 'bg-green2',
  },
  {
    tabId: 1,
    name: 'Closed ',
    type: 'closed-clients',
    className: 'bg-green3',
  },
  {
    tabId: 2,
    name: 'On Hold',
    type: 'on-hold',
    className: 'bg-orange2',
  },
  {
    tabId: 3,
    name: 'Dropped',
    type: 'dropped',
    className: 'bg-rose1',
  },
];
