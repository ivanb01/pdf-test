import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EmailIcon from '@mui/icons-material/Email';
import GroupIcon from '@mui/icons-material/Group';
import InCampaing from '../../../../public/images/campaign/inCampaign.svg';
import neverAssigned from '../../../../public/images/campaign/neverAssigned.svg';
import unassigned from '../../../../public/images/campaign/unassigned.svg';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useRouter } from 'next/router';
import CampaignPreview from '@components/campaign/CampaignPreview';
import { useEffect, useState } from 'react';
import TooltipComponent from '@components/shared/tooltip';
import Link from 'next/link';
import { getContactStatusByStatusId } from '@global/functions';

const CampaignCard = ({
  name,
  events,
  category,
  campaign_id,
  contacts_never_assigned_count,
  contact_assigned_count,
  contact_unassigned_count,
  contact_status_2,
  isVisible,
  openedTab,
  ...props
}) => {
  useEffect(() => {
    console.log(category, 'category');
  }, [category]);
  const router = useRouter();
  const [openCampaignPreview, setOpenCampaignPreview] = useState(false);

  return (
    <div className={'flex flex-col rounded-lg campaigns-box-shadow justify-between'}>
      <div className={'px-4 py-[15px]'}>
        <div className={'flex flex-col gap-[14px]'}>
          <Link href={{ pathname: '/campaign/details', query: { id: campaign_id } }} passHref>
            <div
              className={'flex justify-between items-center cursor-pointer'}
              role={'button'}
              onClick={() => {
                router.push({
                  pathname: '/campaign/details',
                  query: { id: campaign_id },
                });
              }}>
              <h6 className={'text-sm leading-5 font-semibold text-gray7'}>{name}</h6>
              <ArrowForwardIosIcon className={'h-4 w-4 text-gray5'} />
            </div>
          </Link>
          <div className={'text-xs leading-5 font-medium text-gray6 flex'}>
            <span className={'mr-1'}>Events:</span>
            <span className={'mr-2'}>
              {events?.count} <EmailIcon className={'h-3 w-3 text-[#909CBE]'} />
            </span>
          </div>
        </div>
        <div className={'flex justify-between items-center flex-wrap '}>
          <div
            style={{ width: 'max-content' }}
            className={
              'bg-gray1 text-xs mt-[14px] leading-5 font-medium text-gray6 px-1.5 py-0.5 flex gap-1 items-center-center'
            }>
            <div className={'m-auto'}>
              {openedTab === 0
                ? props.contact_category_id != null && props.contact_status_id != null
                  ? `${props.contact_category_2}s | ${getContactStatusByStatusId(props.contact_category_id, props.contact_status_id)}:`
                  : 'All Clients:'
                : openedTab !== 0
                  ? `${getContactStatusByStatusId(props.contact_category_id, props.contact_status_id)}:`
                  : 'All Clients:'}
            </div>
            <div className={'flex'}>
              {contact_assigned_count + contact_unassigned_count + contacts_never_assigned_count
                ? contact_assigned_count + contact_unassigned_count + contacts_never_assigned_count
                : 0}
              <GroupIcon className={'h-4 w-4 text-[#909CBE] ml-1'} />
            </div>
          </div>
          <div className={'flex gap-2 text-xs leading-5 font-medium text-gray6 mt-[14px]'}>
            <TooltipComponent
              side={'top'}
              align={'center'}
              triggerElement={
                <div className={'flex items-center gap-1'}>
                  <img src={InCampaing.src} className={'h-[18px] w-[18px]'} alt={''} />
                  <span>{contact_assigned_count ? contact_assigned_count : 0}</span>
                </div>
              }>
              <div className=" pointer-events-none  text-xs font-medium text-white ">
                <p className="font-semibold">Clients in campaign</p>
              </div>
            </TooltipComponent>
            <TooltipComponent
              side={'top'}
              align={'center'}
              triggerElement={
                <div className={'flex items-center gap-1'}>
                  <img src={unassigned.src} alt={''} />
                  <span>{contact_unassigned_count ? contact_unassigned_count : 0}</span>
                </div>
              }>
              <div className=" pointer-events-none  text-xs font-medium text-white ">
                <p className="font-semibold">Clients not in campaign</p>
              </div>
            </TooltipComponent>
            <TooltipComponent
              side={'top'}
              align={'center'}
              triggerElement={
                <div className={'flex items-center gap-1'}>
                  <img src={neverAssigned.src} alt={''} />
                  <span>{contacts_never_assigned_count ? contacts_never_assigned_count : 0}</span>
                </div>
              }>
              <div className=" pointer-events-none  text-xs font-medium text-white ">
                <p className="font-semibold">Clients never assigned in campaign</p>
              </div>
            </TooltipComponent>
          </div>
        </div>
      </div>
      <div
        onClick={() => {
          setOpenCampaignPreview(true);
        }}
        role={'button'}
        style={{ height: '42px' }}
        className={'flex items-center justify-center gap-2 text-gray5 bg-lightBlue1 cursor-pointer'}>
        <VisibilityIcon className={'h-4 w-4'} />
        <p className={'text-xs leading-4 font-medium'}>Template Preview</p>
      </div>
      <CampaignPreview
        campaignFor={
          props.contact_category_id != null && props.contact_status_id != null
            ? `${props.contact_category_2}s - ${getContactStatusByStatusId(props.contact_category_id, props.contact_status_id)}`
            : 'All Clients'
        }
        campaignId={campaign_id}
        open={openCampaignPreview}
        setOpen={setOpenCampaignPreview}
      />
    </div>
  );
};

export default CampaignCard;
