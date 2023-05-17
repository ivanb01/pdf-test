import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Close from '@mui/icons-material/Close';
import { CalendarIcon, ClockIcon } from '@heroicons/react/outline';
import Text from 'components/shared/text';
import { isValidDate, formatDateMDY, formatDateLThour } from 'global/functions';
import Loader from 'components/shared/loader';
import Events from 'components/shared/events';

const EventPreview = ({
  events,
  showEventPreview,
  setShowEventPreview,
  eventInfo,
  event,
  loading,
  handleEventPreview,
  topClass,
}) => {
  const [campaignEvents, setCampaignEvents] = useState(null);
  const [currentEvent, setCurrentEvent] = useState(0);

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  console.log(events);

  return (
    <Transition.Root show={showEventPreview} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setShowEventPreview}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div
              className={`pointer-events-none fixed ${
                topClass ? topClass : 'top-[222px]'
              } inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16`}
            >
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">
                  <div className="relative flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex h-full">
                      <div className="bg-white border-gray2 border-r p-6 min-w-fit">
                        <nav aria-label="Progress">
                          <ol role="list" className="overflow-hidden">
                            {events?.map((event, eventIdx) => (
                              <li
                                key={event.name}
                                className={classNames(
                                  eventIdx !== events.length - 1 ? 'pb-10' : '',
                                  'relative'
                                )}
                              >
                                <>
                                  {eventIdx !== events.length - 1 ? (
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
                                      <span className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full border-2 border-gray3 bg-white">
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
                                        handleEventPreview(
                                          events,
                                          event,
                                          `Event ${eventIdx + 1}`
                                        )
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
                                        Event {eventIdx + 1}: {event.event_name}
                                      </span>
                                    </span>
                                  </a>
                                </>
                              </li>
                            ))}
                          </ol>
                        </nav>
                      </div>
                      {loading ? (
                        <div className="relative w-full">
                          <Loader />
                        </div>
                      ) : (
                        <div>
                          <div className="p-7 bg-gray10 border-b border-gray2 sm:px-6">
                            <div className="flex items-start justify-between">
                              <Dialog.Title className="w-full text-base font-semibold leading-6 text-gray-900">
                                <div>
                                  <div>{eventInfo?.event_name}</div>
                                  <div className="flex flex-row mt-5">
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
                                  </div>
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
                              {event?.preview?.subject}
                            </div>
                            <div
                              className="text-sm text-gray5"
                              dangerouslySetInnerHTML={{
                                __html: event?.preview?.body_html
                                  ? event?.preview.body_html
                                  : event?.preview.message,
                              }}
                            ></div>
                          </div>
                        </div>
                      )}
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

export default EventPreview;
