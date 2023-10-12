import Overlay from '@components/shared/overlay';
import DeactivateCampaignIcon from '../../../../public/images/campaign/deactivateCampaign.svg';
import Button from '@components/shared/button';

const DeactivateCampaign = ({ handleCloseModal, setEnabled }) => {
  return (
    <Overlay
      className="w-[550px]"
      handleCloseOverlay={handleCloseModal}
      title={
        <div className={'flex gap-3 items-center justify-center'}>
          <img src={DeactivateCampaignIcon.src} />

          <h5 className={'text-lg leading-6 font-medium text-gray7 mb-3'}>Deactivate Campaign for this Client?</h5>
        </div>
      }>
      <div style={{ marginTop: -50 }}>
        <div className={'p-6 flex gap-3 items-start '}>
          <div className={'flex flex-col ml-9 mt-3'}>
            <h6 className={'text-sm leading-5 font-normal text-gray4'}>
              Once you deactivate the campaign, the events are going to stop running.
              <br />
              <br />
              Are you sure you want to deactivate?
            </h6>
          </div>
        </div>
        <div className={'flex item-end justify-end gap-3 pr-4 pb-4'}>
          <Button white onClick={(e) => e.stopPropagation()}>
            Cancel
          </Button>
          <Button
            danger
            onClick={(e) => {
              e.stopPropagation();
              setEnabled(true);
              handleCloseModal();
            }}>
            Yes, deactivate
          </Button>
        </div>
      </div>
    </Overlay>
  );
};

export default DeactivateCampaign;
