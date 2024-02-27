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
axiosInstance.interceptors.request.use(function (config) {
  const apiGatewayUrl = localStorage.getItem('apiGatewayUrl');

  return new Promise((resolve, reject) => {
    Auth.currentSession()
      .then((session) => {
        let idTokenExpire = session.getIdToken().getExpiration();
        let refreshToken = session.getRefreshToken();
        let currentTimeSeconds = Math.round(+new Date() / 1000);
        if (idTokenExpire < currentTimeSeconds) {
          Auth.currentAuthenticatedUser()
            .then((res) => {
              res.refreshSession(refreshToken, (err, data) => {
                if (err) {
                  Auth.signOut();
                  reject(err);
                } else {
                  config.headers.Authorization = 'Bearer ' + data.getIdToken().getJwtToken();
                  config.baseURL = apiGatewayUrl;
                  config.headers.common['Accept'] = 'application/json';
                  resolve(config);
                }
              });
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          config.headers.Authorization = 'Bearer ' + session.getIdToken().getJwtToken();
          config.baseURL = apiGatewayUrl;
          config.headers.common['Accept'] = 'application/json';
          resolve(config);
        }
      })
      .catch((error) => {
        resolve(config);
      });
  });
});

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
