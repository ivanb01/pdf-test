import axiosInstance from '@api/axiosInstance';
import axios from 'axios';

export const sendMarketingEmail = (body) => {
  return axiosInstance.post(
    'v1/email/send',
    { ...body },
    {
      headers: {
        'Content-Type': 'multipart/mixed',
      },
    },
  );
};

export const sendEmailFromContactForm = (body) => {
  return axios.post(
    'https://ul3tbvf5h9.execute-api.us-east-1.amazonaws.com/prod/v1/email/send/contact',
    {
      ...body,
    },
    {
      headers: {
        'Content-Type': 'multipart/mixed',
      },
    },
  );
};
