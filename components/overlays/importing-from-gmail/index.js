import Button from 'components/shared/button';
import Text from 'components/shared/text';
import Overlay from 'components/shared/overlay';
import img from 'public/images/importing.svg';
import Image from 'next/image';

const ImportingFromGmail = ({ title, handleCloseOverlay, progress }) => {
  return (
    <Overlay
      title="Please wait..."
      handleCloseOverlay={handleCloseOverlay}
      className="max-w-[512px]"
    >
      <div className="p-[24px]">
        <div className="">
          <div className="">
            <div className="mb-10 text-center">
              <Image src={img} alt="header-img" />
            </div>
            <Text p className="text-gray7 text-center">
              Importing contacts from Gmail{' '}
              <strong className="import-percentage ml-2">{progress}%</strong>
            </Text>
            <div className="flex items-center justify-center">
              <div className="w-[300px] bg-lightBlue2 h-2 mb-6 rounded-lg mt-4">
                <div
                  className="bg-lightBlue3 h-2 rounded-lg"
                  style={{ width: progress + '%' }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Overlay>
  );
};

export default ImportingFromGmail;
