import styles from './styles.module.scss';
import {Button} from '../Button';
import iconCheck from '/public/images/public/icon-check.svg';
import Image from 'next/image';

export const PriceCard = ({item}) => {
  return (
    <div className={styles.card}>
      <div className={styles['card__top']}>
        <h5>{item.title}</h5>
        <div className={styles['card__top-description']}>
          <span>Plan description</span>
        </div>
        <div className={styles['card__top-price']}>
          <span>${item.price}</span>
          <span>/{item.isMonthly ? 'mo' : 'year'}</span>
        </div>
        <Button type="primary">
          Subscribe
        </Button>
      </div>
      <div className={styles['card__bottom']}>
        <span className={styles['card__bottom-description']}>WHAT’S INCLUDED</span>
        <div className={styles['card__bottom-features']}>
          {item.features.map(feature => {
            return (
              <div className={styles['card__bottom-feature']} key={feature}>
                <Image src={iconCheck} alt="oneline-logo" />
                <p>
                  {feature}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
