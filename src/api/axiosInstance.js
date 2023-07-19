import axios from 'axios';
import { Auth } from 'aws-amplify';

const axiosInstance = axios.create();

const getLocalStorageValue = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.includes('idToken')) {
          resolve(localStorage.getItem(key));
          return;
        }
      }
      resolve(null);
    }, 1000);
  });
};

axiosInstance.interceptors.request.use(
  async (config) => {
    const apiGatewayUrl = localStorage.getItem('apiGatewayUrl');
    let token = null;
    const localStorageValue = await getLocalStorageValue();
    if (localStorageValue) {
      token = localStorageValue;
    } else {
      let tokenSession = await Auth.currentSession();
      token = tokenSession.idToken.jwtToken;
    }

    config.baseURL = apiGatewayUrl;
    config.headers.common['Accept'] = 'application/json';
    config.headers.common['Authorization'] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    // console.log('response from interceptor');
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
