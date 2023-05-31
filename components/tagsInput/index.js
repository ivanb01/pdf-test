import Select from 'react-select';
import {
  multiselectOptionsClients,
  multiselectOptionsProfessionals,
  tagsForProfessionals,
} from 'global/variables';

const TagsInput = ({ onChange, label, value, typeOfContact }) => {
  return (
    <div className="w-full custom-chipinput-styles col-span-2">
      {label && (
        <div className="block text-sm font-medium text-gray6 mb-1">{label}</div>
      )}
      <Select
        isMulti
        value={value}
        options={multiselectOptionsClients}
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
        }}
      ></Select>
    </div>
  );
};

export default TagsInput;
