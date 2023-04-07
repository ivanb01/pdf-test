const SelectButtons = ({
  selectValues,
  label,
  setAddNew,
  currentSelected,
  ...props
}) => {
  return (
    <div className="text-left col-span-full">
      {label && (
        <label className="block text-sm font-medium text-gray6">
          {label}
        </label>
      )}
      <div className="mt-2 select-box flex flex-wrap align-center">
        {selectValues.map((selectValue) => {
          return (
            <a
              href="#"
              key={selectValue.id}
              onClick={() => setAddNew(selectValue.name)}
              className={
                'text-xs mr-2 mb-2 px-2 py-1 ' +
                (currentSelected == selectValue.name
                  ? 'lowercase bg-[#EBF0FF] rounded text-[#2952CC] border border-[#EBF0FF]'
                  : 'lowercase border border-[#D8DAE5] rounded')
              }
            >
              {selectValue.name}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default SelectButtons;
