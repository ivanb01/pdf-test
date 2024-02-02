import Button from '@components/shared/button';
import SlideOver from '@components/shared/slideOver';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import specificClients from '/public/images/specific-clients.svg';
import call from '/public/images/call.svg';
import divider from '/public/images/divider.svg';
import Input from '@components/shared/input';
import Editor from '@components/Editor';
import { formatDateLL, formatDateLThour } from '@global/functions';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Dropdown from '@components/shared/dropdown';
import { clientStatuses, timeOptions, waitingDays } from '@global/variables';
import StatusSelect from '@components/status-select';

const CreateCampaignSidebar = ({ open, setOpen }) => {
  const [eligibleClients, setEligibleClients] = useState(0);
  const [typeOfEvent, setTypeOfEvent] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState({});

  const [events, setEvents] = useState([
    { id: 0, title: 'Very grateful for this business.', message: 'Wow this is coool', eventDate: new Date(), type: 0 },
    { id: 1, title: 'Thank you for working with us.', eventDate: new Date(), type: 1 },
  ]);

  const Card = ({ title, description, icon, className, active, onClick, narrow, expandable }) => {
    let padding = narrow ? 'py-[8px] px-[15px] min-w-[170px]' : 'px-[18px] py-4';
    return (
      <div
        onClick={onClick}
        className={`relative cursor-pointer rounded-lg border-2 ${
          active && 'border-lightBlue3 bg-lightBlue1'
        } ${padding} flex ${className} ${!description && 'items-center'}`}>
        <img src={icon} />
        <div className="ml-4 text-sm">
          <div className="text-gray7 font-semibold">{title}</div>
          {description && <div className="text-gray5 mt-1">{description}</div>}
        </div>
        {expandable && (
          <div
            className={`${
              active
                ? 'h-auto border-l-2 border-r-2 border-b-2 pointer-events-auto border-lightBlue3'
                : 'border-none pointer-events-none'
            } h-0 transition-all bg-white absolute left-0 right-0 rounded-b-lg top-[90%] z-50 -mx-[1.5px]`}>
            {active && (
              <StatusSelect
                className="pl-9"
                statuses={clientStatuses}
                // selectedStatus={selectedUncategorizedContactStatus}

                // setSelectedStatus={handleSelectUncategorizedStatus}
              />
            )}
          </div>
        )}
      </div>
    );
  };

  const Event = ({ title, className, type, active, onClick, eventDate }) => {
    let isSms = type == 0 ? true : false;
    return (
      <div className="mb-3 last:mb-0">
        <div className="px-2 py-1 bg-gray1 text-sm font-semibold inline-block rounded text-gray5">Waiting: 2 days</div>
        <img src={divider.src} className="my-2 pl-2" />
        <div
          onClick={onClick}
          className={`cursor-pointer rounded-lg border ${
            active && 'border-[#BAE6FD] bg-lightBlue1'
          } p-3 flex ${className} justify-between items-center`}>
          <div className="flex">
            <img src={call.src} />
            <div className="ml-4 text-sm">
              <div className="text-gray7 font-semibold">{title}</div>
              <div className="text-gray5 mt-1">
                send at {formatDateLThour(eventDate)} on {formatDateLL(eventDate)}
              </div>
            </div>
          </div>
          <KeyboardArrowRight className="text-gray7" />
        </div>
      </div>
    );
  };

  const resetCreateCampaign = () => {};

  return (
    <SlideOver
      width="w-[1080px]"
      open={open}
      setOpen={setOpen}
      title="Buyers, Settling in & Referrals"
      className="top-[70px]"
      rounded>
      <div className="-mt-3 mb-5">
        <div className="mb-4 text-gray8 text-sm font-medium">
          Choose the clients who will be eligible of this campaign
        </div>
        <div className="flex">
          <Card
            className="mr-3"
            title={'All Clients'}
            description={'Each client, regardless the status they’re in, will be part of this campaign'}
            icon={specificClients.src}
            active={eligibleClients == 0}
            onClick={() => setEligibleClients(0)}
          />
          <Card
            expandable
            title={'Specific Clients'}
            description={'Only clients who I choose by the status, will be part of this campaign'}
            icon={specificClients.src}
            active={eligibleClients == 1}
            onClick={() => setEligibleClients(1)}
          />
        </div>
      </div>
      <hr className=" -mx-6" />
      <div className="flex -mx-6">
        <div className="w-1/2 px-[22px] py-[26px] border-r border-gray1">
          <div className="mb-4 text-gray8 text-sm font-medium">Events</div>
          {events.map((event) => (
            <Event
              title={event.title}
              eventDate={event.eventDate}
              active={selectedEvent.id == event.id}
              onClick={() => setSelectedEvent(event)}
            />
          ))}
          <img src={divider.src} className="my-2 pl-2 mb-3" />
          <a
            onClick={() => resetCreateCampaign()}
            className="px-[14px] py-[8px] rounded-[222px] border-2 bg-lightBlue1 border-lightBlue3 cursor-pointer text-lightBlue3 text-sm font-semibold">
            + Add New Event
          </a>
        </div>
        <div className="w-1/2 bg-gray10 relative">
          <div className=" px-[22px] py-[26px]">
            <div>
              <div className="mb-4 text-gray8 text-sm font-medium">Choose the type of event you want to send:</div>
              <div className="flex mb-6">
                <Card
                  narrow
                  className="mr-2 bg-white"
                  title={'Email'}
                  icon={call.src}
                  active={selectedEvent.type == 0}
                  onClick={() => setTypeOfEvent(0)}
                />
                <Card
                  narrow
                  className="bg-white"
                  title={'SMS'}
                  icon={call.src}
                  active={selectedEvent.type == 1}
                  onClick={() => setTypeOfEvent(1)}
                />
              </div>
            </div>
            <div className="mb-6">
              <div className="mb-4 text-gray8 text-sm font-medium">Set the time you want to send the event:</div>
              <div className="flex">
                <Dropdown className="mr-3" placeHolder="Waiting Days" options={waitingDays} />
                <Dropdown inputWidth="w-[160px]" placeHolder="Time" options={timeOptions} />
              </div>
            </div>
            <div className="mb-6">
              <div className="mb-4 text-gray8 text-sm font-medium">Subject:</div>
              <Input placeholder="Subject" value={selectedEvent?.title} />
            </div>
            <div className="">
              <div className="mb-4 text-gray8 text-sm font-medium">Message:</div>
              <Editor placeholder="Write message here..." value={selectedEvent?.message} />
            </div>
          </div>
          <div className="sticky left-0 right-0 bottom-0 bg-white px-6 py-4 flex justify-end border-t border-gray1">
            <Button label="Cancel" white className="mr-3" />
            <Button primary label="Save Campaign Template" />
          </div>
        </div>
      </div>
    </SlideOver>
  );
};

export default CreateCampaignSidebar;
