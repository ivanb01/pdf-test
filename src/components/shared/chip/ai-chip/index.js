import React, { useState } from 'react';
import AIReviewed from '/public/images/ai-reviewed.svg';
import AI from '/public/images/ai.svg';
import TooltipComponent from '@components/shared/tooltip';

const AIChip = ({ reviewed, className }) => {
  return (
    <>
      <span className={`${reviewed ? `text-blue2` : 'text-green5'}`}>
        <AIComponent />
      </span>
      {/*  <TooltipComponent*/}
      {/*    side={'right'}*/}
      {/*    align="center"*/}
      {/*    triggerElement={<img className={className} src={reviewed ? AIReviewed.src : AI.src} alt="" />}>*/}
      {/*    <div style={{ width: '230px' }} className={'flex flex-col gap-4'}>*/}
      {/*      {!reviewed ? (*/}
      {/*        <ChipText*/}
      {/*          title={'New Contact'}*/}
      {/*          reviewed*/}
      {/*          description={*/}
      {/*            'This contact is new, and you haven’t reviewed it yet. After you review it, the chip will turn green.'*/}
      {/*          }*/}
      {/*        />*/}
      {/*      ) : (*/}
      {/*        <ChipText*/}
      {/*          title={'Reviewed Contact'}*/}
      {/*          reviewed={false}*/}
      {/*          description={'This AI contact has been reviewed and approved.'}*/}
      {/*        />*/}
      {/*      )}*/}
      {/*    </div>*/}
      {/*  </TooltipComponent>*/}
      {/*</>*/}
    </>
  );
};
const ChipText = ({ title, description, reviewed }) => {
  return (
    <div>
      <div className={'flex gap-1.5 text-white items-center'}>
        <span className={`${reviewed ? `text-blue2` : 'text-green5'}`}>
          <AIComponent />
        </span>
        <h6 className={'text-xs leading-4 font-semibold m-0'}>{title}</h6>
      </div>
      <h6 className={'text-xs leading-4 font-normal mt-1.5'}>{description}</h6>
    </div>
  );
};
const AIComponent = () => {
  return (
    <svg width="24" height="14" viewBox="0 0 24 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_6228_250)">
        <rect x="3" y="2" width="17" height="10" fill="white" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.50685 0.5C1.84621 0.5 0.5 1.84226 0.5 3.49879V10.5012C0.5 12.1574 1.83599 13.5 3.50685 13.5H20.4932C22.1538 13.5 23.5 12.1577 23.5 10.5012V3.49879C23.5 1.8426 22.164 0.5 20.4932 0.5H3.50685ZM14.5 4.5V9.5H13.5V10.5H16.5V9.5H15.5V4.5H16.5V3.5H13.5V4.5H14.5ZM10.5 7.5H7.5V10.5H6.5V7V5.5C6.5 4.38773 7.39762 3.5 8.50488 3.5H9.49512C10.6061 3.5 11.5 4.39543 11.5 5.5V7.5V10.5H10.5V7.5ZM8.49896 4.5C7.94725 4.5 7.5 4.94386 7.5 5.5V6.5H10.5V5.5C10.5 4.94772 10.0573 4.5 9.50104 4.5H8.49896Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_6228_250">
          <rect width="24" height="14" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default AIChip;
