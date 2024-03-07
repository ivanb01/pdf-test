import axiosInstance from '@api/axiosInstance';

export const sendEmail = (body) => {
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

export const sendSMS = (to, message) => {
  return axiosInstance.post(
    'v1/sms/send',
    {
      to,
      message,
    },
    {
      headers: {
        'Content-Type': 'multipart/mixed',
      },
    },
  );
};
