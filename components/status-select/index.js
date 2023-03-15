import Text from 'components/shared/text';
import Chip from 'components/shared/chip';

const StatusSelect = ({
  label,
  selectedStatus,
  setSelectedStatus,
  className,
  statuses,
}) => {
  return (
    <div>
      {label && (
        <Text h4 className="text-gray7 text-left mb-3">
          {label}
        </Text>
      )}
      <div className={`grid grid-cols-4 gap-4 sm:grid-cols-4 ${className}`}>
        {statuses.map((status, index) => {
          const color = status.color;
          let mainStatusId = status.id;
          return (
            <div key={status.id}>
              <Text
                className={`text-gray3 pb-2 ${color} border-b-4`}
                chipText
                // funnelArrow={index != 0 ? true : false}
              >
                {status.statusMainTitle}
              </Text>
              <div className="chips mt-4 flex flex-col">
                {status.statuses.map((status) => {
                  return (
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
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatusSelect;
