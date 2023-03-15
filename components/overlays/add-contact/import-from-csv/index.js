import Button from 'components/shared/button';
import Text from 'components/shared/text';
import Overlay from 'components/shared/overlay';
import { DocumentDownloadIcon } from '@heroicons/react/outline';
import addCSVImg from 'public/images/add-csv.svg';
import upload from 'public/images/upload.svg';
import Link from 'components/Link';
import Image from 'next/image';

const ImportFromCsv = ({
  title,
  handleClose,
  setUploadingDocument,
  setUploadedDocument,
}) => {
  return (
    <Overlay
      handleCloseOverlay={handleClose}
      className="max-w-[800px]"
      title={title}
    >
      <div className="p-[24px]">
        <div className="text-center px-10">
          <div className="mb-6 text-center">
            <Image src={addCSVImg} alt="header-img" />
          </div>
          <Text h3 className="text-gray7 text-center mb-3 justify-center">
            Add Contacts with CSV
          </Text>
          <Text p className="text-gray4 text-center mb-6 justify-center">
            Start by downloading CSV sample and fill it with your contacts.
          </Text>
          <Button
            label="Download CSV Sample"
            leftIcon={<DocumentDownloadIcon />}
            secondary
          />
          <Text p className="text-gray8 mt-6 justify-center">
            Don't know how?{' '}
            <Link href="#" underline className="ml-2">
              Watch the video
            </Link>
          </Text>
        </div>
        <div className="w-full mt-6">
          <label className="flex justify-center w-full h-40 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
            <span className="flex flex-col justify-center items-center space-x-2">
              <Image src={upload} />
              <Text p className="text-gray8 mt-6 justify-center">
                <Link href="#" className="mr-2">
                  Upload
                </Link>
                or drag and drop
              </Text>
              <Text smallText className="text-gray4 mt-1 font-normal">
                CSV up to 10MB
              </Text>
            </span>
            <input
              type="file"
              name="file_upload"
              className="hidden"
              onChange={(event) => {
                setUploadingDocument(true);
                setUploadedDocument(event.target.files);
              }}
            />
          </label>
        </div>
      </div>
    </Overlay>
  );
};

export default ImportFromCsv;
