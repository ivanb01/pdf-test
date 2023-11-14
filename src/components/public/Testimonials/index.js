'use client'; // This is a client component 👈🏽
import styles from './styles.module.scss';
import levelLogo from '/public/images/public/level-logo.png';
import spireLogo from '/public/images/public/spire-logo.png';
import testimonialsTop from '/public/images/public/testimonials-section-top.png';
import testimonialsBottom from '/public/images/public/testimonials-section-bottom.png';
import quote from '/public/images/public/quote.svg';
import testimonialsAvatar from '/public/images/public/testimonials-avatar-one.png';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Image from 'next/image';

const testimonials = [
  {
    description:
      'Oneline has helped me follow up with clients, I didn&apos;t even know were still engaged. Its a true end to end solution for agents and brokerages. Our clients, agents and our brokerage has benefited from signing up.',
    logo: levelLogo,
    name: 'John Doe',
    position: 'CEO, LEVEL',
    avatar: testimonialsAvatar,
  },
  {
    description:
      'We are a brokerage partner and use Oneline to run our entire operation. From CRM, to agent management, agent payments and deal management to website, marketing and support. Its the only product we have seen that provides everything.',
    logo: spireLogo,
    name: 'Joseph Rodriguez',
    position: 'CEO, LEVEL',
    avatar: testimonialsAvatar,
  },
];

export const Testimonials = () => {
  return (
    <div className={styles['section-main-container']}>
      <Image src={testimonialsTop} alt="top-arc" className="w-full" />
      <div className={styles['section-main-subcontainer']}>
        <div className={styles['section-container']}>
          <Swiper
            modules={[Pagination]}
            speed={750}
            slidesPerView={1}
            pagination={{ clickable: true }}
            breakpoints={{
              1024: {
                slidesPerView: 2,
              },
            }}>
            {testimonials.map((testimonial, i) => (
              <SwiperSlide key={'slide' + i}>
                <div
                  className={
                    i % 2 === 0 ? styles['section-swiper-container-left'] : styles['section-swiper-container-right']
                  }>
                  <div className={styles['section-swiper-container-content']}>
                    <div className={styles['section-swiper-container-content-logo']}>
                      <Image width="78" src={testimonial.logo} alt="logo" />
                    </div>
                    <div className={styles['section-swiper-container-content-container']}>
                      <Image
                        className={styles['section-swiper-container-content-container-quotation']}
                        src={quote}
                        alt="quote"
                      />
                      <p className={styles['section-swiper-container-content-container-text']}>
                        {testimonial.description}
                      </p>
                    </div>
                  </div>
                  <div className={styles['section-swiper-container-person']}>
                    <Image src={testimonial.avatar} alt="profile img" />
                    <div className={styles['section-swiper-container-person-info']}>
                      <p className={styles['section-swiper-container-person-info-name']}>{testimonial.name}</p>
                      <p className={styles['section-swiper-container-person-info-position']}>{testimonial.position}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <Image src={testimonialsBottom} alt="bottom-arc" className="w-full" />
    </div>
  );
};
