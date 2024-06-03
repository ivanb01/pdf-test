import MainMenu from '@components/shared/menu';
import Iframe from 'react-iframe';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import jwt from 'jsonwebtoken';

const Index = () => {
  const userEmail = useSelector((state) => state.global.user);
  const SECRET_KEY = 'secret_key_crm';
  const [token, setToken] = useState();

  const generateJwt = (email) => {
    const payload = {
      email,
      exp: Math.floor(Date.now() / 1000) + 10 * 60 * 60,
    };
    return jwt.sign(payload, SECRET_KEY);
  };

  useEffect(() => {
    if (userEmail) {
      const newToken = generateJwt(userEmail);
      console.log(newToken);
      setToken(newToken);
    }
  }, [userEmail]);

  return (
    <>
      <MainMenu />
      {token && (
        <Iframe
          url={`https://oxfordpg.com/Deal_crm?token=${token}`}
          width="100%"
          height="100%"
          id=""
          className=""
          display="block"
          position="relative"
        />
      )}
    </>
  );
};

export default Index;

// export async function getServerSideProps(context) {
//   return {
//     props: {
//       requiresAuth: true,
//     },
//   };
// }
