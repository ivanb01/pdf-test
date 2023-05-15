import Text from 'components/shared/text';
import Chip from 'components/shared/chip';
import NotificationAlert from 'components/shared/alert/notification-alert';

const StatusSelect = ({
  label,
  selectedStatus,
  setSelectedStatus,
  className,
  statuses,
  error,
  errorText,
}) => {
  return (
    <div>
      {label && (
        <Text h4 className="text-gray7 text-left mb-3">
          {label}
        </Text>
      )}
      <div className={`flex ${className}`}>
        {statuses.map((status, index) => {
          const color = status.color;
          let mainStatusId = status.id;
          let width = 0;
          if (
            status.statusMainTitle.toLowerCase() == 'in the funnel' ||
            status.statusMainTitle.toLowerCase() == 'closed' || status.statusMainTitle.toLowerCase() == 'active'
          ) {
            width = 40;
          } else {
            width = 20;
          }

          return (
            <div key={status.statusMainTitle} style={{ width: `${width}%` }}>
              <Text
                className={`text-gray3 pb-2 ${color} border-b-4`}
                chipText
                // funnelArrow={index != 0 ? true : false}
              >
                {status.statusMainTitle}
              </Text>
              <div className="chips mt-4 ">
                {status.statuses.map((status) => {
                  return (
                    <div className=" block">
                      <Chip
                        label={status.name}
                        key={status.id}
                        className="mb-4"
                        selectedStatus={
                          selectedStatus == status.id ? true : false
                        }
                        onClick={() => {
                          setSelectedStatus(status.id);
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      {error && errorText && (
        <NotificationAlert className="mt-2 p-2" type={'error'}>
          {errorText}
        </NotificationAlert>
      )}
    </div>
  );
};

export default StatusSelect;
