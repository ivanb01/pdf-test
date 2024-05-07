import styles from './styles.module.scss';
import clsx from 'clsx';
import Image from 'next/image';
import { Feature } from '../Feature';
import iconSync from '/public/images/public/icon-sync.svg';
import iconAI from '/public/images/public/icon-ai.svg';
import smartBg from '/public/images/public/section-smart-sync-bg.png';

const features = [
  {
    icon: iconSync,
    title: 'Sync AI with Gmail',
    description: (
      <p>
        By seamlessly integrating with your Gmail account, our system effortlessly{' '}
        <strong>syncs your contacts directly into your CRM</strong>, eliminating the need for tedious data entry. This
        automation not only <strong>saves you valuable time</strong> but also{' '}
        <strong>ensures accuracy and consistency across your entire contact database</strong>.
      </p>
    ),
  },
  {
    icon: iconAI,
    title: 'Let the AI do the work',
    description: (
      <p>
        Our intelligent AI algorithms intelligently analyze each contact&apos;s information, swiftly{' '}
        <strong>identifying their type, status, and most importantly, their interests</strong>.
      </p>
    ),
  },
];

const SectionSmartSync = () => {
  return (
    <div className="container-public">
      <div className={styles.section}>
        <div
          className={clsx(
            styles['section__content'],
            styles['section__content--bg'],
            styles['section__content--hide-sm'],
          )}
        >
          <Image src={smartBg} />
        </div>
        <div className={clsx(styles['section__content'], styles['section__content--description'])}>
          <div className={styles['section__content-intro']}>
            <span className={styles.tag}>AI Smart Sync Contacts</span>
            <h3>AI-Smart Sync Contacts</h3>
            <span className={styles.description}>Sync Your Contacts. Easier than ever.</span>
          </div>
          <div
            className={clsx(
              styles['section__content'],
              styles['section__content--bg'],
              styles['section__content--hide-lg'],
            )}
          >
            <Image src={smartBg} />
          </div>
          <div className={styles['section__content-features']}>
            {features.map((feature, i) => (
              <Feature key={'feature-' + i} item={feature} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionSmartSync;
