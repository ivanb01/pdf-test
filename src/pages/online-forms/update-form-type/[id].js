import Head from 'next/head';
import MainMenu from '@components/shared/menu';
import UpdateTemplate from 'containers/OnlineForms/UpdateTemplate';
import MainMenuV2 from '@components/shared/menu/menu-v2';

const CreateFormTypePage = () => {
  return (
    <>
      <Head>
        <title>Update online forms template</title>
      </Head>
      <MainMenuV2 />
      <UpdateTemplate />
    </>
  );
};

export default CreateFormTypePage;
