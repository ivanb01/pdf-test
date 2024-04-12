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
  return axiosInstance.get(`v2/campaigns/active/contact/${id}`);
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
  return axiosInstance.post(`v2/campaigns/${campaignId}/add-contact/${contactId}`);
};

export const unassignContactFromCampaign = (campaignId, contactId) => {
  return axiosInstance.post(`v2/campaigns/${campaignId}/remove-contact/${contactId}`);
};

export const getCampaignsByCategory = (category) => {
  return axiosInstance.get('v2/cmps');
};

export const getCampaign = (id) => {
  return axiosInstance.get(`v2/cmps/${id}`);
};

export const addEmailTemplate = (params) => {
  return axiosInstance.post(`v2/em-templates`, params);
};
export const addSMSTemplate = (params) => {
  return axiosInstance.post(`v2/sm-templates`, params);
};
export const getEmailTemplates = () => {
  return axiosInstance.get(`v2/em-templates`);
};
export const getSMSTemplates = () => {
  return axiosInstance.get(`v2/sm-templates`);
};
export const updateEmailTemplate = (id, template) => {
  return axiosInstance.put(`v2/em-templates/${id}`, template);
};
export const updateSMSTemplate = (id, template) => {
  return axiosInstance.put(`v2/sm-templates/${id}`, template);
};
export const deleteEmailTemplate = (id) => {
  return axiosInstance.delete(`v2/em-templates/${id}`);
};
export const deleteSMSTemplate = (id) => {
  return axiosInstance.delete(`v2/sm-templates/${id}`);
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
