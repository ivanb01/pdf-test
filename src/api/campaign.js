import axios from 'axios';
import axiosInstance from 'api/axiosInstance';

export const getCampaignsEventsUpcoming = (queryParams) => {
  return axiosInstance.get('campaigns/events/upcoming', {
    params: queryParams,
  });
};

export const getCampaignsEnrollSummary = () => {
  return axiosInstance.get(`campaigns/dashboard/enroll_summary`);
};

export const getContactCampaign = (id) => {
  return axiosInstance.get(`/campaign/active/contact/${id}`);
};

export const getContactCampaignEventPreview = (id) => {
  return axiosInstance.get(`/campaign/event/${id}/preview`);
};

export const getAllEvents = (id) => {
  return axiosInstance.get(`/campaign/${id}/preview`);
};

export const getCampaigns = (searchterm) => {
  return axiosInstance.get('campaigns', {
    params: { search_term: searchterm },
  });
};

export const assignContactToCampaign = (campaignId, contactId) => {
  return axiosInstance.post(`campaign/${campaignId}/add_contact/${contactId}`);
};

export const unassignContactFromCampaign = (campaignId, contactId) => {
  return axiosInstance.post(
    `campaign/${campaignId}/remove_contact/${contactId}`,
  );
};

export const getCampaign = (id) => {
  return axiosInstance.get('campaign/' + id);
};

export const getCampaignsByCategory = (category) => {
  return axiosInstance.get('campaigns', {
    params: { category: category },
  });
};

export const addCampaign = (campaign) =>
  axios.post(
    `${process.env.NEXT_PUBLIC_CAMPAIGN_API_BASE_URL}/v1/campaign`,
    campaign,
  );

export const updateCampaign = (campaign) =>
  axios.put(
    `${process.env.NEXT_PUBLIC_CAMPAIGN_API_BASE_URL}/v1/campaign`,
    campaign,
  );

export const deleteCampaign = (id) =>
  axios.delete(
    `${process.env.NEXT_PUBLIC_CAMPAIGN_API_BASE_URL}/v1/campaign/oxford/${id}`,
  );

export const addContactToCampaign = (payload) =>
  axios.post(
    `${process.env.NEXT_PUBLIC_CAMPAIGN_API_BASE_URL}/v1/campaign/contact/add`,
    payload,
  );

export const addClientToCampaign = (payload) =>
  axios.post(
    `${process.env.NEXT_PUBLIC_CAMPAIGN_API_BASE_URL}/v1/campaign/client/add`,
    payload,
  );

export const deleteContactFromCampaign = (payload) =>
  axios.post(
    `${process.env.NEXT_PUBLIC_CAMPAIGN_API_BASE_URL}/v1/campaign/contact/delete`,
    payload,
  );

export const deleteClientFromCampaign = (payload) =>
  axios.post(
    `${process.env.NEXT_PUBLIC_CAMPAIGN_API_BASE_URL}/v1/campaign/client/delete`,
    payload,
  );
