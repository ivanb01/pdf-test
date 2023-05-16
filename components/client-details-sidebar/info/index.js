import InfoCard from './card';
import Dropdown from 'components/shared/dropdown';
import * as contactServices from 'api/contacts';
import { allStatusesQuickEdit, importSourceOptions } from 'global/variables';
import { formatDateMDY, formatDateAgo, findTagsOption } from 'global/functions';
import { useEffect, useRef, useState } from 'react';
import {
  getContactCampaign,
  getCampaign,
  unassignContactFromCampaign,
} from 'api/campaign';
// import ChipInput from 'components/shared/input/chipInput';
import TagsInput from 'components/tagsInput';
import DateChip from 'components/shared/chip/date-chip';
import ChangeStatus from 'components/overlays/change-contact-status';

export default function Info({ client, handleFetchContactRequired }) {
  const categoryType = client?.category_1.toLowerCase() + 's';
  const [campaginName, setCampaignName] = useState('');

  const initialTags = client.tags ? client.tags : [];
  const [tags, setTags] = useState(initialTags);

  const [changeStatusModal, setChangeStatusModal] = useState(false);
  const [statusIdToUpdate, setStatusIdToUpdate] = useState(null);
  const [isContactInCampaign, setIsContactInCampaign] = useState(false);

  // const fetchContactCampaign = async () => {
  //   try {
  //     const { data } = await getContactCampaign(client?.id);
  //     if (data?.status === 'enrolled') {
  //       const { data: data2 } = await getCampaign(data?.campaign_id);
  //       setIsContactInCampaign(true);
  //       setCampaignName(`Assigned to '${data2?.campaign_name}'`);
  //     } else if (data?.status === 'matches_campaign') {
  //       setCampaignName('Not in campaign');
  //       setIsContactInCampaign(false);
  //     } else if (data?.status === 'unenrolled') {
  //       const { data: data2 } = await getCampaign(data?.campaign_id);
  //       ``;
  //       setCampaignName(`Unassigned from '${data2?.campaign_name}'`);
  //       setIsContactInCampaign(false);
  //     } else if (data?.status === 'no_match') {
  //       setCampaignName('No matching campaign');
  //       setIsContactInCampaign(false);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const fetchContactCampaign = async () => {
    try {
      if (client?.is_in_campaign === 'assigned') {
        setIsContactInCampaign(true);
        setCampaignName(`Assigned to '${client?.campaign_name}'`);
      } else {
        setCampaignName('Not in campaign');
        setIsContactInCampaign(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeTags = async (currentTags) => {
    try {
      setTags(currentTags);
      await contactServices.updateContact(client.id, {
        tags: currentTags,
      });
      handleFetchContactRequired();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchContactCampaign();
    setTags(initialTags);
  }, [client]);

  const handleChangeSource = async (source) => {
    try {
      await contactServices.updateContact(client.id, {
        import_source: source,
      });
      handleFetchContactRequired();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeStatus = async (status) => {
    try {
      if (isContactInCampaign && client?.status_id !== status) {
        setStatusIdToUpdate(status);
        setChangeStatusModal(true);
      } else {
        await contactServices.updateContact(client.id, {
          status_id: status,
        });
        handleFetchContactRequired();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeStatusAndCampaign = async () => {
    try {
      await unassignContactFromCampaign(client.campaign_id, client.id);
      await contactServices.updateContact(client.id, {
        status_id: statusIdToUpdate,
      });
      handleFetchContactRequired();
      setChangeStatusModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {client && (
        <div className="px-6 py-3 flex flex-col">
          {![2, 3, 13, 14].includes(client?.category_id) && (
            <Dropdown
              label="Status"
              activeIcon={false}
              options={allStatusesQuickEdit[categoryType]}
              className="my-3"
              handleSelect={(status) => handleChangeStatus(status.id)}
              initialSelect={client?.status_2}
              selectedOption="statusColor"
              noOptionChange={isContactInCampaign}
            />
          )}

          {/* <ChipInput
            label="Tags"
            selections={tags}
            placeholder="Write tag and hit enter"
            removeChip={removeTag}
            addChip={addTag}
          /> */}
          <TagsInput
            label="Tags"
            typeOfContact={client?.category_1 === 'Client' ? 0 : 1}
            value={findTagsOption(
              tags,
              client?.category_1 === 'Client' ? 0 : 1
            )}
            onChange={(choice) => {
              handleChangeTags(choice.map((el) => el.label));
            }}
          />

          <Dropdown
            label="Source"
            activeIcon={false}
            options={importSourceOptions}
            className="my-3"
            handleSelect={(source) => handleChangeSource(source.name)}
            initialSelect={client?.import_source}
            placeHolder={
              client?.import_source ? client?.import_source : 'Choose'
            }
          />

          {campaginName ? (
            <InfoCard
              label="Campaign"
              showDot={client?.campaign_id ? client?.campaign_id : 0}
              content={campaginName}
            />
          ) : (
            <InfoCard
              label="Campaign"
              showDot={client?.campaign_id ? client?.campaign_id : 0}
              content=""
            />
          )}
          <InfoCard
            label="Last Communication"
            content={
              client?.last_communication_date
                ? formatDateMDY(client?.last_communication_date)
                : 'No Communication'
            }
            iconContent={
              client?.last_communication_date ? (
                <DateChip
                  lastCommunication={client.last_communication_date}
                  contactStatus={client.status_2}
                  contactCategory={categoryType}
                  className="ml-2 !mt-0  pt-0"
                />
              ) : null
            }
          />
        </div>
      )}
      {changeStatusModal && (
        <ChangeStatus
          handleCloseOverlay={() => setChangeStatusModal(false)}
          onSubmit={handleChangeStatusAndCampaign}
        />
      )}
    </>
  );
}
