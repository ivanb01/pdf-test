import GlobalAlert from 'components/shared/alert/global-alert';
import Image from 'next/image';
import Text from 'components/shared/text';
import Button from 'components/shared/button';
import noContacts from '/public/images/no-contacts.svg';
import { MailIcon, PlusIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import { ArrowRightIcon } from '@heroicons/react/outline';
import { useDispatch } from 'react-redux';
import { setSkippedEmptyState } from 'store/global/slice';
import NotificationAlert from 'components/shared/alert/notification-alert';
import { ArrowBack } from '@mui/icons-material';

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
        <img src={noContacts.src} />
        <Text h2 className="text-gray7 mt-9 mb-4 justify-center text-lg">
          No contacts to be imported
        </Text>
        <Text paragraph className="text-gray4 mb-[50px] text-sm">
          There is no contacts to be imported to the CRM. Please try again another time.
        </Text>
        <Button
          label="Back to contacts"
          leftIcon={<ArrowBack className="h-4" />}
          secondary
          onClick={() => {
            localStorage.setItem('skippedEmptyState', true);
            dispatch(setSkippedEmptyState(true));
            router.push({
              pathname: '/contacts/clients',
            });
          }}
        />
      </div>
    </>
  );
};

export default SetupGmail;
