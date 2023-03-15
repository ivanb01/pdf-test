import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/solid';
import Button from 'components/shared/button';
const GlobalAlert = ({
  overlay,
  type,
  message,
  rounded,
  onButtonClick,
  title,
}) => {
  let bgColor = type == 'error' ? 'bg-red-50' : 'bg-green-50';
  let iconColor = type == 'error' ? 'text-red-400' : 'text-green-400';
  let textColor = type == 'error' ? 'text-red-800' : 'text-green-800';
  return (
    <div
      className={`border border-textColor ${
        overlay &&
        'absolute top-[90px] left-1/2 -translate-x-1/2 min-w-[400px] max-w-[800px]'
      } ${rounded && 'rounded-md'} ${bgColor} p-4 `}
    >
      <div className="flex justify-between items-center">
        <div className={`flex ${title ? 'items-start' : 'items-center'}`}>
          <div>
            {type == 'error' ? (
              <XCircleIcon
                className={`h-5 w-5 ${iconColor}`}
                aria-hidden="true"
              />
            ) : (
              <CheckCircleIcon
                className={`h-5 w-5 ${iconColor}`}
                aria-hidden="true"
              />
            )}
          </div>
          <div className="ml-3">
            {title && (
              <p className={`text-sm font-semibold mb-2 ${textColor}`}>
                {title}
              </p>
            )}
            <p className={`text-sm font-medium ${textColor}`}>{message}</p>
          </div>
        </div>
        {onButtonClick && (
          <Button size="small" white>
            Set up now
          </Button>
        )}
      </div>
    </div>
  );
};

export default GlobalAlert;
