import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Close from '@mui/icons-material/Close';
import SimpleBar from 'simplebar-react';

export default function SlideOver({
  noHeader,
  open,
  setOpen,
  title,
  buttons,
  children,
  className,
  withBackdrop,
  width,
  specialTitle,
}) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setOpen}>
        <div className="fixed inset-0" />

        <div className={`fixed inset-0 overflow-hidden ${withBackdrop && 'bg-[#1e323a7d]'} transition-all`}>
          <div className="absolute inset-0 overflow-hidden">
            <div className={`pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 ${className}`}>
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full">
                <Dialog.Panel className={`pointer-events-auto ${width ? width : 'w-screen max-w-md'}`}>
                  <div className="flex h-full flex-col bg-white shadow-xl relative">
                    {!noHeader && (
                      <div className="flex flex-shrink-0 justify-between px-6 py-5">
                        <div>{title && <h6 className="text-md font-medium text-gray-900">{title}</h6>}</div>
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
                    )}
                    <div className="side-overlay-wrapper flex min-h-0 flex-1 flex-col">
                      <SimpleBar autoHide style={{ maxHeight: '100%' }}>
                        <div className="relative mt-[30px] mb-[30px] flex-1 px-4 sm:px-6">{children}</div>
                      </SimpleBar>
                    </div>
                    {buttons && (
                      <div className="flex flex-shrink-0 justify-between px-4 py-4 border-t border-gray-2">
                        {buttons}
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
