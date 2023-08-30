import Button from '@components/shared/button';
import RequestCustomDesign from '@components/overlays/request-custom-design';
import { useState } from 'react';

const MarketingFooter = () => {
  const [openRequestCustomDesign, setOpenRequestCustomDesign] = useState(false);

  return (
    <>
      <div
        className={
          'bg-marketing-footer-gradient mx-12 mb-[120px] p-16 mt-20 rounded-lg flex justify-between items-center'
        }>
        <div>
          <h4 className={'text-3xl leading-9 font-extrabold text-white mb-3'}>Didn’t find what you’re looking for?</h4>
          <p className={'text-lg leading-6 font-normal text-indigo-200'}>Request custom design based on your needs.</p>
        </div>
        <Button secondary label="Request Custom Design" onClick={() => setOpenRequestCustomDesign(true)} />
      </div>
      {openRequestCustomDesign && <RequestCustomDesign handleOverlayClose={() => setOpenRequestCustomDesign(false)} />}
    </>
  );
};
export default MarketingFooter;
