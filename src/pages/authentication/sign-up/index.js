import axios from 'axios';
import Text from 'components/shared/text';
import Link from 'components/Link';
// import BasicForm from 'components/shared/form';
import facebookIcon from '/public/images/facebook.svg';
import gmailIcon from '/public/images/gmail.svg';
import twitterIcon from '/public/images/twitter.svg';
import Authentication from 'components/Authentication';
import Router from 'next/router';
import Button from 'components/shared/button';
import { useFormik } from 'formik';
import Input from 'components/shared/input';
import toast from 'react-hot-toast';

const planValues = [
  { id: 'basic', name: 'Basic' },
  { id: 'pro', name: 'Pro' },
];
const apiURL =
  'https://cjylzkf22j.execute-api.us-east-1.amazonaws.com/prod//registration';

const SignUp = () => {
  //* FORMIK *//
  const formik = useFormik({
    initialValues: {
      tenantName: '',
      tenantEmail: '',
      tenantPhone: '',
      tenantTier: '',
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values) => {
    try {
      const signUpUser = await axios.post(apiURL, values);
      console.log('signupUser', signUpUser);
      if (signUpUser) {
        Router.push('sign-in');
        // toast.success('Succesfully signed up');
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  };
  return (
    <Authentication>
      <div className="m-auto">
        <Text title className="text-gray5 mb-[10px]">
          Sign Up
        </Text>
        <div className="text-sm leading-5 font-normal text-gray4">
          Already have an account?{' '}
          <Link
            href="#"
            className="underline"
            onClick={() => Router.push('sign-in')}>
            Sign In
          </Link>
          {/* <Text p className="text-gray4 mt-10 mb-6">
            Sign up through
          </Text>
          <div className="flex items-center justify-between mb-6">
            <Button social={facebookIcon} className="mr-2" />
            <Button social={twitterIcon} className="mr-2" />
            <Button social={gmailIcon} />
          </div>
          <Text p className="text-gray4 mb-6">
            Or continue with
          </Text> */}
          <form onSubmit={formik.handleSubmit} className="mt-10">
            <Input
              type="text"
              label="Name"
              id="tenantName"
              className="mb-6"
              onChange={formik.handleChange}
              value={formik.values.tenantName}
            />
            <Input
              type="email"
              label="Email"
              id="tenantEmail"
              className="mb-6"
              onChange={formik.handleChange}
              value={formik.values.tenantEmail}
            />
            <Input
              type="text"
              label="Phone"
              id="tenantPhone"
              className="mb-6"
              onChange={formik.handleChange}
              value={formik.values.tenantPhone}
            />

            <div className="mb-6">
              <label
                htmlFor="tenantTier"
                className="block mb-2 text-sm font-medium text-gray-900">
                Plan
              </label>
              <select
                onChange={formik.handleChange}
                value={formik.values.tenantTier}
                id="tenantTier"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                <option selected>Select one...</option>
                <option value="Basic">Basic</option>
                <option value="Standard">Standard</option>
                <option value="Premium">Premium</option>
                <option disabled value="Platinum">
                  Platinum
                </option>
              </select>
            </div>

            <Button
              type="submit"
              primary
              label="Save"
              className="w-full justify-center"
              onChange={formik.handleChange}
            />
          </form>
          {/* <BasicForm inputs={inputs} handleSubmit={handleSubmit} /> */}
        </div>
      </div>
    </Authentication>
  );
};

export default SignUp;

export async function getStaticProps(context) {
  return {
    props: {
      requiresAuth: false,
    },
  };
}
