import GlobalAlert from 'components/shared/alert/global-alert';
import Image from 'next/image';
import Text from 'components/shared/text';
import Button from 'components/shared/button';
import gmailToOneline from '/public/images/gmail-to-oneline.svg';
import { MailIcon, PlusIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import { ArrowRightIcon } from '@heroicons/react/outline';
import { useDispatch } from 'react-redux';
import { setSkippedEmptyState } from 'store/global/slice';
import NotificationAlert from 'components/shared/alert/notification-alert';

const SetupGmail = ({ error, setshowAddContactManuallyOverlay, setShowImportGoogleContactsModal }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <>
      <div className="max-w-[420px] text-center m-auto pt-14">
        {error && (
          <NotificationAlert className="mb-8 p-4" type="error">
            {error}
          </NotificationAlert>
        )}
        <Image src={gmailToOneline} />
        <Text h2 className="text-gray7 mt-9 mb-4 justify-center">
          Setup Gmail Account to Import Contacts
        </Text>
        <Text paragraph className="text-gray4 mb-6">
          Automatically sync your google contacts. Run this process once you have new contacts added to your google
          contacts. We will automatically add them to your uncategorized contacts in the CRM.
        </Text>
        <Button
          className="mb-4"
          leftIcon={<MailIcon />}
          label="Import Google Contacts"
          onClick={() =>
            router.push({
              pathname: '/contacts/no-contact/',
              query: { start_importing: true },
            })
          }
        ></Button>
        <Text paragraph className="text-gray8 mb-4 justify-center">
          or
        </Text>
        <Button
          label="Add Manually"
          leftIcon={<PlusIcon />}
          secondary
          onClick={() => setshowAddContactManuallyOverlay(true)}
        />
        <hr className="bg-[#E5E7EB] mt-10 mb-10" />
        <div
          className={`text-sm font-medium' cursor-pointer text-lightBlue3 hover:text-lightBlue4 mb-6 justify-center flex items-center`}
          onClick={() => {
            localStorage.setItem('skippedEmptyState', true);
            dispatch(setSkippedEmptyState(true));
            router.push({
              pathname: '/contacts/clients',
            });
          }}
        >
          <span>Skip for now, maybe later</span>
          <div className={`ml-2 -mr-0.5`}>{<ArrowRightIcon className="w-4 h-4 " />}</div>
        </div>
      </div>
    </>
  );
};

export default SetupGmail;
