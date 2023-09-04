import { useEffect, useState } from 'react';
// import { Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
// import Head from 'next/head';
import store from '../store';
import 'pages/contacts/details/styles.scss';
import 'components/client-details-sidebar/styles.scss';
import 'simplebar/src/simplebar.css';
import 'components/shared/input/styles.scss';
import { Amplify, Auth } from 'aws-amplify';
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';
import 'shepherd.js/dist/css/shepherd.css';
import '../styles/_global.scss';
import {
  localRedirectSignIn,
  productionRedirectSignIn,
  devRedirectSignIn,
  localRedirectSignOut,
  productionRedirectSignOut,
  devRedirectSignOut,
} from 'global/variables';

const isLocalhost =
  typeof window !== 'undefined' &&
  Boolean(
    window.location.hostname.includes('localhost') ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/),
  );

const isDev = typeof window !== 'undefined' && Boolean(window.location.hostname.includes('dev'));

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [helpEffect, setHelpEffect] = useState(false);
  const [marginTop, setMarginTop] = useState(false);

  const [domLoaded, setDomLoaded] = useState(false);
  useEffect(() => {
    setDomLoaded(true);
  }, []);

  useEffect(() => {
    configureAmplifyAuth();

    Auth.currentSession()
      .then((item) => {
        localStorage.setItem('currentSession', JSON.stringify(item));
        setIsUserAuthenticated(true);
        setHelpEffect(true);
      })
      .catch((e) => {
        setIsUserAuthenticated(false);
        setHelpEffect(true);
        console.log('error', e);
      });
  }, []);

  useEffect(() => {
    if (helpEffect) {
      if (pageProps.requiresAuth && !isUserAuthenticated) {
        router.push('/authentication/sign-in');
      }
      if (!pageProps.requiresAuth && isUserAuthenticated && !localStorage.getItem('user')) {
        router.push('/contacts/clients');
      }
    }
  }, [helpEffect, isUserAuthenticated]);

  const configureAmplifyAuth = () => {
    try {
      const userPoolId = localStorage.getItem('userPoolId');
      const appClientId = localStorage.getItem('appClientId');

      if (!userPoolId || !appClientId) {
        return false;
      }
      const region = userPoolId?.split('_')[0];
      const awsmobile = {
        Auth: {
          region: region,
          userPoolId: userPoolId,
          userPoolWebClientId: appClientId,
          oauth: {
            domain: 'pooledtenant-serverlesssaas-210580452463.auth.us-east-1.amazoncognito.com',
            // scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
            scope: ['email', 'profile', 'openid'],
            redirectSignIn: isLocalhost ? localRedirectSignIn : isDev ? devRedirectSignIn : productionRedirectSignIn,
            redirectSignOut: isLocalhost
              ? localRedirectSignOut
              : isDev
              ? devRedirectSignOut
              : productionRedirectSignOut,
            responseType: 'code',
          },
        },
      };

      Amplify.configure(awsmobile);

      return true;
    } catch (err) {
      console.error('Unable to initialize amplify auth.', err);
      return false;
    }
  };

  useEffect(() => {
    console.log(router.pathname);
    router.pathname == '/property' && document.querySelector('.main-page').classList.add('overflow-y-auto');
  }, [router]);

  return (
    <>
      <div className={`main-app-wrapper`}>
        <div className={`main-page`}>
          <Provider store={store}>
            <Component {...pageProps} />
            {domLoaded && (
              <Toaster
                toastOptions={{
                  className: 'bg-gray6 text-white text-sm',
                }}
                position="bottom-left"
              />
            )}
          </Provider>
        </div>
      </div>
    </>
  );
};

export default MyApp;
