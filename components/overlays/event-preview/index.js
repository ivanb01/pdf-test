import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Close from '@mui/icons-material/Close';
import { CalendarIcon, ClockIcon } from '@heroicons/react/outline';
import Text from 'components/shared/text';
import { isValidDate, formatDateMDY, formatDateLThour } from 'global/functions';
import Loader from 'components/shared/loader';

const EventPreview = ({
  showEventPreview,
  setShowEventPreview,
  eventInfo,
  event,
  loading,
}) => {
  return (
    <Transition.Root show={showEventPreview} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setShowEventPreview}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed top-[222px] inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
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
                    {loading ? (
                      <Loader />
                    ) : (
                      <>
                        <div className="p-7 bg-gray10 sm:px-6">
                          <div className="flex items-start justify-between">
                            <Dialog.Title className="w-full text-base font-semibold leading-6 text-gray-900">
                              <div>
                                <div>{eventInfo?.event_name}</div>
                                <div className="flex flex-row mt-5">
                                  {isValidDate(eventInfo?.event_updated_at) ? (
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
                                <Close className="h-6 w-6" aria-hidden="true" />
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
                      </>
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
