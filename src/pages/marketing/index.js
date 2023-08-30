import MainMenu from '@components/shared/menu';
import Search from '@components/shared/input/search';
import Tabs from '@components/shared/tabs';
import { useState } from 'react';
import MarketingCard from '@components/marketing/MarketingCard';
import MarketingFooter from '@components/marketing/MarketingFooter';

const index = () => {
  const [current, setCurrent] = useState(0);
  const cards = [
    {
      img: 'https://i.imgur.com/u3yJjo7.png',
      name: 'Template Title here 1',
    },
    {
      img: 'https://i.imgur.com/vbIgvG1.png',
      name: 'Template Title here 2',
    },
    {
      img: 'https://i.imgur.com/H7b0tb0.png',
      name: 'Template Title here 3',
    },
    {
      img: 'https://i.imgur.com/bvOqrCp.png',
      name: 'Template Title here 4,',
    },
    {
      img: 'https://i.imgur.com/mf3rhBo.png',
      name: 'Template Title here 5,',
    },
  ];
  const [searchTerm, setSearchTerm] = useState('');
  const localTabs = [
    {
      id: 0,
      name: 'Digital Design',
      href: '#',
      content: (
        <div className="grid grid-cols-5 gap-6 gap-y-12 mx-[50px] mt-[60px]">
          {cards.map((card) => {
            if (card.name.includes(searchTerm)) {
              return <MarketingCard {...card} />;
            }
          })}
        </div>
      ),
    },
    {
      id: 1,
      name: 'Printed Design',
      href: '#',
      content: (
        <div className="grid grid-cols-5 gap-6 gap-y-12 mx-[50px] mt-[60px]">
          {cards.splice(2).map((card) => {
            if (card.name.includes(searchTerm)) {
              return <MarketingCard {...card} />;
            }
          })}
        </div>
      ),
    },
  ];

  return (
    <>
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
          className={'mx-auto w-[550px] bg-white'}
          navClassName={'justify-center'}
        />
      </div>
      <MarketingFooter />
    </>
  );
};

export default index;
