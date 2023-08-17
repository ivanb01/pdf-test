import Button from 'components/shared/button';
import Text from 'components/shared/text';
import Link from 'components/Link';
import contactsSynced from '/public/images/contacts-synced.png';
import Image from 'next/image';
import Overlay from 'components/shared/overlay';

const ContactsSyncedOverlay = ({ title, handleCloseOverlay }) => {
  return (
    <Overlay handleCloseOverlay={handleCloseOverlay} title={title} className="max-w-[600px]">
      <div className="p-6 text-center">
        <Image src={contactsSynced} />
        <Text h2 className="max-w-xs mx-auto mb-3 leading-[1.4] mt-6">
          Contacts Synced Successfully! Now, Make Sure to Categorize them.
        </Text>
        <Text p className="text-gray4 max-w-xl mx-auto">
          Your contacts were uploaded succesfully in the CRM. Make sure to categorize them, so your communication will
          be healthy.
        </Text>
      </div>
      <div className="flex items-center justify-between p-6 space-x-2 rounded-b">
        <Text p>
          Don't know how?{' '}
          <Link className="underline" href="#">
            Watch the video
          </Link>
        </Text>
        <Button primary label="See the results" onClick={handleCloseOverlay} />
      </div>
    </Overlay>
  );
};

export default ContactsSyncedOverlay;
