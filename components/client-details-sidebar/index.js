import { Calculate } from '@mui/icons-material';
import ClientCard from './card';
import Info from './info';
import CategoryTypes from './info/categoryTypes';
import Relationships from './info/relationships/relationships';

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
      <div className="overflow-y-scroll" style={{ height: 'calc(100vh - 350px)' }}>
        <Info
          client={client}
          className="w-[635px]"
          handleFetchContactRequired={handleFetchContactRequired}
        />
        {/* <Relationships contactId={client?.id} /> */}
      </div>
    </div>
  );
}
