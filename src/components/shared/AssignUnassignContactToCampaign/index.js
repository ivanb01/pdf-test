import React, { useEffect, useState } from 'react';
import { Switch } from '@headlessui/react';
import DeactivateCampaign from '@components/overlays/DeactivateCampaign';
import { assignContactToCampaign, unassignContactFromCampaign } from '@api/campaign';
import { createPortal } from 'react-dom';
import {
  changeCampaignStatus,
  useAssignContactToCampaign,
  useChangeCampaignStatus,
  useDeactivateContactFromCampaign,
} from '../../../hooks/campaignHooks';
import { queryClient } from '../../../pages/_app';
import { setUsersInCampaignGlobally } from '@store/campaigns/slice';
import { useDispatch, useSelector } from 'react-redux';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const AssignUnassignContactToCampaign = ({ campaignId, active, activePerson, objectKey, disabled, handleUnassign }) => {
  const getTimeZone = () => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  };
  const dispatch = useDispatch();
  const [enabled, setEnabled] = useState(false);
  const [makeChanges, setMakeChanges] = useState(false);
  const [openDeactivate, setOpenDeactivate] = useState(false);
  const deactivateContactFromCampaign = useDeactivateContactFromCampaign();
  const _assignContactToCampaign = useAssignContactToCampaign();
  const changeCampaignStatus = useChangeCampaignStatus(activePerson?.contact_campaign_status, getTimeZone());
  const [loading, setLoading] = useState(false);
  const { CRMCampaigns, usersInCampaignGlobally } = useSelector((state) => state.CRMCampaigns);

  const handleCampaignAssignment = async () => {
    if (!active) {
      setEnabled(true);
      setLoading(true);

      if (objectKey === 'contacts_not_campaign') {
        _assignContactToCampaign
          .mutateAsync({ campaignId: campaignId, activePerson: activePerson, timeZone: getTimeZone() })
          .then(() => {
            setLoading(false);
            setOpenDeactivate(false);
            dispatch(
              setUsersInCampaignGlobally({
                ...usersInCampaignGlobally,
                contacts_assigned_count: usersInCampaignGlobally?.contacts_assigned_count + 1,
                contacts_never_assigned_count: usersInCampaignGlobally?.contacts_never_assigned_count - 1,
              }),
            );
          });
      } else {
        changeCampaignStatus.mutateAsync({ campaignId: campaignId, activePerson: activePerson.contact_id }).then(() => {
          setLoading(false);
          setOpenDeactivate(false);
          console.log(activePerson?.contact_campaign_status);
          if (activePerson?.contact_campaign_status == 'never_assigned') {
            dispatch(
              setUsersInCampaignGlobally({
                ...usersInCampaignGlobally,
                contacts_assigned_count: usersInCampaignGlobally?.contacts_assigned_count + 1,
                contacts_never_assigned_count: usersInCampaignGlobally?.contacts_never_assigned_count - 1,
              }),
            );
            queryClient.refetchQueries({ queryKey: ['in_campaign_contacts', campaignId] });
          } else {
            dispatch(
              setUsersInCampaignGlobally({
                ...usersInCampaignGlobally,
                contacts_never_assigned_count: usersInCampaignGlobally?.contacts_never_assigned_count + 1,
                contacts_assigned_count: usersInCampaignGlobally?.contacts_assigned_count - 1,
              }),
            );
            queryClient.refetchQueries({ queryKey: ['not_in_campaign_contacts', campaignId] });
          }
          setTimeout(() => {
            queryClient.invalidateQueries({ queryKey: ['all_campaign_contacts', campaignId] });
          }, [1000]);
        });
      }
    } else if (active) {
      setEnabled(false);
      setLoading(true);
      if (objectKey === 'contacts_in_campaign') {
        deactivateContactFromCampaign
          .mutateAsync({ campaignId: campaignId, activePerson: activePerson.contact_id })
          .then(() => {
            setLoading(false);
            setOpenDeactivate(false);
            dispatch(
              setUsersInCampaignGlobally({
                ...usersInCampaignGlobally,
                contacts_never_assigned_count: usersInCampaignGlobally?.contacts_never_assigned_count + 1,
                contacts_assigned_count: usersInCampaignGlobally?.contacts_assigned_count - 1,
              }),
            );
          });
      } else {
        changeCampaignStatus.mutateAsync({ campaignId: campaignId, activePerson: activePerson.contact_id }).then(() => {
          setLoading(false);
          setOpenDeactivate(false);

          if (activePerson?.contact_campaign_status == 'never_assigned') {
            dispatch(
              setUsersInCampaignGlobally({
                ...usersInCampaignGlobally,
                contacts_assigned_count: usersInCampaignGlobally?.contacts_assigned_count + 1,
                contacts_never_assigned_count: usersInCampaignGlobally?.contacts_never_assigned_count - 1,
              }),
            );
            queryClient.refetchQueries({ queryKey: ['in_campaign_contacts', campaignId] });
          } else {
            dispatch(
              setUsersInCampaignGlobally({
                ...usersInCampaignGlobally,
                contacts_never_assigned_count: usersInCampaignGlobally?.contacts_never_assigned_count + 1,
                contacts_assigned_count: usersInCampaignGlobally?.contacts_assigned_count - 1,
              }),
            );
            queryClient.refetchQueries({ queryKey: ['not_in_campaign_contacts', campaignId] });
          }
          setTimeout(() => {
            queryClient.invalidateQueries({ queryKey: ['all_campaign_contacts', campaignId] });
          }, [1000]);

          if (handleUnassign) {
            handleUnassign();
          }
        });
      }
    }
  };

  useEffect(() => {
    setEnabled(active);
  }, [active, disabled, activePerson]);

  useEffect(() => {
    if (makeChanges) {
      handleCampaignAssignment();
    }
  }, [makeChanges]);

  return (
    <div
      className={disabled && 'cursor-not-allowed'}
      title={disabled && 'This contact has been unassigned from a campaign, you cannot re-assign!'}>
      <Switch
        onClick={(e) => {
          e.stopPropagation();
          if (!disabled) {
            setOpenDeactivate(true);
          }
        }}
        checked={enabled}
        disabled={disabled}
        className={classNames(
          enabled ? 'bg-lightBlue3' : 'bg-gray2',
          disabled && 'opacity-60 pointer-events-none',
          'relative inline-flex h-4 w-7 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ',
        )}>
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={classNames(
            enabled ? 'translate-x-3' : 'translate-x-0',
            ' translate-y-[1px] pointer-events-none inline-block bg-white h-[11px] w-[11px] transform rounded-full shadow ring-0 transition duration-200 ease-in-out',
          )}
        />
      </Switch>
      {openDeactivate &&
        createPortal(
          <DeactivateCampaign
            active={active}
            handleCloseModal={() => setOpenDeactivate(false)}
            loading={loading}
            makeChanges={setMakeChanges}
          />,
          document.getElementById('modal-portal'),
        )}
    </div>
  );
};
export default AssignUnassignContactToCampaign;
