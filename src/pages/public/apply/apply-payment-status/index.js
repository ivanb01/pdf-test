import React from 'react';
import PaymentSuccessContaienr from 'containers/Applications/PaymentSuccessContainer';
import { Header } from '@components/public/Header';

const index = () => {
  return (
    <>
      <Header noLinks={true}/>
      <PaymentSuccessContaienr />
    </>
  );
};

export default index;
