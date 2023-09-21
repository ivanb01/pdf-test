import Authentication from 'components/Authentication';
import Text from 'components/shared/text';
import Button from 'components/shared/button';
import Input from 'components/shared/input';
import Link from 'components/Link';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { Auth } from 'aws-amplify';
// import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useState } from 'react';
import NotificationAlert from 'components/shared/alert/notification-alert';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

const ResetPassword = () => {
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

  const [loadingButton, setLoadingButton] = useState(false);
  const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;

  const ResetPasswordSchema = Yup.object().shape({
    code: Yup.string().required('Field can not be empty'),
    password: Yup.string()
      .required('Field cannoot be empty')
      .matches(passwordRules, { message: 'StrongPasswordRequired' }),
    confirmPassword: Yup.string()
      .required('Field cannoot be empty')
      .when('password', {
        is: (val) => val && val.length > 0,
        then: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match'),
      }),
  });

  //* FORMIK *//
  const formik = useFormik({
    initialValues: {
      code: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: ResetPasswordSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values, { setFieldError }) => {
      handleSubmit(values, setFieldError);
    },
  });

  const { errors, touched } = formik;

  const handleSubmit = async (values, setFieldError) => {
    setLoadingButton(true);
    try {
      await Auth.forgotPasswordSubmit(router.query.username, values.code, values.password);
      displayAlert('success', 'Password has been changed successfully!', 2000);
      setTimeout(() => {
        router.push('sign-in/credentials');
      }, 2000);
    } catch (error) {
      console.log(error);
      setFieldError('code', 'Invalid code provided');
      setLoadingButton(false);
    }
  };

  return (
    <Authentication>
      <div className="max-w-[370px]">
        {alert.showAlert && alert.alertType == 'success' && (
          <NotificationAlert className="mb-8 p-4" type={alert.alertType}>
            <div className="flex items-center">
              <CheckCircleRoundedIcon className="text-green-400 mr-3.5" /> {alert.alertText}
            </div>
          </NotificationAlert>
        )}
        <Text onBackClick={() => router.back()} title className="text-gray5 mb-6">
          Reset Password
        </Text>
        <Text p className="text-gray4 mb-6">
          You have received a security code in your email. Please write that code below, and then set a new password for
          your account.
        </Text>
        <form onSubmit={formik.handleSubmit}>
          <Input
            type="text"
            label="Security Code"
            id="code"
            className="mb-6"
            onChange={formik.handleChange}
            error={errors.code && touched.code}
            errorText={errors.code}
          />
          <Input
            type="password"
            label="Password"
            id="password"
            className="mb-6"
            onChange={formik.handleChange}
            error={errors.password && touched.password}
            errorText={errors.password == 'StrongPasswordRequired' ? null : errors.password}
          />
          <Input
            type="password"
            label="Confirm Password"
            id="confirmPassword"
            className="mb-6"
            onChange={formik.handleChange}
            error={(errors.confirmPassword && touched.confirmPassword) || errors.password == 'StrongPasswordRequired'}
            errorText={errors.password == 'StrongPasswordRequired' ? null : errors.confirmPassword}
          />
          {errors.password == 'StrongPasswordRequired' && (
            <NotificationAlert className="mb-8 p-4" type="error">
              <>
                <p className="mb-2">Your password must contain:</p>
                <ul className="list-disc font-normal pl-4">
                  <li>At least 8 characters </li>
                  <li>1 uppercase character</li>
                  <li>1 lowercase character</li>
                  <li>1 number or special character</li>
                  <li>1 special character</li>
                </ul>
              </>
            </NotificationAlert>
          )}
          <Button
            type="submit"
            primary
            label="Reset password"
            className="w-full justify-center"
            loading={loadingButton}
          />
        </form>
        <div className="flex items-center justify-between my-6">
          <Link href="#" className="font-medium text-sm" onClick={() => router.push('sign-in/credentials')}>
            Back to sign in?
          </Link>
        </div>
      </div>
    </Authentication>
  );
};

export default ResetPassword;

export async function getServerSideProps(context) {
  return {
    props: {
      requiresAuth: false,
    },
  };
}
