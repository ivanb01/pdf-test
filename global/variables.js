import { UsersIcon } from '@heroicons/react/solid';
import { QuestionMarkCircleIcon } from '@heroicons/react/solid';
import { CheckIcon } from '@heroicons/react/solid';

// export const Types = [
//   { id: 0, name: 'Renter' },
//   { id: 1, name: 'Buyer' },
//   { id: 2, name: 'Seller' },
//   { id: 3, name: 'Landlord' },
//   { id: 4, name: 'Uncategorized' },
//   { id: 5, name: 'Trash' },
// ];

// export const clientStatuses = [
//   { id: 0, name: 'Uncategorized', colorClass: '--danger' },
//   { id: 1, name: 'On Hold', colorClass: '--warning' },
//   { id: 2, name: 'New Lead', colorClass: '--success' },
//   { id: 3, name: 'In Communication', colorClass: '--success-v2' },
//   { id: 4, name: 'Appointment Set', colorClass: '--success-v3' },
//   { id: 5, name: 'Attempted Contact', colorClass: '--success-v4' },
//   { id: 6, name: 'Showing Properties', colorClass: '--success-v5' },
//   { id: 7, name: 'Submitting Offer', colorClass: '--success-v6' },
// ];

export const localRedirectSignIn = 'http://localhost:3000/contacts/clients';
export const productionRedirectSignIn =
  'https://onelinecrm.com/contacts/clients';
export const localRedirectSignOut =
  'http://localhost:3000/authentication/sign-in';
export const productionRedirectSignOut =
  'https://onelinecrm.com/authentication/sign-in';

export const menuItems = [
  {
    id: 0,
    name: 'Contacts',
    url: '/contacts/clients',
  },
  {
    id: 1,
    name: 'Campaigns',
    url: '/campaigns',
  },
  {
    id: 2,
    name: 'Deals',
    url: '/deals',
  },
  {
    id: 3,
    name: 'Applications',
    url: '/applications',
  },
];

export const contactTypes = [
  { id: 0, name: 'Agent' },
  { id: 1, name: 'Vendor' },
  { id: 2, name: 'Other' },
  { id: 3, name: 'Uncategorized' },
  { id: 4, name: 'Trash' },
];

export const contactStatuses = [
  { id: 0, name: 'Uncategorized', colorClass: '--danger' },
  { id: 1, name: 'No Relationship', colorClass: '--warning' },
  { id: 2, name: 'Loose Relationship', colorClass: '--success' },
  { id: 3, name: 'Strong Relationship', colorClass: '--success-v2' },
  { id: 4, name: 'Nurture', colorClass: '--success-v3' },
  { id: 5, name: 'Dropped', colorClass: '--success-v4' },
];

export const csvHeaders = [
  'active',
  'first_name',
  'last_name',
  'type',
  'status',
  'phone_number',
  'email',
  'note',
  'tenant',
];

export const types = [
  {
    id: 0,
    name: 'Clients',
    icon: <UsersIcon className="text-lightBlue3 mr-1 w-6" />,
    description: 'Contacts that you close deals with and make money.',
    types: [
      {
        id: 4,
        name: 'buyer',
      },
      {
        id: 5,
        name: 'seller',
      },
      {
        id: 6,
        name: 'renter',
      },
      {
        id: 7,
        name: 'landlord',
      },
    ],
  },
  {
    id: 1,
    name: 'Professionals',
    icon: <UsersIcon className="text-lightBlue3 mr-1 w-6" />,
    description: 'Contacts who assist you in closing clients.',
    types: [
      {
        id: 8,
        name: 'vendor',
      },
      {
        id: 12,
        name: 'agent',
      },
      {
        id: 9,
        name: 'other',
      },
    ],
  },
  {
    id: 2,
    name: 'Other',
    icon: <QuestionMarkCircleIcon className="text-lightBlue3 mr-1 w-6" />,
    description: 'Put your unknown, junk or spam contacts here.',
    types: [
      {
        id: 2,
        name: 'unknown',
      },
      {
        id: 3,
        name: 'trash',
      },
    ],
  },
];
export const statuses = [
  {
    id: 0,
    statusMainTitle: 'In The Funnel',
    color: 'border-lightBlue3',
    statuses: [
      {
        id: 2,
        name: 'New Lead',
        color: 'bg-lightBlue1',
      },
      {
        id: 3,
        name: 'Attempted Contact',
        color: 'bg-lightBlue2',
      },
      {
        id: 5,
        name: 'In Communication',
        color: 'bg-purple1',
      },
      {
        id: 4,
        name: 'Appointment Set',
        color: 'bg-purple2',
      },
      {
        id: 7,
        name: 'Actively Working',
        color: 'bg-purple3',
      },
      {
        id: 16,
        name: 'Offer Submitted',
        color: 'bg-purple4',
      },
    ],
  },
  {
    id: 1,
    statusMainTitle: 'Closed',
    color: 'border-green5',
    statuses: [
      {
        id: 9,
        name: 'Contract Signed',
        color: 'bg-green8',
      },
      {
        id: 10,
        name: 'Closed',
        color: 'bg-green2',
      },
    ],
  },
  {
    id: 2,
    statusMainTitle: 'On Hold',
    color: 'border-orange1',
    statuses: [
      {
        id: 8,
        name: 'On Hold',
        color: 'bg-orange2',
      },
    ],
  },
  {
    id: 3,
    statusMainTitle: 'Dropped',
    color: 'border-red4',
    statuses: [
      {
        id: 11,
        name: 'Dropped',
        color: 'bg-red2',
      },
    ],
  },
];

////////////////////////////////////////////////////////////////////////

export const allStatusesQuickEdit = {
  clients: [
    {
      id: 2,
      name: 'New Lead',
      color: 'bg-lightBlue1',
    },
    {
      id: 3,
      name: 'Attempted Contact',
      color: 'bg-lightBlue2',
    },
    {
      id: 5,
      name: 'In Communication',
      color: 'bg-purple1',
    },
    {
      id: 4,
      name: 'Appointment Set',
      color: 'bg-purple2',
    },
    {
      id: 7,
      name: 'Actively Working',
      color: 'bg-purple3',
    },
    {
      id: 16,
      name: 'Offer Submitted',
      color: 'bg-purple4',
    },
    {
      id: 9,
      name: 'Contract Signed',
      color: 'bg-green8',
    },
    {
      id: 10,
      name: 'Closed Client',
      color: 'bg-green2',
    },
    {
      id: 8,
      name: 'On Hold',
      color: 'bg-orange2',
    },
    {
      id: 11,
      name: 'Dropped',
      color: 'bg-red2',
    },
  ],
  professionals: [
    {
      id: 13,
      name: 'No Relationship',
      color: 'bg-lightBlue1',
    },
    {
      id: 14,
      name: 'Loose Relationship',
      color: 'bg-lightBlue2',
    },
    {
      id: 15,
      name: 'Strong Relationship',
      color: 'bg-purple1',
    },
    {
      id: 11,
      name: 'Dropped',
      color: 'bg-red2',
    },
  ],
};

export const clientStatusMainTitlesUpdated = {
  'In The Funnel': 'Clients in The Funnel',
  Closed: 'Closed Clients',
  'On Hold': 'On Hold Clients',
  Dropped: 'Dropped Clients',
};

export const professioonalStatusMainTitlesUpdated = {
  Active: 'Active Professionals',
  Dropped: 'Dropped Professionals',
};

export const clientStatuses = [
  {
    id: 0,
    statusMainTitle: 'In The Funnel',
    color: 'border-lightBlue3',
    statuses: [
      {
        id: 2,
        name: 'New Lead',
        color: 'bg-lightBlue1',
      },
      {
        id: 3,
        name: 'Attempted Contact',
        color: 'bg-lightBlue2',
      },
      {
        id: 5,
        name: 'In Communication',
        color: 'bg-purple1',
      },
      {
        id: 4,
        name: 'Appointment Set',
        color: 'bg-purple2',
      },
      {
        id: 7,
        name: 'Actively Working',
        color: 'bg-purple3',
      },
      {
        id: 16,
        name: 'Offer Submitted',
        color: 'bg-purple3',
      },
      // {
      //   id: 5,
      //   name: 'Scheduled Showing',
      //   color: 'bg-purple4',
      // },
    ],
  },
  {
    id: 1,
    statusMainTitle: 'Closed',
    color: 'border-green5',
    statuses: [
      {
        id: 9,
        name: 'Contract Signed',
        color: 'bg-green8',
      },
      {
        id: 10,
        name: 'Closed',
        color: 'bg-green2',
      },
    ],
  },
  {
    id: 2,
    statusMainTitle: 'On Hold',
    color: 'border-orange1',
    statuses: [
      {
        id: 8,
        name: 'On Hold',
        color: 'bg-orange2',
      },
    ],
  },
  {
    id: 3,
    statusMainTitle: 'Dropped',
    color: 'border-red4',
    statuses: [
      {
        id: 11,
        name: 'Dropped',
        color: 'bg-red2',
      },
    ],
  },
];

export const professionalsStatuses = [
  {
    id: 0,
    statusMainTitle: 'Active',
    color: 'border-lightBlue3',
    statuses: [
      {
        id: 13,
        name: 'No Relationship',
        color: 'bg-lightBlue1',
      },
      {
        id: 14,
        name: 'Loose Relationship',
        color: 'bg-lightBlue2',
      },
      {
        id: 15,
        name: 'Strong Relationship',
        color: 'bg-purple1',
      },
    ],
  },
  // {
  //   id: 1,
  //   statusMainTitle: 'Dropped',
  //   color: 'border-green5',
  //   statuses: [
  //     {
  //       id: 11,
  //       name: 'Dropped',
  //       color: 'bg-red2',
  //     },
  //   ],
  // },
  // {
  //   id: 1,
  //   statusMainTitle: 'On Hold',
  //   color: 'border-orange1',
  //   statuses: [
  //     {
  //       id: 8,
  //       name: 'On Hold',
  //       color: 'bg-orange2',
  //     },
  //   ],
  // },
  {
    id: 1,
    statusMainTitle: 'Dropped',
    color: 'border-red4',
    statuses: [
      {
        id: 11,
        name: 'Dropped',
        color: 'bg-red2',
      },
    ],
  },
];

export const uncategorizedStatuses = [
  {
    id: 0,
    statusMainTitle: 'New Records',
    color: 'border-lightBlue3',
  },
  {
    id: 1,
    statusMainTitle: 'Unknown',
    color: 'border-green5',
  },
  {
    id: 2,
    statusMainTitle: 'Trash',
    color: 'border-orange1',
  },
];

export const relationshipsTypes = [
  {
    id: 0,
    name: 'Friend',
  },
  {
    id: 1,
    name: 'Spouse',
  },
  {
    id: 2,
    name: 'Roommate',
  },
  {
    id: 3,
    name: 'Co-worker',
  },
];

export const dropped_status_id = 11;

export const contactCategoryOptions = {
  client: [
    {
      id: 6,
      name: 'Renter',
    },
    {
      id: 4,
      name: 'Buyer',
    },
    {
      id: 5,
      name: 'Seller',
    },
    {
      id: 7,
      name: 'Landlord',
    },
  ],
  proffesional: [
    [
      {
        id: 8,
        name: 'Vendor',
      },
      {
        id: 12,
        name: 'Agent',
      },
      {
        id: 9,
        name: 'Other',
      },
    ],
  ],
};

export const clientOptions = [
  {
    id: 6,
    name: 'Renter',
  },
  {
    id: 4,
    name: 'Buyer',
  },
  {
    id: 5,
    name: 'Seller',
  },
  {
    id: 7,
    name: 'Landlord',
  },
];

export const professionalsOptions = [
  {
    id: 8,
    name: 'Vendor',
  },
  {
    id: 12,
    name: 'Agent',
  },
  {
    id: 9,
    name: 'Other',
  },
];

export const eventStatusesIcons = {
  Sent: <CheckIcon className="w-5 h-5 text-white" aria-hidden="true" />,
  scheduled: <span className="h-2.5 w-2.5 bg-lightBlue3 rounded-full" />,
  canceled: <span className="h-2.5 w-2.5 bg-red3 rounded-full" />,
};

export const globalTabsStates = {
  0: {
    0: 'In the Funnel',
    1: 'Closed',
    2: 'On Hold',
    3: 'Dropped',
  },
  1: {
    0: 'Active',
    1: 'Dropped',
  },
};

export const importSourceOptions = [
  {
    id: 0,
    name: 'Cold Call',
  },
  {
    id: 1,
    name: 'Company Website',
  },
  {
    id: 2,
    name: 'Craigslist',
  },
  {
    id: 3,
    name: 'Facebook',
  },
  {
    id: 4,
    name: 'Instagram',
  },
  {
    id: 5,
    name: 'OpCity',
  },
  {
    id: 6,
    name: 'Referral',
  },
  {
    id: 7,
    name: 'Renthop',
  },
  {
    id: 8,
    name: 'Streeteasy',
  },
  {
    id: 9,
    name: 'Trulia',
  },
  {
    id: 10,
    name: 'Zillow',
  },
  {
    id: 11,
    name: 'Zumper',
  },
  {
    id: 12,
    name: 'Other',
  },
];

export const phoneNumberRules = /^\s*[(]?(\d{3})[\s)]*(\d{3})[\s-]*(\d{4})$/;

export const filtersForLastCommunicationDate = {
  'Up to Date': 'healthy',
  'Not Up to Date': 'unhealthy',
  Today: [1, 'days'],
  '1 Week ago': [7, 'days'],
  '2 Weeks ago': [14, 'days'],
  '1 Month ago': [1, 'months'],
};

export const multiselectOptionsClients = [
  { value: 'super-high-priority', label: 'Super High Priority!' },
  { value: 'high-priority', label: 'High Priority' },
  { value: 'low-priority', label: 'Low Priority' },
];

export const multiselectOptionsProfessionals = [
  { value: 'lawyer', label: 'Lawyer' },
  { value: 'contractor', label: 'Contractor' },
  { value: 'mortgage-broker', label: 'Mortagage Broker' },
  { value: 'title-agent', label: 'Title Agent' },
  { value: 'agent', label: 'Agent' },
  { value: 'friend', label: 'Friend' },
  { value: 'family', label: 'Family' },
  { value: 'mover', label: 'Mover' },
  { value: 'photographer', label: 'Photographer' },
  { value: 'staging', label: 'Staging' },
  { value: 'home-inspector', label: 'Home Inspector' },
  { value: 'finance', label: 'Finance' },
  { value: 'insurance', label: 'Insurance' },
  { value: 'appraiser', label: 'Appraiser' },
  { value: 'handyman', label: 'Handyman' },
];

export const healthLastCommunicationDate = {
  clients: {
    'New Lead': 1, 
    'Attempted Contact': 1,
    'In Communication': 2,
    'Appointment Set': 7,
    'Actively Working': 4,
    'Offer Submitted': 4,
    'Contract Signed': 10,
    'Closed Client': 100,
    'On Hold': 60,
    'Dropped': 0,
  },
  professionals: {
    'Dropped': 0,
    'No Relationship': 90,
    'Loose Relationship': 90,
    'Strong Relationship': 90,
  }
};
