import axiosInstance from './axiosInstance';

export const getUnapprovedContacts = () => {
  return axiosInstance.get('contacts/gmail_ai/unapproved');
};
export const getAIData = (id) => {
  return axiosInstance.get(`gmail/ai/log/contact/${id}`);
};
