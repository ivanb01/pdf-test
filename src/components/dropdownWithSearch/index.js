import Select from 'react-select';

const DropdownWithSearch = ({
  options,
  onChange,
  label,
  value,
  typeOfContact,
  isMulti,
  onMenuOpen,
  onMenuClose,
  required,
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
        isMulti={isMulti}
        value={value}
        onMenuOpen={onMenuOpen}
        onMenuClose={onMenuClose}
        options={options}
        onChange={onChange}
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
            fontSize: '14px',
            marginBottom: '100px',
          }),
          menuList: (base) => ({
            ...base,
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
        }}></Select>
    </div>
  );
};

export default DropdownWithSearch;
