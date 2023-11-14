import Button from 'components/shared/button';
import Text from 'components/shared/text';
// import assignToCampaign from '/public/images/assign-to-campaign.svg';
import assignToCampaign from '/public/images/assign-to-campaign-2.gif';
import Image from 'next/image';
import Overlay from 'components/shared/overlay';

const AssignCampaignOverlay = ({ title, handleCloseOverlay, onSubmit, loading }) => {
  return (
    <Overlay handleCloseOverlay={handleCloseOverlay} className="max-w-[512px]">
      <div className="p-[24px] text-center">
        <div className="h-[235px] mx-auto">
          <lottie-player
            src="/animations/assign.json"
            background="transparent"
            speed="1"
            style={{ width: '100%', height: '100%' }}
            loop
            autoplay></lottie-player>
        </div>
        <Text h2 className="max-w-xs mx-auto mb-3 leading-[1.4] mt-6 justify-center">
          Starting Campaign
        </Text>
        <Text p className="text-gray4 max-w-xl mx-auto">
          Contacts can easily be assigned to campaigns based on their stage in the sales process and type of contact.
          These campaigns help you stay engaged and connected with your clients.
        </Text>
      </div>
      <div className="flex items-center justify-end p-6 space-x-2 rounded-b">
        <Button className="mr-2" white label="Cancel" onClick={handleCloseOverlay} />
        <Button loading={loading} primary label="Assign to Campaign" onClick={onSubmit} />
      </div>
    </Overlay>
  );
};

export default AssignCampaignOverlay;
