import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import jwt from 'jsonwebtoken';
import { getOpgnyBaseUrl } from '@global/functions';

const SECRET_KEY = 'secret_key_crm';

const useAuthIframe = () => {
  const userEmail = useSelector((state) => state.global.user);
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
    if (typeof window !== 'undefined') {
      setBaseUrl(getOpgnyBaseUrl(window.location.hostname));
    }
  }, []);

  useEffect(() => {
    if (userEmail) {
      const newToken = generateJwt(userEmail);
      setToken(newToken);
    }
  }, [userEmail]);

  return { token, baseUrl };
};

export default useAuthIframe;
