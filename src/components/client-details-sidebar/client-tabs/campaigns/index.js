import { useEffect, useState } from 'react';
import Alert from 'components/shared/alert';
import Events from 'components/shared/events';
import { CalendarIcon, ClockIcon } from '@heroicons/react/outline';
import Text from 'components/shared/text';
import Image from 'next/image';
import campaignsSVG from '/public/images/no_campaigns.svg';
import {
  assignContactToCampaign,
  unassignContactFromCampaign,
  getContactCampaign,
  getContactCampaignEventPreview,
} from 'api/campaign';
import Button from 'components/shared/button';
import {
  CheckCircleIcon,
  MinusCircleIcon,
  ExclamationIcon,
  PlusIcon,
} from '@heroicons/react/solid';
import AssignToCampaign from 'components/overlays/assign-to-campaign';
import UnassignOverlay from 'components/overlays/unassign';
import {
  sortDateAsc,
  formatDateMDY,
  formatDateLThour,
  isValidDate,
} from 'global/functions';
import { useSelector } from 'react-redux';
import SimpleBar from 'simplebar-react';
import { setRefetchData } from 'store/global/slice';
import { useDispatch } from 'react-redux';

export default function Campaigns({ contactId, contact }) {
  const dispatch = useDispatch();
  const [alert, setAlert] = useState(null);
  const [showAssignToCampaign, setShowAssignToCampaign] = useState(false);
  const [showUnassignFromCampaign, setShowUnassignFromCampaign] =
    useState(false);
  const [fetchRequired, setFetchRequired] = useState(false);
  const [campaignId, setCampaignId] = useState();
  const [contactCampaignStatus, setContactCampaignStatus] = useState('');
  const [campaignEvents, setCampaignEvents] = useState(null);
  const [currentEvent, setCurrentEvent] = useState(0);
  const [previewEvent, setPreviewEvent] = useState(null);
  const [previewEventDate, setPreviewEventDate] = useState(null);
  const [previewEventSubject, setPreviewEventSubject] = useState(null);
  const campaignsData = useSelector(
    (state) => state.clientDetails.campaignsData,
  );
  const refetchData = useSelector((state) => state.global.refetchData);

  const handleAssignCampaignChange = async () => {
    try {
      const { data } = await assignContactToCampaign(campaignId, contactId);
      dispatch(setRefetchData(true));

      setShowAssignToCampaign(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnassignCampaignChange = async () => {
    try {
      const { data } = await unassignContactFromCampaign(campaignId, contactId);
      dispatch(setRefetchData(true));
      setShowUnassignFromCampaign(false);
    } catch (error) {
      console.log(error);
    }
  };

  const alerts = [
    {
      icon: (
        <ExclamationIcon
          className="h-5 w-5 text-yellow-400"
          aria-hidden="true"
        />
      ),
      text: 'To be able to receive these emails. Client must need to be assigned to this campaign.',
      button: (
        <Button
          className="p-0"
          label="Assign"
          leftIcon={<PlusIcon />}
          primary
          onClick={() => setShowAssignToCampaign(true)}
        />
      ),
      type: 'warning',
    },
    {
      icon: <CheckCircleIcon className="text-green6" />,
      text: 'This campaign is running succesfully.',
      button: (
        <Button
          white
          className="text-red5"
          leftIcon={<MinusCircleIcon className="text-red5" />}
          label="Unassign"
          onClick={() => setShowUnassignFromCampaign(true)}
        />
      ),
      type: 'success',
    },
    {
      icon: <CheckCircleIcon className="text-red6" />,
      text: 'This contact was once in campaign, currently is unassigned and cannot be assigned again.',
      button: <span></span>,
      type: 'error',
    },
  ];

  const eventPreview = async (event) => {
    try {
      if (event.preview) {
        setPreviewEvent(event.preview);
        event.preview.preview.subject
          ? setPreviewEventSubject(`${event.preview.preview.subject}`)
          : setPreviewEventSubject(``);
      } else if (event.id) {
        const { data } = await getContactCampaignEventPreview(event.id);
        setPreviewEvent(data);
        console.log('eventi', data);
        data.preview.subject
          ? setPreviewEventSubject(`${data.preview.subject}`)
          : setPreviewEventSubject(``);
      }
      setPreviewEventDate(event.execute_on);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchContactCampaign = async () => {
    try {
      // const { data } = await getContactCampaign(contactId);
      const data = campaignsData;
      console.log('fetch contact campaign', data);
      setContactCampaignStatus(data?.status);

      if (data?.status === 'enrolled') {
        setCampaignId(data?.campaign_id);
        setAlert(alerts[1]);
        // setCampaignEvents(data?.events);
        setCampaignEvents(sortDateAsc(data?.events, 'execute_on'));
        setCurrentEvent(data?.events[0]?.id);
        await eventPreview(data?.events[0]);
      } else if (data?.status === 'matches_campaign') {
        setCampaignId(data?.campaign_id);
        setAlert(alerts[0]);
        const newEvents = data?.events.map((item, i) => ({ id: i, ...item }));
        setCampaignEvents(newEvents);
        setCurrentEvent(newEvents[0]?.id);
        await eventPreview(newEvents[0]);
      } else if (data?.status === 'unenrolled') {
        setCampaignId(data?.campaign_id);
        setAlert(alerts[2]);
        // setCampaignEvents(data?.events);
        setCampaignEvents(sortDateAsc(data?.events, 'execute_on'));
        setCurrentEvent(data?.events[0]?.id);
        await eventPreview(data?.events[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchContactCampaign();
  }, [contactId, contact, refetchData]);
  return (
    <>
      {showAssignToCampaign && (
        <AssignToCampaign
          // contacts={}
          handleCloseOverlay={() => setShowAssignToCampaign(false)}
          onSubmit={handleAssignCampaignChange}
        />
      )}
      {showUnassignFromCampaign && (
        <UnassignOverlay
          handleCloseOverlay={() => setShowUnassignFromCampaign(false)}
          onSubmit={handleUnassignCampaignChange}
        />
      )}
      {contactCampaignStatus == 'no_match' ? (
        // <div className="bg-gray10 p-[24px]">
        //   No matching campaign found for the contact.
        // </div>
        <div className="bg-gray10 details-tabs-fixed-height p-[24px]">
          <div className="bg-white h-full overflow-y-auto">
            <div className="flex flex-col items-center justify-center h-full max-w-[350px] mx-auto my-0">
              <Image src={campaignsSVG}></Image>
              <Text h3 className="text-gray7 mb-2 mt-4 text-center">
                There is no matched campaign for this contact
              </Text>
              <Text p className="text-gray4 relative text-center mb-6">
                Matched campaign will be shown here.
              </Text>
            </div>
          </div>
        </div>
      ) : (
        campaignEvents && (
          <div className="bg-white">
            {alert && (
              <Alert type={alert.type}>
                <div className="flex items-center">
                  <div className="flex-shrink-0">{alert.icon}</div>
                  <div className="ml-3 flex flex-row justify-between w-[100%] items-center">
                    <p
                      className={`text-sm ${
                        alert.type === 'success'
                          ? 'text-green7'
                          : alert.type === 'warning'
                          ? 'text-yellow3'
                          : 'text-red4'
                      }`}>
                      {alert.text}
                    </p>
                    {alert.button}
                  </div>
                  `
                </div>
              </Alert>
            )}
            <div className="flex flex-row">
              <div className="w-[42%]">
                <SimpleBar
                  autoHide
                  style={{ maxHeight: 'calc(100vh - 295px)' }}>
                  <Events
                    events={campaignEvents}
                    currentEvent={currentEvent}
                    setCurrentEvent={setCurrentEvent}
                    eventPreview={eventPreview}
                    className="p-4 bg-white border-r border-gray2 min-h-custom"
                  />
                </SimpleBar>
              </div>
              <div className="w-[58%]">
                <SimpleBar
                  autoHide
                  style={{ maxHeight: 'calc(100vh - 295px)' }}>
                  <div className="flex flex-row border-b border-gray2 p-6">
                    {isValidDate(previewEventDate) ? (
                      <>
                        <CalendarIcon className="text-gray4" height={20} />
                        <Text p className="text-gray4 ml-1">
                          {formatDateMDY(previewEventDate)}
                        </Text>
                        <ClockIcon className="text-gray4 ml-4" height={20} />
                        <Text p className="text-gray4 ml-1">
                          {formatDateLThour(previewEventDate)}
                        </Text>
                      </>
                    ) : (
                      <>
                        <CalendarIcon className="text-gray4" height={20} />
                        <Text p className="text-gray4 ml-1">
                          {previewEventDate?.includes('After')
                            ? `${parseInt(
                                previewEventDate.replace(/[^0-9\.]/g, ''),
                              )} days after added in Campaign`
                            : previewEventDate}
                        </Text>
                      </>
                    )}
                    {/* <CalendarIcon className="text-gray4" height={20} />
                <Text p className="text-gray4 ml-1">
                  Same day as added in the system
                </Text>
                <ClockIcon className="text-gray4 ml-4" height={20} />
                <Text p className="text-gray4 ml-1">
                  10:00 AM
                </Text> */}
                  </div>
                  {previewEvent?.type == 'Email' && (
                    <RawHTML className="mt-6 p-6" title={previewEventSubject}>
                      {previewEvent?.preview?.body_html}
                    </RawHTML>
                  )}
                  {previewEvent?.type == 'SMS' && (
                    <PreviewEvent
                      // title={`Destination number: ${previewEvent?.preview?.destination_number}`}
                      title={previewEventSubject}
                      description={previewEvent?.preview?.message}
                    />
                  )}
                  {previewEvent?.type == 'Task' && (
                    <PreviewEvent
                      // title={previewEvent?.preview?.task_name}
                      title={previewEventSubject}
                      description={previewEvent?.preview?.task_description}
                    />
                  )}
                </SimpleBar>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
}

const RawHTML = ({ title, children, className = '' }) => (
  <div className={className}>
    <Text h1 className="mb-3">
      {title}
    </Text>
    <div
      dangerouslySetInnerHTML={{ __html: children.replace(/\n/g, '<br />') }}
    />
  </div>
);

const PreviewEvent = ({ title, description, imageSrc }) => (
  <div className="mt-6 p-6">
    <Text h1 className="mb-3">
      {title}
    </Text>
    <Text p className="text-gray4 ">
      {description}
    </Text>
    {imageSrc && <Image src={imageSrc} width={336} />}
  </div>
);
