import Button from 'components/shared/button';
import Text from 'components/shared/text';
import Overlay from 'components/shared/overlay';
import { ExclamationIcon } from '@heroicons/react/outline';
import { useState } from 'react';

const UnassignOverlay = ({ title, handleCloseOverlay, onSubmit }) => {
  const [loadingButton, setLoadingButton] = useState(false);

  return (
    <Overlay className="max-w-[512px]">
      <div className="p-[24px]">
        <div className="flex flex-row ">
          <div className="rounded-3xl	bg-red2 h-[40px] w-[40px] flex items-center justify-center p-[10px] mr-2">
            <ExclamationIcon className="text-red3" height={20} width={20} />
          </div>
          <div className="flex flex-col ml-2">
            <Text h3 className="mb-4">
              Cancel campaign for this client?
            </Text>
            <Text p className="text-gray4 ">
              {/* Clients are not going to get events from this campaign. Are you
              sure you want to unassign client from campaign? */}
              Once you cancel campaign for this client, you can’t re-start it. Canceling the campaign will immediately
              stop all events that are scheduled in this campaign.
              <br />
              Are you sure you want to cancel?
            </Text>

            {/* <Text p className="text-gray4 mt-2">
              Are you sure you want to unassign client?
            </Text> */}
          </div>
        </div>
        <div className="flex flex-row justify-end mt-4">
          <Button onClick={handleCloseOverlay} label="Cancel" white className="mr-2" />
          <Button
            label="Yes, cancel"
            danger
            loading={loadingButton}
            onClick={() => {
              setLoadingButton(true);
              onSubmit();
            }}
          />
        </div>
      </div>
    </Overlay>
  );
};

export default UnassignOverlay;
