import ContactCampaigns from 'components/contact-campaigns';
import { useState } from 'react';

const ProfessionalsCampaigns = () => {
  const [campaigns, setCampaigns] = useState([
    {
      id: 0,
      name: 'for Vendors',
      value: 'Vendor',
      subtab: [],
    },
    {
      id: 1,
      name: 'for Agents',
      value: 'Agent',
      subtab: [],
    },
    {
      id: 2,
      name: 'for Others',
      value: 'Other',
      subtab: [],
    },
  ]);
  return <ContactCampaigns isClient={false} campaigns={campaigns} />;
};

export default ProfessionalsCampaigns;

export async function getStaticProps(context) {
  return {
    props: {
      requiresAuth: true,
    },
  };
}
