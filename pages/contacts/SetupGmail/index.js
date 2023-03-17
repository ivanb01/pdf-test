import GlobalAlert from 'components/shared/alert/global-alert';
import Image from 'next/image';
import Text from 'components/shared/text';
import Button from 'components/shared/button';
import Link from 'next/link';
import gmailToOxford from 'public/images/gmail-to-oxford.png';
import { MailIcon, PlusIcon } from '@heroicons/react/solid';

const SetupGmail = ({
  setShowImportingOverlay,
  setshowAddContactManuallyOverlay,
}) => {
  return (
    <div className="max-w-[420px] text-center m-auto">
      <GlobalAlert
        overlay
        message="Import process was interrupted. Please Try Again!"
        type="error"
        rounded
      />
      <Image src={gmailToOxford} height={75} width={335} />
      <Text h2 className="text-gray7 mt-9 mb-4 justify-center">
        Setup Gmail Account to import Contacts
      </Text>
      <Text paragraph className="text-gray4 mb-6">
        Automatically sync your gmail account. Your contacts & leads will
        automatically be imported as they arrive in your inbox.{' '}
      </Text>
      <Button
        className="mb-10"
        leftIcon={<MailIcon />}
        label="Import from Gmail"
        onClick={() => setShowImportingOverlay(true)}
      ></Button>
      <Text h4 className="text-gray8 justify-center">
        Don’t know how?{' '}
        <Link className="underline ml-2" href="#">
          Watch the video
        </Link>
      </Text>
      <hr className="bg-[#E5E7EB] mt-10 mb-6" />
      <Text paragraph className="text-gray8 mb-6 justify-center">
        or
      </Text>
      <Button
        label="Add Manually"
        leftIcon={<PlusIcon />}
        secondary
        onClick={() => setshowAddContactManuallyOverlay(true)}
      />
    </div>
  );
};

export default SetupGmail;
