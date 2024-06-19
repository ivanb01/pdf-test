import InfoSharpIcon from '@mui/icons-material/InfoSharp';
import { useEffect, useState } from 'react';
import Text from '@components/shared/text';
import ContactInfo from '../contact-info';
import { useSelector } from 'react-redux';
import { clientStatuses, professionalsStatuses, contactTypes } from 'global/variables';
import Edit from '@mui/icons-material/Edit';
import DateChip from '@components/shared/chip/date-chip';
import { setContacts, updateContactLocally } from 'store/contacts/slice';
import toast from 'react-hot-toast';
import * as contactServices from 'api/contacts';
import AddActivity from 'components/overlays/add-activity';
import ChangeStatus from 'components/overlays/change-contact-status';
import { unassignContactFromCampaign } from 'api/campaign';
import ArrowDropDownTwoToneIcon from '@mui/icons-material/ArrowDropDownTwoTone';
import ArrowDropUpTwoToneIcon from '@mui/icons-material/ArrowDropUpTwoTone';
import { addContactActivity, getContact } from 'api/contacts';
import React from 'react';
import { Email, Sms } from '@mui/icons-material';
import { setContactToBeEmailed, setOpenEmailContactOverlay, setSorted } from '@store/global/slice';
import TooltipComponent from '@components/shared/tooltip';
import { healthLastCommunicationDate } from 'global/variables';
import { createPortal } from 'react-dom';
import Mail from '@mui/icons-material/Mail';
import CommunicationForm from '@components/overlays/communication-form';
import WhatsApp from '@mui/icons-material/WhatsApp';
import Table from '..';
import { getContactStatusByStatusId, getContactStatusColorByStatusId, getSource } from '@global/functions';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import Chip from '@components/shared/chip';

const ContactsListTable = ({ data, contacts, handleFilteredContacts, categoryType, handleCardEdit, searchTerm }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const openedTab = useSelector((state) => state.global.openedTab);
  const openedSubtab = useSelector((state) => state.global.openedSubtab);
  const sorted = useSelector((state) => state.global.sorted);

  let contactsStatuses = openedTab == 0 ? clientStatuses : professionalsStatuses;
  const [isExpanded, setIsExpanded] = useState([]);
  useEffect(() => {
    const initializeState = () => {
      if (openedSubtab !== -1) {
        setIsExpanded(
          contactsStatuses[openedSubtab].statuses.map((category) => ({
            categoryId: category.id,
            expanded: true,
          })),
        );
      } else {
        setIsExpanded(
          contactsStatuses.flatMap((item) =>
            item.statuses.map((category) => ({
              categoryId: category.name,
              expanded: true,
            })),
          ),
        );
      }
    };

    initializeState();
  }, [openedSubtab]);

  useEffect(() => {
    if (contactsStatuses[openedSubtab]) {
      setIsExpanded((prevExpanded) =>
        contactsStatuses[openedSubtab].statuses.map((category) => ({
          categoryId: category.name,
          expanded: true,
        })),
      );
    }
  }, [openedSubtab, contactsStatuses[openedSubtab]]);

  const handleToggleSorting = (name) => {
    const currentItem = sorted.find((item) => item.name === name);
    if (currentItem) {
      const newOrder = currentItem.sorted === 'asc' ? 'desc' : 'asc';
      handleFilteredContacts(name, newOrder);
      dispatch(setSorted({ name, order: newOrder }));
    }
  };

  const [addActivityPopup, setAddActivityPopup] = useState(false);
  const handleAddActivity = (client) => {
    setContactToModify(client);
    setAddActivityPopup(true);
  };

  const [changeStatusModal, setChangeStatusModal] = useState(false);
  const [statusIdToUpdate, setStatusIdToUpdate] = useState(null);
  const [contactToModify, setContactToModify] = useState(null);
  const hideUnapproved = useSelector((state) => state.global.hideUnapproved);

  const isUnapprovedAIContact = (contact) => {
    if (
      contact.import_source_text === 'GmailAI' ||
      contact.import_source_text === 'Smart Sync A.I.' ||
      contact.import_source_text === 'Gmail'
    ) {
      if (!contact.approved_ai) return true;
    }
    return false;
  };
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

      const foundStatus = categoryStatuses.find((status) => status.statuses.findIndex((s) => s.id === statusId) !== -1);
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
    const filteredContacts = contacts?.filter(
      (contact) =>
        searchTerm.split(' ').every((word) => {
          const lowercaseWord = word?.toLowerCase();
          return (
            contact?.first_name?.toLowerCase()?.includes(lowercaseWord) ||
            contact?.last_name?.toLowerCase()?.includes(lowercaseWord)
          );
        }) &&
        contact?.status_id == category?.id &&
        contact?.category_1 == contactTypes?.find((type) => type?.id == openedTab)?.name,
    );

    return filteredContacts;
  }

  const toggleExpanded = (categoryId) => {
    setIsExpanded((prevState) => {
      return prevState.map((item) => {
        if (item.categoryId === categoryId) {
          return { ...item, expanded: !item.expanded };
        }
        return item;
      });
    });
  };
  let contactsToBeRendered =
    openedSubtab !== -1 ? contactsStatuses[openedSubtab].statuses : contactsStatuses.flatMap((c) => c.statuses);
  const [openCommuncationPopup, setOpenCommunicationPopup] = useState(false);

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

  return (
    <Table>
      <thead className="bg-gray-50 sticky z-[10] top-0">
        <tr>
          <th
            scope="col"
            className=" px-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6 lg:w-[300px] xl:w-[300px]">
            {/* <Input
              type="checkbox"
              onChange={(event) => handleSelectContact(event, contact)}
            ></Input> */}
            {openedTab == 0 ? 'Client' : 'Professional'}
          </th>
          <th
            scope="col"
            className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 w-[380px]">
            Type / Status
          </th>
          <th
            scope="col"
            className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 lg:w-[500px] xl:w-[500px]">
            Contact summary
          </th>

          <th
            scope="col"
            className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500 lg:w-[220px] xl:w-[400px]">
            {openedTab !== 1 && openedSubtab !== 3 ? 'LAST COMMUNICATION ' : ''}
          </th>

          <th
            scope="col"
            className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 lg:w-[173px] xl:w-[400px]">
            ACTIONS
          </th>
        </tr>
      </thead>
      <tbody className="bg-white" style={{ overflowY: 'auto' }}>
        {contactsToBeRendered.map((category) =>
          contacts?.filter(
            (contact) =>
              searchTerm.split(' ').every((word) => {
                const lowercaseWord = word?.toLowerCase();
                return (
                  contact?.first_name?.toLowerCase()?.includes(lowercaseWord) ||
                  contact?.last_name?.toLowerCase()?.includes(lowercaseWord)
                );
              }) && contact?.category_1 == contactTypes.find((type) => type?.id == openedTab)?.name,
          ).length > 0 ? (
            <div>
              <tr
                key={category.id}
                className={`${category.color} contact-row border-b border-gray-200 sticky z-10 top-[40px]`}>
                <td colSpan="10">
                  <div
                    className="flex items-center px-6 py-2"
                    role={'button'}
                    onClick={() => toggleExpanded(category.name)}>
                    {isExpanded &&
                      isExpanded
                        .filter((item) => item.categoryId === category.name)
                        .map((item) =>
                          item.expanded === true ? (
                            <ArrowDropUpTwoToneIcon className={'h-5 w-5 text-gray4 mr-1 cursor-pointer'} />
                          ) : (
                            <ArrowDropDownTwoToneIcon className={'h-5 w-5 text-gray4 mr-1 cursor-pointer'} />
                          ),
                        )}
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
                        <div className="text-sm font-semibold mb-2">
                          Every{' '}
                          {healthLastCommunicationDate[categoryType][category?.name] === 1
                            ? 'day'
                            : healthLastCommunicationDate[categoryType][category?.name] + ' days'}
                        </div>
                        <p className="mb-2">{`In order to maintain healthy communication, you must communicate every ${
                          healthLastCommunicationDate[categoryType][category?.name] === 1
                            ? 'day'
                            : healthLastCommunicationDate[categoryType][category?.name] + ' days'
                        } with this client.`}</p>
                        <p className="mb-2">
                          Healthy / unhealthy communication is represented in the contact card with the icons below:
                        </p>
                        <div className="flex flex-col mt-4">
                          <div className="flex items-center mb-2">
                            <div
                              className={`inline-flex rounded-full px-2 text-xs font-medium items-center text-green4 bg-green1`}>
                              <Mail className="w-4 mr-1" />
                              <span>Todays</span>
                            </div>
                            <span className="ml-4">Healthy Communication</span>
                          </div>
                          <div className="flex items-center">
                            <div
                              className={`inline-flex rounded-full px-2 text-xs font-medium items-center text-red3 bg-red1`}>
                              <Mail className="w-4 mr-1" />
                              <span>4 days ago</span>
                            </div>
                            <span className="ml-4">Unhealthy Communication</span>
                          </div>
                        </div>
                      </div>
                    </TooltipComponent>
                    <a
                      href="#"
                      className={'ml-2'}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleSorting(category?.name);
                      }}>
                      {sorted.find((s) => s.name === category?.name)?.sorted === 'asc' ? (
                        <svg
                          className="sort-asc sort fill-gray5"
                          xmlns="http://www.w3.org/2000/svg"
                          version="1.1"
                          id="mdi-sort-alphabetical-ascending"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24">
                          <path d="M19 17H22L18 21L14 17H17V3H19M11 13V15L7.67 19H11V21H5V19L8.33 15H5V13M9 3H7C5.9 3 5 3.9 5 5V11H7V9H9V11H11V5C11 3.9 10.11 3 9 3M9 7H7V5H9Z" />
                        </svg>
                      ) : (
                        <svg
                          className="sort-desc sort fill-gray5"
                          xmlns="http://www.w3.org/2000/svg"
                          version="1.1"
                          id="mdi-sort-alphabetical-descending"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24">
                          <path d="M19 7H22L18 3L14 7H17V21H19M11 13V15L7.67 19H11V21H5V19L8.33 15H5V13M9 3H7C5.9 3 5 3.9 5 5V11H7V9H9V11H11V5C11 3.9 10.11 3 9 3M9 7H7V5H9Z" />
                        </svg>
                      )}
                    </a>
                  </div>
                </td>
              </tr>

              {filterContacts(category, contactTypes).length ? (
                filterContacts(category, contactTypes).map((contact) => (
                  <tr
                    key={contact.id}
                    className={`
                    ${isUnapprovedAIContact(contact) && hideUnapproved && 'hidden'}
                    ${
                      isUnapprovedAIContact(contact) && 'opacity-50 hover:opacity-100'
                    } hover:bg-lightBlue1 cursor-pointer contact-row border-b border-gray-200 ${
                      isExpanded.find((expanded) => expanded.categoryId === category.name)?.expanded !== true
                        ? 'hidden'
                        : ''
                    }`}
                    onClick={() =>
                      router.push({
                        pathname: '/contacts/details',
                        query: { id: contact.id },
                      })
                    }>
                    <td className={`whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6`}>
                      <ContactInfo
                        maxWidth={'300px'}
                        emailsLength={100}
                        data={{
                          name: contact.first_name + ' ' + contact.last_name,
                          email: contact.email,
                          image: contact.profile_image_path,
                          approved_ai: contact.approved_ai,
                        }}
                      />
                    </td>
                    <td className="w-fit">
                      <Chip label={contact?.category_2} typeStyle />
                      {contact?.category_1 === 'Client' && (
                        <Chip
                          label={contact?.status_2}
                          statusStyle
                          className={getContactStatusColorByStatusId(contact?.category_id, contact?.status_id)}>
                          {getContactStatusByStatusId(contact?.category_id, contact?.status_id)}
                        </Chip>
                      )}
                    </td>
                    <td className={`whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500 align-middle`}>
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

                    <td className={`whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500 align-middle`}>
                      <div className="text-gray7 font-medium">
                        {contact.status_2 !== 'Dropped' && contact?.status_2 !== 'Trash' ? (
                          <DateChip
                            contact={contact}
                            lastCommunication={contact.last_communication_date}
                            contactStatus={contact.status_2}
                            contactCategory={contact.category_1 === 'Client' ? 'clients' : 'professionals'}
                          />
                        ) : (
                          <></>
                        )}

                        {/* <Chip
                          lastCommunication={formatDateAgo(
                            contact?.last_communication_date
                          )}
                        /> */}
                      </div>
                      {/* <div className="text-gray4">{contact.uploadedTime}</div> */}
                    </td>
                    <td>
                      <div className="px-4 py-[9px] flex items-center justify-start">
                        <TooltipComponent
                          side={'top'}
                          align="center"
                          style={{ marginBottom: '7px' }}
                          triggerElement={
                            <div
                              role={'button'}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCardEdit(contact);
                              }}
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
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSendEmail(contact);
                              }}
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
                                      e.stopPropagation();
                                      let message = '';
                                      switch (contact.category_2) {
                                        case 'Renter':
                                          message =
                                            "Hey, wanted to check in and see if you're still looking for a rental?";
                                          break;
                                        case 'Buyer':
                                          message =
                                            'Hey, wanted to see if we could help with anything related to your purchase.';
                                          break;
                                        case 'Landlord':
                                          message = 'Hey just checking in on your property.';
                                          break;
                                        case 'Seller':
                                          message =
                                            'Hey, just wanted to check in and see if we could talk about your property.';
                                          break;
                                        default:
                                          message = 'Hey, just checking in.';
                                          break;
                                      }
                                      // let activity = {
                                      //   type_of_activity_id: 37,
                                      //   description: 'Attempted to communicate using SMS.',
                                      // };

                                      // contactServices.addContactActivity(contact.id, activity);
                                      let link = `sms:${contact.phone_number}&body=${message}`;
                                      window.location.href = link;
                                    }}
                                    className="group/sms cursor-pointer rounded-full p-1.5 bg-gray1 hover:bg-lightBlue2  mr-2 flex items-center justify-center">
                                    <Sms
                                      id={'edit-contact-icon-' + contact.id}
                                      className="group-hover/sms:text-lightBlue5 text-gray3 w-4 h-4"
                                    />
                                  </div>
                                }>
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
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    let message = '';
                                    switch (contact.category_2) {
                                      case 'Renter':
                                        message =
                                          "Hey, wanted to check in and see if you're still looking for a rental?";
                                        break;
                                      case 'Buyer':
                                        message =
                                          'Hey, wanted to see if we could help with anything related to your purchase.';
                                        break;
                                      case 'Landlord':
                                        message = 'Hey just checking in on your property.';
                                        break;
                                      case 'Seller':
                                        message =
                                          'Hey, just wanted to check in and see if we could talk about your property.';
                                        break;
                                      default:
                                        message = 'Hey, just checking in.';
                                        break;
                                    }
                                    let link = `https://wa.me/${contact.phone_number}?text=${encodeURIComponent(
                                      message,
                                    )}`;
                                    window.open(link, '_blank');
                                  }}
                                  className="group/whatsapp cursor-pointer rounded-full p-1.5 bg-gray1 hover:bg-lightBlue2  mr-2 flex items-center justify-center">
                                  <WhatsApp
                                    id={'edit-contact-icon-' + contact.id}
                                    className="group-hover/whatsapp:text-lightBlue5 text-gray3 w-4 h-4"
                                  />
                                </div>
                              }>
                              <div className={'text-xs leading-4 font-medium'}>Send Whatsapp</div>
                            </TooltipComponent> */}
                            <TooltipComponent
                              side={'top'}
                              align="center"
                              style={{ marginBottom: '7px' }}
                              triggerElement={
                                <div
                                  role={'button'}
                                  onClick={(e) => {
                                    e.stopPropagation();
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
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr
                  className={`text-gray4 h-[76px] text-sm leading-5 font-medium ${
                    isExpanded.find((expanded) => expanded.categoryId === category.name)?.expanded !== true
                      ? 'hidden'
                      : ''
                  } `}>
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
                    <div
                      className="flex items-center px-6 py-2"
                      role={'button'}
                      onClick={() => toggleExpanded(category.name)}>
                      {isExpanded &&
                        isExpanded
                          .filter((item) => item.categoryId === category.name)
                          .map((item) =>
                            item.expanded === true ? (
                              <ArrowDropUpTwoToneIcon className={'h-5 w-5 text-gray4 mr-1 cursor-pointer'} />
                            ) : (
                              <ArrowDropDownTwoToneIcon className={'h-5 w-5 text-gray4 mr-1 cursor-pointer'} />
                            ),
                          )}
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
                          <div className="text-sm font-semibold mb-2">
                            Every{' '}
                            {healthLastCommunicationDate[categoryType][category?.name] === 1
                              ? 'day'
                              : healthLastCommunicationDate[categoryType][category?.name] + ' days'}
                          </div>
                          <p className="mb-2">{`In order to maintain healthy communication, you must communicate every ${
                            healthLastCommunicationDate[categoryType][category?.name] === 1
                              ? 'day'
                              : healthLastCommunicationDate[categoryType][category?.name] + ' days'
                          } with this client.`}</p>
                          <p className="mb-2">
                            Healthy / unhealthy communication is represented in the contact card with the icons below:
                          </p>
                          <div className="flex flex-col mt-4">
                            <div className="flex items-center mb-2">
                              <div
                                className={`inline-flex rounded-full px-2 text-xs font-medium items-center text-green4 bg-green1`}>
                                <Mail className="w-4 mr-1" />
                                <span>Today</span>
                              </div>
                              <span className="ml-4">Healthy Communication</span>
                            </div>
                            <div className="flex items-center">
                              <div
                                className={`inline-flex rounded-full px-2 text-xs font-medium items-center text-red3 bg-red1`}>
                                <Mail className="w-4 mr-1" />
                                <span>4 days ago</span>
                              </div>
                              <span className="ml-4">Unhealthy Communication</span>
                            </div>
                          </div>
                        </div>
                      </TooltipComponent>
                    </div>
                  </td>
                </tr>
                <tr
                  className={`text-gray4 h-[76px] text-sm leading-5 font-medium  ${
                    isExpanded
                      .flatMap((item) => item.subcategories || [item])
                      .find((expanded) => expanded.categoryId === category.name)?.expanded !== true
                      ? 'hidden'
                      : ''
                  } `}>
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
        <ChangeStatus handleCloseOverlay={() => setChangeStatusModal(false)} onSubmit={handleChangeStatusAndCampaign} />
      )}
      {openCommuncationPopup &&
        createPortal(
          <CommunicationForm handleCloseOverlay={() => setOpenCommunicationPopup(false)} client={contactToModify} />,
          document.getElementById('modal-portal'),
        )}
    </Table>
  );
};

export default ContactsListTable;
