import 'swiper/css';
import 'swiper/css/pagination';
import { SectionIntro } from '@components/public/SectionIntro';
import { SectionFeaturesSwiper } from '@components/public/SectionFeaturesSwiper';
import { Testimonials } from '@components/public/Testimonials';
import SectionSmartSync from '@components/public/SectionSmartSync';
import SectionOnlineForms from '@components/public/SectionOnlineForms';
import SectionMonitorCampaigns from '@components/public/SectionMonitorCampaigns';
import SectionCategorizeContacts from '@components/public/SectionCategorizeContacts';
import styles from './styles.module.scss';
import { SectionAllInOne } from '@components/public/SectionAllInOne';
import { SectionStartTrial } from '@components/public/SectionStartTrial';
import { Header } from '@components/public/Header';
import { SectionContact } from '@components/public/SectionContact';
import { Footer } from '@components/public/Footer';

export default function Features() {
  return (
    <div>
        <Header />
        <>
            <SectionIntro/>
            <div className={styles.divider1}/>
            <SectionFeaturesSwiper/>
            <div className={styles.divider2}/>
            <SectionSmartSync/>
            <div className={styles.divider3}/>
            <SectionOnlineForms/>
            <div className={styles.divider4}/>
            <SectionMonitorCampaigns/>
            <div className={styles.divider5}/>
            <SectionCategorizeContacts/>
            <div className={styles.divider4}/>
            <SectionAllInOne/>
            <Testimonials/>
            <SectionStartTrial/>
        </>
        <Footer />
    </div>
  );
}
