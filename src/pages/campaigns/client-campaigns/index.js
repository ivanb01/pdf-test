import ContactCampaigns from 'components/contact-campaigns';
import { useState } from 'react';

const ClientCampaigns = () => {
  const [campaigns, setCampaigns] = useState([
    {
      id: 0,
      name: 'for Renters',
      value: 'Renter',
      subtab: [],
    },
    {
      id: 1,
      name: 'for Buyers',
      value: 'Buyer',
      subtab: [],
    },
    {
      id: 2,
      name: 'for Sellers',
      value: 'Seller',
      subtab: [],
    },
    {
      id: 3,
      name: 'for Landlords',
      value: 'Landlord',
      subtab: [],
    },
  ]);

  return <ContactCampaigns isClient={true} campaigns={campaigns} />;
};

export default ClientCampaigns;

export async function getStaticProps(context) {
  return {
    props: {
      requiresAuth: true,
    },
  };
}
