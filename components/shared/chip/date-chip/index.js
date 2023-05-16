import Mail from '@mui/icons-material/Mail';
import { healthLastCommunicationDate } from 'global/variables';
import {
  isHealthyCommuncationDate,
  formatDateAgo,
  isValidDate,
  isToday,
} from 'global/functions';
import moment from 'moment';

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
  let isHealthyCommunication = isHealthyCommuncationDate(
    lastCommunication,
    healthyCommunicationDays
  );

  styling = isHealthyCommunication
    ? 'text-green4 bg-green1'
    : 'text-red3 bg-red1';

  lastCommunicationLabel = isValidDate(lastCommunication)
    ? isToday(lastCommunication)
      ? 'Today'
      : formatDateAgo(lastCommunication)
    : 'No communication';

  return (
    <div
      className={`${className} mt-4 inline-block rounded-full px-3 text-xs font-medium items-center ${styling}`}
    >
      {/*the icon below depends from lastcommuncation category type */}
      <Mail className="w-4 mr-1" />
      <span>{lastCommunicationLabel} </span>
    </div>
  );
}
