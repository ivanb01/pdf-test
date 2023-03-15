import Text from 'components/shared/text';
import Input from 'components/shared/input';
import Overlay from 'components/shared/overlay';
import Image from 'next/image';
import fileIcon from 'public/images/file-icon.svg';
import closeIcon from 'public/images/close-icon.svg';

const ImportingFromCsv = ({ title, handleClose, failed }) => {
  let bgColor = failed ? 'bg-red5' : 'bg-lightBlue3';
  return (
    <Overlay
      handleCloseOverlay={handleClose}
      className="max-w-[600px]"
      title={title}
    >
      <div className="p-[24px]">
        <div className="text-left">
          <Input
            label="Document Name"
            className="mb-6"
            placeholder="Write your document name here"
          />
        </div>
        <div className="flex items-center">
          <Image src={fileIcon} />
          <div className="ml-[14px] mr-2 w-full">
            <Text h4 className="text-gray7 text-left">
              Oxford Contacts Template.csv
            </Text>
            <div className="flex items-center justify-center">
              <div className="w-full bg-lightBlue2 h-2 my-[6px] rounded-lg">
                <div
                  className={`${bgColor} h-2 rounded-lg`}
                  style={{ width: failed ? '100%' : '50%' }}
                ></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Text h4 className="text-gray4 text-left">
                15 MB of 22 MB
              </Text>
              <Text
                h4
                className={`${failed ? 'text-red5' : 'text-gray4'} text-left`}
              >
                {failed ? 'Upload Failed' : '50%'}
              </Text>
            </div>
          </div>
          <a href="#" className="inline-block h-5">
            <Image src={closeIcon} />
          </a>
        </div>
      </div>
    </Overlay>
  );
};

export default ImportingFromCsv;
