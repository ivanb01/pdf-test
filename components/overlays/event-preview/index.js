import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Close from '@mui/icons-material/Close';
import { CalendarIcon, ClockIcon } from '@heroicons/react/outline';
import Text from 'components/shared/text';
import { isValidDate, formatDateMDY, formatDateLThour } from 'global/functions';
import Loader from 'components/shared/loader';
import Events from 'components/shared/events';
import { useEffect } from 'react';
import { getContactCampaignEventPreview, getAllEvents } from 'api/campaign';

const EventPreview = ({
  topClass,
  currentEvent,
  setCurrentEvent,
  campaignId,
  showEventPreview,
  setShowEventPreview,
  overlay,
}) => {
  const [campaignEvents, setCampaignEvents] = useState(null);
  const [eventInfo, setEventInfo] = useState(null);
  const [events, setEvents] = useState(null);
  const [loadingEventPreview, setLoadingEventPreview] = useState(false);
  const [eventToPreview, setEventToPreview] = useState(null);
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  useEffect(() => {
    setLoadingEventPreview(true);
    getAllEvents(campaignId).then((res) => {
      setCampaignEvents(res.data);
      setLoadingEventPreview(false);
    });
  }, []);

  const handleEventPreview = async () => {
    setEvents(campaignEvents?.events);
    setEventInfo({
      // event_updated_at: event?.event_updated_at,
      event_name: `Event ${currentEvent}`,
    });
    setEventToPreview(campaignEvents?.events[currentEvent - 1].preview);
    // getContactCampaignEventPreview(event.event_id).then((data) => {
    //   setEventToPreview(data.data);
    //   setLoadingEventPreview(false);
    // });
  };

  // useEffect(() => {
  //   setCampaignEvents({
  //     agent_id: 'blendar@opgny.com',
  //     campaign_id: 103,
  //     campaign_name: 'In Communication',
  //     events: [
  //       {
  //         event_action: 'Send',
  //         event_template_id: '7',
  //         event_type: 'Email',
  //         execute_on: 'Same day as added in system',
  //         preview: {
  //           preview: {
  //             body_html:
  //               '<p>Hi [first_name] [last_name], </p>\n<br>\n<p>We are excited to show you a few properties.  As an Idea, we reccomend to be open to different neighborhoods. There are so many different neighborhoods to choose from, and exploring different areas can help find the one that best suits your lifestyle and budget.</p>',
  //             body_text:
  //               'Hi [first_name] [last_name], \n\nWe are excited to show you a few properties.  As an Idea, we reccomend to be open to different neighborhoods. There are so many different neighborhoods to choose from, and exploring different areas can help find the one that best suits your lifestyle and budget.',
  //             charset: 'UTF-8',
  //             recepients: ['[email]'],
  //             sender: 'onelinecrm@opgny.com',
  //             subject: 'Reminder: Schedule Property Viewing',
  //           },
  //           type: 'Email',
  //         },
  //       },
  //       {
  //         event_action: 'Send',
  //         event_template_id: '5',
  //         event_type: 'SMS',
  //         execute_on: 'After 3 days',
  //         preview: {
  //           preview: {
  //             destination_number: '[phone_number]',
  //             message:
  //               'Hey [first_name] [last_name], \n\njust wanted to see your availability for the weekend. Many properties have open house we can visit, would you like to come take a look?',
  //             subject: 'Open House Invitation: See Property for Yourself',
  //           },
  //           type: 'SMS',
  //         },
  //       },
  //       {
  //         event_action: 'Send',
  //         event_template_id: '8',
  //         event_type: 'Email',
  //         execute_on: 'After 8 days',
  //         preview: {
  //           preview: {
  //             body_html:
  //               '<p>Dear [first_name] [last_name], </p>\n<br>\n<p>I wanted to follow up and see if you had any questions or like any of the properites you have seen thus far? Any that are at the top of your list?</p>',
  //             body_text:
  //               'Dear [first_name] [last_name], \n\nI wanted to follow up and see if you had any questions or like any of the properites you have seen thus far? Any that are at the top of your list?',
  //             charset: 'UTF-8',
  //             recepients: ['[email]'],
  //             sender: 'onelinecrm@opgny.com',
  //             subject: 'Great Property Available - Be First in Line!',
  //           },
  //           type: 'Email',
  //         },
  //       },
  //       {
  //         event_action: 'Send',
  //         event_template_id: '6',
  //         event_type: 'SMS',
  //         execute_on: 'After 15 days',
  //         preview: {
  //           preview: {
  //             destination_number: '[phone_number]',
  //             message:
  //               'Hi [first_name] [last_name], \n\njust wanted to touch base and see if you had a chance to think about anything we sent?',
  //             subject: 'Be First in Line - Schedule Your Viewing Now!',
  //           },
  //           type: 'SMS',
  //         },
  //       },
  //       {
  //         event_action: 'Send',
  //         event_template_id: '9',
  //         event_type: 'Email',
  //         execute_on: 'After 30 days',
  //         preview: {
  //           preview: {
  //             body_html:
  //               '<p>Hi [first_name] [last_name], </p>\n<br>\n<p>Is there anything else we can do to help you find the right place for you?</p>',
  //             body_text:
  //               'Hi [first_name] [last_name], \n\nIs there anything else we can do to help you find the right place for you?',
  //             charset: 'UTF-8',
  //             recepients: ['[email]'],
  //             sender: 'onelinecrm@opgny.com',
  //             subject: 'Help Just a Phone Call or Email Away!',
  //           },
  //           type: 'Email',
  //         },
  //       },
  //     ],
  //     tenant_id: {
  //       hex: '9b11bc70b91411eda0b1722084980ce8',
  //     },
  //   });
  // }, []);

  useEffect(() => {
    if (campaignEvents) {
      handleEventPreview();
    }
  }, [campaignEvents]);

  useEffect(() => {
    if (currentEvent) handleEventPreview();
  }, [currentEvent]);

  return (
    <Transition.Root show={showEventPreview} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setShowEventPreview}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div
            className={`absolute inset-0 overflow-hidden ${
              overlay && 'bg-[#42424280]'
            }`}
          >
            <div
              className={`pointer-events-none fixed ${
                topClass ? topClass : 'top-[222px]'
              } ${
                overlay && ' top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
              } inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16 ${
                overlay && ' h-[550px]'
              }`}
            >
              <Transition.Child
                as={Fragment}
                enter={`${
                  !overlay &&
                  'transform transition ease-in-out duration-500 sm:duration-700'
                } `}
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave={`${
                  !overlay &&
                  'transform transition ease-in-out duration-500 sm:duration-700'
                } `}
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-4xl">
                  <div
                    className={`relative flex h-full flex-col overflow-y-scroll bg-white shadow-xl border border-gray-300`}
                  >
                    {loadingEventPreview ? (
                      <div className="relative w-full h-full">
                        <Loader />
                      </div>
                    ) : (
                      <div className="flex h-full">
                        <div className="bg-white border-gray2 border-r p-6 min-w-fit">
                          <nav aria-label="Progress">
                            <ol role="list" className="overflow-hidden">
                              {campaignEvents?.events.map((event, eventIdx) => (
                                <li
                                  key={event.name}
                                  className={classNames(
                                    eventIdx !==
                                      campaignEvents.events.length - 1
                                      ? 'pb-10'
                                      : '',
                                    'relative'
                                  )}
                                >
                                  <>
                                    {eventIdx !==
                                    campaignEvents.events.length - 1 ? (
                                      <div
                                        className="absolute left-3.5 top-3.5 -ml-px mt-0.5 h-full w-0.5 bg-gray3"
                                        aria-hidden="true"
                                      />
                                    ) : null}
                                    <a
                                      href={event.href}
                                      className="group relative flex items-center"
                                      // onClick={() =>
                                      //   handleEventPreview(eventIdx)
                                      // }
                                      aria-current="step"
                                    >
                                      <span
                                        className="flex h-9 items-center"
                                        aria-hidden="true"
                                      >
                                        <span
                                          className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-full border-2 ${
                                            `Event ${eventIdx + 1}` ==
                                            eventInfo?.event_name
                                              ? 'border-lightBlue3'
                                              : 'border-gray3'
                                          } bg-white`}
                                        >
                                          <span
                                            className={`h-3 w-3 rounded-full ${
                                              `Event ${eventIdx + 1}` ==
                                              eventInfo?.event_name
                                                ? 'bg-lightBlue3'
                                                : 'bg-gray3'
                                            }`}
                                          />
                                        </span>
                                      </span>
                                      <span
                                        onClick={() =>
                                          setCurrentEvent(eventIdx + 1)
                                        }
                                        className={`${
                                          `Event ${eventIdx + 1}` ==
                                            eventInfo?.event_name &&
                                          'bg-lightBlue1 '
                                        } ml-3 flex min-w-0 flex-col p-[10px] hover:bg-lightBlue1 w-full cursor-pointer`}
                                      >
                                        <span
                                          className={`${
                                            `Event ${eventIdx + 1}` ==
                                            eventInfo?.event_name
                                              ? 'font-bold'
                                              : 'font-medium'
                                          } text-xs text-gray7 uppercase`}
                                        >
                                          Event {eventIdx + 1}:{' '}
                                          {event.event_type}
                                        </span>
                                      </span>
                                    </a>
                                  </>
                                </li>
                              ))}
                            </ol>
                          </nav>
                        </div>

                        <div className="w-full">
                          <div className="p-7 bg-gray10 border-b border-gray2 sm:px-6">
                            <div className="flex items-start justify-between">
                              <Dialog.Title className="w-full text-base font-semibold leading-6 text-gray-900">
                                <div>
                                  <div>{eventInfo?.event_name}</div>
                                  {/* <div className="flex flex-row mt-5">
                                    {isValidDate(
                                      eventInfo?.event_updated_at
                                    ) ? (
                                      <>
                                        <CalendarIcon
                                          className="text-gray4"
                                          height={20}
                                        />
                                        <Text p className="text-gray4 ml-1">
                                          {formatDateMDY(
                                            eventInfo?.event_updated_at
                                          )}
                                        </Text>
                                        <ClockIcon
                                          className="text-gray4 ml-4"
                                          height={20}
                                        />
                                        <Text p className="text-gray4 ml-1">
                                          {formatDateLThour(
                                            eventInfo?.event_updated_at
                                          )}
                                        </Text>
                                      </>
                                    ) : (
                                      <>
                                        <CalendarIcon
                                          className="text-gray4"
                                          height={20}
                                        />
                                        <Text p className="text-gray4 ml-1">
                                          {eventInfo?.event_updated_at}
                                        </Text>
                                      </>
                                    )}
                                  </div> */}
                                </div>
                              </Dialog.Title>
                              <div className="ml-3 flex h-7 items-center">
                                <button
                                  type="button"
                                  className="rounded-md text-gray-400 hover:text-gray-500"
                                  onClick={() => setShowEventPreview(false)}
                                >
                                  <span className="sr-only">Close panel</span>
                                  <Close
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                  />
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="relative flex-1 p-6">
                            <div className="text-2xl text-gray8 mb-7 font-medium">
                              {eventToPreview?.preview?.subject}
                            </div>
                            <div
                              className="text-sm text-gray5"
                              dangerouslySetInnerHTML={{
                                __html: eventToPreview?.preview?.body_html
                                  ? eventToPreview?.preview.body_html
                                  : eventToPreview?.preview.message,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )}
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

export default EventPreview;
