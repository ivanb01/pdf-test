import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet"></link>
        <script defer src="/js/datepicker-min.js"></script>
        <script defer src="/js/lottie.js"></script>
        <script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>
      </Head>
      <body>
        <Main />
        <NextScript />
        <div id={'modal-portal'} />
      </body>
    </Html>
  );
};

export default Document;
