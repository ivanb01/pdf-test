import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import Close from '@mui/icons-material/Close';
import SimpleBar from 'simplebar-react';
import EmailIcon from '@mui/icons-material/Email';
import ChatIcon from '@mui/icons-material/Chat';
import InfoIcon from '@mui/icons-material/Info';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const CampaignPreview = ({ open, setOpen, title, sms, email }) => {
  const [activeEvent, setActiveEvent] = useState({
    id: 0,
    waitDays: 1,
    name: 'Welcome to Oxford',
    sentDate: 'send at 10:00 AM',
    subject: 'Welcome to Oxford',
    type: 'email',
    message:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been nly five centuries',
  });
  useEffect(() => {
    setActiveEvent({
      id: 0,
      waitDays: 1,
      name: 'Welcome to Oxford',
      sentDate: 'send at 10:00 AM',
      subject: 'Welcome to Oxford',
      type: 'email',
      message:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been nly five centuries',
    });
  }, []);
  const events = [
    {
      id: 0,
      waitDays: 1,
      name: 'Welcome to Oxford',
      sentDate: 'send at 10:00 AM',
      subject: 'Welcome to Oxford',
      type: 'email',
      message:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been nly five centuries',
    },
    {
      id: 1,
      waitDays: 3,
      name: 'Welcome to Oxford',
      sentDate: 'send at 10:00 AM',
      subject: 'Welcome to Oxford',
      type: 'sms',
      message:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been nly five centuries',
    },
    {
      id: 2,
      waitDays: 3,
      name: 'Welcome to Oxford',
      sentDate: 'send at 10:00 AM',
      subject: 'Welcome to Oxford',
      type: 'email',

      message:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been nly five centuries',
    },
    {
      id: 3,
      waitDays: 3,
      name: 'Welcome to Oxford',
      sentDate: 'send at 10:00 AM',
      subject: 'Welcome to Oxfordd',
      type: 'email',

      message:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been nly five centuries',
    },
    {
      id: 4,
      waitDays: 3,
      name: 'Welcome to Oxford',
      sentDate: 'send at 10:00 AM',
      subject: 'Welcome to Oxford',
      type: 'sms',
      message:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been nly five centuries',
    },
  ];
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
                          onClick={() => {
                            setActiveEvent({
                              id: 0,
                              waitDays: 1,
                              name: 'Welcome to Oxford',
                              sentDate: 'send at 10:00 AM',
                              subject: 'Welcome to Oxford',
                              type: 'email',
                              message:
                                'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been nly five centuries',
                            });
                            setOpen(false);
                          }}>
                          <span className="sr-only">Close panel</span>
                          <Close className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                    <div className="flex min-h-0 flex-1 flex-col">
                      <SimpleBar autoHide style={{ height: '100%' }}>
                        <div className="relative  flex flex-1 h-full">
                          <div className={'w-[400px] border-r border-gray2 p-6 pb-0'}>
                            <div className={'flex items-start justify-start gap-1 mb-6'}>
                              <InfoIcon className={'h-3 w-3 text-[#909CBE] mt-0.5'} />
                              <span className={'text-xs leading-4 font-normal text-gray4 gap-4'}>
                                Here are the events for this campaign along with their scheduled send dates and time.
                              </span>
                            </div>
                            {events.map((e) => (
                              <div className={'flex flex-col mt-2'} onClick={() => setActiveEvent({ ...e })}>
                                <div
                                  style={{ width: 'max-content' }}
                                  className={'font-semibold text-gray4 text-xs  leading-5 bg-gray1 px-1.5'}>
                                  Wait {e.waitDays} days
                                </div>
                                <div
                                  className={'border-r border-dashed border-lightBlue3 h-3 mx-4'}
                                  style={{ width: 2 }}></div>
                                <div
                                  className={`p-3 flex ${
                                    activeEvent.id === e.id
                                      ? 'bg-lightBlue1 border border-lightBlue1 rounded-none'
                                      : 'border border-[#BAE6FD] rounded-md'
                                  } justify-between items-start hover:bg-lightBlue1`}>
                                  <div className={'flex gap-2 '}>
                                    {e.type === 'email' ? (
                                      <EmailIcon className={'h-4 w-4 text-lightBlue3 mt-0.5'} />
                                    ) : (
                                      <ChatIcon className={'h-4 w-4 text-lightBlue3 mt-0.5'} />
                                    )}
                                    <div>
                                      <h6 className={'text-sm leading-5 font-medium text-gray7 '}>{e.name}</h6>
                                      <h6 className={'text-gray4 text-xs font-medium leading-5'}>{e.sentDate}</h6>
                                    </div>
                                  </div>
                                  {activeEvent.id === e.id && (
                                    <ArrowForwardIosIcon className={'h-3.5 w-3.5 text-lightBlue3 mt-0.5'} />
                                  )}
                                </div>
                                <div
                                  className={'border-r border-dashed border-lightBlue3 h-3 mx-4'}
                                  style={{ width: 2 }}></div>
                              </div>
                            ))}
                          </div>
                          <div className={'flex-1'}>
                            <div className={'px-6 py-3 border-b border-gray2 '}>
                              <h5 className={'text-sm leading-5 font-medium text-gray7 '}>Event Details</h5>
                              <div className={'flex items-center gap-1'}>
                                {activeEvent.type === 'email' ? (
                                  <EmailIcon className={'h-3.5 w-3.5 text-lightBlue3 mt-1'} />
                                ) : (
                                  <ChatIcon className={'h-3.5 w-3.5 text-lightBlue3  mt-1'} />
                                )}
                                <span className={'font-inter text-sm font-medium leading-5 text-gray4 '}>
                                  {activeEvent.type} Event
                                </span>
                              </div>
                            </div>
                            <div className={'p-6 flex flex-col gap-[31px]'}>
                              <div>
                                <span className={'text-xs leading-4 font-medium tracking-wider uppercase text-gray4'}>
                                  SUBJECT
                                </span>
                                <p className={'text-xl leading-7 font-medium text-gray8'}>{activeEvent.subject}</p>
                              </div>
                              <div>
                                <span
                                  className={'text-xs leading-4 font-medium tracking-wider uppercase text-gray4 mb-3'}>
                                  MESSAGE
                                </span>
                                <p className={'text-sm leading-5 font-normal text-gray5'}>{activeEvent.message}</p>
                              </div>
                            </div>
                          </div>
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
