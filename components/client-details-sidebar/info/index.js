import InfoCard from './card';
import Dropdown from 'components/shared/dropdown';
import Chip from 'components/shared/chip';
import * as contactServices from 'api/contacts';
import { allStatusesQuickEdit, importSourceOptions } from 'global/variables';
import { formatDateMDY, formatDateAgo, findTagsOption } from 'global/functions';
import { useEffect, useRef, useState } from 'react';
import { getContactCampaign, getCampaign } from 'api/campaign';
// import ChipInput from 'components/shared/input/chipInput';
import TagsInput from 'components/tagsInput';
import DateChip from 'components/shared/chip/date-chip';

export default function Info({ client, handleFetchContactRequired }) {
  const categoryType = client?.category_1.toLowerCase() + 's';
  const [campaginName, setCampaignName] = useState('');

  const initialTags = client.tags ? client.tags : [];
  const [tags, setTags] = useState(initialTags);

  const fetchContactCampaign = async () => {
    try {
      const { data } = await getContactCampaign(client?.id);
      if (data?.status === 'enrolled') {
        const { data: data2 } = await getCampaign(data?.campaign_id);
        setCampaignName(`Assigned to '${data2?.campaign_name}'`);
      } else if (data?.status === 'matches_campaign') {
        setCampaignName('Not in campaign');
      } else if (data?.status === 'unenrolled') {
        const { data: data2 } = await getCampaign(data?.campaign_id);
        ``;
        setCampaignName(`Unassigned from '${data2?.campaign_name}'`);
      } else if (data?.status === 'no_match') {
        setCampaignName('No matching campaign');
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

  const handleChangeStatus = async (status) => {
    try {
      await contactServices.updateContact(client.id, {
        status_id: status,
      });
      handleFetchContactRequired();
    } catch (error) {
      console.log(error);
    }
  };

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

  return (
    <>
      {client && (
        <div className="px-6 py-3 flex flex-col">
          <Dropdown
            label="Status"
            activeIcon={false}
            options={allStatusesQuickEdit[categoryType]}
            className="my-3"
            handleSelect={(status) => handleChangeStatus(status.id)}
            initialSelect={client?.status_2}
            selectedOption="statusColor"
          />

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
            placeHolder={client?.import_source ? null : 'Choose'}
          />

          {campaginName ? (
            <InfoCard label="Campaign" content={campaginName} />
          ) : (
            <InfoCard label="Campaign" content="" />
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
                  className="ml-2 mt-[0px]"
              />
              ) : null
            }
          />
        </div>
      )}
    </>
  );
}
