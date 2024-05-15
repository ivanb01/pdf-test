import axios from 'axios';
import Text from 'components/shared/text';
import Button from 'components/shared/button';
import Authentication from 'components/Authentication';
import Router from 'next/router';
import { useFormik } from 'formik';
import { Amplify } from 'aws-amplify';
import Dropdown from 'components/shared/dropdown';
import { useState } from 'react';
import Link from 'components/Link';
import {
  localRedirectSignIn,
  localRedirectSignOut,
  devRedirectSignIn,
  devRedirectSignOut,
  productionRedirectSignIn,
  productionRedirectSignOut,
  subscriptionsRedirectSignIn,
  subscriptionsRedirectSignOut,
  documentsRedirectSignIn,
  documentsRedirectSignOut,
} from 'global/variables';

import { isLocalhost, isDev, isSubscriptions, isDocuments } from 'helpers/env';
import Credentials from './index';

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
      const data = {
        apiGatewayUrl: process.env.NEXT_PUBLIC_API_URL,
        appClientId: process.env.NEXT_PUBLIC_COGNITO_APP_CLIENT_ID,
        userPoolId: process.env.NEXT_PUBLIC_COGNITO_POOL_ID,
      };
      console.log(data);
      if (!data.userPoolId || !data.appClientId) {
        return false;
      }
      localStorage.setItem('tenantName', values.tenantName);
      localStorage.setItem('apiGatewayUrl', data.apiGatewayUrl);
      localStorage.setItem('appClientId', data.appClientId);
      localStorage.setItem('userPoolId', data.userPoolId);

      const region = data.userPoolId?.split('_')[0];
      const awsmobile = {
        Auth: {
          region: region,
          userPoolId: data.userPoolId,
          userPoolWebClientId: data.appClientId,
          oauth: {
            domain: process.env.NEXT_PUBLIC_COGNITO_DOMAIN,
            scope: ['email', 'profile', 'openid'],
            redirectSignIn: isLocalhost()
              ? localRedirectSignIn
              : isDev()
                ? devRedirectSignIn
                : isSubscriptions()
                  ? subscriptionsRedirectSignIn
                  : isDocuments()
                    ? documentsRedirectSignIn
                    : productionRedirectSignIn,
            redirectSignOut: isLocalhost()
              ? localRedirectSignOut
              : isDev()
                ? devRedirectSignOut
                : isSubscriptions()
                  ? subscriptionsRedirectSignOut
                  : isDocuments()
                    ? documentsRedirectSignOut
                    : productionRedirectSignOut,
            responseType: 'code',
          },
        },
      };
      Amplify.configure({ ...awsmobile, ssr: true });

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
      label: 'Oxford Property Group',
    },
    {
      id: 2,
      label: 'Level Group',
    },
    {
      id: 3,
      label: 'Spire Group',
    },
  ];

  return (
    <Authentication>
      <div className="m-auto">
        {/*<div className="text-onelineMainColor md:mb-[50px] mb-8 text-lg md:text-3xl font-extrabold">*/}
        {/*  Choose your brokerage*/}
        {/*</div>*/}
        <Text p className="text-gray4 mb-[50px]">
          Don't have an account?&nbsp;
          <Link href="#" className="underline" onClick={() => Router.push('sign-up')}>
            Sign Up
          </Link>
        </Text>
        <form onSubmit={formik.handleSubmit}>
          {/*<Dropdown*/}
          {/*  className="mb-6 w-full text-sm"*/}
          {/*  label="Brokerage Name"*/}
          {/*  options={brokerageNameOptions}*/}
          {/*  initialSelect={brokerageNameOptions[0].label}*/}
          {/*  handleSelect={(item) => {*/}
          {/*    // if (item.name == 'Other') {*/}
          {/*    //   setShowOther(true);*/}
          {/*    // } else {*/}
          {/*    //   setShowOther(false);*/}
          {/*    // }*/}
          {/*    formik.values.tenantName = item.label;*/}
          {/*  }}*/}
          {/*/>*/}
          {/*<Credentials />*/}

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

// export async function getServerSideProps(context) {
//   return {
//     props: {
//       requiresAuth: false,
//     },
//   };
// }
