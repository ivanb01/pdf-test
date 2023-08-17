import { classNames } from 'global/functions.js';
import Text from '../text';
import Button from '../button';
import NotificationAlert from '../alert/notification-alert';

export default function Radio({
  label,
  options,
  setSelectedOption,
  selectedOption,
  className,
  error,
  errorText,
  secondary,
  name,
}) {
  return (
    <div className={className}>
      {label && (
        <Text h4 className="text-gray7 text-left mb-3">
          {label}
        </Text>
      )}
      <div className="flex">
        {options?.map((option) =>
          secondary ? (
            <div key={option.id} className="flex items-center mr-5" onClick={() => setSelectedOption(option.id)}>
              <input
                id={option.id}
                name={name ? name : 'radio-group'}
                type="radio"
                defaultChecked={option.id === selectedOption}
                className="h-4 w-4 border-gray-300 text-lightBlue3 focus:ring-lightBlue3"
              />
              <label htmlFor={option.id} className="ml-1 block text-sm font-medium leading-6 text-gray-900">
                {option.name}
              </label>
            </div>
          ) : (
            <Button
              ternary
              active={selectedOption == option.id}
              label={option.name}
              key={option.name}
              className="mr-4 min-w-[115px]"
              onClick={() => {
                setSelectedOption(option.id);
              }}
            />
            // <div
            //   key={option.name}
            //   value={option}
            //   onClick={() => {
            //     setSelectedOption(option.id);
            //   }}
            //   className={classNames(
            //     selectedOption == option.id
            //       ? 'bg-lightBlue1 text-lightBlue5'
            //       : 'bg-gray1',
            //     'transition-all cursor-pointer py-2 px-[15px] uppercase inline-block text-center rounded text-xs font-medium  hover:text-lightBlue5 hover:bg-lightBlue1'
            //   )}
            // >
            //   <span>{option.name}</span>
            // </div>
          ),
        )}
      </div>
      {error && errorText && (
        <NotificationAlert className="mt-2 p-2" type={'error'}>
          {errorText}
        </NotificationAlert>
      )}
    </div>
  );
}
