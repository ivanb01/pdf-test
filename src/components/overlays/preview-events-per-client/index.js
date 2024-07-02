import SlideOver from '@components/shared/slideOver';
import {
  areObjectsEqual,
  formatDateStringMDY,
  getFormattedDateFromTimestamp,
  getInitials,
  getTimeWithAMPM,
} from '@global/functions';
import React, { useEffect, useState } from 'react';
import SimpleBar from 'simplebar-react';
import Divider from '../../../icons/Divider';
import CircleIcon from '@components/CircleIcon';
import MailIcon from '../../../icons/MailIcon';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import EmailIcon from '@mui/icons-material/Email';
import DOMPurify from 'dompurify';
import { useDispatch, useSelector } from 'react-redux';
import StatusChip, { VARIANT_ENUM } from '@components/shared/status-chip';
import { getAllEvents, getCampaign } from '@api/campaign';
import { setRefetchCampaign, setUsersInCampaignGlobally } from '@store/campaigns/slice';

const PreviewEventsPerClient = ({
  open,
  setOpen,
  title,
  person,
  campaignId,
  data,
  campaignData: cData,
  isLoading,
  isFetching,
}) => {
  const [activeEvent, setActiveEvent] = useState();
  const [selectedEventIndex, setSelectedEventIndex] = useState();
  const [campaignData, setCampaignData] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(isLoading || isFetching);
  }, [isLoading, isFetching]);
  useEffect(() => {
    if (person?.contact_campaign_status !== 'never_assigned') {
      if (cData) {
        setCampaignData(cData);
      } else {
        getAllEvents(campaignId).then((res) => {
          console.log(res?.data);
          setCampaignData(res.data);
        });
      }
    }
    if (!open) {
      return;
    }
  }, [campaignId, data, person, open, cData]);

  useEffect(() => {
    if (campaignData && person?.contact_campaign_status !== 'never_assigned') {
      setActiveEvent(campaignData?.events[0]);
      setSelectedEventIndex(1);
    }
  }, [campaignData]);

  const user = useSelector((state) => state.global.user);

  useEffect(() => {
    if (person?.contact_campaign_status !== 'never_assigned') {
      console.log(person, 'person');
      setActiveEvent(person?.events_preview && person?.events_preview[0]);
      setSelectedEventIndex(1);
    }
  }, [person]);

  return (
    <SlideOver
      width="w-[1070px]"
      open={open}
      hideScroll
      className="rounded-md"
      border={'rounded-tl-[22px]'}
      title={`Campaign for ${title}`}
      isCampaignTitle
      campaignLoading={loading}
      person={person && person}
      setOpen={(state) => {
        setOpen(state);
      }}>
      <div>
        <div className={'flex gap-4 mb-6'}>
          {person && (
            <div>
              {person?.profile_image_path ? (
                <img
                  className="inline-block h-10 w-10 rounded-full"
                  src={person?.profile_image_path}
                  alt={person?.contact_name}
                />
              ) : (
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">
                  <span className="text-sm font-medium leading-none text-white">
                    {getInitials(person?.contact_name).toUpperCase()}
                  </span>
                </span>
              )}
            </div>
          )}
          <div>
            <h6 className={'text-sm leading-5 font-medium text-gray-800 '}>{person?.contact_name}</h6>
            <h6 className={' text-sm leading-5 font-normal text-gray-500'}>{person?.contact_email}</h6>
          </div>
        </div>
        <hr className="-mx-6" />
        {person?.contact_campaign_status === 'never_assigned' && (
          <>
            <div className={'p-4 border-l-4  border-[#FBBF24] -mx-6 flex  align-center gap-[12px] bg-yellow1'}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.25608 3.09858C9.02069 1.73928 10.9778 1.73928 11.7424 3.09858L17.3227 13.0191C18.0726 14.3523 17.1092 15.9996 15.5795 15.9996H4.41893C2.88927 15.9996 1.92585 14.3523 2.67578 13.0191L8.25608 3.09858ZM10.9991 12.9998C10.9991 13.552 10.5514 13.9998 9.99915 13.9998C9.44686 13.9998 8.99915 13.552 8.99915 12.9998C8.99915 12.4475 9.44686 11.9998 9.99915 11.9998C10.5514 11.9998 10.9991 12.4475 10.9991 12.9998ZM9.99915 4.99976C9.44686 4.99976 8.99915 5.44747 8.99915 5.99976V8.99976C8.99915 9.55204 9.44686 9.99976 9.99915 9.99976C10.5514 9.99976 10.9991 9.55204 10.9991 8.99976V5.99976C10.9991 5.44747 10.5514 4.99976 9.99915 4.99976Z"
                  fill="#FBBF24"
                />
              </svg>
              <p className={'text-sm leading-5 font-medium text-yellow3'}>
                In order to receive these events, you must “activate” campaign for this client.
              </p>
            </div>
            <hr className="-mx-6" />
          </>
        )}
        <div className="flex -mx-6" style={{ height: 'calc(100vh - 190px)' }}>
          <div className="w-1/2">
            <SimpleBar
              style={{
                maxHeight:
                  person?.contact_campaign_status !== 'never_assigned' ? 'calc(100vh - 180px)' : 'calc(100vh - 235px)',
                height: '100vh',
              }}>
              <div className={'flex flex-col px-[22px] py-[26px] '}>
                <div className="mb-4 text-gray8 text-sm font-medium">Events</div>
                {person?.contact_campaign_status === 'never_assigned' ? (
                  <div>
                    {(campaignData === undefined && activeEvent === undefined) || loading === true ? (
                      <div className={'flex flex-col mt-2 gap-10'}>
                        {[1, 2, 3].map((item, index) => (
                          <div key={index} className="animate-pulse bg-gray1 rounded-lg h-[66px] w-[469px]"></div>
                        ))}
                      </div>
                    ) : (
                      <div>
                        {campaignData?.events?.map((e, index) => {
                          const execute_on =
                            e?.execute_on === 'Same day as added in system' ? 0 : e?.execute_on.split(' ')[1];
                          return (
                            <div className="mb-3 last:mb-0">
                              <div className="px-2 py-1 bg-gray1 text-sm font-semibold inline-block rounded text-gray5">
                                Wait {execute_on} {execute_on == 0 || execute_on == 1 ? 'day' : 'days'}, then send this
                                event at {getTimeWithAMPM(e?.execute_date)}
                              </div>
                              <div className="my-2 pl-2">
                                <Divider />
                              </div>
                              <div
                                onClick={() => {
                                  setSelectedEventIndex(index + 1);
                                  setActiveEvent({ ...e });
                                }}
                                className={`cursor-pointer rounded-lg border ${
                                  areObjectsEqual(campaignData?.events[index], activeEvent) &&
                                  'border-[#BAE6FD] bg-lightBlue1'
                                } p-3 flex  flex-col gap-[10px] `}>
                                <div className={'flex justify-between items-center group'}>
                                  <div className="flex items-center">
                                    <div className="w-">
                                      <CircleIcon
                                        small
                                        active={areObjectsEqual(campaignData?.events[index], activeEvent)}>
                                        <MailIcon
                                          fill={
                                            areObjectsEqual(campaignData?.events[index], activeEvent)
                                              ? '#0284C7'
                                              : '#4B5563'
                                          }
                                        />
                                      </CircleIcon>
                                    </div>
                                    <div className="ml-4 text-sm">
                                      <div className="text-gray7">
                                        <span className="font-semibold"> Event {index + 1}:</span>
                                        {e?.preview?.preview?.subject}
                                      </div>
                                    </div>
                                  </div>
                                  <KeyboardArrowRight className={`text-gray7`} />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ) : loading === true ? (
                  <div className={'flex flex-col mt-2 gap-10'}>
                    {[1, 2, 3].map((item, index) => (
                      <div key={index} className="animate-pulse bg-gray1 rounded-lg h-[66px] w-[490px]"></div>
                    ))}
                  </div>
                ) : (
                  <div>
                    <div>
                      {person?.events_preview?.map((e, index) => {
                        const execute_on =
                          e?.execute_on === 'Same day as added in system' ? 0 : e?.execute_on.split(' ')[1];
                        const correspondingEvent = person.events[index];
                        return (
                          <div className="mb-3 last:mb-0">
                            <div className="px-2 py-1 bg-gray1 text-sm font-semibold inline-block rounded text-gray5">
                              Wait {execute_on} {execute_on == 0 || execute_on == 1 ? 'day' : 'days'}, then send this
                              event at {getTimeWithAMPM(correspondingEvent?.event_updated_at)}
                            </div>
                            <div className="my-2 pl-2">
                              <Divider />
                            </div>
                            <div
                              onClick={() => {
                                setSelectedEventIndex(index + 1);
                                setActiveEvent({ ...e });
                              }}
                              className={`cursor-pointer rounded-lg border ${
                                areObjectsEqual(e, activeEvent) && 'border-[#BAE6FD] bg-lightBlue1'
                              } p-3 flex  flex-col gap-[10px] `}>
                              <div className={'flex justify-between items-center group'}>
                                <div className="flex items-center  justify-center">
                                  <div className="w-">
                                    {correspondingEvent?.event_status === 'canceled' ? (
                                      <svg
                                        width="38"
                                        height="39"
                                        viewBox="0 0 38 39"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <rect x="2" y="2.5" width="34" height="34" rx="17" fill="#EF4444" />
                                        <rect
                                          x="2"
                                          y="2.5"
                                          width="34"
                                          height="34"
                                          rx="17"
                                          stroke="#FEF2F2"
                                          strokeWidth="4"
                                        />
                                        <g clipPath="url(#clip0_2699_54885)">
                                          <path
                                            d="M19.0007 19.6665L24.334 16.3332V14.9998L19.0007 18.3332L13.6673 14.9998V16.3332L19.0007 19.6665ZM23.6673 26.3332C22.7451 26.3332 21.959 26.0082 21.309 25.3582C20.659 24.7082 20.334 23.9221 20.334 22.9998C20.334 22.0776 20.659 21.2915 21.309 20.6415C21.959 19.9915 22.7451 19.6665 23.6673 19.6665C24.5895 19.6665 25.3757 19.9915 26.0257 20.6415C26.6757 21.2915 27.0007 22.0776 27.0007 22.9998C27.0007 23.9221 26.6757 24.7082 26.0257 25.3582C25.3757 26.0082 24.5895 26.3332 23.6673 26.3332ZM21.6673 23.3332H25.6673V22.6665H21.6673V23.3332ZM13.6673 24.3332C13.3007 24.3332 12.9868 24.2026 12.7257 23.9415C12.4645 23.6804 12.334 23.3665 12.334 22.9998V14.9998C12.334 14.6332 12.4645 14.3193 12.7257 14.0582C12.9868 13.7971 13.3007 13.6665 13.6673 13.6665H24.334C24.7007 13.6665 25.0145 13.7971 25.2757 14.0582C25.5368 14.3193 25.6673 14.6332 25.6673 14.9998V18.7998C25.3562 18.6443 25.034 18.5276 24.7007 18.4498C24.3673 18.3721 24.0229 18.3332 23.6673 18.3332C22.3673 18.3332 21.2645 18.7859 20.359 19.6915C19.4534 20.5971 19.0007 21.6998 19.0007 22.9998C19.0007 23.2221 19.0173 23.4443 19.0507 23.6665C19.084 23.8887 19.134 24.1109 19.2007 24.3332H13.6673Z"
                                            fill="white"
                                          />
                                        </g>
                                        <defs>
                                          <clipPath id="clip0_2699_54885">
                                            <rect width="16" height="16" fill="white" transform="translate(11 11)" />
                                          </clipPath>
                                        </defs>
                                      </svg>
                                    ) : correspondingEvent?.event_status === 'Sent' ? (
                                      <svg
                                        width="38"
                                        height="39"
                                        viewBox="0 0 38 39"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <rect x="2" y="2.5" width="34" height="34" rx="17" fill="#10B981" />
                                        <rect
                                          x="2"
                                          y="2.5"
                                          width="34"
                                          height="34"
                                          rx="17"
                                          stroke="#ECFDF5"
                                          strokeWidth="4"
                                        />
                                        <path
                                          d="M21.634 25.6665L18.8007 22.8332L19.734 21.8998L21.634 23.7998L25.4007 20.0332L26.334 20.9665L21.634 25.6665ZM13.6673 24.3332C13.3007 24.3332 12.9868 24.2026 12.7257 23.9415C12.4645 23.6804 12.334 23.3665 12.334 22.9998V14.9998C12.334 14.6332 12.4645 14.3193 12.7257 14.0582C12.9868 13.7971 13.3007 13.6665 13.6673 13.6665H24.334C24.7007 13.6665 25.0145 13.7971 25.2757 14.0582C25.5368 14.3193 25.6673 14.6332 25.6673 14.9998V17.8998L21.6507 21.9165L19.734 19.9998L16.9173 22.8165L18.434 24.3332H13.6673ZM19.0007 19.6665L24.334 16.3332V14.9998L19.0007 18.3332L13.6673 14.9998V16.3332L19.0007 19.6665Z"
                                          fill="white"
                                        />
                                      </svg>
                                    ) : (
                                      <svg
                                        width="38"
                                        height="39"
                                        viewBox="0 0 38 39"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <rect x="2" y="2.5" width="34" height="34" rx="17" fill="#F9FAFB" />
                                        <rect
                                          x="2"
                                          y="2.5"
                                          width="34"
                                          height="34"
                                          rx="17"
                                          stroke="#F3F4F6"
                                          strokeWidth="4"
                                        />
                                        <path
                                          d="M13.6673 24.8332C13.3007 24.8332 12.9868 24.7026 12.7257 24.4415C12.4645 24.1804 12.334 23.8665 12.334 23.4998V15.4998C12.334 15.1332 12.4645 14.8193 12.7257 14.5582C12.9868 14.2971 13.3007 14.1665 13.6673 14.1665H24.334C24.7007 14.1665 25.0145 14.2971 25.2757 14.5582C25.5368 14.8193 25.6673 15.1332 25.6673 15.4998V23.4998C25.6673 23.8665 25.5368 24.1804 25.2757 24.4415C25.0145 24.7026 24.7007 24.8332 24.334 24.8332H13.6673ZM19.0007 20.1665L24.334 16.8332V15.4998L19.0007 18.8332L13.6673 15.4998V16.8332L19.0007 20.1665Z"
                                          fill="#9CA3AF"
                                        />
                                      </svg>
                                    )}
                                  </div>
                                  <div className="ml-4 text-sm flex flex-col gap-[6px]">
                                    <div className="text-gray7">
                                      <span className="font-semibold"> Event {index + 1}: </span>
                                      {e?.preview?.preview?.subject}
                                    </div>
                                    <div className={'flex gap-2'}>
                                      <StatusChip
                                        variant={
                                          correspondingEvent?.event_status?.toLowerCase() === 'scheduled'
                                            ? VARIANT_ENUM.WARNING
                                            : correspondingEvent?.event_status?.toLowerCase() === 'sent'
                                              ? VARIANT_ENUM.SUCCESS
                                              : VARIANT_ENUM.ERROR
                                        }
                                        text={
                                          correspondingEvent?.event_status?.toLowerCase() === 'scheduled'
                                            ? 'To be sent'
                                            : correspondingEvent?.event_status?.toLowerCase() === 'sent'
                                              ? 'Sent'
                                              : 'Cancelled'
                                        }></StatusChip>
                                      <div className="text-gray-500 font-inter font-medium text-sm leading-5">
                                        on {getFormattedDateFromTimestamp(correspondingEvent?.event_updated_at)}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <KeyboardArrowRight className={`text-gray7`} />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </SimpleBar>
          </div>
          <div className="w-1/2  relative border-l border-gray2">
            <SimpleBar
              style={{
                maxHeight:
                  person?.contact_campaign_status !== 'never_assigned' ? 'calc(100vh - 190px)' : 'calc(100vh - 235px)',
                height: '100vh',
              }}>
              <div className="mb-6 pt-[26px]">
                <div className={'sticky top-0'}>
                  <div className={'px-6 pb-3 border-b border-gray2 '}>
                    <h5 className={'text-sm leading-5 font-medium text-gray7 '}>Event {selectedEventIndex}</h5>
                    <div className={'flex items-center gap-1'}>
                      <EmailIcon className={'h-3.5 w-3.5 text-lightBlue3'} />
                      <span className={'font-inter text-xs font-medium leading-5 text-gray4'}>
                        {activeEvent?.event_type} Event
                      </span>
                    </div>
                  </div>
                  <div className={'p-6 flex flex-col gap-[31px]'}>
                    {activeEvent?.event_type === 'Email' && (
                      <div>
                        <span className={'text-xs leading-4 font-medium tracking-wider uppercase text-gray4'}>
                          SENT FROM
                        </span>
                        <p className={'text-sm leading-5 font-normal text-gray5'}>{user?.email ? user?.email : user}</p>
                      </div>
                    )}
                    <div>
                      <span className={'text-xs leading-4 font-medium tracking-wider uppercase text-gray4'}>
                        EMAIL SUBJECT
                      </span>
                      <p className={'text-xl leading-7 font-medium text-gray8'}>
                        {activeEvent?.preview?.preview?.subject}
                      </p>
                    </div>
                    <div>
                      <span className={'text-xs leading-4 font-medium tracking-wider uppercase text-gray4 mb-3'}>
                        MESSAGE
                      </span>
                      <div
                        className="richtext-styling text-sm leading-5 font-normal text-gray5"
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(activeEvent?.preview?.preview?.body_html)
                            ? DOMPurify.sanitize(activeEvent?.preview?.preview?.body_html)
                            : DOMPurify.sanitize(activeEvent?.preview?.preview?.message),
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </SimpleBar>
          </div>
        </div>
      </div>
    </SlideOver>
  );
};

export default PreviewEventsPerClient;
