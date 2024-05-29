import React, { useState } from 'react';
import Image from 'next/image';
import ApplyForPropertyEmail from '/public/animations/apply-for-property.gif';
import clsx from 'clsx';
import ApplyForm from '../ApplyForm';

const ApplyContainer = () => {
  const [showFullApplication, setShowFullApplication] = useState(true);

  return (
    <div className="h-full">
      <div className="w-full bg-[#F3EEFA]">
        <div className="max-w-[1280px] mx-auto px-[20px] pb-[100px]">
          <div className="flex items-center gap-[114px]  pt-[100px]  pb-[63px] px-[20px]">
            <div>
              <span className="px-[12px] py-[4px] bg-[#E8F2FF] text-[#477FC8] text-[14px] font-semibold leading-5 rounded-[14px] mix-blend-multiply	mb-[9px]">
                APPLY ONLINE
              </span>
              <h2 className="text-[38px] leading-[60px] font-semibold	text-gray6 mb-[15px]">
                Apply Now, Your Ideal Property Awaits!
              </h2>
              <p className="text-gray5 text-[20px] leading-[30px] max-w-[761px]">
                Apply now to find your perfect spot! Our streamlined online application makes it quick and easy. Don't
                miss out – start your journey to homeownership today!
              </p>
            </div>

            <Image src={ApplyForPropertyEmail} className="w-[250px] h-[250px]" />
          </div>
          <div className="">
            <button
              type="button"
              className={clsx(
                'rounded-t-lg	py-[20px] px-[26px] text-[22px] font-semibold leading-[33px] text-gray8 -tracking-[.44px]	',
                {
                  'bg-white': showFullApplication,
                  'bg-[#F3EEFA]': !showFullApplication,
                },
              )}
              onClick={() => {
                setShowFullApplication(true);
              }}>
              Full Application
            </button>
            <button
              type="button"
              className={clsx(
                'rounded-t-lg	py-[20px] px-[26px] text-[22px] font-semibold leading-[33px] text-gray8 -tracking-[.44px]',
                {
                  'bg-white': !showFullApplication,
                  'bg-[#F3EEFA]': showFullApplication,
                },
              )}
              onClick={() => {
                setShowFullApplication(false);
              }}>
              Only the Credit Check
            </button>
          </div>
          <div className="bg-white px-[20px]  ">
            {showFullApplication ? <ApplyForm /> : <div className="w-full h-full">Credit check</div>}
          </div>
        </div>
      </div>

      <div className="bg-white w-full h-[100px] flex justify-center items-center px-[24px] text-center">
        <p className="text-gray3 leading-6">
          © 2023 by Oxford Property Group & Oxford Property Partners & Oxford Property Group USA - Licensed Real Estate
          Brokers
        </p>
      </div>
    </div>
  );
};

export default ApplyContainer;
