import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import Close from '@mui/icons-material/Close';
import SimpleBar from 'simplebar-react';
import EmailIcon from '@mui/icons-material/Email';
import ChatIcon from '@mui/icons-material/Chat';
import InfoIcon from '@mui/icons-material/Info';
const CampaignPreview = ({ open, setOpen, title, sms, email }) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setOpen}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden bg-transparentBlack">
          <div className="absolute inset-0 overflow-hidden">
            <div className={`pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 w-[900px]`}>
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full">
                <Dialog.Panel className="pointer-events-auto w-screen">
                  <div className="flex h-full flex-col bg-white shadow-xl">
                    <div className="flex flex-shrink-0 justify-between items-center p-6 border border-gray2">
                      <div className={'flex flex-col gap-1'}>
                        <Dialog.Title className="text-lg font-medium text-gray-900">{title}</Dialog.Title>
                        <div className={'text-xs leading-5 font-medium text-gray6 flex'}>
                          <span className={'mr-1'}>{`${Number(sms + email)}  Events: `}</span>
                          <span className={'mr-2'}>
                            {email} <EmailIcon className={'h-3 w-3 text-[#909CBE]'} />
                          </span>
                          <span>
                            {sms} <ChatIcon className={'h-3 w-3  text-[#909CBE]'} />
                          </span>
                        </div>
                      </div>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                          onClick={() => setOpen(false)}>
                          <span className="sr-only">Close panel</span>
                          <Close className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                    <div className="flex min-h-0 flex-1 flex-col">
                      <SimpleBar autoHide style={{ maxHeight: '100%' }}>
                        <div className="relative flex-1 flex">
                          <div className={'w-[400px] border-r border-gray2 p-6 pb-0'}>
                            <div className={'flex items-start justify-start gap-1 mb-6'}>
                              <InfoIcon className={'h-3 w-3 text-[#909CBE] mt-0.5'} />
                              <span className={'text-xs leading-4 font-normal text-gray4 gap-4'}>
                                Here are the events for this campaign along with their scheduled send dates and time.
                              </span>
                            </div>
                            <div className={'flex flex-col'}>
                              <div
                                style={{ width: 'max-content' }}
                                className={'font-semibold text-gray4 text-xs text-base leading-5 bg-gray1 px-1.5'}>
                                wait 0 days
                              </div>
                              <div
                                className={'border-r border-dashed border-lightBlue3 h-2 mx-4'}
                                style={{ width: 1 }}></div>
                            </div>
                          </div>
                          <div>erza</div>
                        </div>
                      </SimpleBar>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
export default CampaignPreview;
