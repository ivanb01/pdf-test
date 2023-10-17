import axiosInstance from '@api/axiosInstance';

export const sendMarketingEmail = (body) => {
  return axiosInstance.post(
    'email/send',
    { ...body },
    {
      headers: {
        'Content-Type': 'multipart/mixed',
      },
    },
  );
};
