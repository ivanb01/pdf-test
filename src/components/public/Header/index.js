'use client';
import Link from 'next/link';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from './styles.module.scss';
import { Button } from '../Button';
import logo from '/public/images/public/logo.svg';
import close from '/public/images/public/close.svg';
import open from '/public/images/public/menu.svg';
import { Auth } from 'aws-amplify';
import { useSelector } from 'react-redux';

const links = [
  {
    href: '/public/home',
    label: 'Home',
  },
  /*{
    href: '/properties',
    label: 'Properties'
  },
  {
    href: '/agents',
    label: 'Agents'
  },*/
  {
    href: '/public/pricing',
    label: 'Pricing',
  },
  {
    href: '/public/contact',
    label: 'Contact Us',
  },
];

export const Header = () => {
  const user = useSelector((state) => state.global.user);
  let lastScrollPosition = 0;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const currentRoute = router.pathname;

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    const verticalScrollPosition = window.scrollY;
    const headerElement = document.querySelector(`.${styles.header}`);

    if (lastScrollPosition > verticalScrollPosition) {
      headerElement.classList.remove(styles['header--hidden']);
    } else {
      if (verticalScrollPosition > 30) {
        headerElement.classList.add(styles['header--hidden']);
      }
    }

    lastScrollPosition = verticalScrollPosition;
  };

  const isLoggedIn = async () => {
    await Auth.currentSession()
      .then((item) => {
        setIsAuthenticated(true);
        console.log('test');
      })
      .catch((e) => {
        setIsAuthenticated(false);
        console.log('not logged in');
      });
  };

  useEffect(() => {
    isLoggedIn();
  }, [user]);

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <header className={styles.header}>
      <div className="container-public">
        <div className={styles['header__content']}>
          <div className={styles['header__content-left']}>
            <Link href="/public/home">
              <Image src={logo} alt="oneline-logo" />
            </Link>
            <div className={styles['hide-on-smaller-screens']}>
              <ul className={styles['header__content-list']}>
                {links.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>
                      <div className={currentRoute === item.href ? styles.active : ''}> {item.label}</div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={styles['header__content-right']}>
            <div className={clsx(styles['header__content-right-buttons'], styles['hide-on-smaller-screens'])}>
              {!isAuthenticated ? (
                <Button
                  type="secondary"
                  onClick={() => router.push('/authentication/sign-in')}
                  style={{ color: '#6B7280' }}>
                  Log In
                </Button>
              ) : (
                <Button type="secondary" onClick={() => router.push('/contacts/clients')} style={{ color: '#6B7280' }}>
                  Go to CRM {'->'}
                </Button>
              )}
              {/* <Button type="primary" onClick={() => router.push('/authentication/sign-up')}>
                Register for Free
              </Button> */}
            </div>
            <div className={styles['hide-on-bigger-screens']}>
              <div onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <Image src={close} alt="icon-close-menu" /> : <Image src={open} alt="icon-open-menu" />}
              </div>
            </div>
          </div>
          {isMenuOpen && (
            <div className={styles['header__content-menu']}>
              <ul className={clsx(styles['header__content-list'], styles['header__content-list--mobile'])}>
                <Button className="w-full" type="primaryLight" onClick={() => router.push('/authentication/sign-in')}>
                  Log in
                </Button>
                {links.map((item) => (
                  <>
                    <li key={item.href}>
                      <Link href={item.href}>
                        <div
                          onClick={() => setIsMenuOpen(!isMenuOpen)}
                          className={currentRoute === item.href ? styles.active : styles.active}>
                          {' '}
                          {item.label}
                        </div>
                      </Link>
                    </li>
                  </>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
