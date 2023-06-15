import axios from 'axios';
import axiosInstance from 'api/axiosInstance';

export const getGoogleAuthCallback = (queryParams) => {
    console.log("query params passsed to axios instance")
    console.log(queryParams)
    return axiosInstance.get('google/oauthcallback', {
      params: { ...queryParams, test_callback: '/contacts/no-contact'},
    });
};

export const getGoogleAuthorize = () => {
  return axiosInstance.get('google/authorize', {
    params: {test_callback: '/contacts/no-contact'}
  });
};



export const postGoogleContacts = () => {
  return axiosInstance.post('google/import/contacts'); 
};

export const getGoogleAuthorizeEmail = () => {
  return axiosInstance.get('google/authorize', {
    params: { scope: 'email'}
  });
};

export const getGmailLeadsAI = (gmail_labels="INBOX, UNREAD", gmail_limit=3, temperature=0, ai_enabled=true) => {
  return axiosInstance.get('gmail/ai/leads', {
    params: {gmail_labels: gmail_labels, gmail_limit:gmail_limit,temperature:temperature, ai_mode:ai_enabled}
  });
};