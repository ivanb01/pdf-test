export default function Tooltip() {
  return (
    <div
      role="tooltip"
      className="inline-block absolute z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
    >
      Tooltip on right
      <div className="tooltip-arrow" data-popper-arrow></div>
    </div>
  );
}
