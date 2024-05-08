import MainMenu from '@components/shared/menu';
import Search from '@components/shared/input/search';
import Tabs from '@components/shared/tabs';
import { useEffect, useState } from 'react';
import MarketingCard from '@components/marketing/MarketingCard';
import MarketingFooter from '@components/marketing/MarketingFooter';
import SimpleBar from 'simplebar-react';
import MarketingEmptyState from '@components/marketing/MarketingEmptyState';
import withAuth from '@components/withAuth';

const index = () => {
  const [current, setCurrent] = useState(0);
  const cardItems = [
    {
      type: 'show_sheet',
      src: ['https://i.imgur.com/l4aUVk2.png', 'https://i.imgur.com/adDX0aW.png'],
      title: 'Listing Show Sheet 1',
      listingUrl: true,
    },
    {
      type: 'show_sheet',
      src: ['https://i.imgur.com/0wJWNAQ.png', 'https://i.imgur.com/ewfhd9R.png'],
      title: 'Listing Show Sheet 2',
      listingUrl: true,
    },
    {
      type: 'show_sheet',
      src: ['https://i.imgur.com/wEcmy3O.png'],
      title: 'One Page Show Sheet 1',
      listingUrl: true,
    },
    {
      type: 'show_sheet',
      src: ['https://i.imgur.com/3s6FHnx.jpg'],
      title: 'One Page Show Sheet 2',
      listingUrl: true,
    },
    {
      type: 'instagram_post',
      src: ['https://i.imgur.com/wq8xzZ1.jpg'],
      title: 'Listing Carousel Instagram',
      listingUrl: true,
    },
    {
      type: 'instagram_post',
      src: ['https://i.imgur.com/kLJ7zIe.jpg'],
      title: 'Holiday Post Card Instagram 1',
      listingUrl: false,
    },
    {
      type: 'instagram_post',
      src: ['https://i.imgur.com/5PL3nZK.jpg'],
      title: 'Holiday Post Card Instagram 2',
      listingUrl: false,
    },
    {
      type: 'instagram_post',
      src: ['https://i.imgur.com/OY04z2u.jpg'],
      title: 'Holiday Post Card Instagram 3',
      listingUrl: false,
    },
    {
      type: 'facebook_post',
      src: ['https://i.imgur.com/u68sJ7g.jpg'],
      title: 'Listing Carousel Facebook ',
      listingUrl: true,
    },
    {
      type: 'facebook_post',
      src: ['https://i.imgur.com/qkQ4687.jpg'],
      title: 'Holiday Post Card Facebook 1',
      listingUrl: false,
    },
    {
      type: 'facebook_post',
      src: ['https://i.imgur.com/HZSogrw.jpg'],
      title: 'Holiday Post Card Facebook 2',
      listingUrl: false,
    },
    {
      title: 'Just Listed Postcard',
      src: ['https://i.imgur.com/V0hff1L.jpg', 'https://i.imgur.com/kwcGCHb.jpg'],
      type: 'postcard',
      listingUrl: true,
    },
    {
      title: 'Just Sold Postcard',
      src: ['https://i.imgur.com/P7iiADI.jpg', 'https://i.imgur.com/kwcGCHb.jpg'],
      type: 'postcard',
      listingUrl: true,
    },
    {
      title: 'New Development Postcard',
      src: ['https://i.imgur.com/dXKzgNB.png'],
      type: 'postcard',
      listingUrl: true,
    },
    {
      type: 'banners',
      src: ['https://i.imgur.com/GpIkDYC.jpg'],
      title: 'Vertical Banners - Rent',
      listingUrl: false,
    },
    {
      type: 'banners',
      src: ['https://i.imgur.com/aCe3PoH.jpg'],
      title: 'Vertical Banners - Sale',
      listingUrl: false,
    },
    {
      type: 'banners',
      src: ['https://i.imgur.com/cJMYCfF.jpg'],
      title: 'Horizontal Banners - Rent',
      listingUrl: false,
    },
    {
      type: 'banners',
      src: ['https://i.imgur.com/10DelEH.jpg'],
      title: 'Horizontal Banners - Sale',
      listingUrl: false,
    },
    {
      type: 'business_card',
      src: ['https://i.imgur.com/k8s1Ic3.jpg', 'https://i.imgur.com/PJYCclf.jpg'],
      title: 'Business Cards',
      listingUrl: false,
    },
    {
      type: 'facebook_post',
      src: ['https://i.imgur.com/u34H0ej.jpeg'],
      title: 'Just Listed Facebook',
      listingUrl: true,
    },
    {
      type: 'show_sheet',
      src: ['https://i.imgur.com/VLquvQP.png', 'https://i.imgur.com/EM1VB8A.png'],
      title: 'Showsheet (Multi Page)',
      listingUrl: true,
    },
    {
      type: 'show_sheet',
      src: ['https://i.imgur.com/6D0JA0d.png'],
      title: 'Showsheet 2 (Single Page)',
      listingUrl: true,
    },
    {
      type: 'facebook_post',
      src: ['https://i.imgur.com/vUCcYJq.jpeg'],
      title: 'Social Media Just Listed',
      listingUrl: true,
    },
    {
      type: 'instagram_post',
      title: 'Social Media For Sale',
      src: ['https://i.imgur.com/4sLG46w.jpeg'],
      listingUrl: true,
    },
    {
      type: 'show_sheet',
      title: 'Showsheet For Sale',
      src: ['https://i.imgur.com/JylORjL.png', 'https://i.imgur.com/6HnUu47_d.webp?maxwidth=760&fidelity=grand'],
      listingUrl: true,
    },
    {
      title: 'Featured Services Postcard',
      type: 'postcard',
      src: ['https://i.imgur.com/mQfKmTB.png'],
      listingUrl: false,
    },
    {
      title: 'Buyers Agent Postcard',
      type: 'postcard',
      src: ['https://i.imgur.com/XEU0moQ.png'],
      listingUrl: false,
    },
    {
      title: 'Buying in NYC Postcard',
      type: 'postcard',
      src: ['https://i.imgur.com/AX1lcDy.png', 'https://i.imgur.com/B40lDkv.jpeg'],
      listingUrl: false,
    },
    {
      title: 'Renting vs. Buying Postcard',
      type: 'postcard',
      src: ['https://i.imgur.com/nbzIFMw_d.webp?maxwidth=760&fidelity=grand'],
      listingUrl: false,
    },
    {
      title: 'Home Evaluation Postcard',
      type: 'postcard',
      src: ['https://i.imgur.com/M1uswLf.png'],
      listingUrl: false,
    },
    {
      title: 'Dream Home Buyer Postcard',
      type: 'postcard',
      src: ['https://i.imgur.com/XrB3d5Z_d.webp?maxwidth=760&fidelity=grand'],
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
              {filteredCards.length > 0 && filteredCards.map((card, index) => <MarketingCard key={index} {...card} />)}
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
                  .map((card, index) => <MarketingCard key={index} {...card} />)}
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
                  .map((card, index) => <MarketingCard key={index} {...card} />)}
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
                  .map((card, index) => <MarketingCard key={index} {...card} />)}
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
                  .map((card, index) => <MarketingCard key={index} {...card} />)}
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
                  .map((card, index) => <MarketingCard key={index} {...card} />)}
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
                  .map((card, index) => <MarketingCard key={index} {...card} />)}
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
    <>
      <SimpleBar style={{ maxHeight: '100%' }}>
        <div className={'sticky top-0 z-10'}>
          <MainMenu />
        </div>
        <div
          className={'bg-marketing-header-gradient flex items-center justify-center flex-col gap-10 pb-14 pt-14'}
          style={{ height: '230px' }}
        >
          <div>
            <h3 className={'text-3xl leading-9 font-semibold text-white'}>What design do you need today?</h3>
            <p className={'text-[12px] text-center font-medium mt-2 text-white'}>
              Receive custom digital templates to your email - Ready in 24 Hours or Less!
            </p>
          </div>
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
    </>
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
