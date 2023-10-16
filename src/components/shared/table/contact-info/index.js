import { MinusCircleIcon } from '@heroicons/react/solid';
import Input from 'components/shared/input';
import Image from 'next/image';
import { PlusCircleIcon } from '@heroicons/react/solid';
import Chip from 'components/shared/chip';
import { getInitials } from 'global/functions';
import AIChip from '@components/shared/chip/ai-chip';
import TooltipComponent from '@components/shared/tooltip';
import InfoSharpIcon from '@mui/icons-material/InfoSharp';
import clients from '../../../../pages/contacts/clients';
import GoogleContact from '../../../../../public/images/GoogleContact.png';
import React from 'react';
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

const ContactInfo = ({ data, handleSelect, handleAction, showAIChip, inCategorization }) => {
  const getSource = (source) => {
    if (source === 'GmailAI' || source === 'Smart Sync A.I.' || source === 'Gmail') {
      return {
        name: 'AI Smart Synced Contact.',
        icon: <AIChip reviewed={data.approved_ai === false} />,
      };
    } else if (source === 'Manually Added') {
      return {
        name: 'Contact Added Manually',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M6.04175 13.9584H11.4584V12.7084H6.04175V13.9584ZM6.04175 10.625H13.9584V9.37508H6.04175V10.625ZM6.04175 7.29171H13.9584V6.04175H6.04175V7.29171ZM4.42316 17.0834C4.00222 17.0834 3.64591 16.9375 3.35425 16.6459C3.06258 16.3542 2.91675 15.9979 2.91675 15.577V4.42317C2.91675 4.00222 3.06258 3.64591 3.35425 3.35425C3.64591 3.06258 4.00222 2.91675 4.42316 2.91675H15.577C15.9979 2.91675 16.3542 3.06258 16.6459 3.35425C16.9375 3.64591 17.0834 4.00222 17.0834 4.42317V15.577C17.0834 15.9979 16.9375 16.3542 16.6459 16.6459C16.3542 16.9375 15.9979 17.0834 15.577 17.0834H4.42316Z"
              fill="#9CA3AF"
            />
          </svg>
        ),
      };
    } else if (source === 'Google Contacts') {
      return {
        name: 'Google Contact',
        icon: <Image src={GoogleContact} height={20} width={20} />,
      };
    } else {
      return <></>;
    }
  };
  return (
    <div className="flex items-center relative">
      {handleSelect && <Input type="checkbox" className="mr-1" onChange={(e) => handleSelect(e, data)}></Input>}
      <div className="h-10 w-10 flex-shrink-0 bg-gray-500 rounded-full">
        {data.image && data.image !== null ? (
          <img className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-400" src={data.image} />
        ) : (
          // <Image className="h-10 w-10 rounded-full" src={src} alt="" />
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">
            <span className="text-sm font-medium leading-none sss text-white">
              {getInitials(data.name).toUpperCase()}
            </span>
          </span>
        )}
      </div>
      <div className="ml-3">
        <div className="font-medium text-gray7 flex">
          {data.name} {showAIChip && <AIChip className="ml-2" reviewed={data.approved_ai} />}
        </div>
        {data.email && (
          <div title={data.email} className="ellipsis-email text-gray-500 font-medium">
            {data.email}
          </div>
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
      {inCategorization && (
        <div className={'flex items-center gap-1.5'}>
          <div>
            <div className={'h-5'}>{getSource(data.import_source_text).icon}</div>
          </div>
          {data.summary !== null ? (
            <TooltipComponent
              side={'right'}
              align={'center'}
              triggerElement={
                <InfoSharpIcon
                  className={`text-gray3 hover:text-gray4 mb-1.5`}
                  style={{ height: '18px', width: '18px' }}
                  aria-hidden="true"
                />
              }>
              <div className={`w-[260px] pointer-events-none text-white bg-neutral1 rounded-lg`}>
                <div className={`flex gap-1.5`}>
                  {getSource(data.import_source_text).icon}
                  <p className={'text-xs leading-4 font-medium'}>{getSource(data.import_source_text).name}</p>
                </div>
                <p className="text-xs leading-4 font-normal">{data.summary}</p>
              </div>
            </TooltipComponent>
          ) : (
            <></>
          )}
        </div>
      )}
      {handleAction && (
        <div>
          {data.assigned == 2 ? null : data.assigned == 1 ? (
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
      )}
    </div>
  );
};

export default ContactInfo;
