import { Calculate } from '@mui/icons-material';
import ClientCard from './card';
import Info from './info';
import CategoryTypes from './info/categoryTypes';
import Relationships from './info/relationships/relationships';
import SimpleBar from 'simplebar-react';

export default function ClientDetailsSidebar({
  client,
  handleFetchContactRequired,
}) {
  return (
    <div className="client-details-wrapper z-10 w-[550px]">
      <ClientCard
        client={client}
        handleFetchContactRequired={handleFetchContactRequired}
      />
      <CategoryTypes
        client={client}
        handleFetchContactRequired={handleFetchContactRequired}
      />
      <SimpleBar autoHide={true} style={{ maxHeight: 'calc(100vh - 340px)' }}>
        <Info
          client={client}
          className="w-[635px]"
          handleFetchContactRequired={handleFetchContactRequired}
        />
        {/* <Relationships contactId={client?.id} /> */}
      </SimpleBar>
    </div>
  );
}
