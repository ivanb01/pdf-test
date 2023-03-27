import Mail from '@mui/icons-material/Mail';
import Close from '@mui/icons-material/Close';
export default function Chip({
  label,
  selected,
  className,
  selectedStatus,
  onClick,
  type,
  date,
  lastCommunication,
  secondary,
  notClickable,
  closable,
  active,
  removeChip,
  ...props
}) {
  // let today = new Date();
  // let diffDays = parseInt(
  //   (today - lastCommunication) / (1000 * 60 * 60 * 24),
  //   10
  // );
  // let styling = '';
  // let lastCommunicationLabel = '';
  // if (diffDays == 0) {
  //   lastCommunicationLabel = 'Today';
  //   styling = 'text-green4 bg-green1';
  // } else {
  //   lastCommunicationLabel = `${diffDays} days ago`;
  //   styling = 'text-red3 bg-red1';
  // }

  let lastCommunicationLabel = '';
  let styling = '';
  if (lastCommunication && lastCommunication.includes('hour')) {
    lastCommunicationLabel = 'Today';
    styling = 'text-green4 bg-green1';
  } else {
    lastCommunicationLabel = lastCommunication;
    styling = 'text-red3 bg-red1';
  }

  return (
    <>
      {lastCommunication ? (
        <div
          className={`${className} mt-4 inline-block rounded-full px-3 text-xs font-medium items-center ${styling}`}
        >
          {/*the icon below depends from lastcommuncation category type */}
          <Mail className="w-4 mr-1" />
          <span>{lastCommunicationLabel}</span>
        </div>
      ) : (
        <div
          onClick={onClick}
          className={`${
            selectedStatus && 'border-lightBlue3 text-lightBlue3'
          } ${secondary && 'bg-gray1 text-[#474D66] mr-2 text-xs'} ${
            !notClickable &&
            'hover:border-lightBlue3 hover:border transition-all cursor-pointer'
          }  ${
            active && 'border-lightBlue3 text-lightBlue3'
          } border inline-flex items-center justify-center px-2 py-0.5 rounded-full text-sm font-medium ${className}`}
        >
          {label}
          {closable && (
            <span className="ml-1" onClick={() => removeChip(label)}>
              <Close
                className={`h-3 w-3 ${
                  active ? 'text-lightBlue3' : 'text-gray4'
                }`}
              />
            </span>
          )}
        </div>
      )}
    </>
  );
}
