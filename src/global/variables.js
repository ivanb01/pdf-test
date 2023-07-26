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
let origin;
if (typeof window !== 'undefined') {
  origin = window.location.origin;
}
export const redirectSignIn = `${origin}/contacts/clients`;

export const redirectSignOut = `${origin}/authentication/sign-in`;

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
  { id: 3, name: 'Uncategorized' },
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

export const vendorTypes = [
  { id: 15, name: 'Lawyer' },
  { id: 16, name: 'Contractor' },
  { id: 17, name: 'Mortgage Broker' },
  { id: 18, name: 'Mover' },
  { id: 19, name: 'Photographer' },
  { id: 20, name: 'Staging' },
  { id: 21, name: 'Home Inspector' },
  { id: 22, name: 'Finance' },
  { id: 23, name: 'Insurance' },
  { id: 24, name: 'Appraiser' },
  { id: 25, name: 'Handyman' },
  { id: 26, name: 'Architect' },
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
  {
    id: 3,
    name: 'Trash',
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
    name: 'Cold Call',
  },
  {
    id: 4,
    name: 'Company Website',
  },
  {
    id: 5,
    name: 'Craigslist',
  },
  {
    id: 6,
    name: 'Facebook',
  },
  {
    id: 7,
    name: 'Instagram',
  },
  {
    id: 8,
    name: 'OpCity',
  },
  {
    id: 9,
    name: 'Referral',
  },
  {
    id: 10,
    name: 'Renthop',
  },
  {
    id: 11,
    name: 'Streeteasy',
  },
  {
    id: 12,
    name: 'Trulia',
  },
  {
    id: 13,
    name: 'Zillow',
  },
  {
    id: 14,
    name: 'Zumper',
  },
  {
    id: 15,
    name: 'Other',
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
  { value: 1, label: 'Bath Beach' },
  { value: 2, label: 'Allerton' },
  { value: 3, label: 'Battery Park City' },
  { value: 4, label: 'Arverne' },
  { value: 5, label: 'Annadale' },
  { value: 6, label: 'Bay Ridge' },
  { value: 7, label: 'Bathgate' },
  { value: 8, label: 'Beekman Place' },
  { value: 9, label: 'Astoria' },
  { value: 10, label: 'Arden Heights' },
  { value: 11, label: 'Bedford Stuyvesant' },
  { value: 12, label: 'Baychester' },
  { value: 13, label: 'Carnegie Hill' },
  { value: 14, label: 'Astoria Heights' },
  { value: 15, label: 'Arlington' },
  { value: 16, label: 'Bensonhurst' },
  { value: 17, label: 'Bedford Park' },
  { value: 18, label: "Chelsea - 'Manhattan'" },
  { value: 19, label: 'Auburndale' },
  { value: 20, label: 'Arrochar' },
  { value: 21, label: 'Bergen Beach' },
  { value: 22, label: 'Belmont' },
  { value: 23, label: 'Chinatown' },
  { value: 24, label: 'Bay Terrace' },
  { value: 25, label: 'Bay Terrace' },
  { value: 26, label: 'Boerum Hill' },
  { value: 27, label: 'Bronxdale' },
  { value: 28, label: 'Civic Center' },
  { value: 29, label: 'Bayside' },
  { value: 30, label: 'Bloomfield' },
  { value: 31, label: 'Borough Park' },
  { value: 32, label: 'Bronx Park South' },
  { value: 33, label: 'Clinton' },
  { value: 34, label: 'Bayswater' },
  { value: 35, label: 'Bulls Head' },
  { value: 36, label: 'Brighton Beach' },
  { value: 37, label: 'Bronx River' },
  { value: 38, label: 'East Harlem' },
  { value: 39, label: 'Beechhurst' },
  { value: 40, label: 'Butler Manor' },
  { value: 41, label: 'Broadway Junction' },
  { value: 42, label: 'Castle Hill' },
  { value: 43, label: 'East Village' },
  { value: 44, label: 'Bellaire' },
  { value: 45, label: 'Castleton Corners' },
  { value: 46, label: 'Brooklyn Heights' },
  { value: 47, label: 'City Island' },
  { value: 48, label: 'Financial District' },
  { value: 49, label: 'Belle Harbor' },
  { value: 50, label: 'Charleston' },
  { value: 51, label: 'Brownsville' },
  { value: 52, label: 'Claremont Village' },
  { value: 53, label: 'Flatiron' },
  { value: 54, label: 'Bellerose' },
  { value: 55, label: "Chelsea - 'Staten Island'" },
  { value: 56, label: 'Bushwick' },
  { value: 57, label: 'Clason Point' },
  { value: 58, label: 'Gramercy' },
  { value: 59, label: 'Blissville' },
  { value: 60, label: 'Clifton' },
  { value: 61, label: 'Canarsie' },
  { value: 62, label: 'Concourse' },
  { value: 63, label: 'Greenwich Village' },
  { value: 64, label: 'Breezy Point' },
  { value: 65, label: 'Concord' },
  { value: 66, label: 'Carroll Gardens' },
  { value: 67, label: 'Concourse Village' },
  { value: 68, label: 'Hamilton Heights' },
  { value: 69, label: 'Briarwood' },
  { value: 70, label: 'Dongan Hills' },
  { value: 71, label: 'City Line' },
  { value: 72, label: 'Co-op City' },
  { value: 73, label: 'Harlem (Central)' },
  { value: 74, label: 'Broad Channel' },
  { value: 75, label: 'Egbertville' },
  { value: 76, label: 'Clinton Hill' },
  { value: 77, label: 'Country Club' },
  { value: 78, label: 'Herald Square' },
  { value: 79, label: 'Brookville' },
  { value: 80, label: 'Elm Park' },
  { value: 81, label: 'Cobble Hill' },
  { value: 82, label: 'East Tremont' },
  { value: 83, label: 'Hudson Square' },
  { value: 84, label: 'Cambria Heights' },
  { value: 85, label: 'Eltingville' },
  { value: 86, label: 'Coney Island' },
  { value: 87, label: 'Eastchester' },
  { value: 88, label: 'Inwood' },
  { value: 89, label: 'Clearview' },
  { value: 90, label: 'Emerson Hill' },
  { value: 91, label: 'Crown Heights' },
  { value: 92, label: 'Edenwald' },
  { value: 93, label: 'Lenox Hill' },
  { value: 94, label: 'College Point' },
  { value: 95, label: 'Fox Hills' },
  { value: 96, label: 'Cypress Hills' },
  { value: 97, label: 'Edgewater Park' },
  { value: 98, label: 'Lincoln Square' },
  { value: 99, label: 'Douglaston' },
  { value: 100, label: 'Graniteville' },
  { value: 101, label: 'Ditmas Park' },
  { value: 102, label: 'Fieldston' },
  { value: 103, label: 'Little Italy' },
  { value: 104, label: 'Dutch Kills' },
  { value: 105, label: 'Grant City' },
  { value: 106, label: 'Downtown' },
  { value: 107, label: 'Fordham' },
  { value: 108, label: 'Lower East Side' },
  { value: 109, label: 'East Elmhurst' },
  { value: 110, label: 'Grasmere' },
  { value: 111, label: 'DUMBO' },
  { value: 112, label: 'High Bridge' },
  { value: 113, label: 'Manhattan Valley' },
  { value: 114, label: 'Edgemere' },
  { value: 115, label: 'Great Kills' },
  { value: 116, label: 'Dyker Heights' },
  { value: 117, label: 'Hunts Point' },
  { value: 118, label: 'Manhattanville' },
  { value: 119, label: 'Elmhurst' },
  { value: 120, label: 'Greenridge' },
  { value: 121, label: 'East Flatbush' },
  { value: 122, label: 'Kingsbridge' },
  { value: 123, label: 'Midtown South' },
  { value: 124, label: 'Far Rockaway' },
  { value: 125, label: 'Grymes Hill' },
  { value: 126, label: 'East New York' },
  { value: 127, label: 'Kingsbridge Heights' },
  { value: 128, label: 'Midtown' },
  { value: 129, label: 'Floral Park' },
  { value: 130, label: 'Heartland Village' },
  { value: 131, label: 'East Williamsburg' },
  { value: 132, label: 'Longwood' },
  { value: 133, label: 'Morningside Heights' },
  { value: 134, label: 'Flushing' },
  { value: 135, label: 'Howland Hook' },
  { value: 136, label: 'Farragut' },
  { value: 137, label: 'Marble Hill' },
  { value: 138, label: 'Murray Hill' },
  { value: 139, label: 'Flushing (Downtown)' },
  { value: 140, label: 'Huguenot' },
  { value: 141, label: 'Flatbush' },
  { value: 142, label: 'Melrose' },
  { value: 143, label: 'NoHo' },
  { value: 144, label: 'Forest Hills' },
  { value: 145, label: 'Lighthouse Hill' },
  { value: 146, label: 'Flatlands' },
  { value: 147, label: 'Morris Heights' },
  { value: 148, label: 'Roosevelt Island' },
  { value: 149, label: 'Forest Hills Gardens' },
  { value: 150, label: 'Livingston' },
  { value: 151, label: 'Fort Greene' },
  { value: 152, label: 'Morris Park' },
  { value: 153, label: 'SoHo' },
  { value: 154, label: 'Fresh Meadows' },
  { value: 155, label: 'Manor Heights' },
  { value: 156, label: 'Fort Hamilton' },
  { value: 157, label: 'Morrisania' },
  { value: 158, label: 'South Village' },
  { value: 159, label: 'Glen Oaks' },
  { value: 160, label: "Mariner's Harbor" },
  { value: 161, label: 'Fulton Ferry' },
  { value: 162, label: 'Mott Haven' },
  { value: 163, label: 'Stuyvesant Town' },
  { value: 164, label: 'Glendale' },
  { value: 165, label: 'Midland Beach' },
  { value: 166, label: 'Georgetown' },
  { value: 167, label: 'Mount Eden' },
  { value: 168, label: 'Sutton Place' },
  { value: 169, label: 'Hammels' },
  { value: 170, label: 'New Brighton' },
  { value: 171, label: 'Gerritsen Beach' },
  { value: 172, label: 'Mount Hope' },
  { value: 173, label: 'Times Square' },
  { value: 174, label: 'Hillcrest' },
  { value: 175, label: 'New Dorp' },
  { value: 176, label: 'Gowanus' },
  { value: 177, label: 'North Riverdale' },
  { value: 178, label: 'Tribeca' },
  { value: 179, label: 'Hollis' },
  { value: 180, label: 'New Dorp Beach' },
  { value: 181, label: 'Gravesend' },
  { value: 182, label: 'Norwood' },
  { value: 183, label: 'Tudor City' },
  { value: 184, label: 'Holliswood' },
  { value: 185, label: 'New Springville' },
  { value: 186, label: 'Greenpoint' },
  { value: 187, label: 'Olinville' },
  { value: 188, label: 'Turtle Bay' },
  { value: 189, label: 'Howard Beach' },
  { value: 190, label: 'Oakwood' },
  { value: 191, label: 'Highland Park' },
  { value: 192, label: 'Parkchester' },
  { value: 193, label: 'Union Square' },
  { value: 194, label: 'Hunters Point' },
  { value: 195, label: 'Old Place' },
  { value: 196, label: 'Homecrest' },
  { value: 197, label: 'Pelham Bay' },
  { value: 198, label: 'Upper East Side' },
  { value: 199, label: 'Jackson Heights' },
  { value: 200, label: 'Old Town' },
  { value: 201, label: 'Pelham Gardens' },
  { value: 202, label: 'Kensington' },
  { value: 203, label: 'Upper West Side' },
  { value: 204, label: 'Jamaica' },
  { value: 205, label: 'Park Hill' },
  { value: 206, label: 'Kings Highway' },
  { value: 207, label: 'Pelham Parkway' },
  { value: 208, label: 'Wall Street' },
  { value: 209, label: 'Jamaica Center' },
  { value: 210, label: 'Pleasant Plains' },
  { value: 211, label: 'Manhattan Beach' },
  { value: 212, label: 'Port Morris' },
  { value: 213, label: 'Washington Heights' },
  { value: 214, label: 'Jamaica Estates' },
  { value: 215, label: 'Port Ivory' },
  { value: 216, label: 'Manhattan Terrace' },
  { value: 217, label: 'Riverdale' },
  { value: 218, label: 'West Village' },
  { value: 219, label: 'Jamaica Hills' },
  { value: 220, label: 'Port Richmond' },
  { value: 221, label: 'Mapleton' },
  { value: 222, label: 'Schuylerville' },
  { value: 223, label: 'Yorkville' },
  { value: 224, label: 'Kew Gardens' },
  { value: 225, label: "Prince's Bay" },
  { value: 226, label: 'Marine Park' },
  { value: 227, label: 'Soundview' },
  { value: 228, label: 'Kew Gardens Hills' },
  { value: 229, label: 'Randall Manor' },
  { value: 230, label: 'Midwood' },
  { value: 231, label: 'Spuyten Duyvil' },
  { value: 232, label: 'Laurelton' },
  { value: 233, label: 'Richmond Town' },
  { value: 234, label: 'Mill Basin' },
  { value: 235, label: 'Throgs Neck' },
  { value: 236, label: 'Lefrak City' },
  { value: 237, label: 'Richmond Valley' },
  { value: 238, label: 'Mill Island' },
  { value: 239, label: 'Unionport' },
  { value: 240, label: 'Lindenwood' },
  { value: 241, label: 'Rosebank' },
  { value: 242, label: 'Navy Yard' },
  { value: 243, label: 'University Heights' },
  { value: 244, label: 'Little Neck' },
  { value: 245, label: 'Rossville' },
  { value: 246, label: 'New Lots' },
  { value: 247, label: 'Van Nest' },
  { value: 248, label: 'Long Island City' },
  { value: 249, label: 'Sandy Ground' },
  { value: 250, label: 'North Side' },
  { value: 251, label: 'Wakefield' },
  { value: 252, label: 'Malba' },
  { value: 253, label: 'Shore Acres' },
  { value: 254, label: 'Ocean Hill' },
  { value: 255, label: 'West Farms' },
  { value: 256, label: 'Maspeth' },
  { value: 257, label: 'Silver Lake' },
  { value: 258, label: 'Ocean Parkway' },
  { value: 259, label: 'Westchester Square' },
  { value: 260, label: 'Middle Village' },
  { value: 261, label: 'South Beach' },
  { value: 262, label: 'Paerdegat Basin' },
  { value: 263, label: 'Williamsbridge' },
  { value: 264, label: 'Murray Hill' },
  { value: 265, label: 'St. George' },
  { value: 266, label: 'Park Slope' },
  { value: 267, label: 'Woodlawn' },
  { value: 268, label: 'Neponsit' },
  { value: 269, label: 'Stapleton' },
  { value: 270, label: 'Plum Beach' },
  { value: 271, label: 'New Hyde Park' },
  { value: 272, label: 'Sunnyside' },
  { value: 273, label: 'Prospect Heights' },
  { value: 274, label: 'North Corona' },
  { value: 275, label: 'Todt Hill' },
  { value: 276, label: 'Prospect Lefferts Gardens' },
  { value: 277, label: 'Oakland Gardens' },
  { value: 278, label: 'Tompkinsville' },
  { value: 279, label: 'Prospect Park South' },
  { value: 280, label: 'Ozone Park' },
  { value: 281, label: 'Tottenville' },
  { value: 282, label: 'Red Hook' },
  { value: 283, label: 'Pomonok' },
  { value: 284, label: 'Travis' },
  { value: 285, label: 'Remsen Village' },
  { value: 286, label: 'Queens Village' },
  { value: 287, label: 'Ward Hill' },
  { value: 288, label: 'Rugby' },
  { value: 289, label: 'Queensboro Hill' },
  { value: 290, label: 'West Brighton' },
  { value: 291, label: 'Sea Gate' },
  { value: 292, label: 'Ravenswood' },
  { value: 293, label: 'Westerleigh' },
  { value: 294, label: 'Sheepshead Bay' },
  { value: 295, label: 'Rego Park' },
  { value: 296, label: 'Willowbrook' },
  { value: 297, label: 'South Side' },
  { value: 298, label: 'Richmond Hill' },
  { value: 299, label: 'Woodrow' },
  { value: 300, label: 'Spring Creek' },
  { value: 301, label: 'Ridgewood' },
  { value: 302, label: 'Starrett City' },
  { value: 303, label: 'Rochdale' },
  { value: 304, label: 'Stuyvesant Heights' },
  { value: 305, label: 'Rockaway Park' },
  { value: 306, label: 'Sunset Park' },
  { value: 307, label: 'Rosedale' },
  { value: 308, label: 'Tompkins Park North' },
  { value: 309, label: 'Roxbury' },
  { value: 310, label: 'Vinegar Hill' },
  { value: 311, label: 'Seaside' },
  { value: 312, label: 'Weeksville' },
  { value: 313, label: 'Somerville' },
  { value: 314, label: 'West Brighton' },
  { value: 315, label: 'South Corona' },
  { value: 316, label: 'Williamsburg' },
  { value: 317, label: 'South Jamaica' },
  { value: 318, label: 'Windsor Terrace' },
  { value: 319, label: 'South Ozone Park' },
  { value: 320, label: 'Wingate' },
  { value: 321, label: 'Springfield Gardens' },
  { value: 322, label: 'St. Albans' },
  { value: 323, label: 'Steinway' },
  { value: 324, label: 'Sunnyside' },
  { value: 325, label: 'Sunnyside Gardens' },
  { value: 326, label: 'Utopia' },
  { value: 327, label: 'Whitestone' },
  { value: 328, label: 'Woodhaven' },
  { value: 329, label: 'Woodside' },
];

export const activityTypes = [
  {
    id: 1,
    name: 'Email',
  },
  {
    id: 2,
    name: 'SMS',
  },
  {
    id: 3,
    name: 'Phone Call',
  },
  {
    id: 4,
    name: 'Social Media',
  },
  {
    id: 5,
    name: 'In Person',
  },
  {
    id: 6,
    name: 'Other',
  },
];
