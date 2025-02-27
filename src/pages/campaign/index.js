import MainMenu from '@components/shared/menu';
import Search from '@components/shared/input/search';
import Tabs from '@components/shared/tabs';
import { useEffect, useRef, useState } from 'react';
import CampaignWrapper from '@components/campaign/CampaignWrapper';
import CustomCampaign from '@components/campaign/CustomCampaign';
import { getCampaignsByCategory, getEmailTemplates } from '@api/campaign';
import Loader from '@components/shared/loader';
import useElementInView from '../../hooks/useElementInScreen';
import { setCRMCampaigns } from '@store/campaigns/slice';
import { useDispatch, useSelector } from 'react-redux';
import CreateCampaignSidebar from '@components/CampaignActionSidebar/CreateCampaignSidebar';
import { clientOptions } from '@global/variables';
import EmailTemplatesInCampaign from '@components/campaign/EmailTemplatesInCampaign';
import MainMenuV2 from '@components/shared/menu/menu-v2';

const index = () => {
  const [current, setCurrent] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const uniqueCategories = ['All Client', 'Renter', 'Buyer', 'Seller', 'Landlord'];
  const [loading, setLoading] = useState(false);
  const [showCreateCampaign, setShowCreateCampaign] = useState(false);
  const elementRef = useRef(null);
  let isVisible = useElementInView(elementRef);
  const dispatch = useDispatch();
  const CRMCampaigns = useSelector((state) => state.CRMCampaigns.CRMCampaigns);

  const renderCampaignWrapper = (category) => {
    console.log(category, 'categ');
    let filteredCampaigns;
    if (category == 'All Client') {
      filteredCampaigns = CRMCampaigns?.campaigns?.filter(
        (campaign) =>
          campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          campaign?.contact_category_2?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          campaign?.contact_status_2?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    } else {
      filteredCampaigns = CRMCampaigns?.campaigns?.filter(
        (campaign) =>
          (campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            campaign?.contact_category_2?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            campaign?.contact_status_2?.toLowerCase().includes(searchTerm.toLowerCase())) &&
          clientOptions.find((option) => option.id == campaign.contact_category_id)?.name === category,
      );
    }

    return (
      <CampaignWrapper
        key={category}
        category={category}
        openedTab={current}
        const
        headerTitle={`${category === 'All Client' ? '' : `${filteredCampaigns?.length} ${filteredCampaigns?.length === 1 ? 'Campaign' : 'Campaigns'} for ${category}s`}`}
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
          {loading === true || CRMCampaigns?.campaigns === undefined ? (
            <div className={'relative mt-10'} style={{ height: 'calc(100vh - 500px)' }}>
              <Loader />
            </div>
          ) : (
            renderCampaignWrapper('All Client')
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
  const [emailTemplates, setEmailTemplates] = useState();
  const [loadingData, setLoadingData] = useState(true);

  const fetchEmailTemplates = async () => {
    try {
      const emailResponse = await getEmailTemplates();
      setEmailTemplates(emailResponse.data.data);
      setLoadingData(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchEmailTemplates();
  }, []);
  const extraTabs = [
    {
      id: 6,
      name: 'Email Templates',
      href: '#',
      content: <EmailTemplatesInCampaign emailTemplates={emailTemplates} loadingData={loadingData} />,
    },
  ];
  const contacts = useSelector((state) => state.contacts.data.data);

  useEffect(() => {
    if (contacts === undefined && CRMCampaigns === undefined) {
      getCampaignsByCategory('Clients')
        .then((res) => {
          setLoading(true);
          dispatch(setCRMCampaigns(res.data));
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [contacts]);

  return (
    <div style={{ maxHeight: '100%', overflowY: 'auto', overflowX: 'hidden' }}>
      <CreateCampaignSidebar open={showCreateCampaign} setOpen={setShowCreateCampaign} />
      <div ref={elementRef} className={'sticky top-0 z-[10]'}>
        <MainMenuV2 />
      </div>
      {/*<div*/}
      {/*  className={'bg-campaign bg-no-repeat bg-cover flex items-center justify-center flex-col gap-10 pb-14 pt-14'}*/}
      {/*  style={{ height: '230px' }}>*/}
      {/*  <h3 className={'text-3xl leading-9 font-semibold text-white'}>*/}
      {/*    Effortless Client and Contact Campaign Coordination*/}
      {/*  </h3>*/}
      {/*  <Search*/}
      {/*    placeholder="Search for campaign title or client status..."*/}
      {/*    className="text-sm w-[550px]"*/}
      {/*    onChange={(event) => setSearchTerm(event.target.value)}*/}
      {/*  />*/}
      {/*</div>*/}
      <div className={'w-100 flex items-center'}>
        <Tabs
          setSearchTerm={setSearchTerm}
          loadingTabs={false}
          extraTabs={emailTemplates?.length > 0 ? extraTabs : undefined}
          current={current}
          setCurrent={setCurrent}
          tabs={localTabs}
          wrapperClassName={`bg-white mt-5`}
          className={'flex justify-between items-center px-[50px] bg-white'}
          navClassName={'justify-center'}
          addCampaignButton
          triggerCreateCustomCampaign={() => setShowCreateCampaign(true)}
        />
      </div>
      {current !== 6 && <CustomCampaign onClick={() => setShowCreateCampaign(true)} />}
    </div>
  );
};

export default index;

// export async function getServerSideProps(context) {
//   return {
//     props: {
//       requiresAuth: true,
//     },
//   };
// }
