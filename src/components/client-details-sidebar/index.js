import { Calculate } from '@mui/icons-material';
import ClientCard from './card';
import Info from './info';
import CategoryTypes from './info/categoryTypes';
import Relationships from './info/relationships/relationships';
import SimpleBar from 'simplebar-react';

export default function ClientDetailsSidebar({ client, backButton }) {
  return (
    <div className="client-details-wrapper z-10 w-[550px]">
      {backButton}
      <ClientCard client={client} />
      {/* <CategoryTypes client={client} /> */}
      <SimpleBar autoHide style={{ maxHeight: 'calc(100vh - 290px)' }}>
        <Info client={client} className="w-[635px]" />
        {/* <Relationships contactId={client?.id} /> */}
      </SimpleBar>
    </div>
  );
}
