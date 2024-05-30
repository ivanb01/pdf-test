import MainMenu from '@components/shared/menu';
import Iframe from 'react-iframe';

const index = () => {
  return (
    <>
      <MainMenu />
      <Iframe
        url="https://oxfordpg.com/Deal_crm"
        width="100%"
        height="100%"
        id=""
        className=""
        display="block"
        position="relative"
      />
    </>
  );
};

export default index;

// export async function getServerSideProps(context) {
//   return {
//     props: {
//       requiresAuth: true,
//     },
//   };
// }
