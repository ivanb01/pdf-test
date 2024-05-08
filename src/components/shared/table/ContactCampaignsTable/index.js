import Table from '..';
import eyeIcon from '/public/images/eye.svg';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import EventStatusDate from 'components/event-status';
import Text from '@components/shared/text';
import ContactInfo from '../contact-info';
import noClientCampaigns from '/public/images/no-client-campaigns.svg';
import { formatDateMDY } from 'global/functions';
import { getAllEvents, unassignContactFromCampaign } from 'api/campaign';

const ContactCampaignsTable = ({
  tableFor,
  campaignId,
  titleLabel,
  handleSelectContact,
  handleAction,
  currentButton,
  setCurrentEvent,
  data,
  searchTerm,
}) => {
  let contactStatus;
  let title;
  let description;

  if (currentButton === 0) {
    title = 'You don’t have any assigned contacts';
    description = `Clients that are part of this campaign will be listed here`;
  } else if (currentButton === 1) {
    title = 'You don’t have any contacts that you can assign to this campaign';
    description = `Clients that are not part of this campaign, but can be assigned will be listed here`;
  } else {
    title = 'You don’t have any unassigned contacts here';
    description = `Clients that were once part of this campaign, and cannot be reassigned will be listed here`;
  }

  const [campaignEvents, setCampaignEvents] = useState();

  useEffect(() => {
    getAllEvents(campaignId).then((res) => setCampaignEvents(res.data));
  }, [campaignId]);

  const noResults = () => {
    return (
      <tr>
        <td colSpan={10}>
          <div className="flex flex-col items-center justify-center h-[433px] max-w-[390px] mx-auto my-0">
            <Text h3 className="text-gray7 mb-2 mt-4 text-center">
              No results have been found!
            </Text>
          </div>
        </td>
      </tr>
    );
  };

  // if (!data?.length && !searchTerm)
  const noData = () => {
    return (
      <tr>
        <td colSpan={10}>
          <div className="flex flex-col items-center justify-center h-[433px] max-w-[390px] mx-auto my-0">
            <Image src={noClientCampaigns}></Image>
            <Text h3 className="text-gray7 mb-2 mt-4 text-center">
              {title}
            </Text>
            <Text p className="text-gray4 relative text-center mb-6">
              {description}
            </Text>
          </div>
        </td>
      </tr>
    );
  };

  const skeletonData = [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

  return (
    <Table tableFor={tableFor}>
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="h-[56px] min-w-96 w-96 py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6  items-center border-r border-gray-200"
          >
            {/* <Input type="checkbox" onChange={() => handleSelectAll}></Input> */}
            <div className="flex items-center justify-between">
              <span>{titleLabel}</span>
              {/* <Button white >See Campaign Preview</Button> */}
            </div>
          </th>
          {!campaignEvents ? (
            <>
              {skeletonData.map((data, index) => (
                <th
                  key={index}
                  scope="col"
                  className="px-3 py-3 text-center text-xs font-medium tracking-wide animate-pulse"
                >
                  <div className="">
                    <div className="uppercase bg-gray-300 h-3.5 mb-1"></div>
                    <div className="bg-gray-300 h-3.5"></div>
                  </div>
                </th>
              ))}
            </>
          ) : (
            campaignEvents?.events.map((event, index) => (
              <th key={index} scope="col" className="px-3 py-3 text-center text-xs font-medium tracking-wide">
                <div className="">
                  <div className="uppercase text-gray-500">Event {index + 1}</div>
                  <div className="text-lightBlue3 cursor-pointer" onClick={() => setCurrentEvent(index + 1)}>
                    <Image src={eyeIcon} />
                    <span className="ml-1">Preview</span>
                  </div>
                </div>
              </th>
            ))
          )}
          {/* <th
            scope="col"
            className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500"
          >
            Assigned On
          </th> */}
        </tr>
      </thead>
      <tbody className="bg-white">
        {!data?.length && searchTerm
          ? noResults()
          : !data?.length && !searchTerm
            ? noData()
            : data.map((dataItem, index) => {
                return (
                  <tr
                    key={index}
                    className="hover:bg-lightBlue1 cursor-pointer contact-row group bg-white group border-b border-gray-200"
                    // onClick={(event) => handleClickRow(contact, event)}
                  >
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 border-r border-gray-200">
                      <ContactInfo
                        data={{
                          name: `${dataItem.contact_name}`,
                          id: dataItem.contact_id,
                          email: dataItem.contact_email,
                          image: dataItem.profile_image_path,
                          assigned:
                            dataItem.contact_campaign_status === 'unassigned'
                              ? 2
                              : dataItem.contact_campaign_status === 'assigned'
                                ? 1
                                : 0,
                        }}
                        // handleSelect={(e, dataItem) =>
                        //   handleSelectContact(e, dataItem)
                        // }
                        handleAction={(id, action) => handleAction(id, action)}
                      />
                    </td>
                    {dataItem &&
                      dataItem?.events.map((event, index) => (
                        <td
                          key={`event-${index}`}
                          className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500"
                        >
                          <EventStatus status={event.event_status} />
                          <div className="text-gray7">{formatDateMDY(event?.event_updated_at)}</div>
                        </td>
                      ))}
                    {dataItem.events.length === 0 &&
                      [1, 2, 3, 4, 5].map((event, index) => (
                        <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">
                          <div className="text-gray7">-</div>
                        </td>
                      ))}
                  </tr>
                );
              })}
      </tbody>
    </Table>
  );
};

export default ContactCampaignsTable;
