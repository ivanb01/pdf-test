import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EmailIcon from '@mui/icons-material/Email';
import ChatIcon from '@mui/icons-material/Chat';
import GroupIcon from '@mui/icons-material/Group';
import InCampaing from '../../../../public/images/campaign/inCampaign.svg';
import NotInCampaign from '../../../../public/images/campaign/notInCampaign.svg';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useRouter } from 'next/router';
import CampaignPreview from '@components/campaign/CampaignPreview';
import { useState } from 'react';

const CampaignCard = ({
  campaign_name,
  events,
  category,
  campaign_id,
  contact_never_assigned_count,
  contact_assigned_count,
  contact_unassigned_count,
  contact_status_2,
  isVisible,
}) => {
  const router = useRouter();
  const [openCampaignPreview, setOpenCampaignPreview] = useState(false);

  return (
    <div className={'flex flex-col rounded-lg campaigns-box-shadow'}>
      <div className={'px-4 py-[15px]'}>
        <div className={'flex flex-col gap-[14px]'}>
          <div
            className={'flex justify-between items-center cursor-pointer'}
            role={'button'}
            onClick={() => {
              router.push({
                pathname: '/campaign/details',
                query: { id: campaign_id, category: category },
              });
            }}>
            <h6 className={'text-sm leading-5 font-semibold'}>{campaign_name}</h6>
            <ArrowForwardIosIcon className={'h-4 w-4 text-gray5'} />
          </div>
          <div className={'text-xs leading-5 font-medium text-gray6 flex'}>
            <span className={'mr-1'}>{`${Number(events.sms + events.email)}  Events: `}</span>
            <span className={'mr-2'}>
              {events.email} <EmailIcon className={'h-3 w-3 text-[#909CBE]'} />
            </span>
            <span>
              {events.sms} <ChatIcon className={'h-3 w-3  text-[#909CBE]'} />
            </span>
          </div>
          <div className={'flex justify-between items-center'}>
            <div
              style={{ width: 'max-content' }}
              className={
                'bg-gray1 text-xs leading-5 font-medium text-gray6 px-1.5 py-0.5 flex gap-1 items-center-center'
              }>
              <div className={'m-auto'}>{contact_status_2}:</div>
              <div>
                {contact_never_assigned_count + contact_assigned_count}
                <GroupIcon className={'h-4 w-4 text-[#909CBE] ml-1'} />
              </div>
            </div>
            <div className={'flex gap-2 text-xs leading-5 font-medium text-gray6'}>
              <div className={'flex items-center gap-1'}>
                <img src={InCampaing.src} className={'h-4 w-4'} alt={''} />
                <span>{contact_assigned_count}</span>
              </div>
              <div className={'flex items-center gap-1'}>
                <img src={NotInCampaign.src} className={'h-4 w-4'} alt={''} />
                <span>{contact_unassigned_count}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{ height: '42px' }}
        className={'flex items-center justify-center gap-2 text-gray5 bg-lightBlue1 cursor-pointer'}>
        <VisibilityIcon className={'h-4 w-4'} />
        <p
          className={'text-xs leading-4 font-medium'}
          onClick={() => {
            setOpenCampaignPreview(true);
          }}>
          Template Preview
        </p>
      </div>
      {openCampaignPreview && (
        <CampaignPreview
          campaignId={campaign_id}
          open={openCampaignPreview}
          setOpen={setOpenCampaignPreview}
          className={`${isVisible ? 'mt-[68px]' : ''}`}
          title={'Campaign Name'}
          sms={2}
          email={3}
        />
      )}
    </div>
  );
};

export default CampaignCard;
