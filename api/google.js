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