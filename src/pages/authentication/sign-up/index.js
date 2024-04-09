import axios from 'axios';
import Text from 'components/shared/text';
import Link from 'components/Link';
import Authentication from 'components/Authentication';
import Router from 'next/router';
import Button from 'components/shared/button';
import { useFormik } from 'formik';
import Input from 'components/shared/input';
import * as yup from 'yup';
import stripeProvider from '@helpers/stripeProvider';
import gmailIcon from '/public/images/gmail.svg';
import React, { useState } from 'react';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import Modal from './Modal';
import { Auth } from 'aws-amplify';

import toast from 'react-hot-toast';

const apiURL = 'https://cjylzkf22j.execute-api.us-east-1.amazonaws.com/prod/registration';

const pricingModels = [
  {
    title: 'Basic',
    priceId: 'price_1OUvoyJ4bFvTPfHhWLqyoeGN',
  },
  {
    title: 'Standard',
    priceId: 'price_1OUvpbJ4bFvTPfHhTJxcSllo',
  },
  {
    title: 'Premium',
    priceId: 'price_1OUvwVJ4bFvTPfHh4l5aPiSM',
  },
];

const signUpSchemaValidation = yup.object().shape({
  tenantName: yup.string().required('Name is required'),
  tenantEmail: yup.string().required('Email is required'),
  tenantPhone: yup.string().required('Phone is required'),
  tenantTier: yup.string().required('Plan is required'),
});

const SignUp = () => {
  const [showModal, setShowModal] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [loadingButton, setLoadingButton] = useState(false);
  const [userCreated, setUserCreated] = useState(false);

  const signUpWithGoogle = async () => {
    try {
      await Auth.federatedSignIn({ provider: 'Google' });
      localStorage.setItem('isAuthenticated', true);
    } catch (error) {
      console.log('fail', error);
      localStorage.setItem('isAuthenticated', false);
    }
  };

  const startEmbeddedCheckout = async (priceId, email, tenantName, tenantId) => {
    fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ priceId, email, tenantName, tenantId }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
        setShowModal(true);
      });
  };

  const registerFormik = useFormik({
    initialValues: {
      tenantName: '',
      tenantEmail: '',
      tenantPhone: '',
      tenantTier: 'Basic',
    },
    validationSchema: signUpSchemaValidation,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const { errors: errorsSignUp, touched: touchedSignUp } = registerFormik;

  const handleSubmit = async (values) => {
    const pricingList = pricingModels.filter((x) => x.title === values.tenantTier);
    if (pricingList.length == 0) {
      toast.error('Price model is not allowed');
    }
    const priceId = pricingList[0].priceId;

    setLoadingButton(true);
    try {
      const signUpUser = await axios.post(apiURL, values);
      setLoadingButton(false);
      setUserCreated(true);
      if (signUpUser) {
        startEmbeddedCheckout(priceId, values.tenantEmail, values.tenantName, signUpUser?.data.tenantId);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
      setLoadingButton(false);
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
          <Link href="#" className="underline" onClick={() => Router.push('sign-in')}>
            Sign In
          </Link>
          <Text p className="text-gray4 mt-10 mb-6">
            Sign up with your Google account
          </Text>
          <div className="flex items-center justify-between mb-6">
            <Button social={gmailIcon} onClick={signUpWithGoogle} />
          </div>
          {!signUpWithGoogle && (
            <Text p className="text-gray4 mb-6">
              Or continue with
            </Text>
          )}
          {userCreated ? (
            <Text p className="text-gray4 mb-6">
              Activate subscription
            </Text>
          ) : (
            <form onSubmit={registerFormik.handleSubmit} className="mt-10">
              <Input
                type="text"
                label="Name"
                id="tenantName"
                className="mb-6"
                onChange={registerFormik.handleChange}
                value={registerFormik.values.tenantName}
                error={errorsSignUp.tenantName && touchedSignUp.tenantName}
                errorText={errorsSignUp.tenantName}
              />
              <Input
                type="email"
                label="Email"
                id="tenantEmail"
                className="mb-6"
                onChange={registerFormik.handleChange}
                value={registerFormik.values.tenantEmail}
                error={errorsSignUp.tenantEmail && touchedSignUp.tenantEmail}
                errorText={errorsSignUp.tenantEmail}
              />
              <Input
                type="text"
                label="Phone"
                id="tenantPhone"
                className="mb-6"
                onChange={registerFormik.handleChange}
                value={registerFormik.values.tenantPhone}
                error={errorsSignUp.tenantPhone && touchedSignUp.tenantPhone}
                errorText={errorsSignUp.tenantPhone}
              />

              <div className="mb-6">
                <label htmlFor="tenantTier" className="block mb-2 text-sm font-medium text-gray-900">
                  Plan
                </label>
                <select
                  onChange={registerFormik.handleChange}
                  value={registerFormik.values.tenantTier}
                  id="tenantTier"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                  {pricingModels.map((price) => (
                    <option key={price.priceId}>{price.title}</option>
                  ))}
                  <option disabled value="Platinum">
                    Platinum
                  </option>
                </select>
              </div>

              <Button loading={loadingButton} type="submit" primary label="Sign up" className="w-full justify-center" />
            </form>
          )}
        </div>
      </div>
      <div id="checkout">
        {clientSecret && showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <EmbeddedCheckoutProvider stripe={stripeProvider} options={{ clientSecret }}>
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          </Modal>
        )}
      </div>
      <div id="modal-root"></div>
    </Authentication>
  );
};

export default SignUp;
