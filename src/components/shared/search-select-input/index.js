import Select from 'react-select';
import NotificationAlert from 'components/shared/alert/notification-alert';

const SearchSelectInput = ({
  className,
  placeholder,
  onChange,
  label,
  value,
  optional = false,
  defaultValue,
  options,
  error,
  errorText,
}) => {
  return (
    <div className={`w-full custom-chipinput-styles col-span-2 ${className}`}>
      <div className={'flex'}>
        {label && <div className="block text-sm font-medium text-gray6 mb-1">{label}</div>}
        {optional && <div className={'text-gray-500 ml-1'}>*</div>}
      </div>
      <Select
        defaultValue={defaultValue}
        placeholder={placeholder}
        isMulti
        value={value}
        options={options}
        onChange={onChange}
        styles={{
          input: (base) => ({
            ...base,
            input: {
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
            fontSize: '14px',
          }),
          menuList: (base) => ({
            ...base,
            div: {
              backgroundColor: 'white',
            },
          }),
          option: (base) => ({
            ...base,
            backgroundColor: 'white',
            '&:hover': {
              background: '#3B82F6 !important',
              color: 'white !important',
            },
          }),
        }}></Select>
      {error && errorText && (
        <NotificationAlert className="mt-2 p-2" type={'error'}>
          {errorText}
        </NotificationAlert>
      )}
    </div>
  );
};

export default SearchSelectInput;
