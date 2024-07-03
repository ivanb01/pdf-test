import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import React from 'react';

const NeedHelpContainer = () => {
  return (
    <div
      className={
        'flex-1 p-4 md:p-6 flex flex-col gap-6 md:gap-[38px] bg-white border border-[#EFF4F5] rounded-lg  min-w-[300px] h-[306px]'
      }>
      <svg width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.333374" y="0.333344" width="54.6667" height="54.6667" rx="8" fill="#06B6D4" />
        <path
          d="M27.6 35.6667C28.0667 35.6667 28.4612 35.5056 28.7834 35.1833C29.1056 34.8611 29.2667 34.4667 29.2667 34C29.2667 33.5333 29.1056 33.1389 28.7834 32.8167C28.4612 32.4945 28.0667 32.3333 27.6 32.3333C27.1334 32.3333 26.7389 32.4945 26.4167 32.8167C26.0945 33.1389 25.9334 33.5333 25.9334 34C25.9334 34.4667 26.0945 34.8611 26.4167 35.1833C26.7389 35.5056 27.1334 35.6667 27.6 35.6667ZM26.4 30.5333H28.8667C28.8667 29.8 28.95 29.2222 29.1167 28.8C29.2834 28.3778 29.7556 27.8 30.5334 27.0667C31.1112 26.4889 31.5667 25.9389 31.9 25.4167C32.2334 24.8945 32.4 24.2667 32.4 23.5333C32.4 22.2889 31.9445 21.3333 31.0334 20.6667C30.1223 20 29.0445 19.6667 27.8 19.6667C26.5334 19.6667 25.5056 20 24.7167 20.6667C23.9278 21.3333 23.3778 22.1333 23.0667 23.0667L25.2667 23.9333C25.3778 23.5333 25.6278 23.1 26.0167 22.6333C26.4056 22.1667 27 21.9333 27.8 21.9333C28.5112 21.9333 29.0445 22.1278 29.4 22.5167C29.7556 22.9056 29.9334 23.3333 29.9334 23.8C29.9334 24.2445 29.8 24.6611 29.5334 25.05C29.2667 25.4389 28.9334 25.8 28.5334 26.1333C27.5556 27 26.9556 27.6556 26.7334 28.1C26.5112 28.5445 26.4 29.3556 26.4 30.5333ZM27.6667 41C25.8223 41 24.0889 40.65 22.4667 39.95C20.8445 39.25 19.4334 38.3 18.2334 37.1C17.0334 35.9 16.0834 34.4889 15.3834 32.8667C14.6834 31.2445 14.3334 29.5111 14.3334 27.6667C14.3334 25.8222 14.6834 24.0889 15.3834 22.4667C16.0834 20.8445 17.0334 19.4333 18.2334 18.2333C19.4334 17.0333 20.8445 16.0833 22.4667 15.3833C24.0889 14.6833 25.8223 14.3333 27.6667 14.3333C29.5112 14.3333 31.2445 14.6833 32.8667 15.3833C34.4889 16.0833 35.9 17.0333 37.1 18.2333C38.3 19.4333 39.25 20.8445 39.95 22.4667C40.65 24.0889 41 25.8222 41 27.6667C41 29.5111 40.65 31.2445 39.95 32.8667C39.25 34.4889 38.3 35.9 37.1 37.1C35.9 38.3 34.4889 39.25 32.8667 39.95C31.2445 40.65 29.5112 41 27.6667 41ZM27.6667 38.3333C30.6445 38.3333 33.1667 37.3 35.2334 35.2333C37.3 33.1667 38.3334 30.6445 38.3334 27.6667C38.3334 24.6889 37.3 22.1667 35.2334 20.1C33.1667 18.0333 30.6445 17 27.6667 17C24.6889 17 22.1667 18.0333 20.1 20.1C18.0334 22.1667 17 24.6889 17 27.6667C17 30.6445 18.0334 33.1667 20.1 35.2333C22.1667 37.3 24.6889 38.3333 27.6667 38.3333Z"
          fill="white"
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
