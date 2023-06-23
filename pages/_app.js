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
import '/styles/_global.scss';
import {
  localRedirectSignIn,
  productionRedirectSignIn,
  localRedirectSignOut,
  productionRedirectSignOut,
} from 'global/variables';

const isLocalhost =
  typeof window !== 'undefined' &&
  Boolean(
    window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
  );

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
    if (document.querySelector('.main-menu')) {
      setMarginTop(
        document.querySelector('.main-menu').classList.contains('fixed')
          ? true
          : false
      );
    }
  });

  useEffect(() => {
    configureAmplifyAuth();

    Auth.currentSession()
      .then((item) => {
        console.log('auth currentsession done');
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
        console.log('redirect sign-in');
        router.push('/authentication/sign-in');
      }
      if (
        !pageProps.requiresAuth &&
        isUserAuthenticated &&
        !localStorage.getItem('user')
      ) {
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
            domain:
              'pooledtenant-serverlesssaas-210580452463.auth.us-east-1.amazoncognito.com',
            // scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
            scope: ['email', 'profile', 'openid'],
            redirectSignIn: isLocalhost
              ? localRedirectSignIn
              : productionRedirectSignIn,
            redirectSignOut: isLocalhost
              ? localRedirectSignOut
              : productionRedirectSignOut,
            responseType: 'code',
          },
        },
      };

      Amplify.configure(awsmobile);
      console.log('true from config AmplifyAuth');

      return true;
    } catch (err) {
      console.error('Unable to initialize amplify auth.', err);
      return false;
    }
  };

  const cleanLocalStorage = () => {
    localStorage.removeItem('tenantName');
    localStorage.removeItem('userPoolId');
    localStorage.removeItem('appClientId');
    localStorage.removeItem('apiGatewayUrl');
    localStorage.removeItem('token');
  };

  // if (
  //   pageProps.requiresAuth &&
  //   !isUserAuthenticated &&
  //   typeof window !== 'undefined'
  // ) {
  //   var ranOnce = localStorage.getItem('ranOnce')
  //     ? localStorage.getItem('ranOnce')
  //     : false;
  //   if (!ranOnce) {
  //     window.location.reload();
  //     localStorage.setItem('ranOnce', 'true');
  //   }
  // }

  // if (!pageProps.requiresAuth && isUserAuthenticated) {
  //   return (
  //     <div>
  //       <h1>Loading...</h1>
  //     </div>
  //   );
  // }

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        ></link>
        <script src="https://unpkg.com/flowbite@1.3.4/dist/datepicker.js"></script>
        <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.fwSettings={
                'widget_id':150000003307
              };
              !function(){if("function"!=typeof window.FreshworksWidget){var n=function(){n.q.push(arguments)};n.q=[],window.FreshworksWidget=n}}() 
            `,
          }}
        />
        <script
          src="https://widget.freshworks.com/widgets/150000003307.js"
          async
          defer
        />
      </Head>
      {/* <Script src="https://unpkg.com/flowbite@1.3.3/dist/flowbite.js"></Script> */}
      <div className="main-app-wrapper">
        {/* <Sidebar /> */}
        <div
          className={`main-page overflow-y-auto`}
          style={{ marginTop: marginTop ? '68px' : '0px' }}
        >
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
