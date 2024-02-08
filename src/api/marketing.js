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

export const sendEmail = (to, subject, body) => {
  return axiosInstance.post(`v1/email/send`, {
    to: to,
    subject: subject,
    body: body,
  });
};
