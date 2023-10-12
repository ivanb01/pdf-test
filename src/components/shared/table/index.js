import Input from '../input';
import {
  getContactStatusByStatusId,
  getContactTypeByTypeId,
  getContactStatusColorByStatusId,
  phoneNumberFormat,
  formatDateLL,
  findProfessionalSubtype,
  getInitials,
  getDateFormat,
} from 'global/functions';
import InfoSharpIcon from '@mui/icons-material/InfoSharp';
import eyeIcon from '/public/images/eye.svg';
import Image from 'next/image';
import { useState } from 'react';
import EventStatus from 'components/event-status';
import Text from '../text';
import Error from '@mui/icons-material/Error';
import ContactInfo from './contact-info';
import { useSelector } from 'react-redux';
import Launch from '@mui/icons-material/Launch';
import {
  clientStatuses,
  allStatusesQuickEdit,
  professionalsStatuses,
  agentTypes,
  unspecifiedTypes,
  contactTypes,
} from 'global/variables';
import { useRouter } from 'next/router';
import { DotsVerticalIcon, TrashIcon, PencilIcon } from '@heroicons/react/outline';
import FilterDropdown from 'components/shared/dropdown/FilterDropdown';
import Edit from '@mui/icons-material/Edit';
import Category from '@mui/icons-material/Category';
import SimpleBarDropdown from 'components/shared/dropdown/simpleBarDropdown';
import Campaign from '@mui/icons-material/Campaign';
import Chip from '../chip';
import DateChip from '../chip/date-chip';
import { formatDateAgo, formatDateLThour, formatDateCalendar } from 'global/functions';
import undoIcon from '/public/images/undo.svg';
import { useDispatch } from 'react-redux';
import { setContacts, updateContactLocally } from 'store/contacts/slice';
import toast from 'react-hot-toast';
import * as contactServices from 'api/contacts';
import noClientCampaigns from '/public/images/no-client-campaigns.svg';
import Link from 'components/Link';
import { formatDateMDY } from 'global/functions';
import List from '@mui/icons-material/List';
import AddActivity from 'components/overlays/add-activity';
import ChangeStatus from 'components/overlays/change-contact-status';
import { getAllEvents, unassignContactFromCampaign } from 'api/campaign';
import { getContact } from 'api/contacts';
import { useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Fragment } from 'react';
import ClientHealth from 'components/clientHealth';
import React from 'react';
import CheckCircleIcon from '@heroicons/react/solid/CheckCircleIcon';
import { getEmailParts } from 'global/functions';
import { Delete } from '@mui/icons-material';
import { CheckCircle } from '@mui/icons-material';
import AIChip from '../chip/ai-chip';
import RedoIcon from '@mui/icons-material/Redo';
import { setRefetchCount } from '@store/global/slice';
import TooltipComponent from '../tooltip';
import { healthLastCommunicationDate } from 'global/variables';
import ListIcon from '@mui/icons-material/List';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { createPortal } from 'react-dom';
import GoogleContact from '../../../../public/images/GoogleContact.png';

const categoryIds = {
  Client: '4,5,6,7',
  Professional: '8,9,12',
};

const Table = ({
  undoAllCategorizations,
  undoCategorization,
  data,
  handleSelectAll,
  handleSelectContact,
  showCategorize,
  handleClickRow,
  tableFor,
  handleAction,
  categoryType,
  handleCardEdit,
  currentButton,
  setCurrentEvent,
  searchTerm,
  campaignId,
  setCampaignId,
  titleLabel,
  checkbox,
  checked,
  toggleAll,
  selectedPeople,
  setSelectedPeople,
}) => {
  const vendorSubtypes = useSelector((state) => state.global.vendorSubtypes);

  const types = [
    {
      name: (
        <span className="flex flex-row">
          <PencilIcon height={20} className="text-gray6 mr-3" />
          <Text p className="text-gray6">
            Edit Contact
          </Text>
        </span>
      ),
      handleClick: () => console.log('test'),
    },
    {
      name: (
        <span className="flex flex-row">
          <TrashIcon height={20} className="text-red5 mr-3" />
          <Text p className="text-red5">
            Delete Contact
          </Text>
        </span>
      ),
      handleClick: () => console.log('test2'),
    },
  ];
  const router = useRouter();
  const getSource = (source, approvedAI = false) => {
    if (source === 'Smart Sync A.I.' || source === 'GmailAI') {
      return {
        name: source,
        icon: <AIChip reviewed={approvedAI} />,
      };
    } else if (source === 'Manually Added') {
      return {
        name: 'Contact Added Manually',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M6.04175 13.9584H11.4584V12.7084H6.04175V13.9584ZM6.04175 10.625H13.9584V9.37508H6.04175V10.625ZM6.04175 7.29171H13.9584V6.04175H6.04175V7.29171ZM4.42316 17.0834C4.00222 17.0834 3.64591 16.9375 3.35425 16.6459C3.06258 16.3542 2.91675 15.9979 2.91675 15.577V4.42317C2.91675 4.00222 3.06258 3.64591 3.35425 3.35425C3.64591 3.06258 4.00222 2.91675 4.42316 2.91675H15.577C15.9979 2.91675 16.3542 3.06258 16.6459 3.35425C16.9375 3.64591 17.0834 4.00222 17.0834 4.42317V15.577C17.0834 15.9979 16.9375 16.3542 16.6459 16.6459C16.3542 16.9375 15.9979 17.0834 15.577 17.0834H4.42316Z"
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

  const getContactInfo = async () => {
    try {
      const { data } = await getContact(3729);
      console.log('get contact', data);
    } catch (error) {
      console.log(error);
    }
  };

  const campaignsTable = () => {
    const [hovered, setHovered] = useState(false);

    return (
      <>
        <thead className="bg-gray-50 overflow-x-hidden">
          <tr>
            <th
              scope="col"
              className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6 flex items-center">
              {/* <Input type="checkbox" onChange={() => handleSelectAll}></Input> */}
              Contacts
            </th>
            <th scope="col" className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
              Campaign
            </th>
            <th scope="col" className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
              To Be Sent On
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {data.map((dataItem) => (
            <tr
              key={dataItem.event_id}
              className="hover:bg-lightBlue1 cursor-pointer contact-row border-b border-gray-200"
              // onClick={(event) => handleClickRow(dataItem, event)}
            >
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                <ContactInfo
                  // handleSelect={() => console.log('test')}
                  data={{
                    name: dataItem.contact_name,
                    type: dataItem.contact_category,
                    status: dataItem.contact_status,
                    image: dataItem.contact_profile_url,
                  }}
                />
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                <div className="text-gray7  font-medium">{dataItem.campaign_name}</div>
                <div
                  className="text-lightBlue3 cursor-pointer hover:underline"
                  onClick={() => {
                    console.log(dataItem, data);
                    setCampaignId(dataItem.campaign_id);
                  }}>
                  <Image src={eyeIcon} />
                  <span className="ml-1">Preview Campaign</span>
                </div>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                <div className="text-gray7 font-medium">{formatDateCalendar(dataItem.event_scheduled_time)}</div>
                <div className="text-gray4">{formatDateLThour(dataItem.event_scheduled_time)}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </>
    );
  };
  const contactCampaignsTable = () => {
    let contactStatus;
    let title;
    let description;

    if (currentButton === 0) {
      title = 'You don’t have any assigned contacts';
      description = `Clients that are part of this campaign will be listed here`;
    } else if (currentButton === 1) {
      title = 'You don’t have any contacts that you can assign to this campaign';
      description = `Clients that are not part of this campaign, but can be assigned will be listed here`;
    } else {
      title = 'You don’t have any unassigned contacts here';
      description = `Clients that were once part of this campaign, and cannot be reassigned will be listed here`;
    }

    const [campaignEvents, setCampaignEvents] = useState();

    useEffect(() => {
      getAllEvents(campaignId).then((res) => setCampaignEvents(res.data));
    }, [campaignId]);

    const noResults = () => {
      return (
        <tr>
          <td colSpan={10}>
            <div className="flex flex-col items-center justify-center h-[433px] max-w-[390px] mx-auto my-0">
              <Text h3 className="text-gray7 mb-2 mt-4 text-center">
                No results have been found!
              </Text>
            </div>
          </td>
        </tr>
      );
    };

    // if (!data?.length && !searchTerm)
    const noData = () => {
      return (
        <tr>
          <td colSpan={10}>
            <div className="flex flex-col items-center justify-center h-[433px] max-w-[390px] mx-auto my-0">
              <Image src={noClientCampaigns}></Image>
              <Text h3 className="text-gray7 mb-2 mt-4 text-center">
                {title}
              </Text>
              <Text p className="text-gray4 relative text-center mb-6">
                {description}
              </Text>
            </div>
          </td>
        </tr>
      );
    };

    const skeletonData = [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

    return (
      <>
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="h-[56px] min-w-96 w-96 py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6  items-center border-r border-gray-200">
              {/* <Input type="checkbox" onChange={() => handleSelectAll}></Input> */}
              <div className="flex items-center justify-between">
                <span>{titleLabel}</span>
                {/* <Button white >See Campaign Preview</Button> */}
              </div>
            </th>
            {!campaignEvents ? (
              <>
                {skeletonData.map((data, index) => (
                  <th
                    key={index}
                    scope="col"
                    className="px-3 py-3 text-center text-xs font-medium tracking-wide animate-pulse">
                    <div className="">
                      <div className="uppercase bg-gray-300 h-3.5 mb-1"></div>
                      <div className="bg-gray-300 h-3.5"></div>
                    </div>
                  </th>
                ))}
              </>
            ) : (
              campaignEvents?.events.map((event, index) => (
                <th key={index} scope="col" className="px-3 py-3 text-center text-xs font-medium tracking-wide">
                  <div className="">
                    <div className="uppercase text-gray-500">Event {index + 1}</div>
                    <div className="text-lightBlue3 cursor-pointer" onClick={() => setCurrentEvent(index + 1)}>
                      <Image src={eyeIcon} />
                      <span className="ml-1">Preview</span>
                    </div>
                  </div>
                </th>
              ))
            )}
            {/* <th
              scope="col"
              className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500"
            >
              Assigned On
            </th> */}
          </tr>
        </thead>
        <tbody className="bg-white">
          {!data?.length && searchTerm
            ? noResults()
            : !data?.length && !searchTerm
            ? noData()
            : data.map((dataItem, index) => {
                return (
                  <tr
                    key={index}
                    className="hover:bg-lightBlue1 cursor-pointer contact-row group bg-white group border-b border-gray-200"
                    // onClick={(event) => handleClickRow(contact, event)}
                  >
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 border-r border-gray-200">
                      <ContactInfo
                        data={{
                          name: `${dataItem.contact_name}`,
                          id: dataItem.contact_id,
                          email: dataItem.contact_email,
                          image: dataItem.profile_image_path,
                          assigned:
                            dataItem.contact_campaign_status === 'unassigned'
                              ? 2
                              : dataItem.contact_campaign_status === 'assigned'
                              ? 1
                              : 0,
                        }}
                        // handleSelect={(e, dataItem) =>
                        //   handleSelectContact(e, dataItem)
                        // }
                        handleAction={(id, action) => handleAction(id, action)}
                      />
                    </td>
                    {dataItem &&
                      dataItem?.events.map((event, index) => (
                        <td
                          key={`event-${index}`}
                          className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">
                          <EventStatus status={event.event_status} />
                          <div className="text-gray7">{formatDateMDY(event?.event_updated_at)}</div>
                        </td>
                      ))}
                    {dataItem.events.length === 0 &&
                      [1, 2, 3, 4, 5].map((event, index) => (
                        <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">
                          <div className="text-gray7">-</div>
                        </td>
                      ))}
                  </tr>
                );
              })}
        </tbody>
      </>
    );
  };
  const otherTable = () => {
    return (
      <>
        {data?.length ? (
          <>
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6 flex items-center">
                  Contact
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-xs font-medium uppercase  text-left tracking-wide text-gray-500">
                  Contact summary
                </th>
              </tr>
            </thead>
            <tbody className=" bg-white">
              {data.map((dataItem, index) => (
                <tr
                  key={dataItem.id}
                  className={`hover:bg-lightBlue1 cursor-pointer contact-row border-b border-gray-200`}
                  onClick={() =>
                    router.push({
                      pathname: '/contacts/details',
                      query: { id: dataItem?.id },
                    })
                  }>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 flex items-center">
                    <ContactInfo
                      data={{
                        name: dataItem?.first_name + ' ' + dataItem?.last_name,
                        email: dataItem?.email,
                        image: dataItem?.profile_image_path,
                      }}
                    />
                  </td>
                  <td className="whitespace-nowrap px-3 py-4  text-sm text-gray-500 text-left">
                    <div className={'flex gap-1.5 items-center justify-start'}>
                      {getSource(dataItem.import_source_text, dataItem.approved_ai).icon}
                      <p className={'text-xs leading-4 font-medium text-gray8'}>
                        {getSource(dataItem.import_source_text, dataItem.approved_ai).name}
                      </p>
                    </div>
                    {dataItem.summary !== null && (
                      <TooltipComponent
                        side={'bottom'}
                        align={'center'}
                        triggerElement={
                          <div
                            className={
                              'max-w-[239px] leading-5 text-left font-medium text-[11px] px-3 py-0.5 mt-1.5 text-ellipsis overflow-hidden bg-lightBlue1 text-lightBlue3 '
                            }>
                            {dataItem.summary}
                          </div>
                        }>
                        <div className={`w-[260px] pointer-events-none text-white bg-neutral1 rounded-lg`}>
                          <p className="text-xs leading-4 font-normal">{dataItem.summary}</p>
                        </div>
                      </TooltipComponent>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-[490px] max-w-[390px] mx-auto my-0">
            <Text h3 className="text-gray7 mb-2 mt-4 text-center">
              No results have been found!
            </Text>
          </div>
        )}
      </>
    );
  };
  const uncategorizedTable = () => {
    return (
      <>
        {data?.length ? (
          <>
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6 flex items-center">
                  {tableFor == 'in-categorization' && (
                    <Input className="mr-1" id="select_all" type="checkbox" onChange={handleSelectAll} />
                  )}
                  Contact
                </th>
                {tableFor != 'in-categorization' && (
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                    Contact summary
                  </th>
                )}
              </tr>
            </thead>
            <TransitionGroup component="tbody" className=" bg-white">
              {data.map((dataItem, index) => (
                <CSSTransition key={dataItem.id} timeout={500} classNames="item">
                  <tr
                    key={dataItem.id}
                    id={'row_' + index}
                    className={`hover:bg-lightBlue1 cursor-pointer contact-row border-b border-gray-200`}
                    onClick={(event) => {
                      if (tableFor == 'in-categorization') {
                        if (event.target.id != 'input_' + index) {
                          document.querySelector('#input_' + index).click();
                        }
                      } else if (tableFor == 'uncategorized') {
                        handleClickRow(event.target);
                      }
                    }}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 flex items-center">
                      {tableFor == 'in-categorization' && (
                        <Input
                          className="mr-1"
                          type="checkbox"
                          id={'input_' + index}
                          onChange={(event) => handleClickRow(dataItem, event)}></Input>
                      )}
                      <ContactInfo
                        inCategorization={tableFor === 'in-categorization'}
                        data={{
                          name: dataItem.first_name + ' ' + dataItem.last_name,
                          email: dataItem.email,
                          image: dataItem.profile_image_path,
                          import_source_text: dataItem.import_source_text,
                          summary: dataItem.summary,
                          approved_ai: !dataItem.approved_ai,
                        }}
                      />
                      {/* {(contact.type != null || contact.status != null) && (
                    <div className="flex items-center mt-3 type-and-status">
                      {contact.type != null && (
                        <div className="min-h-[28px] text-[10px] uppercase px-2 py-1 bg-gray1 rounded-[4px] font-medium mr-3 flex items-center border border-gray3">
                          {getContactTypeByTypeId(contact.type)}
                        </div>
                      )}
                      {contact.status != null && (
                        <div
                          className={` min-h-[28px] text-xs font-medium text-gray8 py-1 px-2 bg-purple1 rounded-xl mr-3 flex items-center border border-purple3`}
                        >
                          {getContactStatusByStatusId(contact.status)}
                        </div>
                      )}
                    </div>
                  )} */}
                    </td>
                    {tableFor != 'in-categorization' && (
                      <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">
                        <div className={'flex gap-1.5 items-center justify-start'}>
                          {getSource(dataItem.import_source_text, dataItem.approved_ai).icon}
                          <p className={'text-xs leading-4 font-medium text-gray8'}>
                            {getSource(dataItem.import_source_text, dataItem.approved_ai).name}
                          </p>
                        </div>
                        {dataItem.summary !== null && (
                          <TooltipComponent
                            side={'bottom'}
                            align={'center'}
                            triggerElement={
                              <div
                                className={
                                  'max-w-[239px] leading-5 text-left font-medium text-[11px] px-3 py-0.5 mt-1.5 text-ellipsis  overflow-hidden bg-lightBlue1 text-lightBlue3 '
                                }>
                                {dataItem.summary}
                              </div>
                            }>
                            <div className={`w-[260px] pointer-events-none text-white bg-neutral1 rounded-lg`}>
                              <p className="text-xs leading-4 font-normal">{dataItem.summary}</p>
                            </div>
                          </TooltipComponent>
                        )}
                      </td>
                    )}
                  </tr>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-[490px] max-w-[390px] mx-auto my-0">
            <Text h3 className="text-gray7 mb-2 mt-4 text-center">
              No results have been found!
            </Text>
          </div>
        )}
      </>
    );
  };
  const showStatus = (dataItem) => {
    return dataItem.status_id != null && dataItem.status_id !== 1;
  };
  const categorizedTable = () => {
    return (
      <>
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="py-3 pl-6 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6">
              {data.length} Categorized Contacts
            </th>
            <th
              scope="col"
              className="py-3 pl-4 pr-6 text-center text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6">
              {/* <Button white onClick={() => undoAllCategorizations()}> */}
              {/* Undo All */}
              {/* </Button> */}
              <div className="relative flex justify-center">
                <a
                  className="cursor-pointer text-xs"
                  onClick={() => undoAllCategorizations()}
                  onMouseEnter={() =>
                    document.querySelector('#tooltip-undo-all').classList.remove('invisible', 'opacity-0')
                  }
                  onMouseLeave={() =>
                    document.querySelector('#tooltip-undo-all').classList.add('invisible', 'opacity-0')
                  }>
                  {/* <Image src={undoIcon} className="w-5"></Image> */}
                  <svg version="1.1" viewBox="0 0 16 20" width="15px" xmlns="http://www.w3.org/2000/svg">
                    <g fill="none" fillRule="evenodd" id="Page-1" stroke="none" strokeWidth="1">
                      <g fill="#6B7280" id="Core" transform="translate(-424.000000, -463.000000)">
                        <g id="undo" transform="translate(424.000000, 464.000000)">
                          <path
                            d="M8,3 L8,-0.5 L3,4.5 L8,9.5 L8,5 C11.3,5 14,7.7 14,11 C14,14.3 11.3,17 8,17 C4.7,17 2,14.3 2,11 L0,11 C0,15.4 3.6,19 8,19 C12.4,19 16,15.4 16,11 C16,6.6 12.4,3 8,3 L8,3 Z"
                            id="Shape"
                          />
                        </g>
                      </g>
                    </g>
                  </svg>
                </a>
                <div
                  id="tooltip-undo-all"
                  className="inline-block capitalize -right-3 top-[30px] h-fit absolute invisible opacity-0 z-10 py-2 px-3 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-sm dark:bg-gray-700">
                  Undo All
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <TransitionGroup component="tbody" className=" bg-white">
          {data.map((dataItem, index) => (
            <CSSTransition key={dataItem.id} timeout={500} classNames="item-reverse">
              <tr key={dataItem.email} id={'row_' + index} className={`contact-row border-b border-gray-200`}>
                <td className="whitespace-nowrap py-4 pl-6  text-sm sm:pl-6">
                  <ContactInfo
                    data={{
                      name: dataItem.first_name + ' ' + dataItem.last_name,
                      email: dataItem.email,
                      image: dataItem.profile_image_path,
                    }}
                  />
                  {(dataItem.category_id != null || dataItem.status_id != null) && (
                    <div className="flex items-center mt-3 type-and-status">
                      {dataItem.category_id != null && (
                        <Chip typeStyle>{getContactTypeByTypeId(vendorSubtypes, dataItem.category_id)}</Chip>
                      )}
                      {showStatus(dataItem) && (
                        <Chip
                          statusStyle
                          className={getContactStatusColorByStatusId(dataItem.category_id, dataItem.status_id)}>
                          {getContactStatusByStatusId(dataItem.category_id, dataItem.status_id)}
                        </Chip>
                      )}
                    </div>
                  )}
                </td>
                <td className="relative whitespace-nowrap h-[72.5px] py-4 pr-6 sm:pr-6 flex justify-end items-center">
                  <div className="relative">
                    <a
                      className="cursor-pointer text-xs"
                      onClick={() => undoCategorization(dataItem.id)}
                      onMouseEnter={() =>
                        document
                          .querySelector('#tooltip-undo-categorization-' + dataItem.id)
                          .classList.remove('invisible', 'opacity-0')
                      }
                      onMouseLeave={() =>
                        document
                          .querySelector('#tooltip-undo-categorization-' + dataItem.id)
                          .classList.add('invisible', 'opacity-0')
                      }>
                      {/* <Image src={undoIcon} className="w-5"></Image> */}
                      <svg version="1.1" viewBox="0 0 16 20" width="15px" xmlns="http://www.w3.org/2000/svg">
                        <g fill="none" fillRule="evenodd" id="Page-1" stroke="none" strokeWidth="1">
                          <g fill="#6B7280" id="Core" transform="translate(-424.000000, -463.000000)">
                            <g id="undo" transform="translate(424.000000, 464.000000)">
                              <path
                                d="M8,3 L8,-0.5 L3,4.5 L8,9.5 L8,5 C11.3,5 14,7.7 14,11 C14,14.3 11.3,17 8,17 C4.7,17 2,14.3 2,11 L0,11 C0,15.4 3.6,19 8,19 C12.4,19 16,15.4 16,11 C16,6.6 12.4,3 8,3 L8,3 Z"
                                id="Shape"
                              />
                            </g>
                          </g>
                        </g>
                      </svg>
                    </a>
                    <div
                      id={'tooltip-undo-categorization-' + dataItem.id}
                      className="inline-block -right-4 top-[30px] h-fit absolute invisible opacity-0 z-10 py-2 px-3 text-xs font-medium text-white bg-neutral1 rounded-lg shadow-sm dark:bg-gray-700">
                      Undo Categorization
                    </div>
                  </div>
                </td>
              </tr>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </>
    );
  };
  const importsSummaryTable = () => {
    return (
      <>
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6 flex items-center">
              <Input type="checkbox" onChange={(event) => console.log(event)}></Input>
              File Name
            </th>
            <th scope="col" className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
              <div className="flex items-center justify-center">
                NEW RECORDS
                <InfoSharpIcon height={15} className="ml-3" />
              </div>
            </th>
            <th scope="col" className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
              <div className="flex items-center justify-center">
                UPDATED RECORDS
                <InfoSharpIcon height={15} className="ml-3" />
              </div>
            </th>
            <th scope="col" className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
              <div className="flex items-center justify-center">
                ERROR RECORDS
                <InfoSharpIcon height={15} className="ml-3" />
              </div>
            </th>
            <th scope="col" className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
              UPLOADED DATE
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {data.map((data) => (
            <tr
              key={data.id}
              className="hover:bg-lightBlue1 cursor-pointer contact-row border-b border-gray-200"
              onClick={(event) => handleClickRow(data, event)}>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 pl-6">
                <div className="flex items-center">
                  <Input
                    type="checkbox"
                    onChange={(event) => handleSelectContact(event, contact)}
                    className="mr-1"></Input>
                  <div className="text-gray7 font-medium">{data.fileName}</div>
                </div>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">
                <div className="text-gray7 font-medium">{data.newRecords}</div>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">
                <div className="text-gray7 font-medium">{data.updatedRecords}</div>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">
                <div className="text-gray7 font-medium">{data.errorCount}</div>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">
                <div className="text-gray7 font-medium">{data.uploadedDate}</div>
                <div className="text-gray4">{data.uploadedTime}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </>
    );
  };
  const contactsListTable = () => {
    const openedTab = useSelector((state) => state.global.openedTab);
    const openedSubtab = useSelector((state) => state.global.openedSubtab);
    const contacts = useSelector((state) => state.contacts.clients);
    let contactsStatuses = openedTab == 0 ? clientStatuses : professionalsStatuses;

    const dispatch = useDispatch();

    const [addActivityPopup, setAddActivityPopup] = useState(false);
    const handleAddActivity = (client) => {
      setContactToModify(client);
      setAddActivityPopup(true);
    };

    const [changeStatusModal, setChangeStatusModal] = useState(false);
    const [statusIdToUpdate, setStatusIdToUpdate] = useState(null);
    const [contactToModify, setContactToModify] = useState(null);

    const handleChangeStatus = async (status, contact) => {
      try {
        if (contact?.is_in_campaign === 'assigned' && contact?.status_id !== status) {
          setStatusIdToUpdate(status);
          setChangeStatusModal(true);
          setContactToModify(contact);
        } else {
          await changeStatus(status, contact);
          console.log('change status');
        }
        dispatch(setRefetchData(true));
      } catch (error) {
        console.log(error);
      }
    };

    const handleChangeStatusAndCampaign = async () => {
      try {
        await unassignContactFromCampaign(contactToModify.campaign_id, contactToModify.id);
        await changeStatus(statusIdToUpdate, contactToModify);
        console.log('unassin then change status');

        setChangeStatusModal(false);
      } catch (error) {
        console.log(error);
      }
    };

    const changeStatus = async (status, contact) => {
      try {
        const statusId = status; // example status id to search for
        const categoryStatuses = categoryType === 'clients' ? clientStatuses : professionalsStatuses;

        const foundStatus = categoryStatuses.find(
          (status) => status.statuses.findIndex((s) => s.id === statusId) !== -1,
        );
        const statusMainTitle = foundStatus ? foundStatus.statusMainTitle : null;
        let statusName = foundStatus.statuses.find((foundstatus) => foundstatus.id == status).name;

        dispatch(
          updateContactLocally({
            id: contact.id,
            status_id: status,
            status_2: statusName,
          }),
        );
        toast.success(`${contact.first_name + ' ' + contact.last_name} moved to ${statusName}`);

        const res = await contactServices.updateContact(contact.id, {
          status_id: status,
        });
        // change status locally
        console.log('changeStatus', contact, contact.id, status, res);
        // setDropdownOpened(false);
        const { data } = await contactServices.getContacts(categoryIds[contact?.category_1]);
        dispatch(setContacts(data));
      } catch (error) {
        console.log(error);
      }
    };

    function filterContacts(category, contactTypes) {
      const filteredContacts = contacts.filter(
        (contact) =>
          searchTerm.split(' ').every((word) => {
            const lowercaseWord = word.toLowerCase();
            return (
              contact.first_name.toLowerCase().includes(lowercaseWord) ||
              contact.last_name.toLowerCase().includes(lowercaseWord)
            );
          }) &&
          contact.status_id == category.id &&
          contact.category_1 == contactTypes.find((type) => type.id == openedTab).name,
      );

      return filteredContacts;
    }

    return (
      <>
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6 flex items-center">
              {/* <Input
                type="checkbox"
                onChange={(event) => handleSelectContact(event, contact)}
              ></Input> */}
              {openedTab == 0 ? 'Client' : 'Professional'}
            </th>
            <th scope="col" className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
              Type
            </th>
            <th scope="col" className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
              Contact summary
            </th>
            {openedTab !== 1 && openedSubtab !== 3 ? (
              <th
                scope="col"
                className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
                LAST COMMUNICATION
              </th>
            ) : null}
            <th scope="col" className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
              ACTIONS
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {contactsStatuses[openedSubtab].statuses.map((category, index) =>
            contacts.filter(
              (contact) =>
                searchTerm.split(' ').every((word) => {
                  const lowercaseWord = word.toLowerCase();
                  return (
                    contact.first_name.toLowerCase().includes(lowercaseWord) ||
                    contact.last_name.toLowerCase().includes(lowercaseWord)
                  );
                }) && contact.category_1 == contactTypes.find((type) => type.id == openedTab).name,
            ).length > 0 ? (
              <div>
                <tr key={category.id} className={`${category.color} contact-row border-b border-gray-200`}>
                  <td colSpan="10">
                    <div className="flex items-center px-6 py-2">
                      <Text chipText className="text-gray4 mr-1">
                        {category.name == 'Vendor' ? 'Other Vendors' : category.name}
                      </Text>
                      <TooltipComponent
                        side={'bottom'}
                        align={'start'}
                        triggerElement={
                          <InfoSharpIcon className="h-4 w-4 text-gray3 hover:text-gray4" aria-hidden="true" />
                        }>
                        <div
                          // style={{ width: '300px' }}
                          className={`  w-[360px] text-xs font-medium text-white bg-neutral1`}>
                          <p className="mb-2">{`You must interact with these clients every ${
                            healthLastCommunicationDate[categoryType][category?.name] === 1
                              ? 'day'
                              : `${healthLastCommunicationDate[categoryType][category?.name]} days`
                          } in order to maintain healthy communication.`}</p>
                          <p className="mb-2">Chip statuses of communication in cards represent:</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center mr-2">
                              <span className="h-[13px] w-[13px] rounded bg-green5 mr-1" />
                              <span>Healthy Communication</span>
                            </div>
                            <div className="flex items-center">
                              <span className="h-[13px] w-[13px] rounded bg-red5 mr-1" />
                              <span>Unhealthy Communication</span>
                            </div>
                          </div>
                        </div>
                      </TooltipComponent>
                    </div>
                  </td>
                </tr>
                {filterContacts(category, contactTypes).length ? (
                  filterContacts(category, contactTypes).map((contact) => (
                    <tr
                      key={contact.id}
                      className="hover:bg-lightBlue1 cursor-pointer contact-row border-b border-gray-200"
                      onClick={() =>
                        router.push({
                          pathname: '/contacts/details',
                          query: { id: contact.id },
                        })
                      }>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <ContactInfo
                          data={{
                            name: contact.first_name + ' ' + contact.last_name,
                            email: contact.email,
                            image: contact.profile_image_path,
                            approved_ai: contact.approved_ai,
                          }}
                        />
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">
                        <div className="text-gray7 px-1.5 py-1 font-medium bg-gray1 text-[10px] uppercase rounded min-w-[50px] h-6 flex items-center justify-center">
                          {contact.category_2}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">
                        <div className={'flex gap-1.5 items-center justify-start'}>
                          {getSource(contact.import_source_text, contact.approved_ai).icon}
                          <p className={'text-xs leading-4 font-medium text-gray8 text-left'}>
                            {getSource(contact.import_source_text, contact.approved_ai).name}
                          </p>
                        </div>
                        {contact.summary !== null && (
                          <TooltipComponent
                            side={'bottom'}
                            align={'center'}
                            triggerElement={
                              <div
                                className={
                                  'max-w-[239px] leading-5 text-left font-medium text-[11px] px-3 py-0.5 mt-1.5 text-ellipsis overflow-hidden bg-lightBlue1 text-lightBlue3 '
                                }>
                                {contact.summary}
                              </div>
                            }>
                            <div className={`w-[260px] pointer-events-none text-white bg-neutral1 rounded-lg`}>
                              <p className="text-xs leading-4 font-normal">{contact.summary}</p>
                            </div>
                          </TooltipComponent>
                        )}
                      </td>
                      {contact.status_2 !== 'Dropped' && contact?.status_2 !== 'Trash' && (
                        <td className="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">
                          <div className="text-gray7 font-medium">
                            <DateChip
                              lastCommunication={contact.last_communication_date}
                              contactStatus={contact.status_2}
                              contactCategory={contact.category_1 === 'Client' ? 'clients' : 'professionals'}
                            />
                            {/* <Chip
                            lastCommunication={formatDateAgo(
                              contact?.last_communication_date
                            )}
                          /> */}
                          </div>
                          {/* <div className="text-gray4">{contact.uploadedTime}</div> */}
                        </td>
                      )}
                      <td>
                        <div className="px-4 py-[10px] flex items-center justify-center">
                          <div
                            className="cursor-pointer relative rounded-full p-1.5 bg-gray1 hover:bg-gray2 mr-2 flex items-center justify-center"
                            onMouseEnter={() => {
                              document
                                .querySelector('#tooltip-edit-contact-' + contact.id)
                                .classList.remove('invisible', 'opacity-0');
                              document.querySelector('#edit-contact-icon-' + contact.id).classList.add('text-gray4');
                              document.querySelector('#edit-contact-icon-' + contact.id).classList.remove('text-gray3');
                            }}
                            onMouseLeave={() => {
                              document
                                .querySelector('#tooltip-edit-contact-' + contact.id)
                                .classList.add('invisible', 'opacity-0');
                              document.querySelector('#edit-contact-icon-' + contact.id).classList.add('text-gray3');
                              document.querySelector('#edit-contact-icon-' + contact.id).classList.remove('text-gray4');
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCardEdit(contact);
                            }}>
                            <Edit id={'edit-contact-icon-' + contact.id} className="text-gray3 w-4 h-4" />
                            <div
                              id={'tooltip-edit-contact-' + contact.id}
                              className="inline-block absolute bottom-[34px]  whitespace-nowrap invisible opacity-0 z-10 py-2 px-3 text-xs font-medium text-white bg-neutral1 rounded-lg shadow-sm dark:bg-gray-700 ">
                              Edit Contact
                            </div>
                          </div>
                          <div
                            className="cursor-pointer relative rounded-full p-1.5 bg-gray1 hover:bg-gray2 mr-2 flex items-center justify-center"
                            onMouseEnter={() => {
                              document
                                .querySelector('#tooltip-add-activity-' + contact.id)
                                .classList.remove('invisible', 'opacity-0');
                              document.querySelector('#add-activity-icon-' + contact.id).classList.add('text-gray4');
                              document.querySelector('#add-activity-icon-' + contact.id).classList.remove('text-gray3');
                            }}
                            onMouseLeave={() => {
                              document
                                .querySelector('#tooltip-add-activity-' + contact.id)
                                .classList.add('invisible', 'opacity-0');
                              document.querySelector('#add-activity-icon-' + contact.id).classList.add('text-gray3');
                              document.querySelector('#add-activity-icon-' + contact.id).classList.remove('text-gray4');
                            }}
                            // onClick={(e) => {
                            //   e.stopPropagation();
                            //   router.push({
                            //     pathname: '/contacts/details',
                            //     query: { id: contact.id, campaigns: true },
                            //   });
                            // }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddActivity(contact);
                            }}>
                            <List id={'add-activity-icon-' + contact.id} className="text-gray3 w-4 h-4" />
                            <div
                              id={'tooltip-add-activity-' + contact.id}
                              role="tooltip"
                              className="inline-block absolute bottom-[34px] whitespace-nowrap invisible z-10 py-2 px-3 text-xs font-medium text-white bg-neutral1 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                              Add Activity
                            </div>
                          </div>
                          <div
                            className="change-status relative cursor-pointer rounded-full p-1.5 bg-gray1 hover:bg-gray2 flex items-center justify-center group-hover"
                            onMouseEnter={() => {
                              document
                                .querySelector('#tooltip-change-status-' + contact.id)
                                .classList.remove('invisible', 'opacity-0');
                              document.querySelector('#change-status-icon-' + contact.id).classList.add('text-gray4');
                              document
                                .querySelector('#change-status-icon-' + contact.id)
                                .classList.remove('text-gray3');
                            }}
                            onMouseLeave={() => {
                              document
                                .querySelector('#tooltip-change-status-' + contact.id)
                                .classList.add('invisible', 'opacity-0');
                              document.querySelector('#change-status-icon-' + contact.id).classList.add('text-gray3');
                              document
                                .querySelector('#change-status-icon-' + contact.id)
                                .classList.remove('text-gray4');
                            }}
                            // onClick={(event) => handleDropdown(event, !dropdownOpened)}
                            onClick={(e) => e.stopPropagation()}>
                            {/* <Category className="text-gray3 w-4 h-4" /> */}
                            <SimpleBarDropdown
                              options={allStatusesQuickEdit[categoryType]}
                              activeIcon={false}
                              activeClasses="bg-lightBlue1"
                              handleSelect={(item) => {
                                // setDropdownVal(item)
                                handleChangeStatus(item.id, contact);
                              }}
                              iconLabel={
                                <Category id={'change-status-icon-' + contact.id} className="text-gray3 w-4 h-4" />
                              }
                              dropdownValue={contact?.status_2}
                              handleDropdownClosed={(item) => console.log(item)}></SimpleBarDropdown>
                            <div
                              id={'tooltip-change-status-' + contact.id}
                              role="tooltip"
                              className="inline-block absolute bottom-[34px] right-0 whitespace-nowrap invisible z-10 py-2 px-3 text-xs font-medium text-white bg-neutral1 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                              Change Status
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className={'text-gray4 h-[76px] text-sm leading-5 font-medium'}>
                    <td colSpan={6} className={'text-center pt-[30px]'}>
                      No Contacts
                    </td>
                  </tr>
                )}
              </div>
            ) : (
              <>
                <div key={category.id}>
                  <tr key={category.id} className={`${category.color} contact-row border-b border-gray-200`}>
                    <td colSpan="10">
                      <div className="flex items-center px-6 py-2">
                        <Text chipText className="text-gray4 mr-1">
                          {category.name == 'Vendor' ? 'Other Vendors' : category.name}
                        </Text>
                        <TooltipComponent
                          side={'bottom'}
                          align={'start'}
                          triggerElement={
                            <InfoSharpIcon className="h-4 w-4 text-gray3 hover:text-gray4" aria-hidden="true" />
                          }>
                          <div
                            // style={{ width: '300px' }}
                            className={`  w-[360px] text-xs font-medium text-white bg-neutral1`}>
                            <p className="mb-2">{`You must interact with these clients every ${
                              healthLastCommunicationDate[categoryType][category?.name] === 1
                                ? 'day'
                                : `${healthLastCommunicationDate[categoryType][category?.name]} days`
                            } in order to maintain healthy communication.`}</p>
                            <p className="mb-2">Chip statuses of communication in cards represent:</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center mr-2">
                                <span className="h-[13px] w-[13px] rounded bg-green5 mr-1" />
                                <span>Healthy Communication</span>
                              </div>
                              <div className="flex items-center">
                                <span className="h-[13px] w-[13px] rounded bg-red5 mr-1" />
                                <span>Unhealthy Communication</span>
                              </div>
                            </div>
                          </div>
                        </TooltipComponent>
                      </div>
                    </td>
                  </tr>

                  <tr className={'text-gray4 h-[76px] text-sm leading-5 font-medium'}>
                    <td colSpan={6} className={'text-center pt-[30px]'}>
                      No Contacts
                    </td>
                  </tr>
                </div>
              </>
            ),
          )}
        </tbody>
        {addActivityPopup &&
          createPortal(
            <AddActivity
              clientId={contactToModify.id}
              className="min-w-[550px]"
              title={`Add Activity`}
              setAddActivityPopup={setAddActivityPopup}
              handleClose={() => setAddActivityPopup(false)}
            />,
            document.getElementById('modal-portal'),
          )}
        {changeStatusModal && (
          <ChangeStatus
            handleCloseOverlay={() => setChangeStatusModal(false)}
            onSubmit={handleChangeStatusAndCampaign}
          />
        )}
      </>
    );
  };

  const professionalsTable = () => {
    const openedTab = useSelector((state) => state.global.openedTab);
    const openedSubtab = useSelector((state) => state.global.openedSubtab);
    const contactsOriginal = useSelector((state) => state.contacts.professionals);
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
      if (openedSubtab === 0) {
        setContacts(contactsOriginal.filter((contact) => contact.category_id !== 12));
      } else if (openedSubtab === 1) {
        setContacts(contactsOriginal.filter((contact) => contact.category_id === 12));
      } else if (openedSubtab === 2) {
        setContacts(contactsOriginal.filter((contact) => contact.category_id === 9));
      }
    }, [openedSubtab, contactsOriginal]);

    const dispatch = useDispatch();

    const [addActivityPopup, setAddActivityPopup] = useState(false);
    const handleAddActivity = (client) => {
      setContactToModify(client);
      setAddActivityPopup(true);
    };

    const [changeStatusModal, setChangeStatusModal] = useState(false);
    const [statusIdToUpdate, setStatusIdToUpdate] = useState(null);
    const [contactToModify, setContactToModify] = useState(null);

    let professionalTypes = openedSubtab == 0 ? vendorSubtypes : openedSubtab == 1 ? agentTypes : unspecifiedTypes;

    return (
      <>
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6 flex items-center">
              {/* <Input
                type="checkbox"
                onChange={(event) => handleSelectContact(event, contact)}
              ></Input> */}
              Professional
            </th>
            {/* <th
              scope="col"
              className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500"
            >
              Type
            </th> */}
            <th scope="col" className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
              Contact summary
            </th>
            <th scope="col" className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
              ACTIONS
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {professionalTypes &&
            professionalTypes.map((type, index) =>
              contacts.filter((contact) => contact.category_id == type.id).length ? (
                <>
                  <tr key={type.id} className={`contact-row border-b border-gray-200`}>
                    <td colSpan="10">
                      <div className="flex items-center px-6 py-2">
                        <Text chipText className="text-gray4">
                          {type.name == 'Vendor' ? 'Other Vendors' : type.name}
                        </Text>
                      </div>
                    </td>
                  </tr>
                  {contacts
                    .filter(
                      (contact) =>
                        searchTerm.split(' ').every((word) => {
                          const lowercaseWord = word.toLowerCase();
                          return (
                            contact.first_name.toLowerCase().includes(lowercaseWord) ||
                            contact.last_name.toLowerCase().includes(lowercaseWord)
                          );
                        }) && contact.category_id == type.id,
                    )
                    .map((contact) => (
                      <tr
                        key={contact.id}
                        className="hover:bg-lightBlue1 cursor-pointer contact-row border-b border-gray-200"
                        onClick={() =>
                          router.push({
                            pathname: '/contacts/details',
                            query: { id: contact.id },
                          })
                        }>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                          <ContactInfo
                            data={{
                              name: contact.first_name + ' ' + contact.last_name,
                              email: contact.email,
                              image: contact.profile_image_path,
                            }}
                          />
                        </td>
                        {/* <td className="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">
                        <div className="text-gray7 font-medium bg-gray1 text-[10px] uppercase rounded min-w-[50px] h-6 flex items-center justify-center">
                          {contact.category_2}
                        </div>
                      </td> */}
                        <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">
                          <div className={'flex gap-1.5 items-center justify-start'}>
                            {getSource(contact.import_source_text, contact.approved_ai).icon}
                            <p className={'text-xs leading-4 font-medium text-gray8'}>
                              {getSource(contact.import_source_text, contact.approved_ai).name}
                            </p>
                          </div>
                          {contact.summary !== null && (
                            <TooltipComponent
                              side={'bottom'}
                              align={'center'}
                              triggerElement={
                                <div
                                  className={
                                    'max-w-[239px] leading-5 text-left font-medium text-[11px] px-3 py-0.5 mt-1.5 text-ellipsis overflow-hidden bg-lightBlue1 text-lightBlue3 '
                                  }>
                                  {contact.summary}
                                </div>
                              }>
                              <div className={`w-[260px] pointer-events-none text-white bg-neutral1 rounded-lg`}>
                                <p className="text-xs leading-4 font-normal">{contact.summary}</p>
                              </div>
                            </TooltipComponent>
                          )}
                        </td>
                        <td>
                          <div className="px-4 py-[10px] flex items-center justify-center">
                            <div
                              className="cursor-pointer relative rounded-full p-1.5 bg-gray1 hover:bg-gray2 mr-2 flex items-center justify-center"
                              onMouseEnter={() => {
                                document
                                  .querySelector('#tooltip-edit-contact-' + contact.id)
                                  .classList.remove('invisible', 'opacity-0');
                                document.querySelector('#edit-contact-icon-' + contact.id).classList.add('text-gray4');
                                document
                                  .querySelector('#edit-contact-icon-' + contact.id)
                                  .classList.remove('text-gray3');
                              }}
                              onMouseLeave={() => {
                                document
                                  .querySelector('#tooltip-edit-contact-' + contact.id)
                                  .classList.add('invisible', 'opacity-0');
                                document.querySelector('#edit-contact-icon-' + contact.id).classList.add('text-gray3');
                                document
                                  .querySelector('#edit-contact-icon-' + contact.id)
                                  .classList.remove('text-gray4');
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCardEdit(contact);
                              }}>
                              <Edit id={'edit-contact-icon-' + contact.id} className="text-gray3 w-4 h-4" />
                              <div
                                id={'tooltip-edit-contact-' + contact.id}
                                className="inline-block absolute bottom-[34px] whitespace-nowrap invisible opacity-0 z-10 py-2 px-3 text-xs font-medium text-white bg-neutral1 rounded-lg shadow-sm dark:bg-gray-700">
                                Edit Contact
                              </div>
                            </div>
                            <div
                              className="cursor-pointer relative rounded-full p-1.5 bg-gray1 hover:bg-gray2 mr-2 flex items-center justify-center"
                              onMouseEnter={() => {
                                document
                                  .querySelector('#tooltip-add-activity-' + contact.id)
                                  .classList.remove('invisible', 'opacity-0');
                                document.querySelector('#add-activity-icon-' + contact.id).classList.add('text-gray4');
                                document
                                  .querySelector('#add-activity-icon-' + contact.id)
                                  .classList.remove('text-gray3');
                              }}
                              onMouseLeave={() => {
                                document
                                  .querySelector('#tooltip-add-activity-' + contact.id)
                                  .classList.add('invisible', 'opacity-0');
                                document.querySelector('#add-activity-icon-' + contact.id).classList.add('text-gray3');
                                document
                                  .querySelector('#add-activity-icon-' + contact.id)
                                  .classList.remove('text-gray4');
                              }}
                              // onClick={(e) => {
                              //   e.stopPropagation();
                              //   router.push({
                              //     pathname: '/contacts/details',
                              //     query: { id: contact.id, campaigns: true },
                              //   });
                              // }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddActivity(contact);
                              }}>
                              <List id={'add-activity-icon-' + contact.id} className="text-gray3 w-4 h-4" />
                              <div
                                id={'tooltip-add-activity-' + contact.id}
                                role="tooltip"
                                className="inline-block absolute bottom-[34px] whitespace-nowrap invisible z-10 py-2 px-3 text-xs font-medium text-white bg-neutral1 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                Add Activity
                              </div>
                            </div>
                            {/* <div
                            className="change-status relative cursor-pointer rounded-full p-1.5 bg-gray1 hover:bg-gray2 flex items-center justify-center group-hover"
                            onMouseEnter={() => {
                              document
                                .querySelector(
                                  '#tooltip-change-status-' + contact.id
                                )
                                .classList.remove('invisible', 'opacity-0');
                              document
                                .querySelector(
                                  '#change-status-icon-' + contact.id
                                )
                                .classList.add('text-gray4');
                              document
                                .querySelector(
                                  '#change-status-icon-' + contact.id
                                )
                                .classList.remove('text-gray3');
                            }}
                            onMouseLeave={() => {
                              document
                                .querySelector(
                                  '#tooltip-change-status-' + contact.id
                                )
                                .classList.add('invisible', 'opacity-0');
                              document
                                .querySelector(
                                  '#change-status-icon-' + contact.id
                                )
                                .classList.add('text-gray3');
                              document
                                .querySelector(
                                  '#change-status-icon-' + contact.id
                                )
                                .classList.remove('text-gray4');
                            }}
                            // onClick={(event) => handleDropdown(event, !dropdownOpened)}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div
                              id={'tooltip-change-status-' + contact.id}
                              role="tooltip"
                              className="inline-block absolute bottom-[34px] right-0 whitespace-nowrap invisible z-10 py-2 px-3 text-xs font-medium text-white bg-neutral1 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                            >
                              Change Status
                            </div>
                          </div> */}
                          </div>
                        </td>
                      </tr>
                    ))}
                </>
              ) : (
                <></>
              ),
            )}
        </tbody>
        {addActivityPopup &&
          createPortal(
            <AddActivity
              clientId={contactToModify.id}
              className="min-w-[550px]"
              title={`Add Activity`}
              setAddActivityPopup={setAddActivityPopup}
              handleClose={() => setAddActivityPopup(false)}
            />,
            document.getElementById('modal-portal'),
          )}
      </>
    );
  };
  const importGoogleContactsDetails = () => {
    const [hovered, setHovered] = useState(false);
    return (
      <>
        <thead className="bg-gray-50 overflow-x-hidden">
          <tr>
            <th
              // scope="col"
              className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6 flex items-center">
              Contact
            </th>
          </tr>
        </thead>
        <tbody className=" bg-white">
          {!data.length ? (
            <tr className="h-[233px] text-center align-middle">
              <td className="text-center align-middle text-gray-400 text-sm italic">
                <div className="">No Contacts imported</div>
              </td>
            </tr>
          ) : (
            data.map((dataItem, i) => (
              <tr key={i} className="border-b border-gray-200">
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                  <div className="flex items-center justify-between">
                    {dataItem.details ? (
                      <div className="flex items-center relative">
                        <div className="font-medium text-gray7">{dataItem.details}</div>
                      </div>
                    ) : (
                      <ContactInfo
                        data={{
                          name: dataItem.first_name + ' ' + dataItem.last_name,
                          email: dataItem.email,
                          image: dataItem.profile_image_path,
                        }}
                      />
                    )}
                    {tableFor == 'import-google-contacts-failed' && (
                      <div className="flex items-center justify-center">
                        <Error className="h-5 w-5 text-red4 mr-2" />
                        <div className="text-gray7 font-medium">{dataItem.reason ?? ''}</div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </>
    );
  };

  const reportsTable = () => {
    function calculateClosedClients(closedClients, totalClients) {
      if (totalClients === 0) {
        return (0).toFixed(2);
      }

      let percentage = (closedClients / totalClients) * 100;
      return percentage.toFixed(2);
    }

    return (
      <>
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="h-[56px] py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6 flex items-center ">
              Agent
            </th>
            <th scope="col" className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
              # of clients
            </th>
            <th scope="col" className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
              In the funnel
            </th>
            <th scope="col" className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
              Client health
            </th>
            <th scope="col" className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
              closed clients
            </th>
            <th scope="col" className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
              conversion
            </th>
            {/* <th
              scope="col"
              className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500"
            >
              Time spent in the crm
            </th> */}
            <th scope="col" className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
              last communication
            </th>
          </tr>
        </thead>
        <tbody className=" bg-white">
          {data.map((dataItem, index) => (
            <tr
              key={index}
              className="hover:bg-lightBlue1 cursor-pointer contact-row group bg-white group border-b border-gray-200"
              // onClick={(event) => handleClickRow(contact, event)}
            >
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 w-96">
                <ContactInfo
                  data={{
                    // name: `${dataItem.first_name + ' ' + dataItem.last_name}`,
                    name: `${getEmailParts(dataItem.agent_id).firstName} ${getEmailParts(dataItem.agent_id).lastName}`,
                    id: dataItem.id,
                    email: dataItem.agent_id,
                    // image: dataItem.profile_image_path,
                  }}
                  // handleSelect={(e, dataItem) =>
                  //   handleSelectContact(e, dataItem)
                  // }
                  // handleAction={(id, action) => handleAction(id, action)}
                />
              </td>
              <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">
                <div className="text-gray7 font-medium">{dataItem.total_clients}</div>
                <div className="text-gray4 italic">{dataItem.clients_in_funnel} in the funnel</div>
              </td>
              <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">
                <div className="text-gray7 font-medium">{dataItem.clients_in_funnel}</div>
                <div className="text-gray4 italic">{dataItem.clients_in_funnel_new_lead} new leads</div>
              </td>
              <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">
                <ClientHealth
                  healthyCount={dataItem.healthy_communication}
                  unhealthyCount={dataItem.unhealthy_communication}
                />
              </td>
              <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">
                <div className="text-gray7 flex items-center justify-center">
                  {dataItem.clients_closed}{' '}
                  <CheckCircleIcon
                    className={`h-4 ml-1 ${dataItem.clients_closed == 0 ? 'text-gray3' : 'text-green5'}`}
                  />
                </div>
              </td>
              <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">
                <div className="text-gray7 font-medium">
                  {calculateClosedClients(dataItem.clients_closed, dataItem.total_clients)}%
                </div>
              </td>
              <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">
                {dataItem.last_interaction ? (
                  <>
                    <div className="text-gray7">{formatDateLL(dataItem.last_interaction)}</div>
                    <div className="text-gray4">{formatDateLThour(dataItem.last_interaction)}</div>
                  </>
                ) : (
                  <div className="text-red-500">No Interaction</div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </>
    );
  };

  const aiSummaryTable = () => {
    const getChip = (item) => {
      if (item.category_id == 3) {
        return 'Trash';
      }
      if (item.category_1 == 'Professional') {
        if (vendorSubtypes.map((type) => type.id)) {
          return item.category_2;
        }
      } else {
        return item.category_1;
      }
    };
    // const getSubtype = (item) => {
    //   if (item.category_1 == 'Professional') {
    //     return [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26].includes(item.category_id)
    //       ? ' - ' + findProfessionalSubtype(item.category_id)
    //       : ' - ' + item.category_2;
    //   } else {
    //     return;
    //   }
    // };
    return (
      <>
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="h-[56px] py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6 flex items-center w-[300px] ">
              <input
                type="checkbox"
                className="h-4 w-4 mr-4 rounded border-gray-300 text-lightBlue3 focus:ring-lightBlue3"
                ref={checkbox}
                checked={checked}
                onChange={toggleAll}
              />
              Contact
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 w-[100px]">
              Type
            </th>
            <th scope="col" className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
              Status
            </th>
            <th scope="col" className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
              Email Summary
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500 w-[100px]">
              Actions
            </th>
            <th
              scope="col"
              className="px-3 pr-1 text-center text-xs font-medium uppercase tracking-wide text-gray-500"></th>
          </tr>
        </thead>
        <tbody className=" bg-white">
          {data.map((dataItem, index) => (
            <tr
              key={dataItem.index}
              className="hover:bg-lightBlue1 cursor-pointer contact-row group bg-white group border-b border-gray-200"
              // onClick={(event) => handleClickRow(contact, event)}
              onClick={(e) => {
                if (e.target.type === 'checkbox') return;
                handleCardEdit(dataItem);
              }}>
              {/* onClick={(event) => handleClickRow(dataItem, event)}> */}
              <td className="whitespace-nowrap py-4 text-sm pl-6 flex items-center xl:min-w-[340px]">
                <input
                  type="checkbox"
                  className="mr-4 h-4 w-4 rounded border-gray-300 text-lightBlue3 focus:ring-lightBlue3"
                  value={dataItem.email}
                  checked={selectedPeople.includes(dataItem)}
                  onChange={(e) =>
                    setSelectedPeople(
                      e.target.checked ? [...selectedPeople, dataItem] : selectedPeople.filter((p) => p !== dataItem),
                    )
                  }
                />
                <ContactInfo
                  data={{
                    // name: `${dataItem.first_name + ' ' + dataItem.last_name}`,
                    name: `${dataItem.first_name} ${dataItem.last_name}`,
                    id: dataItem.id,
                    email: dataItem.email,
                    // image: dataItem.profile_image_path,
                  }}
                  // handleSelect={(e, dataItem) =>
                  //   handleSelectContact(e, dataItem)
                  // }
                  // handleAction={(id, action) => handleAction(id, action)}
                />
              </td>

              <td className="whitespace-nowrap text-left px-3 py-4 text-sm text-gray-500 type-and-status xl:min-w-[100px]">
                <Chip typeStyle>{vendorSubtypes && getChip(dataItem)}</Chip>
              </td>
              <td className="whitespace-nowrap text-left px-3 py-4 text-sm text-gray-500 xl:min-w-[100px]">
                <Chip statusStyle className={getContactStatusColorByStatusId(dataItem.category_id, dataItem.status_id)}>
                  {getContactStatusByStatusId(dataItem.category_id, dataItem.status_id)}
                </Chip>
              </td>
              <td className=" text-left px-3 py-4 text-sm text-gray-500 type-and-status xl:min-w-[750px]">
                <div className=" flex items-center">
                  {dataItem.ai_email_summary && (
                    <a href={dataItem.email_link} onClick={(e) => e.stopPropagation()} target="_blank" rel="noreferrer">
                      <Launch className="h-5 w-5 text-blue-500 mr-2" />
                    </a>
                  )}
                  {dataItem.ai_email_summary ? (
                    <div className="email-summary-styling">{dataItem.ai_email_summary}</div>
                  ) : (
                    '-'
                  )}
                </div>
              </td>
              <td className="whitespace-nowrap text-left px-3 py-4 text-sm text-gray-500 xl:w-[100px]">
                <div className="flex items-center justify-center">
                  <div
                    onMouseEnter={() => {
                      document
                        .querySelector(`#tooltip-delete-${dataItem.id}-2`)
                        .classList.remove('invisible', 'opacity-0');
                    }}
                    onMouseLeave={() =>
                      document.querySelector(`#tooltip-delete-${dataItem.id}-2`).classList.add('invisible', 'opacity-0')
                    }
                    className="transition-all rounded-[4px] cursor-pointer hover:bg-green-500 hover:text-white bg-green-50 text-green-500 w-7 h-7 flex items-center justify-center relative">
                    <CheckCircle
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAction('approve', dataItem);
                      }}
                      id={'edit-contact-icon-' + dataItem.id}
                      className="group-hover/check:text-white text-[16px]"
                    />
                    <div
                      id={`tooltip-delete-${dataItem.id}-2`}
                      role="tooltip"
                      className="inline-block absolute bottom-[40px] left-[-40px] whitespace-nowrap invisible opacity-0 z-10 py-2 px-3 text-xs font-medium text-white bg-neutral1 rounded-lg shadow-sm  dark:bg-gray-700">
                      Mark as Correct
                    </div>
                  </div>
                  <div
                    onMouseEnter={() => {
                      document
                        .querySelector(`#tooltip-edit-${dataItem.id}-1`)
                        .classList.remove('invisible', 'opacity-0');
                    }}
                    onMouseLeave={() =>
                      document.querySelector(`#tooltip-edit-${dataItem.id}-1`).classList.add('invisible', 'opacity-0')
                    }
                    className="mx-6 h-6 w-6 cursor-pointer rounded-full bg-gray1 hover:bg-gray2 flex items-center justify-center relative"
                    onClick={(e) => {
                      e.stopPropagation();

                      handleCardEdit(dataItem);
                    }}>
                    <div
                      id={`tooltip-edit-${dataItem.id}-1`}
                      role="tooltip"
                      className="inline-block absolute bottom-[40px] left-[-40px] whitespace-nowrap invisible opacity-0 z-10 py-2 px-3 text-xs font-medium text-white bg-neutral1 rounded-lg shadow-sm  dark:bg-gray-700">
                      Edit Contact
                    </div>
                    <Edit id={'edit-contact-icon-' + dataItem.id} className="text-gray3 w-4 h-4" />
                  </div>
                  <div
                    onMouseEnter={() => {
                      document
                        .querySelector(`#tooltip-delete-${dataItem.id}-1`)
                        .classList.remove('invisible', 'opacity-0');
                    }}
                    onMouseLeave={() =>
                      document.querySelector(`#tooltip-delete-${dataItem.id}-1`).classList.add('invisible', 'opacity-0')
                    }
                    className=" transition-all rounded-[4px] cursor-pointer hover:bg-red-500 hover:text-white bg-red-50 text-[#ff6d6d] w-7 h-7 flex items-center justify-center relative">
                    <Delete
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAction('delete', dataItem);
                      }}
                      id={'edit-contact-icon-' + dataItem.id}
                      className="group-hover/delete:text-white text-[16px]"
                    />
                    <div
                      id={`tooltip-delete-${dataItem.id}-1`}
                      role="tooltip"
                      className="inline-block absolute bottom-[40px] left-[-40px] whitespace-nowrap invisible opacity-0 z-10 py-2 px-3 text-xs font-medium text-white bg-neutral1 rounded-lg shadow-sm  dark:bg-gray-700">
                      Move to Trash
                    </div>
                  </div>
                </div>
              </td>
              <td className="pr-1"></td>
            </tr>
          ))}
        </tbody>
      </>
    );
  };
  const trashTable = () => {
    {
      console.log(data, 'Data');
    }
    return data.length > 0 ? (
      <>
        <thead>
          <tr className="bg-gray-50 text-gray-500" style={{ height: '60px' }}>
            <th
              style={{ width: '400px' }}
              scope="col"
              className="pl-6 py-3 pr-2 text-left font-medium text-xs leading-4 font-medium tracking-wider">
              CLIENT
            </th>
            <th
              scope="col"
              className="flex-grow py-3 px-2 text-center font-medium text-xs leading-4 font-medium tracking-wider">
              MOVED IN TRASH
            </th>
            <th
              scope="col"
              className="flex-grow pl-2 pr-6 py-3  text-center font-medium text-xs leading-4 font-medium tracking-wider"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((person) => (
            <tr
              onClick={() =>
                router.push({
                  pathname: '/contacts/details',
                  query: { id: person?.id },
                })
              }
              key={person.id}
              className={'border-b border-gray-200 cursor-pointer hover:bg-lightBlue1 group'}
              style={{ height: '76px' }}>
              <td className=" pl-6 py-3 pr-2 " style={{ width: '400px' }}>
                <div className={'flex gap-4'}>
                  <div>
                    {person.profile_image_path ? (
                      <img
                        className="inline-block h-10 w-10 rounded-full"
                        src={person.profile_image_path}
                        alt={person.first_name}
                      />
                    ) : (
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">
                        <span className="text-sm font-medium leading-none text-white">
                          {getInitials(person.first_name + ' ' + person.last_name).toUpperCase()}
                        </span>
                      </span>
                    )}
                  </div>
                  <div>
                    <h6 className={'text-sm leading-5 font-medium text-gray-800 '}>
                      {person.first_name} {person.last_name}
                    </h6>
                    <h6 className={' text-sm leading-5 font-normal text-gray-500'}>{person.email}</h6>
                  </div>
                </div>
              </td>

              <td className=" px-3 py-2 text-gray-800 text-center text-sm leading-5 font-medium">
                {getDateFormat(person.updated_at || person.created_at)}
              </td>
              <td className="pl-3 pr-6 py-3 text-gray-500 text-center w-20">
                <div
                  onMouseEnter={() =>
                    document
                      .querySelector('#tooltip-restore-contact-' + person.id)
                      .classList.remove('invisible', 'opacity-0')
                  }
                  onMouseLeave={() =>
                    document
                      .querySelector('#tooltip-restore-contact-' + person.id)
                      .classList.add('invisible', 'opacity-0')
                  }
                  className={
                    'h-7 w-7 cursor-pointer relative rounded-full p-1.5 bg-gray1 hover:bg-gray2 mr-2 flex items-center justify-center'
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardEdit(person);
                  }}>
                  <RedoIcon className={'text-gray-500 h-4 w-4 ml-0'} />
                  <div
                    style={{ width: '126px' }}
                    id={'tooltip-restore-contact-' + person.id}
                    className="inline-block -right-4 top-[35px] z-50 absolute invisible opacity-0 z-10 py-2 px-3 text-xs font-medium text-white bg-neutral1 rounded-lg shadow-sm dark:bg-gray-700">
                    Restore Contact
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </>
    ) : (
      <div
        style={{ height: 'calc(100vh - 162px)' }}
        className={' flex flex-col text-center gap-2 items-center justify-center border-t border-t-gray-200'}>
        <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96" fill="none">
          <path
            d="M76.9349 12.7222C76.0856 11.1962 75.5652 10.3607 75.5652 10.3607C74.6657 8.78933 73.4658 9.09225 71.6108 9.25118L61.6499 10.4703C60.3996 10.5733 60.3996 10.5733 59.6653 9.65635C57.1841 6.49246 56.17 4.54392 54.443 4.97994L35.718 9.70739C33.9909 10.1434 34.0415 12.3352 33.3641 16.3159C33.1484 17.4533 33.1484 17.4533 32.0036 17.9744L22.6396 21.6341C20.9496 22.3702 19.7184 22.8551 19.6726 24.6652C19.6726 24.6652 19.6426 25.4656 19.5966 27.1983C19.561 29.5086 19.265 29.3319 21.2648 28.827L76.2398 14.9476C78.2441 14.4609 78.0811 14.7341 76.9349 12.7222Z"
            fill="#D1D5DB"
          />
          <path
            d="M71.1378 33H24.8629C21.7504 33 21.6004 33.4125 21.7879 35.7562L25.2941 81.2437C25.5941 83.55 25.8191 84.0188 28.5754 84.0188H67.4254C70.1816 84.0188 70.4066 83.55 70.7066 81.2437L74.2128 35.7562C74.4003 33.3937 74.2504 33 71.1378 33Z"
            fill="#D1D5DB"
          />
        </svg>
        <h5 className={'text-sm leading-5 font-medium text-gray-900'}>Trash is Empty</h5>
        <p className={'text-xs leading-4 font-normal text-gray-500'}>
          Contacts that you moved to trash will be listed here
        </p>
      </div>
    );
  };

  const needToContactTable = () => {
    return (
      <>
        <thead>
          <tr className="bg-gray-50 text-gray4" style={{ height: '60px' }}>
            <th
              style={{ width: '300px' }}
              scope="col"
              className="pl-6 py-3  text-left text-xs leading-4 font-medium tracking-wider">
              CONTACT
            </th>
            <th scope="col" className="flex-grow py-3  text-left  text-xs leading-4 font-medium tracking-wider">
              TYPE
            </th>
            <th scope="col" className="flex-grow py-3   text-left   text-xs leading-4 font-medium tracking-wider">
              CAMPAIGN
            </th>
            <th scope="col" className="flex-grow py-3   text-left   text-xs leading-4 font-medium tracking-wider">
              LAST COMMUNICATION
            </th>
            <th scope="col" className="flex-grow py-3 pr-6  text-left   text-xs leading-4 font-medium tracking-wider">
              ACTIONS
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((person) => (
            <tr
              key={person.id}
              onClick={() =>
                router.push({
                  pathname: '/contacts/details',
                  query: { id: person?.id },
                })
              }
              className={'border-b border-gray-200 cursor-pointer hover:bg-lightBlue1 group'}
              style={{ height: '84px' }}>
              <td className="pl-6 py-3" style={{ width: '300px' }}>
                <div className={'flex gap-4'}>
                  <div>
                    {person.profile_image_path ? (
                      <img
                        className="inline-block h-10 w-10 rounded-full"
                        src={person.profile_image_path}
                        alt={person.first_name}
                      />
                    ) : (
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">
                        <span className="text-sm font-medium leading-none text-white">
                          {getInitials(person.first_name + ' ' + person.last_name).toUpperCase()}
                        </span>
                      </span>
                    )}
                  </div>
                  <div>
                    <h6 className={'text-sm leading-5 font-medium text-gray-800 '}>
                      {person.first_name} {person.last_name}
                    </h6>
                    <h6 className={' text-sm leading-5 font-normal text-gray-500'}>{person.email}</h6>
                  </div>
                </div>
              </td>

              <td>
                <Chip label={person.category_2} typeStyle />
                <Chip
                  label={person.status_2}
                  statusStyle
                  className={getContactStatusColorByStatusId(person.category_id, person.status_id)}>
                  {getContactStatusByStatusId(person.category_id, person.status_id)}
                </Chip>
              </td>
              <td>
                <div className={'flex gap-1.5 items-center'}>
                  <div
                    className={`h-2 w-2 rounded-full ${
                      person.is_in_campaign === null ? 'bg-red5' : 'bg-green5'
                    }`}></div>
                  <p className={'text-sm leading-5 font-normal'}>
                    {person.is_in_campaign === null ? 'Unassigned' : 'Assigned'}
                  </p>
                </div>
              </td>
              <td>
                <DateChip
                  lastCommunication={person.last_communication_date}
                  contactStatus={person.status_2}
                  contactCategory={person.category_1 === 'Client' ? 'clients' : 'professionals'}
                />
              </td>
              <td>
                <TooltipComponent
                  side={'bottom'}
                  align={'center'}
                  triggerElement={
                    <div
                      className={'h-8 w-8 flex items-center justify-center bg-gray1 rounded-full hover:bg-gray2'}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardEdit(person);
                      }}>
                      <ListIcon className={'h-4 w-4 text-gray3 hover:text-gray-4'} />
                    </div>
                  }>
                  <p className={'text-xs leading-4 font-medium'}>Add Activity</p>
                </TooltipComponent>
              </td>
            </tr>
          ))}
        </tbody>
      </>
    );
  };
  return (
    <div className="h-full ">
      <div className="h-full flex flex-col">
        <div
          className={`h-full ${
            tableFor === 'categorized' || tableFor === 'in-categorization' ? 'overflow-x-hidden' : ' overflow-x-auto'
          }`}>
          <div className="h-full inline-block min-w-full align-middle">
            <div className="ring-black ring-opacity-5">
              <table className="min-w-full divide-y divide-gray-200">
                {tableFor == 'uncategorized' || tableFor == 'in-categorization'
                  ? uncategorizedTable()
                  : tableFor == 'contact-campaigns'
                  ? contactCampaignsTable()
                  : tableFor == 'professionals'
                  ? professionalsTable()
                  : tableFor == 'reports'
                  ? reportsTable()
                  : tableFor == 'imports-summary'
                  ? importsSummaryTable()
                  : tableFor === 'needToContact'
                  ? needToContactTable()
                  : tableFor === 'trash'
                  ? trashTable()
                  : tableFor == 'contactsList'
                  ? contactsListTable()
                  : tableFor == 'categorized'
                  ? categorizedTable()
                  : tableFor == 'other'
                  ? otherTable()
                  : tableFor == 'ai-summary'
                  ? aiSummaryTable()
                  : tableFor == 'needToContact'
                  ? needToContactTable()
                  : tableFor == 'import-google-contacts-successful' || tableFor == 'import-google-contacts-failed'
                  ? importGoogleContactsDetails()
                  : campaignsTable()}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
