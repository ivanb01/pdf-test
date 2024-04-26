import eyeIcon from '/public/images/eye.svg';
import Image from 'next/image';
import { useState } from 'react';
import ContactInfo from './contact-info';
import { formatDateLThour, formatDateCalendar } from 'global/functions';
import Table from '..';

const CampaignsTable = (data, handleSelectAll, handleClickRow, handleSelectContact, setCurrentEvent, setCampaignId) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Table>
      <thead className="bg-gray-50 overflow-x-hidden">
        <tr>
          <th
            scope="col"
            className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6 flex items-center">
            {/* <Input type="checkbox" onChange={() => handleSelectAll}></Input> */}
            Contacts
          </th>
          <th scope="col" className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
            Campaign
          </th>
          <th scope="col" className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
            To Be Sent On
          </th>
        </tr>
      </thead>
      <tbody className="bg-white">
        {data.map((dataItem) => (
          <tr
            key={dataItem.event_id}
            className="hover:bg-lightBlue1 cursor-pointer contact-row border-b border-gray-200"
            // onClick={(event) => handleClickRow(dataItem, event)}
          >
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
              <ContactInfo
                // handleSelect={() => console.log('test')}
                data={{
                  name: dataItem.contact_name,
                  type: dataItem.contact_category,
                  status: dataItem.contact_status,
                  image: dataItem.contact_profile_url,
                }}
              />
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              <div className="text-gray7  font-medium">{dataItem.campaign_name}</div>
              <div
                className="text-lightBlue3 cursor-pointer hover:underline"
                onClick={() => {
                  console.log(dataItem, data);
                  setCampaignId(dataItem.campaign_id);
                }}>
                <Image src={eyeIcon} />
                <span className="ml-1">Preview Campaign</span>
              </div>
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              <div className="text-gray7 font-medium">{formatDateCalendar(dataItem.event_scheduled_time)}</div>
              <div className="text-gray4">{formatDateLThour(dataItem.event_scheduled_time)}</div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CampaignsTable;
