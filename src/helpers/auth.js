import { useEffect, useState } from "react";
import Router, { useRouter } from 'next/router'
import toast from 'react-hot-toast';
import { Auth } from 'aws-amplify';

const setAfterSignInRedirect = (redirectionPath, message = '') => {
  sessionStorage.setItem('after-auth-redirect', redirectionPath);
  sessionStorage.setItem('redirection-message', message);
}

const loadAfterSignInRedirect = async (clear = false) => {
  const router = useRouter();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (router.query.code) return;

    const redirectIfSet = async () => {
      const currentUser = await getCurrentUser();
      const isAuthenticated = new Boolean(currentUser);
      const redirectionPath = sessionStorage.getItem('after-auth-redirect');
      const redirectionMessage = sessionStorage.getItem('redirection-message');
      if (!isAuthenticated || !redirectionPath) return;

      setShouldRedirect(true);

      if (clear) {
        sessionStorage.removeItem('after-auth-redirect');
        sessionStorage.removeItem('redirection-message');
      }

      Router.push(redirectionPath);
      
      if (redirectionMessage)
        toast(redirectionMessage, { icon: 'ℹ️' });
    };

    redirectIfSet();
  },[]);

  return shouldRedirect;
}

const isAuthValidRedirect = async (subscriptionPlan = null) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    setAfterSignInRedirect(window.location.pathname, "Now that you signed in, you can pick a plan!");
    Router.push(`/authentication/sign-in`);
    toast('Please sign up before subscribing!', { icon: 'ℹ️' });
    return false;
  }

  return true;
}

const getCurrentUser = async () => {
  let currentUser;

  try {
    currentUser = await Auth.currentAuthenticatedUser();
  } catch (error) {
    return undefined;
  }

  const email = currentUser?.signInUserSession?.idToken?.payload?.email;
  const tenantName = currentUser?.storage?.tenantName;
  const tenantId = currentUser?.signInUserSession?.idToken?.payload['custom:tenantId'];
  const userRole = currentUser?.signInUserSession?.idToken?.payload['custom:userRole'];

  return {
    email,
    tenant: { id: tenantId, name: tenantName },
    userRole,
    userInfo: currentUser
  };
}

export {
  isAuthValidRedirect,
  setAfterSignInRedirect,
  loadAfterSignInRedirect,
  getCurrentUser,
}