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
import noUsersFound from '../../../../public/images/campaign/noUsersFound.svg';
const index = () => {
  const router = useRouter();
  const { id } = router.query;
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
        <Button primary leftIcon={<VisibilityIcon className={'h-4 w-4'} />}>
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
      <div className={'bg-gray1 h-[96px]'}></div>
      <div className={'flex flex-col items-center justify-center mt-[10%] gap-6 text-center'}>
        <img src={noUsersFound.src} />
        <div>
          <h4 className={'text-sm leading-5 font-medium text-gray7'}>There is no contact matching to this campaign</h4>
          <span className={'text-xs leading-4 font-normal text-gray4'}>
            Here, you'll find a list of all contacts that have been matched to this campaign.
          </span>
        </div>
      </div>
      {/*<Table tableFor={'allCampaignContacts'} />*/}
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
