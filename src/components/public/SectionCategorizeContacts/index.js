'use client';
import Lottie from 'lottie-react';
import styles from './styles.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Slide } from './Slide';
import animationSlide1 from '../../../assets/animations/categorize-contacts-slide-1.json';
import animationSlide2 from '../../../assets/animations/categorize-contacts-slide-2.json';

const slides = [
  {
    title: 'Let the AI do the work - Sync Smart Sync',
    description:
      'Save time. Syncs your contacts directly into your CRM. AI will identify type, status, and most importantly, the interests.',
    mediaSource: animationSlide1,
    isAnimation: true,
    maxWidth: 324,
  },
  {
    title: 'Categorize by yourself',
    description: 'Specify type and status so you can start the communication.',
    mediaSource: animationSlide2,
    isAnimation: true,
    maxWidth: 340,
  },
];

const SectionCategorizeContacts = () => {
  return (
    <div className={styles.section}>
      <div className="container-public">
        <div className={styles['section__inner']}>
          <div className={styles['section__intro']}>
            <h3>
              Categorize contacts with just <span>two clicks</span>
            </h3>
            <p>
              Our software helps classify your contacts and suggests campaigns so you never forget to stay in touch.
            </p>
          </div>
          <div className={styles['section__swiper-container']}>
            <Swiper modules={[Pagination]} speed={750} slidesPerView={1} pagination={{ clickable: true }}>
              {slides.map((slide, i) => (
                <SwiperSlide key={'feature-slide-' + i}>
                  <Slide item={slide} index={i} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionCategorizeContacts;
