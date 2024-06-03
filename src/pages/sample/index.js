import MainMenuV2 from '@components/shared/menu/menu-v2';
import { useState } from 'react';
const index = () => {
  const [menuItems] = useState([
    {
      id: 0,
      title: 'Homepage',
    },
    {
      id: 1,
      title: 'Contacts',
      submenus: [
        { id: 0, description: 'Active client list pipeline.', title: 'Clients' },
        { id: 1, description: 'Real estate experts, that help you close deals.', title: 'Professionals' },
        { id: 2, description: 'Clients that need follow-ups.', title: 'Need to Contact' },
        { id: 3, description: 'Unsorted contacts that you or A.I. can’t categorize.', title: 'Still Unknown' },
        {
          id: 4,
          description: 'Unsorted contacts that haven’t been reviewed by you or A.I.',
          title: 'Need to Categorize',
        },
        { id: 5, description: 'Personal connections.', title: 'Family and Friends' },
        { id: 6, description: 'Deleted contacts.', title: 'Trash' },
      ],
    },
    {
      id: 2,
      title: 'Campaigns',
    },
    {
      id: 3,
      title: 'Leaderboard',
    },
    {
      id: 4,
      title: 'Properties',
    },
    {
      id: 5,
      title: 'Applications',
    },

    {
      id: 6,
      title: 'Deals',
      submenus: [
        { id: 0, description: 'Closed and pending transactions.', title: 'Deals' },
        { id: 1, description: 'List of payments received.', title: 'Payments' },
      ],
    },
    {
      id: 7,
      title: 'Leads',
    },
    {
      id: 8,
      title: 'Online Forms',
    },
    {
      id: 9,
      title: 'Resources',
      submenus: [
        { id: 0, description: 'Suggested and vetted Service providers that help close deals.', title: 'Vendors' },
        { id: 1, description: 'Upcoming training sessions and classes.', title: 'Training Schedule' },
        { id: 2, description: 'Instructional training videos by topic. ', title: 'Training Videos' },
      ],
    },
  ]);
  return <MainMenuV2 items={menuItems} />;
};

export default index;
