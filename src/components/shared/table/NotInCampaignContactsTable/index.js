import React from 'react';
import Table from '..';
import { getInitials, getFormattedDateFromTimestamp, getSource } from 'global/functions';
import DateChip from '@components/shared/chip/date-chip';
import TooltipComponent from '@components/shared/tooltip';
import noUsersFound from '/public/images/campaign/noUsersFound.svg';
import AssignUnassignContactToCampaign from '@components/shared/AssignUnassignContactToCampaign';
import { useRouter } from 'next/router';
import StatusChip, { VARIANT_ENUM } from '@components/shared/status-chip';

const NotInCampaignContactsTable = ({ data, categoryType, status, status_2, updatePaginationContacts }) => {
  const router = useRouter();
  const { id, category } = router.query;

  return data && data?.length > 0 ? (
    <Table>
      <thead>
        <tr className="bg-gray-50 text-gray4">
          <th scope="col" className="px-6 py-3  text-left text-xs leading-4 font-medium tracking-wider uppercase">
            {categoryType == 'Unknown' ? 'All Clients' : `${categoryType} - ${status_2}`}
          </th>
          <th
            scope="col"
            className="flex-grow px-6 py-3 text-left uppercase text-xs leading-4 font-medium tracking-wider">
            contact summary
          </th>
          <th
            scope="col"
            className="flex-grow px-6 py-3 uppercase  text-left    text-xs leading-4 font-medium tracking-wider">
            last communication
          </th>
          <th
            scope="col"
            className="flex-grow px-6 pr-0 py-3 uppercase text-left   text-xs leading-4 font-medium tracking-wider">
            CAMPAIGN history
          </th>
          <th
            scope="col"
            className="flex-grow px-6 py-3 uppercase text-left   text-xs leading-4 font-medium tracking-wider">
            campaign
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((person) => (
          <tr
            key={person.id}
            onClick={() => {
              localStorage.setItem('id', JSON.stringify(id));
              localStorage.setItem('category', JSON.stringify(category));
              router.push({
                pathname: '/contacts/details',
                query: { id: person?.contact_id },
              });
            }}
            className={'border-b border-gray-200 cursor-pointer hover:bg-lightBlue1 group'}>
            <td className="pl-6 py-4 pr-4">
              <div className={'flex gap-4'}>
                <div>
                  {person.profile_image_path ? (
                    <img
                      className="inline-block h-10 w-10 rounded-full"
                      src={person.profile_image_path ?? ''}
                      alt={person.contact_name}
                    />
                  ) : (
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">
                      <span className="text-sm font-medium leading-none text-white">
                        {getInitials(person.contact_name).toUpperCase()}
                      </span>
                    </span>
                  )}
                </div>
                <div>
                  <h6 className={'text-sm leading-5 font-medium text-gray-800 '}>{person.contact_name}</h6>
                  <h6 className={' text-sm leading-5 font-normal text-gray-500'}>{person.contact_email}</h6>
                </div>
              </div>
            </td>
            <td className="px-6 py-4">
              {person.contact_summary !== null && person.contact_summary.length > 0 && (
                <TooltipComponent
                  side={'bottom'}
                  align={'center'}
                  triggerElement={
                    <div
                      className={
                        'max-w-[239px] leading-5 text-left font-medium max-h-[24px] text-[11px] px-3 py-0.5 mt-1.5 text-ellipsis overflow-hidden bg-lightBlue1 text-lightBlue3 '
                      }>
                      {person.contact_summary}
                    </div>
                  }>
                  <div className={`w-[260px] pointer-events-none text-white bg-neutral1 rounded-lg`}>
                    <p className="text-xs leading-4 font-normal">{person.contact_summary}</p>
                  </div>
                </TooltipComponent>
              )}
            </td>
            <td className={'px-6 py-4'}>
              <DateChip
                contact={person}
                lastCommunication={person.last_communication}
                contactStatus={person.status_2}
                contactCategory={'clients'}
              />
            </td>
            <td className={'px-6 py-4'}>
              <div className={'flex flex-col gap-1'}>
                <div className={'flex gap-1 items-center'}>
                  {/* eslint-disable-next-line react/jsx-no-undef */}
                  <StatusChip
                    variant={VARIANT_ENUM.ERROR}
                    text={
                      person.contact_campaign_status === 'never_assigned' ? 'Never in Campaign' : 'Campaign Deactivated'
                    }
                  />
                </div>
                {person.contact_unenrolment_date !== null && (
                  <div className={'text-xs leading-4 font-medium text-gray5 ml-3'}>
                    from {getFormattedDateFromTimestamp(person.contact_unenrolment_date)}
                  </div>
                )}
              </div>
            </td>
            <td className={'px-6 py-4'}>
              <div className={'flex gap-[5px] items-center justify-start'}>
                <AssignUnassignContactToCampaign
                  campaignId={router.query.id}
                  objectKey={'contacts_not_campaign'}
                  active={false}
                  disabled={person.contact_campaign_status === 'unassigned'}
                  activePerson={person}
                  updatePaginationContacts={updatePaginationContacts}
                />
                <div>
                  <span
                    className={`text-xs leading-5 font-medium ${
                      person.contact_campaign_status === 'unassigned' ? 'text-gray3' : 'text-gray7'
                    }`}>
                    {person.contact_campaign_status === 'assigned'
                      ? 'Active'
                      : person.contact_campaign_status === 'unassigned'
                        ? 'Deactivated'
                        : 'Inactive'}
                  </span>
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  ) : (
    <div>
      <div className={'flex flex-col items-center justify-center mt-[8%] gap-6 text-center'}>
        <img src={noUsersFound.src} alt="No users found" />
        <div>
          <h4 className={'text-sm leading-5 font-medium text-gray7'}>There is no contact “Not in Campaign”</h4>
          <span className={'text-xs leading-4 font-normal text-gray4'}>
            Contacts that have been matched in this campaign but are still “inactive” <br /> in the campaign, will be
            displayed here.
          </span>
        </div>
      </div>
    </div>
  );
};

export default NotInCampaignContactsTable;
