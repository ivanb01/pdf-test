import Avatar from 'components/shared/avatar';
import Text from 'components/shared/text';
import { PhoneIcon, MailIcon } from '@heroicons/react/solid';
import {
  DotsVerticalIcon,
  TrashIcon,
  PencilIcon,
} from '@heroicons/react/outline';
import FilterDropdown from 'components/shared/dropdown/FilterDropdown';
import { useRouter } from 'next/router';

export default function ClientCard({
  handleDeleteClient,
  handleEditContact,
  client,
}) {
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
      handleClick: () => handleEditContact(true),
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
      handleClick: () => handleDeleteClient(true),
    },
  ];
  return (
    <div className="py-[26px] pl-[26px] flex flex-row justify-items-center items-center">
      <Avatar
        className=""
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      />
      <div className="flex flex-col">
        <Text h3 className="ml-3 font-bold">
          {client?.first_name} {client?.last_name}
        </Text>
        <span className="flex ml-3 mt-1 flex-col">
          <div className="flex items-center mb-1">
            <MailIcon
              className="h-4 w-4 text-[#9fa6b1] mr-1"
              aria-hidden="true"
            />
            <div className="text-sm">{client.email}</div>
          </div>
          <div className="flex items-center">
            <PhoneIcon
              className="h-4 w-4 text-[#9fa6b1] mr-1"
              aria-hidden="true"
            />
            <div className="text-sm">{client.phone_number}</div>
          </div>
        </span>
      </div>
      <div className="ml-auto mr-4">
        <FilterDropdown types={types} icon={<DotsVerticalIcon height={20} />} />
      </div>
    </div>
  );
}
