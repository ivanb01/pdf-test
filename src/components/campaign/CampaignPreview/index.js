import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import Close from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import ChatIcon from '@mui/icons-material/Chat';
import InfoIcon from '@mui/icons-material/Info';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { getAllEvents } from '@api/campaign';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const CampaignPreview = ({ open, setOpen, campaignId, className, data }) => {
  const [campaignData, setCampaignData] = useState();
  useEffect(() => {
    if (data) {
      setCampaignData(data);
    } else {
      getAllEvents(campaignId).then((res) => {
        setCampaignData(res.data);
      });
    }
  }, [campaignId, data]);

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
  const router = useRouter();

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setOpen}>
        <div className="fixed inset-0" />
        <div className={`fixed inset-0 overflow-hidden bg-transparentBlack ${className}`}>
          <div className="absolute inset-0 overflow-hidden">
            <div className={`pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 w-[900px]`}>
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full">
                <Dialog.Panel className={`pointer-events-auto w-screen ${className}`}>
                  <div
                    className={`flex h-full flex-col bg-white shadow-xl ${
                      !router.pathname.includes('/details') && 'border-0 rounded-ss-lg'
                    }  `}>
                    <div className="flex flex-shrink-0 justify-between items-center p-6 border-b border-gray2">
                      <div className={'flex flex-col gap-1'}>
                        <Dialog.Title className="text-base font-medium text-gray-900">
                          {campaignData?.campaign_name}
                        </Dialog.Title>
                        {campaignData === undefined ? (
                          <div className="animate-pulse  bg-gray-300 w-[120px] h-4"></div>
                        ) : (
                          <div className={'text-xs leading-5 font-medium text-gray6 flex'}>
                            <span className={'mr-1'}>{`${campaignData?.events?.length}  Events: `}</span>
                            <span className={'mr-2'}>
                              {campaignData.events?.filter((event) => event.event_type === 'Email').length}{' '}
                              <EmailIcon className={'h-3 w-3 text-[#909CBE]'} />
                            </span>
                            <span>
                              {campaignData.events?.filter((event) => event.event_type === 'SMS').length}{' '}
                              <ChatIcon className={'h-3 w-3  text-[#909CBE]'} />
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                          onClick={() => {
                            setOpen(false);
                          }}>
                          <span className="sr-only">Close panel</span>
                          <Close className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                    <div className="flex min-h-0 flex-1 flex-col">
                      <div className={'overflow-y-scroll'}>
                        <div className="flex" style={{ minHeight: 'calc(100vh - 172px)' }}>
                          <div className={'w-[400px] border-r border-gray2 p-6 pb-0'}>
                            <div className={'flex items-start justify-start gap-1 mb-6'}>
                              <InfoIcon className={'h-3 w-3 text-[#909CBE] mt-0.5'} />
                              <span className={'text-xs leading-4 font-normal text-gray4 gap-4'}>
                                Here are the events for this campaign along with their scheduled send dates and time.
                              </span>
                            </div>
                            {campaignData === undefined && activeEvent === undefined ? (
                              <div className={'flex flex-col mt-2 gap-8'}>
                                {[1, 2, 3].map(() => (
                                  <div className="animate-pulse  bg-gray-300 h-[66px] w-[350px]"></div>
                                ))}
                              </div>
                            ) : (
                              <div>
                                {campaignData?.events?.map((e, index) => {
                                  const execute_on =
                                    e?.execute_on === 'Same day as added in system' ? 0 : e?.execute_on.split(' ')[1];
                                  return (
                                    <div className={'flex flex-col mt-2'}>
                                      <div
                                        style={{ width: 'max-content' }}
                                        className={'font-semibold text-gray4 text-xs  leading-5 bg-gray1 px-1.5'}>
                                        Wait {execute_on} {execute_on == 0 || execute_on == 1 ? 'day' : 'days'}
                                      </div>
                                      <div
                                        className={'border-r border-dashed border-lightBlue3 h-3 mx-4'}
                                        style={{ width: 2 }}></div>
                                      <div
                                        role={'button'}
                                        onClick={() => setActiveEvent({ ...e })}
                                        className={`p-3 flex border rounded-md ${
                                          areObjectsEqual(campaignData?.events[index], activeEvent)
                                            ? 'bg-lightBlue1 border border-[#87ccf0]'
                                            : 'bg-white border  border-[#BAE6FD]'
                                        } justify-between items-start hover:bg-lightBlue1`}>
                                        <div className={'flex gap-2 '}>
                                          {e?.event_type === 'Email' ? (
                                            <EmailIcon className={'h-4 w-4 text-lightBlue3 mt-0.5'} />
                                          ) : (
                                            <ChatIcon className={'h-4 w-4 text-lightBlue3 mt-0.5'} />
                                          )}
                                          <div>
                                            <h6 className={'text-sm leading-5 font-medium text-gray7 '}>
                                              {e?.preview?.preview?.subject}
                                            </h6>
                                            <p className={'text-[11px] leading-5 font-medium text-gray4 '}>
                                              send at {getTimeWithAMPM(e?.execute_date)}
                                            </p>
                                          </div>
                                        </div>
                                        {areObjectsEqual(campaignData?.events[index], activeEvent) && (
                                          <ArrowForwardIosIcon className={'h-3.5 w-3.5 text-lightBlue3 mt-0.5'} />
                                        )}
                                      </div>
                                      <div
                                        className={`${
                                          campaignData.events.length - 1 !== index
                                            ? 'border-r border-dashed border-lightBlue3 h-3 mx-4'
                                            : 'pb-6'
                                        }`}
                                        style={{ width: 2 }}></div>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                          <div className={'flex-1'}>
                            <div className={'sticky top-0'}>
                              <div className={'px-6 py-3 border-b border-gray2 rounded-br-lg'}>
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
                                    <span
                                      className={'text-xs leading-4 font-medium tracking-wider uppercase text-gray4'}>
                                      SENT FROM
                                    </span>
                                    <p className={'text-sm leading-5 font-normal text-gray5'}>
                                      {user?.email ? user?.email : user}
                                    </p>
                                  </div>
                                )}
                                <div>
                                  <span className={'text-xs leading-4 font-medium tracking-wider uppercase text-gray4'}>
                                    SUBJECT
                                  </span>
                                  <p className={'text-xl leading-7 font-medium text-gray8'}>
                                    {activeEvent?.preview?.preview?.subject}
                                  </p>
                                </div>
                                <div>
                                  <span
                                    className={
                                      'text-xs leading-4 font-medium tracking-wider uppercase text-gray4 mb-3'
                                    }>
                                    MESSAGE
                                  </span>
                                  <p className={'text-sm leading-5 font-normal text-gray5'}>
                                    {activeEvent?.preview?.preview?.body_text ?? activeEvent?.preview?.preview?.message}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
export default CampaignPreview;
