import { Amplify, withSSRContext } from 'aws-amplify';

const configureAmplify = () => {
  const data = {
    apiGatewayUrl: process.env.NEXT_PUBLIC_API_URL,
    appClientId: '65o07k7t243s9evjbu4cl40rcn',
    userPoolId: 'us-east-1_ENvP5VYjb',
  };

  const region = data.userPoolId?.split('_')[0];

  const awsmobile = {
    Auth: {
      identityPoolId: 'us-east-1:eefc880f-9315-43f4-ab15-2d995127f5d8',
      region: region,
      userPoolId: data.userPoolId,
      userPoolWebClientId: data.appClientId,
      oauth: {
        domain: 'pooledtenant-serverlesssaas-210580452463.auth.us-east-1.amazoncognito.com',
        scope: ['email', 'profile', 'openid'],
        responseType: 'code',
      },
    },
  };

  Amplify.configure({ ...awsmobile, ssr: true });
};

const getCurrentUser = async (req) => {
  configureAmplify();
  const { Auth } = withSSRContext({ req });

  let user;

  try {
    user = await Auth.currentAuthenticatedUser();
    console.log('user is authenticated ', user.username);
    return { success: true, user };
  } catch (err) {
    console.log('error: no authenticated user', err);
    return { status: 404, error: 'Customer not found' };
  }
};

export { configureAmplify, getCurrentUser };
