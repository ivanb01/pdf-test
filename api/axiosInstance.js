import axios from 'axios';
import { Auth } from 'aws-amplify';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  async (config) => {
    const apiGatewayUrl = localStorage.getItem('apiGatewayUrl');

    const appClientId = localStorage.getItem('appClientId');
    // const email = localStorage.getItem(
    //   'CognitoIdentityServiceProvider.' + appClientId + '.LastAuthUser'
    // );
    const user = await Auth.currentAuthenticatedUser();
    const email = user.username;
    console.log(user);
    let token = localStorage.getItem(
      'CognitoIdentityServiceProvider.' + appClientId + '.' + email + '.idToken'
    );
    console.log(appClientId, email, token);
    if (!token) {
      const currentSession = await Auth.currentSession();
      token = currentSession.idToken.jwtToken;
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
