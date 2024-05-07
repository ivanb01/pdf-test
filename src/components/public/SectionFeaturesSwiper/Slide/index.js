import Lottie from 'lottie-react';
import styles from './styles.module.scss';
import Image from 'next/image';

export const Slide = ({ item }) => {
  return (
    <div className={styles.content}>
      <div className={styles['content__wrapper']}>
        {item.isAnimation ? (
          <div style={{ maxWidth: item.maxWidth || '100%' }}>
            <Lottie animationData={item.mediaSource} />
          </div>
        ) : (
          <Image style={{ maxWidth: item.maxWidth || '100%' }} src={item.mediaSource} alt="slide image" />
        )}
        <p>{item.description}</p>
      </div>
    </div>
  );
};
