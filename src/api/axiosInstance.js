import axios from 'axios';
import { Auth } from 'aws-amplify';

const axiosInstance = axios.create();

const getTokenFromLocalStorage = () => {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.includes('idToken')) {
      return localStorage.getItem(key);
    }
  }
  return null;
};

axiosInstance.interceptors.request.use(
  async (config) => {
    const apiGatewayUrl = localStorage.getItem('apiGatewayUrl');
    let token = getTokenFromLocalStorage();

    if (!token) {
      const tokenSession = await Auth.currentSession();
      token = tokenSession.idToken.jwtToken;
    }
    console.log(token); // Consider removing this in production for security reasons.

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
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
