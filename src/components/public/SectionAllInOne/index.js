'use client';
import styles from './styles.module.scss';
import { Feature } from '../Feature';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination} from 'swiper/modules';
import iconGmail from '/public/images/public/icon-gmail-integration.svg';
import iconDrive from '/public/images/public/icon-drive-campaigns.svg';
import iconAddTasks from '/public/images/public/icon-add-tasks.svg';
import iconConsumerWebsite from '/public/images/public/icon-consumer-websites.svg';
import iconStatistics from '/public/images/public/icon-statistics.svg';
import iconFeatureEmail from '/public/images/public/icon-feature-email.svg';
import iconFeatureApplication from '/public/images/public/icon-feature-application.svg';
import iconSendForm from '/public/images/public/icon-send-form.svg';

const features = [{
  icon: iconGmail,
  title: 'G-mail Integration',
  description: <p>
    Don&apos;t waste time - contacts are automatically synced with gmail.
  </p>
}, {
  icon: iconDrive,
  title: 'Drive Campaigns',
  description: <p>
    Stay in touch, drive connections and don&apos;t lose contact.
  </p>
}, {
  icon: iconAddTasks,
  title: 'Add Tasks',
  description: <p>
    Create automated to do list items, for yourself or your team.
  </p>
}, {
  icon: iconConsumerWebsite,
  title: 'Consumer Websites',
  description: <p>
    Beautiful front end agent and brokerage website templates.
  </p>
}, {
  icon: iconStatistics,
  title: 'See Statistics',
  description: <p>
    Track your productivity and your teams. Make sure your leads are generating ROI.
  </p>
}, {
  icon: iconFeatureEmail,
  title: 'Email&SMS Communicating',
  description: <p>
    Stay top of mind with clients through text and email.
  </p>
}, {
  icon: iconFeatureApplication,
  title: 'Applications in One Place',
  description: <p>
    Clients can directly apply & get approved from the listing page on your website, no need to direct them to third
    parties.
  </p>
}, {
  icon: iconSendForm,
  title: 'Send Online Forms',
  description: <p>
    Organize your entire workflow under the same roof & integrate forms with campaigns. Never think about compliance
    again.
  </p>
}];

export const SectionAllInOne = () => {
  return (
    <div className="container-public">
      <div className={styles.section}>
        <h2 className={styles['section__title']}>All-in-One Platform</h2>
        <p className={styles['section__description']}>
          Payments, Lead Management, Front end Website, Agent roster and team management.
          Your Brokerage out of the box.
        </p>
        <div className={styles['section__features']}>
          {
            features.map((feature, i) => <Feature key={'feature-' + i} item={feature} inRow={true}/>)
          }
        </div>
        <div className={styles['section__features-mobile']}>
          <Swiper
            modules={[Pagination]}
            speed={750}
            slidesPerView={1}
            pagination={{ clickable: true }}
          >
            <SwiperSlide key="feature-slide-1">
              {
                features.filter((s, slideIndex) => slideIndex < 4).map((feature, i) => (
                  <Feature key={'feature-' + i} item={feature} iconLeft={true}/>
                ))
              }
            </SwiperSlide>
            <SwiperSlide key="feature-slide-2">
              {
                features.filter((s, slideIndex) => slideIndex > 3).map((feature, i) => (
                  <Feature key={'feature-' + i} item={feature} iconLeft={true}/>
                ))
              }
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  )
}
