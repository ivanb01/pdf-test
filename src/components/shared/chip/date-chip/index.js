import Mail from '@mui/icons-material/Mail';
import { healthLastCommunicationDate } from 'global/variables';
import { isHealthyCommuncationDate, formatDateAgo, isValidDate, isToday } from 'global/functions';
import moment from 'moment';
import AIReviewed from '../../../../../public/images/ai-reviewed.svg';
import AI from '../../../../../public/images/ai.svg';
import TooltipComponent from '@components/shared/tooltip';
import React from 'react';

export default function DateChip({
  className,
  lastCommunication,
  lastCommunicationType,
  contactCategory,
  contactStatus,
  ...props
}) {
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

  return (
    <div className={`${className} inline-flex rounded-full px-2 text-xs font-medium items-center ${styling}`}>
      {/*the icon below depends from lastcommuncation category type */}
      <Mail className="w-4 mr-1" />
      <TooltipComponent side={'bottom'} align="center" triggerElement={<span>{lastCommunicationLabel} </span>}>
        <div style={{ width: '202px' }} className={'flex flex-col gap-1.5'}>
          <h6 className={' text-xs leading-4 font-medium'}>
            Communication Health is {isHealthyCommunication ? 'good' : 'low'}!
          </h6>
          <p className={'text-xs leading-4 font-normal'}>
            {isHealthyCommunication
              ? 'You are doing a great job! '
              : `It is recommended to communicate in this status every ${
                  healthLastCommunicationDate[contactCategory.toLowerCase()][contactStatus] == 1
                    ? 'day'
                    : healthLastCommunicationDate[contactCategory.toLowerCase()][contactStatus] + ' days'
                }.`}
          </p>
        </div>
      </TooltipComponent>
    </div>
  );
}
