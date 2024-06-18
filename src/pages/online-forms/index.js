import MainMenu from '@components/shared/menu';
import Head from 'next/head';
import OnlineForms from 'containers/OnlineForms';
import PageHeaderBar from '@components/shared/pageHeaderBar';
import MainMenuV2 from '@components/shared/menu/menu-v2';

const OnlineFormsPage = () => {
  return (
    <>
      <Head>
        <title>Online Forms</title>
      </Head>
      <MainMenuV2 />
      <PageHeaderBar />
      <OnlineForms />
    </>
  );
};

export default OnlineFormsPage;
