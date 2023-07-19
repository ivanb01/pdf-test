import axiosInstance from './axiosInstance';

export const getUnapprovedContacts = () => {
  return axiosInstance.get('contacts/gmail_ai/unapproved');
};
