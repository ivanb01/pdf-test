import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { Header } from '@components/public/Header';
import { Footer } from '@components/public/Footer';
import styles from './styles.module.scss';
import Link from 'components/Link';
import { Auth } from 'aws-amplify';

const Return = () => {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get('session_id');

    if (!sessionId) {
      window.location.href = "/public/pricing";
      return;
    }

    fetch(`/api/session-status?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
        setCustomerEmail(data.customer_email);
      })
      .catch((error) => {
        console.error("An error happened.");
        router.push("/public/pricing");
      });
  }, []);

  if (status === 'open') {
    router.push("/checkout");
    return;
  }

  if (status === 'complete') {
    return (
      <>
        <Header />
        <main className={styles.main}>
          <section id="success">
            <p>
              We appreciate your trust! A confirmation email will be sent to <strong>{customerEmail}</strong>.

              <br />
              If you have any questions, please email <a href="mailto:orders@onelinecrm.com">orders@onelinecrm.com</a>.
            </p>
            <div className={styles.dashboard}>Enjoy access and go to our <Link href="/contacts/clients">Dashboard</Link></div>
          </section>
        </main>
        <Footer />
      </>
    )
  }

  return null;
}

export default Return;