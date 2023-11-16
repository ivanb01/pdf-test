'use client';
import styles from './styles.module.scss';
import clsx from 'clsx';
import Image from 'next/image';
import {Input} from 'components/public/Input';
import {Button} from 'components/public/Button';
import oxfordLogo from '/public/images/public/oxford-logo-dark.svg';
import spireLogo from '/public/images/public/spire-logo-dark.svg';
import levelLogo from '/public/images/public/level-logo-dark.svg';
import intoChatBg from '/public/images/public/intro-chat-bg.png';
import introLeft from '/public/images/public/intro-left-bg.png';
import introRight from '/public/images/public/intro-right-bg.png';
import intoMobileRight from '/public/images/public/intro-right-bg-mobile.png';
import bgSm from '/public/images/public/intro-mobile-bg.png';

export const SectionIntro = () => {

  const redirect = () => {
    //router.push('/contact')
  };

  return (
    <div className={styles.section}>
      <div className={clsx(styles['bg'], styles['bg--left'])}>
        <Image src={introLeft} />
      </div>
      <div className={clsx(styles['bg'], styles['bg--right'])}>
        <Image src={introRight} />
      </div>
      <div className="container-public">
        <div className={clsx(styles['section__content'], styles['section__content--lg'])}>
          <div className={styles['section__content-left']}>
            <h1>
              Faster.Better.Easier.
              <span>
                All in{' '}
                <span>
                  <span className={styles.fill}>ONE</span>
                  <span>LINE</span>
                </span>
              </span>
            </h1>
            <p className={styles['section__content-left-description']}>
              Oneline helps you close more deals, keeps you on top of your clients and relationships & automates all
              your workflows as an agent & brokerage.
            </p>
            <form>
              <Input placeholder="Enter your email" onChange={(e) => console.log(e.target.value)}/>
              <Button type="primary">
                Start Free Trial
              </Button>
            </form>
            <p className={styles['section__content-left-terms']}>
              Get Notified when we’re launching and start your free trial, no credit card necessary.
              By providing your email, you agree to our <a href="#">terms of service</a>.
            </p>
            <div className={styles['section__content-left-logos']}>
              <Image src={oxfordLogo} alt="oxford logo"/>
              <Image src={spireLogo} alt="spire logo"/>
              <Image src={levelLogo} alt="level logo"/>
            </div>
          </div>
          <div className={styles['section__content-right']}>
            <Image src={intoChatBg} alt="intro chat bg"/>
          </div>
        </div>
        <div className={clsx(styles['section__content'], styles['section__content--sm'])}>
          <div className={styles['section__content-left']}>
            <h1>
              Faster.Better.Easier.
              <span>
                All in{' '}
                <span className={styles.fill}>ONE</span>
                <span>LINE</span>
              </span>
            </h1>
            <p className={styles['section__content-left-description']}>
              Oneline helps you close more deals, keeps you on top of your clients and relationships & automates all
              your workflows as an agent & brokerage.
            </p>
            <div className={styles['section__content-right']} style={{backgroundImage: `url(${intoMobileRight.src})`}}>
              <Image src={intoChatBg} alt="intro chat bg"/>
            </div>
            <div className={styles['section__content-bg-sm']} style={{backgroundImage: `url(${bgSm.src})`}}>
              <form>
                <Input placeholder="Enter your email" onChange={(e) => console.log(e.target.value)}/>
                <Button type="primary">
                  Start Free Trial
                </Button>
              </form>
              <p className={styles['section__content-left-terms']}>
                Get Notified when we’re launching and start your free trial, no credit card necessary.
                By providing your email, you agree to our <a href="#">terms of service</a>.
              </p>
              <div className={styles['section__content-left-logos']}>
                <Image src={oxfordLogo} alt="oxford logo"/>
                <Image src={spireLogo} alt="spire logo"/>
                <Image src={levelLogo} alt="level logo"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
