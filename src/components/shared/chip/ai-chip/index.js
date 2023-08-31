import React, { useState } from 'react';
import AIReviewed from '/public/images/ai-reviewed.svg';
import AI from '/public/images/ai.svg';
import MyTooltip from '@components/shared/my-tooltip';

const AIChip = ({ reviewed, className }) => {
  const [closeTooltip, setCloseTooltip] = useState(true);
  return (
    <>
      <MyTooltip/>
    </>
  // <img onMouseEnter={() => setCloseTooltip(true)} className={className}
  //      src={reviewed ? AIReviewed.src : AI.src} alt='' />
    // <div
    //   className={`text-white ${
    //     reviewed ? 'bg-green5' : 'bg-blue2'
    //   } py-[3px] inline-block px-3 rounded-full text-xs font-medium items-center`}
    // >
    //   AI
    // </div>
  );
};

export default AIChip;
