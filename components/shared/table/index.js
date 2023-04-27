import Input from '../input';
import {
  getContactStatusByStatusId,
  getContactTypeByTypeId,
  getContactStatusColorByStatusId,
  phoneNumberFormat,
} from 'global/functions';
import eyeIcon from 'public/images/eye.svg';
import Image from 'next/image';
import { useState } from 'react';
import EventStatus from 'components/event-status';
import { InformationCircleIcon } from '@heroicons/react/solid';
import Text from '../text';
import Button from '../button';
import Error from '@mui/icons-material/Error';
import ContactInfo from './contact-info';
import { useSelector } from 'react-redux';
import {
  clientStatuses,
  allStatusesQuickEdit,
  professionalsStatuses,
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
import undoIcon from 'public/images/undo.svg';
import { useDispatch } from 'react-redux';
import { setContacts, updateContactStatus } from 'store/contacts/slice';
import toast from 'react-hot-toast';
import * as contactServices from 'api/contacts';
import noClientCampaigns from 'public/images/no-client-campaigns.svg';

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
  const campaignsTable = () => {
    const [hovered, setHovered] = useState(false);

    return (
      <>
        <thead className="bg-gray-50 overflow-x-hidden">
          <tr>
            <th
              scope="col"
              className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6 flex items-center"
            >
              {/* <Input type="checkbox" onChange={() => handleSelectAll}></Input> */}
              Clients
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
            >
              Campaign
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
            >
              To Be Sent On
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {data.map((dataItem) => (
            <tr
              key={dataItem.event_id}
              className="hover:bg-lightBlue1 cursor-pointer contact-row border-b border-gray-200"
              onClick={(event) => handleClickRow(dataItem, event)}
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
                <div className="text-lightBlue3 cursor-pointer hover:underline">
                  <Image src={eyeIcon} />
                  <span className="ml-1">{dataItem.event_name}</span>
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
      contactStatus = 'assigned';
      description = `Clients that are part of this campaign will be listed here`;
    } else if (currentButton === 1) {
      contactStatus = 'unassigned';
      description = `Clients that are not part of this campaign, but can be assigned will be listed here`;
    } else {
      contactStatus = 'canceled';
      description = `Clients that were once part of this campaign, and cannot be reassigned will be listed here`;
    }
    title = `You don’t have any ${contactStatus} clients here`;

    if (!data.length)
      return (
        <div className="flex flex-col items-center justify-center h-[490px] max-w-[350px] mx-auto my-0">
          <Image src={noClientCampaigns}></Image>
          <Text h3 className="text-gray7 mb-2 mt-4 text-center">
            {title}
          </Text>
          <Text p className="text-gray4 relative text-center mb-6">
            {description}
          </Text>
        </div>
      );
    return (
      <>
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6 flex items-center border-r border-gray-200"
            >
              {/* <Input type="checkbox" onChange={() => handleSelectAll}></Input> */}
              Seller
            </th>
            {data[0]?.events.map((event, index) => (
              <th
                scope="col"
                className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500"
              >
                Event Name {index + 1}
              </th>
            ))}
            <th
              scope="col"
              className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500"
            >
              Assigned On
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {data.map((dataItem) => (
            <tr
              key={dataItem.contact_id}
              className="hover:bg-lightBlue1 cursor-pointer contact-row group bg-white group"
              // onClick={(event) => handleClickRow(contact, event)}
            >
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 border-r border-gray-200 w-96">
                <ContactInfo
                  data={{
                    name: `${dataItem.contact_name}`,
                    id: dataItem.contact_id,
                    email: dataItem.contact_email,
                    image: dataItem.profile_image_path,
                    assigned:
                      dataItem.contact_campaign_status == 'assigned' ? 1 : 0,
                  }}
                  // handleSelect={(e, dataItem) =>
                  //   handleSelectContact(e, dataItem)
                  // }
                  handleAction={(id, action) => handleAction(id, action)}
                />
              </td>
              {dataItem.events.map((event, index) =>
                event.event_id ? (
                  <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">
                    <EventStatus status={event.event_status} />
                    <div className="text-gray7">22/02/2022</div>
                  </td>
                ) : (
                  <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">
                    <div className="text-gray7">-</div>
                  </td>
                )
              )}
              <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">
                <div className="text-gray7">22/02/2022</div>
              </td>
            </tr>
          ))}
        </tbody>
      </>
    );
  };
  const otherTable = () => {
    return (
      <>
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6 flex items-center"
            >
              Contact
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
            >
              Added From
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {data.map((dataItem, index) => (
            <tr
              key={dataItem.id}
              className={`hover:bg-lightBlue1 cursor-pointer contact-row`}
            >
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 flex items-center">
                <ContactInfo
                  data={{
                    name: dataItem.first_name + ' ' + dataItem.last_name,
                    email: dataItem.email,
                    image: dataItem.profile_image_path,
                  }}
                />
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                <div className="text-gray7 font-medium">
                  {dataItem.addedFrom}
                </div>
                <div className="text-gray-500 font-medium">
                  {dataItem.addedDate}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </>
    );
  };
  const uncategorizedTable = () => {
    return (
      <>
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6 flex items-center"
            >
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
                className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
              >
                Added From
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {data.map((dataItem, index) => (
            <tr
              key={dataItem.id}
              id={'row_' + index}
              className={`hover:bg-lightBlue1 cursor-pointer contact-row`}
              onClick={(event) => {
                if (tableFor == 'in-categorization') {
                  if (event.target.id != 'input_' + index) {
                    document.querySelector('#input_' + index).click();
                  }
                } else if (tableFor == 'uncategorized') {
                  handleClickRow(event.target);
                }
              }}
            >
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 flex items-center">
                {tableFor == 'in-categorization' && (
                  <Input
                    className="mr-1"
                    type="checkbox"
                    id={'input_' + index}
                    onChange={(event) => handleClickRow(dataItem, event)}
                  ></Input>
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
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <div className="text-gray7 font-medium">
                    {dataItem.addedFrom}
                  </div>
                  <div className="text-gray-500 font-medium">
                    {dataItem.addedDate}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
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
              className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6"
            >
              {data.length} Categorized Contacts
            </th>
            <th
              scope="col"
              className="py-3 pl-4 pr-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6"
            >
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
                  }
                >
                  {/* <Image src={undoIcon} className="w-5"></Image> */}
                  <svg
                    version="1.1"
                    viewBox="0 0 16 20"
                    width="15px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g
                      fill="none"
                      fillRule="evenodd"
                      id="Page-1"
                      stroke="none"
                      strokeWidth="1"
                    >
                      <g
                        fill="#6B7280"
                        id="Core"
                        transform="translate(-424.000000, -463.000000)"
                      >
                        <g
                          id="undo"
                          transform="translate(424.000000, 464.000000)"
                        >
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
                  className="inline-block capitalize -right-3 top-[30px] h-fit absolute invisible opacity-0 z-10 py-2 px-3 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-sm dark:bg-gray-700"
                >
                  Undo All
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {data.map((dataItem, index) => (
            <tr
              key={dataItem.email}
              id={'row_' + index}
              className={`contact-row`}
            >
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
                          dataItem.status_id
                        )}
                      >
                        {getContactStatusByStatusId(
                          dataItem.category_id,
                          dataItem.status_id
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
                          '#tooltip-undo-categorization-' + dataItem.id
                        )
                        .classList.remove('invisible', 'opacity-0')
                    }
                    onMouseLeave={() =>
                      document
                        .querySelector(
                          '#tooltip-undo-categorization-' + dataItem.id
                        )
                        .classList.add('invisible', 'opacity-0')
                    }
                  >
                    {/* <Image src={undoIcon} className="w-5"></Image> */}
                    <svg
                      version="1.1"
                      viewBox="0 0 16 20"
                      width="15px"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g
                        fill="none"
                        fillRule="evenodd"
                        id="Page-1"
                        stroke="none"
                        strokeWidth="1"
                      >
                        <g
                          fill="#6B7280"
                          id="Core"
                          transform="translate(-424.000000, -463.000000)"
                        >
                          <g
                            id="undo"
                            transform="translate(424.000000, 464.000000)"
                          >
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
                    className="inline-block -right-4 top-[30px] h-fit absolute invisible opacity-0 z-10 py-2 px-3 text-xs font-medium text-white bg-neutral1 rounded-lg shadow-sm dark:bg-gray-700"
                  >
                    Undo Categorization
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
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
              className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6 flex items-center"
            >
              <Input
                type="checkbox"
                onChange={(event) => console.log(event)}
              ></Input>
              File Name
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500"
            >
              <div className="flex items-center justify-center">
                NEW RECORDS
                <InformationCircleIcon height={15} className="ml-3" />
              </div>
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500"
            >
              <div className="flex items-center justify-center">
                UPDATED RECORDS
                <InformationCircleIcon height={15} className="ml-3" />
              </div>
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500"
            >
              <div className="flex items-center justify-center">
                ERROR RECORDS
                <InformationCircleIcon height={15} className="ml-3" />
              </div>
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500"
            >
              UPLOADED DATE
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {data.map((data) => (
            <tr
              key={data.id}
              className="hover:bg-lightBlue1 cursor-pointer contact-row"
              onClick={(event) => handleClickRow(data, event)}
            >
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 pl-6">
                <div className="flex items-center">
                  <Input
                    type="checkbox"
                    onChange={(event) => handleSelectContact(event, contact)}
                    className="mr-1"
                  ></Input>
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
    const changeStatus = async (contact, status) => {
      const statusId = status; // example status id to search for
      const categoryStatuses =
        categoryType === 'clients' ? clientStatuses : professionalsStatuses;
      const foundStatus = categoryStatuses.find(
        (status) => status.statuses.findIndex((s) => s.id === statusId) !== -1
      );
      const statusMainTitle = foundStatus ? foundStatus.statusMainTitle : null;
      console.log(foundStatus);
      let statusName = foundStatus.statuses.find(
        (foundstatus) => foundstatus.id == status
      ).name;

      dispatch(
        updateContactStatus({
          id: contact.id,
          status_id: status,
          status_2: statusMainTitle,
        })
      );
      toast.success(
        `${contact.first_name + ' ' + contact.last_name} moved to ${statusName}`
      );

      try {
        const res = await contactServices.updateContact(contact.id, {
          status_id: status,
        });
        // change status locally
        console.log('changeStatus', contact, contact.id, status, res);
        // setDropdownOpened(false);
        const { data } = await contactServices.getContacts(
          categoryIds[contact?.category_1]
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
              className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6 flex items-center"
            >
              {/* <Input
                type="checkbox"
                onChange={(event) => handleSelectContact(event, contact)}
              ></Input> */}
              {openedTab == 0 ? 'Client' : 'Professional'}
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500"
            >
              Type
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500"
            >
              PHONE
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500"
            >
              LAST COMMUNICATION
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500"
            >
              ACTIONS
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {contactsStatuses[openedSubtab].statuses.map((category, index) =>
            contacts.filter(
              (contact) =>
                contact.status_2.toLowerCase() == category.name.toLowerCase()
            ).length ? (
              <>
                <tr
                  key={category.id}
                  className={`${category.color} contact-row`}
                >
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
                      category.name.toLowerCase()
                  )
                  .map((contact) => (
                    <tr
                      key={contact.id}
                      className="hover:bg-lightBlue1 cursor-pointer contact-row"
                      onClick={() =>
                        router.push({
                          pathname: '/contacts/details',
                          query: { id: contact.id },
                        })
                      }
                    >
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <ContactInfo
                          data={{
                            name: contact.first_name + ' ' + contact.last_name,
                            email: contact.email,
                            image: contact.profile_image_path,
                          }}
                        />
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">
                        <div className="text-gray7 font-medium bg-gray1 text-[10px] uppercase rounded min-w-[50px] h-6 flex items-center justify-center">
                          {contact.category_2}
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
                            lastCommunication={contact.created_at}
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
                                  '#tooltip-edit-contact-' + contact.id
                                )
                                .classList.remove('invisible', 'opacity-0');
                              document
                                .querySelector(
                                  '#edit-contact-icon-' + contact.id
                                )
                                .classList.add('text-gray4');
                              document
                                .querySelector(
                                  '#edit-contact-icon-' + contact.id
                                )
                                .classList.remove('text-gray3');
                            }}
                            onMouseLeave={() => {
                              document
                                .querySelector(
                                  '#tooltip-edit-contact-' + contact.id
                                )
                                .classList.add('invisible', 'opacity-0');
                              document
                                .querySelector(
                                  '#edit-contact-icon-' + contact.id
                                )
                                .classList.add('text-gray3');
                              document
                                .querySelector(
                                  '#edit-contact-icon-' + contact.id
                                )
                                .classList.remove('text-gray4');
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCardEdit(contact);
                            }}
                          >
                            <Edit
                              id={'edit-contact-icon-' + contact.id}
                              className="text-gray3 w-4 h-4"
                            />
                            <div
                              id={'tooltip-edit-contact-' + contact.id}
                              className="inline-block absolute bottom-[34px] whitespace-nowrap invisible opacity-0 z-10 py-2 px-3 text-xs font-medium text-white bg-neutral1 rounded-lg shadow-sm dark:bg-gray-700"
                            >
                              Edit Contact
                            </div>
                          </div>
                          <div
                            className="cursor-pointer relative rounded-full p-1.5 bg-gray1 hover:bg-gray2 mr-2 flex items-center justify-center"
                            onMouseEnter={() => {
                              document
                                .querySelector(
                                  '#tooltip-see-campaigns-' + contact.id
                                )
                                .classList.remove('invisible', 'opacity-0');
                              document
                                .querySelector(
                                  '#see-campaigns-icon-' + contact.id
                                )
                                .classList.add('text-gray4');
                              document
                                .querySelector(
                                  '#see-campaigns-icon-' + contact.id
                                )
                                .classList.remove('text-gray3');
                            }}
                            onMouseLeave={() => {
                              document
                                .querySelector(
                                  '#tooltip-see-campaigns-' + contact.id
                                )
                                .classList.add('invisible', 'opacity-0');
                              document
                                .querySelector(
                                  '#see-campaigns-icon-' + contact.id
                                )
                                .classList.add('text-gray3');
                              document
                                .querySelector(
                                  '#see-campaigns-icon-' + contact.id
                                )
                                .classList.remove('text-gray4');
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push({
                                pathname: '/contacts/details',
                                query: { id: contact.id, campaigns: true },
                              });
                            }}
                          >
                            <Campaign
                              id={'see-campaigns-icon-' + contact.id}
                              className="text-gray3 w-4 h-4"
                            />
                            <div
                              id={'tooltip-see-campaigns-' + contact.id}
                              role="tooltip"
                              className="inline-block absolute bottom-[34px] whitespace-nowrap invisible z-10 py-2 px-3 text-xs font-medium text-white bg-neutral1 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                            >
                              See Campaigns
                            </div>
                          </div>
                          <div
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
                            {/* <Category className="text-gray3 w-4 h-4" /> */}

                            <SimpleBarDropdown
                              options={allStatusesQuickEdit[categoryType]}
                              activeIcon={false}
                              activeClasses="bg-lightBlue1"
                              handleSelect={(item) => {
                                // setDropdownVal(item)
                                changeStatus(contact, item.id);
                              }}
                              iconLabel={
                                <Category
                                  id={'change-status-icon-' + contact.id}
                                  className="text-gray3 w-4 h-4"
                                />
                              }
                              dropdownValue={contact?.status_2}
                              handleDropdownClosed={(item) =>
                                console.log('testing', item)
                              }
                            ></SimpleBarDropdown>
                            <div
                              id={'tooltip-change-status-' + contact.id}
                              role="tooltip"
                              className="inline-block absolute bottom-[34px] right-0 whitespace-nowrap invisible z-10 py-2 px-3 text-xs font-medium text-white bg-neutral1 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                            >
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
            )
          )}
        </tbody>
      </>
    );
  };
  const importDetails = () => {
    const [hovered, setHovered] = useState(false);
    return (
      <>
        <thead className="bg-gray-50 overflow-x-hidden">
          <tr>
            <th
              scope="col"
              className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6 flex items-center"
            >
              Contact
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
            ></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {data.map((dataItem) => (
            <tr key={dataItem.email} className="">
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                <ContactInfo
                  data={{
                    name: dataItem.first_name + ' ' + dataItem.last_name,
                    email: dataItem.email,
                    image: dataItem.profile_image_path,
                  }}
                />
              </td>
              {dataItem.import_error && (
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 ">
                  <div className="flex items-center justify-center">
                    <Error className="h-5 w-5 text-red4 mr-2" />
                    <div className="text-gray7 font-medium">
                      {dataItem.import_error}
                    </div>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </>
    );
  };
  return (
    <div className="">
      <div className="flex flex-col">
        <div className=" overflow-x-auto ">
          <div className="inline-block min-w-full align-middle ">
            <div className="overflow-hidden ring-black ring-opacity-5">
              <table className="min-w-full divide-y divide-gray-200">
                {tableFor == 'uncategorized' || tableFor == 'in-categorization'
                  ? uncategorizedTable()
                  : tableFor == 'contact-campaigns'
                  ? contactCampaignsTable()
                  : tableFor == 'imports-summary'
                  ? importsSummaryTable()
                  : tableFor == 'contactsList'
                  ? contactsListTable()
                  : tableFor == 'categorized'
                  ? categorizedTable()
                  : tableFor == 'other'
                  ? otherTable()
                  : tableFor == 'import-successful' ||
                    tableFor == 'import-failed'
                  ? importDetails()
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
