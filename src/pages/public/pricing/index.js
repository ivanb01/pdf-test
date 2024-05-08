'use client';
import 'swiper/css';
import 'swiper/css/pagination';
import styles from './styles.module.scss';
import { useState } from 'react';
import clsx from 'clsx';
import { PriceCard } from '@components/public/PriceCard';
import { Header } from '@components/public/Header';
import { Footer } from '@components/public/Footer';
const freePlanFeatures = ['Contact Management', 'Email Campaigns', 'A.I. Contact Categorization', 'Credit Checks'];
const essentialsPlanFeatures = [
  'SMS Campaigns',
  'Teams',
  'Marketing Center',
  'Team Reporting',
  'E-Sign Documents',
  'Documents Creator',
];
const enterprisePlanFeatures = [
  'Customizeable Documents',
  'Agent Management',
  'Deal Submission Portal',
  'Agent Payment',
  'Revenue Reports',
];

const pricingModels = [
  {
    title: 'Free Plan',
    description: '',
    features: freePlanFeatures,
    monthly: {
      price: 0,
      priceId: 'price_1OUvoyJ4bFvTPfHhWLqyoeGN',
    },
    yearly: {
      price: 0,
      priceId: 'price_1OUvoyJ4bFvTPfHhWLqyoeGN',
    },
  },
  {
    title: 'Essentials Plan',
    description: '',
    features: [...freePlanFeatures, ...essentialsPlanFeatures],
    monthly: {
      price: 30,
      priceId: 'price_1OUvpbJ4bFvTPfHhTJxcSllo',
    },
    yearly: {
      price: 300,
      priceId: 'price_1OW0pdJ4bFvTPfHhqYGI9HXw',
    },
  },
  {
    title: 'Enterprise Plan',
    description: '',
    features: [...freePlanFeatures, ...essentialsPlanFeatures, ...enterprisePlanFeatures],
    monthly: {
      price: 50,
      priceId: 'price_1OUvwVJ4bFvTPfHh4l5aPiSM',
    },
    yearly: {
      price: 500,
      priceId: 'price_1OW0qBJ4bFvTPfHhIc2sTKnD',
    },
  },
];

export default function Pricing() {
  const [plan, setPlan] = useState('monthly');

  return (
    <>
      <Header />
      <main className={styles.section}>
        <div className="container-public">
          <div className={styles['section__top']}>
            <h1>Pricing page</h1>

            <p className={styles['section__top-description']}>
              Start building for free, then add a site plan to go live. Account plans unlock additional features.
            </p>
            <div className={styles['section__tabs']}>
              <span
                onClick={() => setPlan('monthly')}
                className={clsx(
                  styles['section__tabs-item'],
                  plan === 'monthly' && styles['section__tabs-item--active'],
                )}
              >
                Monthly billing
              </span>
              <span
                onClick={() => setPlan('yearly')}
                className={clsx(
                  styles['section__tabs-item'],
                  plan === 'yearly' && styles['section__tabs-item--active'],
                )}
              >
                Yearly billing
              </span>
            </div>
          </div>
          <div className={styles['section__cards']}>
            {pricingModels.map((item) => {
              return <PriceCard key={item.title} item={item} plan={plan} />;
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
