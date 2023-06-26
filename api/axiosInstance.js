import axios from 'axios';
import { Auth } from 'aws-amplify';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  async (config) => {
    setTimeout(() => {
      const apiGatewayUrl = localStorage.getItem('apiGatewayUrl');

      const appClientId = localStorage.getItem('appClientId');
      const email = localStorage.getItem(
        'CognitoIdentityServiceProvider.' + appClientId + '.LastAuthUser'
      );
      let token = localStorage.getItem(
        'CognitoIdentityServiceProvider.' +
          appClientId +
          '.' +
          email +
          '.idToken'
      );
      console.log('data:', appClientId, email);
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
    }, 500);
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
