'use client'; // This is a client component 👈🏽
import styles from './styles.module.scss';
import Image from 'next/image';
import { Input } from '../Input';
import { Button } from '../Button';
import arrow from '/public/images/public/start-trial-arrow.png';
import sectionBg from '/public/images/public/start-trial-section-bg.png';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const SectionStartTrial = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isLoggedIn = () => {
    let user = localStorage.getItem('user');
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };
  useEffect(() => {
    isLoggedIn();
  }, []);
  const redirect = () => {
    if (isAuthenticated) {
      router.push('/contacts/clients');
    } else {
      router.push('/authentication/sign-up');
    }
  };

  return (
    <div className={styles.section}>
      <div className={styles['section__container']}>
        <h2 className={styles['section__title']}>Easy Peasy Lemon Squeezy</h2>
        <p className={styles['section__description']}>
          {"Don't look left, dont look right, click this button and take a bite."}
        </p>
        <div className={styles['section__actions']}>
          <Button type="primary" onClick={() => redirect()}>
            GET STARTED
          </Button>
          <div className={styles['section__img-arrow']}>
            <Image className={styles['section__img-arrow']} src={arrow} alt="trial-arrow" />
          </div>
        </div>
      </div>
      <div className={styles['section__img-bottom']}>
        <Image src={sectionBg} alt="bottom-arc" />
      </div>
    </div>
  );
};
