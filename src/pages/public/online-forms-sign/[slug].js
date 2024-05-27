import React from 'react';
import OnlineFormsSignForm from 'containers/OnlineForms/OnlineFormsClientSignForm';
import { Header } from '@components/public/Header';
import Head from 'next/head';

const OnlineFormsSign = () => {
  return (
    <>
      <Head>
        <title>Online form</title>
      </Head>
      <Header noLinks={true} />
      <OnlineFormsSignForm />
    </>
  );
};

export default OnlineFormsSign;
