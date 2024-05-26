export const STEPS = [
  { id: 1, order: 1, label: 'Build' },
  { id: 2, order: 2, label: 'Preview and Save' },
];

export const CONTACT_TYPES_OPTIONS = [
  {
    value: 1,
    label: 'Renter',
  },
  {
    value: 2,
    label: 'Buyer',
  },
  {
    value: 3,
    label: 'Seller',
  },
  {
    value: 4,
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
const EDITOR_FORM_INPUT_WIDTH = 250;
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
    title: 'Client fields',
    fields: [
      {
        id: 1,
        label: 'Client Full Name',
        name: 'client_full_name',
        inputType: 'text',
      },
      {
        id: 2,
        label: 'Client Email',
        name: 'client_email',
        inputType: 'text',
      },
      {
        id: 3,
        label: 'Client Phone',
        name: 'client_phone',
        inputType: 'phone_number',
      },
      {
        id: 4,
        label: 'Client Signature',
        name: 'signature',
        inputType: 'signature',
      },
    ],
  },
  {
    id: 2,
    title: "Agent's fields",
    fields: [
      {
        id: 1,
        label: 'Agent Full Name',
        name: 'agent_full_name',
        inputType: 'text',
      },
      {
        id: 2,
        label: 'Agent Signature',
        name: 'signature',
        inputType: 'signature',
      },
    ],
  },
  {
    id: 3,
    title: 'Property fields',
    fields: [
      {
        id: 1,
        label: 'Unit number',
        name: 'unit_number',
        inputType: 'text',
      },
      {
        id: 2,
        label: 'Price',
        name: 'price',
        inputType: 'money',
      },
      {
        id: 3,
        label: 'Common Charges',
        name: 'common_charges',
        inputType: 'money',
      },
      {
        id: 3,
        label: 'Real Estate Taxes',
        name: 'real_estate_taxes',
        inputType: 'money',
      },
    ],
  },
  {
    id: 4,
    title: 'Contract terms',
    fields: [
      {
        id: 1,
        label: "Commision to Seller's Agent",
        name: 'seller_commision',
        inputType: 'percentage',
      },
      {
        id: 2,
        label: "Commision to Buyer's Agent",
        name: 'buyer_commision',
        inputType: 'percentage',
      },
      {
        id: 3,
        label: 'Expiration Date',
        name: 'expiration_date',
        inputType: 'date',
      },
      {
        id: 3,
        label: 'Relationship Type',
        name: 'relationship_type',
        inputType: 'text',
      },
      {
        id: 3,
        label: 'Signed Date',
        name: 'date',
        inputType: 'date',
      },
    ],
  },
];

export const BLOCK_TYPE_TO_BLOCK_NAME = {
  h1: 'Heading 1',
  h2: 'Heading 2',
  ol: 'Numbered List',
  paragraph: 'Normal',
  ul: 'Bulleted List',
};
