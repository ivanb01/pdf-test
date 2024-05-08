import { classNames } from 'global/functions.js';
import Text from '../text';
import Button from '../button';
import NotificationAlert from '../alert/notification-alert';

export default function Radio({
  ternary,
  required,
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
          {required && <span className="text-gray-500 ml-1">*</span>}
        </Text>
      )}
      <div className="grid md:flex">
        {options?.map(
          (option) =>
            secondary ? (
              <div key={option.id} className="mr-5" onClick={() => setSelectedOption(option.id)}>
                <label htmlFor={option.id} className="flex items-center text-sm font-medium leading-6 text-gray-900">
                  <input
                    id={option.id}
                    name={name ? name : 'radio-group'}
                    type="radio"
                    defaultChecked={option.id === selectedOption}
                    className="mr-1 h-4 w-4 border-gray-300 text-lightBlue3 focus:ring-lightBlue3"
                  />
                  {option.name}
                </label>
              </div>
            ) : ternary ? (
              <div
                onClick={() => {
                  setSelectedOption(option.id);
                }}
                key={option.id}
                className={`${
                  selectedOption == option.id && 'border-lightBlue3 text-lightBlue3'
                } cursor-pointer h-[34px] hover:border-lightBlue3 flex items-center justify-center text-sm border border-gray2 px-4 py-1 mr-4 rounded-md`}
              >
                {option.name}
              </div>
            ) : (
              <Button
                ternary
                active={selectedOption == option.id}
                label={option.name}
                key={option.name}
                className={`mr-4 min-w-[115px]`}
                onClick={() => {
                  setSelectedOption(option.id);
                }}
              />
            ),
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
