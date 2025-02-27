import axios from 'axios';
import axiosInstance from 'api/axiosInstance';

export const getGoogleAuthCallback = (queryParams, callback) => {
  return axiosInstance.get('v1/google/oauthcallback', {
    params: { ...queryParams, test_callback: callback },
  });
};

export const getGoogleAuthorize = () => {
  return axiosInstance.get('v1/google/authorize', {
    params: { test_callback: '/contacts/clients', scope: 'contacts,gmail' },
  });
};

export const getGmailAILogs = () => {
  return axiosInstance.get('v1/gmail/ai/logs');
};

export const postGoogleContacts = () => {
  return axiosInstance.post('v1/google/import/contacts');
};

export const getGoogleAuthorizeEmail = () => {
  return axiosInstance.get('v1/google/authorize', {
    params: { scope: 'email' },
  });
};

export const getGmailLeadsAI = (gmail_labels = 'INBOX,UNREAD', gmail_limit = 3, temperature = 0, ai_enabled = true) => {
  return axiosInstance.get('v1/gmail/ai/leads', {
    params: {
      gmail_labels: gmail_labels,
      gmail_limit: gmail_limit,
      temperature: temperature,
      ai_mode: ai_enabled,
    },
  });
};

export const getGmailLeadsAIDefault = () => {
  return axiosInstance.get('v1/gmail/ai/leads');
};

export const getUserConsentForGoogleEmail = () => {
  return axiosInstance.get('v1/google/authorize', {
    params: { test_callback: '/contacts/clients', scope: 'contacts,gmail' },
  });
};

export const getUserConsentForGoogleContactsAndEmail = () => {
  return axiosInstance.get('v1/google/authorize', {
    params: { test_callback: '/contacts/clients', scope: 'contacts,gmail' },
  });
};
export const getUserConsentStatus = () => {
  return axiosInstance.get('v1/google/consent');
};
