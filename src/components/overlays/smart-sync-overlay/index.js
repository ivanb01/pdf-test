import Button from 'components/shared/button';
import Text from 'components/shared/text';
import Overlay from 'components/shared/overlay';
import img from 'public/images/ai-overlay.svg';
import Image from 'next/image';
const SmartSyncOverlay = ({ handleCloseOverlay, handleAction }) => {
  return (
    <Overlay className="max-w-[650px]" handleCloseOverlay={handleCloseOverlay}>
      <div className="p-[24px]">
        <div className="mb-3 text-center">
          <Image src={img} alt="header-img" />
        </div>
        <div className="text-center mb-2">
          <div className="text-[10px] inline-block px-2 py-1 bg-indigo-50 text-indigo-600 uppercase rounded-xl border border-indigo-600">
            new features
          </div>
        </div>
        <div className="text-gray-900 font-medium text-lg text-center mb-6">
          Smart Sync Contacts from Gmail
        </div>
        <div className="text-gray-500 text-sm text-center ">
          Introducing our groundbreaking solution for seamless contact
          management:{' '}
          <span className="font-bold">Smart Synced Contacts from Gmail.</span>
          <br />
          <br />
          Our intelligent AI algorithms intelligently analyze each contact's
          information, swiftly{' '}
          <span className="font-bold">
            identifying their type, status, and most importantly, their
            interests.
          </span>
        </div>
        <div className="flex items-center justify-center mt-6">
          <Button primary onClick={handleAction}>
            Activate Smart Sync
          </Button>
        </div>
      </div>
    </Overlay>
  );
};

export default SmartSyncOverlay;
