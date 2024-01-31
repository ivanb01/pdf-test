import Button from '@components/shared/button';
import SlideOver from '@components/shared/slideOver';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import specificClients from '/public/images/specific-clients.svg';

const CreateCampaignSidebar = ({ open, setOpen }) => {
  return (
    <SlideOver
      width="w-[1040px]"
      open={open}
      setOpen={setOpen}
      title="Buyers, Settling in & Referrals"
      className="top-[70px]"
      rounded>
      <div className="">
        <div className=" -mt-3 mb-4 text-gray8 text-sm font-medium">
          Choose the clients who will be eligible of this campaign
        </div>
        <div className="flex">
          <div className="cursor-pointer rounded-lg border-2 border-lightBlue3 bg-lightBlue1 px-[18px] py-4 flex mr-3">
            <img src={specificClients.src} />
            <div className="ml-4">
              <div className="text-gray7 font-semibold">All Clients</div>
              <div className="text-gray5 mt-1">
                Each client, regardless the status they’re in, will be part of this campaign
              </div>
            </div>
          </div>
          <div className="cursor-pointer rounded-lg border-2 border-gray2 px-[18px] py-4 flex">
            <img src={specificClients.src} />
            <div className="ml-4">
              <div className="text-gray7 font-semibold">Specific Clients</div>
              <div className="text-gray5 mt-1">
                Only clients who I choose by the status, will be part of this campaign
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideOver>
  );
};

export default CreateCampaignSidebar;
