import { Switch } from '@headlessui/react';
import { classNames } from '@global/functions';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setHideUnapproved } from '@store/global/slice';
import { useEffect } from 'react';
const SwitchComponent = ({ label }) => {
  const dispatch = useDispatch();
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (enabled) {
      dispatch(setHideUnapproved(false));
    } else {
      dispatch(setHideUnapproved(true));
    }
  }, [enabled]);

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
            'absolute top-1/2 -translate-y-1/2 pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
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
