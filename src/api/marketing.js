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

export const sendEmail = (to, subject, body) => {
  return axiosInstance.post(`v1/email/send`, {
    to: to,
    subject: subject,
    body: body,
  });
};
export const sendEmailFromContactForm = (body) => {
  return axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/email/send/contact`,
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
