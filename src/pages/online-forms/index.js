import MainMenu from '@components/shared/menu';
import Head from 'next/head';
import OnlineForms from 'containers/OnlineForms';
import PageHeaderBar from '@components/shared/pageHeaderBar';

const OnlineFormsPage = () => {
  return (
    <>
      <Head>
        <title>Online Forms</title>
      </Head>
      <MainMenu />
      <PageHeaderBar />
      <OnlineForms />
    </>
  );
};

export default OnlineFormsPage;
