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
import { useSelector } from 'react-redux';
import CampaignPreview from '@components/campaign/CampaignPreview';
import { getContactCampaignEventPreview } from '@api/campaign';

const index = () => {
  const router = useRouter();
  const { id } = router.query;
  const [currentButton, setCurrentButton] = useState(0);
  const allContacts = useSelector((state) => state.contacts.allContacts.data);

  const eventTypes = [
    {
      name: 'ALL EVENTS',
      icon: allEventsIcon,
      amount: 3,
    },
    {
      name: 'EMAIL EVENTS',
      icon: emailEventsIcon,
      amount: 3,
    },
    {
      name: 'SMS EVENTS',
      icon: smsEventsIcon,
      amount: 0,
    },
    {
      name: 'CAMPAIGN MATCHED TO',
      icon: campaignsMatchedTo,
      amount: 2,
    },
    {
      name: 'CLIENTS IN CAMPAIGN',
      icon: inCampaign,
      amount: 0,
    },
    {
      name: 'CLIENTS NOT IN CAMPAIGN',
      icon: notInCampaign,
      amount: 0,
    },
  ];
  const buttons = [
    {
      id: 0,
      name: 'All',
      count: allContacts?.filter((contact) => contact.category_2 === 'Renter').length,
    },
    {
      id: 1,
      name: 'In Campaign',
      count: allContacts?.filter((contact) => contact.category_2 === 'Renter' && contact.campaign_name === id).length,
    },
    {
      id: 2,
      name: 'Not In Campaign',
      count: allContacts?.filter((contact) => contact.category_2 === 'Renter' && contact.campaign_name === null).length,
    },
  ];
  const [searchTerm, setSearchTerm] = useState('');
  const [openCampaignPreview, setOpenCampaignPreview] = useState(false);

  useEffect(() => {
    setSearchTerm('');
  }, [currentButton]);

  useEffect(() => {
    getContactCampaignEventPreview(id).then((res) => console.log(res, 'response'));
  }, [id]);
  const renderTable = (currentButton) => {
    switch (currentButton) {
      case 0:
        return (
          <Table
            tableFor={'allCampaignContacts'}
            data={allContacts?.filter(
              (contact) =>
                contact.first_name.toLowerCase().includes(searchTerm.toLowerCase()) && contact.category_2 === 'Renter',
            )}
          />
        );
      case 1:
        return (
          <Table
            tableFor={'inCampaignContacts'}
            data={allContacts?.filter(
              (contact) =>
                contact.first_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                contact.category_2 === 'Renter' &&
                contact.campaign_name === id,
            )}
            setCurrentButton={setCurrentButton}
          />
        );
      case 2:
        return (
          <Table
            tableFor={'notInCampaignContacts'}
            data={allContacts?.filter(
              (contact) =>
                contact.first_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                contact.category_2 === 'Renter' &&
                contact.campaign_name === null,
            )}
          />
        );
    }
  };
  return (
    <SimpleBar style={{ maxHeight: '100%' }}>
      <MainMenu />
      <div className={'p-6 flex items-center justify-between'}>
        <div className={'flex gap-4 items-start'}>
          <ArrowBackIosIcon className={'text-lightBlue3 h-4 w-4 mt-2 cursor-pointer'} onClick={() => router.back()} />
          <div>
            <h4 className={'text-xl leading-7 font-medium text-gray7 mb-2'}>Campaign Title</h4>
            <div className={'px-1.5 py-0.5 bg-gray1 flex items-center justify-center'}>
              <span className={'text-xs leading-5 font-medium text-gray6'}>Renters: {id}</span>
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
              <img src={event.icon.src} className={'h-[30px] w-[30px]'} />
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
      {allContacts === undefined ? <></> : renderTable(currentButton)}
      {openCampaignPreview && (
        <CampaignPreview
          campaignId={id}
          open={openCampaignPreview}
          setOpen={setOpenCampaignPreview}
          title={'Campaign Name'}
          className={'mt-[68px]'}
          sms={2}
          email={3}
        />
      )}
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
