import { useRouter } from 'next/router';
import { postGoogleContacts } from 'api/google';
import { useEffect, useState } from 'react';

const GoogleImportContacs = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [apiResponse, setApiResponse] = useState(null);

    useEffect(() => {
        postGoogleContacts()
            .then((response) => {
                const redirectUri = response.data.redirect_uri;
                if (redirectUri) {
                    setLoading(false);
                    console.log(response);
                    setApiResponse(response.data);
                    setTimeout(() => {
                        router.push(redirectUri);
                    }, 2000);
                } else {
                    setLoading(false);
                    console.log(response);
                }
            })
            .catch((error) => {
                setLoading(false);
                setError(error);
                console.error(error);
            });
    }, []);

    return (
        <div className="container">
            {loading ? (
                <div className="loading">Importing Google Contacts...</div>
            ) : error ? (
                <div className="error">Error: {error.message}</div>
            ) : (
                <div className="response">
                    <p>API response: {apiResponse && JSON.stringify(apiResponse)}</p>
                    {router.isReady && (
                        <p className="redirecting">Redirecting in 2-3 seconds...</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default GoogleImportContacs;

// Styling using CSS classes
<style jsx>{`
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }

    .loading {
        font-size: 18px;
        text-align: center;
    }

    .error {
        font-size: 18px;
        color: red;
        text-align: center;
    }

    .response {
        font-size: 18px;
        text-align: center;
    }

    .redirecting {
        margin-top: 16px;
    }
`}</style>
