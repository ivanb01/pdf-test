import NotificationAlert from '../alert/notification-alert';

const TextArea = ({ rows, name, id, value, handleChange, label, optional, className, error, errorText, ...props }) => {
  return (
    <div className={`text-left col-span-full`}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray6 mb-1">
          {label} {optional && <span className="text-[#8F95B2] ml-1">(Optional)</span>}
        </label>
      )}
      <div>
        <textarea
          rows={rows}
          name={name}
          id={id}
          value={value}
          onChange={handleChange}
          className={`resize-none ${className} max-h-[65px] text-gray8 shadow-sm focus:ring-primaryOxford focus:border-primaryOxford block w-full sm:text-sm border-gray-300 rounded-md`}
        />
      </div>
      {error && errorText && (
        <NotificationAlert className="mt-2 p-2" type={'error'}>
          {errorText}
        </NotificationAlert>
      )}
    </div>
  );
};

export default TextArea;
