import MainMenu from '@components/shared/menu';
import Iframe from 'react-iframe';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import jwt from 'jsonwebtoken';
import { getOpgnyBaseUrl } from '@global/functions';

const Index = () => {
  const userEmail = useSelector((state) => state.global.user);
  const SECRET_KEY = 'secret_key_crm';
  const [token, setToken] = useState();
  const [baseUrl, setBaseUrl] = useState();

  const generateJwt = (email) => {
    const payload = {
      email,
      exp: Math.floor(Date.now() / 1000) + 10 * 60 * 60,
    };
    return jwt.sign(payload, SECRET_KEY);
  };

  useEffect(() => {
    setBaseUrl(getOpgnyBaseUrl(window.location.hostname));
    if (userEmail) {
      const newToken = generateJwt(userEmail);
      setToken(newToken);
    }
  }, [userEmail]);

  return (
    <>
      <MainMenu />
      {token && baseUrl && (
        <Iframe
          url={`${baseUrl}/helpfulpartnerships_crm/vendors?token=${token}`}
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
