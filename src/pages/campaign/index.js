import MainMenu from '@components/shared/menu';
import SimpleBar from 'simplebar-react';
import Search from '@components/shared/input/search';
import Tabs from '@components/shared/tabs';
import { useEffect, useRef, useState } from 'react';
import CampaignWrapper from '@components/campaign/CampaignWrapper';
import CustomCampaign from '@components/campaign/CustomCampaign';
import { getCampaignsByCategory } from '@api/campaign';
import Loader from '@components/shared/loader';
import useElementInView from '../../hooks/useElementInScreen';

const index = () => {
  const [current, setCurrent] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const uniqueCategories = ['Renter', 'Buyer', 'Seller', 'Landlord'];
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const elementRef = useRef(null);
  let isVisible = useElementInView(elementRef);

  const renderCampaignWrapper = (category) => {
    const filteredCampaigns = campaigns?.campaigns?.filter(
      (campaign) =>
        (campaign.campaign_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          campaign.contact_category_2.toLowerCase().includes(searchTerm.toLowerCase())) &&
        campaign.contact_category_2 === category,
    );

    return (
      <CampaignWrapper
        key={category}
        category={category}
        headerTitle={`${filteredCampaigns?.length} Campaign for ${category}s`}
        campaignCards={filteredCampaigns && filteredCampaigns}
        isVisible={isVisible}
      />
    );
  };
  const localTabs = [
    {
      id: 0,
      name: 'All',
      href: '#',
      content: (
        <>
          {loading === true ? (
            <div className={'relative mt-10'} style={{ height: 'calc(100vh - 500px)' }}>
              <Loader />
            </div>
          ) : (
            uniqueCategories.map((category) => {
              return renderCampaignWrapper(category);
            })
          )}
        </>
      ),
    },
    {
      id: 2,
      name: 'for Renters',
      href: '#',
      content: (
        <>
          {loading === true ? (
            <div className={'relative mt-10'} style={{ height: 'calc(100vh - 500px) mt-10' }}>
              <Loader />
            </div>
          ) : (
            renderCampaignWrapper('Renter')
          )}
        </>
      ),
    },
    {
      id: 3,
      name: 'for Buyers',
      href: '#',
      content: (
        <>
          {loading === true ? (
            <div className={'relative mt-10'} style={{ height: 'calc(100vh - 500px)' }}>
              <Loader />
            </div>
          ) : (
            renderCampaignWrapper('Buyer')
          )}
        </>
      ),
    },
    {
      id: 4,
      name: 'for Sellers',
      href: '#',
      content: (
        <>
          {loading === true ? (
            <div className={'relative mt-10'} style={{ height: 'calc(100vh - 500px)' }}>
              <Loader />
            </div>
          ) : (
            renderCampaignWrapper('Seller')
          )}
        </>
      ),
    },
    {
      id: 5,
      name: 'for Landlords',
      href: '#',
      content: (
        <>
          {loading === true ? (
            <div className={'relative mt-10'} style={{ height: 'calc(100vh - 500px)' }}>
              <Loader />
            </div>
          ) : (
            renderCampaignWrapper('Landlord')
          )}
        </>
      ),
    },
  ];
  useEffect(() => {
    setLoading(true);
    getCampaignsByCategory('Client')
      .then((res) => setCampaigns(res.data))
      .finally(() => {
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    console.log(campaigns, 'campaigns');
  }, [campaigns]);

  return (
    <SimpleBar style={{ maxHeight: '100%' }}>
      <div ref={elementRef}>
        <MainMenu />
      </div>
      <div
        className={'bg-campaign bg-no-repeat bg-cover flex items-center justify-center flex-col gap-10 pb-14 pt-14'}
        style={{ height: '230px' }}>
        <h3 className={'text-3xl leading-9 font-semibold text-white'}>What design do you need today?</h3>
        <Search
          placeholder="Search for campaign title or client status..."
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
      <CustomCampaign />
    </SimpleBar>
  );
};

export default index;

export async function getServerSideProps(context) {
  return {
    props: {
      requiresAuth: true,
    },
  };
}
