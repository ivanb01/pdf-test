import Input from '../input';
import {
  getContactStatusByStatusId,
  getContactTypeByTypeId,
  getContactStatusColorByStatusId,
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
import { formatDateAgo } from 'global/functions';

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
              className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6 flex items-center border-r border-gray-200"
            >
              <Input type="checkbox" onChange={() => handleSelectAll}></Input>
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
        <tbody className="divide-y divide-gray-200 bg-white">
          {data.map((dataItem) => (
            <tr
              key={dataItem.event_id}
              className="hover:bg-lightBlue1 cursor-pointer contact-row"
              onClick={(event) => handleClickRow(dataItem, event)}
            >
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 border-r border-gray-200">
                <ContactInfo
                  handleSelect={() => console.log('test')}
                  data={{
                    name: dataItem.contact_name,
                    type: dataItem.contact_category,
                    status: dataItem.contact_status,
                    image: dataItem.contact_profile_url,
                  }}
                />
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                <div className="text-gray7">{dataItem.campaign_name}</div>
                <div className="text-lightBlue3 cursor-pointer hover:underline">
                  <Image src={eyeIcon} />
                  <span className="ml-1">{dataItem.event_name}</span>
                </div>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                <div className="text-gray7 font-medium">Today</div>
                <div className="text-gray-500 font-medium">
                  {dataItem.event_scheduled_time}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </>
    );
  };
  const contactCampaignsTable = () => {
    return (
      <>
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6 flex items-center border-r border-gray-200"
            >
              <Input type="checkbox" onChange={() => handleSelectAll}></Input>
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
                    image: dataItem.image,
                    assigned:
                      dataItem.contact_campaign_status == 'assigned' ? 1 : 0,
                  }}
                  handleSelect={(e, dataItem) =>
                    handleSelectContact(e, dataItem)
                  }
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
  const uncategorizedTable = () => {
    return (
      <>
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6"
            >
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
            {tableFor == 'in-categorization' && (
              <th className="relative px-[25px] py-[10px] flex justify-end items-center">
                <Input type="checkbox" onChange={() => handleSelectAll}></Input>
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
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                <ContactInfo
                  data={{
                    name: dataItem.first_name + ' ' + dataItem.last_name,
                    email: dataItem.email,
                    image: dataItem.image,
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
              {tableFor == 'in-categorization' && (
                <td className="relative whitespace-nowrap h-[72.5px] px-3 py-4 sm:pr-6 flex justify-end items-center">
                  <Input
                    type="checkbox"
                    id={'input_' + index}
                    onChange={(event) => handleClickRow(dataItem, event)}
                  ></Input>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </>
    );
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
              <Button white onClick={() => undoAllCategorizations()}>
                Undo All
              </Button>
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
                {console.log(dataItem)}
                <ContactInfo
                  data={{
                    name: dataItem.first_name + ' ' + dataItem.last_name,
                    email: dataItem.email,
                    image: dataItem.image,
                  }}
                />
                {(dataItem.category_id != null ||
                  dataItem.status_id != null) && (
                  <div className="flex items-center mt-3 type-and-status">
                    {console.log(dataItem)}
                    {dataItem.category_id != null && (
                      <div className="min-h-[28px] text-[10px] uppercase px-2 py-1 bg-gray1 rounded-[4px] font-medium mr-3 flex items-center">
                        {getContactTypeByTypeId(dataItem.category_id)}
                      </div>
                    )}
                    {dataItem.status_id != null && (
                      <div
                        className={` min-h-[28px] text-xs font-medium text-gray8 py-1 px-2 ${getContactStatusColorByStatusId(
                          dataItem.category_id,
                          dataItem.status_id
                        )} rounded-xl mr-3 flex items-center`}
                      >
                        {getContactStatusByStatusId(
                          dataItem.category_id,
                          dataItem.status_id
                        )}
                      </div>
                    )}
                  </div>
                )}
              </td>
              <td className="relative whitespace-nowrap h-[72.5px] px-3 py-4 sm:pr-6 flex justify-end items-center">
                <Button white onClick={() => undoCategorization(dataItem.id)}>
                  Undo
                </Button>
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
                  <td colspan="10">
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
                            image: contact.image,
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
                          {contact.phone_number}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">
                        <div className="text-gray7 font-medium">
                          <Chip
                            lastCommunication={formatDateAgo(
                              contact?.last_communication_date
                            )}
                          />
                        </div>
                        {/* <div className="text-gray4">{contact.uploadedTime}</div> */}
                      </td>
                      <td>
                        <div className="px-4 py-[10px] flex items-center justify-center">
                          <div
                            className="cursor-pointer rounded-full p-1.5 bg-gray1 mr-2 flex items-center justify-center"
                            onMouseEnter={() =>
                              document
                                .querySelector(
                                  '#tooltip-edit-contact-' + contact.id
                                )
                                .classList.remove('invisible', 'opacity-0')
                            }
                            onMouseLeave={() =>
                              document
                                .querySelector(
                                  '#tooltip-edit-contact-' + contact.id
                                )
                                .classList.add('invisible', 'opacity-0')
                            }
                          >
                            <Edit className="text-gray3 w-4 h-4" />
                            <div
                              id={'tooltip-edit-contact-' + contact.id}
                              className="inline-block bottom-14 absolute invisible opacity-0 z-10 py-2 px-3 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-sm dark:bg-gray-700"
                            >
                              Edit Contact
                            </div>
                          </div>
                          <div
                            className="cursor-pointer rounded-full p-1.5 bg-gray1 mr-2 flex items-center justify-center"
                            onMouseEnter={() =>
                              document
                                .querySelector(
                                  '#tooltip-see-campaigns-' + contact.id
                                )
                                .classList.remove('invisible', 'opacity-0')
                            }
                            onMouseLeave={() =>
                              document
                                .querySelector(
                                  '#tooltip-see-campaigns-' + contact.id
                                )
                                .classList.add('invisible', 'opacity-0')
                            }
                          >
                            <Campaign className="text-gray3 w-4 h-4" />
                            <div
                              id={'tooltip-see-campaigns-' + contact.id}
                              role="tooltip"
                              className="inline-block bottom-14 absolute invisible z-10 py-2 px-3 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                            >
                              See Campaigns
                            </div>
                          </div>
                          <div
                            className="change-status relative cursor-pointer rounded-full p-1.5 bg-gray1 flex items-center justify-center group-hover"
                            onMouseEnter={() =>
                              document
                                .querySelector(
                                  '#tooltip-change-status-' + contact.id
                                )
                                .classList.remove('invisible', 'opacity-0')
                            }
                            onMouseLeave={() =>
                              document
                                .querySelector(
                                  '#tooltip-change-status-' + contact.id
                                )
                                .classList.add('invisible', 'opacity-0')
                            }
                            // onClick={(event) => handleDropdown(event, !dropdownOpened)}
                            onClick={() => setDropdownOpened(!dropdownOpened)}
                          >
                            <Category className="text-gray3 w-4 h-4" />
                            {/* <SimpleBarDropdown
                              options={allStatusesQuickEdit[0]}
                              activeIcon={false}
                              activeClasses="bg-lightBlue1"
                              handleSelect={(item) => {
                                // setDropdownVal(item)
                                changeStatus(item.id);
                              }}
                              iconLabel={
                                <Category className="text-gray3 w-4 h-4" />
                              }
                              dropdownValue={contact?.status_2}
                              handleDropdownClosed={(item) =>
                                setDropdownOpened(item)
                              }
                            ></SimpleBarDropdown> */}
                            <div
                              id={'tooltip-change-status-' + contact.id}
                              role="tooltip"
                              className="w-[109px] inline-block absolute bottom-14 invisible z-10 py-2 px-3 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
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
                    image: dataItem.image,
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
              <table className="min-w-full divide-y divide-gray-300">
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
