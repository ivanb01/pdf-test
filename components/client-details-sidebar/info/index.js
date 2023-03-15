import InfoCard from './card';
import Relationships from './relationships/relationships';
import CategoryTypes from './categoryTypes';
import Dropdown from 'components/shared/dropdown';
import Chip from 'components/shared/chip';
import * as contactServices from 'api/contacts';
import { allStatusesQuickEdit, importSourceOptions } from 'global/variables';
import { formatDateMDY, formatDateAgo } from 'global/functions';
import { useEffect, useState } from 'react';
import { getContactCampaign, getCampaign } from 'api/campaign';

export default function Info({ client, handleFetchContactRequired }) {
  const categoryType = client?.category_1.toLowerCase() + 's';
  const [campaginName, setCampaignName] = useState('');

  const fetchContactCampaign = async () => {
    try {
      
      const { data } = await getContactCampaign(client?.id);
      console.log('campaign name', data)
      if (data?.id) {
        const { data: data2 } = await getCampaign(data?.campaign_id);
        setCampaignName(data2?.campaign_name);
      } else if (data?.message) {
        setCampaignName('No matching campaign');
      } else {
        setCampaignName('Not in campaign')        
      }

    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
    fetchContactCampaign();
  }, [client])


  const handleChangeStatus = async (status) => {
    try {
      const res = await contactServices.updateContact(client.id, {
        status_id: status,
      });
      console.log('changeStatus', client.id, status, res);
      handleFetchContactRequired();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeSource = async (source) => {
    try {
      const res = await contactServices.updateContact(client.id, {
        import_source: source,
      });
      console.log('changeSource', client.id, source);
      handleFetchContactRequired();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    { client && 
      <div className="pl-6  flex flex-col my-4">
        <CategoryTypes
          client={client}
          handleFetchContactRequired={handleFetchContactRequired}
        />
        <div className="border-b border-gray-2" />
        <Dropdown
          label="Status"
          activeIcon={false}
          options={allStatusesQuickEdit[categoryType]}
          className="mb-1 w-52"
          activeClasses="bg-purple1"
          handleSelect={(status) => handleChangeStatus(status.id)}
          initialSelect={client?.status_2}
          selectClasses="bg-purple1 rounded-full"
        />

        {campaginName ? <InfoCard label= 'Campaign' content={campaginName} /> :<InfoCard label= 'Campaign' content='' /> }
        <InfoCard 
          label= 'Last Communication'
          content={client?.last_communication_date ? formatDateMDY(client?.last_communication_date) : '-'}
          iconContent={client?.last_communication_date ? <Chip lastCommunication={formatDateAgo(client?.last_communication_date)} className='ml-2 mt-0' /> : null}
        />
        {/* <InfoCard 
          label= 'Last Communication'
          content={client?.created_at ? formatDateMDY(client?.created_at) : '-'}
          iconContent={client?.created_at ? <Chip lastCommunication={formatDateAgo(client?.created_at)} className='ml-2 mt-0' /> : null}
        /> */}
        <InfoCard label= 'Tags' content={client?.tags ? client?.tags  : 'No tags'} />
        {/* <InfoCard label= 'Source' content={client?.import_source ? client?.import_source  : 'No source'} /> */}
        <Dropdown
          label="Source"
          activeIcon={false}
          options={importSourceOptions}
          className="mb-1 w-52"
          activeClasses="bg-purple1"
          handleSelect={(source) => handleChangeSource(source.name)}
          initialSelect={client?.import_source}
          selectClasses="bg-purple1 rounded-full"
          placeHolder={client?.import_source ? null : 'Choose'}
        />
        <Relationships contactId={client?.id} />
      </div>
    }
    </>
  );
}
