import ActivityLog from '/public/images/activity-log.svg';
import List from '@mui/icons-material/List';
import Campaigns from '@mui/icons-material/Campaign';
import Note from '@mui/icons-material/Note';
import Home from '@mui/icons-material/Home';
import ActivityLogContent from './client-tabs/activity-log';
import CampaignsContent from './client-tabs/campaigns';
import LookingForContent from './client-tabs/looking-for';
import NotesContent from './client-tabs/notes';

export const tabs = (contactId, contact) => {
  const clientTabs = [
    {
      id: 0,
      name:
        contact?.category_2 === 'Landlord' || contact?.category_2 === 'Seller'
          ? "Client's Comps"
          : "Client's Properties",
      href: '#',
      icon: <Home />,
      content: <LookingForContent category={contact?.category_2} contactId={contactId} />,
    },
    {
      id: 1,
      name: 'Activity',
      href: '#',
      icon: <List />,
      content: <ActivityLogContent contactId={contactId} source={contact?.import_source_text} contact={contact} />,
    },
    {
      id: 2,
      name: 'Campaigns',
      href: '#',
      icon: <Campaigns />,
      content: <CampaignsContent contactId={contactId} contact={contact} />,
    },
    {
      id: 3,
      name: 'Notes',
      href: '#',
      icon: <Note />,
      content: <NotesContent contactId={contactId} />,
    },
  ];
  const othersTabs = [
    {
      id: 0,
      name: 'Activity',
      href: '#',
      icon: <List />,
      content: <ActivityLogContent contactId={contactId} source={contact?.import_source_text} contact={contact} />,
    },
    {
      id: 1,
      name: 'Campaigns',
      href: '#',
      icon: <Campaigns />,
      content: <CampaignsContent contactId={contactId} contact={contact} />,
    },
    {
      id: 2,
      name: 'Notes',
      href: '#',
      icon: <Note />,
      content: <NotesContent contactId={contactId} />,
    },
  ];
  const professionalsTabs = [
    {
      id: 0,
      name: 'Activity',
      href: '#',
      icon: <List />,
      content: <ActivityLogContent contactId={contactId} source={contact?.import_source_text} contact={contact} />,
    },
    {
      id: 2,
      name: 'Notes',
      href: '#',
      icon: <Note />,
      content: <NotesContent contactId={contactId} />,
    },
  ];
  return contact?.category_1 == 'Professional'
    ? professionalsTabs
    : contact?.category_1 != 'Client'
    ? othersTabs
    : clientTabs;
};

export const inputs = [
  {
    id: 'status',
    type: 'dropdown',
    label: 'Status',
  },
  {
    id: 'email',
    type: 'email',
    label: 'Email',
  },
  {
    id: 'phone',
    type: 'phone',
    label: 'Phone Number',
  },
  {
    id: 'tags',
    type: 'tag',
    label: 'Priority',
  },
  {
    id: 'Source',
    optional: true,
    type: 'text',
    label: 'Tags',
  },
];
