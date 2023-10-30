import MainMenu from '@components/shared/menu';
import SimpleBar from 'simplebar-react';
import Search from '@components/shared/input/search';
import Tabs from '@components/shared/tabs';
import { useEffect, useState } from 'react';
import CampaignWrapper from '@components/campaign/CampaignWrapper';
import CustomCampaign from '@components/campaign/CustomCampaign';
import { getCampaignsByCategory } from '@api/campaign';
import Loader from '@components/shared/loader';

const index = () => {
  const [current, setCurrent] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const campaignCards = [
    {
      title: 'Campaign Title',
      email: 2,
      sms: 3,
      status_2: 'New Lead',
      category_1: 'Renter',
    },
    {
      title: 'Campaign Title',
      email: 1,
      sms: 2,
      status_2: 'Attempted Contact',
      category_1: 'Renter',
    },
    {
      title: 'Campaign Title',
      email: 2,
      sms: 3,
      status_2: 'In Communication',
      category_1: 'Renter',
    },
    {
      title: 'Campaign Title',
      email: 2,
      sms: 3,
      status_2: 'Appointment Set',
      category_1: 'Renter',
    },
    {
      title: 'Campaign Title',
      email: 2,
      sms: 3,
      status_2: 'Actively Working',
      category_1: 'Renter',
    },
    {
      title: 'Campaign Title',
      email: 2,
      sms: 3,
      status_2: 'Offer Submitted',
      category_1: 'Renter',
    },
    {
      title: 'Campaign Title',
      email: 2,
      sms: 3,
      status_2: 'Contract Signed',
      category_1: 'Renter',
    },
    {
      title: 'Campaign Title',
      email: 2,
      sms: 3,
      status_2: 'Closed',
      category_1: 'Renter',
    },
    {
      title: 'Campaign Title',
      email: 2,
      sms: 3,
      status_2: 'New Lead',
      category_1: 'Buyers',
    },
    {
      title: 'Campaign Title',
      email: 2,
      sms: 3,
      status_2: 'New Lead',
      category_1: 'Landlords',
    },
  ];
  const uniqueCategories = ['Renter', 'Buyer', 'Seller', 'Landlord'];
  const [campaigns, setCampaigns] = useState([]);
  const renderCampaignWrapper = (category) => {
    console.log(category, 'category');

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
          {uniqueCategories.map((category) => {
            return renderCampaignWrapper(category);
          })}
        </>
      ),
    },
    {
      id: 2,
      name: 'for Renters',
      href: '#',
      content: renderCampaignWrapper('Renter'),
    },
    {
      id: 3,
      name: 'for Buyers',
      href: '#',
      content: renderCampaignWrapper('Buyer'),
    },
    {
      id: 4,
      name: 'for Sellers',
      href: '#',
      content: renderCampaignWrapper('Seller'),
    },
    {
      id: 5,
      name: 'for Landlords',
      href: '#',
      content: renderCampaignWrapper('Landlord'),
    },
  ];
  useEffect(() => {
    getCampaignsByCategory('Client').then((res) => setCampaigns(res.data));
  }, []);
  useEffect(() => {
    console.log(campaigns, 'campaigns');
  }, [campaigns]);
  return (
    <SimpleBar style={{ maxHeight: '100%' }}>
      <MainMenu />
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
