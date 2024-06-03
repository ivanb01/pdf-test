import axios from 'axios';

export const postPresignedUrl = (fileName, signal) => {
  return axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/property-applications/presigned-post`,
    {
      file_name: fileName,
    },
    {
      headers: {
        Accept: 'application/json',
      },
      signal,
    },
  );
};

export const postFile = (url, data, options) => {
  return axios.post(url, data, options);
};

export const getAwsFileBlob = (url) => {
  return axios.get(url, { responseType: 'blob' });
};
