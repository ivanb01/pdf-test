import NotificationAlert from '../alert/notification-alert';
import { ExclamationCircleIcon } from '@heroicons/react/solid';
import TooltipComponent from '@components/shared/tooltip';
import newTab from '../../../../public/images/new-tab.svg';
import { forwardRef } from 'react';

// eslint-disable-next-line react/display-name
const TextArea = forwardRef(
  (
    {
      rows,
      name,
      id,
      value,
      handleChange,
      label,
      optional,
      placeholder,
      className,
      error,
      errorText,
      link,
      onClick,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={`text-left col-span-full`}>
        {label && (
          <label htmlFor={name} className="block text-sm font-medium text-gray6 mb-1 flex items-center">
            {label} {optional && <span className="text-gray-500 ml-1">(optional)</span>}{' '}
            {name?.toLowerCase() === 'summary' && (
              <div className={'flex'}>
                <TooltipComponent
                  side={'bottom'}
                  align={'left'}
                  triggerElement={
                    <ExclamationCircleIcon className="h-4 w-4 ml-1 text-gray3 z-10" aria-hidden="true" />
                  }>
                  <div style={{ width: '205px' }}>
                    <p className={'text-xs leading-4 font-normal text-white'}>
                      Write a short summary so you can easily identify this client.
                    </p>
                  </div>
                </TooltipComponent>
                {link && (
                  <a
                    target="_blank"
                    href={link}
                    className="cursor-pointer flex items-center text-xs text-gray-900 underline"
                    rel="noreferrer">
                    <img src={newTab.src} alt="" className="ml-1" />
                  </a>
                )}
              </div>
            )}
          </label>
        )}
        <div>
          <textarea
            ref={ref}
            rows={rows}
            name={name}
            placeholder={placeholder}
            id={id}
            onClick={onClick}
            value={value}
            onChange={handleChange}
            className={`resize-none ${className} max-h-[65px] text-gray8 shadow-sm focus:ring-primaryOxford focus:border-primaryOxford block w-full sm:text-sm border-gray-300 rounded-md`}
          />
        </div>
        {error && errorText && (
          <NotificationAlert className="mt-2 p-2" type={'error'}>
            {errorText}
          </NotificationAlert>
        )}
      </div>
    );
  },
);

export default TextArea;
