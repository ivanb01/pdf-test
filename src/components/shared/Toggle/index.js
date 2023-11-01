import React, { useEffect, useState } from 'react';
import { Switch } from '@headlessui/react';
import DeactivateCampaign from '@components/overlays/DeactivateCampaign';
import { assignContactToCampaign, unassignContactFromCampaign } from '@api/campaign';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { updateContactLocally } from '@store/contacts/slice';
import { setRefetchData } from '@store/global/slice';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Toggle = ({ active, activePerson }) => {
  const [enabled, setEnabled] = useState(false);

  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const handleCampaignAssignment = () => {
    if (!active) {
      dispatch(updateContactLocally({ ...activePerson, is_in_campaign: 'assigned' }));
      setEnabled(true);
      assignContactToCampaign(id, activePerson.id).then((res) => {
        dispatch(setRefetchData(true));
      });
    } else if (active) {
      dispatch(updateContactLocally({ ...activePerson, is_in_campaign: null }));
      setEnabled(false);
      unassignContactFromCampaign(id, activePerson.id).then((res) => {
        dispatch(setRefetchData(true));
      });
    }
  };

  useEffect(() => {
    setEnabled(active);
  }, [active]);
  return (
    <>
      <Switch
        onClick={(e) => e.stopPropagation()}
        checked={enabled}
        onChange={() => handleCampaignAssignment()}
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
