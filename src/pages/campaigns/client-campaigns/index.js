import withAuth from '@components/withAuth';
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
    // {
    //   id: 3,
    //   name: 'for Landlords',
    //   value: 'Landlord',
    //   subtab: [],
    // },
  ]);

  return <ContactCampaigns isClient campaigns={campaigns} />;
};

export default withAuth(ClientCampaigns);

// export async function getServerSideProps(context) {
//   return {
//     props: {
//       requiresAuth: true,
//     },
//   };
// }
