import { MinusCircleIcon } from '@heroicons/react/solid';
import Input from 'components/shared/input';
import Image from 'next/image';
import { PlusCircleIcon } from '@heroicons/react/solid';
import Chip from 'components/shared/chip';
import { getInitials } from 'global/functions';
const statusColors = {
  'New Lead': 'bg-lightBlue1',
  'Attempted Contact': 'bg-lightBlue2',
  'In Communication': 'bg-purple1',
  'Appointment Set': 'bg-purple2',
  'Actively Working': 'bg-purple3',
  'Offer Submitted': 'bg-purple4',
  'Contract Signed': 'bg-green8',
  Closed: 'bg-green2',
  'On Hold': 'bg-orange2',
  Dropped: 'bg-red2',
  'No Relationship': 'bg-lightBlue1',
  'Loose Relationship': 'bg-lightBlue2',
  'Strong Relationship': 'bg-purple1',
};
const ContactInfo = ({ data, handleSelect, handleAction }) => {
  return (
    <div className="flex items-center relative">
      {handleSelect && (
        <Input
          type="checkbox"
          className="mr-1"
          onChange={(e) => handleSelect(e, data)}
        ></Input>
      )}
      <div className="h-10 w-10 flex-shrink-0 bg-gray-500 rounded-full">
        {data.image && data.image !== null ? (
          <img
            className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-400"
            src={data.image}
          />
        ) : (
          // <Image className="h-10 w-10 rounded-full" src={src} alt="" />
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">
            <span className="text-sm font-medium leading-none text-white">
              {getInitials(data.name).toUpperCase()}
            </span>
          </span>
        )}
      </div>
      <div className="ml-3">
        <div className="font-medium text-gray7">{data.name}</div>
        {data.email && (
          <div className="text-gray-500 font-medium">{data.email}</div>
        )}
        <div className="flex flex-row">
          {data.type && <Chip typeStyle>{data.type}</Chip>}
          {data.status && (
            <Chip statusStyle className={`${statusColors[data?.status]}`}>
              {data.status}
            </Chip>
          )}
          {/* <div
                className={`${
                  statusColors[data?.status]
                }  inline-flex items-center justify-center px-4 py-1.5 rounded-full text-[#474D66] mr-2 text-xs font-medium`}
              >
                {data.status}
              </div> */}
        </div>
      </div>

      {data.assigned == 2 ? (
        <></>
      ) : data.assigned == 1 ? (
        <div className="group-hover:block hidden absolute right-2 top-1/2 -translate-y-1/2">
          <MinusCircleIcon
            className="h-5 w-5 text-gray3 group-hover:text-red4"
            onClick={() => handleAction(data.id, 'unassign')}
          />
        </div>
      ) : (
        <div className="group-hover:block hidden absolute right-2 top-1/2 -translate-y-1/2">
          <PlusCircleIcon
            className="h-5 w-5 text-gray3 group-hover:text-lightBlue3"
            onClick={() => handleAction(data.id, 'assign')}
          />
        </div>
      )}
    </div>
  );
};

export default ContactInfo;
