import { getInitials, getFormattedDateFromTimestamp } from 'global/functions';
import noUsersFound from '/public/images/campaign/noUsersFound.svg';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AssignUnassignContactToCampaign from '@components/shared/AssignUnassignContactToCampaign';
import Table from '..';
import { useRouter } from 'next/router';
import StatusChip, { VARIANT_ENUM } from '@components/shared/status-chip';

const InCampaignContactsTable = ({ data, setCurrentButton, categoryType, status, status_2 }) => {
  const router = useRouter();
  const eventsTable = () => {
    return (
      <div>
        <thead className={' flex w-full'}>
          {data[0].events?.map((e, index) => (
            <th
              key={index}
              scope="col"
              className={`${
                index === data[0].events.length - 1 ? ' border-gray-2' : ''
              } flex-grow flex-1 pl-6 pr-20 py-3 bg-gray-50  border-b text-left uppercase text-xs leading-4 font-medium tracking-wider text-lightBlue3`}>
              <div className={'min-w-[200px]'}> {e?.event_name}</div>
            </th>
          ))}
        </thead>
        <tbody className={'flex flex-col w-full max-h-[390px]'}>
          {data.map((events, rowIndex) => (
            <tr key={rowIndex} className={'flex   w-full'}>
              {events.events.map((e, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`flex-grow flex-1 px-6 py-[15px] border-b border-gray2 pr-[66px] mb-[0px] ${
                    cellIndex === events.events.length - 1 ? ' border-gray2' : ''
                  }`}>
                  <div className={'flex flex-col gap-1 mb-[-1px] min-w-[200px] ml-3'}>
                    <StatusChip
                      variant={
                        e?.event_status?.toLowerCase() === 'scheduled'
                          ? VARIANT_ENUM.WARNING
                          : e?.event_status?.toLowerCase() === 'sent'
                            ? VARIANT_ENUM.SUCCESS
                            : VARIANT_ENUM.ERROR
                      }
                      text={
                        e?.event_status?.toLowerCase() === 'scheduled'
                          ? 'To be sent'
                          : e?.event_status?.toLowerCase() === 'sent'
                            ? 'Sent'
                            : 'Canceled'
                      }></StatusChip>
                    {e.date !== null && (
                      <div className={'text-sm leading-4 font-normal text-gray5 ml-3'}>
                        {getFormattedDateFromTimestamp(e.event_updated_at)}
                      </div>
                    )}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </div>
    );
  };
  const other = () => {
    const { id, category } = router.query;
    return (
      <>
        <thead className={'w-[350px]'}>
          <tr className="bg-gray-50 text-gray4">
            <th
              scope="col"
              className="px-6 py-3 text-left border-b text-xs leading-4 font-medium tracking-wider border-r border-gray2 uppercase">
              {categoryType == 'Unknown' ? 'All Clients' : `${categoryType} - ${status_2}`}
            </th>
          </tr>
        </thead>
        <tbody className={'w-[350px]'}>
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
              <td className="pl-6 py-4 pr-[100px] border-b border-r  border-gray2">
                <div className={'flex gap-4'}>
                  <div>
                    {person?.profile_image_path ? (
                      <img
                        className="inline-block h-10 w-10 rounded-full"
                        src={person?.profile_image_path}
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
            </tr>
          ))}
        </tbody>
      </>
    );
  };
  const assignToCampaign = () => {
    return (
      <>
        <thead>
          <tr className="bg-gray-50 text-gray4">
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs border-l leading-4 font-medium tracking-wider border-b border-gray2 uppercase">
              Campaign
            </th>
          </tr>
        </thead>
        <tbody className={'flex flex-col'}>
          {data.map((person) => (
            <td className={'px-6 py-4 pl-6  pr-4  border-l border-gray2 h-[73px] border-b'} style={{ width: 120 }}>
              <div className={'flex gap-[5px] items-center justify-start'}>
                <AssignUnassignContactToCampaign
                  campaignId={router.query.id}
                  objectKey={'contacts_in_campaign'}
                  active={person?.contact_campaign_status === 'assigned'}
                  activePerson={person}
                />
                <div>
                  <span
                    className={`text-xs leading-5 font-medium ${
                      person.contact_campaign_status === 'unassigned' ? 'text-gray3' : 'text-gray7'
                    }`}>
                    {person.contact_campaign_status === 'assigned'
                      ? 'Active'
                      : person.contact_campaign_status === 'unassigned'
                        ? 'Disabled'
                        : 'Active'}
                  </span>
                </div>
              </div>
            </td>
          ))}
        </tbody>
      </>
    );
  };

  return data && data?.length > 0 ? (
    <Table tableFor={'inCampaignContacts'}>
      <div className={'flex overflow-x-clip w-[100vw] '}>
        <div className={'shrink-0'}>{other()}</div>
        <div className={'flex-1 shrink mr-[-8px]'} style={{ overflowX: 'auto' }}>
          {eventsTable()}
        </div>
        <div className={'shrink-0 '}>{assignToCampaign()}</div>
      </div>
    </Table>
  ) : (
    <Table>
      <div className={'flex flex-col items-center justify-center mt-[10%] gap-6 text-center'}>
        <img src={noUsersFound.src} alt="No users found" />
        <div>
          <h4 className={'text-sm leading-5 font-medium text-gray7'}>There are no clients ”In Campaign”</h4>
          <span className={'text-xs leading-4 font-normal text-gray4'}>
            To start assigning clients please go to “All” or “Not in Campaign” list.
          </span>
          <div className={'mt-6 flex items-center justify-center'}>
            <div
              role={'button'}
              className={'flex gap-3 items-center justify-center'}
              onClick={() => setCurrentButton(0)}>
              <ArrowBackIcon className={'text-lightBlue3 h-5 w-5'} />
              <div className="text-center font-inter font-medium text-lightBlue3 text-base leading-5">Back to all</div>
            </div>
            <div className={'h-4 border-r border-[#D9D9D9] mx-6'} style={{ width: '2px' }} />
            <div
              role={'button'}
              className={'flex gap-3 items-center justify-center'}
              onClick={() => setCurrentButton(2)}>
              <div className="text-center font-inter font-medium text-lightBlue3 text-base leading-5">
                Not in campaign
              </div>
              <ArrowForwardIcon className={'text-lightBlue3 h-5 w-5'} />
            </div>
          </div>
        </div>
      </div>
    </Table>
  );
};

export default InCampaignContactsTable;
