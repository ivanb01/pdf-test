import { useEffect } from 'react';
import maintenance from '/public/images/maintenance.png';

const index = () => {
  return (
    <div className="h-screen w-screen bg-[#d2efff]">
      <img className="h-screen mx-auto" src={maintenance.src}></img>
    </div>
  );
};

export default index;
