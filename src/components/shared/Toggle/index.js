import React, { useEffect, useState } from 'react';
import { Switch } from '@headlessui/react';
import DeactivateCampaign from '@components/overlays/DeactivateCampaign';
import { assignContactToCampaign, getCampaignsUsers, unassignContactFromCampaign } from '@api/campaign';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { updateContactLocally } from '@store/contacts/slice';
import { setRefetchData } from '@store/global/slice';
import { setUsersInCampaignGlobally } from '@store/campaigns/slice';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Toggle = ({ active, activePerson, disabled }) => {
  const [enabled, setEnabled] = useState(false);

  const router = useRouter();
  useEffect(() => {
    console.log(active);
  }, [active]);
  const { id } = router.query;
  const dispatch = useDispatch();
  const handleCampaignAssignment = () => {
    if (!active) {
      setEnabled(true);
      assignContactToCampaign(id, activePerson.contact_id).then((res) => {
        getCampaignsUsers(id).then((res) => {
          dispatch(setUsersInCampaignGlobally(res.data));
        });
      });
    } else if (active) {
      console.log('erza');
      setEnabled(false);
      unassignContactFromCampaign(id, activePerson.contact_id).then((res) => {
        getCampaignsUsers(id).then((res) => {
          dispatch(setUsersInCampaignGlobally(res.data));
        });
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
        disabled={disabled}
        onChange={() => handleCampaignAssignment()}
        className={classNames(
          enabled ? 'bg-lightBlue3' : 'bg-gray2',
          disabled && 'bg-gray1',
          'relative inline-flex h-4 w-7 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ',
        )}>
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={classNames(
            enabled ? 'translate-x-3' : 'translate-x-0',
            disabled ? 'bg-gray1' : 'bg-white',
            'pointer-events-none inline-block h-[11px] w-[11px] transform rounded-full shadow ring-0 transition duration-200 ease-in-out',
          )}
        />
      </Switch>
    </>
  );
};

export default Toggle;
