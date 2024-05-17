import Mail from '@mui/icons-material/Mail';
import { healthLastCommunicationDate } from 'global/variables';
import { isHealthyCommuncationDate, formatDateAgo, isValidDate, isToday } from 'global/functions';
import TooltipComponent from '@components/shared/tooltip';
import React from 'react';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { updateContactLocally } from '@store/contacts/slice';
import { updateContact } from '@api/contacts';

export default function DateChip({
  className,
  lastCommunication,
  lastCommunicationType,
  contactCategory,
  contactStatus,
  contact,
}) {
  const dispatch = useDispatch();
  let lastCommunicationLabel = '';
  let styling = '';
  const healthyCommunicationDays = healthLastCommunicationDate[contactCategory]
    ? healthLastCommunicationDate[contactCategory][contactStatus]
    : null;
  let isHealthyCommunication = isHealthyCommuncationDate(lastCommunication, healthyCommunicationDays);

  styling = isHealthyCommunication ? 'text-green4 bg-green1' : 'text-red3 bg-red1';

  lastCommunicationLabel = isValidDate(lastCommunication)
    ? isToday(lastCommunication)
      ? 'Today'
      : formatDateAgo(lastCommunication)
    : 'No communication';

  const updateCommunicationDate = (event) => {
    event.stopPropagation();
    if (contact) {
      toast.success('Updated last communication to Today.');
      dispatch(updateContactLocally({ ...contact, last_communication_date: new Date() }));
      updateContact(contact.id, { last_communication_date: new Date() });
    }
  };

  return (
    <TooltipComponent
      side={'left'}
      align="center"
      triggerElement={
        <div className="group/update h-[26px] w-full">
          {lastCommunicationLabel == 'Today' ? (
            <div
              className={`inline-flex rounded-full px-2 text-xs font-medium items-center  ${styling}  ${className}  `}>
              <Mail className="w-4 mr-1" />
              <span>{lastCommunicationLabel} </span>
            </div>
          ) : (
            <>
              <div
                onClick={(event) => updateCommunicationDate(event)}
                className="group-hover/update:inline-flex hidden rounded-full px-2 h-[24px] text-xs font-medium items-center bg-lightBlue1 text-lightBlue3">
                Update to: Today
              </div>
              <div
                className={`group-hover/update:hidden inline-flex rounded-full px-2 text-xs font-medium items-center  ${styling}  ${className}  `}>
                <Mail className="w-4 mr-1" />
                <span>{lastCommunicationLabel} </span>
              </div>
            </>
          )}
        </div>
      }>
      <div style={{ width: '202px' }} className={`flex flex-col justify-center  gap-1.5`}>
        <h6 className={' text-xs leading-4 font-medium'}>
          Communication Health is {isHealthyCommunication ? 'good' : 'low'}!
        </h6>
        {healthLastCommunicationDate[contactCategory] &&
          healthLastCommunicationDate[contactCategory][contactStatus] && (
            <p className={'text-xs leading-4 font-normal'}>
              {healthLastCommunicationDate[contactCategory][contactStatus]
                ? isHealthyCommunication
                  ? 'You are doing a great job!'
                  : `It is recommended to communicate in this status every ${
                      healthLastCommunicationDate[contactCategory.toLowerCase()][contactStatus] == 1
                        ? 'day'
                        : healthLastCommunicationDate[contactCategory.toLowerCase()][contactStatus] + ' days'
                    }.`
                : null}
            </p>
          )}
      </div>
    </TooltipComponent>
  );
}
