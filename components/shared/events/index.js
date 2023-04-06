/* This example requires Tailwind CSS v2.0+ */
import { CheckIcon } from '@heroicons/react/solid';
import { classNames } from 'global/functions';
import ArrowForward from '@mui/icons-material/ArrowForward';
import EventStatus from 'components/event-status/';
import { eventStatuses, eventStatusesIcons } from 'global/variables';
import { formatDateLT, isValidDate } from 'global/functions';

// const eventStatusesIcons = {
//   'scheduled': <CheckIcon
//                 className="w-5 h-5 text-white"
//                 aria-hidden="true"
//                 />,
//   'sent': <span className="h-2.5 w-2.5 bg-lightBlue3 rounded-full" />,
//   'canceled': <span className="h-2.5 w-2.5 bg-red3 rounded-full" />,
// }
export default function Events({
  className,
  events = [],
  currentEvent,
  setCurrentEvent,
  eventPreview,
}) {
  return (
    <div className={`${className}`}>
      <nav aria-label="Progress">
        <ol role="list" className="overflow-hidden">
          {events.map((event, eventIdx) => (
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
                    className={`-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full ${
                      event.status === 'sent' || event.status === 'Sent' ? 'bg-lightBlue3' : 'bg-gray-300'
                    }`}
                    aria-hidden="true"
                  />
                ) : null}
                <div
                  href={event.href}
                  onClick={() => {
                    setCurrentEvent(event.id);
                    eventPreview(event);
                  }}
                  className="relative flex items-center group"
                >
                  <div className="h-9 flex items-center">
                    <span
                      className={`relative z-0 w-8 h-8 flex items-center justify-center lightBlue3 rounded-full ${
                        event.status == 'sent' || event.status == 'Sent'
                          ? 'bg-lightBlue3 '
                          : 'bg-white border-2 border-lightBlue3'
                      }`}
                    >
                      {eventStatusesIcons[event.status]}
                    </span>
                  </div>
                  <div
                    className={`ml-4 flex items-center justify-between w-full py-3 px-3 hover:bg-lightBlue1 cursor-pointer ${
                      currentEvent == event.id && 'bg-lightBlue1'
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className=" text-xs font-semibold tracking-wide uppercase">
                        {event.event_type}
                        {
                          event.preview ? (
                            event.preview.preview.subject ? `: ${event.preview.preview.subject}` : ''
                          ) : (
                            event.subject ? `: ${event.subject}` : ''
                          )
                        }
                      </span>
                      <div className="mt-2 flex items-center whitespace-nowrap text-center text-sm text-gray-500">
                        {event.status && <EventStatus status={event.status} /> }
                        <div className="ml-2 text-gray4">
                          {
                            isValidDate(event.execute_on) ? formatDateLT(event.execute_on) : event.execute_on
                          }
                        </div>
                      </div>
                    </div>
                    <ArrowForward
                      className={`w-5 text-lightBlue3 opacity-0 group-hover:opacity-100 ${
                        currentEvent == event.id && 'opacity-100'
                      }`}
                    ></ArrowForward>
                  </div>
                </div>
              </>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
