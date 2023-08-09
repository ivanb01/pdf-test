import Input from '../input';
import {
  getContactStatusByStatusId,
  getContactTypeByTypeId,
  getContactStatusColorByStatusId,
  phoneNumberFormat,
  formatDateLL,
  findProfessionalSubtype,
} from 'global/functions';
import eyeIcon from '/public/images/eye.svg';
import Image from 'next/image';
import { useState } from 'react';
import EventStatus from 'components/event-status';
import { InformationCircleIcon } from '@heroicons/react/solid';
import Text from '../text';
import Button from '../button';
import Error from '@mui/icons-material/Error';
import ContactInfo from './contact-info';
import { useSelector } from 'react-redux';
import Launch from '@mui/icons-material/Launch';
import {
  clientStatuses,
  allStatusesQuickEdit,
  professionalsStatuses,
  vendorTypes,
  agentTypes,
  unspecifiedTypes,
} from 'global/variables';
import { useRouter } from 'next/router';
import {
  DotsVerticalIcon,
  TrashIcon,
  PencilIcon,
} from '@heroicons/react/outline';
import FilterDropdown from 'components/shared/dropdown/FilterDropdown';
import Edit from '@mui/icons-material/Edit';
import Category from '@mui/icons-material/Category';
import SimpleBarDropdown from 'components/shared/dropdown/simpleBarDropdown';
import Campaign from '@mui/icons-material/Campaign';
import Chip from '../chip';
import DateChip from '../chip/date-chip';
import {
  formatDateAgo,
  formatDateLThour,
  formatDateCalendar,
} from 'global/functions';
import undoIcon from '/public/images/undo.svg';
import { useDispatch } from 'react-redux';
import { setContacts, updateContactStatus } from 'store/contacts/slice';
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
              Clients
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
              Campaign
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
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
                <div className="text-gray7  font-medium">
                  {dataItem.campaign_name}
                </div>
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
                <div className="text-gray7 font-medium">
                  {formatDateCalendar(dataItem.event_scheduled_time)}
                </div>
                <div className="text-gray4">
                  {formatDateLThour(dataItem.event_scheduled_time)}
                </div>
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
      title =
        'You don’t have any contacts that you can assign to this campaign';
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

    const skeletonData = [
      { id: 0 },
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
    ];

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
                {skeletonData.map((data) => (
                  <th
                    key={data.id}
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
                <th
                  key={index}
                  scope="col"
                  className="px-3 py-3 text-center text-xs font-medium tracking-wide">
                  <div className="">
                    <div className="uppercase text-gray-500">
                      Event {index + 1}
                    </div>
                    <div
                      className="text-lightBlue3 cursor-pointer"
                      onClick={() => setCurrentEvent(index + 1)}>
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
        <tbody className=" bg-white">
          {!data?.length && searchTerm
            ? noResults()
            : !data?.length && !searchTerm
            ? noData()
            : data.map((dataItem) => (
                <tr
                  key={dataItem.contact_id}
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
                          dataItem.contact_campaign_status == 'unassigned'
                            ? 2
                            : dataItem.contact_campaign_status == 'assigned'
                            ? 1
                            : 0,
                      }}
                      // handleSelect={(e, dataItem) =>
                      //   handleSelectContact(e, dataItem)
                      // }
                      handleAction={(id, action) => handleAction(id, action)}
                    />
                  </td>
                  {dataItem?.events.map((event, index) =>
                    event.event_id ? (
                      <td
                        key={`event-${index}`}
                        className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">
                        <EventStatus status={event.event_status} />
                        <div className="text-gray7">
                          {formatDateMDY(event?.event_updated_at)}
                        </div>
                      </td>
                    ) : (
                      <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">
                        <div className="text-gray7">-</div>
                      </td>
                    ),
                  )}
                  {/* <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">
                <div className="text-gray7">
                  {formatDateMDY(event?.event_updated_at)}
                </div>
              </td> */}
                </tr>
              ))}
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
                  className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
                  added from
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
                  <td className="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">
                    <div className="text-gray7 font-medium min-w-[200px] flex items-center justify-center">
                      {dataItem.import_source == 'GmailAI' && (
                        <AIChip
                          className="mr-2"
                          reviewed={dataItem.approved_ai}
                        />
                      )}{' '}
                      {dataItem.import_source ? dataItem.import_source : '-'}
                    </div>
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
                    <Input
                      className="mr-1"
                      id="select_all"
                      type="checkbox"
                      onChange={handleSelectAll}
                    />
                  )}
                  Contact
                </th>
                {tableFor != 'in-categorization' && (
                  <th
                    scope="col"
                    className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
                    Added From
                  </th>
                )}
              </tr>
            </thead>
            <TransitionGroup component="tbody" className=" bg-white">
              {data.map((dataItem, index) => (
                <CSSTransition
                  key={dataItem.id}
                  timeout={500}
                  classNames="item">
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
                          onChange={(event) =>
                            handleClickRow(dataItem, event)
                          }></Input>
                      )}
                      <ContactInfo
                        data={{
                          name: dataItem.first_name + ' ' + dataItem.last_name,
                          email: dataItem.email,
                          image: dataItem.profile_image_path,
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
                      <td className="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">
                        <div className="text-gray7 font-medium min-w-[200px] flex items-center justify-center">
                          {dataItem.import_source == 'GmailAI' && (
                            <AIChip
                              className="mr-2"
                              reviewed={dataItem.approved_ai}
                            />
                          )}{' '}
                          {dataItem.import_source
                            ? dataItem.import_source
                            : '-'}
                        </div>
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
    console.log('dataitem', dataItem);
    return dataItem.status_id != null && dataItem.status_id !== 1;
  };
  const categorizedTable = () => {
    return (
      <>
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6">
              {data.length} Categorized Contacts
            </th>
            <th
              scope="col"
              className="py-3 pl-4 pr-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6">
              {/* <Button white onClick={() => undoAllCategorizations()}> */}
              {/* Undo All */}
              {/* </Button> */}
              <div className="relative flex justify-center">
                <a
                  className="cursor-pointer text-xs"
                  onClick={() => undoAllCategorizations()}
                  onMouseEnter={() =>
                    document
                      .querySelector('#tooltip-undo-all')
                      .classList.remove('invisible', 'opacity-0')
                  }
                  onMouseLeave={() =>
                    document
                      .querySelector('#tooltip-undo-all')
                      .classList.add('invisible', 'opacity-0')
                  }>
                  {/* <Image src={undoIcon} className="w-5"></Image> */}
                  <svg
                    version="1.1"
                    viewBox="0 0 16 20"
                    width="15px"
                    xmlns="http://www.w3.org/2000/svg">
                    <g
                      fill="none"
                      fillRule="evenodd"
                      id="Page-1"
                      stroke="none"
                      strokeWidth="1">
                      <g
                        fill="#6B7280"
                        id="Core"
                        transform="translate(-424.000000, -463.000000)">
                        <g
                          id="undo"
                          transform="translate(424.000000, 464.000000)">
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
            <CSSTransition
              key={dataItem.id}
              timeout={500}
              classNames="item-reverse">
              <tr
                key={dataItem.email}
                id={'row_' + index}
                className={`contact-row border-b border-gray-200`}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                  <ContactInfo
                    data={{
                      name: dataItem.first_name + ' ' + dataItem.last_name,
                      email: dataItem.email,
                      image: dataItem.profile_image_path,
                    }}
                  />
                  {(dataItem.category_id != null ||
                    dataItem.status_id != null) && (
                    <div className="flex items-center mt-3 type-and-status">
                      {console.log(dataItem)}
                      {dataItem.category_id != null && (
                        <Chip typeStyle>
                          {getContactTypeByTypeId(dataItem.category_id)}
                        </Chip>
                      )}
                      {showStatus(dataItem) && (
                        <Chip
                          statusStyle
                          className={getContactStatusColorByStatusId(
                            dataItem.category_id,
                            dataItem.status_id,
                          )}>
                          {getContactStatusByStatusId(
                            dataItem.category_id,
                            dataItem.status_id,
                          )}
                        </Chip>
                      )}
                    </div>
                  )}
                </td>
                <td className="relative whitespace-nowrap h-[72.5px] px-3 py-4 sm:pr-6 flex justify-end items-center">
                  <div className="relative">
                    <a
                      className="cursor-pointer text-xs"
                      onClick={() => undoCategorization(dataItem.id)}
                      onMouseEnter={() =>
                        document
                          .querySelector(
                            '#tooltip-undo-categorization-' + dataItem.id,
                          )
                          .classList.remove('invisible', 'opacity-0')
                      }
                      onMouseLeave={() =>
                        document
                          .querySelector(
                            '#tooltip-undo-categorization-' + dataItem.id,
                          )
                          .classList.add('invisible', 'opacity-0')
                      }>
                      {/* <Image src={undoIcon} className="w-5"></Image> */}
                      <svg
                        version="1.1"
                        viewBox="0 0 16 20"
                        width="15px"
                        xmlns="http://www.w3.org/2000/svg">
                        <g
                          fill="none"
                          fillRule="evenodd"
                          id="Page-1"
                          stroke="none"
                          strokeWidth="1">
                          <g
                            fill="#6B7280"
                            id="Core"
                            transform="translate(-424.000000, -463.000000)">
                            <g
                              id="undo"
                              transform="translate(424.000000, 464.000000)">
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
              <Input
                type="checkbox"
                onChange={(event) => console.log(event)}></Input>
              File Name
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
              <div className="flex items-center justify-center">
                NEW RECORDS
                <InformationCircleIcon height={15} className="ml-3" />
              </div>
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
              <div className="flex items-center justify-center">
                UPDATED RECORDS
                <InformationCircleIcon height={15} className="ml-3" />
              </div>
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
              <div className="flex items-center justify-center">
                ERROR RECORDS
                <InformationCircleIcon height={15} className="ml-3" />
              </div>
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
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
                <div className="text-gray7 font-medium">
                  {data.updatedRecords}
                </div>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">
                <div className="text-gray7 font-medium">{data.errorCount}</div>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">
                <div className="text-gray7 font-medium">
                  {data.uploadedDate}
                </div>
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
    const contacts = useSelector((state) => state.contacts.data.data);
    let contactsStatuses =
      openedTab == 0 ? clientStatuses : professionalsStatuses;

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
        if (
          contact?.is_in_campaign === 'assigned' &&
          contact?.status_id !== status
        ) {
          setStatusIdToUpdate(status);
          setChangeStatusModal(true);
          setContactToModify(contact);
        } else {
          await changeStatus(status, contact);
          console.log('change status');
        }
      } catch (error) {
        console.log(error);
      }
    };

    const handleChangeStatusAndCampaign = async () => {
      try {
        await unassignContactFromCampaign(
          contactToModify.campaign_id,
          contactToModify.id,
        );
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
        const categoryStatuses =
          categoryType === 'clients' ? clientStatuses : professionalsStatuses;

        const foundStatus = categoryStatuses.find(
          (status) =>
            status.statuses.findIndex((s) => s.id === statusId) !== -1,
        );
        const statusMainTitle = foundStatus
          ? foundStatus.statusMainTitle
          : null;
        console.log('tesr', foundStatus);
        let statusName = foundStatus.statuses.find(
          (foundstatus) => foundstatus.id == status,
        ).name;

        dispatch(
          updateContactStatus({
            id: contact.id,
            status_id: status,
            status_2: statusName,
          }),
        );
        toast.success(
          `${
            contact.first_name + ' ' + contact.last_name
          } moved to ${statusName}`,
        );

        const res = await contactServices.updateContact(contact.id, {
          status_id: status,
        });
        // change status locally
        console.log('changeStatus', contact, contact.id, status, res);
        // setDropdownOpened(false);
        const { data } = await contactServices.getContacts(
          categoryIds[contact?.category_1],
        );
        dispatch(setContacts(data));
      } catch (error) {
        console.log(error);
      }
    };

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
            <th
              scope="col"
              className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
              Type
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
              Source
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
              PHONE
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
              LAST COMMUNICATION
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
              ACTIONS
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {contactsStatuses[openedSubtab].statuses.map((category, index) =>
            contacts.filter(
              (contact) =>
                contact.status_2.toLowerCase() == category.name.toLowerCase() ||
                contact.category_2.toLowerCase() == category.name.toLowerCase(),
            ).length ? (
              <>
                <tr
                  key={category.id}
                  className={`${category.color} contact-row border-b border-gray-200`}>
                  <td colSpan="10">
                    <div className="flex items-center px-6 py-2">
                      <Text chipText className="text-gray4">
                        {category.name}
                      </Text>
                    </div>
                  </td>
                </tr>
                {contacts
                  .filter(
                    (contact) =>
                      contact.status_2.toLowerCase() ==
                      category.name.toLowerCase(),
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
                            approved_ai: contact.approved_ai,
                          }}
                        />
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">
                        <div className="text-gray7 font-medium bg-gray1 text-[10px] uppercase rounded min-w-[50px] h-6 flex items-center justify-center">
                          {contact.category_2}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">
                        <div className="text-gray7 font-medium min-w-[200px] flex items-center justify-center">
                          {contact.import_source == 'GmailAI' && (
                            <AIChip
                              className="mr-2"
                              reviewed={contact.approved_ai}
                            />
                          )}{' '}
                          {contact.import_source ? contact.import_source : '-'}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">
                        <div className="text-gray7 font-medium min-w-[200px]">
                          {phoneNumberFormat(contact.phone_number) !== 'N/A'
                            ? phoneNumberFormat(contact.phone_number)
                            : '-'}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">
                        <div className="text-gray7 font-medium">
                          <DateChip
                            lastCommunication={contact.last_communication_date}
                            contactStatus={contact.status_2}
                            contactCategory={categoryType}
                          />

                          {/* <Chip
                            lastCommunication={formatDateAgo(
                              contact?.last_communication_date
                            )}                         
                          /> */}
                        </div>
                        {/* <div className="text-gray4">{contact.uploadedTime}</div> */}
                      </td>
                      <td>
                        <div className="px-4 py-[10px] flex items-center justify-center">
                          <div
                            className="cursor-pointer relative rounded-full p-1.5 bg-gray1 hover:bg-gray2 mr-2 flex items-center justify-center"
                            onMouseEnter={() => {
                              document
                                .querySelector(
                                  '#tooltip-edit-contact-' + contact.id,
                                )
                                .classList.remove('invisible', 'opacity-0');
                              document
                                .querySelector(
                                  '#edit-contact-icon-' + contact.id,
                                )
                                .classList.add('text-gray4');
                              document
                                .querySelector(
                                  '#edit-contact-icon-' + contact.id,
                                )
                                .classList.remove('text-gray3');
                            }}
                            onMouseLeave={() => {
                              document
                                .querySelector(
                                  '#tooltip-edit-contact-' + contact.id,
                                )
                                .classList.add('invisible', 'opacity-0');
                              document
                                .querySelector(
                                  '#edit-contact-icon-' + contact.id,
                                )
                                .classList.add('text-gray3');
                              document
                                .querySelector(
                                  '#edit-contact-icon-' + contact.id,
                                )
                                .classList.remove('text-gray4');
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCardEdit(contact);
                            }}>
                            <Edit
                              id={'edit-contact-icon-' + contact.id}
                              className="text-gray3 w-4 h-4"
                            />
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
                                .querySelector(
                                  '#tooltip-add-activity-' + contact.id,
                                )
                                .classList.remove('invisible', 'opacity-0');
                              document
                                .querySelector(
                                  '#add-activity-icon-' + contact.id,
                                )
                                .classList.add('text-gray4');
                              document
                                .querySelector(
                                  '#add-activity-icon-' + contact.id,
                                )
                                .classList.remove('text-gray3');
                            }}
                            onMouseLeave={() => {
                              document
                                .querySelector(
                                  '#tooltip-add-activity-' + contact.id,
                                )
                                .classList.add('invisible', 'opacity-0');
                              document
                                .querySelector(
                                  '#add-activity-icon-' + contact.id,
                                )
                                .classList.add('text-gray3');
                              document
                                .querySelector(
                                  '#add-activity-icon-' + contact.id,
                                )
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
                            <List
                              id={'add-activity-icon-' + contact.id}
                              className="text-gray3 w-4 h-4"
                            />
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
                                .querySelector(
                                  '#tooltip-change-status-' + contact.id,
                                )
                                .classList.remove('invisible', 'opacity-0');
                              document
                                .querySelector(
                                  '#change-status-icon-' + contact.id,
                                )
                                .classList.add('text-gray4');
                              document
                                .querySelector(
                                  '#change-status-icon-' + contact.id,
                                )
                                .classList.remove('text-gray3');
                            }}
                            onMouseLeave={() => {
                              document
                                .querySelector(
                                  '#tooltip-change-status-' + contact.id,
                                )
                                .classList.add('invisible', 'opacity-0');
                              document
                                .querySelector(
                                  '#change-status-icon-' + contact.id,
                                )
                                .classList.add('text-gray3');
                              document
                                .querySelector(
                                  '#change-status-icon-' + contact.id,
                                )
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
                                <Category
                                  id={'change-status-icon-' + contact.id}
                                  className="text-gray3 w-4 h-4"
                                />
                              }
                              dropdownValue={contact?.status_2}
                              handleDropdownClosed={(item) =>
                                console.log(item)
                              }></SimpleBarDropdown>
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
                  ))}
              </>
            ) : (
              <></>
            ),
          )}
        </tbody>
        {addActivityPopup && (
          <AddActivity
            client={contactToModify}
            className="min-w-[550px]"
            title={`Add Activity`}
            setAddActivityPopup={setAddActivityPopup}
            handleClose={() => setAddActivityPopup(false)}
          />
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
    const contactsOriginal = useSelector((state) => state.contacts.data.data);
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
      if (openedSubtab === 0) {
        setContacts(
          contactsOriginal.filter((contact) => contact.category_id !== 12),
        );
      } else if (openedSubtab === 1) {
        setContacts(
          contactsOriginal.filter((contact) => contact.category_id === 12),
        );
      } else if (openedSubtab === 2) {
        setContacts(
          contactsOriginal.filter((contact) => contact.category_id === 9),
        );
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

    let professionalTypes =
      openedSubtab == 0
        ? vendorTypes
        : openedSubtab == 1
        ? agentTypes
        : unspecifiedTypes;

    // const handleChangeStatus = async (status, contact) => {
    //   try {
    //     if (
    //       contact?.is_in_campaign === 'assigned' &&
    //       contact?.status_id !== status
    //     ) {
    //       setStatusIdToUpdate(status);
    //       setChangeStatusModal(true);
    //       setContactToModify(contact);
    //     } else {
    //       await changeStatus(status, contact);
    //       console.log('change status');
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };

    // const handleChangeStatusAndCampaign = async () => {
    //   try {
    //     await unassignContactFromCampaign(
    //       contactToModify.campaign_id,
    //       contactToModify.id
    //     );
    //     await changeStatus(statusIdToUpdate, contactToModify);
    //     console.log('unassin then change status');

    //     setChangeStatusModal(false);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };

    // const changeStatus = async (status, contact) => {
    //   try {
    //     const statusId = status; // example status id to search for
    //     const categoryStatuses =
    //       categoryType === 'clients' ? clientStatuses : professionalsStatuses;

    //     const foundStatus = categoryStatuses.find(
    //       (status) => status.statuses.findIndex((s) => s.id === statusId) !== -1
    //     );
    //     const statusMainTitle = foundStatus
    //       ? foundStatus.statusMainTitle
    //       : null;
    //     console.log('tesr', foundStatus);
    //     let statusName = foundStatus.statuses.find(
    //       (foundstatus) => foundstatus.id == status
    //     ).name;

    //     dispatch(
    //       updateContactStatus({
    //         id: contact.id,
    //         status_id: status,
    //         status_2: statusName,
    //       })
    //     );
    //     toast.success(
    //       `${
    //         contact.first_name + ' ' + contact.last_name
    //       } moved to ${statusName}`
    //     );

    //     const res = await contactServices.updateContact(contact.id, {
    //       status_id: status,
    //     });
    //     // change status locally
    //     console.log('changeStatus', contact, contact.id, status, res);
    //     // setDropdownOpened(false);
    //     const { data } = await contactServices.getContacts(
    //       categoryIds[contact?.category_1]
    //     );
    //     dispatch(setContacts(data));
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };

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
            <th
              scope="col"
              className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
              added from
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
              PHONE
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
              LAST COMMUNICATION
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
              ACTIONS
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {professionalTypes.map((type, index) =>
            contacts.filter((contact) => contact.category_id == type.id)
              .length ? (
              <>
                <tr
                  key={type.id}
                  className={`contact-row border-b border-gray-200`}>
                  <td colSpan="10">
                    <div className="flex items-center px-6 py-2">
                      <Text chipText className="text-gray4">
                        {type.name}
                      </Text>
                    </div>
                  </td>
                </tr>
                {contacts
                  .filter((contact) => contact.category_id == type.id)
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
                      <td className="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">
                        <div className="text-gray7 font-medium min-w-[200px] flex items-center justify-center">
                          {contact.import_source == 'GmailAI' && (
                            <AIChip
                              className="mr-2"
                              reviewed={contact.approved_ai}
                            />
                          )}{' '}
                          {contact.import_source ? contact.import_source : '-'}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">
                        <div className="text-gray7 font-medium min-w-[200px]">
                          {phoneNumberFormat(contact.phone_number)}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">
                        <div className="text-gray7 font-medium">
                          <DateChip
                            lastCommunication={contact.last_communication_date}
                            contactStatus={contact.status_2}
                            contactCategory={categoryType}
                          />

                          {/* <Chip
                            lastCommunication={formatDateAgo(
                              contact?.last_communication_date
                            )}                         
                          /> */}
                        </div>
                        {/* <div className="text-gray4">{contact.uploadedTime}</div> */}
                      </td>
                      <td>
                        <div className="px-4 py-[10px] flex items-center justify-center">
                          <div
                            className="cursor-pointer relative rounded-full p-1.5 bg-gray1 hover:bg-gray2 mr-2 flex items-center justify-center"
                            onMouseEnter={() => {
                              document
                                .querySelector(
                                  '#tooltip-edit-contact-' + contact.id,
                                )
                                .classList.remove('invisible', 'opacity-0');
                              document
                                .querySelector(
                                  '#edit-contact-icon-' + contact.id,
                                )
                                .classList.add('text-gray4');
                              document
                                .querySelector(
                                  '#edit-contact-icon-' + contact.id,
                                )
                                .classList.remove('text-gray3');
                            }}
                            onMouseLeave={() => {
                              document
                                .querySelector(
                                  '#tooltip-edit-contact-' + contact.id,
                                )
                                .classList.add('invisible', 'opacity-0');
                              document
                                .querySelector(
                                  '#edit-contact-icon-' + contact.id,
                                )
                                .classList.add('text-gray3');
                              document
                                .querySelector(
                                  '#edit-contact-icon-' + contact.id,
                                )
                                .classList.remove('text-gray4');
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCardEdit(contact);
                            }}>
                            <Edit
                              id={'edit-contact-icon-' + contact.id}
                              className="text-gray3 w-4 h-4"
                            />
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
                                .querySelector(
                                  '#tooltip-add-activity-' + contact.id,
                                )
                                .classList.remove('invisible', 'opacity-0');
                              document
                                .querySelector(
                                  '#add-activity-icon-' + contact.id,
                                )
                                .classList.add('text-gray4');
                              document
                                .querySelector(
                                  '#add-activity-icon-' + contact.id,
                                )
                                .classList.remove('text-gray3');
                            }}
                            onMouseLeave={() => {
                              document
                                .querySelector(
                                  '#tooltip-add-activity-' + contact.id,
                                )
                                .classList.add('invisible', 'opacity-0');
                              document
                                .querySelector(
                                  '#add-activity-icon-' + contact.id,
                                )
                                .classList.add('text-gray3');
                              document
                                .querySelector(
                                  '#add-activity-icon-' + contact.id,
                                )
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
                            <List
                              id={'add-activity-icon-' + contact.id}
                              className="text-gray3 w-4 h-4"
                            />
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
        {addActivityPopup && (
          <AddActivity
            client={contactToModify}
            className="min-w-[550px]"
            title={`Add Activity`}
            setAddActivityPopup={setAddActivityPopup}
            handleClose={() => setAddActivityPopup(false)}
          />
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
                        <div className="font-medium text-gray7">
                          {dataItem.details}
                        </div>
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
                        <div className="text-gray7 font-medium">
                          {dataItem.reason || 'Contact exists in the system'}
                        </div>
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
            <th
              scope="col"
              className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
              # of clients
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
              In the funnel
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
              Client health
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
              closed clients
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
              conversion
            </th>
            {/* <th
              scope="col"
              className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500"
            >
              Time spent in the crm
            </th> */}
            <th
              scope="col"
              className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
              last interaction
            </th>
          </tr>
        </thead>
        <tbody className=" bg-white">
          {data.map((dataItem, index) => (
            <tr
              key={dataItem.index}
              className="hover:bg-lightBlue1 cursor-pointer contact-row group bg-white group border-b border-gray-200"
              // onClick={(event) => handleClickRow(contact, event)}
            >
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 w-96">
                <ContactInfo
                  data={{
                    // name: `${dataItem.first_name + ' ' + dataItem.last_name}`,
                    name: `${getEmailParts(dataItem.agent_id).firstName} ${
                      getEmailParts(dataItem.agent_id).lastName
                    }`,
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
                <div className="text-gray7 font-medium">
                  {dataItem.total_clients}
                </div>
                <div className="text-gray4 italic">
                  {dataItem.clients_in_funnel} in the funnel
                </div>
              </td>
              <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">
                <div className="text-gray7 font-medium">
                  {dataItem.clients_in_funnel}
                </div>
                <div className="text-gray4 italic">
                  {dataItem.clients_in_funnel_new_lead} new leads
                </div>
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
                    className={`h-4 ml-1 ${
                      dataItem.clients_closed == 0
                        ? 'text-gray3'
                        : 'text-green5'
                    }`}
                  />
                </div>
              </td>
              <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">
                <div className="text-gray7 font-medium">
                  {calculateClosedClients(
                    dataItem.clients_closed,
                    dataItem.total_clients,
                  )}
                  %
                </div>
              </td>
              <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">
                {dataItem.last_interaction ? (
                  <>
                    <div className="text-gray7">
                      {formatDateLL(dataItem.last_interaction)}
                    </div>
                    <div className="text-gray4">
                      {formatDateLThour(dataItem.last_interaction)}
                    </div>
                  </>
                ) : (
                  <div className="text-red-500">No communication</div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </>
    );
  };

  const aiSummaryTable = () => {
    const getSubtype = (item) => {
      if (item.category_1 == 'Professional') {
        return [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26].includes(
          item.category_id,
        )
          ? ' - ' + findProfessionalSubtype(item.category_id)
          : ' - ' + item.category_2;
      } else {
        return;
      }
    };
    return (
      <>
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="h-[56px] py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6 flex items-center ">
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
              className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
              Email Summary
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
              Type
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
              Status
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
              Source
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
              Delete/correct
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500"></th>
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
              <td className="whitespace-nowrap py-4 pr-3 text-sm pl-6 flex items-center">
                <input
                  type="checkbox"
                  className="mr-4 h-4 w-4 rounded border-gray-300 text-lightBlue3 focus:ring-lightBlue3"
                  value={dataItem.email}
                  checked={selectedPeople.includes(dataItem)}
                  onChange={(e) =>
                    setSelectedPeople(
                      e.target.checked
                        ? [...selectedPeople, dataItem]
                        : selectedPeople.filter((p) => p !== dataItem),
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
              <td className=" text-center px-3 py-4 text-sm text-gray-500 type-and-status">
                <div className=" flex items-center">
                  {dataItem.ai_email_summary ? (
                    <div className="email-summary-styling">
                      {dataItem.ai_email_summary}
                    </div>
                  ) : (
                    '-'
                  )}
                  {dataItem.ai_email_summary && (
                    <a
                      href={dataItem.email_link}
                      onClick={(e) => e.stopPropagation()}
                      target="_blank">
                      <Launch className="h-5 w-5 text-blue-500 ml-2" />
                    </a>
                  )}
                </div>
              </td>
              <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500 type-and-status">
                <Chip typeStyle>
                  {dataItem.category_id == 3 ? 'Trash' : dataItem.category_1}
                  {getSubtype(dataItem)}
                </Chip>
              </td>
              <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">
                <Chip
                  statusStyle
                  className={getContactStatusColorByStatusId(
                    dataItem.category_id,
                    dataItem.status_id,
                  )}>
                  {getContactStatusByStatusId(
                    dataItem.category_id,
                    dataItem.status_id,
                  )}
                </Chip>
              </td>
              <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">
                {dataItem.import_source}
              </td>
              <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">
                <div className="flex items-center justify-center">
                  <div
                    onMouseEnter={() => {
                      document
                        .querySelector(`#tooltip-delete-${dataItem.id}-1`)
                        .classList.remove('invisible', 'opacity-0');
                    }}
                    onMouseLeave={() =>
                      document
                        .querySelector(`#tooltip-delete-${dataItem.id}-1`)
                        .classList.add('invisible', 'opacity-0')
                    }
                    className="transition-all rounded-[4px] cursor-pointer hover:bg-red-500 hover:text-white bg-red-50 text-red-500 w-7 h-7 flex items-center justify-center mr-6 relative">
                    <Delete
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAction('delete', dataItem.id);
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
                  <div
                    onMouseEnter={() => {
                      document
                        .querySelector(`#tooltip-delete-${dataItem.id}-2`)
                        .classList.remove('invisible', 'opacity-0');
                    }}
                    onMouseLeave={() =>
                      document
                        .querySelector(`#tooltip-delete-${dataItem.id}-2`)
                        .classList.add('invisible', 'opacity-0')
                    }
                    className="transition-all rounded-[4px] cursor-pointer hover:bg-green-500 hover:text-white bg-green-50 text-green-500 w-7 h-7 flex items-center justify-center relative">
                    <CheckCircle
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAction('approve', dataItem.id);
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
                </div>
              </td>
              <td className="pr-6">
                <div
                  className="px-2 h-6 w-6 cursor-pointer rounded-full bg-gray1 hover:bg-gray2 flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation();

                    handleCardEdit(dataItem);
                  }}>
                  <Edit
                    id={'edit-contact-icon-' + dataItem.id}
                    className="text-gray3 w-4 h-4"
                  />
                </div>
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
        <div className="h-full  overflow-x-auto">
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
                  : tableFor == 'contactsList'
                  ? contactsListTable()
                  : tableFor == 'categorized'
                  ? categorizedTable()
                  : tableFor == 'other'
                  ? otherTable()
                  : tableFor == 'ai-summary'
                  ? aiSummaryTable()
                  : tableFor == 'import-google-contacts-successful' ||
                    tableFor == 'import-google-contacts-failed'
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

//if any table was broken after classname 'h-full' was adden we need to set 'h-full' just for 'contactList' table
{
  /* <div className={`${tableFor == 'contactsList' ? 'h-full' : ''}`}>
<div className={`${tableFor == 'contactsList' ? 'h-full' : ''} flex flex-col`} >
  <div className={`${tableFor == 'contactsList' ? 'h-full' : ''} overflow-x-auto`} >
    <div className={`${tableFor == 'contactsList' ? 'h-full' : ''} inline-block min-w-full align-middle`}>
      <div className={`${tableFor == 'contactsList' ? 'h-full' : 'overflow-hidden'} ring-black ring-opacity-5`}> */
}
