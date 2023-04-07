import Chip from 'components/shared/chip';
import Text from 'components/shared/text';
const ChipInput = ({
  id,
  placeholder,
  name,
  selections,
  className,
  label,
  optional,
  removeChip,
  addChip,
}) => {
  const beforeAddChip = (event) => {
    if (event.key == 'Enter' && event.target.value.length) {
      addChip(event.target.value);
      event.target.value = '';
    }
  };
  return (
    <div className={`${className} cursor-text`}>
      {label && (
        <Text h4 className="text-gray6 mb-1">
          {label}{' '}
          {optional && <span className="text-gray3 ml-1">(Optional)</span>}
        </Text>
      )}
      <div
        onClick={() => document.querySelector('.tags-input').focus()}
        className={`border border-borderColor rounded-lg bg-white px-[13px] py-2 min-h-[40px] w-full outline-none focus:ring-1 focus:ring-blue1 focus:border-blue1`}
      >
        {selections && selections.map((selection, index) => (
          <Chip
            key={index}
            label={selection}
            className="mr-1 mb-1 bg-gray1 border border-gray2 text-gray-900 font-normal cursor-pointer"
            closable
            removeChip={removeChip}
            notClickable
          />
        ))}
        <input
          className="tags-input placeholder:text-gray4 placeholder:italic text-gray8 text-sm border-none outline-none h-full focus:ring-transparent focus:border-none font-[14px] max-w-[175px] p-0"
          type="text"
          name={name ? name : id}
          id={id}
          placeholder={placeholder}
          onKeyDown={(event) => beforeAddChip(event)}
          // onInput={onInput}
          // onChange={onChange}
          // onKeyDown={onKeyDown}
          // value={value}
        />
      </div>
    </div>
  );
};

export default ChipInput;
