import InfoCard from './card';
import Dropdown from 'components/shared/dropdown';
import * as contactServices from 'api/contacts';
import { allStatusesQuickEdit, leadSourceOptions, multiselectOptionsClients } from 'global/variables';
import { formatDateMDY, formatDateAgo, findTagsOption } from 'global/functions';
import { useEffect, useRef, useState } from 'react';
import { getContactCampaign, getCampaign, unassignContactFromCampaign } from 'api/campaign';
// import ChipInput from 'components/shared/input/chipInput';
import DropdownWithSearch from '@components/dropdownWithSearch';
import DateChip from 'components/shared/chip/date-chip';
import ChangeStatus from 'components/overlays/change-contact-status';
import { useDispatch } from 'react-redux';
import { setRefetchData } from 'store/global/slice';

export default function Info({ client }) {
  const dispatch = useDispatch();
  const categoryType = client?.category_1?.toLowerCase() + 's';
  const [campaginName, setCampaignName] = useState('');

  const initialTags = client?.tags ? client.tags : [];
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
      dispatch(setRefetchData(true));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchContactCampaign();
    setTags(initialTags);
  }, [client]);

  const handleChangeSource = async (source) => {
    console.log(source);
    try {
      console.log(source);
      await contactServices.updateContact(client.id, {
        lead_source: source,
      });
      dispatch(setRefetchData(true));
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
        dispatch(setRefetchData(true));
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
      dispatch(setRefetchData(true));
      setChangeStatusModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {client && (
        <div className="px-6 py-3 flex flex-col  border-t border-gray-2">
          {![1, 2, 3, 13, 14].includes(client?.category_id) && (
            <Dropdown
              label="Status"
              placeHolder="Choose"
              activeIcon={false}
              options={allStatusesQuickEdit[categoryType]}
              className="my-3"
              handleSelect={(status) => handleChangeStatus(status.id)}
              initialSelect={client?.status_2}
              selectedOption="statusColor"
              noOptionChange={isContactInCampaign}
            />
          )}
          <InfoCard label="Import Source" content={client.import_source_text} client={client} />
          {client.summary && <InfoCard label="Summary" content={client.summary} client={client} />}

          {campaginName ? (
            <InfoCard label="Campaign" showDot={client?.campaign_id ? client?.campaign_id : 0} content={campaginName} />
          ) : (
            <InfoCard label="Campaign" showDot={client?.campaign_id ? client?.campaign_id : 0} content="" />
          )}
          <InfoCard
            label="Last Communication"
            content={
              client?.last_communication_date ? formatDateMDY(client?.last_communication_date) : 'No Communication'
            }
            iconContent={
              client?.last_communication_date && client?.category_1 !== 'Trash' ? (
                <DateChip
                  lastCommunication={client.last_communication_date}
                  contactStatus={client.status_2}
                  contactCategory={categoryType}
                  className="ml-2 !mt-0  pt-0"
                />
              ) : null
            }
          />
          {/* <ChipInput
            label="Tags"
            selections={tags}
            placeholder="Write tag and hit enter"
            removeChip={removeTag}
            addChip={addTag}
          /> */}
          <DropdownWithSearch
            isMulti
            label="Priority"
            options={multiselectOptionsClients}
            typeOfContact={client?.category_1 === 'Client' ? 0 : 1}
            value={findTagsOption(tags)}
            onChange={(choice) => {
              handleChangeTags(choice.map((el) => el.label));
            }}
          />
          <Dropdown
            label="Lead Source"
            openClassName={'pb-64'}
            activeIcon={false}
            options={leadSourceOptions}
            className="mt-3 mb-8"
            handleSelect={(source) => {
              console.log(source);
              handleChangeSource(source.label);
            }}
            initialSelect={client?.lead_source}
            placeHolder={client?.lead_source ? client?.lead_source : 'Choose'}
          />
        </div>
      )}
      {changeStatusModal && (
        <ChangeStatus handleCloseOverlay={() => setChangeStatusModal(false)} onSubmit={handleChangeStatusAndCampaign} />
      )}
    </>
  );
}
