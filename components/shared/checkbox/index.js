export default function Checkbox({ id, name, setState, state, label }) {
  const handleChange = () => setState(!state);
  return (
    <div className="relative flex items-start">
      <div className="flex items-center h-5">
        <input
          checked={state}
          id={id}
          aria-describedby={`${id}-description`}
          name={name}
          type="checkbox"
          onChange={handleChange}
          className="focus:ring-lightBlue3 h-4 w-4 text-lightBlue3 border-gray2 rounded"
        />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor={name} className="text-gray-700">
          {label}
        </label>
      </div>
    </div>
  );
}
