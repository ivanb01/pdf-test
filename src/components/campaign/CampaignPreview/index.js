import { Fragment, useEffect, useState } from 'react';
import EmailIcon from '@mui/icons-material/Email';
import ChatIcon from '@mui/icons-material/Chat';
import { getAllEvents } from '@api/campaign';
import { useSelector } from 'react-redux';
import DOMPurify from 'dompurify';
import SlideOver from '@components/shared/slideOver';
import CircleIcon from '@components/CircleIcon';
import AllClientsIcon from '../../../icons/AllClientsIcon';
import SpecificClientsIcon from '../../../icons/SpecificClientsIcon';
import SimpleBar from 'simplebar-react';
import MailIcon from '../../../icons/MailIcon';
import Divider from '../../../icons/Divider';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

const CampaignPreview = ({ open, setOpen, campaignId, data, campaignFor, className }) => {
  const [campaignData, setCampaignData] = useState();
  useEffect(() => {
    if (!open) {
      return;
    }
    if (data) {
      setCampaignData(data);
    } else {
      getAllEvents(campaignId).then((res) => {
        setCampaignData(res.data);
      });
    }
  }, [campaignId, data, open]);

  const [activeEvent, setActiveEvent] = useState();
  useEffect(() => {
    if (campaignData) {
      setActiveEvent(campaignData?.events[0]);
    }
  }, [campaignData]);
  const user = useSelector((state) => state.global.user);

  function areObjectsEqual(obj1, obj2) {
    if (!obj2) {
      return;
    }
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2 && obj2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (let key of keys1) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }

    return true;
  }

  function getTimeWithAMPM(timestamp) {
    const dateObject = new Date(timestamp);
    let hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
  }

  return (
    <SlideOver
      width="w-[1240px]"
      open={open}
      setOpen={(state) => {
        setOpen(state);
      }}
      className={className}
      hideScroll
      title={campaignData?.campaign_name}
    >
      <div className=" mt-[-8px] w-[480px] px-[18px] py-[16px] pb-[40px]">
        <div className={'text-sm leading-5 font-medium mb-[32px]'}>Clients who will be eligible of this campaign</div>
        <div>
          <p className={'text-gray7 font-semibold'}> {campaignFor === 'All Clients'} </p>
          <>
            <div className={`relative flex`}>
              {
                <CircleIcon>
                  {campaignFor === 'All Clients' ? (
                    <AllClientsIcon fill={'#4B5563'} />
                  ) : (
                    <SpecificClientsIcon fill={'#4B5563'} />
                  )}
                </CircleIcon>
              }
              <div className="ml-4 text-sm">
                <div className="text-gray7 font-semibold flex items-center gap-[10px]">
                  {campaignFor === 'All Clients' ? 'All Clients' : 'Specific Clients: ' + campaignFor}
                </div>
                <div className="text-gray5 mt-1">
                  {campaignFor === 'All Clients'
                    ? 'Each client, regardless the status they’re in, will be part of this campaign.'
                    : 'Only clients by this status, will be part of this campaign.'}
                </div>
              </div>
            </div>
          </>
        </div>
      </div>
      <hr className=" -mx-6" />
      <div className="flex -mx-6 h-full">
        <div className="w-1/2">
          <SimpleBar style={{ maxHeight: 'calc(100vh - 285px)', height: '100vh' }}>
            <div className={'flex flex-col px-[22px] py-[26px] '}>
              <div className="mb-4 text-gray8 text-sm font-medium">Events</div>
              <div>
                {campaignData === undefined && activeEvent === undefined ? (
                  <div className={'flex flex-col mt-2 gap-10'}>
                    {[1, 2, 3].map((item, index) => (
                      <div key={index} className="animate-pulse bg-gray1 rounded-lg h-[66px] w-[550px]"></div>
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
                            onClick={() => setActiveEvent({ ...e })}
                            className={`cursor-pointer rounded-lg border ${
                              areObjectsEqual(campaignData?.events[index], activeEvent) &&
                              'border-[#BAE6FD] bg-lightBlue1'
                            } p-3 flex  flex-col gap-[10px] `}
                          >
                            <div className={'flex justify-between items-center group'}>
                              <div className="flex items-center">
                                <div className="w-">
                                  <CircleIcon small active={areObjectsEqual(campaignData?.events[index], activeEvent)}>
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
                                  <div className="text-gray7 font-semibold"> {e?.preview?.preview?.subject}</div>
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
            </div>
          </SimpleBar>
        </div>
        <div className="w-1/2 bg-gray10 relative border-l border-gray2">
          <SimpleBar style={{ maxHeight: 'calc(100vh - 285px)', height: '100vh' }}>
            <div className="mb-6 pt-[26px]">
              <div className={'sticky top-0'}>
                <div className={'px-6 pb-3 border-b border-gray2 '}>
                  <h5 className={'text-sm leading-5 font-medium text-gray7 '}>Event Details</h5>
                  <div className={'flex items-center gap-1'}>
                    {activeEvent?.event_type === 'Email' ? (
                      <EmailIcon className={'h-3.5 w-3.5 text-lightBlue3'} />
                    ) : (
                      <ChatIcon className={'h-3.5 w-3.5 text-lightBlue3 '} />
                    )}
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
    </SlideOver>
  );
};
export default CampaignPreview;
