import Overlay from '@components/shared/overlay';
import Image from 'next/image';
import gmailSync from '/public/animations/gmailsync.gif';
const ImportingContactsPopup = () => {
  return (
    <Overlay className={'w-[530px]'}>
      <div className={'py-[54px] px-6 flex flex-col gap-6 text-center items-center'}>
        <div>
          <h3 className={'text-lg leading-6 font-semibold mb-3 text-gray7'}>
            Importing Google contacts & G-Mail Contacts.
          </h3>
          <p className={'text-xs leading-4 font-normal text-gray7'}>
            This might take around 1-2 minutes until they’re getting uploaded
          </p>
        </div>
        <div>
          <Image src={gmailSync} className={'py-6'} width={152} height={107} />
        </div>
        <div>
          <p className={'text-sm leading-5 font-normal italic text-gray3'}>Please wait...</p>
        </div>
      </div>
    </Overlay>
  );
};

export default ImportingContactsPopup;
