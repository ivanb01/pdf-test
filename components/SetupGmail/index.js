import GlobalAlert from 'components/shared/alert/global-alert';
import Image from 'next/image';
import Text from 'components/shared/text';
import Button from 'components/shared/button';
import gmailToOneline from 'public/images/gmail-to-oneline.svg';
import { MailIcon, PlusIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import { ArrowRightIcon } from '@heroicons/react/outline';
import { useDispatch } from 'react-redux';
import { setSkippedEmptyState } from 'store/global/slice';
import NotificationAlert from 'components/shared/alert/notification-alert';

const SetupGmail = ({ 
  error,
  setshowAddContactManuallyOverlay,
  setShowImportGoogleContactsModal,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <>
      <div className="max-w-[420px] text-center m-auto pt-14">
        {/* <GlobalAlert
          overlay
          message="Import process was interrupted. Please Try Again!"
          type="error"
          rounded
        /> */}
        {error && 
          <NotificationAlert className="mb-8 p-4" type='error'>{error}</NotificationAlert>
        }
        <Image src={gmailToOneline} />
        <Text h2 className="text-gray7 mt-9 mb-4 justify-center">
          Setup Gmail Account to import Contacts
        </Text>
        <Text paragraph className="text-gray4 mb-6">
          Automatically sync your gmail account. Your contacts & leads will
          automatically be imported as they arrive in your inbox.{' '}
        </Text>
        <Button
          className="mb-4"
          leftIcon={<MailIcon />}
          label="Import Google Contacts"
          // onClick={() =>
          //   router.push({
          //     pathname: '/google/import/contacts',
          //   })
          // }
          onClick={()=>setShowImportGoogleContactsModal()}
        ></Button>
        {/* <Text h4 className="text-gray8 justify-center">
          Don’t know how?{' '}
          <Link className="underline ml-2" href="#">
            Watch the video
          </Link>
        </Text> */}
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
          <div className={`ml-2 -mr-0.5`}>
            {<ArrowRightIcon className="w-4 h-4 " />}
          </div>
        </div>
      </div>
    </>
  );
};

export default SetupGmail;
