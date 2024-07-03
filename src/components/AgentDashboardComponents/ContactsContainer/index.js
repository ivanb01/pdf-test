import { useRouter } from 'next/router';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArrowOutwardOutlinedIcon from '@mui/icons-material/ArrowOutwardOutlined';
import React from 'react';

const ContactsContainers = ({ needToCommunicateBox, needToReview, needToContactCount }) => {
  const router = useRouter();

  return (
    <div className=" flex-1 p-4 md:p-6 flex flex-col gap-6 md:gap-[38px] bg-white border border-[#EFF4F5] rounded-lg  min-w-[300px] h-[306px]">
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
          <svg width="55" height="58" viewBox="0 0 55 58" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="54.6667" height="57.3333" rx="8" fill="#F59E0B" />
            <path
              d="M16.6667 43.3333V40.6667H38V43.3333H16.6667ZM16.6667 16.6667V14H38V16.6667H16.6667ZM27.3333 30C28.4444 30 29.3889 29.6111 30.1667 28.8333C30.9444 28.0556 31.3333 27.1111 31.3333 26C31.3333 24.8889 30.9444 23.9444 30.1667 23.1667C29.3889 22.3889 28.4444 22 27.3333 22C26.2222 22 25.2778 22.3889 24.5 23.1667C23.7222 23.9444 23.3333 24.8889 23.3333 26C23.3333 27.1111 23.7222 28.0556 24.5 28.8333C25.2778 29.6111 26.2222 30 27.3333 30ZM16.6667 39.3333C15.9333 39.3333 15.3056 39.0722 14.7833 38.55C14.2611 38.0278 14 37.4 14 36.6667V20.6667C14 19.9333 14.2611 19.3056 14.7833 18.7833C15.3056 18.2611 15.9333 18 16.6667 18H38C38.7333 18 39.3611 18.2611 39.8833 18.7833C40.4056 19.3056 40.6667 19.9333 40.6667 20.6667V36.6667C40.6667 37.4 40.4056 38.0278 39.8833 38.55C39.3611 39.0722 38.7333 39.3333 38 39.3333H16.6667ZM19 36.6667C20 35.4222 21.2111 34.4444 22.6333 33.7333C24.0556 33.0222 25.6222 32.6667 27.3333 32.6667C29.0444 32.6667 30.6111 33.0222 32.0333 33.7333C33.4556 34.4444 34.6667 35.4222 35.6667 36.6667H38V20.6667H16.6667V36.6667H19ZM22.9333 36.6667H31.7333C31.0889 36.2222 30.3944 35.8889 29.65 35.6667C28.9056 35.4444 28.1333 35.3333 27.3333 35.3333C26.5333 35.3333 25.7611 35.4444 25.0167 35.6667C24.2722 35.8889 23.5778 36.2222 22.9333 36.6667ZM27.3333 27.3333C26.9556 27.3333 26.6389 27.2056 26.3833 26.95C26.1278 26.6944 26 26.3778 26 26C26 25.6222 26.1278 25.3056 26.3833 25.05C26.6389 24.7944 26.9556 24.6667 27.3333 24.6667C27.7111 24.6667 28.0278 24.7944 28.2833 25.05C28.5389 25.3056 28.6667 25.6222 28.6667 26C28.6667 26.3778 28.5389 26.6944 28.2833 26.95C28.0278 27.2056 27.7111 27.3333 27.3333 27.3333Z"
              fill="white"
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
        <div className="flex justify-between items-center">
          {needToCommunicateBox ? (
            <div className={'flex gap-4 px-[28px] justify-center items-center bg-red1 rounded-lg'}>
              <p className={'text-[30px] font-semibold text-red5'}>{needToContactCount}</p>
              <p className={'text-[16px] text-red3 font-medium'}>Warning!</p>
            </div>
          ) : (
            <p className="font-semibold text-[30px]  ml-7">{needToReview}</p>
          )}

          <div
            className="h-[48px] w-[48px] rounded-full bg-gray1 flex items-center justify-center"
            role={'button'}
            onClick={() => {
              if (!needToCommunicateBox) {
                needToReview == 0 ? router.push('/contacts/clients') : router.push('/ai-summary');
              } else {
                router.push('/contacts/needcontact');
              }
            }}>
            <ArrowOutwardOutlinedIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactsContainers;
