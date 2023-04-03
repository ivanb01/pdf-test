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
  statusStyle,
  typeStyle,
  children,
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

  if (typeStyle) {
    return (
      <div
        className={`${className} text-[#474D66] min-h-[28px] text-[11px] uppercase px-3 py-1 bg-gray1 rounded-[4px] font-medium mr-3 flex items-center`}
      >
        {children ? children : label}
      </div>
    );
  }

  if (statusStyle) {
    return (
      <div
        className={`${className} min-h-[28px] text-xs font-medium text-gray8 py-1 px-2 rounded-xl mr-3 flex items-center`}
      >
        {children ? children : label}
      </div>
    );
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
