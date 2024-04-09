import Overlay from '@components/shared/overlay';
import aiApproved from '../../../../public/images/onboarding/aiApproved.png';
import Image from 'next/image';
import CheckCircleSharpIcon from '@mui/icons-material/CheckCircleSharp';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useState } from 'react';
const ContactsImportedSuccessfullyPopup = () => {
  const router = useRouter();
  const allContacts = useSelector((state) => state.contacts.allContacts);
  const [closeModal, setCloseModal] = useState(true);

  return (
    closeModal && (
      <Overlay className={'w-[551px]'} closeModal={() => setCloseModal(false)}>
        <div className={'pt-6 pb-[30px] flex items-center justify-center text-center flex-col px-6'}>
          <Image src={aiApproved} width={110} height={101} className={'py-[18px]'} />
          <p className={'text-lg leading-6 font-semibold text-gray7 mb-6'}>Contact Import Successful!</p>
          <div className={'flex gap-3 items-center justify-center mb-3 text-gray7'}>
            <p className={'text-sm leading-5 font-normal'}>
              Automatically imported contacts from important emails you've received over the past few days into your
              account.
            </p>
            <CheckCircleSharpIcon className={'text-green-500 h-4 w-4'} />
          </div>
          <div className={'flex gap-3 items-center justify-center text-gray7 mb-[32px]'}>
            <p className={'text-sm leading-5 font-normal'}>Added your Google contacts. </p>
            <CheckCircleSharpIcon className={'text-green-500 h-4 w-4'} />
          </div>
          {allContacts &&
          allContacts?.data?.filter(
            (client) =>
              ['GmailAI', 'Smart Sync A.I.', 'Gmail'].includes(client.import_source) &&
              (client.approved_ai === false || client.approved_ai === null),
          ).length > 0 ? (
            <div className="flex flex-col justify-center items-center gap-3 w-[100%] py-[21px] px-4 rounded-lg border border-[#FEC84B] bg-[#FFFCF5]">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="29" viewBox="0 0 28 29" fill="none">
                <path
                  d="M13.9974 10.611V15.2777M13.9974 19.9444H14.0091M12.382 4.65138L2.78627 21.2258C2.25403 22.1451 1.98791 22.6048 2.02725 22.982C2.06155 23.3111 2.23395 23.6101 2.50154 23.8046C2.80832 24.0277 3.33946 24.0277 4.40174 24.0277H23.5931C24.6554 24.0277 25.1866 24.0277 25.4933 23.8046C25.7609 23.6101 25.9333 23.3111 25.9676 22.982C26.007 22.6048 25.7408 22.1451 25.2086 21.2258L15.6129 4.65138C15.0826 3.73536 14.8174 3.27735 14.4715 3.12352C14.1697 2.98934 13.8252 2.98934 13.5234 3.12352C13.1775 3.27735 12.9123 3.73536 12.382 4.65138Z"
                  stroke="#DC6803"
                  stroke-width="1.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <div className={'flex flex-col items-center justify-center '}>
                <p className={'text-sm font-normal text-[#B54708] mb-4 w-[427px] text-center'}>
                  Review the AI's work on the AI review screen. Any contacts that our AI was unable to categorize are
                  placed in the uncategorized contacts section on the left side menu.
                </p>
                <div
                  role={'button'}
                  onClick={() => router.push('/ai-summary')}
                  className={
                    ' rounded-lg flex items-center justify-center gap-[10px] w-[379px] bg-[#FFF0DE] text-[#B54708] py-[6px] px-3'
                  }>
                  <p className={'text-sm font-semibold '}>Proceed to AI review</p>
                  <ArrowForwardRoundedIcon />
                </div>
              </div>
            </div>
          ) : (
            <div
              role={'button'}
              onClick={() => {
                router.push('/contacts/clients');
                setCloseModal(false);
              }}
              className={
                ' rounded-lg flex items-center justify-center gap-[10px] w-[379px] bg-[#FFF0DE] text-[#B54708] py-[6px] px-3'
              }>
              <p className={'text-sm font-semibold '}>Back to clients</p>
            </div>
          )}
        </div>
      </Overlay>
    )
  );
};
export default ContactsImportedSuccessfullyPopup;
