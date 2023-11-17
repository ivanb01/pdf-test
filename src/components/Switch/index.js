import { Switch } from '@headlessui/react';
import { classNames } from '@global/functions';
const SwitchComponent = ({ enabled, setEnabled, label }) => {
  return (
    <Switch.Group as="div" className="flex items-center">
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={classNames(
          enabled ? 'bg-lightBlue3' : 'bg-gray-200',
          'relative inline-flex h-[19px] w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none',
        )}>
        <span
          aria-hidden="true"
          className={classNames(
            enabled ? 'translate-x-4' : 'translate-x-0',
            'pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
          )}
        />
      </Switch>
      <Switch.Label as="span" className="ml-[10px]">
        {/* <span className="font-medium text-gray-900">{label}</span>{' '} */}
        <span className="text-gray5 font-medium text-sm">{label}</span>
      </Switch.Label>
    </Switch.Group>
  );
};

export default SwitchComponent;
