import { useSelector } from 'react-redux';
import Button from '@components/shared/button';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import AddIcon from '@mui/icons-material/Add';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { useRouter } from 'next/router';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import ArrowOutwardOutlinedIcon from '@mui/icons-material/ArrowOutwardOutlined';
import { useState } from 'react';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
const NeedHelpContainer = () => {
  return (
    <div className={'p-6   flex-1 flex flex-col gap-[38px] bg-white border border-[#EFF4F5] rounded-lg mb-[48px] '}>
      <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="54" height="54" rx="10" fill="#1F2937" />
        <path
          d="M31.3333 19.5L34.8333 16M34.8333 16L38.3333 19.5M34.8333 16V23M31.3333 37V35.6C31.3333 33.6398 31.3333 32.6597 30.9519 31.911C30.6163 31.2525 30.0809 30.717 29.4223 30.3815C28.6736 30 27.6935 30 25.7333 30H20.6C18.6398 30 17.6597 30 16.911 30.3815C16.2525 30.717 15.717 31.2525 15.3815 31.911C15 32.6597 15 33.6398 15 35.6V37M27.25 21.25C27.25 23.5052 25.4218 25.3333 23.1667 25.3333C20.9115 25.3333 19.0833 23.5052 19.0833 21.25C19.0833 18.9948 20.9115 17.1667 23.1667 17.1667C25.4218 17.1667 27.25 18.9948 27.25 21.25Z"
          stroke="white"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <div>
        <p className={'text-[#101828] font-bold text-md'}>Need help?</p>
        <br />
        <p className={'text-[#101828] font-medium text-sm'}>
          Contact our support team by phone, text, or email if you need assistance.{' '}
        </p>
        <div className={'flex justify-between align-center mt-[30px] flex-wrap gap-1'}>
          <div className={'flex gap-2 justify-center items-center'}>
            <div className={'h-[48px] w-[48px] flex items-center justify-center bg-[#F3F4F6] rounded-full'}>
              <LocalPhoneOutlinedIcon />
            </div>
            <div className={'flex flex-col gap-2'}>
              <p className={'text-[14px] font-medium text-gray6'}>Phone Support </p>
              <p className={'text-sm font-semibold text-gray6'}>(646) 389-4548</p>
            </div>
          </div>
          <div className={'flex gap-2 justify-center items-center'}>
            <div className={'h-[48px] w-[48px] flex items-center justify-center bg-[#F3F4F6] rounded-full'}>
              <MailOutlineIcon />
            </div>
            <div className={'flex flex-col gap-2'}>
              <p className={'text-[14px] font-medium text-gray6'}>Email Support</p>
              <p className={'text-sm font-semibold text-gray6'}>az@opgny.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactsContainers = ({ needToCommunicateBox, needToReview, needToContactCount }) => {
  const router = useRouter();

  return (
    <div className="  flex-1 p-6 flex flex-col gap-[38px] bg-white border border-[#EFF4F5] rounded-lg mb-[48px]">
      <div
        className={`h-[54px] w-[54px] rounded-md ${
          !needToCommunicateBox ? 'bg-lightBlue3' : 'bg-[#3B82F6]'
        } flex justify-center items-center`}>
        {needToCommunicateBox ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path
              d="M18.6668 21L21.0002 23.3333L25.6668 18.6667M14.0002 17.5H9.3335C7.1591 17.5 6.07191 17.5 5.21431 17.8552C4.07084 18.3289 3.16236 19.2373 2.68872 20.3808C2.3335 21.2384 2.3335 22.3256 2.3335 24.5M18.0835 3.83922C19.7937 4.5315 21.0002 6.2082 21.0002 8.16667C21.0002 10.1251 19.7937 11.8018 18.0835 12.4941M15.7502 8.16667C15.7502 10.744 13.6608 12.8333 11.0835 12.8333C8.50617 12.8333 6.41683 10.744 6.41683 8.16667C6.41683 5.58934 8.50617 3.5 11.0835 3.5C13.6608 3.5 15.7502 5.58934 15.7502 8.16667Z"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path
              d="M14.0002 18.0833H8.75017C7.12201 18.0833 6.30793 18.0833 5.6455 18.2843C4.15403 18.7367 2.98688 19.9039 2.53444 21.3953C2.3335 22.0578 2.3335 22.8718 2.3335 24.5M18.6668 21L21.0002 23.3333L25.6668 18.6667M16.9168 8.75C16.9168 11.6495 14.5663 14 11.6668 14C8.76733 14 6.41683 11.6495 6.41683 8.75C6.41683 5.8505 8.76733 3.5 11.6668 3.5C14.5663 3.5 16.9168 5.8505 16.9168 8.75Z"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      <div className="flex justify-between flex-col flex-1">
        <div className="flex gap-[10px] ">
          <InfoOutlinedIcon className={'h-4 w-4 mt-1'} />
          {!needToCommunicateBox ? (
            <div className={'text-[#101828]'}>
              <p className={'text-md font-bold'}>New Smart Sync</p>
              <br />
              <p className={'text-sm font-normal'}>
                New contacts were imported from <span className={'font-semibold'}>Gmail</span> and need to be reviewed.
              </p>
            </div>
          ) : (
            <div className={'text-[#101828]'}>
              <p className={'text-md font-bold'}>Need To Contact</p>
              <br />
              <p className={'text-sm font-normal max-w-[292px]'}>
                You need to regularly contact clients to maintain good communication.
              </p>
            </div>
          )}
        </div>
        <div className="flex justify-between items-center ml-7">
          <p className="font-semibold text-[30px]">{!needToCommunicateBox ? needToReview : needToContactCount}</p>
          <div
            className="h-[48px] w-[48px] rounded-full bg-gray1 flex items-center justify-center"
            role={'button'}
            onClick={() => {
              if (!needToCommunicateBox) {
                needToReview == 0 ? router.push('/contacts/clients') : router.push('/ai-summary');
              } else {
                needToContactCount == 0 ? router.push('/contacts/clients') : router.push('/contacts/needcontact');
              }
            }}>
            <ArrowOutwardOutlinedIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

const SuccessContactsContainers = ({ needToCommunicateBox, needToReview, needToContactCount }) => {
  const router = useRouter();
  return (
    <div className={' p-6 flex flex-col gap-[38px] bg-white border border-[#EFF4F5] rounded-lg mb-[48px]  flex-1'}>
      <div className={'h-[54px] w-[54px] rounded-md bg-green5 flex justify-center items-center'}>
        {needToCommunicateBox ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path
              d="M18.6668 21L21.0002 23.3333L25.6668 18.6667M14.0002 17.5H9.3335C7.1591 17.5 6.07191 17.5 5.21431 17.8552C4.07084 18.3289 3.16236 19.2373 2.68872 20.3808C2.3335 21.2384 2.3335 22.3256 2.3335 24.5M18.0835 3.83922C19.7937 4.5315 21.0002 6.2082 21.0002 8.16667C21.0002 10.1251 19.7937 11.8018 18.0835 12.4941M15.7502 8.16667C15.7502 10.744 13.6608 12.8333 11.0835 12.8333C8.50617 12.8333 6.41683 10.744 6.41683 8.16667C6.41683 5.58934 8.50617 3.5 11.0835 3.5C13.6608 3.5 15.7502 5.58934 15.7502 8.16667Z"
              stroke="white"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path
              d="M14.0002 18.0833H8.75017C7.12201 18.0833 6.30793 18.0833 5.6455 18.2843C4.15403 18.7367 2.98688 19.9039 2.53444 21.3953C2.3335 22.0578 2.3335 22.8718 2.3335 24.5M18.6668 21L21.0002 23.3333L25.6668 18.6667M16.9168 8.75C16.9168 11.6495 14.5663 14 11.6668 14C8.76733 14 6.41683 11.6495 6.41683 8.75C6.41683 5.8505 8.76733 3.5 11.6668 3.5C14.5663 3.5 16.9168 5.8505 16.9168 8.75Z"
              stroke="white"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        )}
      </div>
      <div className={'flex justify-between flex-col  flex-1'}>
        <div className={'flex gap-[10px] items-center'}>
          <div>
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M19.4998 30.0001L26.4998 37.0001L40.4998 23.0001M53.3332 30.0001C53.3332 42.8867 42.8865 53.3334 29.9998 53.3334C17.1132 53.3334 6.6665 42.8867 6.6665 30.0001C6.6665 17.1134 17.1132 6.66675 29.9998 6.66675C42.8865 6.66675 53.3332 17.1134 53.3332 30.0001Z"
                stroke="#059669"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className={'font-bold text-md'}>
            {!needToCommunicateBox
              ? 'No Smart Sync contacts to review!'
              : 'Communication health is great! No clients need to be contacted!'}
          </p>
        </div>
        <div className={'flex justify-between items-center ml-7'}>
          <p className="font-semibold text-[30px]">{!needToCommunicateBox ? needToReview : needToContactCount}</p>
          <div
            className={'h-[48px] w-[48px] rounded-full bg-gray1 flex items-center justify-center'}
            role={'button'}
            onClick={() => {
              if (!needToCommunicateBox) {
                needToReview == 0 ? router.push('/contacts/clients') : router.push('/ai-summary');
              } else {
                needToContactCount == 0 ? router.push('/contacts/clients') : router.push('/contacts/needcontact');
              }
            }}>
            <ArrowOutwardOutlinedIcon />
          </div>
        </div>
      </div>
    </div>
  );
};
const AgentDashboardLayout = ({ success, needToContactCount, needToReview }) => {
  const userInfo = useSelector((state) => state.global.userInfo);
  const router = useRouter();

  const [showInfo, setShowInfo] = useState(true);
  return (
    <div className={'bg-[#F1F6F8] mt-7 h-full mx-4 rounded-t-[22px] flex flex-col gap-8 pt-8'}>
      <div className={'mx-9'}>
        <p className={'font-semibold text-[#101828] text-3xl'}>Welcome {userInfo?.first_name ?? ''}!</p>
        <p className={'font-medium text-[#475467] mt-[10px] text-[16px]'}>
          We’re here to help you close more deals, stay on top of your clients and relationships & make sure you love
          where you work. Any feedback on how we can improve is encouraged and welcome! For software support click the
          question mark in the top right corner of the navigation bar.{' '}
        </p>
      </div>
      <div className={'flex gap-3 mx-9'}>
        <Button
          className={'h-[45px]'}
          leftIcon={<ThumbUpOffAltIcon className={'-mt-1 -ml-1'} />}
          primary
          label={'Submit a deal'}
          onClick={() => router.push('/deals')}
        />
        <Button
          className={'h-[45px]'}
          onClick={() => window.open('https://dashboard.robinpowered.com/5west37/login')}
          leftIcon={<AddIcon className={'-mt-1'} />}
          white
          label={'Book a conference room '}
        />
      </div>
      {showInfo && (
        <div
          className={
            'rounded-xl border border-[#FEF3C7] bg-[#FFFBEB] mx-9 p-4 flex gap-3 items-start justify-center text-black'
          }>
          <InfoOutlinedIcon className={'h-5 w-5'} />
          <div className={'flex-1'}>
            <p className={'mb-1 font-semibold text-sm]'}>Update profile</p>
            <p className={'text-sm'}>Please ensure your profile information is up to date and correct. </p>
            <div
              className={'flex gap-2 font-semibold items-center mt-3 cursor-pointer '}
              onClick={() => router.push('/settings/my-profile')}>
              <p className={'text-sm'}>View Profile</p>
              <ArrowForwardOutlinedIcon className={'h-5 w-5'} />
            </div>
          </div>
          <div
            className={'p-2 bg-[#FEF3C7] flex items-center justify-center rounded-lg'}
            role={'button'}
            onClick={() => setShowInfo(false)}>
            <ClearOutlinedIcon className={'h-4 w-4 text-[#D97706]'} />
          </div>
        </div>
      )}
      <hr className={'bg-[#D9E6EC] mx-[22px]'} />
      <div className={'flex mx-[22px] gap-[22px] flex-wrap'}>
        <NeedHelpContainer />
        {success && needToReview == 0 ? (
          <SuccessContactsContainers needToReview={needToReview} needToContactCount={needToContactCount} />
        ) : (
          <ContactsContainers needToReview={needToReview} needToContactCount={needToContactCount} />
        )}
        {success && needToContactCount == 0 ? (
          <SuccessContactsContainers
            needToCommunicateBox
            needToReview={needToReview}
            needToContactCount={needToContactCount}
          />
        ) : (
          <ContactsContainers
            needToCommunicateBox
            needToReview={needToReview}
            needToContactCount={needToContactCount}
          />
        )}
      </div>
    </div>
  );
};

export default AgentDashboardLayout;
