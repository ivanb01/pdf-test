import 'swiper/css';
import 'swiper/css/pagination';
import { SectionContact } from '@components/public/SectionContact';
import { Header } from '@components/public/Header';
import { Footer } from '@components/public/Footer';
import styles from './styles.module.scss';
export default function Contact() {
  return (
    <div>
      <Header />
      <div className={styles.Container}>
        <SectionContact />
        <Footer />
      </div>
    </div>
  );
}
