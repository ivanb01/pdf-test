import Text from 'components/shared/text';
import { ExclamationCircleIcon } from '@heroicons/react/solid';
import Link from 'components/Link';
import Router from 'next/router';
import { useEffect, useRef, useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import NotificationAlert from 'components/shared/alert/notification-alert';
import { phoneNumberInputFormat, revertPhoneNumberInputFormat } from 'global/functions';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const Input = ({
  className,
  label,
  value,
  autocomplete,
  handleChange,
  required,
  optional,
  flat,
  type = 'text',
  name = '',
  id = '',
  placeholder = '',
  onKeyDown,
  onInput,
  onBlur,
  onChange,
  iconBefore,
  iconAfter,
  saved,
  readonly,
  error,
  errorText,
  showForgotPassword,
  secondaryLabel,
  ...props
}) => {
  let errorClasses = '';
  if (error) {
    errorClasses = 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500';
  }

  const textInput = () => {
    return iconBefore ? (
      <>
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{iconBefore}</div>
        <input
          type={type}
          name={name ? name : id}
          id={id}
          placeholder={placeholder}
          onInput={onInput}
          onBlur={onBlur}
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={value}
          className={`text-sm text-gray8 pl-10 border rounded-lg bg-white px-[13px] h-[40px] w-full outline-none focus:ring-1 focus:ring-blue1 focus:border-blue1  ${
            errorClasses ? errorClasses : 'border-borderColor'
          }`}
        />
        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
          </div>
        )}
      </>
    ) : iconAfter ? (
      <>
        <input
          type={type}
          name={name ? name : id}
          id={id}
          placeholder={placeholder}
          onInput={onInput}
          onBlur={onBlur}
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={value}
          className={`text-sm text-gray8 pr-10 border rounded-lg bg-white px-[13px] h-[40px] w-full outline-none focus:ring-1 focus:ring-blue1 focus:border-blue1 ${
            errorClasses ? errorClasses : ' border-borderColor'
          }`}
        />
        {error ? (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
          </div>
        ) : (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">{iconAfter}</div>
        )}
      </>
    ) : (
      <>
        <input
          type={type}
          name={name ? name : id}
          id={id}
          placeholder={placeholder}
          onInput={onInput}
          onChange={onChange}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          value={value}
          readOnly={saved || readonly}
          className={
            saved
              ? `text-sm text-gray8 p-0 border-none bg-transparent outline-none ${className}`
              : `${className} text-sm text-gray8 border rounded-lg bg-white px-[13px] h-[40px] w-full outline-none focus:ring-1 focus:ring-blue1 focus:border-blue1  ${
                  errorClasses ? errorClasses : 'border-borderColor'
                }`
          }
        />
        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
          </div>
        )}
      </>
    );
  };

  const [showPassword, setShowPassword] = useState(false);

  const passwordInput = () => {
    return (
      <>
        <input
          type={showPassword ? 'text' : 'password'}
          name={name ? name : id}
          id={id}
          placeholder={placeholder}
          onInput={onInput}
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={value}
          className={`text-sm text-gray8 pr-10 border rounded-lg bg-white px-[13px] h-[40px] w-full outline-none focus:ring-1 focus:ring-blue1 focus:border-blue1 ${
            errorClasses ? errorClasses : ' border-borderColor'
          }`}
        />
        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
          </div>
        )}
        <div
          onClick={() => setShowPassword(!showPassword)}
          className={`absolute cursor-pointer inset-y-0 ${error ? 'right-7' : 'right-0'} pr-3 flex items-center`}>
          {showPassword ? (
            <VisibilityIcon className="text-gray-400" />
          ) : (
            <VisibilityOffIcon className="text-gray-400" />
          )}
        </div>
      </>
    );
  };

  const [phoneValue, setPhoneValue] = useState(type == 'phone_number' && phoneNumberInputFormat(value));

  const handlePhoneChange = (val) => {
    setPhoneValue(phoneNumberInputFormat(val));

    if (val) {
      onChange(revertPhoneNumberInputFormat(val));
    } else {
      onChange(null);
    }
  };

  const InputPhone = () => {
    return (
      <>
        <input
          type="text"
          name={name ? name : id}
          id={id}
          placeholder={placeholder}
          onInput={onInput}
          onChange={(e) => handlePhoneChange(e.target.value)}
          onKeyDown={onKeyDown}
          value={phoneValue}
          readOnly={saved || readonly}
          className={
            saved
              ? 'text-sm text-gray8 p-0 border-none bg-transparent outline-none'
              : `text-sm text-gray8 border rounded-lg bg-white px-[13px] h-[40px] w-full outline-none focus:ring-1 focus:ring-blue1 focus:border-blue1  ${
                  errorClasses ? errorClasses : 'border-borderColor'
                }`
          }
        />
        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
          </div>
        )}
      </>
    );
  };

  const moneyInput = () => {
    const formatNumber = (num) => {
      if (num === undefined || num === null) return '';
      const parts = num.toString().split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return parts.join('.');
    };

    const unformatNumber = (str) => {
      return str.replace(/,/g, '');
    };
    const [inputValue, setInputValue] = useState(formatNumber(value) || '');

    useEffect(() => {
      setInputValue(formatNumber(value));
    }, [value]);

    const handleChange = (event) => {
      const newValue = unformatNumber(event.target.value);
      if (/^\d*\.?\d*$/.test(newValue)) {
        setInputValue(formatNumber(newValue));
        if (onChange) {
          onChange(newValue);
        }
      }
    };
    return iconBefore ? (
      <>
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{iconBefore}</div>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder}
          name={name ? name : id}
          className={`text-sm text-gray8 pl-10 border rounded-lg bg-white px-[13px] h-[40px] w-full outline-none focus:ring-1 focus:ring-blue1 focus:border-blue1  ${
            errorClasses ? errorClasses : 'border-borderColor'
          }`}
        />
        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
          </div>
        )}
      </>
    ) : iconAfter ? (
      <>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder}
          name={name ? name : id}
          className={`text-sm text-gray8 pr-10 border rounded-lg bg-white px-[13px] h-[40px] w-full outline-none focus:ring-1 focus:ring-blue1 focus:border-blue1 ${
            errorClasses ? errorClasses : ' border-borderColor'
          }`}
        />
        {error ? (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
          </div>
        ) : (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">{iconAfter}</div>
        )}
      </>
    ) : (
      <>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder}
          name={name ? name : id}
          className={
            saved
              ? 'text-sm text-gray8 p-0 border-none bg-transparent outline-none'
              : `text-sm text-gray8 border rounded-lg bg-white px-[13px] h-[40px] w-full outline-none focus:ring-1 focus:ring-blue1 focus:border-blue1  ${
                  errorClasses ? errorClasses : 'border-borderColor'
                }`
          }
        />
        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
          </div>
        )}
      </>
    );
  };

  const phoneInput = () => {
    return (
      <>
        <div className="absolute inset-y-0 left-0 flex items-center">
          <label htmlFor="country" className="sr-only">
            Country
          </label>
          <select
            id="country"
            name="country"
            autoComplete="country"
            className="outline-none focus:ring-1 focus:ring-blue1 focus:border-blue1 h-full py-0 pl-3 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md">
            <option>US</option>
            <option>CA</option>
            <option>EU</option>
          </select>
        </div>
        <input
          type="text"
          name={name ? name : id}
          id={id}
          className={`text-sm text-gray8 outline-none focus:ring-1 focus:ring-blue1 focus:border-blue1 block w-full pl-16 px-[13px] py-[9px] sm:text-sm border-gray-300 rounded-md ${errorClasses}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </>
    );
  };

  const checkboxInput = () => {
    return (
      <div className={`checkbox-item flex items-center justify-between ${className}`}>
        <div className="relative flex items-center">
          <div className="flex items-center h-5">
            <input
              name={name ? name : id}
              id={id}
              placeholder={placeholder}
              onInput={onInput}
              onChange={onChange}
              onKeyDown={onKeyDown}
              value={value}
              type="checkbox"
              className="cursor-pointer focus:ring-lightBlue3 h-4 w-4 text-lightBlue3 border-gray-300 rounded"
              {...props}
            />
          </div>
          <div className="ml-2 text-sm leading-none">
            <label className="text-gray7">{placeholder}</label>
          </div>
        </div>
        {showForgotPassword && (
          <Link href="#" className="font-medium text-sm" onClick={() => Router.push('sign-in/forgot-password')}>
            Forgot Password?
          </Link>
        )}
      </div>
    );
  };

  const dateInput = () => {
    const ref = useRef();
    return (
      <>
        <input
          type={'date'}
          onChange={onChange}
          ref={ref}
          placeholder={'dd/mm/yyyy'}
          className={`relative w-full py-[9px] px-[13px] border border-gray-300 rounded-md h-10 text-sm leading-5 font-normal text-gray-500 placeholder:text-gray-500 ${
            errorClasses && errorClasses
          } `}
        />
        <div className={'absolute text-gray-300 mr-[13px] cursor-pointer'} style={{ marginTop: '-34px', right: 0 }}>
          <CalendarTodayIcon className={'h-5 w-5'} onClick={() => ref.current.focus()} />
        </div>
        {error && <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"></div>}
      </>
    );
  };
  return (
    <div className={`checkbox-wrapper ${className}`}>
      {label && (
        <Text h4 className={saved ? 'text-gray4' : 'text-gray6'}>
          {label} {optional && <span className="text-gray-500 ml-1">(optional)</span>}
          {required && <span className="text-gray-500 ml-1">*</span>}
        </Text>
      )}
      {secondaryLabel && (
        <Text p className="text-gray4">
          {secondaryLabel}{' '}
        </Text>
      )}
      <div className={`${type == 'checkbox' ? '' : 'mt-1 relative rounded-md'}`}>
        {type == 'phone'
          ? phoneInput()
          : type == 'phone_number'
          ? InputPhone()
          : type == 'checkbox'
          ? checkboxInput()
          : type == 'password'
          ? passwordInput()
          : type == 'money'
          ? moneyInput()
          : type === 'date'
          ? dateInput()
          : textInput()}
      </div>
      {/* {error && errorText && <p className="mt-4">{errorText}</p>} */}
      {error && errorText && (
        <NotificationAlert className="mt-2 p-2" type={'error'}>
          {errorText}
        </NotificationAlert>
      )}
    </div>
  );
};

export default Input;
