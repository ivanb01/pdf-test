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
export const productionRedirectSignIn = 'https://onelinecrm.com/contacts/clients';
export const devRedirectSignIn = 'https://dev.onelinecrm.com/contacts/clients';
export const localRedirectSignOut = 'http://localhost:3000/authentication/sign-in';
export const productionRedirectSignOut = 'https://onelinecrm.com/authentication/sign-in';
export const devRedirectSignOut = 'https://dev.onelinecrm.com/authentication/sign-in';

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
  { id: 0, name: 'Client' },
  { id: 1, name: 'Professional' },
  { id: 2, name: 'Other' },
  // { id: 3, name: 'Uncategorized' },
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
      { id: 8, hidden: false, name: 'vendor' },
      {
        id: 12,
        hidden: false,
        name: 'agent',
      },
      {
        id: 9,
        hidden: false,
        name: 'unspecified',
      },
      { id: 15, hidden: true, name: 'lawyer' },
      { id: 16, hidden: true, name: 'contractor' },
      { id: 17, hidden: true, name: 'mortgage broker' },
      { id: 18, hidden: true, name: 'mover' },
      { id: 19, hidden: true, name: 'photographer' },
      { id: 20, hidden: true, name: 'staging' },
      { id: 21, hidden: true, name: 'home inspector' },
      { id: 22, hidden: true, name: 'finance' },
      { id: 23, hidden: true, name: 'insurance' },
      { id: 24, hidden: true, name: 'appraiser' },
      { id: 25, hidden: true, name: 'handyman' },
      { id: 26, hidden: true, name: 'architect' },
      { id: 27, hidden: true, name: 'software' },
    ],
  },
  {
    id: 2,
    name: 'Other',
    icon: <QuestionMarkCircleIcon className="text-lightBlue3 mr-1 w-6" />,
    description: 'Put your unknown, junk or spam contacts here.',
    types: [
      {
        id: 14,
        name: 'Family',
      },
      {
        id: 13,
        name: 'Friend',
      },
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
      label: 'New Lead',
      color: 'bg-lightBlue1',
    },
    {
      id: 3,
      label: 'Attempted Contact',
      color: 'bg-lightBlue2',
    },
    {
      id: 5,
      label: 'In Communication',
      color: 'bg-purple1',
    },
    {
      id: 4,
      label: 'Appointment Set',
      color: 'bg-purple2',
    },
    {
      id: 7,
      label: 'Actively Working',
      color: 'bg-purple3',
    },
    {
      id: 16,
      label: 'Offer Submitted',
      color: 'bg-purple4',
    },
    {
      id: 9,
      label: 'Contract Signed',
      color: 'bg-green8',
    },
    {
      id: 10,
      label: 'Closed Client',
      color: 'bg-green2',
    },
    {
      id: 8,
      label: 'On Hold',
      color: 'bg-orange2',
    },
    {
      id: 11,
      label: 'Dropped',
      color: 'bg-red2',
    },
  ],
  professionals: [
    {
      id: 13,
      label: 'No Relationship',
      color: 'bg-lightBlue1',
    },
    {
      id: 14,
      label: 'Loose Relationship',
      color: 'bg-lightBlue2',
    },
    {
      id: 15,
      label: 'Strong Relationship',
      color: 'bg-purple1',
    },
    {
      id: 11,
      label: 'Dropped',
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
        name: 'Closed Client',
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

export const agentTypes = [{ id: 12, name: 'Agent' }];
export const unspecifiedTypes = [{ id: 9, name: 'Unspecified' }];

export const professionalsStatuses = [
  {
    id: 0,
    statusMainTitle: 'Vendor',
    color: 'border-lightBlue3',
    statuses: [
      {
        id: 8,
        name: 'Vendor',
      },
      {
        id: 13,
        name: 'No Relationship',
      },
      {
        id: 14,
        name: 'Loose Relationship',
      },
      {
        id: 15,
        name: 'Lawyer',
      },
      {
        id: 16,
        name: 'Contractor',
      },
      {
        id: 17,
        name: 'Mortgage Broker',
      },
      {
        id: 18,
        name: 'Mover',
      },
      {
        id: 19,
        name: 'Photographer',
      },
      {
        id: 20,
        name: 'Staging',
      },
      {
        id: 21,
        name: 'Home Inspector',
      },
      {
        id: 22,
        name: 'Finance',
      },
      {
        id: 23,
        name: 'Insurance',
      },
      {
        id: 24,
        name: 'Appraiser',
      },
      {
        id: 25,
        name: 'Handyman',
      },
      {
        id: 26,
        name: 'Architect',
      },
      {
        id: 27,
        name: 'Software',
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
    statusMainTitle: 'Agent',
    color: 'border-red4',
    statuses: [
      {
        id: 11,
        name: 'Dropped',
        color: 'bg-red2',
      },
    ],
  },
  {
    id: 2,
    statusMainTitle: 'Unspecified',
    color: 'border-gray4',
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
    label: 'Friend',
  },
  {
    id: 1,
    label: 'Spouse',
  },
  {
    id: 2,
    label: 'Roommate',
  },
  {
    id: 3,
    label: 'Co-worker',
  },
];

export const dropped_status_id = 11;
export const trash_category_id = 3;

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
    name: 'Unspecified',
  },
];

export const othersOptions = [
  {
    id: 14,
    name: 'Family',
  },
  {
    id: 13,
    name: 'Friend',
  },
  {
    id: 2,
    name: 'Unknown',
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

export const roomsOptions = [
  {
    id: 1,
    label: '1+',
  },
  {
    id: 2,
    label: '2+',
  },
  {
    id: 3,
    label: '3+',
  },
  {
    id: 4,
    label: '4+',
  },
  {
    id: 5,
    label: '5+',
  },
  {
    id: 6,
    label: '6+',
  },
  {
    id: 7,
    label: '7+',
  },
  {
    id: 8,
    label: '8+',
  },
  {
    id: 9,
    label: '9+',
  },
  {
    id: 10,
    label: '10+',
  },
];

export const bathroomsOptions = [
  {
    id: 1,
    label: '1+',
  },
  {
    id: 2,
    label: '1.5+',
  },
  {
    id: 3,
    label: '2+',
  },
  {
    id: 4,
    label: '3+',
  },
  {
    id: 5,
    label: '4+',
  },
];

export const leadSourceOptions = [
  // {
  //   id: 1,
  //   name: 'Google Contacts',
  // },
  // {
  //   id: 2,
  //   name: 'Google Email',
  // },
  {
    id: 3,
    label: 'Cold Call',
  },
  {
    id: 4,
    label: 'Company Website',
  },
  {
    id: 5,
    label: 'Craigslist',
  },
  {
    id: 6,
    label: 'Facebook',
  },
  {
    id: 7,
    label: 'Instagram',
  },
  {
    id: 8,
    label: 'OpCity',
  },
  {
    id: 9,
    label: 'Referral',
  },
  {
    id: 10,
    label: 'Renthop',
  },
  {
    id: 11,
    label: 'Streeteasy',
  },
  {
    id: 12,
    label: 'Trulia',
  },
  {
    id: 13,
    label: 'Zillow',
  },
  {
    id: 14,
    label: 'Zumper',
  },
  {
    id: 15,
    label: 'Other',
  },
];

// export const phoneNumberRules = /^\s*[(]?(\d{3})[\s)]*(\d{3})[\s-]*(\d{4})$/;
export const phoneNumberRules = /^[+]{1}[1]{1}(\d{10})$/;

export const filtersForLastCommunicationDate = {
  'Up to Date': 'healthy',
  'Not Up to Date': 'unhealthy',
  Today: 'today',
  '1 Week ago': [1, 'weeks'],
  '2 Weeks ago': [2, 'weeks'],
  '1 Month ago': [1, 'months'],
};

export const multiselectOptionsClients = [
  { value: 'Super High Priority!', label: 'Super High Priority!' },
  { value: 'High Priority', label: 'High Priority' },
  { value: 'Low Priority', label: 'Low Priority' },
];

export const multiselectOptionsProfessionals = [
  { value: 'Lawyer', label: 'Lawyer' },
  { value: 'Contractor', label: 'Contractor' },
  { value: 'Mortgage Broker', label: 'Mortgage Broker' },
  { value: 'Title Agent', label: 'Title Agent' },
  { value: 'Agent', label: 'Agent' },
  { value: 'Friend', label: 'Friend' },
  { value: 'Family', label: 'Family' },
  { value: 'Mover', label: 'Mover' },
  { value: 'Photographer', label: 'Photographer' },
  { value: 'Staging', label: 'Staging' },
  { value: 'Home Inspector', label: 'Home Inspector' },
  { value: 'Finance', label: 'Finance' },
  { value: 'Insurance', label: 'Insurance' },
  { value: 'appraiser', label: 'Appraiser' },
  { value: 'Handyman', label: 'Handyman' },
  { value: 'Architect', label: 'Architect' },
  { value: 'Software', label: 'Software' },
];

export const tagsForProfessionals = [
  {
    value: 'No Relationship',
    label: 'No Relationship',
  },
  {
    value: 'Loose Relationship',
    label: 'Loose Relationship',
  },
  {
    value: 'Strong Relationship',
    label: 'Strong Relationship',
  },
  {
    value: 'Dropped',
    label: 'Dropped',
  },
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
    Dropped: 0,
  },
  professionals: {
    Dropped: 0,
    'No Relationship': 90,
    'Loose Relationship': 90,
    'Strong Relationship': 90,
  },
};

export const NYCneighborhoods = [
  {
    value: 352,
    label: 'Midtown',
  },
  {
    value: 353,
    label: 'Midtown South',
  },
  {
    value: 1,
    label: 'Upper West Side',
  },
  {
    value: 46,
    label: 'Manhattan Valley',
  },
  {
    value: 47,
    label: 'Morningside Heights',
  },
  {
    value: 338,
    label: 'Lincoln Square',
  },
  {
    value: 2,
    label: 'Upper East Side',
  },
  {
    value: 319,
    label: 'Carnegie Hill',
  },
  {
    value: 356,
    label: 'Lenox Hill',
  },
  {
    value: 357,
    label: 'Yorkville',
  },
  {
    value: 359,
    label: 'Upper Carnegie Hill',
  },
  {
    value: 3,
    label: 'Midtown East',
  },
  {
    value: 335,
    label: 'Kips Bay',
  },
  {
    value: 350,
    label: 'Sutton Place',
  },
  {
    value: 362,
    label: 'Turtle Bay',
  },
  {
    value: 251,
    label: 'Murray Hill',
  },
  {
    value: 4,
    label: 'Midtown West',
  },
  {
    value: 387,
    label: 'Hudson Yards',
  },
  {
    value: 21,
    label: 'Downtown',
  },
  {
    value: 354,
    label: 'Civic Center',
  },
  {
    value: 19,
    label: 'Battery Park City',
  },
  {
    value: 7,
    label: 'Chelsea',
  },
  {
    value: 15,
    label: 'Chinatown Little Italy',
  },
  {
    value: 17,
    label: 'East Village',
  },
  {
    value: 247,
    label: 'Financial District',
  },
  {
    value: 10,
    label: 'Flatiron',
  },
  {
    value: 13,
    label: 'Gramercy Park',
  },
  {
    value: 248,
    label: 'Greenwich Village',
  },
  {
    value: 249,
    label: 'Little Italy',
  },
  {
    value: 18,
    label: 'Lower East Side',
  },
  {
    value: 252,
    label: 'Nolita',
  },
  {
    value: 388,
    label: 'Hudson Square',
  },
  {
    value: 12,
    label: 'Soho',
  },
  {
    value: 16,
    label: 'Stuyvesant',
  },
  {
    value: 9,
    label: 'Tribeca',
  },
  {
    value: 8,
    label: 'West Village',
  },
  {
    value: 29,
    label: 'Upper Manhattan',
  },
  {
    value: 30,
    label: 'Inwood',
  },
  {
    value: 38,
    label: 'Central Harlem',
  },
  {
    value: 40,
    label: 'East Harlem',
  },
  {
    value: 43,
    label: 'Hamilton Heights',
  },
  {
    value: 52,
    label: 'Washington Heights',
  },
  {
    value: 53,
    label: 'West Harlem',
  },
  {
    value: 358,
    label: 'Manhattanville',
  },
  {
    value: 360,
    label: 'Marble Hill',
  },
  {
    value: 5,
    label: 'Brooklyn',
  },
  {
    value: 54,
    label: 'Bath Beach',
  },
  {
    value: 55,
    label: 'Bay Ridge',
  },
  {
    value: 56,
    label: 'Bedford Stuyvesant',
  },
  {
    value: 57,
    label: 'Bensonhurst',
  },
  {
    value: 58,
    label: 'Bergen Beach',
  },
  {
    value: 59,
    label: 'Boerum Hill',
  },
  {
    value: 60,
    label: 'Borough Park',
  },
  {
    value: 61,
    label: 'Brighton Beach',
  },
  {
    value: 62,
    label: 'Brooklyn Heights',
  },
  {
    value: 63,
    label: 'Brownsville',
  },
  {
    value: 64,
    label: 'Bushwick',
  },
  {
    value: 65,
    label: 'Canarsie',
  },
  {
    value: 66,
    label: 'Carroll Gardens',
  },
  {
    value: 67,
    label: 'Clinton Hill',
  },
  {
    value: 68,
    label: 'Cobble Hill',
  },
  {
    value: 69,
    label: 'Columbia St Waterfront District',
  },
  {
    value: 70,
    label: 'Coney Island',
  },
  {
    value: 71,
    label: 'Crown Heights',
  },
  {
    value: 72,
    label: 'Ditmas Park',
  },
  {
    value: 73,
    label: 'Downtown Brooklyn',
  },
  {
    value: 74,
    label: 'Dumbo',
  },
  {
    value: 75,
    label: 'Dyker Heights',
  },
  {
    value: 77,
    label: 'East New York',
  },
  {
    value: 79,
    label: 'Flatbush',
  },
  {
    value: 80,
    label: 'Flatlands',
  },
  {
    value: 81,
    label: 'Fort Greene',
  },
  {
    value: 82,
    label: 'Gerritsen Beach',
  },
  {
    value: 83,
    label: 'Gowanus',
  },
  {
    value: 84,
    label: 'Gravesend',
  },
  {
    value: 85,
    label: 'Greenpoint',
  },
  {
    value: 86,
    label: 'Greenwood',
  },
  {
    value: 88,
    label: 'Kensington',
  },
  {
    value: 89,
    label: 'Manhattan Beach',
  },
  {
    value: 90,
    label: 'Mapleton',
  },
  {
    value: 91,
    label: 'Marine Park',
  },
  {
    value: 92,
    label: 'Midwood',
  },
  {
    value: 93,
    label: 'Mill Basin',
  },
  {
    value: 94,
    label: 'Park Slope',
  },
  {
    value: 95,
    label: 'Prospect Heights',
  },
  {
    value: 97,
    label: 'Prospect Park South',
  },
  {
    value: 98,
    label: 'Prospect Lefferts Gardens',
  },
  {
    value: 99,
    label: 'Red Hook',
  },
  {
    value: 100,
    label: 'Seagate',
  },
  {
    value: 101,
    label: 'Sheepshead Bay',
  },
  {
    value: 102,
    label: 'Sunset Park',
  },
  {
    value: 106,
    label: 'Williamsburg',
  },
  {
    value: 107,
    label: 'Windsor Terrace',
  },
  {
    value: 326,
    label: 'Starrett City',
  },
  {
    value: 367,
    label: 'Ocean Parkway',
  },
  {
    value: 368,
    label: 'Northeast Flatbush',
  },
  {
    value: 369,
    label: 'Old Mill Basin',
  },
  {
    value: 370,
    label: 'Ocean Hill',
  },
  {
    value: 23,
    label: 'Queens',
  },
  {
    value: 108,
    label: 'Alley Park',
  },
  {
    value: 110,
    label: 'Astoria',
  },
  {
    value: 112,
    label: 'Auburndale',
  },
  {
    value: 113,
    label: 'Bay Terrace',
  },
  {
    value: 114,
    label: 'Bayside',
  },
  {
    value: 118,
    label: 'Bellerose',
  },
  {
    value: 122,
    label: 'Briarwood',
  },
  {
    value: 124,
    label: 'Brookville',
  },
  {
    value: 125,
    label: 'Cambria Heights',
  },
  {
    value: 126,
    label: 'Clearview',
  },
  {
    value: 127,
    label: 'College Point',
  },
  {
    value: 128,
    label: 'Corona',
  },
  {
    value: 129,
    label: 'Douglaston',
  },
  {
    value: 130,
    label: 'East Elmhurst',
  },
  {
    value: 132,
    label: 'Elmhurst',
  },
  {
    value: 134,
    label: 'Floral Park',
  },
  {
    value: 135,
    label: 'Flushing',
  },
  {
    value: 137,
    label: 'Forest Hills',
  },
  {
    value: 140,
    label: 'Fresh Meadows',
  },
  {
    value: 141,
    label: 'Glen Oaks Village',
  },
  {
    value: 142,
    label: 'Glendale',
  },
  {
    value: 144,
    label: 'Hillcrest',
  },
  {
    value: 145,
    label: 'Hollis',
  },
  {
    value: 147,
    label: 'Howard Beach',
  },
  {
    value: 149,
    label: 'Jackson Heights',
  },
  {
    value: 150,
    label: 'Jamaica',
  },
  {
    value: 152,
    label: 'Jamaica Estates',
  },
  {
    value: 153,
    label: 'Jamaica Hills',
  },
  {
    value: 154,
    label: 'Kew Gardens',
  },
  {
    value: 155,
    label: 'Kew Gardens Hills',
  },
  {
    value: 156,
    label: 'Laurelton',
  },
  {
    value: 159,
    label: 'Little Neck',
  },
  {
    value: 160,
    label: 'Long Island City',
  },
  {
    value: 162,
    label: 'Maspeth',
  },
  {
    value: 163,
    label: 'Middle Village',
  },
  {
    value: 166,
    label: 'North Corona',
  },
  {
    value: 167,
    label: 'Oakland Gardens',
  },
  {
    value: 169,
    label: 'Ozone Park',
  },
  {
    value: 170,
    label: 'Pomonok',
  },
  {
    value: 172,
    label: 'Queens Village',
  },
  {
    value: 175,
    label: 'Rego Park',
  },
  {
    value: 176,
    label: 'Richmond Hill',
  },
  {
    value: 177,
    label: 'Ridgewood',
  },
  {
    value: 180,
    label: 'Rosedale',
  },
  {
    value: 182,
    label: 'St. Albans',
  },
  {
    value: 186,
    label: 'South Jamaica',
  },
  {
    value: 187,
    label: 'South Ozone Park',
  },
  {
    value: 188,
    label: 'Springfield Gardens',
  },
  {
    value: 191,
    label: 'Sunnyside',
  },
  {
    value: 193,
    label: 'Utopia',
  },
  {
    value: 194,
    label: 'Whitestone',
  },
  {
    value: 195,
    label: 'Woodhaven',
  },
  {
    value: 196,
    label: 'Woodside',
  },
  {
    value: 327,
    label: 'The Rockaways',
  },
  {
    value: 345,
    label: 'Ditmars-Steinway',
  },
  {
    value: 371,
    label: 'New Hyde Park',
  },
  {
    value: 372,
    label: 'South Richmond Hill',
  },
  {
    value: 373,
    label: 'Rockaway All',
  },
  {
    value: 24,
    label: 'Bronx',
  },
  {
    value: 197,
    label: 'Baychester',
  },
  {
    value: 198,
    label: 'Bedford Park',
  },
  {
    value: 199,
    label: 'Belmont',
  },
  {
    value: 201,
    label: 'Castle Hill',
  },
  {
    value: 202,
    label: 'City Island',
  },
  {
    value: 205,
    label: 'Co-op City',
  },
  {
    value: 206,
    label: 'Concourse',
  },
  {
    value: 208,
    label: 'Country Club',
  },
  {
    value: 209,
    label: 'East Tremont',
  },
  {
    value: 210,
    label: 'Eastchester',
  },
  {
    value: 213,
    label: 'Fordham',
  },
  {
    value: 215,
    label: 'Hunts Point',
  },
  {
    value: 216,
    label: 'Kingsbridge',
  },
  {
    value: 217,
    label: 'Longwood',
  },
  {
    value: 219,
    label: 'Melrose',
  },
  {
    value: 220,
    label: 'Morris Heights',
  },
  {
    value: 221,
    label: 'Morris Park',
  },
  {
    value: 222,
    label: 'Morrisania',
  },
  {
    value: 223,
    label: 'Mott Haven',
  },
  {
    value: 227,
    label: 'Norwood',
  },
  {
    value: 229,
    label: 'Parkchester',
  },
  {
    value: 230,
    label: 'Pelham Bay',
  },
  {
    value: 231,
    label: 'Pelham Gardens',
  },
  {
    value: 232,
    label: 'Pelham Parkway',
  },
  {
    value: 234,
    label: 'Riverdale',
  },
  {
    value: 235,
    label: 'Schuylerville',
  },
  {
    value: 236,
    label: 'Soundview',
  },
  {
    value: 238,
    label: 'Throgs Neck',
  },
  {
    value: 240,
    label: 'University Heights',
  },
  {
    value: 241,
    label: 'Van Nest',
  },
  {
    value: 242,
    label: 'Wakefield',
  },
  {
    value: 244,
    label: 'Westchester Village',
  },
  {
    value: 245,
    label: 'Williamsbridge',
  },
  {
    value: 246,
    label: 'Woodlawn',
  },
  {
    value: 317,
    label: 'Bronxwood',
  },
  {
    value: 331,
    label: 'Woodstock',
  },
  {
    value: 337,
    label: 'Laconia',
  },
  {
    value: 341,
    label: 'North New York',
  },
  {
    value: 363,
    label: 'Crotona Park East',
  },
  {
    value: 364,
    label: 'Highbridge',
  },
  {
    value: 365,
    label: 'Tremont',
  },
  {
    value: 366,
    label: 'Edenwald',
  },
  {
    value: 22,
    label: 'Westchester',
  },
  {
    value: 6,
    label: 'Other',
  },
  {
    value: 34,
    label: 'Roosevelt Island',
  },
  {
    value: 26,
    label: 'New Jersey',
  },
  {
    value: 25,
    label: 'Staten Island',
  },
  {
    value: 256,
    label: 'Annadale',
  },
  {
    value: 257,
    label: 'Arden Heights',
  },
  {
    value: 258,
    label: 'Arlington',
  },
  {
    value: 259,
    label: 'Arrochar',
  },
  {
    value: 260,
    label: 'Bay Terrace',
  },
  {
    value: 261,
    label: 'Bloomfield',
  },
  {
    value: 262,
    label: 'Bulls Head',
  },
  {
    value: 264,
    label: 'Castleton Corners',
  },
  {
    value: 265,
    label: 'Charleston',
  },
  {
    value: 266,
    label: 'Chelsea (Staten Island)',
  },
  {
    value: 267,
    label: 'Clifton',
  },
  {
    value: 269,
    label: 'Dongan Hills',
  },
  {
    value: 270,
    label: 'Elm Park',
  },
  {
    value: 271,
    label: 'Eltingville',
  },
  {
    value: 272,
    label: 'Emerson Hill',
  },
  {
    value: 273,
    label: 'Graniteville',
  },
  {
    value: 274,
    label: 'Grant City',
  },
  {
    value: 275,
    label: 'Grasmere',
  },
  {
    value: 276,
    label: 'Great Kills',
  },
  {
    value: 277,
    label: 'Greenridge',
  },
  {
    value: 278,
    label: 'Grymes Hill',
  },
  {
    value: 280,
    label: 'Howland Hook',
  },
  {
    value: 281,
    label: 'Huguenot',
  },
  {
    value: 282,
    label: 'Lighthouse Hill',
  },
  {
    value: 284,
    label: 'Midland Beach',
  },
  {
    value: 285,
    label: 'New Brighton',
  },
  {
    value: 286,
    label: 'New Dorp',
  },
  {
    value: 287,
    label: 'New Dorp Beach',
  },
  {
    value: 288,
    label: 'New Springville',
  },
  {
    value: 289,
    label: 'Oakwood',
  },
  {
    value: 291,
    label: 'Park Hill',
  },
  {
    value: 292,
    label: 'Pleasant Plains',
  },
  {
    value: 294,
    label: 'Port Richmond',
  },
  {
    value: 298,
    label: 'Richmond Valley',
  },
  {
    value: 299,
    label: 'Rosebank',
  },
  {
    value: 300,
    label: 'Rossville',
  },
  {
    value: 301,
    label: 'Shore Acres',
  },
  {
    value: 302,
    label: 'Silver Lake',
  },
  {
    value: 303,
    label: 'South Beach',
  },
  {
    value: 305,
    label: 'Stapleton',
  },
  {
    value: 309,
    label: 'Todt Hill',
  },
  {
    value: 310,
    label: 'Tompkinsville',
  },
  {
    value: 311,
    label: 'Tottenville',
  },
  {
    value: 312,
    label: 'Travis',
  },
  {
    value: 313,
    label: 'West Brighton',
  },
  {
    value: 314,
    label: 'Westerleigh',
  },
  {
    value: 315,
    label: 'Woodrow',
  },
  {
    value: 375,
    label: 'Egbertville',
  },
  {
    value: 376,
    label: 'Fort Wadsworth',
  },
  {
    value: 377,
    label: 'Manor Heights',
  },
  {
    value: 378,
    label: 'Mariners Harbor',
  },
  {
    value: 379,
    label: 'Meiers Corners',
  },
  {
    value: 380,
    label: 'Ocean Breeze',
  },
  {
    value: 381,
    label: 'Princes Bay',
  },
  {
    value: 382,
    label: 'Richmondtown',
  },
  {
    value: 383,
    label: 'Saint George',
  },
  {
    value: 384,
    label: 'Sunnyside (Staten Island)',
  },
  {
    value: 385,
    label: 'Willowbrook',
  },
  {
    value: 386,
    label: 'Oakwood Beach',
  },
  {
    value: 27,
    label: 'Nassau',
  },
  {
    value: 28,
    label: 'Suffolk',
  },
];

export const activityTypes = [
  {
    id: 1,
    label: 'Email',
  },
  {
    id: 2,
    label: 'SMS',
  },
  {
    id: 3,
    label: 'Phone Call',
  },
  {
    id: 4,
    label: 'Social Media',
  },
  {
    id: 5,
    label: 'In Person',
  },
  {
    id: 6,
    label: 'Other',
  },
];

export const rentalPriceOptions = [
  { id: 1, value: 500, label: '$500' },
  { id: 2, value: 750, label: '$750' },
  { id: 3, value: 1000, label: '$1,000' },
  { id: 4, value: 1250, label: '$1,250' },
  { id: 5, value: 1500, label: '$1,500' },
  { id: 6, value: 1750, label: '$1,750' },
  { id: 7, value: 2000, label: '$2,000' },
  { id: 8, value: 2500, label: '$2,500' },
  { id: 9, value: 3000, label: '$3,000' },
  { id: 10, value: 3500, label: '$3,500' },
  { id: 11, value: 4000, label: '$4,000' },
  { id: 12, value: 4500, label: '$4,500' },
  { id: 13, value: 5000, label: '$5,000' },
  { id: 14, value: 6000, label: '$6,000' },
  { id: 15, value: 7000, label: '$7,000' },
  { id: 16, value: 8000, label: '$8,000' },
  { id: 17, value: 9000, label: '$9,000' },
  { id: 18, value: 10000, label: '$10,000' },
  { id: 19, value: 12500, label: '$12,500' },
  { id: 20, value: 15000, label: '$15,000' },
];

export const salePriceOptions = [
  { id: 21, value: 100000, label: '$100,000' },
  { id: 22, value: 150000, label: '$150,000' },
  { id: 23, value: 200000, label: '$200,000' },
  { id: 24, value: 250000, label: '$250,000' },
  { id: 25, value: 300000, label: '$300,000' },
  { id: 26, value: 400000, label: '$400,000' },
  { id: 27, value: 500000, label: '$500,000' },
  { id: 28, value: 600000, label: '$600,000' },
  { id: 29, value: 700000, label: '$700,000' },
  { id: 30, value: 800000, label: '$800,000' },
  { id: 31, value: 900000, label: '$900,000' },
  { id: 32, value: 1000000, label: '$1,000,000' },
  { id: 33, value: 1250000, label: '$1,250,000' },
  { id: 34, value: 1500000, label: '$1,500,000' },
  { id: 35, value: 1750000, label: '$1,750,000' },
  { id: 36, value: 2000000, label: '$2,000,000' },
  { id: 37, value: 2250000, label: '$2,250,000' },
  { id: 38, value: 2500000, label: '$2,500,000' },
  { id: 39, value: 2750000, label: '$2,750,000' },
  { id: 40, value: 3000000, label: '$3,000,000' },
  { id: 41, value: 3500000, label: '$3,500,000' },
  { id: 42, value: 4000000, label: '$4,000,000' },
  { id: 43, value: 4500000, label: '$4,500,000' },
  { id: 44, value: 5000000, label: '$5,000,000' },
  { id: 45, value: 6000000, label: '$6,000,000' },
  { id: 46, value: 7000000, label: '$7,000,000' },
  { id: 47, value: 8000000, label: '$8,000,000' },
  { id: 48, value: 9000000, label: '$9,000,000' },
  { id: 49, value: 10000000, label: '$10,000,000' },
  { id: 50, value: 12000000, label: '$12,000,000' },
  { id: 51, value: 14000000, label: '$14,000,000' },
  { id: 52, value: 16000000, label: '$16,000,000' },
  { id: 53, value: 20000000, label: '$20,000,000' },
  { id: 54, value: 25000000, label: '$25,000,000' },
  { id: 55, value: 30000000, label: '$30,000,000' },
];
