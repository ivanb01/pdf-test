import styles from './styles.module.scss';
import Image from 'next/image';

export const InfoItem = ({ icon, text }) => {
  return (
    <div className={styles.section}>
      <Image className={styles['section__icon']} src={icon} alt="info-icon"/>
      <p className={styles['section__text']}>{text}</p>
    </div>
  )
};
