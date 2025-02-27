import NotificationAlert from '@components/shared/alert/notification-alert';
import Select from 'react-select';
import { useEffect } from 'react';

const DropdownWithSearch = ({
  options,
  top,
  bottom,
  maxMenuHeight,
  placeholder,
  onChange,
  label,
  value,
  typeOfContact,
  isMulti,
  onMenuOpen,
  onMenuClose,
  required,
  error,
  errorText,
  position,
  marginBottom,
  className,
  indicatorStyles = {},
  ...props
}) => {
  return (
    <div className=" custom-chipinput-styles col-span-2">
      {label && (
        <div className="block text-sm font-medium text-gray6 mb-1">
          {label}
          {required && <span className="text-gray-500 ml-1">*</span>}
        </div>
      )}
      <Select
        {...props}
        placeholder={placeholder}
        isMulti={isMulti}
        value={value}
        onMenuOpen={onMenuOpen}
        onMenuClose={onMenuClose}
        options={options}
        onChange={onChange}
        className={className}
        styles={{
          input: (base) => ({
            ...base,
            input: {
              fontSize: '14px !important',
              borderColor: 'transparent !important',
              '&:focus': {
                borderColor: 'transparent !important',
                boxShadow: 'none !important',
                '--tw-ring-color': 'transparent !important',
              },
            },
          }),
          placeholder: (base) => ({
            ...base,
            fontSize: '14px',
          }),
          control: (base) => ({
            ...base,
            borderRadius: '8px',
            borderColor: '#D1D5DB',
          }),
          singleValue: (base) => ({
            ...base,
            fontSize: '14px',
          }),
          multiValue: (base) => ({
            ...base,
            borderRadius: '70px',
            background: '#F3F4F6',
            color: '#474D66',
            padding: '0px 4px',
          }),
          multiValueRemove: (provided, state) => ({
            ...provided,
            '&:hover': {
              backgroundColor: 'transparent',
            },
            svg: {
              fill: '#474D66',
            },
          }),
          menu: (base) => ({
            ...base,
            top: top && top,
            bottom: bottom && bottom,
            fontSize: '14px',
            position: position ?? 'absolute',
            marginBottom: marginBottom ?? '100px',
            borderRadius: 5,
            zIndex: 99,
          }),
          menuList: (base) => ({
            ...base,
            borderRadius: 5,
            maxHeight: '300px',
            div: {
              backgroundColor: 'white',
            },
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: 'white',
            color: 'black',
            fontWeight: state.isSelected ? '600' : '400',
            '&:hover': {
              background: '#3B82F6 !important',
              color: 'white !important',
            },
          }),
          indicatorSeparator: (base, styles) => ({ ...base, ...indicatorStyles }),
        }}></Select>
      {error && errorText && (
        <NotificationAlert className="mt-2 p-2" type={'error'}>
          {errorText}
        </NotificationAlert>
      )}
    </div>
  );
};

export default DropdownWithSearch;
