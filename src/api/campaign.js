import axios from 'axios';
import axiosInstance from 'api/axiosInstance';

export const getCampaignsEventsUpcoming = (queryParams) => {
  return axiosInstance.get('v1/campaigns/events/upcoming', {
    params: queryParams,
  });
};

export const getContactCampaigns = (contactId) => {
  return axiosInstance.get(`/v2/contacts/${contactId}/campaigns`);
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
  return axiosInstance.get(`v2/campaigns/${id}/preview`);
};
export const getCampaignsUsers = (id) => {
  return axiosInstance.get(`v2/campaigns/${id}`);
};
export const getCampaigns = (searchterm) => {
  return axiosInstance.get('v2/campaigns', {
    params: { search_term: searchterm },
  });
};

export const assignContactToCampaign = (campaignId, contactId, local_timezone) => {
  return axiosInstance.post(`/v2/campaigns/${campaignId}/add-contact/${contactId}`, null, {
    params: {
      local_timezone: local_timezone,
    },
  });
};

export const unassignContactFromCampaign = (campaignId, contactId) => {
  return axiosInstance.post(`v2/campaigns/${campaignId}/remove-contact/${contactId}`);
};

export const getCampaignsByCategory = (category) => {
  return axiosInstance.get('v2/campaigns');
};

export const getCampaign = (id) => {
  return axiosInstance.get(`v2/campaigns/${id}`);
};

export const getCampaignPagination = (id, offset) => {
  return axiosInstance.get(`/v2/campaigns/${id}/all-contacts`, {
    params: {
      limit: 10,
      offset: offset,
    },
  });
};

export const getInCampaignContacts = (id, offset) => {
  return axiosInstance.get(`v2/campaigns/${id}/contacts-in-campaign`, {
    params: {
      limit: 10,
      offset,
    },
  });
};

export const getNotInCampaignContacts = (id, offset) => {
  return axiosInstance.get(`v2/campaigns/${id}/contacts-not-in-campaign`, {
    params: {
      limit: 10,
      offset: offset,
    },
  });
};
export const addEmailTemplate = (params) => {
  return axiosInstance.post(`v2/email-templates`, params);
};
export const addSMSTemplate = (params) => {
  return axiosInstance.post(`v2/sm-templates`, params);
};
export const getEmailTemplates = () => {
  return axiosInstance.get(`v2/email-templates`);
};
export const getSMSTemplates = () => {
  return axiosInstance.get(`v2/sm-templates`);
};
export const updateEmailTemplate = (id, template) => {
  return axiosInstance.put(`v2/email-templates/${id}`, template);
};
export const updateSMSTemplate = (id, template) => {
  return axiosInstance.put(`v2/sm-templates/${id}`, template);
};
export const deleteEmailTemplate = (id) => {
  return axiosInstance.delete(`v2/email-templates/${id}`);
};
export const deleteSMSTemplate = (id) => {
  return axiosInstance.delete(`v2/sm-templates/${id}`);
};

export const addCampaign = (campaign) => axiosInstance.post(`v2/campaigns`, campaign);
export const updateCampaign = (campaign, id) => axiosInstance.put(`v2/campaigns/${id}`, campaign);

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
