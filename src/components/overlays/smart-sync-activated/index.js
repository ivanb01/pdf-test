import Button from 'components/shared/button';
import Text from 'components/shared/text';
import Overlay from 'components/shared/overlay';
import img from '/public/images/smart-sync-on.png';
import Image from 'next/image';
import AIChip from '@components/shared/chip/ai-chip';
const SmartSyncActivatedOverlay = ({ activatingSmartSync, handleCloseOverlay, loading }) => {
  return (
    <Overlay className="w-[650px]" handleCloseOverlay={handleCloseOverlay}>
      <div className="p-[24px]">
        {activatingSmartSync ? (
          <>
            <div className="flex flex-col justify-center items-center">
              <lottie-player
                src="https://lottie.host/d8ad3803-e2ec-46b7-a93c-16c02c26b828/qicrmjXuYZ.json"
                speed="1"
                style={{ width: '200px', height: '150px' }}
                loop
                autoplay
                direction="1"
                mode="normal"
              />
            </div>
            <div className="text-center">
              <div className="font-medium">Activating Smart Sync...</div>
              <div className="text-sm mt-2">Please Wait</div>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-center">
              <div className="mb-3 text-center">
                <Image src={img} alt="header-img" />
              </div>
            </div>
            <div className="text-gray-900 font-medium text-lg text-center mb-6">
              Smart Sync and Google Contacts: Turned On
            </div>
            <div className="text-gray-500 text-xs text-center mb-6">
              From now on each new contact that you will communicate in Gmail will be imported here and categorized by
              AI., and you can import Google Contacts
            </div>
            <div className="text-gray-500 text-xs text-center mb-6">
              Each new contact that you import will have the{' '}
              <span className="h-[10px] w-[20px] inline-block mx-[6px]">
                <AIChip reviewed={false} />
              </span>{' '}
              chip and you need to review in order to start communication
            </div>
            <div className="flex items-center justify-center mt-6">
              <Button className="w-[175px]" loading={loading} primary onClick={handleCloseOverlay}>
                Okay, thank you
              </Button>
            </div>
          </>
        )}
      </div>
    </Overlay>
  );
};

export default SmartSyncActivatedOverlay;
