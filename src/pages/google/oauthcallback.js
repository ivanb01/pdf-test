import { useRouter } from 'next/router';
import { getGoogleAuthCallback } from 'api/google';
import { useEffect } from 'react';

const GoogleOauthCallbak = () => {
  const router = useRouter();

  useEffect(() => {
    const queryParams = {};
    for (const [key, value] of Object.entries(router.query)) {
      queryParams[key] = value;
    }
    if (Object.keys(queryParams).length > 0) {
      getGoogleAuthCallback(queryParams, '/contacts/no-contact').then((data) => {
        console.log(data);
      });
    }
  }, [router.query]);
};

export default GoogleOauthCallbak;

export async function getStaticProps(context) {
  return {
    props: {
      requiresAuth: true,
    },
  };
}
