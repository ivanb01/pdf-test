import Overlay from '@components/shared/overlay';
import DeactivateCampaignIcon from '../../../../public/images/campaign/deactivateCampaign.svg';
import Button from '@components/shared/button';
import { useEffect } from 'react';
import Image from 'next/image';
import image from '/public/images/assign-to-campaign-2.gif';

const DeactivateCampaign = ({ handleCloseModal, makeChanges, active }) => {
  useEffect(() => {
    makeChanges(false);
  }, []);
  return (
    <Overlay
      className="w-[550px]"
      handleCloseOverlay={handleCloseModal}
      title={
        <div className={'flex gap-3 items-center justify-center'}>
          {active && <img src={DeactivateCampaignIcon.src} />}

          <h5 className={'text-lg leading-6 font-medium text-gray7 mb-3'}>
            {active ? 'Deactivate Campaign for this Client?' : 'Assign this contact to campaign?'}
          </h5>
        </div>
      }>
      <div style={{ marginTop: -50 }}>
        <div className={'p-6 flex gap-3 items-start '}>
          <div className={'flex flex-col ml-9 mt-3'}>
            {active ? (
              <h6 className={'text-sm leading-5 font-normal text-gray4'}>
                Once you deactivate the campaign, the events are going to stop running.
                <br />
                <br />
                Are you sure you want to deactivate?
              </h6>
            ) : (
              <>
                <div className="text-center flex items-center justify-center ml-[-39px]">
                  <Image src={image} alt="header-img" height={180} width={180} />
                </div>
                <h6 className={'text-sm leading-5 font-normal text-gray4 ml-[-40px]'}>
                  Assigned client will get emails/events from campaign. Your communication will be improved and healthy
                </h6>
              </>
            )}
          </div>
        </div>
        <div className={'flex item-end justify-end gap-3 pr-4 pb-4'}>
          <Button
            white
            onClick={(e) => {
              e.stopPropagation();
              handleCloseModal();
            }}>
            Cancel
          </Button>
          <Button
            danger={active}
            primary={!active}
            onClick={(e) => {
              e.stopPropagation();
              makeChanges(true);
              handleCloseModal();
            }}>
            {active ? 'Yes, deactivate' : 'Yes, assign'}
          </Button>
        </div>
      </div>
    </Overlay>
  );
};

export default DeactivateCampaign;
