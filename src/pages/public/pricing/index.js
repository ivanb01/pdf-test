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
const essentialsPlanFeatures = ['SMS Campaigns', 'Teams', 'Marketing Center', 'Team Reporting', 'E-Sign Documents', 'Documents Creator'];
const enterprisePlanFeatures = ['Customizeable Documents', 'Agent Management', 'Deal Submission Portal', 'Agent Payment', 'Revenue Reports'];

const pricingModels = [
  {
    title: 'Free Plan',
    description: '',
    features: freePlanFeatures
  },
  {
    title: 'Essentials Plan',
    description: '',
    features: [...freePlanFeatures, ...essentialsPlanFeatures]
  },
  {
    title: 'Enterprise Plan',
    description: '',
    features: [...freePlanFeatures, ...essentialsPlanFeatures, ...enterprisePlanFeatures]
  }
]

export default function Pricing() {
  const [activeTab, setActiveTab] = useState(0);


  const getPricingCards = (activeTabIndex) => {
    const monthlyPrices = [0, 30, 50];
    const yearlyPrices = [0, 300, 500];

    pricingModels.forEach((model, index) => {
      model.price = activeTabIndex === 0 ? monthlyPrices[index] : yearlyPrices[index];
      model.isMonthly = activeTabIndex === 0;
    });

    return (
      pricingModels.map(item => {
        return (
          <PriceCard key={item.title} item={item}/>
        )
      })
    );
  };

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
              onClick={() => setActiveTab(0)}
              className={clsx(styles['section__tabs-item'], activeTab === 0 && styles['section__tabs-item--active'])}>Monthly billing</span>
              <span
                onClick={() => setActiveTab(1)}
                className={clsx(styles['section__tabs-item'], activeTab === 1 && styles['section__tabs-item--active'])}>Yearly billing</span>
            </div>
          </div>
          <div className={styles['section__cards']}>
            {getPricingCards(activeTab)}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
