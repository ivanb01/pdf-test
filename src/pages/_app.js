import { useEffect, useState } from 'react';
// import { Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import Head from 'next/head';
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
  localRedirectSignOut,
  productionRedirectSignIn,
  productionRedirectSignOut,
  devRedirectSignIn,
  devRedirectSignOut,
  documentsRedirectSignIn,
  documentsRedirectSignOut,
  subscriptionsRedirectSignIn,
  subscriptionsRedirectSignOut,
} from 'global/variables';
import GetSubtype from '@components/GetSubtype';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PlusButton from '@components/PlusButton';
// import { Head } from 'next/document';
import SendEmailOverlay from '@components/SendEmailSidebar';
import { setOpenEmailContactOverlay } from '@store/global/slice';
import EmailSendComponent from '@components/EmailSendComponent';

const queryClient = new QueryClient();
import { isLocalhost, isDev, isSubscriptions, isDocuments } from '@helpers/env';

import { fetchCurrentUserInfo, saveUserInfo } from '@helpers/auth';

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [helpEffect, setHelpEffect] = useState(false);
  const [marginTop, setMarginTop] = useState(false);
  const [emailBody, setEmailBody] = useState();

  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  useEffect(() => {
    configureAmplifyAuth();
    Auth.currentSession()
      .then(async (item) => {
        localStorage.setItem('currentSession ', JSON.stringify(item));
        console.log('logged in');
        setIsUserAuthenticated(true);
        setHelpEffect(true);
        const info = await fetchCurrentUserInfo();
        saveUserInfo(info);
      })
      .catch((e) => {
        setIsUserAuthenticated(false);
        setHelpEffect(true);
        // console.log('this is happening');
        if (
          !router.asPath.includes('public') &&
          !router.asPath.includes('property') &&
          !router.asPath.includes('sign-up') &&
          !router.asPath.includes('portfolio')
        ) {
          router.push('/authentication/sign-in');
        }
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
            scope: ['email', 'profile', 'openid'],
            redirectSignIn: isLocalhost()
              ? localRedirectSignIn
              : isDev()
                ? devRedirectSignIn
                : isDocuments()
                  ? documentsRedirectSignIn
                  : isSubscriptions()
                    ? subscriptionsRedirectSignIn
                    : productionRedirectSignIn,
            redirectSignOut: isLocalhost()
              ? localRedirectSignOut
              : isDev()
                ? devRedirectSignOut
                : isDocuments()
                  ? documentsRedirectSignOut
                  : isSubscriptions()
                    ? subscriptionsRedirectSignOut
                    : productionRedirectSignOut,
            responseType: 'code',
          },
        },
      };

      Amplify.configure({ ...awsmobile, ssr: true });
      console.log('configured amplify');
      return true;
    } catch (err) {
      console.error('Unable to initialize amplify auth.', err);
      return false;
    }
  };

  useEffect(() => {
    router.pathname == '/property' && document.querySelector('.main-page').classList.add('overflow-y-auto');
  }, [router]);

  return (
    <>
      <div className={`main-app-wrapper`}>
        {/* <div className={`main-page overflow-y-auto overflow-x-hidden`}></div> */}
        <Head>
          <meta name="viewport" content="width=device-width"></meta>
        </Head>
        <div
          className={`main-page overflow-y-auto overflow-x-hidden`}
          style={{ display: 'flex', flexDirection: 'column' }}>
          <Provider store={store}>
            <QueryClientProvider client={queryClient}>
              {isUserAuthenticated && <GetSubtype />}
              <Component {...pageProps} />
              {domLoaded && (
                <Toaster
                  toastOptions={{
                    className: 'bg-gray6 text-white text-sm',
                  }}
                  position="bottom-left"
                />
              )}
              <EmailSendComponent />
            </QueryClientProvider>
          </Provider>
        </div>
      </div>
    </>
  );
};

export default MyApp;
