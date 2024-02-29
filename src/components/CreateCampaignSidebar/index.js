import Button from '@components/shared/button';
import SlideOver from '@components/shared/slideOver';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import specificClients from '/public/images/specific-clients.svg';
import call from '/public/images/call.svg';
import divider from '/public/images/divider.svg';
import Input from '@components/shared/input';
import Editor from '@components/Editor';
import { formatDateLL, formatDateLThour, getDateAfterDays } from '@global/functions';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Dropdown from '@components/shared/dropdown';
import { clientOptions, clientStatuses, emailTemplates, timeOptions, types, waitingDays } from '@global/variables';
import StatusSelect from '@components/status-select';
import ContactTypeSelect from '@components/contact/contact-type-select';
import Text from '@components/shared/text';
import Radio from '@components/shared/radio';
import Delete from '@mui/icons-material/Delete';
import RichtextEditor from '@components/Editor';

const CreateCampaignSidebar = ({ open, setOpen }) => {
  const [eligibleClients, setEligibleClients] = useState(0);
  const [typeOfEvent, setTypeOfEvent] = useState(null);
  const [selectedType, setSelectedType] = useState();
  const [selectedStatus, setSelectedStatus] = useState();

  const [events, setEvents] = useState([
    {
      id: 0,
      action: 'Send',
      title: 'Thank you for working with us.',
      body_html: '<a>Test</a> <stronger>Test Body</stronger> <br/> </br> <h5>Test h5</h5>',
      wait: '2d',
      type: 'SMS',
    },
    {
      id: 1,
      action: 'Send',
      title: 'Thank you for working with us.',
      body_html: '<h1>Test h1</h1> <stronger>Test Body</stronger> <br/> </br> <h5>Test h5</h5>',
      wait: '4d',
      type: 'Email',
    },
  ]);

  const [selectedEvent, setSelectedEvent] = useState(0);

  const [campaign, setCampaign] = useState({
    name: null,
    description: 'Campaign Description',
    status: 'Active',
    contact_category_id: null,
    contact_status_id: null,
  });

  const [typeOfEvents, setTypeOfEvents] = useState([
    { id: 0, title: 'Email', icon: call.src },
    { id: 1, title: 'SMS', icon: call.src },
  ]);

  const addNewEvent = () => {
    let newEvent = {
      id: events.length,
      title: 'New Event',
      body_html: '',
      wait: '3d',
      type: 'Email',
    };
    setEvents((prevState) => [...prevState, newEvent]);
  };

  const removeEvent = (index) => {
    let modifiedEvents = events.filter((event, key) => key != index);
    setEvents(modifiedEvents);
  };

  const createCampaign = () => {
    let newCampaign = {
      campaign: campaign,
      actions: events,
    };
    console.log(newCampaign);
  };

  const Card = ({ title, description, icon, className, active, onClick, narrow, expandable }) => {
    let padding = narrow ? 'py-[8px] px-[15px] min-w-[170px]' : 'px-[18px] py-4';
    return (
      <div
        onClick={onClick}
        className={`relative cursor-pointer rounded-lg border-2 ${active && 'border-lightBlue3'} ${
          active && !expandable && 'bg-lightBlue1'
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
                ? 'h-auto border-l-2 border-r-2 border-b-2 pointer-events-auto border-lightBlue3 px-[18px] py-6'
                : 'border-none pointer-events-none'
            } h-0 transition-all bg-white absolute left-0 right-0 rounded-b-lg top-[90%] z-50 -mx-[1.5px]`}>
            {active && (
              <>
                <Radio
                  options={clientOptions}
                  required
                  label="What type?"
                  selectedOption={selectedType}
                  setSelectedOption={setSelectedType}
                  className="mb-6"
                  name="type-of-contact"
                  // error={errors.selectedContactType && touched.selectedContactType}
                  // errorText={errors.selectedContactType}
                />
                <StatusSelect
                  className="bg-lightBlue50 bg"
                  statuses={clientStatuses}
                  selectedStatus={selectedStatus}
                  setSelectedStatus={setSelectedStatus}
                />
              </>
            )}
          </div>
        )}
      </div>
    );
  };

  const Event = ({ index, title, className, type, active, onClick, wait }) => {
    let isSms = type == 0 ? true : false;

    let days = wait.split('d')[0];
    let date = getDateAfterDays(days);

    return (
      <div className="mb-3 last:mb-0">
        <div className="px-2 py-1 bg-gray1 text-sm font-semibold inline-block rounded text-gray5">
          Waiting: {days} days
        </div>
        <img src={divider.src} className="my-2 pl-2" />
        <div
          onClick={onClick}
          className={`cursor-pointer rounded-lg border ${
            active && 'border-[#BAE6FD] bg-lightBlue1'
          } p-3 flex ${className} justify-between items-center group`}>
          <div className="flex">
            <img src={call.src} />
            <div className="ml-4 text-sm">
              <div className="text-gray7 font-semibold">{title}</div>
              <div className="text-gray5 mt-1">
                send at {formatDateLThour(date)} on {formatDateLL(date)}
              </div>
            </div>
          </div>
          <KeyboardArrowRight className="text-gray7 group-hover:hidden" />
          <div
            onClick={() => removeEvent(index)}
            className="hidden group-hover:flex transition-all rounded-full bg-red-50 h-[30px] w-[30px] items-center justify-center hover:bg-red-500 group/delete">
            <Delete className="transition-all text-[20px] text-red-500 group-hover/delete:text-white" />
          </div>
        </div>
      </div>
    );
  };

  const resetCreateCampaign = () => {};

  return (
    <SlideOver
      width="w-[1200px]"
      open={open}
      setOpen={setOpen}
      editableTitle
      title={campaign.name}
      className="top-[70px]"
      handleTitleChange={(e) => setCampaign((prevState) => ({ ...prevState, name: e.target.value }))}
      rounded>
      <div className="-mt-3 mb-5">
        <div className="mb-4 text-gray8 text-sm font-medium">
          Choose the clients who will be eligible of this campaign
        </div>
        <div className="flex">
          <Card
            className="mr-3 w-1/2"
            title={'All Clients'}
            description={'Each client, regardless the status they’re in, will be part of this campaign'}
            icon={specificClients.src}
            active={eligibleClients == 0}
            onClick={() =>
              setCampaign((prevState) => ({ ...prevState, contact_category_id: null, contact_status_id: null }))
            }
          />
          <Card
            expandable
            className="w-1/2"
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
          {events.map((event, index) => (
            <Event
              key={index}
              index={index}
              title={event.title}
              wait={event.wait}
              active={selectedEvent == index}
              onClick={() => setSelectedEvent(index)}
            />
          ))}
          <img src={divider.src} className="my-2 pl-2 mb-3" />
          <a
            onClick={() => addNewEvent()}
            className="px-[14px] py-[8px] rounded-[222px] border-2 bg-lightBlue1 border-lightBlue3 cursor-pointer text-lightBlue3 text-sm font-semibold">
            + Add New Event
          </a>
        </div>
        <div className="w-1/2 bg-gray10 relative">
          <div className=" px-[22px] py-[26px]">
            <div>
              <div className="mb-4 text-gray8 text-sm font-medium">Choose the type of event you want to send:</div>
              <div className="flex mb-6">
                {typeOfEvents.map((type, index) => (
                  <Card
                    key={index}
                    narrow
                    className="mr-2 bg-white"
                    title={type.title}
                    icon={type.icon}
                    active={type.title == events[selectedEvent].type}
                    onClick={() => {
                      setEvents((currentEvents) =>
                        currentEvents.map((item, index) =>
                          index === selectedEvent ? { ...item, type: type.title } : item,
                        ),
                      );
                    }}
                  />
                ))}
                {/* <Card
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
                /> */}
              </div>
            </div>
            <div className="mb-6">
              <div className="mb-4 text-gray8 text-sm font-medium">Set the time you want to send the event:</div>
              <div className="flex">
                <Dropdown
                  handleSelect={(option) =>
                    setEvents((currentEvents) =>
                      currentEvents.map((item, index) =>
                        index === selectedEvent ? { ...item, wait: `${option.id}d` } : item,
                      ),
                    )
                  }
                  inputWidth={'w-[220px]'}
                  initialSelect={waitingDays.find((option) => option.id == events[selectedEvent].wait.split('d')[0])}
                  className="mr-3"
                  placeHolder="Waiting Days"
                  options={waitingDays}
                />
                {/* <Dropdown inputWidth="w-[160px]" placeHolder="Time" options={timeOptions} /> */}
              </div>
            </div>
            {typeOfEvent != null && (
              <div className="mb-6">
                <div className="mb-4 text-gray8 text-sm font-medium">
                  Select from one of the templates, or create a new template:
                </div>
                <Dropdown options={emailTemplates} placeHolder="Select Template" />
              </div>
            )}
            <div className="mb-6">
              <div className="mb-4 text-gray8 text-sm font-medium">Subject:</div>
              <Input
                placeholder="Subject"
                onChange={(e) =>
                  setEvents((currentEvents) =>
                    currentEvents.map((item, index) =>
                      index === selectedEvent ? { ...item, title: e.target.value } : item,
                    ),
                  )
                }
                value={events[selectedEvent]?.title}
              />
            </div>
            <div className="">
              <div className="mb-4 text-gray8 text-sm font-medium">Message:</div>
              <RichtextEditor
                placeholder="Write message here..."
                value={events[selectedEvent].body_html}
                onContentChange={(value) => {
                  setEvents((currentEvents) =>
                    currentEvents.map((item, index) =>
                      index === selectedEvent ? { ...item, body_html: value } : item,
                    ),
                  );
                }}
              />
            </div>
          </div>
          <div className="z-50 sticky left-0 right-0 bottom-0 bg-white px-6 py-4 flex justify-end border-t border-gray1">
            <Button label="Cancel" white className="mr-3" />
            <Button primary label="Save Campaign Template" onClick={() => createCampaign()} />
          </div>
        </div>
      </div>
    </SlideOver>
  );
};

export default CreateCampaignSidebar;
