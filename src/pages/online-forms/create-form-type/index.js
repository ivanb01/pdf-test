// import MainMenu from '@components/shared/menu';
// import FormBuilder from 'containers/OnlineForms/FormBuilder/FormBuilder';

import Head from 'next/head';

import MainMenu from '@components/shared/menu';
import FormBuilder from 'containers/OnlineForms/FormBuilder/FormBuilder';

const CreateFormTypePage = () => {
  return (
    <>
      <Head>
        <title>Create online forms template</title>
      </Head>
      <MainMenu />
      <FormBuilder />
    </>
  );
};

export default CreateFormTypePage;
