import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Input from 'components/shared/input';
import Dropdown from '@components/shared/dropdown';
import Button from '@components/shared/button';

const Tag = ({ children }) => {
  return (
    <div className={'px-[10px] py-[5px] rounded-[70px] border border-gray2 mb-4'}>
      <p className={'text-xs leading-4 font-medium text-neutral1'}> {children}</p>
    </div>
  );
};
const PropertyFilters = ({ open, setOpen, className }) => {
  const [closeOthers, setCloseOthers] = useState(false);
  const [closeRental, setCloseRental] = useState(false);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setOpen}>
        <div className="fixed inset-0" />
        <div className={`fixed inset-0 overflow-hidden bg-transparentBlack ${className}`}>
          <div className="absolute inset-0 overflow-hidden">
            <div
              className={`pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 w-[420px] justify-between`}>
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full">
                <Dialog.Panel className={`pointer-events-auto w-screen ${className}`}>
                  <div className={`flex h-full flex-col bg-white shadow-xl  `}>
                    <div className="flex flex-shrink-0 justify-between items-center p-[20px] pr-6 pl-4 w-[100%]">
                      <div className={'flex justify-between items-center  w-[100%]'}>
                        <Dialog.Title className="text-base font-medium text-gray-900">Filters</Dialog.Title>
                        <CloseIcon className={'h-4 w-4 text-[#8F95B2] cursor-pointer'} onClick={setOpen} />
                      </div>
                    </div>
                    <div className={'flex justify-between flex-col h-[100%]'}>
                      <div className={'px-4 py-6 pr-6 pl-4 w-[100%]'}>
                        <div
                          className={'flex items-center justify-between border-b border-gray2 py-[6px]'}
                          role={'button'}
                          onClick={() => setCloseRental(!closeRental)}>
                          <p className={'text-xs leading-4 font-semibold tracking-wider uppercase text-gray5'}>
                            rental period Date (from-to)
                          </p>
                          {closeRental ? (
                            <KeyboardArrowDownIcon className={'h-4 w-4 text-gray4'} />
                          ) : (
                            <KeyboardArrowUpIcon className={'h-4 w-4 text-gray4'} />
                          )}
                        </div>
                        {!closeRental && (
                          <>
                            <div className={'flex justify-between items-center py-[5px]'}>
                              <Input type={'date'}></Input>
                              <div className={'text-[#323232]'}>-</div>
                              <Input type={'date'}></Input>
                            </div>
                            <div>
                              <p className={'italic font-normal text-sm text-gray4'}>
                                You’re staying here for <span className={'text-gray5 font-medium'}>5 months</span>
                              </p>
                            </div>
                            <div className={'my-[30px] grid grid-cols-2 gap-x-[23px] gap-y-[10px]'}>
                              <Dropdown placeHolder={'Washer & Dryer'} />
                              <Dropdown placeHolder={'Sublet Policy'} />
                              <Dropdown placeHolder={'Sponsor Sale'} />
                              <Dropdown placeHolder={'Option'} />
                            </div>
                          </>
                        )}
                        <div
                          className={'flex items-center justify-between  border-b border-gray2 py-[6px] mb-3'}
                          role={'button'}
                          onClick={() => setCloseOthers(!closeOthers)}>
                          <p className={'text-xs leading-4 font-semibold tracking-wider uppercase text-gray5'}>Other</p>
                          {closeOthers ? (
                            <KeyboardArrowDownIcon className={'h-4 w-4 text-gray4'} />
                          ) : (
                            <KeyboardArrowUpIcon className={'h-4 w-4 text-gray4'} />
                          )}
                        </div>
                        {!closeOthers && (
                          <div className={'flex flex-wrap gap-x-2'}>
                            <Tag>Wifi</Tag>
                            <Tag>Air condition</Tag>
                            <Tag>Heating</Tag>
                            <Tag>TV</Tag>
                            <Tag>Dryer</Tag>
                            <Tag>Refrierator</Tag>
                          </div>
                        )}
                      </div>
                      <div className={'flex items-center justify-between px-6 py-4 fixed-categorize-menu'}>
                        <Button white label="Cancel" onClick={setOpen}>
                          Clear All Filters
                        </Button>
                        <Button primary className={'bg-[#3B82F6]'}>
                          Apply Filter
                        </Button>
                      </div>
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

export default PropertyFilters;
