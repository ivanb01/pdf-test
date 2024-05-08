import styles from './styles.module.scss';
import Image from 'next/image';
import { clsx } from 'clsx';

export const Feature = ({ item, inRow, iconLeft }) => {
  return (
    <div className={clsx(styles.section, inRow && styles['section--in-row'])}>
      <div
        className={clsx(
          styles['section__wrapper'],
          inRow && styles['section__wrapper--in-row'],
          iconLeft && styles['section__wrapper--icon-left'],
        )}
      >
        {iconLeft && (
          <div className={styles['section__icon-left']}>
            <Image className={styles['section__icon']} src={item.icon} alt="feature icon" />
          </div>
        )}
        {!iconLeft && <Image className={styles['section__icon']} src={item.icon} alt="feature icon" />}
        <div className={styles['section__description']}>
          <span>{item.title}</span>
          {item.description}
        </div>
      </div>
    </div>
  );
};
