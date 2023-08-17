/* This example requires Tailwind CSS v2.0+ */
import { CheckIcon } from '@heroicons/react/solid';
import { classNames } from 'global/functions';
import ArrowForward from '@mui/icons-material/ArrowForward';
import EventStatus from 'components/event-status/';
import { formatDateLT, isValidDate } from 'global/functions';

const eventStatusesBgColors = {
  Sent: 'bg-green5',
  sent: 'bg-green5',
  scheduled: 'bg-lightBlue3',
  canceled: 'bg-red3',
};
const eventStatusesCirclesBorders = {
  Sent: 'border-green5',
  sent: 'border-green5',
  scheduled: 'border-lightBlue3',
  canceled: 'border-red3',
};
export default function Events({ className, events = [], currentEvent, setCurrentEvent, eventPreview }) {
  return (
    <div className={`${className}`}>
      <nav aria-label="Progress">
        <ol role="list" className="overflow-hidden">
          {events.map((event, eventIdx) => (
            <li key={event.name} className={classNames(eventIdx !== events.length - 1 ? 'pb-10' : '', 'relative')}>
              <>
                {eventIdx !== events.length - 1 ? (
                  <div
                    className={`-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full 
                    ${event?.status ? eventStatusesBgColors[event?.status] : 'bg-gray-300'}`}
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
                      className={`relative z-0 w-8 h-8 flex items-center justify-center lightBlue3 rounded-full bg-white border-2
                      ${event?.status ? eventStatusesCirclesBorders[event?.status] : 'border-gray-300'}`}
                    >
                      <span
                        className={`h-[18px] w-[18px] flex items-center justify-center text-xs font-medium text-white rounded-full 
                      ${event?.status ? eventStatusesBgColors[event?.status] : 'bg-gray-300'}`}
                      >
                        {eventIdx + 1}
                      </span>
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
                        {event.preview
                          ? event.preview.preview.subject
                            ? `: ${event.preview.preview.subject}`
                            : ''
                          : event.subject
                          ? `: ${event.subject}`
                          : ''}
                      </span>
                      <div className="mt-2 flex items-center whitespace-nowrap text-center text-sm text-gray-500">
                        {event.status && <EventStatus status={event.status} />}
                        <div className="ml-2 text-gray4">
                          {isValidDate(event.execute_on)
                            ? formatDateLT(event.execute_on)
                            : event.execute_on?.includes('After')
                            ? `${parseInt(event.execute_on.replace(/[^0-9\.]/g, ''))} days after added in Campaign`
                            : event.execute_on}
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
