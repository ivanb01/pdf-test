import { MinusCircleIcon } from '@heroicons/react/solid';
import Input from 'components/shared/input';
import Image from 'next/image';
import { PlusCircleIcon } from '@heroicons/react/solid';
import Chip from 'components/shared/chip';
import { getInitials, getSource } from 'global/functions';
import AIChip from '@components/shared/chip/ai-chip';
import TooltipComponent from '@components/shared/tooltip';
import InfoSharpIcon from '@mui/icons-material/InfoSharp';
import clients from '../../../../pages/contacts/clients';
import GoogleContact from '../../../../../public/images/GoogleContact.png';
import React, { useEffect } from 'react';

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

const ContactInfo = ({
  data,
  handleSelect,
  handleAction,
  showAIChip,
  inCategorization,
  emailsLength,
  maxWidth,
  emailHover,
}) => {
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
        <div
          className={`font-medium text-gray7 flex  ${maxWidth && `lg-w-[${maxWidth}]`}  xl:min-w-[100px] lg:w-[150px]`}>
          <p className={'word-break overflow-hidden '} style={{ textOverflow: 'ellipsis' }}>
            {data.name}
          </p>{' '}
          {showAIChip && <AIChip className="ml-2" reviewed={data.approved_ai} />}
        </div>
        {data.email && (
          <div
            title={data.email}
            className={`ellipsis-email text-gray-500 font-medium ${
              maxWidth && `xl:min-w-[${maxWidth}]`
            } xl:min-w-[300px] lg:w-[120px] flex `}>
            {emailHover && (
              <TooltipComponent
                side={'bottom'}
                align={'center'}
                triggerElement={
                  <div className={`ellipsis-email ${maxWidth && `lg:w-[${maxWidth}]`} xl:min-w-[150px] lg:w-[130px]`}>
                    {data.email}
                  </div>
                }>
                <div className={'text-sm'}>{data.email}</div>
              </TooltipComponent>
            )}
            {inCategorization && (
              <div className={'flex items-center gap-1.5 flex-shrink-0 mr-1'}>
                <div>
                  <div className={'h-2'}>{getSource(data.import_source_text).icon}</div>
                </div>
                {data.summary !== null ? (
                  <TooltipComponent
                    side={'bottom'}
                    align={'center'}
                    triggerElement={
                      <InfoSharpIcon
                        className={`text-gray3 hover:text-gray4 mt-1`}
                        style={{ height: '15px', width: '15px' }}
                        aria-hidden="true"
                      />
                    }>
                    <div className={`max-w-[260px] pointer-events-none text-white bg-neutral1 rounded-lg`}>
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
            {inCategorization && data.email.length >= emailsLength ? (
              <TooltipComponent
                side={'bottom'}
                align={'center'}
                triggerElement={
                  <div className={`ellipsis-email xl:min-w-[300px] lg:w-[130px] ${maxWidth && `lg:w-[${maxWidth}]`} `}>
                    {data.email}
                  </div>
                }>
                <div className={'text-sm'}>{data.email}</div>
              </TooltipComponent>
            ) : (
              !emailHover && (
                <div className={`ellipsis-email xl:min-w-[300px] lg:w-[130px] ${maxWidth && `lg:w-[${maxWidth}]`} `}>
                  {data.email}
                </div>
              )
            )}
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
