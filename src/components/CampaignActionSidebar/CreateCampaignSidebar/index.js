import Button from '@components/shared/button';
import SlideOver from '@components/shared/slideOver';
import { useSelector, useDispatch } from 'react-redux';
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
import CircleIcon from '@components/CircleIcon';
import SpecificClientsIcon from 'icons/SpecificClientsIcon';
import AllClientsIcon from 'icons/AllClientsIcon';
import MailIcon from 'icons/MailIcon';
import CallIcon from 'icons/CallIcon';
import Divider from 'icons/Divider';
import { addCampaign, addEmailTemplate, addSMSTemplate, getEmailTemplates, getSMSTemplates } from '@api/campaign';
import toast from 'react-hot-toast';
import { useCampaignForm } from 'hooks/useCampaignForm';
import { addCRMCampaigns } from '@store/campaigns/slice';
import Checkbox from '@components/shared/checkbox';

const CreateCampaignSidebar = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const [defaultEvents, setDefaultEvents] = useState([
    {
      action: 'Send',
      title: 'New Event',
      body_html: '',
      body: '',
      wait_interval: '2d',
      type: 'Email',
      charset: 'A',
      save_template: false,
    },
  ]);

  const [defaultCampaign, setDefaultCampaign] = useState({
    name: null,
    description: 'Campaign Description',
    status: 'Active',
    contact_category_id: null,
    contact_status_id: null,
  });

  const [creatingCampaignLoader, setCreatingCampaignLoader] = useState();
  const [emailTemplates, setEmailTemplates] = useState(null);
  const [smsTemplates, setSmsTemplates] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState();
  const [initialOption, setInitialOption] = useState({
    id: -1,
    label: '',
  });

  useEffect(() => {
    getTemplates();
  }, []);

  const getTemplates = async () => {
    try {
      const smsResponse = await getSMSTemplates();
      const emailResponse = await getEmailTemplates();
      const smsTemplates = smsResponse.data.data.map((template) => ({
        id: template.id,
        label: template.name,
        message: template.message,
      }));

      const emailTemplates = emailResponse.data.data.map((template) => ({
        id: template.id,
        label: template.subject,
        message: template.body_html,
      }));

      smsTemplates.unshift({ ...initialOption, label: 'Create Custom SMS' });
      emailTemplates.unshift({ ...initialOption, label: 'Create Custom Email' });

      setSmsTemplates(smsTemplates);
      setEmailTemplates(emailTemplates);
    } catch (error) {
      console.error('Failed to get templates:', error);
    }
  };

  const createCampaign = () => {
    setCreatingCampaignLoader(true);

    const modifiedEvents = events.map((event) => {
      if (event.save_template) {
        if (event.type == 'Email') {
          console.log('create email template: ', {
            subject: event.title,
            body_text: event.body,
            body_html: event.body_html,
            status: 'active',
          });
          addEmailTemplate({
            subject: event.title,
            body_text: event.body,
            body_html: event.body_html,
            status: 'active',
          });
        } else {
          console.log('create sms template: ', {
            name: event.title,
            message: event.body,
            status: 'active',
          });
          addSMSTemplate({
            name: event.title,
            message: event.body,
            status: 'active',
          });
        }
      }
      const { save_template, ...newAction } = event;
      return newAction;
    });

    setEvents(modifiedEvents);

    let newCampaign = {
      campaign: campaign,
      actions: modifiedEvents,
    };
    console.log(newCampaign);

    addCampaign(newCampaign).then((res) => {
      setCreatingCampaignLoader(false);
      setOpen(false);
      dispatch(
        addCRMCampaigns({
          ...res.data.campaign,
          actions: res.data.actions,
          campaign_id: res.data.campaign.id,
        }),
      );
      toast.success('Campaign created successfully!');
    });
  };

  const Card = ({
    title,
    description,
    icon,
    className,
    active,
    expanded,
    onClick,
    narrow,
    expandable,
    setType,
    setStatus,
  }) => {
    let padding = narrow ? 'py-[8px] px-[15px] min-w-[170px]' : 'px-[18px] py-4';
    return (
      <div
        onClick={onClick}
        className={`relative ${!expanded && 'cursor-pointer'} rounded-lg border-2 ${active && 'border-lightBlue3'} ${
          !expanded && active && 'bg-lightBlue1'
        } ${padding} flex ${className} ${!description && 'items-center'}`}>
        {icon}
        <div className="ml-4 text-sm">
          <div className="text-gray7 font-semibold">{title}</div>
          {description && <div className="text-gray5 mt-1">{description}</div>}
        </div>
        {expandable && (
          <div
            className={`${
              expanded
                ? 'h-auto border-l-2 border-r-2 border-b-2 pointer-events-auto border-lightBlue3 px-[18px] py-6'
                : 'border-none pointer-events-none'
            } h-0 transition-all bg-white absolute left-0 right-0 rounded-b-lg top-[90%] z-50 -mx-[1.5px]`}>
            {expanded && (
              <>
                <Radio
                  options={clientOptions}
                  required
                  label="What type?"
                  selectedOption={campaign.contact_category_id}
                  setSelectedOption={setType}
                  className="mb-6"
                  name="type-of-contact"
                  // error={errors.selectedContactType && touched.selectedContactType}
                  // errorText={errors.selectedContactType}
                />
                <StatusSelect
                  className="bg-lightBlue50 bg"
                  statuses={clientStatuses}
                  selectedStatus={campaign.contact_status_id}
                  setSelectedStatus={setStatus}
                />
              </>
            )}
          </div>
        )}
      </div>
    );
  };

  const Event = ({ index, title, className, type, active, onClick, wait, icon }) => {
    let isSms = type == 0 ? true : false;

    let days = wait.split('d')[0];
    let date = getDateAfterDays(days);

    return (
      <div className="mb-3 last:mb-0">
        <div className="px-2 py-1 bg-gray1 text-sm font-semibold inline-block rounded text-gray5">
          Waiting: {days} days
        </div>
        <div className="my-2 pl-2">
          <Divider />
        </div>
        <div
          onClick={onClick}
          className={`cursor-pointer rounded-lg border ${
            active && 'border-[#BAE6FD] bg-lightBlue1'
          } p-3 flex ${className} justify-between items-center group`}>
          <div className="flex">
            <div className="w-">{icon}</div>
            <div className="ml-4 text-sm">
              <div className="text-gray7 font-semibold">{title}</div>
              <div className="text-gray5 mt-1">
                send at {formatDateLThour(date)} on {formatDateLL(date)}
              </div>
            </div>
          </div>
          <KeyboardArrowRight className={`text-gray7 ${index != 0 && 'group-hover:hidden'}`} />
          {index != 0 && (
            <div
              onClick={() => removeEvent(index)}
              className="hidden group-hover:flex transition-all rounded-full bg-red-50 h-[30px] w-[30px] items-center justify-center hover:bg-red-500 group/delete">
              <Delete className="transition-all text-[20px] text-red-500 group-hover/delete:text-white" />
            </div>
          )}
        </div>
      </div>
    );
  };

  const resetCreateCampaign = () => {};

  const {
    campaign,
    setCampaign,
    events,
    setEvents,
    validateForm,
    addNewEvent,
    removeEvent,
    typeOfEvents,
    eligibleClients,
    setEligibleClients,
    showExpanded,
    setShowExpanded,
    isValid,
    setIsValid,
    selectedEvent,
    setSelectedEvent,
  } = useCampaignForm(defaultCampaign, defaultEvents);

  return (
    <SlideOver
      width="w-[1000px]"
      open={open}
      setOpen={(state) => {
        console.log(state);
        setOpen(state);
      }}
      editableTitle
      title={campaign.name}
      className=""
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
            icon={
              <CircleIcon active={eligibleClients == 0}>
                <AllClientsIcon fill={eligibleClients == 0 ? '#0284C7' : '#4B5563'} />
              </CircleIcon>
            }
            active={eligibleClients == 0}
            onClick={() => {
              setEligibleClients(0);
              setCampaign((prevState) => ({ ...prevState, contact_category_id: null, contact_status_id: null }));
            }}
          />
          <Card
            expandable
            className="w-1/2"
            title={'Specific Clients'}
            description={'Only clients who I choose by the status, will be part of this campaign'}
            icon={
              <CircleIcon active={eligibleClients == 1}>
                <SpecificClientsIcon fill={eligibleClients == 1 ? '#0284C7' : '#4B5563'} />
              </CircleIcon>
            }
            expanded={eligibleClients === 1 && showExpanded}
            // prettier-ignore
            active={eligibleClients === 1}
            onClick={() => {
              setEligibleClients(1);
              setShowExpanded(true);
            }}
            setType={(choice) => {
              setCampaign((prevState) => ({ ...prevState, contact_category_id: choice }));
            }}
            setStatus={(choice) => {
              setCampaign((prevState) => ({ ...prevState, contact_status_id: choice }));
            }}
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
              icon={
                event.type == 'Email' ? (
                  <CircleIcon small active={selectedEvent == index}>
                    <MailIcon fill={selectedEvent == index ? '#0284C7' : '#4B5563'} />
                  </CircleIcon>
                ) : (
                  <CircleIcon small active={selectedEvent == index}>
                    <CallIcon fill={selectedEvent == index ? '#0284C7' : '#4B5563'} />
                  </CircleIcon>
                )
              }
              index={index}
              title={event.title}
              wait={event.wait_interval}
              active={selectedEvent == index}
              onClick={() => setSelectedEvent(index)}
            />
          ))}
          <div className="my-2 pl-2 mb-3">
            <Divider />
          </div>
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
                    icon={
                      type.title == 'Email' ? (
                        <CircleIcon small active={events[selectedEvent].type == 'Email'}>
                          <MailIcon fill={events[selectedEvent].type == 'Email' ? '#0284C7' : '#4B5563'} />
                        </CircleIcon>
                      ) : (
                        <CircleIcon small active={events[selectedEvent].type == 'SMS'}>
                          <CallIcon fill={events[selectedEvent].type == 'SMS' ? '#0284C7' : '#4B5563'} />
                        </CircleIcon>
                      )
                    }
                    active={type.title == events[selectedEvent].type}
                    onClick={() => {
                      setSelectedTemplate(null);
                      setEvents((currentEvents) =>
                        currentEvents.map((item, index) =>
                          index === selectedEvent ? { ...item, type: type.title, title: '', body_html: '' } : item,
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
                        index === selectedEvent ? { ...item, wait_interval: `${option.id}d` } : item,
                      ),
                    )
                  }
                  inputWidth={'w-[220px]'}
                  initialSelect={
                    events[selectedEvent]
                      ? waitingDays.find((option) => option.id == events[selectedEvent].wait_interval.split('d')[0])
                      : null
                  }
                  className="mr-3"
                  placeHolder="Waiting Days"
                  options={waitingDays}
                />
                {/* <Dropdown inputWidth="w-[160px]" placeHolder="Time" options={timeOptions} /> */}
              </div>
            </div>
            <div className="mb-6">
              {(events[selectedEvent].type == 'Email' || events[selectedEvent].type == 'SMS') && (
                <div className="max-w-[380px]">
                  <div className="mb-4 text-gray8 text-sm font-medium">
                    Select from one of the templates, or create a new template:
                  </div>
                  <Dropdown
                    handleSelect={(option) => {
                      setSelectedTemplate(option);
                      setEvents((currentEvents) =>
                        currentEvents.map((item, index) => {
                          if (index === selectedEvent) {
                            if (option.id == -1) {
                              return { ...item, title: '', body_html: '', save_template: false };
                            }
                            return { ...item, title: option.label, body_html: option.message, save_template: false };
                          }
                          return item;
                        }),
                      );
                    }}
                    initialSelect={selectedTemplate}
                    options={events[selectedEvent].type == 'Email' ? emailTemplates : smsTemplates}
                    placeHolder="Select Template"
                  />
                </div>
              )}
              {selectedTemplate?.id === -1 && (
                <div className="mt-3">
                  <Checkbox
                    setState={(state) => {
                      console.log(state);
                      setEvents((currentEvents) =>
                        currentEvents.map((item, index) =>
                          index === selectedEvent ? { ...item, save_template: state } : item,
                        ),
                      );
                    }}
                    state={events[selectedEvent].save_template}
                    label="Save New Template"
                  />
                </div>
              )}
            </div>
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
                      index === selectedEvent
                        ? { ...item, body_html: value, body: value.replace(/<\/?[^>]+(>|$)|&[a-zA-Z0-9#]+;/g, '') }
                        : item,
                    ),
                  );
                }}
              />
            </div>
          </div>
          <div className="z-50 sticky left-0 right-0 bottom-0 bg-white px-6 py-4 flex justify-end border-t border-gray1">
            <Button label="Cancel" white className="mr-3" />
            <Button
              primary
              label="Create Campaign"
              disabled={!isValid}
              loading={creatingCampaignLoader}
              onClick={() => createCampaign()}
            />
          </div>
        </div>
      </div>
    </SlideOver>
  );
};

export default CreateCampaignSidebar;
