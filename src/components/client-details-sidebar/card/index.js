import { useState } from 'react';
import Avatar from 'components/shared/avatar';
import Text from 'components/shared/text';
import { PhoneIcon, MailIcon } from '@heroicons/react/solid';
import { DotsVerticalIcon } from '@heroicons/react/outline';
import { TrashIcon, PencilIcon, ExclamationCircleIcon } from '@heroicons/react/solid';

import FilterDropdown from 'components/shared/dropdown/FilterDropdown';
import DeleteClientOverlay from 'components/overlays/delete-client';
import EditClientOverlay from 'components/overlays/edit-client';
import { getInitials, phoneNumberFormat } from 'global/functions';
import { useRouter } from 'next/router';
import ReviewContact from '@components/overlays/review-contact';
import TooltipComponent from '@components/shared/tooltip';

export default function ClientCard({ client }) {
  const [editingContact, setEditingContact] = useState(false);
  const [deletingContact, setDeletingContact] = useState(false);
  const router = useRouter();
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
          initials={getInitials(client?.first_name + ' ' + client?.last_name)}
          src={client?.profile_image_path}
          // src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
        />

        {/* profile_image_path */}
        <div className="flex flex-col ml-[18px] max-w-[230px]">
          <Text h1 className="">
            {client?.first_name} {client?.last_name}
          </Text>
          <span className="flex flex-col">
            <div className="flex items-center mt-2">
              <MailIcon className="h-4 w-4 text-[#9fa6b1] mr-1" aria-hidden="true" />
              <div className="text-sm">{client?.email}</div>
            </div>
            <div className="flex items-center mt-2">
              <PhoneIcon className="h-4 w-4 text-[#9fa6b1] mr-1" aria-hidden="true" />
              <div className={`text-sm ${phoneNumberFormat(client?.phone_number) === 'N/A' ? 'italic mr-2' : ''}`}>
                {phoneNumberFormat(client?.phone_number) !== 'N/A'
                  ? phoneNumberFormat(client?.phone_number)
                  : 'No phone number'}
              </div>
              {phoneNumberFormat(client?.phone_number) === 'N/A' && (
                <TooltipComponent
                  side={'right'}
                  align={'center'}
                  triggerElement={<ExclamationCircleIcon className="h-5 w-5 text-red-600 " aria-hidden="true" />}>
                  <div style={{ width: '238px' }} className=" pointer-events-none  text-xs font-medium text-white ">
                    <p className="mb-2 font-semibold">Please add a phone number!</p>
                    <p>Without a phone number the SMS events in campaign cannot run.</p>
                  </div>
                </TooltipComponent>
              )}
            </div>
          </span>
        </div>
        <div className="ml-auto mr-4">
          <FilterDropdown
            types={client && client.category_id === 3 ? [types[0]] : types}
            icon={<DotsVerticalIcon height={20} />}
          />
        </div>
      </div>

      {deletingContact && <DeleteClientOverlay handleCloseOverlay={() => setDeletingContact(false)} contact={client} />}
      {editingContact && (
        <ReviewContact handleClose={() => setEditingContact(false)} client={client} title="Edit Contact" />
      )}
    </>
  );
}
