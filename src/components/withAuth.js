import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Loader from './shared/loader';

export default function withAuth(Component) {
  return function WithAuth(props) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      if (typeof window !== 'undefined') {
        const isAuthenticated = localStorage.getItem('isAuthenticated');

        let maintenance = process.env.NEXT_PUBLIC_MAINTENANCE_MODE;
        if (maintenance === 'true') {
          router.push('/maintenance');
        }
        if (!isAuthenticated) {
          router.push('/authentication/sign-in');
        } else {
          setIsLoading(false);
        }
      }
    }, [router]);

    if (isLoading) {
      return <Loader />;
    }

    return <Component {...props} />;
  };
}
