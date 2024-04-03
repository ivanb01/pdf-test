import { useEffect, useState } from 'react';

export const useCampaignForm = (initialCampaign, initialEvents) => {
  const [campaign, setCampaign] = useState(initialCampaign);
  const [events, setEvents] = useState(initialEvents);
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

  const validateForm = () => {
    if (!campaign.name) {
      return false;
    }

    //ignore-prettier
    if (eligibleClients === 1 && (!campaign.contact_category_id || !campaign.contact_status_id)) {
      return false;
    }

    for (const event of events) {
      if (!event.type || !event.title || !event.body_html) {
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
      wait_interval: '3d',
      type: 'Email',
      charset: 'A',
      action: 'Send',
    };
    setEvents((prevState) => [...prevState, newEvent]);
    setSelectedEvent(events.length);
  };

  const removeEvent = (index) => {
    let modifiedEvents = events.filter((event, key) => key != index);
    setEvents(modifiedEvents);
    console.log('setevent', modifiedEvents.length - 1);
    setSelectedEvent(modifiedEvents.length - 1);
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
  };
};
