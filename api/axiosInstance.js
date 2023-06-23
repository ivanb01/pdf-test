import axios from 'axios';
import { Auth } from 'aws-amplify';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  async (config) => {
    const apiGatewayUrl = localStorage.getItem('apiGatewayUrl');
    const currentSession = localStorage.getItem('currentSession')
      ? JSON.parse(localStorage.getItem('currentSession'))
      : await Auth.currentSession();
    const token = currentSession.idToken.jwtToken;

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
