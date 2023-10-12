import React, { useEffect, useState } from 'react';
import { Switch } from '@headlessui/react';
import DeactivateCampaign from '@components/overlays/DeactivateCampaign';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Toggle = ({ active }) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(active);
  }, []);
  return (
    <>
      <Switch
        onClick={(e) => e.stopPropagation()}
        checked={enabled}
        onChange={setEnabled}
        className={classNames(
          enabled ? 'bg-lightBlue3' : 'bg-gray2',
          'relative inline-flex h-4 w-7 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ',
        )}>
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={classNames(
            enabled ? 'translate-x-3' : 'translate-x-0',
            'pointer-events-none inline-block h-[11px] w-[11px] transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
          )}
        />
      </Switch>
    </>
  );
};

export default Toggle;
