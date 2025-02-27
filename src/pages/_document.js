import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        ></link>
        <script src="https://unpkg.com/flowbite@1.3.4/dist/datepicker.js"></script>
        <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.fwSettings={
                'widget_id':150000003307
              };
              !function(){if("function"!=typeof window.FreshworksWidget){var n=function(){n.q.push(arguments)};n.q=[],window.FreshworksWidget=n}}() 
            `,
          }}
        />
        <script src="https://widget.freshworks.com/widgets/150000003307.js" async defer />
        <script defer src="/js/datepicker-min.js"></script>
        <script defer src="/js/lottie.js"></script>
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
