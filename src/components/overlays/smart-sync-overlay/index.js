import Button from 'components/shared/button';
import Text from 'components/shared/text';
import Overlay from 'components/shared/overlay';
import img from '/public/images/smart-sync.svg';
import img2 from '/public/images/google.svg';
import Image from 'next/image';

const SmartSyncOverlay = ({ handleCloseOverlay, handleAction, loading }) => {
  return (
    <Overlay className="max-w-[800px]">
      <div className="p-6">
        <div className="mb-6 text-center">
          <div className="text-lg font-medium text-gray-900 mb-3">Setup Smart Sync & Google Contacts Import</div>
          <div className="text-xs text-gray-900">
            Setup “Smart Sync Contacts” and “Import Google Contacts” to be able to import contact directly from Gmail in
            the CRM.
          </div>
        </div>
        <div className="flex py-6">
          <div className="w-1/2 text-center border-r border-gray-200 pr-6">
            <lottie-player
              src="https://lottie.host/487b1374-b859-4451-ae1f-72a19db4ecaa/Zt3ZqjwYNm.json"
              background="transparent"
              speed="1"
              style={{ height: '120px' }}
              loop
              autoplay
            ></lottie-player>
            <div className="text-xs text-gray-500">
              With <strong>Smart Sync Contacts</strong>:<br /> Our intelligent AI algorithms intelligently analyze each
              contact's information, swiftly identifying their type, status, and most importantly, their interests.
            </div>
          </div>
          <div className="w-1/2 text-center pl-6">
            <Image src={img2} alt="header-img" />
            <div className="text-xs text-gray-500">
              With <strong>"Import Google Contacts"</strong>
              <br /> you will be able to import your contacts that are already in your "Google Contact" list.
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-6">
          <button className="text-lightBlue3 text-sm font-medium" onClick={() => handleCloseOverlay()}>
            Skip for now, maybe later
          </button>
          <Button loading={loading} primary onClick={handleAction}>
            Setup now
          </Button>
        </div>
      </div>
    </Overlay>
  );
};

export default SmartSyncOverlay;
