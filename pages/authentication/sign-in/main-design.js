import Text from 'components/shared/text';
import Input from 'components/shared/input';
import Link from 'components/Link';
import Button from 'components/shared/button';
import Authentication from 'components/Authentication';
import Router from 'next/router';
import facebookIcon from 'public/images/facebook.svg';
import gmailIcon from 'public/images/gmail.svg';
import twitterIcon from 'public/images/twitter.svg';
import { useFormik } from 'formik';

const options = [
  { id: 1, name: 'Wade Cooper' },
  { id: 2, name: 'Arlene Mccoy' },
  { id: 3, name: 'Devon Webb' },
  { id: 4, name: 'Tom Cook' },
  { id: 5, name: 'Tanya Fox' },
  { id: 6, name: 'Hellen Schmidt' },
  { id: 7, name: 'Caroline Schultz' },
  { id: 8, name: 'Mason Heaney' },
  { id: 9, name: 'Claudie Smitham' },
  { id: 10, name: 'Emil Schaefer' },
];

const SignIn = () => {
  //* FORMIK *//
  const formik = useFormik({
    initialValues: {},
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = (values) => {
    console.log(values);
    handleAddingProfile(false)();
  };
  return (
    <Authentication>
      <div className="m-auto">
        <Text title className="text-gray5 mb-[8px]">
          Sign In
        </Text>
        <Text p className="text-gray4 mb-[50px]">
          Don't have an account?{' '}
          <Link
            href="#"
            className="underline"
            onClick={() => Router.push('sign-up')}
          >
            Sign Up
          </Link>
        </Text>
        {/* <Text p className="text-gray4 mb-6">
          Sign in through
        </Text>
        <div className="flex items-center justify-between mb-6">
          <Button social={facebookIcon} className="mr-2" />
          <Button social={twitterIcon} className="mr-2" />
          <Button social={gmailIcon} />
        </div>
        <Text p className="text-gray4 mb-6">
          Or continue with
        </Text> */}
        <form onSubmit={formik.handleSubmit}>
          <Input type="email" label="Email" id="email" className="mb-6" />
          <Input
            type="password"
            label="Password"
            id="password"
            className="mb-6"
            onChange={formik.handleChange}
          />
          <Input
            type="checkbox"
            placeholder="Remember Me"
            id="rememberMe"
            className="mb-6"
            showForgotPassword
            onChange={formik.handleChange}
          />
          <Button
            type="submit"
            primary
            label="Save"
            className="w-full justify-center"
          />
        </form>
        {/* <BasicForm inputs={inputs} handleSubmit={handleSubmit} /> */}
        {/* <Input label="Email address" optional className="mb-6" />
      <Input type="Password" label="Password" className="mb-6" />
      <div className="flex items-center justify-between mb-6">
        <Input type="checkbox" placeholder="Remember me" value="Remember me" />
        <Link
          href="#"
          className="font-medium text-sm"
          onClick={() => Router.push('sign-in/forgot-password')}
        >
          Forgot Password?
        </Link>
      </div>
      <Button label="Sign In" className="w-full justify-center" /> */}
      </div>
    </Authentication>
  );
};

export default SignIn;
