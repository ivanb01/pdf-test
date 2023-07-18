import axios from 'axios';

export const getEvents = () =>
  axios.get(`${process.env.NEXT_PUBLIC_EVENT_API_BASE_URL}/v1/event/oxford`);

export const getClientCampaignsAndEvents = (email) =>
  axios.get(
    `${process.env.NEXT_PUBLIC_EVENT_API_BASE_URL}/v1/event/campaigns/client/oxford/${email}`,
  );

export const getContactCampaignsAndEvents = (email) =>
  axios.get(
    `${process.env.NEXT_PUBLIC_EVENT_API_BASE_URL}/v1/event/campaigns/contact/oxford/${email}`,
  );
