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

export const Header = ({ noLinks }) => {
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
  }, [user]);

  useEffect(() => {
    isLoggedIn();
  }, []);
  return (
    <header className={styles.header}>
      <div className="container-public" style={{ maxWidth: router.pathname?.includes('portfolio') && '100%' }}>
        <div
          className={styles['header__content']}
          style={{ paddingInline: router.pathname?.includes('portfolio') ? '24px' : '80px' }}
        >
          <div className={styles['header__content-left']}>
            <Link href="/public/home">
              <Image src={logo} alt="oneline-logo" />
            </Link>
            {!noLinks && (
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
            )}
          </div>
          {!noLinks && (
            <div>
              <div className={styles['header__content-right']}>
                <div className={clsx(styles['header__content-right-buttons'], styles['hide-on-smaller-screens'])}>
                  {!isAuthenticated ? (
                    <>
                      <Button
                        type="secondary"
                        onClick={() => router.push('/authentication/sign-in')}
                        style={{ color: '#6B7280' }}
                      >
                        Log In
                      </Button>
                      <Button type="primary" onClick={() => router.push('/authentication/sign-up')}>
                        Register for Free
                      </Button>
                    </>
                  ) : (
                    <Button
                      type="secondary"
                      onClick={() => router.push('/contacts/clients')}
                      style={{ color: '#6B7280' }}
                    >
                      Go to CRM {'->'}
                    </Button>
                  )}
                </div>
                <div className={styles['hide-on-bigger-screens']}>
                  <div onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? (
                      <Image src={close} alt="icon-close-menu" />
                    ) : (
                      <Image src={open} alt="icon-open-menu" />
                    )}
                  </div>
                </div>
              </div>
              {isMenuOpen && (
                <div className={styles['header__content-menu']}>
                  <ul className={clsx(styles['header__content-list'], styles['header__content-list--mobile'])}>
                    {!isAuthenticated ? (
                      <Button
                        className="w-full"
                        type="primaryLight"
                        style={{ color: '#6B7280' }}
                        onClick={() => router.push('/authentication/sign-in')}
                      >
                        Log In
                      </Button>
                    ) : (
                      <Button
                        className="w-full"
                        type="primaryLight"
                        onClick={() => router.push('/contacts/clients')}
                        style={{ color: '#6B7280' }}
                      >
                        Go to CRM {'->'}
                      </Button>
                    )}
                    {links.map((item) => (
                      <>
                        <li key={item.href}>
                          <Link href={item.href}>
                            <div
                              onClick={() => setIsMenuOpen(!isMenuOpen)}
                              className={currentRoute === item.href ? styles.active : styles.active}
                            >
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
          )}
        </div>
      </div>
    </header>
  );
};
