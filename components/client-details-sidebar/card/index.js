import { useState } from 'react';
import Avatar from 'components/shared/avatar';
import Text from 'components/shared/text';
import { PhoneIcon, MailIcon } from '@heroicons/react/solid';
import {
  DotsVerticalIcon,
  TrashIcon,
  PencilIcon,
} from '@heroicons/react/outline';
import FilterDropdown from 'components/shared/dropdown/FilterDropdown';
import DeleteClientOverlay from 'components/overlays/delete-client';
import EditClientOverlay from 'components/overlays/edit-client';
import { getInitials } from 'global/functions';

export default function ClientCard({ client, handleFetchContactRequired }) {
  const [editingContact, setEditingContact] = useState(false);
  const [deletingClient, setDeletingContact] = useState(false);

  const types = [
    {
      name: (
        <span className="flex flex-row">
          <PencilIcon height={20} className="text-gray6 mr-3" />
          <Text p className="text-gray6">
            Edit Contact
          </Text>
        </span>
      ),
      handleClick: () => setEditingContact(true),
    },
    {
      name: (
        <span className="flex flex-row">
          <TrashIcon height={20} className="text-red5 mr-3" />
          <Text p className="text-red5">
            Delete Contact
          </Text>
        </span>
      ),
      handleClick: () => setDeletingContact(true),
    },
  ];

  return (
    <>
      <div className="py-[24px] pl-[24px] flex flex-row justify-items-center items-center">
        <Avatar
          initials={getInitials(client.first_name + ' ' + client.last_name)}
          src={client.profile_image_path}
          // src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
        />

        {/* profile_image_path */}
        <div className="flex flex-col ml-[18px]">
          <Text h1 className="">
            {client?.first_name} {client?.last_name}
          </Text>
          <span className="flex flex-col">
            <div className="flex items-center mt-2">
              <MailIcon
                className="h-4 w-4 text-[#9fa6b1] mr-1"
                aria-hidden="true"
              />
              <div className="text-sm">{client.email}</div>
            </div>
            <div className="flex items-center mt-2">
              <PhoneIcon
                className="h-4 w-4 text-[#9fa6b1] mr-1"
                aria-hidden="true"
              />
              <div className="text-sm">{client.phone_number}</div>
            </div>
          </span>
        </div>
        <div className="ml-auto mr-4">
          <FilterDropdown
            types={types}
            icon={<DotsVerticalIcon height={20} />}
          />
        </div>
      </div>

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
    </>
  );
}
