import ActivityLog from 'public/images/activity-log.svg';
import List from '@mui/icons-material/List';
import Campaigns from '@mui/icons-material/Campaign';
import Note from '@mui/icons-material/Note';
import Home from '@mui/icons-material/Home';
import ActivityLogContent from './client-tabs/activity-log';
import CampaignsContent from './client-tabs/campaigns';
import LookingForContent from './client-tabs/looking-for';
import NotesContent from './client-tabs/notes';

export const tabs = (
  contactId,
  handleFetchContactRequired
) => [
  {
    id: 0,
    name: 'Campaigns',
    href: '#',
    icon: <Campaigns />,
    content: (
      <CampaignsContent
        contactId={contactId}
        handleFetchContactRequired={handleFetchContactRequired}
      />
    ),
  },
  {
    id: 1,
    name: 'Looking for',
    href: '#',
    icon: <Home />,
    content: <LookingForContent contactId={contactId}/>,
  },
  {
    id: 2,
    name: 'Notes',
    href: '#',
    icon: <Note />,
    content: <NotesContent contactId={contactId}/>,
  },
  {
    id: 3,
    name: 'Activity Log',
    href: '#',
    icon: <List />,
    content: <ActivityLogContent contactId={contactId}/>,
  },
];

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
    label: 'Tags',
  },
  {
    id: 'Source',
    optional: true,
    type: 'text',
    label: 'Tags',
  },
];
