import Head from 'next/head';
import MainMenu from '@components/shared/menu';
import FormBuilder from 'containers/OnlineForms/FormBuilder/FormBuilder';
import MainMenuV2 from '@components/shared/menu/menu-v2';

const CreateFormTypePage = () => {
  return (
    <>
      <Head>
        <title>Create online forms template</title>
      </Head>
      <MainMenuV2 />
      <FormBuilder />
    </>
  );
};

export default CreateFormTypePage;
