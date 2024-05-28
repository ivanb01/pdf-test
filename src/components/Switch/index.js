import { Switch } from '@headlessui/react';
import { classNames } from '@global/functions';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setHideUnapproved } from '@store/global/slice';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
const SwitchComponent = ({ label }) => {
  const dispatch = useDispatch();
  const hideUnapproved = useSelector((state) => state.global.hideUnapproved);
  const [enabled, setEnabled] = useState(!hideUnapproved);

  useEffect(() => {
    let hideUnapproved =
      localStorage.getItem('hideUnapproved') && localStorage.getItem('hideUnapproved') === 'true' ? true : false;
    setEnabled(!hideUnapproved);
    dispatch(setHideUnapproved(hideUnapproved));
  }, []);

  return (
    <Switch.Group as="div" className="flex items-center">
      <Switch
        checked={enabled}
        onChange={(value) => {
          dispatch(setHideUnapproved(!value));
          localStorage.setItem('hideUnapproved', !value);
          setEnabled(value);
        }}
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
