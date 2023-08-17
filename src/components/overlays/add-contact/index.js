import Button from 'components/shared/button';
import Text from 'components/shared/text';
import Overlay from 'components/shared/overlay';
import Image from 'next/image';
import addManuallyImg from '/public/images/add-manually.svg';
import addCSVImg from '/public/images/add-csv.svg';
import { PlusIcon } from '@heroicons/react/outline';
import { DocumentDownloadIcon } from '@heroicons/react/outline';
import Link from 'components/Link';

const AddContactOverlay = ({ title, addManually, importCsv, handleClose, progress }) => {
  return (
    <Overlay title={title} handleCloseOverlay={handleClose} className="max-w-[1000px]">
      <div className="p-[24px]">
        <div className="flex pb-10">
          <div className="text-center px-10 border-r border-gray2">
            <div className="mb-6 text-center">
              <Image src={addManuallyImg} alt="header-img" />
            </div>
            <Text h3 className="text-gray7 justify-center mb-3">
              Add Contact Manually
            </Text>
            <Text p className="text-gray4 text-center mb-6">
              Add Contact manually and categorize based on the engagement status.
            </Text>
            <Button
              label="Add Manually"
              leftIcon={<PlusIcon />}
              secondary
              onClick={addManually} //open add contact manually popup
            />
          </div>
          <div className="text-center px-10">
            <div className="mb-6 text-center">
              <Image src={addCSVImg} alt="header-img" />
            </div>
            <Text h3 className="text-gray7 justify-center mb-3 justify-center">
              Import Contacts in the CRM
            </Text>
            <Text p className="text-gray4 text-center mb-6 justify-center">
              Start by downloading CSV sample and fill it with your contacts.
            </Text>
            <Button
              label="Add Contacts with CSV"
              leftIcon={<DocumentDownloadIcon />}
              primary
              onClick={importCsv} // open import csv popup
            />
            <Text p className="text-gray8 mt-6 justify-center">
              Don't know how?{' '}
              <Link href="#" underline className="ml-2">
                Watch the video
              </Link>
            </Text>
          </div>
        </div>
      </div>
    </Overlay>
  );
};

export default AddContactOverlay;
