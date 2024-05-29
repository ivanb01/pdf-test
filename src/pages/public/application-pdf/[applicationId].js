import { Header } from '@components/public/Header';
import ApplicationPdfViewer from 'containers/Applications/ApplicationPdfViewer';
import Head from 'next/head';

const index = () => {
  return (
    <>
      <Head>
        <title>Application Pdf</title>
      </Head>
      <Header noLinks={true} />
      <ApplicationPdfViewer />
    </>
  );
};

export default index;
