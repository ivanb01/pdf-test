export const DOCUMENT_PLACEHOLDERS = [
  {
    id: 1,
    title: 'Paystub 1',
    form_name: 'paystub_1',
  },
  {
    id: 2,
    title: 'Paystub 2',
    form_name: 'paystub_2',
  },
  {
    id: 3,
    title: 'Tax Returns',
    form_name: 'tax_returns',
  },
  {
    id: 4,
    title: 'Tax Returns 2',
    form_name: 'tax_returns_2',
  },
  {
    id: 5,
    title: 'Bank Statement 1',
    form_name: 'bank_statement_1',
  },
  {
    id: 6,
    title: 'Bank Statement 2',
    form_name: 'bank_statement_2',
  },
  {
    id: 7,
    title: 'Copy of Photo ID',
    form_name: 'photo_id_copy',
  },
  {
    id: 8,
    title: 'W2',
    form_name: 'w2',
  },
];

export const SLIDER_BUTTONS = [
  {
    id: 0,
    name: 'All (36)',
  },
  {
    id: 1,
    name: 'Unsent (12)',
  },
  {
    id: 2,
    name: 'Sent (24)',
  },
];
export const USA_STATES_ABBR = [
  'AL',
  'AK',
  'AS',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DE',
  'DC',
  'FL',
  'GA',
  'GU',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'MP',
  'OH',
  'OK',
  'OR',
  'PA',
  'PR',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VA',
  'VI',
  'WA',
  'WV',
  'WI',
  'WY',
];

export const USA_STATES = [
  'Alabama',
  'Alaska',
  'American Samoa',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'District of Columbia',
  'Florida',
  'Georgia',
  'Guam',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Northern Mariana Islands',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Puerto Rico',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virgin Islands',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
];

// Create a mapping from state abbreviations to full names
export const abbrToFullNameMap = {
  AL: 'Alabama',
  AK: 'Alaska',
  AS: 'American Samoa',
  AZ: 'Arizona',
  AR: 'Arkansas',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  DE: 'Delaware',
  DC: 'District of Columbia',
  FL: 'Florida',
  GA: 'Georgia',
  GU: 'Guam',
  HI: 'Hawaii',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  IA: 'Iowa',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  ME: 'Maine',
  MD: 'Maryland',
  MA: 'Massachusetts',
  MI: 'Michigan',
  MN: 'Minnesota',
  MS: 'Mississippi',
  MO: 'Missouri',
  MT: 'Montana',
  NE: 'Nebraska',
  NV: 'Nevada',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NM: 'New Mexico',
  NY: 'New York',
  NC: 'North Carolina',
  ND: 'North Dakota',
  MP: 'Northern Mariana Islands',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PA: 'Pennsylvania',
  PR: 'Puerto Rico',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VT: 'Vermont',
  VI: 'Virgin Islands',
  VA: 'Virginia',
  WA: 'Washington',
  WV: 'West Virginia',
  WI: 'Wisconsin',
  WY: 'Wyoming',
};

export function getFullNameFromAbbreviations(abbr) {
  return abbrToFullNameMap[abbr];
}

export const fullNameToAbbrMap = {
  Alabama: 'AL',
  Alaska: 'AK',
  'American Samoa': 'AS',
  Arizona: 'AZ',
  Arkansas: 'AR',
  California: 'CA',
  Colorado: 'CO',
  Connecticut: 'CT',
  Delaware: 'DE',
  'District of Columbia': 'DC',
  Florida: 'FL',
  Georgia: 'GA',
  Guam: 'GU',
  Hawaii: 'HI',
  Idaho: 'ID',
  Illinois: 'IL',
  Indiana: 'IN',
  Iowa: 'IA',
  Kansas: 'KS',
  Kentucky: 'KY',
  Louisiana: 'LA',
  Maine: 'ME',
  Maryland: 'MD',
  Massachusetts: 'MA',
  Michigan: 'MI',
  Minnesota: 'MN',
  Mississippi: 'MS',
  Missouri: 'MO',
  Montana: 'MT',
  Nebraska: 'NE',
  Nevada: 'NV',
  'New Hampshire': 'NH',
  'New Jersey': 'NJ',
  'New Mexico': 'NM',
  'New York': 'NY',
  'North Carolina': 'NC',
  'North Dakota': 'ND',
  'Northern Mariana Islands': 'MP',
  Ohio: 'OH',
  Oklahoma: 'OK',
  Oregon: 'OR',
  Pennsylvania: 'PA',
  'Puerto Rico': 'PR',
  'Rhode Island': 'RI',
  'South Carolina': 'SC',
  'South Dakota': 'SD',
  Tennessee: 'TN',
  Texas: 'TX',
  Utah: 'UT',
  Vermont: 'VT',
  'Virgin Islands': 'VI',
  Virginia: 'VA',
  Washington: 'WA',
  'West Virginia': 'WV',
  Wisconsin: 'WI',
  Wyoming: 'WY',
};

export function getAbbreviationFromFullName(fullNames) {
  return fullNameToAbbrMap[fullNames];
}

export const SIDEBAR_BUTTONS = [
  {
    id: 0,
    label: 'Rental Information',
  },
  {
    id: 1,
    label: "Client's Information",
  },
  {
    id: 2,
    label: 'Employment Information',
  },
  {
    id: 3,
    label: 'Documents',
  },
  {
    id: 4,
    label: 'Financials',
  },
  {
    id: 5,
    label: 'Other Info',
  },
];

export const STEPS = [
  { id: 1, order: 1, label: 'Build' },
  { id: 2, order: 2, label: 'Preview and Save' },
];

export const CLIENT_OPTIONS = [
  {
    id: 1,
    label: 'Renter',
  },
  {
    id: 2,
    label: 'Buyer',
  },
  {
    id: 3,
    label: 'Seller',
  },
  {
    id: 4,
    label: 'Landlord',
  },
];

export const TEXT_FORMAT_STYLES = {
  0: { fontFamily: 'Poppins' },
  1: {
    fontFamily: 'Poppins',
    fontWeight: 600,
  },
  2: {
    fontFamily: 'Poppins',
    fontStyle: 'italic',
  },
  8: {
    fontFamily: 'Poppins',
    textDecoration: 'underline',
  },
  3: {
    fontFamily: 'Poppins',
    fontWeight: 600,
    fontStyle: 'italic',
  },
  10: {
    fontFamily: 'Poppins',
    textDecoration: 'underline',
    fontStyle: 'italic',
  },
  9: {
    fontFamily: 'Poppins',
    fontWeight: 600,
    textDecoration: 'underline',
  },
  11: {
    fontFamily: 'Poppins',
    fontWeight: 600,
    textDecoration: 'underline',
    fontStyle: 'italic',
  },
};

export const JUSTIFY_PARAGRAPH = {
  '': 'flex-start',
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
};

export const FONTS = {
  family: 'Poppins',
  fonts: [
    {
      src: '/fonts/poppins/Poppins-Regular.ttf',
    },
    {
      src: '/fonts/poppins/Poppins-Bold.ttf',
      fontWeight: 600,
    },
    {
      src: '/fonts/poppins/Poppins-Thin.ttf',
      fontWeight: 400,
    },
    {
      src: '/fonts/poppins/Poppins-Medium.ttf',
      fontWeight: 500,
    },
    {
      src: '/fonts/poppins/Poppins-Italic.ttf',
      fontStyle: 'italic',
    },
    {
      src: '/fonts/poppins/Poppins-BoldItalic.ttf',
      fontStyle: 'italic',
      fontWeight: 600,
    },
  ],
};

//constants
const PIXELS_POINTS_RATIO = 0.75;

//editor constants (pixels)
const EDITOR_WIDTH = 748;
const EDITOR_FONT_SIZE = 15;
const EDITOR_FORM_INPUT_WIDTH = 200;
const TABLE_CELL_PADDING_HORIZONTAL_EDITOR = 8;
const EDITOR_HEADING1_SIZE = 24;
const EDITOR_HEADING1_MARGIN_BOTTOM = 12;
const EDITOR_HEADING2_SIZE = 18;
const EDITOR_HEADING2_MARGIN_BOTTOM = 10;
const EDITOR_PARAGRAPH_MARGIN_BOTTOM = 8;
const EDITOR_LIST_PADDING_LEFT = 15;
const EDITOR_LIST_ITEM_VERTICAL_PADDING = 8;
const EDITOR_LIST_ITEM_HORIZONTAL_PADDING = 32;

const PDF_VW = 595.28;
const PDF_VH = 841.89;

export const PDF_PADDING = 50;
export const PDF_DOCUMENT_WIDTH = PDF_VW - 2 * PDF_PADDING;

export const HEADER_FOOTER_GAP = 7;
export const HEADER_FOOTER_PADDING = 30;

//ratios (pdf / editor)
const VIEWS_RATIO = PDF_DOCUMENT_WIDTH / (EDITOR_WIDTH * PIXELS_POINTS_RATIO);
export const TOTAL_RATIO = PIXELS_POINTS_RATIO * VIEWS_RATIO;
export const PDF_FONT_SIZE = EDITOR_FONT_SIZE * TOTAL_RATIO;
export const COLUMNS_GAP = TABLE_CELL_PADDING_HORIZONTAL_EDITOR * 2 * TOTAL_RATIO;

export const PDF_FORM_ELEMENT = EDITOR_FORM_INPUT_WIDTH * TOTAL_RATIO;
export const PDF_HEADING1_SIZE = EDITOR_HEADING1_SIZE * TOTAL_RATIO;
export const PDF_HEADING2_SIZE = EDITOR_HEADING2_SIZE * TOTAL_RATIO;
export const PDF_PARAGRAPH_MARGIN_BOTTOM = EDITOR_PARAGRAPH_MARGIN_BOTTOM * TOTAL_RATIO;
export const PDF_LIST_PADDING_LEFT = EDITOR_LIST_PADDING_LEFT * TOTAL_RATIO;
export const PDF_LIST_ITEM_VERTICAL_PADDING = EDITOR_LIST_ITEM_VERTICAL_PADDING * TOTAL_RATIO;
export const PDF_LIST_ITEM_HORIZONTAL_PADDING = EDITOR_LIST_ITEM_HORIZONTAL_PADDING * TOTAL_RATIO;
export const PDF_HEADING1_MARGIN_BOTTOM = EDITOR_HEADING1_MARGIN_BOTTOM * TOTAL_RATIO;
export const PDF_HEADING2_MARGIN_BOTTOM = EDITOR_HEADING2_MARGIN_BOTTOM * TOTAL_RATIO;

export const FORM_DROPDOWN_OPTIONS = [
  {
    id: 1,
    label: 'Agent',
    name: 'agent',
    icon: 'bg-[url(/icons/text-paragraph.svg)]',
  },
  {
    id: 2,
    label: 'Client',
    name: 'client',
    icon: 'bg-[url(/icons/text-paragraph.svg)]',
  },
  {
    id: 3,
    label: 'Date',
    name: 'date',
    icon: 'bg-[url(/icons/text-paragraph.svg)]',
  },
  {
    id: 4,
    label: 'Agent Signature',
    name: 'signature',
    icon: 'bg-[url(/icons/text-paragraph.svg)]',
  },
  {
    id: 5,
    label: 'Client Signature',
    name: 'signature',
    icon: 'bg-[url(/icons/text-paragraph.svg)]',
  },
  {
    id: 6,
    label: 'Email',
    name: 'email',
    icon: 'bg-[url(/icons/text-paragraph.svg)]',
  },
  {
    id: 7,
    label: 'Address',
    name: 'address',
    icon: 'bg-[url(/icons/text-paragraph.svg)]',
  },
  {
    id: 8,
    label: 'Price',
    name: 'price',
    icon: 'bg-[url(/icons/text-paragraph.svg)]',
  },
  {
    id: 9,
    label: 'City',
    name: 'city',
    icon: 'bg-[url(/icons/text-paragraph.svg)]',
  },
  {
    id: 10,
    label: 'Commission',
    name: 'commission',
    icon: 'bg-[url(/icons/text-paragraph.svg)]',
  },
  {
    id: 11,
    label: 'Number',
    name: 'number',
    icon: 'bg-[url(/icons/text-paragraph.svg)]',
  },
];

export const BLOCK_TYPE_TO_BLOCK_NAME = {
  h1: 'Heading 1',
  h2: 'Heading 2',
  ol: 'Numbered List',
  paragraph: 'Normal',
  ul: 'Bulleted List',
};
