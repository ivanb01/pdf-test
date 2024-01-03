import axiosInstance from './axiosInstance';

export const getUnapprovedContacts = () => {
  return axiosInstance.get('v1/contacts/gmail_ai/unapproved');
};
export const getAIData = (id) => {
  return axiosInstance.get(`v1/gmail/ai/log/contact/${id}`);
};
