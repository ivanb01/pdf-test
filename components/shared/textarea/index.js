const TextArea = ({
  rows,
  name,
  id,
  value,
  handleChange,
  label,
  optional,
  className,
  ...props
}) => {
  return (
    <div className={`text-left col-span-full`}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label}{' '}
          {optional && <span className="text-[#8F95B2] ml-1">(Optional)</span>}
        </label>
      )}
      <div>
        <textarea
          rows={rows}
          name={name}
          id={id}
          value={value}
          onChange={handleChange}
          className={`resize-none ${className} max-h-[65px] shadow-sm focus:ring-primaryOxford focus:border-primaryOxford block w-full sm:text-sm border-gray-300 rounded-md`}
        />
      </div>
    </div>
  );
};

export default TextArea;
