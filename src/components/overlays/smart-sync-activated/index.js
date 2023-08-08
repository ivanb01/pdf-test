import Button from 'components/shared/button';
import Text from 'components/shared/text';
import Overlay from 'components/shared/overlay';
import img from '/public/images/smart-sync-on.png';
import Image from 'next/image';
import AIChip from '@components/shared/chip/ai-chip';
const SmartSyncActivatedOverlay = ({ handleCloseOverlay, loading }) => {
  return (
    <Overlay className="max-w-[650px]" handleCloseOverlay={handleCloseOverlay}>
      <div className="p-[24px]">
        <div className="mb-3 text-center">
          <Image src={img} alt="header-img" />
        </div>
        <div className="text-gray-900 font-medium text-lg text-center mb-6">
          Smart Sync and Google Contacts: Turned On
        </div>
        <div className="text-gray-500 text-xs text-center mb-6">
          From now on each new contact that you will communicate in Gmail will
          be imported here and categorized by AI., and you can import Google
          Contacts
        </div>
        <div className="text-gray-500 text-xs text-center mb-6">
          Each new contact that you import will have the{' '}
          <span className="h-[10px] w-[20px] inline-block mx-[6px]">
            <AIChip reviewed={false} />
          </span>{' '}
          chip and you need to review in order to start communication
        </div>
        <div className="flex items-center justify-center mt-6">
          <Button
            className="w-[175px]"
            loading={loading}
            primary
            onClick={handleCloseOverlay}>
            Okay, thank you
          </Button>
        </div>
      </div>
    </Overlay>
  );
};

export default SmartSyncActivatedOverlay;
