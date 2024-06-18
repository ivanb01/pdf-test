import Badge from 'components/shared/badge';
import DateChip from 'components/shared/chip/date-chip';
// import { SpeakerphoneIcon } from '@heroicons/react/outline';
import Edit from '@mui/icons-material/Edit';
import React, { useState } from 'react';
import { allStatusesQuickEdit } from 'global/variables';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { getInitials } from 'global/functions';
import List from '@mui/icons-material/List';
import DropdownNoInput from 'components/shared/dropdown/dropdownNoInput';
import Workspaces from '@mui/icons-material/Workspaces';
import AIChip from 'components/shared/chip/ai-chip';
import Info from '@mui/icons-material/Info';
import TooltipComponent from '@components/shared/tooltip';
import GoogleContact from '../../../../public/images/GoogleContact.png';
import Image from 'next/image';
import { useRef } from 'react';
import { useEffect } from 'react';
import InfoSharpIcon from '@mui/icons-material/InfoSharp';
import { useSelector } from 'react-redux';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';

import Mail from '@mui/icons-material/Mail';
import { createPortal } from 'react-dom';
import CommunicationForm from '@components/overlays/communication-form';
import Email from '@mui/icons-material/Email';
import { Sms } from '@mui/icons-material';
import { setContactToBeEmailed, setOpenEmailContactOverlay } from '@store/global/slice';
import WhatsApp from '@mui/icons-material/WhatsApp';
import { addContactActivity, getContactActivities } from '@api/contacts';
import { updateContactLocally } from '@store/contacts/slice';

const categoryIds = {
  Client: '4,5,6,7',
  Professional: '8,9,12',
};

export default function ContactCard({
  contact,
  categoryType,
  handleCardClick,
  handleCardEdit,
  handleAddActivity,
  handleCommunication,
  handleChangeStatus,
}) {
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    let targetElement = event.target;
    while (targetElement != null) {
      if (targetElement.classList.contains('change-status-dropdown')) {
        return;
      }
      targetElement = targetElement.parentElement;
    }

    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpened(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  let isUnapprovedAIContact = null;
  if (
    contact?.import_source_text === 'GmailAI' ||
    contact?.import_source_text === 'Smart Sync A.I.' ||
    contact?.import_source_text === 'Gmail'
  ) {
    if (!contact?.approved_ai) isUnapprovedAIContact = true;
  }
  const router = useRouter();
  const dispatch = useDispatch();
  const status = contact?.status?.length > 8 && contact?.status?.slice(0, 8) + '...';
  const [openCommunicationPopup, setOpenCommunicationPopup] = useState(false);

  const [dropdownOpened, setDropdownOpened] = useState(false);
  const hideUnapproved = useSelector((state) => state.global.hideUnapproved);

  const handleSendEmail = (contact) => {
    let clientToBeEmailed = {
      value: contact.id,
      label: `${contact.first_name} ${contact.last_name} - ${contact.email}`,
      first_name: contact.first_name,
      last_name: contact.last_name,
      email: contact.email,
      profile_image_path: contact.profile_image_path,
    };
    dispatch(setContactToBeEmailed(clientToBeEmailed));
    dispatch(setOpenEmailContactOverlay(true));
  };

  // const [dropdownVal, setDropdownVal] = useState(
  //   allStatusesQuickEdit[categoryType][0]
  // );
  const options = [
    {
      id: 2,
      category: 'In the funnel',
      dot: <span className="h-2 w-2 rounded-full bg-lightBlue3" />,
      label: 'New Lead',
      color: 'bg-lightBlue1',
    },
    {
      id: 3,
      category: 'In the funnel',
      dot: <span className="h-2 w-2 rounded-full bg-lightBlue3" />,
      label: 'Attempted Contact',
      color: 'bg-lightBlue2',
    },
    {
      id: 5,
      category: 'In the funnel',
      dot: <span className="h-2 w-2 rounded-full bg-lightBlue3" />,
      label: 'In Communication',
      color: 'bg-purple1',
    },
    {
      id: 4,
      category: 'In the funnel',
      dot: <span className="h-2 w-2 rounded-full bg-lightBlue3" />,
      label: 'Appointment Set',
      color: 'bg-purple2',
    },
    {
      id: 7,
      category: 'In the funnel',
      dot: <span className="h-2 w-2 rounded-full bg-lightBlue3" />,
      label: 'Actively Working',
      color: 'bg-purple3',
    },
    {
      id: 16,
      category: 'In the funnel',
      dot: <span className="h-2 w-2 rounded-full bg-lightBlue3" />,
      label: 'Offer Submitted',
      color: 'bg-purple4',
    },
    {
      id: 9,
      category: 'Closed',
      dot: <span className="h-2 w-2 rounded-full bg-green6" />,
      label: 'Contract Signed',
      color: 'bg-green8',
    },
    {
      id: 10,
      category: 'Closed',
      dot: <span className="h-2 w-2 rounded-full bg-green6" />,
      label: 'Closed Client',
      color: 'bg-green2',
    },
    {
      id: 8,
      label: 'On Hold',
      dot: <span className="h-2 w-2 rounded-full bg-orange1" />,
      category: 'On Hold',
      color: 'bg-orange2',
    },
    {
      id: 11,
      label: 'Dropped',
      category: 'Dropped',
      dot: <span className="h-2 w-2 rounded-full bg-red3" />,
      color: 'bg-red2',
    },
  ];

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleCommunicationPopup = () => {
    setOpenCommunicationPopup(true);
  };
  return (
    <>
      {isUnapprovedAIContact && hideUnapproved ? (
        <></>
      ) : (
        <div
          key={contact.id}
          className={`${dropdownOpened && 'border-t-4'} ${
            isUnapprovedAIContact && 'opacity-50 hover:opacity-100'
          } change-status-dropdown relative group rounded-lg bg-white shadow-md mb-3 transition-all border-lightBlue3 hover:border-t-4 contact-card`}>
          {/*{dropdownOpened && (*/}
          {/*  <DropdownNoInput*/}
          {/*    selectedOption={contact?.status_2}*/}
          {/*    options={options}*/}
          {/*    handleSelect={(item) => {*/}
          {/*      // console.log(item);*/}
          {/*      handleChangeStatus(item.id, contact);*/}
          {/*      setDropdownOpened(false);*/}
          {/*    }}*/}
          {/*  />*/}
          {/*)}*/}
          <div className="p-4 cursor-pointer" onClick={() => handleCardClick(contact)}>
            <div className="flex w-full items-center justify-between">
              {contact.profile_image_path ? (
                <img className="h-8 w-8 flex-shrink-0 rounded-full bg-gray-400" src={contact.profile_image_path} />
              ) : (
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-400">
                  <span className="text-sm leading-none text-white">
                    {getInitials(contact.first_name + ' ' + contact.last_name).toUpperCase()}
                  </span>
                </span>
              )}
              <div className="flex-1 ml-2 pr-2">
                <div className="flex items-center space-x-3">
                  <h3 className="text-sm font-medium text-gray-900  break-word">
                    {contact.first_name + ' ' + contact.last_name}
                  </h3>
                </div>
              </div>
              {/* <span className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-0.5 text-sm font-medium text-gray-800">
              Badge
            </span> */}
            </div>
            {/* <Chip lastCommunication={formatDateAgo(contact.last_communication_date, 'hour')} lastCommunicationType={contact.last_communication_category_id} /> */}
            <div className={`flex w-full items-center ${contact.status_2 !== 'Dropped' && 'justify-start'} mt-4 gap-2`}>
              <Badge label={contact.category_2} className="text-gray8 bg-gray1 px-[6px] py-[4px] rounded-[2222px]" />
              {contact.status_2 !== 'Dropped' && (
                <DateChip
                  contact={contact}
                  lastCommunication={contact.last_communication_date}
                  contactStatus={contact.status_2}
                  contactCategory={categoryType}
                />
              )}
              {/*<div className={'flex items-center gap-1.5'}>*/}
              {/*  <div>*/}
              {/*    <div className={'h-5'}>{getSource(contact.import_source_text).icon}</div>*/}
              {/*  </div>*/}
              {/*  {contact.summary !== null ? (*/}
              {/*    <TooltipComponent*/}
              {/*      side={'right'}*/}
              {/*      align={'center'}*/}
              {/*      triggerElement={*/}
              {/*        <InfoSharpIcon*/}
              {/*          className={`text-gray3 hover:text-gray4 mb-1.5`}*/}
              {/*          style={{ height: '18px', width: '18px' }}*/}
              {/*          aria-hidden="true"*/}
              {/*        />*/}
              {/*      }>*/}
              {/*      <div className={`w-[260px] pointer-events-none text-white bg-neutral1 rounded-lg`}>*/}
              {/*        <div className={`flex gap-1.5`}>*/}
              {/*          {getSource(contact.import_source_text).icon}*/}
              {/*          <p className={'text-xs leading-4 font-medium'}>{getSource(contact.import_source_text).name}</p>*/}
              {/*        </div>*/}
              {/*        <p className="text-xs leading-4 font-normal">{contact.summary}</p>*/}
              {/*      </div>*/}
              {/*    </TooltipComponent>*/}
              {/*  ) : (*/}
              {/*    <></>*/}
              {/*  )}*/}
              {/*</div>*/}
            </div>
          </div>
          <div
            className={`${
              !dropdownOpened && 'h-0 opacity-0'
            } pointer-events-none group-hover:pointer-events-auto group-hover:h-[49px] group-hover:opacity-100 transition-all`}>
            <div className="border-t border-gray-200 py-[10px] flex items-center justify-end">
              <TooltipComponent
                side={'top'}
                align="center"
                style={{ marginBottom: '7px' }}
                triggerElement={
                  <div
                    role={'button'}
                    onClick={() => handleCardEdit(contact)}
                    className="group/edit cursor-pointer rounded-full p-1.5 bg-gray1 hover:bg-lightBlue2  mr-2 flex items-center justify-center">
                    <Edit
                      id={'edit-contact-icon-' + contact.id}
                      className="group-hover/edit:text-lightBlue5 text-gray3 w-4 h-4"
                    />
                  </div>
                }>
                <div className={'text-xs leading-4 font-medium'}>Edit Contact</div>
              </TooltipComponent>
              <TooltipComponent
                side={'top'}
                align="center"
                style={{ marginBottom: '7px' }}
                triggerElement={
                  <div
                    role={'button'}
                    onClick={() => handleSendEmail(contact)}
                    className="group/email cursor-pointer rounded-full p-1.5 bg-gray1 hover:bg-lightBlue2  mr-2 flex items-center justify-center">
                    <Email
                      id={'edit-contact-icon-' + contact.id}
                      className="group-hover/email:text-lightBlue5 text-gray3 w-4 h-4"
                    />
                  </div>
                }>
                <div className={'text-xs leading-4 font-medium'}>Send Email</div>
              </TooltipComponent>
              {contact.phone_number && (
                <>
                  {/* {/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform) && (
                    <TooltipComponent
                      side={'top'}
                      align="center"
                      style={{ marginBottom: '7px' }}
                      triggerElement={
                        <div
                          role={'button'}
                          onClick={(e) => {
                            let message = '';
                            switch (contact.category_2) {
                              case 'Renter':
                                message = "Hey, wanted to check in and see if you're still looking for a rental?";
                                break;
                              case 'Buyer':
                                message = 'Hey, wanted to see if we could help with anything related to your purchase.';
                                break;
                              case 'Landlord':
                                message = 'Hey just checking in on your property.';
                                break;
                              case 'Seller':
                                message = 'Hey, just wanted to check in and see if we could talk about your property.';
                                break;
                              default:
                                message = 'Hey, just checking in.';
                                break;
                            }
                            // let activity = {
                            //   type_of_activity_id: 37,
                            //   description: 'Attempted to communicate using SMS.',
                            // };

                            // addContactActivity(contact.id, activity);
                            let link = `sms:${contact.phone_number}&body=${message}`;
                            window.location.href = link;
                          }}
                          className="group/sms cursor-pointer rounded-full p-1.5 bg-gray1 hover:bg-lightBlue2  mr-2 flex items-center justify-center"
                        >
                          <Sms
                            id={'edit-contact-icon-' + contact.id}
                            className="group-hover/sms:text-lightBlue5 text-gray3 w-4 h-4"
                          />
                        </div>
                      }
                    >
                      <div className={'text-xs leading-4 font-medium'}>Send SMS</div>
                    </TooltipComponent>
                  )} */}
                  {/* <TooltipComponent
                    side={'top'}
                    align="center"
                    style={{ marginBottom: '7px' }}
                    triggerElement={
                      <div
                        role={'button'}
                        onClick={() => {
                          let message = '';
                          switch (contact.category_2) {
                            case 'Renter':
                              message = "Hey, wanted to check in and see if you're still looking for a rental?";
                              break;
                            case 'Buyer':
                              message = 'Hey, wanted to see if we could help with anything related to your purchase.';
                              break;
                            case 'Landlord':
                              message = 'Hey just checking in on your property.';
                              break;
                            case 'Seller':
                              message = 'Hey, just wanted to check in and see if we could talk about your property.';
                              break;
                            default:
                              message = 'Hey, just checking in.';
                              break;
                          }
                          // let activity = {
                          //   type_of_activity_id: 26,
                          //   description: 'Attempted to communicate using Whatsapp.',
                          // };
                          dispatch(updateContactLocally({ ...contact, last_communication_date: new Date() }));
                          // addContactActivity(contact.id, activity);
                          let link = `https://wa.me/${contact.phone_number}?text=${encodeURIComponent(message)}`;
                          window.open(link, '_blank');
                        }}
                        className="group/whatsapp cursor-pointer rounded-full p-1.5 bg-gray1 hover:bg-lightBlue2  mr-2 flex items-center justify-center"
                      >
                        <WhatsApp
                          id={'edit-contact-icon-' + contact.id}
                          className="group-hover/whatsapp:text-lightBlue5 text-gray3 w-4 h-4"
                        />
                      </div>
                    }
                  >
                    <div className={'text-xs leading-4 font-medium'}>Send Whatsapp</div>
                  </TooltipComponent> */}
                  <TooltipComponent
                    side={'top'}
                    align="center"
                    style={{ marginBottom: '7px' }}
                    triggerElement={
                      <div
                        role={'button'}
                        onClick={() => {
                          dispatch(updateContactLocally({ ...contact, last_communication_date: new Date() }));
                          addContactActivity(contact.id, {
                            type_of_activity_id: 27,
                            description: 'Attempted to make a phone call.',
                            created_at: new Date().toISOString(),
                          });
                          window.open(`tel:${contact.phone_number}`);
                        }}
                        className="group/call cursor-pointer rounded-full p-1.5 bg-gray1 hover:bg-lightBlue2  mr-2 flex items-center justify-center">
                        <svg
                          className="group-hover/call:text-lightBlue5 text-gray3 w-4 h-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            fill={'currentColor'}
                            d="M11.7094 5.00008C12.5233 5.15889 13.2713 5.55696 13.8577 6.14336C14.4441 6.72976 14.8422 7.4778 15.001 8.29175M11.7094 1.66675C13.4004 1.85461 14.9773 2.61189 16.1812 3.81425C17.3851 5.01662 18.1444 6.59259 18.3344 8.28341M8.5235 11.5526C7.52219 10.5513 6.73153 9.41912 6.15153 8.21111C6.10164 8.1072 6.0767 8.05524 6.05753 7.9895C5.98943 7.75587 6.03835 7.46899 6.18003 7.27113C6.21989 7.21546 6.26752 7.16783 6.36278 7.07257C6.65412 6.78123 6.79979 6.63556 6.89503 6.48908C7.25419 5.93667 7.25419 5.22452 6.89503 4.67211C6.79979 4.52563 6.65412 4.37996 6.36278 4.08862L6.20039 3.92623C5.75752 3.48336 5.53609 3.26192 5.29827 3.14164C4.8253 2.90241 4.26675 2.90241 3.79378 3.14164C3.55596 3.26192 3.33453 3.48336 2.89166 3.92623L2.7603 4.05759C2.31895 4.49894 2.09827 4.71962 1.92973 5.01964C1.74271 5.35257 1.60825 5.86964 1.60938 6.25149C1.61041 6.59562 1.67716 6.8308 1.81067 7.30117C2.52814 9.82901 3.88187 12.2143 5.87185 14.2043C7.86184 16.1943 10.2471 17.548 12.775 18.2655C13.2453 18.399 13.4805 18.4657 13.8246 18.4668C14.2065 18.4679 14.7236 18.3334 15.0565 18.1464C15.3565 17.9779 15.5772 17.7572 16.0186 17.3158L16.1499 17.1845C16.5928 16.7416 16.8142 16.5202 16.9345 16.2824C17.1737 15.8094 17.1737 15.2508 16.9345 14.7779C16.8142 14.5401 16.5928 14.3186 16.1499 13.8758L15.9875 13.7134C15.6962 13.422 15.5505 13.2764 15.404 13.1811C14.8516 12.8219 14.1395 12.822 13.5871 13.1811C13.4406 13.2764 13.2949 13.422 13.0036 13.7134C12.9083 13.8086 12.8607 13.8562 12.805 13.8961C12.6072 14.0378 12.3203 14.0867 12.0866 14.0186C12.0209 13.9994 11.9689 13.9745 11.865 13.9246C10.657 13.3446 9.52482 12.554 8.5235 11.5526Z"
                            stroke="text-gray3"
                            stroke-width="1.66667"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                    }>
                    <div className={'text-xs leading-4 font-medium'}>Initiate Call</div>
                  </TooltipComponent>
                </>
              )}

              {
                // temporarily removing send email and send sms buttons
              }
              {/* <div
            className="cursor-pointer rounded-full p-1.5 bg-gray1 hover:bg-gray2 mr-2 flex items-center justify-center"
            data-tooltip-target={'tooltip-send-email-' + contact.id}
          >
            <Email className="text-gray3 w-4 h-4" />
            <div
              id={'tooltip-send-email-' + contact.id}
              role="tooltip"
              className="inline-block absolute invisible z-10 py-2 px-3 text-xs font-medium text-white bg-neutral1 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
            >
              Send Email
            </div>
          </div>
          <div
            className="cursor-pointer rounded-full p-1.5 bg-gray1 hover:bg-gray2 mr-2 flex items-center justify-center"
            data-tooltip-target={'tooltip-send-sms-' + contact.id}
          >
            <Sms className="text-gray3 w-4 h-4" />
            <div
              id={'tooltip-send-sms-' + contact.id}
              role="tooltip"
              className="inline-block absolute invisible z-10 py-2 px-3 text-xs font-medium text-white bg-neutral1 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
            >
              Send SMS
            </div>
          </div> */}
              {/* <TooltipComponent
              side={'top'}
              align="center"
              style={{ marginBottom: '7px' }}
              triggerElement={
                <div
                  role={'button'}
                  onClick={() => handleCommunicationPopup()}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="cursor-pointer rounded-full p-1.5 bg-gray2  hover:bg-gray6 mr-2 flex items-center justify-center">
                  <svg
                    id={'add-activity-icon-' + contact.id}
                    className={`w-4 h-4  ${!isHovered ? 'text-gray5' : 'text-white '}`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="currentColor">
                    <path
                      d="M1.00991 11V11.3621L1.26598 11.1061L3.22204 9.15H10.1599C10.475 9.15 10.7485 9.03606 10.9722 8.81232C11.196 8.58858 11.3099 8.3151 11.3099 8V2C11.3099 1.6849 11.196 1.41142 10.9722 1.18768C10.7485 0.963945 10.475 0.85 10.1599 0.85H2.15991C1.84481 0.85 1.57134 0.963945 1.3476 1.18768C1.12386 1.41142 1.00991 1.6849 1.00991 2V11ZM2.73491 7.85H2.67374L2.63002 7.89278L2.30991 8.20592V2.15H10.0099V7.85H2.73491Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              }>
              <div className={'text-xs leading-4 font-medium'}>Add Communication</div>
            </TooltipComponent> */}
              {/*<div*/}
              {/*  className="change-status relative cursor-pointer rounded-full p-1.5 bg-gray1 hover:bg-gray2 flex items-center justify-center group-hover"*/}
              {/*  ref={dropdownRef}*/}
              {/*  onMouseEnter={() => {*/}
              {/*    document*/}
              {/*      .querySelector('#tooltip-change-status-' + contact.id)*/}
              {/*      .classList.remove('invisible', 'opacity-0');*/}
              {/*    document.querySelector('#change-status-icon-' + contact.id).classList.add('text-gray4');*/}
              {/*    document.querySelector('#change-status-icon-' + contact.id).classList.remove('text-gray3');*/}
              {/*  }}*/}
              {/*  onMouseLeave={() => {*/}
              {/*    document.querySelector('#tooltip-change-status-' + contact.id).classList.add('invisible', 'opacity-0');*/}
              {/*    document.querySelector('#change-status-icon-' + contact.id).classList.add('text-gray3');*/}
              {/*    document.querySelector('#change-status-icon-' + contact.id).classList.remove('text-gray4');*/}
              {/*  }}*/}
              {/*  // onClick={(event) => handleDropdown(event, !dropdownOpened)}*/}
              {/*  onClick={() => setDropdownOpened(!dropdownOpened)}>*/}
              {/*  /!* <SimpleBarDropdown*/}
              {/*    options={allStatusesQuickEdit[categoryType]}*/}
              {/*    activeIcon={false}*/}
              {/*    activeClasses="bg-lightBlue1"*/}
              {/*    handleSelect={(item) => {*/}
              {/*      // setDropdownVal(item)*/}
              {/*      handleChangeStatus(item.id, contact);*/}
              {/*    }}*/}
              {/*    iconLabel={*/}
              {/*      <Category*/}
              {/*        id={'change-status-icon-' + contact.id}*/}
              {/*        className="text-gray3 w-4 h-4"*/}
              {/*      />*/}
              {/*    }*/}
              {/*    dropdownValue={contact?.status_2}*/}
              {/*    handleDropdownClosed={(item) => setDropdownOpened(item)}*/}
              {/*    noOptionChange={contact?.is_in_campaign==="assigned"}*/}
              {/*  ></SimpleBarDropdown> *!/*/}
              {/*  /!*<Workspaces id={'change-status-icon-' + contact.id} className="text-gray3 w-4 h-4" />*!/*/}
              {/*  /!*<div*!/*/}
              {/*  /!*  id={'tooltip-change-status-' + contact.id}*!/*/}
              {/*  /!*  role="tooltip"*!/*/}
              {/*  /!*  className="inline-block absolute bottom-[34px] right-0 whitespace-nowrap invisible z-10 py-2 px-3 text-xs font-medium text-white bg-neutral1 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">*!/*/}
              {/*  /!*  Change Status*!/*/}
              {/*  /!*</div>*!/*/}
              {/*</div>*/}
              {openCommunicationPopup &&
                createPortal(
                  <CommunicationForm handleCloseOverlay={() => setOpenCommunicationPopup(false)} client={contact} />,
                  document.getElementById('modal-portal'),
                )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
