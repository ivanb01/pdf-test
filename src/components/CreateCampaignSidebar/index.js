import Button from '@components/shared/button';
import SlideOver from '@components/shared/slideOver';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import specificClients from '/public/images/specific-clients.svg';
import call from '/public/images/call.svg';
import Input from '@components/shared/input';

const CreateCampaignSidebar = ({ open, setOpen }) => {
  const [eligibleClients, setEligibleClients] = useState(0);
  const [typeOfEvent, setTypeOfEvent] = useState(null);

  const Card = ({ title, description, icon, className, active, onClick, narrow }) => {
    let padding = narrow ? 'py-[8px] px-[15px] min-w-[170px]' : 'px-[18px] py-4';
    return (
      <div
        onClick={onClick}
        className={`cursor-pointer rounded-lg border-2 ${
          active && 'border-lightBlue3 bg-lightBlue1'
        } ${padding} flex ${className} ${!description && 'items-center'}`}>
        <img src={icon} />
        <div className="ml-4 text-sm">
          <div className="text-gray7 font-semibold">{title}</div>
          {description && <div className="text-gray5 mt-1">{description}</div>}
        </div>
      </div>
    );
  };

  return (
    <SlideOver
      width="w-[1040px]"
      open={open}
      setOpen={setOpen}
      title="Buyers, Settling in & Referrals"
      className="top-[70px]"
      rounded>
      <div className="-mt-3 mb-5">
        <div className="mb-4 text-gray8 text-sm font-medium">
          Choose the clients who will be eligible of this campaign
        </div>
        <div className="flex">
          <Card
            className="mr-3"
            title={'All Clients'}
            description={'Each client, regardless the status they’re in, will be part of this campaign'}
            icon={specificClients.src}
            active={eligibleClients == 0}
            onClick={() => setEligibleClients(0)}
          />
          <Card
            title={'Specific Clients'}
            description={'Only clients who I choose by the status, will be part of this campaign'}
            icon={specificClients.src}
            active={eligibleClients == 1}
            onClick={() => setEligibleClients(1)}
          />
        </div>
      </div>
      <hr className=" -mx-6" />
      <div className="flex -mx-6">
        <div className="w-1/2 px-[22px] py-[26px]">
          <div>Events</div>
        </div>
        <div className="w-1/2 px-[22px] py-[26px] bg-gray10">
          <div>
            <div className="mb-4 text-gray8 text-sm font-medium">Choose the type of event you want to send:</div>
            <div className="flex mb-8">
              <Card
                narrow
                className="mr-2 bg-white"
                title={'Email'}
                icon={call.src}
                active={typeOfEvent == 0}
                onClick={() => setTypeOfEvent(0)}
              />
              <Card
                narrow
                className="bg-white"
                title={'SMS'}
                icon={call.src}
                active={typeOfEvent == 1}
                onClick={() => setTypeOfEvent(1)}
              />
            </div>
          </div>
          <div className="mb-8">
            <div className="mb-4 text-gray8 text-sm font-medium">Set the time you want to send the event:</div>
            <Input />
          </div>
          <div>
            <div className="mb-4 text-gray8 text-sm font-medium">Subject:</div>
          </div>
        </div>
      </div>
    </SlideOver>
  );
};

export default CreateCampaignSidebar;
