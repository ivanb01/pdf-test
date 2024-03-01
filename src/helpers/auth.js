import { useEffect, useState } from "react";
import Router, { useRouter } from 'next/router'
import toast from 'react-hot-toast';
import { Auth } from 'aws-amplify';
import { getUser, updateUser } from 'api/user';

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
  const info = getUserInfo();

  return {
    email,
    tenant: { id: tenantId, name: tenantName },
    userRole,
    userInfo: currentUser,
    info,
  };
}

const getUserInfo = () => JSON.parse(localStorage.getItem('userInfo') || '{}') || {};

const fetchCurrentUserInfo = async () => {
  const response = await getUser()
  .then(r => r.json())
  .catch(err => console.error(err));

  return response?.message;
}

const saveUserInfo = async (info) => info && localStorage.setItem('userInfo', JSON.stringify(info))

const updateUserInfo = async (userInfo) => {
  const { first_name, last_name, phone_number, email, tenantId } = userInfo;

  try {
    const userData = JSON.stringify({
      first_name,
      last_name,
      phone_number,
      email,
      tenantId
    });

    const response = await updateUser(userData);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('User info updated successfully:', data);
    return data;
  } catch (error) {
    console.error('Error occurred while updating user info:', error);
    // Handle errors as needed
  }
};

export {
  isAuthValidRedirect,
  setAfterSignInRedirect,
  loadAfterSignInRedirect,
  getCurrentUser,
  fetchCurrentUserInfo,
  saveUserInfo,
  updateUserInfo,
}