import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <script defer src="/js/datepicker-min.js"></script>
        <script defer src="/js/lottie.js"></script>
        <meta name="viewport" content="width=device-width"></meta>
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
