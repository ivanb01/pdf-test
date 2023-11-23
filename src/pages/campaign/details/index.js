import { useRouter } from 'next/router';
import SimpleBar from 'simplebar-react';
import MainMenu from '@components/shared/menu';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Button from '@components/shared/button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import allEventsIcon from '../../../../public/images/campaign/allEventsIcon.svg';
import emailEventsIcon from '../../../../public/images/campaign/emailEventsIcon.svg';
import smsEventsIcon from '../../../../public/images/campaign/smsEventsIcon.svg';
import campaignsMatchedTo from '../../../../public/images/campaign/campaignsMatchedTo.svg';
import inCampaign from '../../../../public/images/campaign/inCampaign.svg';
import notInCampaign from '../../../../public/images/campaign/notInCampaign.svg';
import Table from '@components/shared/table';
import ButtonsSlider from '@components/shared/button/buttonsSlider';
import { useEffect, useState } from 'react';
import Search from '@components/shared/input/search';
import { useDispatch, useSelector } from 'react-redux';
import CampaignPreview from '@components/campaign/CampaignPreview';
import { getAllEvents, getCampaignsByCategory, getCampaignsUsers } from '@api/campaign';
import { setCRMCampaigns, setUsersInCampaignGlobally } from '@store/campaigns/slice';
import Loader from '@components/shared/loader';

const index = () => {
  const router = useRouter();
  const { id, category } = router.query;
  const [currentButton, setCurrentButton] = useState(0);
  const { CRMCampaigns, usersInCampaignGlobally } = useSelector((state) => state.CRMCampaigns);
  const [campaignDetails, setCampaignDetails] = useState();
  const [campaignEvents, setCampaignEvents] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [openCampaignPreview, setOpenCampaignPreview] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllEvents(id).then((res) => {
      setCampaignEvents(res.data);
    });
  }, [id]);

  useEffect(() => {
    if (CRMCampaigns === undefined) {
      getCampaignsByCategory('Client').then((res) => {
        dispatch(setCRMCampaigns(res.data));
        setCampaignDetails(res.data.campaigns.find((c) => c.campaign_id == id));
      });
    } else if (CRMCampaigns !== undefined) {
      const campaigns = CRMCampaigns?.campaigns.find((c) => c.campaign_id == id);
      setCampaignDetails(campaigns);
    }
  }, [CRMCampaigns, id]);
  useEffect(() => {
    getCampaignsUsers(id).then((res) => {
      dispatch(setUsersInCampaignGlobally(res.data));
    });
  }, [id]);

  const totalContacts = usersInCampaignGlobally?.contacts.filter((contact) =>
    contact.contact_name.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const inCampaignContacts = usersInCampaignGlobally?.contacts_in_campaign.filter((contact) =>
    contact.contact_name.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const notInCamapaignContacts = usersInCampaignGlobally?.contacts_not_campaign.filter((contact) =>
    contact.contact_name.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const eventTypes = [
    {
      name: 'ALL EVENTS',
      icon: allEventsIcon,
      amount: usersInCampaignGlobally?.events.count,
    },
    {
      name: 'EMAIL EVENTS',
      icon: emailEventsIcon,
      amount: usersInCampaignGlobally?.events.email,
    },
    {
      name: 'SMS EVENTS',
      icon: smsEventsIcon,
      amount: usersInCampaignGlobally?.events.sms,
    },
    {
      name: 'CAMPAIGN MATCHED TO',
      icon: campaignsMatchedTo,
      amount: usersInCampaignGlobally?.contacts?.length,
    },
    {
      name: 'CLIENTS IN CAMPAIGN',
      icon: inCampaign,
      amount: usersInCampaignGlobally?.contacts_in_campaign?.length,
    },
    {
      name: 'CLIENTS NOT IN CAMPAIGN',
      icon: notInCampaign,
      amount: usersInCampaignGlobally?.contacts_not_campaign?.length,
    },
  ];
  const buttons = [
    {
      id: 0,
      name: 'All',
      count: usersInCampaignGlobally?.contacts?.length,
    },
    {
      id: 1,
      name: 'In Campaign',
      count: usersInCampaignGlobally?.contacts_in_campaign?.length,
    },
    {
      id: 2,
      name: 'Not In Campaign',
      count: usersInCampaignGlobally?.contacts_not_campaign?.length,
    },
  ];

  useEffect(() => {
    console.log(usersInCampaignGlobally);
  }, [usersInCampaignGlobally]);
  useEffect(() => {
    setSearchTerm('');
  }, [currentButton]);

  const renderTable = (currentButton) => {
    switch (currentButton) {
      case 0:
        return (
          <SimpleBar style={{ height: '100%' }} autoHide>
            <Table
              tableFor={'allCampaignContacts'}
              data={totalContacts}
              categoryType={category}
              status={usersInCampaignGlobally?.contact_status_1}
            />
          </SimpleBar>
        );
      case 1:
        return (
          <SimpleBar style={{ height: '100%' }} autoHide>
            <Table
              tableFor={'inCampaignContacts'}
              data={inCampaignContacts}
              setCurrentButton={setCurrentButton}
              categoryType={category}
              status={usersInCampaignGlobally?.contact_status_1}
            />
          </SimpleBar>
        );
      case 2:
        return (
          <SimpleBar style={{ height: '100%' }} autoHide>
            <Table
              tableFor={'notInCampaignContacts'}
              data={notInCamapaignContacts}
              categoryType={category}
              status={usersInCampaignGlobally?.contact_status_2}
            />
          </SimpleBar>
        );
    }
  };

  return (
    <>
      <MainMenu />
      {campaignEvents === undefined ||
      CRMCampaigns === undefined ||
      campaignDetails === undefined ||
      usersInCampaignGlobally === undefined ? (
        <div className="relative h-[90vh]">
          <Loader />
        </div>
      ) : (
        <>
          <div className={'p-6 flex items-center justify-between'}>
            <div className={'flex gap-4 items-start'}>
              <ArrowBackIosIcon
                className={'text-lightBlue3 h-4 w-4 mt-2 cursor-pointer'}
                onClick={() => router.back()}
              />
              <div>
                <h4 className={'text-xl leading-7 font-medium text-gray7 mb-2'}>{campaignDetails?.campaign_name}</h4>
                <div className={'px-1.5 py-0.5 bg-gray1 flex items-center justify-start w-max'}>
                  <span className={'text-xs leading-5 font-medium text-gray6'}>
                    {`${category}s`}: {usersInCampaignGlobally?.contact_status_2}
                  </span>
                </div>
              </div>
            </div>
            <Button
              primary
              leftIcon={<VisibilityIcon className={'h-4 w-4'} />}
              onClick={() => setOpenCampaignPreview(true)}>
              Campaign Preview
            </Button>
          </div>
          <div className={'p-6 grid grid-cols-6 gap-2.5 border-y border-gray2'}>
            {eventTypes.map((event, index) => (
              <div
                key={index}
                className={`flex flex-col gap-2.5 items-center justify-center ${
                  index === 2 ? 'border-r border-borderColor mr-1.5' : ''
                }`}>
                <div className={'flex gap-3 items-center justify-center'}>
                  <img src={event.icon.src} className={'h-[30px] w-[30px]'} alt={''} />
                  <span className="text-gray4 font-inter font-medium text-sm leading-5">{event.name}</span>
                </div>
                <span className={'text-lg leading-6 font-semibold text-gray7'}>{event.amount}</span>
              </div>
            ))}
          </div>
          <div className={'border-b border-gray2 h-[96px] flex p-6 items-center justify-between'}>
            <ButtonsSlider buttons={buttons} currentButton={currentButton} onClick={setCurrentButton} />
            <Search
              placeholder="Search"
              className="mr-4 text-sm"
              value={searchTerm}
              onInput={(event) => setSearchTerm(event.target.value)}
            />
          </div>
          {renderTable(currentButton)}
          {openCampaignPreview && (
            <CampaignPreview
              data={campaignEvents}
              campaignId={id}
              open={openCampaignPreview}
              setOpen={setOpenCampaignPreview}
              title={'Campaign Name'}
              className={'mt-[68px]'}
              sms={2}
              email={3}
            />
          )}
        </>
      )}
    </>
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
