import Uncategorized from './Uncategorized/uncategorized-content';
import Clients from './clients/clients-content';
import Professionals from './Professionals/professionals-content';

export const tabs = [
  {
    id: 0,
    name: 'Uncategorized',
    href: '#',
    content: <Uncategorized />,
    count: 35,
  },
  {
    id: 1,
    name: 'Clients',
    href: '#',
    content: <Clients />,
    count: 0,
  },
  {
    id: 2,
    name: 'Professionals',
    href: '#',
    content: <Professionals />,
    count: 10,
  },
];
