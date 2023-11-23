import styles from './styles.module.scss';
import clsx from 'clsx';
import Image from 'next/image';
import {Feature} from '../Feature';
import iconDiscuss from '/public/images/public/icon-discuss.svg';
import iconChecklist from '/public/images/public/icon-checklist.svg';
import iconEmail from '/public/images/public/icon-email.svg';
import onlineFormsBg from '/public/images/public/section-online-forms-bg.png';
import onlineFormsBgDetail from '/public/images/public/section-online-forms-bg-detail.svg'

const features = [{
  icon: iconDiscuss,
  title: 'No Need for 3rd Party Form Builder',
  description: <p>
    Our forms are integrated with your workflow, so we sent them without you having to think about it.
  </p>
}, {
  icon: iconChecklist,
  title: 'Create Your Own Custom Form',
  description: <p>
    Save your forms as templates, copy templates and use them for all clients.
  </p>
}, {
  icon: iconEmail,
  title: 'Use Existing Template from the Library',
  description: <p>
    Our library of 100&apos;s of forms makes it easy to get the document you need as fast as you need it.
  </p>
}];

const SectionOnlineForms = () => {
  return (
    <div className="container-public">
      <div className={styles.section}>
        <div className={clsx(styles['section__content'], styles['section__content--description'])}>
          <div className={styles['section__content-intro']}>
            <span className={styles.tag}>Online Forms</span>
            <h3>Send Online Forms</h3>
            <span className={styles.description}>Want. When you want it.</span>
          </div>
          <div
            className={clsx(styles['section__content'], styles['section__content--bg'], styles['section__content--hide-lg'])}>
            <Image src={onlineFormsBg} />
          </div>
          <div className={styles['section__content-features']}>
            {
              features.map((feature, i) => <Feature key={'feature-' + i} item={feature}/>)
            }
          </div>
          <div className={styles['section__content-bg-detail']}>
            <Image src={onlineFormsBgDetail} />
          </div>
        </div>
        <div
          className={clsx(styles['section__content'], styles['section__content--bg'], styles['section__content--hide-sm'])}>
          <Image src={onlineFormsBg} />
        </div>
      </div>
    </div>
  )
};

export default SectionOnlineForms;
