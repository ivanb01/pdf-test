import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

export default function withAuth(Component) {
  var isAuthenticated = null;

  return function WithAuth(props) {
    const router = useRouter();

    useEffect(() => {
      if (typeof document !== 'undefined') {
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        // isAuthenticated = document.cookie.match('(^|;)\\s*isAuthenticated\\s*=\\s*([^;]+)')?.pop() || '';
        // console.log(isAuthenticated, document.cookie);
        if (!isAuthenticated) {
          console.log('isauthenticated', localStorage.getItem('isAuthenticated'));
          router.push('/authentication/sign-in');
        }
      }
    }, []);

    return <Component {...props} />;
  };
}
