import axiosInstance from '@api/axiosInstance';

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
  return axiosInstance.post(
    'v1/email/send/contact',
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
