import { useState } from 'react';
import ClientCard from './card';
import Info from './info';
import DeleteClientOverlay from './overlays/delete-client';
import EditClientOverlay from './overlays/edit-client';

export default function ClientDetailsSidebar({
  client,
  handleFetchContactRequired,
}) {

  const [editingContact, setEditingContact] = useState(false);
  const [deletingClient, setDeletingContact] = useState(false);

  return (
    <div className="client-details-wrapper z-10 h-auto w-[550px]">
      <ClientCard
        handleDeleteClient={(value) => setDeletingContact(value)}
        handleEditContact={(value) => {
          setEditingContact(value);
        }}
        client={client}
      />
      <div className="border-b border-gray-2" />
      <Info
        client={client}
        handleFetchContactRequired={handleFetchContactRequired}
      />

      {deletingClient && (
        <DeleteClientOverlay
          handleCloseOverlay={() => setDeletingContact(false)}
          contact={client}
        />
      )}
      {editingContact && (
        <EditClientOverlay
          handleClose={() => setEditingContact(false)}
          title="Edit Contact"
          client={client}
          handleFetchContactRequired={handleFetchContactRequired}
        />
      )}
    </div>
  );
}
