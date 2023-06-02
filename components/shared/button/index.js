import Image from 'next/image';
import { ChevronRightIcon } from '@heroicons/react/solid';
import CircularProgress from '@mui/material/CircularProgress';

const Button = ({
  children,
  label = 'Test',
  primary = true,
  secondary,
  ternary,
  danger,
  white,
  href = '#',
  disabled = false,
  active,
  className,
  leftIcon,
  rightIcon,
  centerIcon,
  size = '',
  onClick,
  social,
  closeButton,
  bigButton,
  secondaryDanger,
  rounded,
  special,
  loading,
  iconSize,
  ...props
}) => {
  let bgColor = 'bg-lightBlue3';
  let textColor = 'text-white';
  let text = 'text-sm leading-none';
  let padding = 'px-4 py-3';
  let borderColor = 'border-transparent';

  if (secondary) {
    bgColor = 'bg-lightBlue1';
    textColor = 'text-lightBlue3';
  }
  if (danger) {
    bgColor = 'bg-red3';
    borderColor = 'border-red4';
  }
  if (secondaryDanger) {
    textColor = 'text-red5';
    bgColor = 'bg-red1';
    borderColor = 'border-red2';
  }
  if (white) {
    bgColor = 'bg-white';
    textColor = 'text-gray6';
    borderColor = 'border-#D1D5DB';
  }
  if (size === 'large') {
    text = 'text-base';
  }
  if (size == 'small') {
    padding = 'px-3 py-2';
  }
  if (special) {
    bgColor = 'bg-gradient-to-r from-green-400 to-blue-500';
  }
  const socialButton = () => {
    return (
      <div
        onClick={onClick}
        className={`w-full inline-flex justify-center cursor-pointer py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${className}`}
      >
        <Image src={social} height={18} />
      </div>
    );
  };
  const generalButton = () => {
    return (
      <button
        disabled={disabled}
        onClick={onClick}
        type="button"
        className={`${disabled && 'opacity-50'} ${
          loading && 'pointer-events-none'
        } h-[38px] inline-flex min-w-[100px] justify-center items-center ${padding} border ${borderColor} ${text} font-medium rounded-md shadow-sm ${textColor} hover:${bgColor} focus:outline-none focus:ring-2 focus:ring-offset-2 ${bgColor} ${className}`}
        {...props}
      >
        {loading && (
          <CircularProgress
            size={15}
            sx={{ color: 'white' }}
          ></CircularProgress>
        )}
        {leftIcon && !loading && (
          <div className={`-ml-0.5 mr-2 ${iconSize ? iconSize : 'h-4 w-4'}`}>
            {leftIcon}
          </div>
        )}
        {!centerIcon && !loading && (children ? children : label)}
        {centerIcon && !loading && (
          <div className={`${iconSize ? iconSize : 'h-5 w-5'}`}>
            {centerIcon}
          </div>
        )}
        {rightIcon && !loading && (
          <div className={`ml-2 -mr-0.5 ${iconSize ? iconSize : 'h-4 w-4'}`}>
            {rightIcon}
          </div>
        )}
      </button>
    );
  };
  const closeBtn = () => {
    return (
      <button
        type="button"
        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
        onClick={onClick}
      >
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
    );
  };

  const ternaryBtn = () => {
    return (
      <button
        type="button"
        className={`${
          active
            ? 'bg-lightBlue1 text-lightBlue5 border-lightBlue3'
            : 'bg-gray1'
        } border transition-all cursor-pointer py-2 px-[15px] uppercase text-center rounded text-xs font-medium  hover:text-lightBlue5 hover:bg-lightBlue1 ${className}`}
        onClick={onClick}
      >
        {children ? children : label}
      </button>
    );
  };

  const bigBtn = () => {
    return (
      <button
        type="button"
        disabled={disabled}
        onClick={onClick}
        className={`${className} ${
          disabled && 'bg-[#ebebeb] !text-[#a3a3a3]'
        } flex relative items-center justify-center text-base font-medium text-white min-h-[70px] p-0 px-9 w-full text-center rounded-lg`}
      >
        {children ? children : label}
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          <ChevronRightIcon
            className={disabled ? 'text-[#a3a3a3]' : 'text-white'}
            height={20}
          />
        </div>
      </button>
    );
  };
  const roundedBtn = () => {
    return (
      <button
        type="button"
        className={`inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm ${text} ${bgColor} hover:${bgColor} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:${bgColor} ${className}`}
        disabled={disabled}
        onClick={onClick}
        // className={`inline-flex items-center ${padding} border ${borderColor} ${text} font-medium rounded-md shadow-sm ${textColor} hover:${bgColor} focus:outline-none focus:ring-2 focus:ring-offset-2 ${bgColor} ${className}`}
        {...props}
      >
        {leftIcon && !loading && (
          <div className={`-ml-0.5 mr-2 ${iconSize ? iconSize : 'h-4 w-4'}`}>
            {leftIcon}
          </div>
        )}
        {!centerIcon && !loading && (children ? children : label)}
        {centerIcon && !loading && (
          <div className={`${iconSize ? iconSize : 'h-5 w-5'}`}>
            {centerIcon}
          </div>
        )}
        {rightIcon && !loading && (
          <div className={`ml-2 -mr-0.5 ${iconSize ? iconSize : 'h-4 w-4'}`}>
            {rightIcon}
          </div>
        )}
      </button>
    );
  };

  if (social) return socialButton();
  else if (closeButton) return closeBtn();
  else if (ternary) return ternaryBtn();
  else if (bigButton) return bigBtn();
  else if (rounded) return roundedBtn();
  else return generalButton();
};

export default Button;
