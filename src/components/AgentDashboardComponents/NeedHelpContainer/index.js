import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import React from 'react';

const NeedHelpContainer = () => {
  return (
    <div
      className={
        'flex-1 p-4 md:p-6 flex flex-col gap-6 md:gap-[38px] bg-white border border-[#EFF4F5] rounded-lg  min-w-[300px] h-[306px]'
      }>
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

export default NeedHelpContainer;
