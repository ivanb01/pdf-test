import Button from 'components/shared/button';
import Text from 'components/shared/text';
import Overlay from 'components/shared/overlay';
// import img from 'public/images/assign-to-campaign.gif';
import img from 'public/images/assign-to-campaign-2.gif';
import img2 from 'public/images/bulk-assign-to-campaign.gif';
import Image from 'next/image';
import { useState } from 'react';

const ChangeStatus = ({ handleCloseOverlay, onSubmit }) => {

  const [loadingButton, setLoadingButton] = useState(false);

  return (
    <Overlay className="max-w-[600px]">
      <div className="p-[24px]">
        <div className="">
          <div className="">
            <div className="flex justify-center">
                <lottie-player
                  src="https://assets7.lottiefiles.com/packages/lf20_uq33Y9gg2u.json"
                  loop
                  autoplay
                  style={{ width: '226px', height: '171px' }}
                ></lottie-player>
            </div>
            <Text h2 className="text-gray7 justify-center my-6">
                Changing status will affect the Campaign
            </Text>
            <Text p className="text-gray4 justify-center text-center ">
                This contact is in campaign. 
            </Text>
            <Text p className="text-red5 justify-center text-center mb-4">
                If you change the status or type, contact will be unassign from the campaign!
            </Text>
            <Text p className="text-gray4 justify-center text-center ">
                But, you can always assign the contact to a different campaign based on the type and status you update.
            </Text>

            <div className="flex items-center justify-end mt-6">
              <Button
                label="Cancel"
                white
                className="mr-2"
                onClick={handleCloseOverlay}
              />
              <Button 
                primary
                loading={loadingButton}
                onClick={()=>{
                  setLoadingButton(true);
                  onSubmit();
                }}
                >Yes, change status</Button>
            </div>
          </div>
        </div>
      </div>
    </Overlay>
  );
};

export default ChangeStatus;
