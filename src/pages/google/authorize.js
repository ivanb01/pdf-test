import { useRouter } from 'next/router'
import { getGoogleAuthorize } from 'api/google';
import { useEffect } from 'react';

const GoogleAuthorize = () => {
    const router = useRouter();

    useEffect(() => {
        getGoogleAuthorize()
            .then((response) => {
                const redirectUri = response.data.redirect_uri; // Assuming the response contains a property called 'redirectUri'
                window.location.href = redirectUri; // Redirect to the URI returned from the response
                console.log('authorize1', response)
            })
            .catch((error) => {
                console.error(error);
            });
    }, []); // Empty dependency array to run the effect only once, when the component mounts

    return <div>Loading...</div>; // Placeholder UI for when the API request is being made
};

export default GoogleAuthorize;

export async function getStaticProps(context) {
    return {
      props: {
        requiresAuth: true,
      },
    };
  }