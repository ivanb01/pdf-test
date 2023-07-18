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

const SignUp = () => {
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
          <Text p className="text-gray4 mt-10 mb-6">
            Sign up through
          </Text>
          <div className="flex items-center justify-between mb-6">
            <Button social={facebookIcon} className="mr-2" />
            <Button social={twitterIcon} className="mr-2" />
            <Button social={gmailIcon} />
          </div>
          <Text p className="text-gray4 mb-6">
            Or continue with
          </Text>
          <form onSubmit={formik.handleSubmit}>
            <Input
              type="text"
              label="First Name"
              id="firstName"
              className="mb-6"
            />
            <Input
              type="text"
              label="Last Name"
              id="lastName"
              className="mb-6"
            />
            <Input type="email" label="Email" id="phone" className="mb-6" />
            <Input
              type="password"
              label="Password"
              id="password"
              className="mb-6"
            />
            <Input
              type="password"
              label="Confirm Password"
              id="confirmPassword"
              className="mb-6"
            />
            <Button
              type="submit"
              primary
              label="Save"
              className="w-full justify-center"
            />
          </form>
          {/* <BasicForm inputs={inputs} handleSubmit={handleSubmit} /> */}
        </div>
      </div>
    </Authentication>
  );
};

export default SignUp;
