import axios from 'axios';
import { Auth } from 'aws-amplify';

const axiosInstance = axios.create();

const getLocalStorageValue = (string) => {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.includes('idToken')) {
      return localStorage.getItem(key);
    }
  }
  return null; // Value not found
};

axiosInstance.interceptors.request.use(
  async (config) => {
    const apiGatewayUrl = localStorage.getItem('apiGatewayUrl');

    let token = getLocalStorageValue();
    console.log('token', token);
    // let currentSession = localStorage.getItem('currentSession')
    //   ? JSON.parse(localStorage.getItem('currentSession'))
    //   : await Auth.currentSession();
    // let token = currentSession.idToken.jwtToken;

    if (token) {
      console.log('done auth currentsession');
    }

    config.baseURL = apiGatewayUrl;
    config.headers.common['Accept'] = 'application/json';
    config.headers.common['Authorization'] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // console.log('response from interceptor');
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
