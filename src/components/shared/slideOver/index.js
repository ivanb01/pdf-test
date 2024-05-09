import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Close from '@mui/icons-material/Close';
import SimpleBar from 'simplebar-react';
import Input from '../input';
import Loader from '../loader';
import StatusChip, { VARIANT_ENUM } from '@components/shared/status-chip';
import { formatDateStringMDY, getFormattedDateFromTimestamp } from '@global/functions';
import AssignUnassignContactToCampaign from '@components/shared/AssignUnassignContactToCampaign';
import { useRouter } from 'next/router';

export default function SlideOver({
  noHeader,
  open,
  border,
  editableTitle,
  setOpen,
  title,
  buttons,
  children,
  className,
  withBackdrop,
  width,
  rounded,
  handleTitleChange,
  specialTitle,
  loading,
  campaignLoading,
  buttonsRight,
  errorName,
  hideScroll,
  isCampaignTitle,
  person,
}) {
  const router = useRouter();

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
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className={`pointer-events-auto ${width ? width : 'w-screen max-w-md'}`}>
                  <div className={`flex h-full flex-col bg-white shadow-xl relative ${border}`}>
                    {loading ? (
                      <div className="relative h-full">
                        <Loader />
                      </div>
                    ) : (
                      <>
                        {!noHeader && (
                          <div
                            className={`flex flex-shrink-0 justify-between px-6 py-5 border-b border-gray1 items-center`}
                          >
                            {editableTitle ? (
                              <Input
                                placeholder="Write campaign title here"
                                className={`w-[400px] text-xl font-medium text-gray-900`}
                                value={title}
                                error={errorName}
                                errorText={'Field can not be empty!'}
                                onChange={handleTitleChange}
                              />
                            ) : (
                              <h6 className="font-medium text-gray-900">{title}</h6>
                            )}
                            <div className={'flex'}>
                              {isCampaignTitle &&
                                (!campaignLoading ? (
                                  <div className={'flex justify-end items-end flex-col'}>
                                    <div className={'flex justify-center items-center gap-1'}>
                                      <StatusChip
                                        variant={
                                          person?.contact_campaign_status === 'assigned'
                                            ? VARIANT_ENUM.SUCCESS
                                            : VARIANT_ENUM.ERROR
                                        }
                                        text={
                                          person?.contact_campaign_status === 'assigned'
                                            ? 'Campaign is Running'
                                            : person?.contact_campaign_status === 'unassigned'
                                              ? 'Campaign Deactivated'
                                              : 'Never In Campaign'
                                        }
                                      />
                                      {person?.contact_campaign_status !== null && (
                                        <div className={'text-xs leading-4 font-medium text-gray5 ml-0'}>
                                          {person?.contact_campaign_status === 'assigned'
                                            ? `from ${formatDateStringMDY(person?.contact_enrollment_date)}`
                                            : person?.contact_campaign_status === 'unassigned'
                                              ? `from ${formatDateStringMDY(person?.contact_unenrolment_date)}`
                                              : ''}
                                        </div>
                                      )}
                                    </div>
                                    <div className={'flex items-center gap-1'}>
                                      <AssignUnassignContactToCampaign
                                        campaignId={router.query.id}
                                        active={
                                          person?.contact_campaign_status !== 'never_assigned' &&
                                          person?.contact_campaign_status !== 'unassigned'
                                        }
                                        disabled={person?.contact_campaign_status === 'unassigned'}
                                        activePerson={person}
                                      />
                                      <div>
                                        <span
                                          className={`text-xs leading-5 font-medium ${
                                            person?.contact_campaign_status === 'unassigned'
                                              ? 'text-gray3'
                                              : 'text-gray7'
                                          }`}
                                        >
                                          {person?.contact_campaign_status === 'assigned'
                                            ? 'Active'
                                            : person?.contact_campaign_status === 'unassigned'
                                              ? 'Deactivated'
                                              : 'Inactive'}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="animate-pulse bg-gray1 rounded-lg h-[30px] w-[100px]"></div>
                                ))}
                              <div className="ml-3 flex h-7 items-center">
                                <button
                                  type="button"
                                  className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                                  onClick={() => setOpen(false)}
                                >
                                  <span className="sr-only">Close panel</span>
                                  <Close className="h-6 w-6" aria-hidden="true" />
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="side-overlay-wrapper flex min-h-0 flex-1 flex-col">
                          {hideScroll ? (
                            <div className="relative mt-[30px] flex-1 px-4 sm:px-6">{children}</div>
                          ) : (
                            <SimpleBar autoHide style={{ maxHeight: '100%' }}>
                              <div className="relative mt-[30px] flex-1 px-4 sm:px-6 pb-4">{children}</div>
                            </SimpleBar>
                          )}
                        </div>
                        {buttons && (
                          <div
                            className={`flex flex-shrink-0 ${buttonsRight ? 'justify-end' : 'justify-between'} px-4 py-4 border-t border-gray-2`}
                          >
                            {buttons}
                          </div>
                        )}
                      </>
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
