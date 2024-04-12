import React from 'react';
import OnlineFormsSignForm from 'containers/OnlineForms/OnlineFormsSignForm';
import { Header } from '@components/public/Header';

const OnlineFormsSign = () => {
  return (
    <>
      <Header noLinks={true} />
      <OnlineFormsSignForm />
    </>
  );
};

export default OnlineFormsSign;
