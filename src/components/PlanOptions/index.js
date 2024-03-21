import React, { useState, useEffect } from 'react';
import Button from 'components/shared/button';
import styles from './styles.module.scss';
import StripeEmbeddedCheckout from '@components/public/StripeEmbeddedCheckout';
import clsx from 'clsx';

const essentialsMonthPrice = 30;
const essentialsYearPrice = 300;
const essentialsMonthPriceId = 'price_1OUvpbJ4bFvTPfHhTJxcSllo';
const essentialsYearPriceId = 'price_1OW0pdJ4bFvTPfHhqYGI9HXw';

const enterpriseMonthPrice = 50;
const enterpriseYearPrice = 500;
const enterpriseMonthPriceId = 'price_1OUvwVJ4bFvTPfHh4l5aPiSM';
const enterpriseYearPriceId = 'price_1OW0qBJ4bFvTPfHhIc2sTKnD';

const plans = {
  free: {
    title: 'Free Plan',
    description: '',
    month: {
      price: 0,
      priceId: 'price_1OUvoyJ4bFvTPfHhWLqyoeGN',
    },
    year: {
      price: 0,
      priceId: 'price_1OUvoyJ4bFvTPfHhWLqyoeGN',
    },
  },
  essentials: {
    title: 'Essentials Plan',
    description: '',
    month: {
      price: essentialsMonthPrice,
      priceId: essentialsMonthPriceId,
    },
    year: {
      price: essentialsYearPrice,
      priceId: essentialsYearPriceId,
    },
  },
  enterprise: {
    title: 'Enterprise Plan',
    description: '',
    month: {
      price: enterpriseMonthPrice,
      priceId: enterpriseMonthPriceId,
    },
    year: {
      price: enterpriseYearPrice,
      priceId: enterpriseYearPriceId,
    },
  },
  'Free Plan': 'free',
  'Essentials Plan': 'essentials',
  'Enterprise Plan': 'enterprise',
};

const pricingModels = [
  {
    title: 'Essentials Plan',
    description: '',
    month: {
      price: essentialsMonthPrice,
      priceId: essentialsMonthPriceId,
    },
    yearly: {
      price: essentialsYearPrice,
      priceId: essentialsYearPriceId,
    },
  },
  {
    title: 'Enterprise Plan',
    description: '',
    month: {
      price: enterpriseMonthPrice,
      priceId: enterpriseMonthPriceId,
    },
    yearly: {
      price: enterpriseYearPrice,
      priceId: enterpriseYearPriceId,
    },
  },
];

const PlanOptions = ({ userInfo }) => {
  const [currentPlan, setCurrentPlan] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const otherInterval = currentPlan?.interval ? (currentPlan?.interval === 'month' ? 'year' : 'month') : null;
  const [plan, setPlan] = useState('month');

  const fetchCurrentPlan = () => {
    fetch(`/api/get-current-plan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCurrentPlan(data);
        setIsLoading(false);
      });
  };

  const openPortal = async () => {
    setIsLoading(true);
    
    if (!userInfo || !userInfo.customer_id) return;

    fetch('/api/create-billing-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Better to pass in customer id instead, once available from backend
      body: JSON.stringify({ customerId: userInfo.customer_id })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.sessionURL)
          window.open(data.sessionURL);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  const fetchCurrentUserInfo = async () => {
    const data = fetch(`/api/get-current-plan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInfo }),
    })
      .then((response) => response.json())
      .then((data) => {
        setCurrentPlan(data);
        setIsLoading(false);
      });

      setCurrentPlan(data);
      setIsLoading(false);
  };

  useEffect(() => {
    fetchCurrentUserInfo()
    fetchCurrentPlan()
  }, []);

  const handlePlanChange = async (newPlanType, newInterval = null) => {
    setIsLoading(true);
    const newPlanId = plans?.[newPlanType]?.[newInterval || currentPlan.interval]?.priceId;
    if (!newPlanId || !userInfo) return setIsLoading(false);

    const response = await fetch('/api/change-plan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newPlanId, userInfo }),
    });
    const data = await response.json();
    if (data.success) {
      fetchCurrentUserInfo();
      fetchCurrentPlan();
    } else {
      // Handle error
    }
  };

  if (isLoading || !currentPlan)
    return (
      <div className="mb-10 top-[3px] relative block">
        <Button loading={true}></Button>
      </div>
    );

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    return new Date(parseInt(timestamp) * 1000).toLocaleDateString("en-US");
  };

  return (
    <>
      <div className="mb-10 top-[3px] block">
        {currentPlan.error && (
          <>
            <p className="mb-5">
              You are currently subscribed to <strong>Free plan</strong>
            </p>
            <div className={styles['section__top']}>
              <h1>Pricing page</h1>

              <p className={styles['section__top-description']}>
                Start building for free, then add a site plan to go live. Account plans unlock additional features.
              </p>
              <div className={styles['section__tabs']}>
                <span
                  onClick={() => setPlan('month')}
                  className={clsx(
                    styles['section__tabs-item'],
                    plan === 'month' && styles['section__tabs-item--active'],
                  )}>
                  Monthly billing
                </span>
                <span
                  onClick={() => setPlan('yearly')}
                  className={clsx(
                    styles['section__tabs-item'],
                    plan === 'yearly' && styles['section__tabs-item--active'],
                  )}>
                  Yearly billing
                </span>
              </div>
            </div>
            <div className={styles['section__cards']}>
              {pricingModels.map((item) => {
                return (
                  <div className={styles.card}>
                    <div className={styles['card__top']}>
                      <h5>Upgrade to {item.title}</h5>
                      <div className={styles['card__top-price']}>
                        <span>${item[plan].price}</span>
                        <span>/{plan === 'month' ? 'mo' : 'year'}</span>
                      </div>
                      <StripeEmbeddedCheckout priceId={item[plan].priceId}>Subscribe</StripeEmbeddedCheckout>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="mb-5 hidden">
              Error message: <strong>{currentPlan.error}</strong>
            </p>
          </>
        )}
        {currentPlan?.productName && userInfo?.email && (
          <>

            {
              userInfo && userInfo?.email && (
                <>
                  <p className="mb-5">Email: {userInfo?.email}</p>
                  <p className="mb-5">Subscription Status: {userInfo?.subscriptionStatus}</p>
                  <p className="mb-5">Subscription Start: {formatDate(userInfo?.subscriptionStartDate)}</p>
                  <p className="mb-5">Current Period Start: {formatDate(userInfo?.subscriptionCurrentPeriodStart)}</p>
                  <p className="mb-5">Current Period End: {formatDate(userInfo?.subscriptionCurrentPeriodEnd)}</p>
                </>
              )
            }
            <p className="mb-5">
              Current Plan: <strong>{currentPlan.description}</strong>
            </p>
            {currentPlan.productName !== 'Free Plan' && (
              <Button
                className="mr-5"
                loading={isLoading}
                information
                label="Downgrade to Free Plan"
                onClick={() => handlePlanChange('free')}
              />
            )}
            {currentPlan.productName !== 'Essentials Plan' && (
              <Button
                className="mr-5"
                loading={isLoading}
                information
                label="Change to Essentials"
                onClick={() => handlePlanChange('essentials')}
              />
            )}
            {currentPlan.productName !== 'Enterprise Plan' && (
              <Button
                className="mr-5 mt-5"
                loading={isLoading}
                information
                label="Upgrade to Enterprise"
                onClick={() => handlePlanChange('enterprise')}
              />
            )}
            {otherInterval && currentPlan.productName !== 'Free Plan' && (
              <Button
                className="mr-5 mt-5"
                loading={isLoading}
                information
                label={`Pay ${otherInterval.toUpperCase()}LY`}
                onClick={() => handlePlanChange(plans[currentPlan.productName], otherInterval)}
              />
            )}
          </>
        )}
      </div>
      { !currentPlan?.error && userInfo?.customer_id && (
        <>
          <div className="font-medium">Manage your subscription</div>
          <div className="text-sm text-gray-700 mb-6">
            Clicking the button below will open your subscription portal.
          </div>
          <Button
            loading={isLoading}
            information label="Open Subscription Portal"
            onClick={openPortal} 
          />
        </>
      )}
    </>
  );
};

export default PlanOptions;
