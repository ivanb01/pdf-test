'use client';
import * as ReactDOMServer from 'react-dom/server';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { Pagination, Mousewheel } from 'swiper/modules';
import styles from './styles.module.scss';
import clsx from 'clsx';
import { Slide } from 'components/public/SectionFeaturesSwiper/Slide';
import animationSlide4 from '../../../assets/animations/features-slide-4.json';
import animationSlide5 from '../../../assets/animations/features-slide-5.json';
import animationSlide6 from '../../../assets/animations/features-slide-6.json';
import animationSlide7 from '../../../assets/animations/features-slide-7.json';
import animationSlide8 from '../../../assets/animations/features-slide-8.json';
import featureSlide1 from '/public/images/public/features-slide-1.png';
import featureSlide2 from '/public/images/public/features-slide-2.png';
import featureSlide3 from '/public/images/public/features-slide-3.png';
import paginationActive from '/public/images/public/pagination-active.svg';
import paginationInactive from '/public/images/public/pagination-inactive.svg';
import paginationCompleted from '/public/images/public/pagination-completed.svg';
import { useRef } from 'react';
import bgSm from '../../../../public/images/public/intro-mobile-bg.png';

const slides = [
  {
    title: 'Lead Management',
    description:
      "Streamline and optimize your sales pipeline with our CRM's powerful lead management solution. From capturing leads to nurturing prospects, stay in control and convert more opportunities into loyal customers.",
    mediaSource: featureSlide1,
    maxWidth: 416,
  },
  {
    title: 'Manage Relationships',
    description:
      "Elevate customer satisfaction and loyalty with our CRM's comprehensive customer relationship management tools. Seamlessly manage interactions, track preferences, and deliver personalized experiences to foster long-lasting connections.",
    mediaSource: featureSlide2,
    maxWidth: 612,
  },
  {
    title: 'Organize Sales Funnel',
    description:
      "Effortlessly organize and supercharge your sales funnel using our CRM's intuitive tools. From prospecting to closing deals, gain valuable insights and drive revenue growth with a streamlined and data-driven sales process.",
    mediaSource: featureSlide3,
    maxWidth: 410,
  },
  {
    title: 'Drive Campaigns',
    description:
      "Unleash the full potential of your marketing efforts with our CRM's dynamic campaign management. From ideation to execution, empower your team to drive impactful campaigns, analyze results, and achieve unmatched ROI",
    mediaSource: animationSlide4,
    isAnimation: true,
    maxWidth: 250,
  },
  {
    title: 'Online Forms & Applications',
    description:
      "Simplify data collection and enhance customer engagement with our CRM's versatile Online Forms and Applications. Create customizable, user-friendly forms to gather valuable insights, process applications seamlessly, and optimize your business workflows with ease.",
    mediaSource: animationSlide5,
    isAnimation: true,
    maxWidth: 350,
  },
  {
    title: 'Book Property Tours',
    description:
      "Offer an immersive and convenient property exploration experience with our CRM's 'Book Property Tour' feature. Empower potential buyers to schedule tours effortlessly, while enabling your agents to efficiently manage and convert leads into delighted homeowners.",
    mediaSource: animationSlide6,
    isAnimation: true,
    maxWidth: 500,
  },
  {
    title: 'Get Paid',
    description:
      "Effortlessly manage your invoicing process and accelerate payment collection from clients with our CRM's robust financial tools. Generate professional invoices, track payment statuses, and receive payments securely through multiple channels, ensuring a smooth and efficient flow of funds to fuel your business success.",
    mediaSource: animationSlide7,
    isAnimation: true,
    maxWidth: 400,
  },
  {
    title: 'Close Deals',
    description:
      "Seal the deal with confidence using our CRM's powerful features. \n" +
      'Streamline negotiations, track progress, and collaborate seamlessly with clients to ensure a smooth and successful conclusion to every transaction. Maximize your conversion rates and strengthen customer relationships, making every closure a win-win',
    mediaSource: animationSlide8,
    isAnimation: true,
    maxWidth: 300,
  },
];

export const SectionFeaturesSwiper = () => {
  const swiperRef = useRef(null);

  const getPaginationImage = (modifier) => {
    let paginationImage = null;
    if (modifier === 'active') {
      paginationImage = paginationActive;
    } else if (modifier === 'completed') {
      paginationImage = paginationCompleted;
    } else {
      paginationImage = paginationInactive;
    }

    return paginationImage.src;
  };

  const renderPagination = (swiper, current, total) => {
    const sectionLabels = slides.map((slide) => slide.title);
    const paginationElements = [];

    for (let i = 0; i < total; i++) {
      const currentItemIndex = i + 1;
      const modifier = currentItemIndex === current ? 'active' : currentItemIndex < current ? 'completed' : 'inactive';
      const element = (
        <div
          key={i}
          className={clsx(
            styles['pagination-element'],
            currentItemIndex === current && styles['pagination-element--active'],
          )}>
          <div
            style={{ backgroundImage: `url(${getPaginationImage(modifier)})` }}
            className={styles['pagination-element__image']}></div>

          <span className="pagination-dots-custom">{sectionLabels[i]}</span>
        </div>
      );
      paginationElements.push(element);
    }

    return ReactDOMServer.renderToString(paginationElements);
  };

  // onClick event can't be attached inside the renderPagination function because it returns the stringified HTML content (required by Swiper)
  // to circumvent that, we're adding the custom onClick handler and check for the `dataslideindex` property
  const handleSwiperContainerClick = (e) => {
    const { target } = e;
    const slideIndex = target.getAttribute('dataslideindex') || target.parentElement.getAttribute('dataslideindex');

    if (slideIndex) {
      swiperRef.current.swiper.slideTo(Number(slideIndex));
    }
  };

  return (
    <div className="container-public">
      <div className={styles.section}>
        <h2 className={styles['section__title']}>All-in-One Platform</h2>
        <p className={styles['section__description']}>
          A streamlined process which automatically triggers pre-templated actions across every step of your clients
          journey to buying and renting a home.
        </p>
        <div className={styles['section__swiper-container']} onClick={handleSwiperContainerClick}>
          {/* <Image src={paginationInactive} alt="pagination element" width={20} height={20} /> */}
          <Swiper
            onInit={(swiper) => {
              swiperRef.current = swiper.el;
            }}
            mousewheel={{
              releaseOnEdges: true,
              forceToAxis: true,
            }}
            speed={750}
            slidesPerView={1}
            direction="vertical"
            modules={[Pagination, Mousewheel]}
            pagination={{
              type: 'custom',
              renderCustom: renderPagination,
            }}
            breakpoints={{
              0: {
                direction: 'horizontal',
              },
              769: {
                direction: 'vertical',
              },
            }}>
            {slides.map((slide, i) => (
              <SwiperSlide key={'feature-slide-' + i}>
                <Slide item={slide} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};
