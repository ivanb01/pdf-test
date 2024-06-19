import React from 'react';
import OnlineFormAgentSign from 'containers/OnlineForms/OnlineFormAgentSignForm';
import Head from 'next/head';
import MainMenu from '@components/shared/menu';
import MainMenuV2 from '@components/shared/menu/menu-v2';

const AgentFormSign = () => {
  return (
    <>
      <Head>
        <title>Agent form sign</title>
      </Head>
      <MainMenuV2 />
      <OnlineFormAgentSign />
    </>
  );
};

export default AgentFormSign;
