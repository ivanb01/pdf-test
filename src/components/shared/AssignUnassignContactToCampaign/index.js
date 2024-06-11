import React, { useEffect, useState } from 'react';
import { Switch } from '@headlessui/react';
import DeactivateCampaign from '@components/overlays/DeactivateCampaign';
import { assignContactToCampaign, getCampaignsUsers, unassignContactFromCampaign } from '@api/campaign';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { setRefetchCampaign, setUsersInCampaignGlobally } from '@store/campaigns/slice';
import { createPortal } from 'react-dom';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const AssignUnassignContactToCampaign = ({
  campaignId,
  active,
  activePerson,
  objectKey,
  disabled,
  handleUnassign,
  updatePaginationContacts,
}) => {
  const [enabled, setEnabled] = useState(false);
  const [makeChanges, setMakeChanges] = useState(false);
  const [openDeactivate, setOpenDeactivate] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { usersInCampaignGlobally } = useSelector((state) => state.CRMCampaigns);

  const updateUserLocally = (objectKey, contact_campaign_status) => {
    if (objectKey === 'contacts_in_campaign') {
      const updatedUsers = usersInCampaignGlobally?.contacts_in_campaign?.filter(
        (arr) => arr.contact_id !== activePerson.contact_id,
      );
      dispatch(setUsersInCampaignGlobally({ ...usersInCampaignGlobally, contacts_in_campaign: updatedUsers }));
      updatePaginationContacts(activePerson);
    } else if (objectKey === 'contacts_not_campaign') {
      const updatedContactsNotCampaign = usersInCampaignGlobally?.contacts_not_campaign?.filter(
        (obj) => obj.contact_id !== activePerson.contact_id,
      );

      if (contact_campaign_status === 'never_assigned') {
        dispatch(
          setUsersInCampaignGlobally({
            ...usersInCampaignGlobally,
            contacts_not_campaign: updatedContactsNotCampaign,
          }),
        );
      }
      updatePaginationContacts(activePerson);
    } else if (objectKey === 'all_contacts_campaign') {
      if (updatePaginationContacts) {
        updatePaginationContacts(activePerson);
      }
    }
  };

  const [loading, setLoading] = useState(false);
  const handleCampaignAssignment = async () => {
    if (!active) {
      setEnabled(true);
      setLoading(true);
      await assignContactToCampaign(campaignId, activePerson.contact_id).then((res) => {
        setLoading(false);
        setOpenDeactivate(false);
      });
      updateUserLocally(objectKey, activePerson.contact_campaign_status);
      dispatch(setRefetchCampaign(true));

      getCampaignsUsers(campaignId).then((res) => {
        dispatch(setUsersInCampaignGlobally(res.data));
        setLoading(false);
        setOpenDeactivate(false);
      });
    } else if (active) {
      setEnabled(false);
      setLoading(true);
      await unassignContactFromCampaign(campaignId, activePerson.contact_id).then((res) => {
        setLoading(false);
        setOpenDeactivate(false);
        if (handleUnassign) {
          handleUnassign();
        }
      });
      dispatch(setRefetchCampaign(true));
      updateUserLocally(objectKey, activePerson.contact_campaign_status);
      getCampaignsUsers(campaignId).then((res) => {
        dispatch(setUsersInCampaignGlobally(res.data));
        setLoading(false);
        setOpenDeactivate(false);
      });
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
