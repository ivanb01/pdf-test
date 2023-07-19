import React from 'react';
import AIReviewed from 'public/images/ai-reviewed.svg';
import AI from 'public/images/ai.svg';
const AIChip = ({ reviewed }) => {
  return (
    <img src={reviewed ? AIReviewed.src : AI.src} alt="" />
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
