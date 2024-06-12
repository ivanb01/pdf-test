import { getEmailTemplates } from '@api/campaign';
import { useEffect, useState } from 'react';

export const useCampaignForm = () => {
  const [campaign, setCampaign] = useState({
    name: null,
    description: 'Campaign Description',
    status: 'Active',
    contact_category_id: null,
    contact_status_id: null,
  });
  const [events, setEvents] = useState([
    {
      action: 'Send',
      title: 'New Event',
      body_html: '',
      body: '',
      wait_interval: '-d',
      type: 'Email',
      trigger_time: '11:00',
      charset: 'A',
      template: {
        id: -1,
        label: 'Create New Email',
      },
      save_template: false,
    },
  ]);
  const [emailTemplates, setEmailTemplates] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState();
  const [initialOption, setInitialOption] = useState({
    id: -1,
    label: 'Create New Email',
  });
  const [eligibleClients, setEligibleClients] = useState(0);
  const [showExpanded, setShowExpanded] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(0);

  const [typeOfEvents, setTypeOfEvents] = useState([
    {
      id: 0,
      title: 'Email',
    },
    {
      id: 1,
      title: 'SMS',
    },
  ]);

  useEffect(() => {
    getTemplates();
  }, []);

  const getTemplates = async () => {
    try {
      // const smsResponse = await getSMSTemplates();
      const emailResponse = await getEmailTemplates();
      // const smsTemplates = smsResponse.data.data.map((template) => ({
      //   id: template.id,
      //   label: template.name,
      //   message: template.message,
      // }));

      const emailTemplates = emailResponse.data.data.map((template) => ({
        id: template.id,
        label: template.subject,
        message: template.body_html,
      }));

      // smsTemplates.unshift({ ...initialOption, label: 'Create New Email' });
      emailTemplates.unshift({ ...initialOption });

      // setSmsTemplates(smsTemplates);
      setEmailTemplates(emailTemplates);
    } catch (error) {
      console.error('Failed to get templates:', error);
    }
  };

  const validateForm = () => {
    if (!campaign.name) {
      return false;
    }

    //ignore-prettier
    if (eligibleClients === 1 && (!campaign.contact_category_id || !campaign.contact_status_id)) {
      return false;
    }

    for (const event of events) {
      if (!event.type || !event.title || !event.body_html || event.wait_interval === '-d') {
        return false;
      }
    }

    return true;
  };
  const addNewEvent = () => {
    let newEvent = {
      title: 'New Event',
      body_html: '',
      body: '',
      wait_interval: '-d',
      trigger_time: '11:00',
      type: 'Email',
      charset: 'A',
      action: 'Send',
      template: {
        id: -1,
        label: 'Create New Email',
      },
      save_template: false,
    };
    setEvents((prevState) => [...prevState, newEvent]);
    setSelectedEvent(events.length);
  };

  const removeEvent = (index) => {
    let modifiedEvents = events.filter((event, key) => key != index);
    setEvents(modifiedEvents);
    console.log('setevent', modifiedEvents.length - 1);
    setTimeout(() => {
      setSelectedEvent(modifiedEvents.length - 1);
    }, 50);
  };

  useEffect(() => {
    setShowExpanded(campaign.contact_category_id && campaign.contact_status_id ? false : true);
  }, [campaign]);

  useEffect(() => {
    setIsValid(validateForm());
  }, [campaign, events, eligibleClients]);

  return {
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
    emailTemplates,
    selectedTemplate,
    setSelectedTemplate,
    initialOption,
  };
};
