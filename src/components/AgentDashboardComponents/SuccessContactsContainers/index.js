import { useRouter } from 'next/router';
import ArrowOutwardOutlinedIcon from '@mui/icons-material/ArrowOutwardOutlined';
import React from 'react';

const SuccessContactsContainers = ({ needToCommunicateBox, needToReview, needToContactCount }) => {
  const router = useRouter();
  return (
    <div
      className={
        ' flex-1 p-4 md:p-6 flex flex-col gap-6 md:gap-[38px] bg-white border border-[#EFF4F5] rounded-lg min-w-[300px] h-[306px]'
      }>
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
export default SuccessContactsContainers;
