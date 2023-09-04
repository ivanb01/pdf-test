import { useEffect, useState } from 'react';
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
import { setRefetchCount, setRefetchData } from '@store/global/slice';
import TooltipComponent from '@components/shared/tooltip';
import InfoSharpIcon from '@mui/icons-material/InfoSharp';
const categoryIds = {
  Client: '4,5,6,7',
  Professional: '8,9,12',
};

const Column = ({ status, searchTerm, categoryType, handleCardEdit }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [clientToModify, setClientToModify] = useState(null);
  const [addActivityPopup, setAddActivityPopup] = useState(false);
  const [sortAsc, setSortAsc] = useState(true);
  const contacts = useSelector((state) => state.contacts.clients);
  const clients = useSelector((state) => state.contacts.clients);
  const openedTab = useSelector((state) => state.global.openedTab);
  const openedSubtab = useSelector((state) => state.global.openedSubtab);

  const category = 'client';

  const [filteredContacts, setFilteredContacts] = useState(
    contacts?.filter((contact) => contact.status_id == status.id && contact.category_1.toLowerCase() == category),
  );

  useEffect(() => {
    setFilteredContacts(
      contacts?.filter((contact) => contact.status_id == status.id && contact.category_1.toLowerCase() == category),
    );
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

  const handleSortAsc = () => {
    setFilteredContacts(
      filteredContacts.sort(function (a, b) {
        if (a.first_name < b.first_name) {
          return -1;
        }
        if (a.first_name > b.first_name) {
          return 1;
        }
        return 0;
      }),
    );
    setSortAsc(!sortAsc);
  };

  const handleSortDesc = () => {
    setFilteredContacts(
      filteredContacts.sort(function (a, b) {
        if (a.first_name < b.first_name) {
          return 1;
        }
        if (a.first_name > b.first_name) {
          return -1;
        }
        return 0;
      }),
    );
    setSortAsc(!sortAsc);
  };

  const handleAddActivity = (client) => {
    setClientToModify(client);
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
      console.log('tesr', foundStatus);
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
      {addActivityPopup && (
        <AddActivity
          clientId={clientToModify.id}
          className="min-w-[550px]"
          title={`Add Activity`}
          setAddActivityPopup={setAddActivityPopup}
          handleClose={() => setAddActivityPopup(false)}
        />
      )}
      {changeStatusModal && (
        <ChangeStatus handleCloseOverlay={() => setChangeStatusModal(false)} onSubmit={handleChangeStatusAndCampaign} />
      )}
      <div className={`flex flex-row w-[280px] items-center justify-between p-[16px] ${status.color}`}>
        <div className="flex justify-start">
          <p className="text-sm mr-1">{status.name}</p>
          {healthLastCommunicationDate[categoryType][status?.name] > 0 && (
            <TooltipComponent
              side={'bottom'}
              align={'start'}
              triggerElement={<InfoSharpIcon className="h-4 w-4 text-gray3 hover:text-gray4" aria-hidden="true" />}>
              <div
                // style={{ width: '300px' }}
                className={`  w-[360px] text-xs font-medium text-white bg-neutral1`}>
                <p className="mb-2">{`You must interact with these clients every ${
                  healthLastCommunicationDate[categoryType][status?.name] === 1
                    ? 'day'
                    : `${healthLastCommunicationDate[categoryType][status?.name]} days`
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
          )}
        </div>

        {/* <Checkbox label={status.name} /> */}
        <a href="#" onClick={() => (sortAsc ? handleSortAsc() : handleSortDesc())}>
          {sortAsc ? (
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
              className="sort-desc sort fill-gray7"
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
      <SimpleBar
        style={{
          overflowX: 'hidden',
          maxHeight: '100%',
          height: 'calc(100vh - 224px) !important',
        }}>
        <div className="p-[16px] contact-column-custom-height">
          {filteredContacts.map((contact, index) => (
            <ContactCard
              handleCardEdit={handleCardEdit}
              handleCardClick={handleCardClick}
              contact={contact}
              key={index}
              categoryType={categoryType}
              addActivityPopup={addActivityPopup}
              setAddActivityPopup={setAddActivityPopup}
              handleAddActivity={handleAddActivity}
              handleChangeStatus={handleChangeStatus}
            />
          ))}
        </div>
      </SimpleBar>
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
