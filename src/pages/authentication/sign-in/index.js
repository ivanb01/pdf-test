import axios from 'axios';
import Text from 'components/shared/text';
import Button from 'components/shared/button';
import Authentication from 'components/Authentication';
import Router from 'next/router';
import { useFormik } from 'formik';
import { Amplify, Auth } from 'aws-amplify';
import Dropdown from 'components/shared/dropdown';
import { useState } from 'react';
import toast from 'react-hot-toast';
import {
  localRedirectSignIn,
  devRedirectSignIn,
  productionRedirectSignIn,
  localRedirectSignOut,
  productionRedirectSignOut,
  devRedirectSignOut,
} from 'global/variables';

const isLocalhost =
  typeof window !== 'undefined' &&
  Boolean(
    window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/,
      ),
  );

const isDev =
  typeof window !== 'undefined' &&
  Boolean(window.location.hostname.includes('dev'));

const SignIn = () => {
  //* FORMIK *//
  const formik = useFormik({
    initialValues: { tenantName: 'Oxford Property Group' },
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const [loadingButton, setLoadingButton] = useState(false);
  const [showOther, setShowOther] = useState(false);

  const handleSubmit = async (values) => {
    setLoadingButton(true);
    try {
      // Todo: change it later for dynamic if needed
      // const { data } = await axios.get(
      //   `https://ul3tbvf5h9.execute-api.us-east-1.amazonaws.com/prod//tenant/init/${values.tenantName}`
      // );
      const data = {
        apiGatewayUrl:
          'https://ul3tbvf5h9.execute-api.us-east-1.amazonaws.com/prod/',
        appClientId: '65o07k7t243s9evjbu4cl40rcn',
        userPoolId: 'us-east-1_ENvP5VYjb',
      };
      localStorage.setItem('tenantName', values.tenantName);
      localStorage.setItem('apiGatewayUrl', data.apiGatewayUrl);
      localStorage.setItem('appClientId', data.appClientId);
      localStorage.setItem('userPoolId', data.userPoolId);

      const userPoolId = localStorage.getItem('userPoolId');
      const appClientId = localStorage.getItem('appClientId');

      if (!userPoolId || !appClientId) {
        return false;
      }
      console.log('islocahost, isdev', isLocalhost, isDev);
      const region = userPoolId?.split('_')[0];
      const awsmobile = {
        Auth: {
          // identityPoolId: 'us-east-1:eefc880f-9315-43f4-ab15-2d995127f5d8',
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
              : isDev
              ? devRedirectSignIn
              : productionRedirectSignIn,
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

      console.log('aws config input', awsmobile);
      // toast.success('You gave the Brokerage name successfully');

      Router.push('sign-in/credentials');
    } catch (error) {
      console.log(error);
      // toast.error('You gave the Brokerage name incorrectly');
      localStorage.removeItem('tenantName');
      localStorage.removeItem('apiGatewayUrl');
      localStorage.removeItem('appClientId');
      localStorage.removeItem('userPoolId');
      setLoadingButton(false);
      // response -> tenant name is incorrect
      // remove data from local storage
    }
  };

  const brokerageNameOptions = [
    {
      id: 1,
      name: 'Oxford Property Group',
    },
    {
      id: 2,
      name: 'Level Group',
    },
    {
      id: 3,
      name: 'Spire Group',
    },
  ];

  return (
    <Authentication>
      <div className="m-auto">
        <div className="text-onelineMainColor md:mb-[50px] mb-8 text-lg md:text-3xl font-extrabold">
          Choose your brokerage
        </div>
        {/* <Text p className="text-gray4 mb-[50px]">
          Don't have an account?{' '}
          <Link
            href="#"
            className="underline"
            onClick={() => Router.push('sign-up')}
          >
            Sign Up
          </Link>
        </Text> */}
        <form onSubmit={formik.handleSubmit}>
          <Dropdown
            className="mb-6 w-full text-sm"
            label="Brokerage Name"
            options={brokerageNameOptions}
            initialSelect={brokerageNameOptions[0].name}
            handleSelect={(item) => {
              // if (item.name == 'Other') {
              //   setShowOther(true);
              // } else {
              //   setShowOther(false);
              // }
              formik.values.tenantName = item.name;
            }}
          />
          {/* {showOther && (
            <Input
              type="text"
              className="mb-6"
              placeholder="Type in custom brokerage name"
              onInput={(event) =>
                (formik.values.tenantName = event.target.value)
              }
            />
          )} */}

          <Button
            loading={loadingButton}
            type="submit"
            primary
            label="Continue"
            className="bg-blue2 w-full justify-center"
          />
        </form>
      </div>
    </Authentication>
  );
};

export default SignIn;

export async function getStaticProps(context) {
  return {
    props: {
      requiresAuth: false,
    },
  };
}
