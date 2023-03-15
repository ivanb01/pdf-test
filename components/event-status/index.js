import Text from 'components/shared/text';

const EventStatusDate = ({ status }) => {
  let bgColor = '';
  let textColor = '';
  if (status == 'sent' || status == 'Sent') {
    bgColor = 'bg-green5';
    textColor = 'text-green7';
  } else if (status == 'scheduled' || status == 'Scheduled') {
    bgColor = 'bg-yellow2';
    textColor = 'text-yellow3';
  } else {
    bgColor = 'bg-red3';
    textColor = 'text-red3';
  }
  return (
    <div className="flex items-center justify-center">
      {status && (
        <>
          <span className={`block h-2 w-2 rounded-full ${bgColor} mr-2`} />
          <Text h4 className={textColor}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Text>
        </>
      )}
    </div>
  );
};

export default EventStatusDate;
