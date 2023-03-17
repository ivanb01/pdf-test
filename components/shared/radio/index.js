import { classNames } from 'global/functions.js';
import Text from '../text';
import Button from '../button';
import NotificationAlert from '../alert/notification-alert';

export default function Radio({
  label,
  options,
  changeContactType,
  selectedContactType,
  className,
  error,
  errorText
}) {
  return (
    <div className={className}>
      {label && (
        <Text h4 className="text-gray7 text-left mb-3">
          {label}
        </Text>
      )}
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
        {options.map((option) => (
          <Button
            ternary
            active={selectedContactType == option.id}
            label={option.name}
            key={option.name}
            onClick={() => {
              changeContactType(option.id);
            }}
          />
          // <div
          //   key={option.name}
          //   value={option}
          //   onClick={() => {
          //     changeContactType(option.id);
          //   }}
          //   className={classNames(
          //     selectedContactType == option.id
          //       ? 'bg-lightBlue1 text-lightBlue5'
          //       : 'bg-gray1',
          //     'transition-all cursor-pointer py-2 px-[15px] uppercase inline-block text-center rounded text-xs font-medium  hover:text-lightBlue5 hover:bg-lightBlue1'
          //   )}
          // >
          //   <span>{option.name}</span>
          // </div>
        ))}
      </div>
      {error && errorText && <NotificationAlert className='mt-2 p-2' type={'error'}>{errorText}</NotificationAlert>}

    </div>
  );
}
