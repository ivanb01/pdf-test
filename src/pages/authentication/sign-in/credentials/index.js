import axios from 'axios';
import Text from 'components/shared/text';
import Input from 'components/shared/input';
import Link from 'components/Link';
import Button from 'components/shared/button';
import GoogleButton from 'components/shared/button/google-button';
import Authentication from 'components/Authentication';
import { useRouter } from 'next/router';
import facebookIcon from '/public/images/facebook.svg';
import gmailIcon from '/public/images/gmail.svg';
import twitterIcon from '/public/images/twitter.svg';
import { useFormik } from 'formik';
import { Auth } from 'aws-amplify';
import { useState } from 'react';
import { accordionClasses } from '@mui/material';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import NotificationAlert from 'components/shared/alert/notification-alert';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { useDispatch } from 'react-redux';
import { setUser } from 'store/global/slice';

const brokerageEmails = {
  'Oxford Property Group': '@opgny.com',
  'Level Group': '@levelgroupny.com',
  'Spire Group': '@spiregroupny.com',
};

const SignIn = () => {
  const dispatch = useDispatch();
  const signInWithGoogle = async () => {
    try {
      await Auth.federatedSignIn({ provider: 'Google' });
      user = await Auth.currentAuthenticatedUser();
      console.log('the user is here: ', user);
    } catch (error) {
      console.log('fail', error);
    }
  };

  const router = useRouter();
  const [alert, setAlert] = useState({
    showAlert: false,
    alertType: '',
    alertText: '',
  });
  const displayAlert = (alertType, alertText, duration) => {
    setAlert({
      showAlert: true,
      alertType: alertType,
      alertText: alertText,
    });
    setTimeout(() => {
      setAlert({
        showAlert: false,
        alertType: '',
        alertText: '',
      });
    }, duration);
  };

  const [newPasswordRequired, setNewPasswordRequired] = useState(false);
  const [cognitoUser, setCognitoUser] = useState(null);
  const [loadingButton, setLoadingButton] = useState(null);
  const passwordRules =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;

  //* FORMIK change password*//
  const NewPasswordRequiredSchema = Yup.object().shape({
    password: Yup.string()
      .required('Field can not be empty')
      .matches(passwordRules, { message: 'StrongPasswordRequired' }),
    confirmPassword: Yup.string()
      .required('Field can not be empty')
      .when('password', {
        is: (val) => val && val.length > 0,
        then: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match'),
      }),
  });

  const formikPass = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: NewPasswordRequiredSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      handleSubmitPass(values);
    },
  });

  const { errors: errorsPass, touched: touchedPass } = formikPass;

  const handleSubmitPass = async (values) => {
    setLoadingButton(true);
    try {
      await Auth.completeNewPassword(cognitoUser, values.password);
      await Auth.currentSession();
      displayAlert('success', 'Password has been changed successfully!', 2000);
      setTimeout(() => {
        router.push('/contacts/clients');
      }, 2000);
    } catch (error) {
      setLoadingButton(false);
      displayAlert('error', error.message, 4000);
    }

    // Auth.completeNewPassword(cognitoUser, values.password)
    //   .then((user) => {
    //     Auth.currentSession().then((data) => {
    //       // toast.success('New password has been saved');
    //       // router.push('../../my-profile');
    //       displayAlert('success', 'Password has been changed successfully!', 2000)
    //       setTimeout(() => {
    //         router.push('/contacts/clients');
    //       }, 2000);
    //     });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setLoadingButton(false);
    //     displayAlert('error', error.message, 4000)
    //     // toast.error(error?.message);
    //   });
  };

  //* FORMIK *//
  const SignInSchema = Yup.object().shape({
    userName: Yup.string().required('Field can not be empty'),
    password: Yup.string().required('Field can not be empty'),
  });

  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
    },
    validationSchema: SignInSchema,
    onSubmit: (values, { setFieldError }) => {
      handleSubmit(values, setFieldError);
    },
  });

  const { errors, touched } = formik;

  const handleSubmit = async (values, setFieldError) => {
    setLoadingButton(true);
    try {
      const user = await Auth.signIn(
        values.userName.toLowerCase(),
        values.password,
      );
      if (user?.challengeName !== 'NEW_PASSWORD_REQUIRED') {
        // displayAlert('success', 'Login successfully', 2000);

        setTimeout(() => {
          dispatch(setUser(user.attributes.email));
          localStorage.setItem('user', JSON.stringify(user.attributes.email));
          router.push('/contacts/clients');
        }, 2000);
      } else {
        setCognitoUser(user);
        setNewPasswordRequired(true);
        setLoadingButton(false);
      }
      console.log('response from signin', user);
    } catch (error) {
      setLoadingButton(false);
      setFieldError('password', 'Invalid email or password. Please try again!');
    }
  };

  return (
    <Authentication>
      {newPasswordRequired ? (
        <div className="m-auto">
          {alert.showAlert && alert.alertType == 'success' && (
            <NotificationAlert className="mb-8 p-4" type={alert.alertType}>
              <div className="flex items-center">
                <CheckCircleRoundedIcon className="text-green-400 mr-3.5" />{' '}
                {alert.alertText}
              </div>
            </NotificationAlert>
          )}
          <Text
            title
            className="text-gray5 mb-6"
            onBackClick={() => router.push('/authentication/sign-in')}>
            Change password
          </Text>
          <Text p className="text-gray4 mb-6 text-center">
            You are required to set a new password for your account.
          </Text>

          <form onSubmit={formikPass.handleSubmit}>
            <Input
              type="password"
              label="Password"
              id="password"
              className="mb-6"
              onChange={formikPass.handleChange}
              error={errorsPass.password && touchedPass.password}
              errorText={
                errorsPass.password == 'StrongPasswordRequired'
                  ? null
                  : errorsPass.password
              }
            />
            <Input
              type="password"
              label="Confirm Password"
              id="confirmPassword"
              className="mb-6"
              onChange={formikPass.handleChange}
              error={
                (errorsPass.confirmPassword && touchedPass.confirmPassword) ||
                errorsPass.password == 'StrongPasswordRequired'
              }
              errorText={
                errorsPass.password == 'StrongPasswordRequired'
                  ? null
                  : errorsPass.confirmPassword
              }
            />
            {errorsPass.password == 'StrongPasswordRequired' && (
              <NotificationAlert className="mb-8 p-4" type="error">
                <>
                  <p className="mb-2">Your password must contain:</p>
                  <ul className="list-disc font-normal pl-4">
                    <li>At least 8 characters</li>
                    <li>1 uppercase character</li>
                    <li>1 lowercase character</li>
                    <li>1 number or special character</li>
                    <li>1 special character</li>
                  </ul>
                </>
              </NotificationAlert>
            )}
            {alert.showAlert && alert.alertType == 'error' && (
              <NotificationAlert
                className="mt-3 mb-6 p-4"
                type={alert.alertType}>
                {alert.alertText}
              </NotificationAlert>
            )}
            <Button
              loading={loadingButton}
              type="submit"
              primary
              label="Save"
              className="w-full justify-center"
            />
          </form>
        </div>
      ) : (
        <div className="m-auto">
          {alert.showAlert && alert.alertType == 'success' && (
            <NotificationAlert className="mb-8 p-4" type={alert.alertType}>
              <div className="flex items-center">
                <CheckCircleRoundedIcon className="text-green-400 mr-3.5" />{' '}
                {alert.alertText}
              </div>
            </NotificationAlert>
          )}
          <Text
            title
            className="text-onelineMainColor mb-[50px]"
            onBackClick={() => router.push('/authentication/sign-in')}>
            Sign In
          </Text>
          {/* <form onSubmit={formik.handleSubmit}>
            <Input
              type="text"
              label="Email"
              id="userName"
              className="mb-6"
              onChange={formik.handleChange}
              error={
                (errors.userName && touched.userName) ||
                errors.password ==
                  'Invalid email or password. Please try again!'
              }
              errorText={errors.userName}
            />
            <Input
              type="password"
              label="Password"
              id="password"
              className="mb-6"
              iconAfter={true}
              onChange={formik.handleChange}
              error={errors.password && touched.password}
              errorText={errors.password}
            />
            <Button
              loading={loadingButton}
              type="submit"
              primary
              label="Sign in"
              className="bg-blue2 w-full justify-center"
            />
            </form>*/}

          {/* <Input type="checkbox" placeholder="Remember me" value="Remember me" /> */}
          {/* <div className="flex items-center justify-between my-6">
            <Link
              href="#"
              className="font-medium text-sm"
              onClick={() => router.push('forgot-password')}
            >
              Forgot Password?
            </Link>
          </div>  */}

          {/* <Text
            p
            className="text-gray6 mb-6 justify-center before:conent-[''] before:flex-auto before:border before:mr-2 after:conent-[''] after:flex-auto after:border after:ml-2"
          >
            Or continue with
          </Text>
          <div className="flex items-center justify-between mb-6">
            <Button
              social={facebookIcon}
              className="pointer-events-none mr-2 opacity-0"
            />
            <Button social={gmailIcon} onClick={signInWithGoogle} />
            <Button
              social={twitterIcon}
              className="pointer-events-none mr-2 opacity-0"
            />
          </div> */}
          <GoogleButton
            onClick={signInWithGoogle}
            label="Sign in with Google"
          />
        </div>
      )}
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
