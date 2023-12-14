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
  const getSource = (source) => {
    if (source === 'GmailAI' || source === 'Smart Sync A.I.' || source === 'Gmail') {
      return {
        name: 'AI Smart Synced Contact.',
        icon: <AIChip reviewed={contact.approved_ai} />,
      };
    } else if (source === 'Manually Added') {
      return {
        name: 'Contact Added Manually',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M4.83301 11.1666H9.16631V10.1667H4.83301V11.1666ZM4.83301 8.49998H11.1663V7.50001H4.83301V8.49998ZM4.83301 5.83331H11.1663V4.83334H4.83301V5.83331ZM3.53814 13.6666C3.20139 13.6666 2.91634 13.55 2.68301 13.3166C2.44967 13.0833 2.33301 12.7983 2.33301 12.4615V3.53848C2.33301 3.20172 2.44967 2.91668 2.68301 2.68334C2.91634 2.45001 3.20139 2.33334 3.53814 2.33334H12.4612C12.7979 2.33334 13.083 2.45001 13.3163 2.68334C13.5496 2.91668 13.6663 3.20172 13.6663 3.53848V12.4615C13.6663 12.7983 13.5496 13.0833 13.3163 13.3166C13.083 13.55 12.7979 13.6666 12.4612 13.6666H3.53814Z"
              fill="#9CA3AF"
            />
          </svg>
        ),
      };
    } else if (source === 'Google Contacts') {
      return {
        name: 'Google Contact',
        icon: <Image src={GoogleContact} height={16} width={16} />,
      };
    } else return <></>;
  };
  const router = useRouter();
  const dispatch = useDispatch();
  const status = contact?.status?.length > 8 && contact?.status?.slice(0, 8) + '...';

  const [dropdownOpened, setDropdownOpened] = useState(false);
  const hideUnapproved = useSelector((state) => state.global.hideUnapproved);

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
  return (
    <>
      <div
        key={contact.id}
        className={`${dropdownOpened && 'border-t-4'} ${isUnapprovedAIContact && 'opacity-50 hover:opacity-100'} ${
          isUnapprovedAIContact && hideUnapproved && 'hidden'
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
                  className="cursor-pointer rounded-full p-1.5 bg-lightBlue1 hover:bg-lightBlue2  mr-2 flex items-center justify-center">
                  <Edit id={'edit-contact-icon-' + contact.id} className="text-lightBlue5 w-4 h-4" />
                </div>
              }>
              <div className={'text-xs leading-4 font-medium'}>Edit Contact</div>
            </TooltipComponent>
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
            <TooltipComponent
              side={'top'}
              align="center"
              style={{ marginBottom: '7px' }}
              triggerElement={
                <div
                  role={'button'}
                  onClick={() => handleCommunication()}
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
            </TooltipComponent>
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
          </div>
        </div>
      </div>
    </>
  );
}
