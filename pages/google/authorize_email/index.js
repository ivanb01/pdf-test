import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getGoogleAuthorizeEmail } from 'api/google'; // Adjust the path to your function file

export default function GoogleAuthorizeEmail() {
  const router = useRouter();

  useEffect(() => {
    const fetchAuthorization = async () => {
      try {
        const response = await getGoogleAuthorizeEmail();
        const { redirect_uri } = response.data;

        // Redirect the user to the specified redirect_uri
        window.location.href = redirect_uri;
      } catch (error) {
        console.error('Error:', error.message);
        // Handle the error if needed
      }
    };

    fetchAuthorization();
  }, []);

  return (
    <div>
      <h1>Loading...</h1>
      <p>This is a simple example page for testing the route.</p>
    </div>
  );
}
