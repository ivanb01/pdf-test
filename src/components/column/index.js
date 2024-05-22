import React, { useEffect, useState } from 'react';
import { MenuAlt2Icon } from '@heroicons/react/outline';
import { InformationCircleIcon } from '@heroicons/react/solid';
import Checkbox from 'components/shared/checkbox';
import ContactCard from 'components/contact/contact-card';
import { useSelector } from 'react-redux';
import SimpleBar from 'simplebar-react';
import SortByAlpha from '@mui/icons-material/SortByAlpha';
import sortAscIcon from '/public/images/sort-asc.svg';
import sortDescIcon from '/public/images/sort-desc.svg';
import Image from 'next/image';
import EditContactOverlay from 'components/overlays/edit-client';
import { useRouter } from 'next/router';
import AddActivity from 'components/overlays/add-activity';
import toast from 'react-hot-toast';
import { clientStatuses, professionalsStatuses, healthLastCommunicationDate } from 'global/variables';
import ChangeStatus from 'components/overlays/change-contact-status';
import { unassignContactFromCampaign } from 'api/campaign';
import { useDispatch } from 'react-redux';
import { setContacts, updateContactLocally } from 'store/contacts/slice';
import * as contactServices from 'api/contacts';
import { setRefetchCount, setRefetchData, setSorted } from '@store/global/slice';
import TooltipComponent from '@components/shared/tooltip';
import InfoSharpIcon from '@mui/icons-material/InfoSharp';
import { createPortal } from 'react-dom';
import DateChip from '@components/shared/chip/date-chip';
import Mail from '@mui/icons-material/Mail';
import CommunicationForm from '@components/overlays/communication-form';

const categoryIds = {
  Client: '4,5,6,7',
  Professional: '8,9,12',
};

const Column = ({ status, searchTerm, categoryType, handleCardEdit, contacts, handleFilteredContacts }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [clientToModify, setClientToModify] = useState(null);
  const [addActivityPopup, setAddActivityPopup] = useState(false);
  const openedTab = useSelector((state) => state.global.openedTab);
  const openedSubtab = useSelector((state) => state.global.openedSubtab);
  // const clients = useSelector((state) => state.contacts.clients);
  const category = 'client';
  const [openCommunicationPopup, setOpenCommunicationPopup] = useState(false);

  const [filteredContacts, setFilteredContacts] = useState(
    contacts?.filter((contact) => contact.status_id == status.id && contact.category_1.toLowerCase() == category),
  );

  useEffect(() => {
    if (openedSubtab === -1) {
      setFilteredContacts(contacts);
    } else {
      setFilteredContacts(
        contacts?.filter((contact) => contact.status_id == status.id && contact.category_1.toLowerCase() == category),
      );
    }
  }, [openedSubtab, contacts]);

  useEffect(() => {
    setFilteredContacts(
      contacts?.filter(
        (contact) =>
          contact.status_id === status.id &&
          contact.category_1.toLowerCase() === category &&
          searchTerm.split(' ').every((word) => {
            const lowercaseWord = word.toLowerCase();
            return (
              contact.first_name.toLowerCase().includes(lowercaseWord) ||
              contact.last_name.toLowerCase().includes(lowercaseWord)
            );
          }),
      ),
    );
  }, [searchTerm, contacts]);

  const handleCardClick = (contact) => {
    router.push({
      pathname: '/contacts/details',
      query: { id: contact.id },
    });
  };

  // const handleSortAsc = () => {
  //   const sortedContacts = [...filteredContacts].sort((a, b) => {
  //     if (a.first_name < b.first_name) {
  //       return -1;
  //     }
  //     if (a.first_name > b.first_name) {
  //       return 1;
  //     }
  //     return 0;
  //   });
  //
  //   setFilteredContacts(sortedContacts);
  //   setSortAsc(!sortAsc);
  // };

  const sorted = useSelector((state) => state.global.sorted);

  const handleToggleSorting = (name) => {
    const currentItem = sorted.find((item) => item.name === name);
    if (currentItem) {
      const newOrder = currentItem.sorted === 'asc' ? 'desc' : 'asc';
      handleFilteredContacts(name, newOrder);
      dispatch(setSorted({ name, order: newOrder }));
    }
  };

  // const handleSortDesc = () => {
  //   const sortedContacts = [...filteredContacts].sort((a, b) => {
  //     if (a.first_name < b.first_name) {
  //       return 1;
  //     }
  //     if (a.first_name > b.first_name) {
  //       return -1;
  //     }
  //     return 0;
  //   });
  //
  //   setFilteredContacts(sortedContacts);
  //   setSortAsc(!sortAsc);
  // };
  const handleAddActivity = (client) => {
    setClientToModify(client);
    setAddActivityPopup(true);
  };
  const handleCommunication = (contact) => {
    setOpenCommunicationPopup(true);
  };

  const [changeStatusModal, setChangeStatusModal] = useState(false);
  const [statusIdToUpdate, setStatusIdToUpdate] = useState(null);
  const [contactToModify, setContactToModify] = useState(null);

  useEffect(() => {
    setFilteredContacts(contacts);
  }, [openedSubtab, contacts]);
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
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeStatusAndCampaign = async () => {
    try {
      await unassignContactFromCampaign(contactToModify.campaign_id, contactToModify.id);
      await changeStatus(statusIdToUpdate, contactToModify);

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

      // change status locally
      const res = await contactServices.updateContact(contact.id, {
        status_id: status,
      });
      // setDropdownOpened(false);
      dispatch(setRefetchData(true));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col border-r border-gray2">
      {addActivityPopup &&
        createPortal(
          <AddActivity
            clientId={clientToModify.id}
            className="min-w-[550px]"
            title={`Add Activity`}
            setAddActivityPopup={setAddActivityPopup}
            handleClose={() => setAddActivityPopup(false)}
          />,
          document.getElementById('modal-portal'),
        )}
      {/*{changeStatusModal && (*/}
      {/*  <ChangeStatus handleCloseOverlay={() => setChangeStatusModal(false)} onSubmit={handleChangeStatusAndCampaign} />*/}
      {/*)}*/}
      <div className={`flex flex-row w-[280px] items-center justify-between p-[16px] ${status.color}`}>
        <div className="flex justify-start">
          <p className="text-sm mr-1">{status.name}</p>
          {healthLastCommunicationDate[categoryType][status?.name] > 0 && (
            <TooltipComponent
              side={'bottom'}
              align={'start'}
              triggerElement={<InfoSharpIcon className="h-4 w-4 text-gray3 hover:text-gray4" aria-hidden="true" />}
            >
              <div
                // style={{ width: '300px' }}
                className={`  w-[360px] text-xs font-medium text-white bg-neutral1`}
              >
                <div className="text-sm font-semibold mb-2">
                  Every{' '}
                  {healthLastCommunicationDate[categoryType][status?.name] === 1
                    ? 'day'
                    : healthLastCommunicationDate[categoryType][status?.name] + ' days'}
                </div>
                <p className="mb-2">{`In order to maintain healthy communication, you must communicate every ${
                  healthLastCommunicationDate[categoryType][status?.name] === 1
                    ? 'day'
                    : healthLastCommunicationDate[categoryType][status?.name] + ' days'
                } with this client.`}</p>
                <p className="mb-2">
                  Healthy / unhealthy communication is represented in the contact card with the icons below:
                </p>
                <div className="flex flex-col mt-4">
                  <div className="flex items-center mb-2">
                    <div
                      className={`inline-flex rounded-full px-2 text-xs font-medium items-center text-green4 bg-green1`}
                    >
                      <Mail className="w-4 mr-1" />
                      <span>Today</span>
                    </div>
                    <span className="ml-4">Healthy Communication</span>
                  </div>
                  <div className="flex items-center">
                    <div className={`inline-flex rounded-full px-2 text-xs font-medium items-center text-red3 bg-red1`}>
                      <Mail className="w-4 mr-1" />
                      <span>4 days ago</span>
                    </div>
                    <span className="ml-4">Unhealthy Communication</span>
                  </div>
                </div>
              </div>
            </TooltipComponent>
          )}
        </div>

        {/* <Checkbox label={status.name} /> */}
        <a href="#" onClick={() => handleToggleSorting(status?.name)}>
          {sorted.find((s) => s.name === status?.name)?.sorted === 'asc' ? (
            <svg
              className="sort-asc sort fill-gray5"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              id="mdi-sort-alphabetical-ascending"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
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
              viewBox="0 0 24 24"
            >
              <path d="M19 7H22L18 3L14 7H17V21H19M11 13V15L7.67 19H11V21H5V19L8.33 15H5V13M9 3H7C5.9 3 5 3.9 5 5V11H7V9H9V11H11V5C11 3.9 10.11 3 9 3M9 7H7V5H9Z" />
            </svg>
          )}
        </a>
      </div>
      {filteredContacts.filter(
        (contact, index) => contact.status_id === status.id && contact.category_1.toLowerCase() === category,
      ).length > 0 ? (
        <SimpleBar
          style={{
            overflowX: 'hidden',
            maxHeight: '100%',
            height: 'calc(100vh - 224px) !important',
          }}
        >
          <div className="p-[16px] contact-column-custom-height">
            {filteredContacts.map((contact, index) => {
              if (contact.status_id === status.id && contact.category_1.toLowerCase() === category) {
                return (
                  <>
                    <ContactCard
                      handleCardEdit={handleCardEdit}
                      handleCardClick={handleCardClick}
                      contact={contact}
                      key={index}
                      categoryType={categoryType}
                      addActivityPopup={addActivityPopup}
                      setAddActivityPopup={setAddActivityPopup}
                      handleAddActivity={handleAddActivity}
                      handleCommunication={handleCommunication}
                      // handleChangeStatus={handleChangeStatus}
                    />
                  </>
                );
              }
              return null;
            })}
          </div>
        </SimpleBar>
      ) : (
        <div className={'flex align-center justify-center text-center flex-col flex-1'}>
          <p className={' text-xs leading-4 font-normal text-gray4'}>No Contacts</p>
        </div>
      )}
      {/* <div
        id="dropdown"
        className={`hidden z-50 w-48 bg-white rounded divide-y divide-gray-100 shadow fixed`}
      >
        <SimpleBar autoHide={false} style={{ maxHeight: '300px' }}>
          <ul
            className="text-sm text-gray-700"
            aria-labelledby="dropdownDefault"
          >
            {statuses[0].statuses.map((status, index) => (
              <li key={index}> */}
      {/* <Chip
                  label={status.name}
                  className={
                    index != statuses[0].statuses.length - 1
                      ? 'mb-2 w-full'
                      : 'w-full'
                  }
                  onClick={() => {
                    changeStatus(status.id);
                  }}
                /> */}
      {/* <a
                  onClick={() => {
                    changeStatus(status.id);
                  }}
                  className="cursor-pointer text-center block w-full transition-all hover:bg-blue-50 py-2 px-1 text-sm font-medium"
                >
                  {status.name}
                </a>
              </li>
            ))}
          </ul>
        </SimpleBar>
      </div> */}
    </div>
  );
};

export default Column;
