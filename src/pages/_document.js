import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <script src="https://unpkg.com/flowbite@1.3.4/dist/datepicker.js"></script>
        <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
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
