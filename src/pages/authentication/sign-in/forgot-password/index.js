import Authentication from 'components/Authentication';
import Button from 'components/shared/button';
import Input from 'components/shared/input';
import Text from 'components/shared/text';
import Link from 'components/Link';
import { useRouter } from 'next/router';

import { useFormik } from 'formik';
import { Auth } from 'aws-amplify';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useState } from 'react';

const ForgotPassword = () => {
  const router = useRouter();
  const [loadingButton, setLoadingButton] = useState(false);

  const ForgotPasswordSchema = Yup.object().shape({
    userName: Yup.string().required('Field can not be empty'),
  });

  const formik = useFormik({
    initialValues: {
      userName: '',
    },
    validationSchema: ForgotPasswordSchema,
    onSubmit: (values, { setFieldError }) => {
      handleSubmit(values, setFieldError);
    },
  });

  const { errors, touched } = formik;

  const handleSubmit = async (values, setFieldError) => {
    setLoadingButton(true);
    try {
      await Auth.forgotPassword(values.userName);
      router.push(
        {
          pathname: '../reset-password',
          query: { username: values.userName },
        },
        '../reset-password',
      );
    } catch (error) {
      console.log(error);
      setFieldError('userName', 'Invalid email. Please try again!');
      setLoadingButton(false);
    }
  };

  return (
    <Authentication>
      <Text onBackClick={() => router.push('credentials')} title className="text-gray5 mb-6">
        Forgot Password
      </Text>
      <Text p className="text-gray4 mb-6">
        Please write your email, and we will send code to your email.
      </Text>
      <form onSubmit={formik.handleSubmit}>
        <Input
          id="userName"
          label="Email"
          className="mb-6"
          onChange={formik.handleChange}
          error={errors.userName && touched.userName}
          errorText={errors.userName}
        />
        <Button type="submit" label="Send code" className="bg-blue2 w-full justify-center" loading={loadingButton} />
      </form>
      <div className="flex items-center justify-between my-6">
        <Link href="#" className="font-medium text-sm" onClick={() => router.push('credentials')}>
          Back to sign in?
        </Link>
      </div>
    </Authentication>
  );
};

export default ForgotPassword;

// export async function getServerSideProps(context) {
//   return {
//     props: {
//       requiresAuth: false,
//     },
//   };
// }
