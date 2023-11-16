import Lottie from 'lottie-react';
import styles from './styles.module.scss';
import clsx from 'clsx';
import Image from 'next/image';
import CategorizeContactDetail from '/public/images/public/categorize-contacts-detail-slide-2.svg';


export const Slide = ({ item, index }) => {
  return (
    <div className={styles.content}>
      <div className={styles['content__wrapper']}>
        {
          item.isAnimation ? (
            // add this class only to the slide with the working woman animation
            <div className={index === 1 ? clsx(styles['content__wrapper-animation']) : ''}>
              <div style={{ maxWidth: item.maxWidth || '100%' }}>
                <Lottie animationData={item.mediaSource} />
              </div>
              {
                // add this image only to the slide with the working woman animation
                index === 1 &&
                <Image src={CategorizeContactDetail} alt='animation detail' />
              }
            </div>
          ) : (
            <Image style={{ maxWidth: item.maxWidth || '100%' }} src={item.mediaSource} alt='slide image' />
          )
        }
        <div className={styles['content__wrapper-text']}>
          <h5>
            {item.title}
          </h5>
          <p>
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
};
