import React, { useEffect, useState } from 'react';
import { getInitials, formatDateStringMDY, getSource } from 'global/functions';
import DateChip from '@components/shared/chip/date-chip';
import TooltipComponent from '@components/shared/tooltip';
import noUsersFound from '/public/images/campaign/noUsersFound.svg';
import EmailIcon from '@mui/icons-material/Email';
import AssignUnassignContactToCampaign from '@components/shared/AssignUnassignContactToCampaign';
import Table from '..';
import { useRouter } from 'next/router';
import StatusChip, { VARIANT_ENUM } from '@components/shared/status-chip';
import PreviewEventsPerClient from '@components/overlays/preview-events-per-client';
import { useAllCampaignContacts } from '../../../../hooks/campaignHooks';

const AllCampaignContactsTable = ({
  paginationItems,
  campaignPreviewData,
  categoryType,
  status_2,
  campaignFor,
  campaignData,
  campaignId,
  updatePaginationContacts,
  isLoading,
  isFetching,
}) => {
  const router = useRouter();
  const [openEventsPreview, setOpenEventsPreview] = useState(false);
  const { id, category } = router.query;
  const [person, setPerson] = useState();

  useEffect(() => {
    setPerson(person);
  }, [paginationItems]);

  return paginationItems && paginationItems?.length > 0 ? (
    <>
      <Table>
        <thead className={'sticky top-0 z-10'}>
          <tr className="bg-gray-50 text-gray4 sticky top-0">
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
              className="flex-grow px-6 py-3  uppercase text-left   text-xs leading-4 font-medium tracking-wider">
              sent emails
            </th>
            <th
              scope="col"
              className="flex-grow px-6 py-3 uppercase text-left   text-xs leading-4 font-medium tracking-wider">
              campaign
            </th>
            <th
              scope="col"
              className="flex-grow px-6 pr-0 py-3 uppercase text-left   text-xs leading-4 font-medium tracking-wider">
              CAMPAIGN history
            </th>
          </tr>
        </thead>
        <tbody className={'overflow-y-scroll'}>
          {paginationItems.map((person) => (
            <tr
              key={person?.id}
              onClick={() => {
                setPerson(person);
                localStorage.setItem('id', JSON.stringify(id));
                localStorage.setItem('category', JSON.stringify(category));
                setOpenEventsPreview(true);
              }}
              className={'border-b border-gray-200 hover:bg-lightBlue1 group cursor-pointer'}>
              <td className="pl-6 py-4 pr-4 cursor-pointer">
                <div className={'flex'}>
                  <div
                    className={'flex items-start justify-start w-14 '}
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push({
                        pathname: '/contacts/details',
                        query: { id: person?.contact_id },
                      });
                    }}>
                    {person?.profile_image_path ? (
                      <img
                        className="inline-block h-10 w-10 rounded-full"
                        src={person?.profile_image_path}
                        alt={person?.contact_first_name}
                      />
                    ) : (
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">
                        <span className="text-sm font-medium leading-none text-white">
                          {getInitials(person?.contact_first_name + ' ' + person?.contact_last_name).toUpperCase()}
                        </span>
                      </span>
                    )}
                  </div>
                  <div>
                    <h6
                      className={'text-sm leading-5 font-medium text-gray-800 w-max'}
                      role={'button'}
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push({
                          pathname: '/contacts/details',
                          query: { id: person?.contact_id },
                        });
                      }}>
                      {person?.contact_first_name} {person?.contact_last_name}
                    </h6>
                    <h6
                      role="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push({
                          pathname: '/contacts/details',
                          query: { id: person?.contact_id },
                        });
                      }}
                      className={' text-sm leading-5 font-normal text-gray-500 w-max'}>
                      {person?.contact_email}
                    </h6>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                {person?.contact_summary && person?.contact_summary !== null && person?.contact_summary.length > 0 && (
                  <TooltipComponent
                    side={'bottom'}
                    align={'center'}
                    triggerElement={
                      <div
                        className={
                          'max-w-[239px] leading-5 text-left font-medium max-h-[24px] text-[11px] px-3 py-0.5 mt-1.5 text-ellipsis overflow-hidden bg-lightBlue1 text-lightBlue3 '
                        }>
                        {person?.contact_summary}
                      </div>
                    }>
                    <div className={`w-[260px] pointer-events-none text-white bg-neutral1 rounded-lg`}>
                      <p className="text-xs leading-4 font-normal">{person?.contact_summary}</p>
                    </div>
                  </TooltipComponent>
                )}
              </td>
              <td className={'px-6 py-4'}>
                <DateChip
                  contact={person && person}
                  lastCommunication={person?.last_communication_date ?? ''}
                  contactStatus={status_2}
                  contactCategory={'clients'}
                />
              </td>
              <td className={'px-6 py-4'}>
                <div className={'flex gap-4'}>
                  <div className={'flex gap-[5px] items-center justify-center'}>
                    <span className={'text-sm leading-5 font-normal text-gray7'}>
                      {person?.event_sent?.email ?? '0'}
                    </span>
                    <EmailIcon className={'h-3 w-3 text-[#909CBE]'} />
                  </div>
                </div>
              </td>
              <td className={'px-6 py-4'}>
                <div className={'flex gap-[5px] items-center justify-start'}>
                  <AssignUnassignContactToCampaign
                    campaignId={router.query.id}
                    active={
                      person?.contact_campaign_status !== 'never_assigned' &&
                      person?.contact_campaign_status !== 'unassigned'
                    }
                    disabled={person?.contact_campaign_status === 'unassigned'}
                    activePerson={person}
                    objectKey={'all_contacts_campaign'}
                    updatePaginationContacts={() => updatePaginationContacts(person)}
                  />
                  <div>
                    <span
                      className={`text-xs leading-5 font-medium ${
                        person?.contact_campaign_status === 'unassigned' ? 'text-gray3' : 'text-gray7'
                      }`}>
                      {person?.contact_campaign_status === 'assigned'
                        ? 'Active'
                        : person?.contact_campaign_status === 'unassigned'
                          ? 'Deactivated'
                          : 'Inactive'}
                    </span>
                  </div>
                </div>
              </td>
              <td className={'px-6 py-4'}>
                <div className={'flex flex-col gap-1 max-w-[140px] items-center justify-center'}>
                  <div className={'flex gap-1 items-center '}>
                    <StatusChip
                      variant={
                        person?.contact_campaign_status === 'assigned' ? VARIANT_ENUM.SUCCESS : VARIANT_ENUM.ERROR
                      }
                      text={
                        person?.contact_campaign_status === 'assigned'
                          ? 'Campaign is Running'
                          : person?.contact_campaign_status === 'unassigned'
                            ? 'Campaign Deactivated'
                            : 'Never In Campaign'
                      }
                    />
                  </div>
                  {person?.contact_campaign_status !== null && (
                    <div className={'text-xs leading-4 font-medium text-gray5 ml-0'}>
                      {person?.contact_campaign_status === 'assigned'
                        ? `from ${formatDateStringMDY(person?.contact_enrollment_date)}`
                        : person?.contact_campaign_status === 'unassigned'
                          ? `from ${formatDateStringMDY(person?.contact_unenrolment_date)}`
                          : ''}
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <PreviewEventsPerClient
        campaignData={campaignData}
        isLoading={isLoading}
        isFetching={isFetching}
        campaignId={campaignId}
        person={person && paginationItems && paginationItems?.find((c) => c.contact_id == person?.contact_id)}
        open={openEventsPreview}
        setOpen={setOpenEventsPreview}
        title={campaignFor}
      />
    </>
  ) : (
    <div>
      <div className={'flex flex-col items-center justify-center mt-[10%] gap-6 text-center'}>
        <img src={noUsersFound.src} alt="No users found" />
        <div>
          <h4 className={'text-sm leading-5 font-medium text-gray7'}>There is no contact matching to this campaign</h4>
          <span className={'text-xs leading-4 font-normal text-gray4'}>
            Contacts must share the same type and status as this campaign to appear in this list.
          </span>
        </div>
      </div>
    </div>
  );
};

export default AllCampaignContactsTable;
