import React from 'react';
import OnlineFormAgentSign from 'containers/OnlineForms/OnlineFormAgentSignForm';
import Head from 'next/head';
import MainMenu from '@components/shared/menu';

const AgentFormSign = () => {
  return (
    <>
      <Head>
        <title>Agent form sign</title>
      </Head>
      <MainMenu />
      <OnlineFormAgentSign />
    </>
  );
};

export default AgentFormSign;
