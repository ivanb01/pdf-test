import 'swiper/css';
import 'swiper/css/pagination';
import { SectionContact } from '@components/public/SectionContact';
import { Header } from '@components/public/Header';
import { Footer } from '@components/public/Footer';

export default function Contact() {
  return (
    <div>
      <Header />
      <SectionContact />
      <Footer />
    </div>
  );
}
