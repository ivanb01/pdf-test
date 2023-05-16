import Text from 'components/shared/text';
import { ExclamationCircleIcon } from '@heroicons/react/solid';
import Link from 'components/Link';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import NotificationAlert from 'components/shared/alert/notification-alert';
import { phoneNumberInputFormat, revertPhoneNumberInputFormat
, moneyNumberInputFormat, revertMoneyNumberInputFormat} from 'global/functions';

const Input = ({
  className,
  label,
  value,
  autocomplete,
  handleChange,
  optional,
  flat,
  type = 'text',
  name = '',
  id = '',
  placeholder = '',
  onKeyDown,
  onInput,
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
    errorClasses =
      'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500';
  }

  const textInput = () => {
    return iconBefore ? (
      <>
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {iconBefore}
        </div>
        <input
          type={type}
          name={name ? name : id}
          id={id}
          placeholder={placeholder}
          onInput={onInput}
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={value}
          className={`text-sm text-gray8 pl-10 border rounded-lg bg-white px-[13px] h-[40px] w-full outline-none focus:ring-1 focus:ring-blue1 focus:border-blue1  ${
            errorClasses ? errorClasses : 'border-borderColor'
          }`}
        />
        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
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
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={value}
          className={`text-sm text-gray8 pr-10 border rounded-lg bg-white px-[13px] h-[40px] w-full outline-none focus:ring-1 focus:ring-blue1 focus:border-blue1 ${
            errorClasses ? errorClasses : ' border-borderColor'
          }`}
        />
        {error ? (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        ) : (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {iconAfter}
          </div>
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
          onKeyDown={onKeyDown}
          value={value}
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
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
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
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
        <div
          onClick={() => setShowPassword(!showPassword)}
          className={`absolute cursor-pointer inset-y-0 ${
            error ? 'right-7' : 'right-0'
          } pr-3 flex items-center`}
        >
          {showPassword ? (
            <VisibilityIcon className="text-gray-400" />
          ) : (
            <VisibilityOffIcon className="text-gray-400" />
          )}
        </div>
      </>
    );
  };

  const [phoneValue, setPhoneValue] = useState(type=='phone_number' && phoneNumberInputFormat(value));
  
  const handlePhoneChange = (val) => {
    setPhoneValue(phoneNumberInputFormat(val));

    if(val) {
      onChange(revertPhoneNumberInputFormat(val));
    } else {
      onChange(null);
    }
  }

  const InputPhone = () => {
    return (
      <>
        <input
          type='text'
          name={name ? name : id}
          id={id}
          placeholder={placeholder}
          onInput={onInput}
          onChange={(e)=>handlePhoneChange(e.target.value)}
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
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
      </>
    );
  };

  const moneyNumberInputFormat = (number) => {
    if(!number) return null;
    return number.toString().replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const revertMoneyNumberInputFormat = (value) => {
    return value.replace(/,/g, '');
  };

  const [moneyValue, setMoneyValue] = useState(null);
  
  const handleMoneyInputChange = (val) => {
    // setMoneyValue(moneyNumberInputFormat(val));
    if(val) {
      onChange(revertMoneyNumberInputFormat(val));
    } else {
      onChange(0);
      setMoneyValue(null)
    }
  }

  useEffect(()=>{
    if( type == 'money' ) {
      setMoneyValue(moneyNumberInputFormat(value))
    }
  },[value])

  const moneyInput = () => {
    return iconBefore ? (
      <>
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {iconBefore}
        </div>
        <input
          type='text'
          name={name ? name : id}
          id={id}
          placeholder={placeholder}
          onInput={onInput}
          onChange={(e)=>handleMoneyInputChange(e.target.value)}
          onKeyDown={onKeyDown}
          value={moneyValue}
          className={`text-sm text-gray8 pl-10 border rounded-lg bg-white px-[13px] h-[40px] w-full outline-none focus:ring-1 focus:ring-blue1 focus:border-blue1  ${
            errorClasses ? errorClasses : 'border-borderColor'
          }`}
        />
        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
      </>
    ) : iconAfter ? (
      <>
        <input
          type='text'
          name={name ? name : id}
          id={id}
          placeholder={placeholder}
          onInput={onInput}
          onChange={(e)=>handleMoneyInputChange(e.target.value)}
          onKeyDown={onKeyDown}
          value={moneyValue}
          className={`text-sm text-gray8 pr-10 border rounded-lg bg-white px-[13px] h-[40px] w-full outline-none focus:ring-1 focus:ring-blue1 focus:border-blue1 ${
            errorClasses ? errorClasses : ' border-borderColor'
          }`}
        />
        {error ? (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        ) : (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {iconAfter}
          </div>
        )}
      </>
    ) : (
      <>
        <input
          type='text'
          name={name ? name : id}
          id={id}
          placeholder={placeholder}
          onInput={onInput}
          onChange={(e)=>handleMoneyInputChange(e.target.value)}
          onKeyDown={onKeyDown}
          value={moneyValue}
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
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
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
            className="outline-none focus:ring-1 focus:ring-blue1 focus:border-blue1 h-full py-0 pl-3 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
          >
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
      <div
        className={`checkbox-item flex items-center justify-between ${className}`}
      >
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
          <Link
            href="#"
            className="font-medium text-sm"
            onClick={() => Router.push('sign-in/forgot-password')}
          >
            Forgot Password?
          </Link>
        )}
      </div>
    );
  };

  return (
    <div className={`checkbox-wrapper ${className}`}>
      {label && (
        <Text h4 className={saved ? 'text-gray4' : 'text-gray6'}>
          {label}{' '}
          {optional && <span className="text-gray3 ml-1">(Optional)</span>}
        </Text>
      )}
      {secondaryLabel && (
        <Text p className="text-gray4">
          {secondaryLabel}{' '}
        </Text>
      )}
      <div
        className={`${type == 'checkbox' ? '' : 'mt-1 relative rounded-md'}`}
      >
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
