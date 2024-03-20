import axios from 'axios';
import axiosInstance from 'api/axiosInstance';

export const getCampaignsEventsUpcoming = (queryParams) => {
  return axiosInstance.get('v1/campaigns/events/upcoming', {
    params: queryParams,
  });
};

export const getCampaignsEnrollSummary = () => {
  return axiosInstance.get(`v1/campaigns/dashboard/enroll_summary`);
};

export const getContactCampaign = (id) => {
  return axiosInstance.get(`v1/campaign/active/contact/${id}`);
};

export const getContactCampaignEventPreview = (id) => {
  return axiosInstance.get(`v1/campaign/event/${id}/preview`);
};

export const getAllEvents = (id) => {
  return axiosInstance.get(`v2/cmps/${id}/preview`);
};
export const getCampaignsUsers = (id) => {
  return axiosInstance.get(`v2/cmps/${id}`);
};
export const getCampaigns = (searchterm) => {
  return axiosInstance.get('v2/cmps', {
    params: { search_term: searchterm },
  });
};

export const assignContactToCampaign = (campaignId, contactId) => {
  return axiosInstance.post(`v2/campaign/${campaignId}/add_contact/${contactId}`);
};

export const unassignContactFromCampaign = (campaignId, contactId) => {
  return axiosInstance.post(`v2/campaign/${campaignId}/remove_contact/${contactId}`);
};

export const getCampaignsByCategory = (category) => {
  return axiosInstance.get('v2/cmps');
};

export const getCampaign = (id) => {
  return axiosInstance.get(`v2/cmps/${id}`);
};
export const getEmailTemplates = () => {
  return axiosInstance.get(`v2/em-templates`);
};
export const getSMSTemplates = () => {
  return axiosInstance.get(`v2/sm-templates`);
};

export const addEmailTemplate = (params) => {
  return axiosInstance.post(`v2/em-templates`, params);
};
export const addSMSTemplate = (params) => {
  return axiosInstance.post(`v2/sm-templates`, params);
};

export const addCampaign = (campaign) => axiosInstance.post(`v2/cmps`, campaign);
export const updateCampaign = (campaign, id) => axiosInstance.put(`v2/cmps/${id}`, campaign);

// export const updateCampaign = (campaign) =>
//   axios.put(`${process.env.NEXT_PUBLIC_CAMPAIGN_API_BASE_URL}/v1/campaign`, campaign);

export const deleteCampaign = (id) =>
  axios.delete(`${process.env.NEXT_PUBLIC_CAMPAIGN_API_BASE_URL}/v1/campaign/oxford/${id}`);

export const addContactToCampaign = (payload) =>
  axios.post(`${process.env.NEXT_PUBLIC_CAMPAIGN_API_BASE_URL}/v1/campaign/contact/add`, payload);

export const addClientToCampaign = (payload) =>
  axios.post(`${process.env.NEXT_PUBLIC_CAMPAIGN_API_BASE_URL}/v1/campaign/client/add`, payload);

export const deleteContactFromCampaign = (payload) =>
  axios.post(`${process.env.NEXT_PUBLIC_CAMPAIGN_API_BASE_URL}/v1/campaign/contact/delete`, payload);

export const deleteClientFromCampaign = (payload) =>
  axios.post(`${process.env.NEXT_PUBLIC_CAMPAIGN_API_BASE_URL}/v1/campaign/client/delete`, payload);
