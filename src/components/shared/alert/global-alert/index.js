import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/solid';
import Button from 'components/shared/button';
import { InfoRounded } from '@mui/icons-material';
import { ArrowForward } from '@mui/icons-material';
import { useRouter } from 'next/router';
const GlobalAlert = ({
  overlay,
  type,
  message,
  rounded,
  onButtonClick,
  noBorder,
  title,
}) => {
  const router = useRouter();
  let bgColor =
    type == 'error'
      ? 'bg-red-50'
      : type == 'smart-sync'
      ? 'bg-blue-50'
      : type == 'warning'
      ? 'bg-orange-50'
      : 'bg-green-50';
  let iconColor =
    type == 'error'
      ? 'text-red-400'
      : type == 'smart-sync'
      ? 'text-blue-500'
      : type == 'warning'
      ? 'text-orange-600'
      : 'text-green-400';
  let textColor =
    type == 'error'
      ? 'text-red-800'
      : type == 'smart-sync'
      ? 'text-blue-700'
      : type == 'warning'
      ? 'text-orange-800'
      : 'text-green-800';
  return (
    <div
      className={`${!noBorder && 'border border-textColor'} z-40 ${
        overlay &&
        'absolute top-[90px] left-1/2 -translate-x-1/2 min-w-[400px] max-w-[800px]'
      } ${rounded && 'rounded-md'} ${bgColor} p-4 `}>
      <div className="flex justify-between items-center">
        <div
          className={`flex ${
            title || noBorder ? 'items-start' : 'items-center'
          }`}>
          <div>
            {type == 'error' ? (
              <XCircleIcon
                className={`h-5 w-5 ${iconColor}`}
                aria-hidden="true"
              />
            ) : type == 'smart-sync' || type == 'warning' ? (
              <InfoRounded
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
            <p className={`text-sm font-medium ${textColor}`}>
              {message ? message : '\u00A0'}
            </p>
          </div>
        </div>
        {onButtonClick && <Button white>Set up now</Button>}
        {type == 'smart-sync' && (
          <a
            onClick={() => router.push('/ai-summary')}
            className="text-blue-700 cursor-pointer font-medium text-sm">
            See Summary
            <ArrowForward className="h-4 group-hover:translate-x-1 transition-all" />
          </a>
        )}
      </div>
    </div>
  );
};

export default GlobalAlert;
