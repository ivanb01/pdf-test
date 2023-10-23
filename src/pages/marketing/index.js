import MainMenu from '@components/shared/menu';
import Search from '@components/shared/input/search';
import Tabs from '@components/shared/tabs';
import { useEffect, useState } from 'react';
import MarketingCard from '@components/marketing/MarketingCard';
import MarketingFooter from '@components/marketing/MarketingFooter';
import SimpleBar from 'simplebar-react';
import MarketingEmptyState from '@components/marketing/MarketingEmptyState';
import ListingShowSheet1 from '../../../public/images/marketing/ListingShowSheet1.png';
import ListingShowSheet2 from '../../../public/images/marketing/ListingShowSheet2.png';
import OnePageShowSheet1 from '../../../public/images/marketing/OnePageShowSheet1.png';
import OnePageShowSheet2 from '../../../public/images/marketing/OnePageShowSheet2.jpg';
import ListingCarouselInstagram from '../../../public/images/marketing/ListingCarouselInstagram.jpg';
import HolidayPostCardInstagram1 from '../../../public/images/marketing/HappyPostCardInstagram1.jpg';
import HolidayPostCardInstagram2 from '../../../public/images/marketing/HappyPostCardInstagram2.jpg';
import HolidayPostCardInstagram3 from '../../../public/images/marketing/HappyPostCardInstagram3.jpg';
import ListingCarouselFacebook from '../../../public/images/marketing/ListingCarouselFacebook.jpg';
import HolidayPostCardFacebook1 from '../../../public/images/marketing/HolidayPostCardFacebook1.jpg';
import HolidayPostCardFacebook2 from '../../../public/images/marketing/HolidayPostCardFacebook2.jpg';
import JustListedPostcard from '../../../public/images/marketing/JustListedPostcard.jpg';
import JustSoldPostcard from '../../../public/images/marketing/JustSoldPostcard.jpg';
import NewDevelopmentPostcard from '../../../public/images/marketing/NewDevelopmentPostcard.png';
import VerticalBannersRent from '../../../public/images/marketing/VerticalBannersRent.jpg';
import VerticalBannersSale from '../../../public/images/marketing/VerticalBannersSale.jpg';
import BusinessCards from '../../../public/images/marketing/BusinessCards.jpg';
import HorizontalBannersRent from '../../../public/images/marketing/HorizontalBannersRent.jpg';
import HorizontalBannersSale from '../../../public/images/marketing/HorizontalBannersSale.jpg';
import ListingShowSheet11 from '../../../public/images/marketing/ListingShowSheet1.1.png';
import ListingShowSheet21 from '../../../public/images/marketing/ListingShowSheet2.1.png';
import JustListedPostcard1 from '../../../public/images/marketing/JustListedPostcard1.jpg';
import NewDevelopmentPostcard1 from '../../../public/images/marketing/NewDevelopmentPostcard1.png';
import BusinessCard1 from '../../../public/images/marketing/BusinessCard1.jpg';
import withAuth from '@components/withAuth';

const index = () => {
  const [current, setCurrent] = useState(0);
  const cardItems = [
    {
      type: 'show_sheet',
      src: ['https://i.imgur.com/k1nH4ap.png', 'https://i.imgur.com/2bONvky.png'],
      title: 'Listing Show Sheet 1',
      listingUrl: true,
    },
    {
      type: 'show_sheet',
      src: ['https://i.imgur.com/ENAZVuA.png', 'https://i.imgur.com/SuhlsnQ.png'],
      title: 'Listing Show Sheet 2',
      listingUrl: true,
    },
    {
      type: 'show_sheet',
      src: ['https://i.imgur.com/qdrKKZd.png'],
      title: 'One Page Sheet 1',
      listingUrl: true,
    },
    {
      type: 'show_sheet',
      src: ['https://i.imgur.com/5J1yoki.jpg'],
      title: 'One Page Sheet 2',
      listingUrl: true,
    },
    {
      type: 'instagram_post',
      src: ['https://i.imgur.com/9hXnnLt.jpg'],
      title: 'Listing Carousel Instagram',
      listingUrl: true,
    },
    {
      type: 'instagram_post',
      src: ['https://i.imgur.com/EM1dH2z.jpg'],
      title: 'Holiday Post Card Instagram 1',
      listingUrl: false,
    },
    {
      type: 'instagram_post',
      src: ['https://i.imgur.com/WRArADS.jpg'],
      title: 'Holiday Post Card Instagram 2',
      listingUrl: false,
    },
    {
      type: 'instagram_post',
      src: ['https://i.imgur.com/37D52Xy.jpg'],
      title: 'Holiday Post Card Instagram 3',
      listingUrl: false,
    },
    {
      type: 'facebook_post',
      src: ['https://i.imgur.com/dKM7cl4.jpg'],
      title: 'Listing Carousel Facebook ',
      listingUrl: true,
    },
    {
      type: 'facebook_post',
      src: ['https://i.imgur.com/HEbFAsj.jpg'],
      title: 'Holiday Post Card Facebook 1',
      listingUrl: false,
    },
    {
      type: 'facebook_post',
      src: ['https://i.imgur.com/rxoYZrJ.jpg'],
      title: 'Holiday Post Card Facebook 2',
      listingUrl: false,
    },
    {
      title: 'Just Listed Postcard',
      src: ['https://i.imgur.com/Vfv4Nc1.jpg', 'https://i.imgur.com/oOZrWnL.jpg'],
      type: 'postcard',
      listingUrl: true,
    },
    {
      title: 'Just Sold Postcard',
      src: ['https://i.imgur.com/ywezELt.jpg', 'https://i.imgur.com/oOZrWnL.jpg'],
      type: 'postcard',
      listingUrl: true,
    },
    {
      title: 'New Development Postcard',
      src: ['https://i.imgur.com/sxBG24Y.png'],
      type: 'postcard',
      listingUrl: true,
    },
    {
      type: 'banners',
      src: ['https://i.imgur.com/SfhTRg5.jpg'],
      title: 'Vertical Banners - Rent',
      listingUrl: false,
    },
    {
      type: 'banners',
      src: ['https://i.imgur.com/OAqc1P5.jpg'],
      title: 'Vertical Banners - Sale',
      listingUrl: false,
    },
    {
      type: 'banners',
      src: ['https://i.imgur.com/hQQdb8T.jpg'],
      title: 'Horizontal Banners - Rent',
      listingUrl: false,
    },
    {
      type: 'banners',
      src: ['https://i.imgur.com/FkaxRji.jpg'],
      title: 'Horizontal Banners - Sale',
      listingUrl: false,
    },
    {
      type: 'business_card',
      src: ['https://i.imgur.com/iPbRFOb.jpg', 'https://i.imgur.com/fYTGKin.jpg'],
      title: 'Business Cards',
      listingUrl: false,
    },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const filteredCards = cardItems.filter((card) => card.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const localTabs = [
    {
      id: 0,
      name: 'All',
      href: '#',
      content: (
        <>
          {filteredCards.length > 0 && (
            <div className="grid grid-cols-5 gap-6 gap-y-12 mx-[50px] mt-[60px]">
              {filteredCards.length > 0 && filteredCards.map((card) => <MarketingCard key={card.id} {...card} />)}
            </div>
          )}
          {filteredCards.length === 0 && <MarketingEmptyState />}
        </>
      ),
    },
    {
      id: 1,
      name: 'Show Sheet',
      href: '#',
      content: (
        <>
          {filteredCards.length > 0 && (
            <div className="grid grid-cols-5 gap-6 gap-y-12 mx-[50px] mt-[60px]">
              {filteredCards.length > 0 &&
                filteredCards
                  .filter((card) => card.type === 'show_sheet')
                  .map((card) => <MarketingCard key={card.id} {...card} />)}
            </div>
          )}
          {filteredCards.length === 0 && <MarketingEmptyState />}
        </>
      ),
    },
    {
      id: 2,
      name: 'Instagram Post',
      href: '#',
      content: (
        <>
          {filteredCards.length > 0 && (
            <div className="grid grid-cols-5 gap-6 gap-y-12 mx-[50px] mt-[60px]">
              {filteredCards.length > 0 &&
                filteredCards
                  .filter((card) => card.type === 'instagram_post')
                  .map((card) => <MarketingCard key={card.id} {...card} />)}
            </div>
          )}
          {filteredCards.length === 0 && <MarketingEmptyState />}
        </>
      ),
    },
    {
      id: 3,
      name: 'Facebook post',
      href: '#',
      content: (
        <>
          {filteredCards.length > 0 && (
            <div className="grid grid-cols-5 gap-6 gap-y-12 mx-[50px] mt-[60px]">
              {filteredCards.length > 0 &&
                filteredCards
                  .filter((card) => card.type === 'facebook_post')
                  .map((card) => <MarketingCard key={card.id} {...card} />)}
            </div>
          )}
          {filteredCards.length === 0 && <MarketingEmptyState />}
        </>
      ),
    },
    {
      id: 4,
      name: 'Postcard',
      href: '#',
      content: (
        <>
          {filteredCards.length > 0 && (
            <div className="grid grid-cols-5 gap-6 gap-y-12 mx-[50px] mt-[60px]">
              {filteredCards.length > 0 &&
                filteredCards
                  .filter((card) => card.type === 'postcard')
                  .map((card) => <MarketingCard key={card.id} {...card} />)}
            </div>
          )}
          {filteredCards.length === 0 && <MarketingEmptyState />}
        </>
      ),
    },
    {
      id: 5,
      name: 'Banners',
      href: '#',
      content: (
        <>
          {filteredCards.length > 0 && (
            <div className="grid grid-cols-5 gap-6 gap-y-12 mx-[50px] mt-[60px]">
              {filteredCards.length > 0 &&
                filteredCards
                  .filter((card) => card.type === 'banners')
                  .map((card) => <MarketingCard key={card.id} {...card} />)}
            </div>
          )}
          {filteredCards.length === 0 && <MarketingEmptyState />}
        </>
      ),
    },
    {
      id: 6,
      name: 'Business Card',
      href: '#',
      content: (
        <>
          {filteredCards.length > 0 && (
            <div className="grid grid-cols-5 gap-6 gap-y-12 mx-[50px] mt-[60px]">
              {filteredCards.length > 0 &&
                filteredCards
                  .filter((card) => card.type === 'business_card')
                  .map((card) => <MarketingCard key={card.id} {...card} />)}
            </div>
          )}
          {filteredCards.length === 0 && <MarketingEmptyState />}
        </>
      ),
    },
  ];

  useEffect(() => {
    document.querySelector('.main-menu').classList.add('main-menu-important');
  }, []);

  return (
    <SimpleBar style={{ maxHeight: '100%' }}>
      <MainMenu />
      <div
        className={'bg-marketing-header-gradient flex items-center justify-center flex-col gap-10 pb-14 pt-14'}
        style={{ height: '230px' }}>
        <h3 className={'text-3xl leading-9 font-semibold text-white'}>What design do you need today?</h3>
        <Search
          placeholder="Search here..."
          className="text-sm w-[550px]"
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>
      <div className={'w-100 flex items-center'}>
        <Tabs
          loadingTabs={false}
          current={current}
          setCurrent={setCurrent}
          tabs={localTabs}
          wrapperClassName={`bg-white mt-5`}
          className={'mx-auto bg-white'}
          navClassName={'justify-center'}
        />
      </div>
      <MarketingFooter />
    </SimpleBar>
  );
};

export default withAuth(index);

// export async function getServerSideProps(context) {
//   return {
//     props: {
//       requiresAuth: true,
//     },
//   };
// }
