import Head from 'next/head';
import MainMenu from '@components/shared/menu';
import UpdateTemplate from 'containers/OnlineForms/UpdateTemplate';

const CreateFormTypePage = () => {
  return (
    <>
      <Head>
        <title>Update online forms template</title>
      </Head>
      <MainMenu />
      <UpdateTemplate />
    </>
  );
};

export default CreateFormTypePage;
