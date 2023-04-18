import Avatar from 'components/shared/avatar';
import Text from 'components/shared/text';
import Badge from 'components/shared/badge';
import Chip from 'components/shared/chip';
import DateChip from 'components/shared/chip/date-chip';
// import { SpeakerphoneIcon } from '@heroicons/react/outline';
import Button from 'components/shared/button';
import Email from '@mui/icons-material/Email';
import Sms from '@mui/icons-material/Sms';
import Campaign from '@mui/icons-material/Campaign';
import Edit from '@mui/icons-material/Edit';
import Category from '@mui/icons-material/Category';
import { useEffect, useState } from 'react';
import {
  allStatusesQuickEdit,
  clientStatuses,
  professionalsStatuses,
} from 'global/variables';
import SimpleBar from 'simplebar-react';
import { useRouter } from 'next/router';
import * as contactServices from 'api/contacts';
import SimpleBarDropdown from 'components/shared/dropdown/simpleBarDropdown';
import Dropdown from 'components/shared/dropdown/';
import { useDispatch } from 'react-redux';
import { setContacts, updateContactStatus } from 'store/contacts/slice';
import { formatDateAgo, getInitials } from 'global/functions';
import toast from 'react-hot-toast';

const categoryIds = {
  Client: '4,5,6,7',
  Professional: '8,9,12',
};

export default function ContactCard({
  contact,
  categoryType,
  handleCardClick,
  handleCardEdit,
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const status =
    contact?.status?.length > 8 && contact?.status?.slice(0, 8) + '...';

  const [dropdownOpened, setDropdownOpened] = useState(false);
  const [dropdownVal, setDropdownVal] = useState(
    allStatusesQuickEdit[categoryType][0]
  );

  const changeStatus = async (status) => {
    const statusId = status; // example status id to search for
    const categoryStatuses =
      categoryType === 'clients' ? clientStatuses : professionalsStatuses;

    const foundStatus = categoryStatuses.find(
      (status) => status.statuses.findIndex((s) => s.id === statusId) !== -1
    );
    const statusMainTitle = foundStatus ? foundStatus.statusMainTitle : null;
    console.log('tesr', foundStatus);
    let statusName = foundStatus.statuses.find(
      (foundstatus) => foundstatus.id == status
    ).name;

    dispatch(
      updateContactStatus({
        id: contact.id,
        status_id: status,
        status_2: statusName,
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

  // const handleDropdown = (event, value) => {
  //   let values = event.target.closest('.change-status').getBoundingClientRect();
  //   let dropdownElement = document.querySelector('#dropdown');
  //   // console.log('test', event, value, dropdownElement)
  //   if (value) {
  //     // console.log(event.pageX, window.innerWidth);
  //     // console.log(event.pageY, window.innerHeight);
  //     // dropdownElement.style.top = event.pageY + 15 + 'px';
  //     // dropdownElement.style.left = event.pageX + 'px';
  //     console.log('remove hidden');
  //     dropdownElement.classList.remove('hidden');
  //   } else {
  //     dropdownElement.classList.add('hidden');
  //     console.log('add hidden');
  //   }
  //   setDropdownOpened(value);
  // };

  // useEffect(() => {
  //   function handleClick(event) {
  //     let dropdownElement = document.getElementById('dropdown')

  //     if (!dropdownElement.contains(event.target)){
  //       console.log("Clicked outside Box");

  //     }
  //   }

  //   // 👇️ optionally set body height to full screen
  //   // document.body.style.minHeight = '100vh';

  //   document.addEventListener('click', handleClick);

  //   return () => {
  //     // 👇️ remove event listener when the component unmounts
  //     document.removeEventListener('click', handleClick);
  //   };
  // }, []);

  return (
    <div
      key={contact.id}
      className={`${
        dropdownOpened && 'border-t-4'
      } relative group rounded-lg bg-white shadow-md mb-3 transition-all border-lightBlue3 hover:border-t-4 contact-card`}
    >
      <div
        className="p-4 cursor-pointer"
        onClick={() => handleCardClick(contact)}
      >
        <div className="flex w-full items-center justify-between">
          {contact.profile_image_path ? (
            <img
              className="h-8 w-8 flex-shrink-0 rounded-full bg-gray-400"
              src={encodeURI(contact.profile_image_path)}
            />
          ) : (
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-400">
              <span className="text-sm font-medium leading-none text-white">
                {getInitials(
                  contact.first_name + ' ' + contact.last_name
                ).toUpperCase()}
              </span>
            </span>
          )}
          <div className="flex-1 ml-2 pr-2">
            <div className="flex items-center space-x-3">
              <h3 className="text-sm font-medium text-gray-900 max-w-[110px]">
                {contact.first_name + ' ' + contact.last_name}
              </h3>
            </div>
          </div>
          <Badge label={contact.category_2} className="text-gray8 bg-gray1" />
          {/* <span className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-0.5 text-sm font-medium text-gray-800">
              Badge
            </span> */}
        </div>
        {/* <Chip lastCommunication={formatDateAgo(contact.last_communication_date, 'hour')} lastCommunicationType={contact.last_communication_category_id} /> */}
        <DateChip
          lastCommunication={contact.created_at}
          contactStatus={contact.status_2}
          contactCategory={categoryType}
        />
      </div>
      <div
        className={`${
          !dropdownOpened && 'h-0 opacity-0'
        } pointer-events-none group-hover:pointer-events-auto group-hover:h-[49px] group-hover:opacity-100 transition-all`}
      >
        <div className="border-t border-gray-200 px-4 py-[10px] flex items-center justify-end">
          <div
            className="cursor-pointer rounded-full p-1.5 bg-gray1 hover:bg-gray2 mr-2 flex items-center justify-center"
            onMouseEnter={() => {
              document
                .querySelector('#tooltip-edit-contact-' + contact.id)
                .classList.remove('invisible', 'opacity-0');
              document
                .querySelector('#edit-contact-icon-' + contact.id)
                .classList.add('text-gray4');
              document
                .querySelector('#edit-contact-icon-' + contact.id)
                .classList.remove('text-gray3');
            }}
            onMouseLeave={() => {
              document
                .querySelector('#tooltip-edit-contact-' + contact.id)
                .classList.add('invisible', 'opacity-0');
              document
                .querySelector('#edit-contact-icon-' + contact.id)
                .classList.add('text-gray3');
              document
                .querySelector('#edit-contact-icon-' + contact.id)
                .classList.remove('text-gray4');
            }}
            onClick={() => handleCardEdit(contact)}
          >
            <Edit
              id={'edit-contact-icon-' + contact.id}
              className="text-gray3 w-4 h-4"
            />
            <div
              id={'tooltip-edit-contact-' + contact.id}
              className="inline-block bottom-11 absolute invisible opacity-0 z-10 py-2 px-3 text-xs font-medium text-white bg-neutral1 rounded-lg shadow-sm dark:bg-gray-700"
            >
              Edit Contact
            </div>
          </div>
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
          <div
            className="cursor-pointer rounded-full p-1.5 bg-gray1 hover:bg-gray2 mr-2 flex items-center justify-center"
            onMouseEnter={() => {
              document
                .querySelector('#tooltip-see-campaigns-' + contact.id)
                .classList.remove('invisible', 'opacity-0');
              document
                .querySelector('#see-campaigns-icon-' + contact.id)
                .classList.add('text-gray4');
              document
                .querySelector('#see-campaigns-icon-' + contact.id)
                .classList.remove('text-gray3');
            }}
            onMouseLeave={() => {
              document
                .querySelector('#tooltip-see-campaigns-' + contact.id)
                .classList.add('invisible', 'opacity-0');
              document
                .querySelector('#see-campaigns-icon-' + contact.id)
                .classList.add('text-gray3');
              document
                .querySelector('#see-campaigns-icon-' + contact.id)
                .classList.remove('text-gray4');
            }}
            onClick={() =>
              router.push({
                pathname: '/contacts/details',
                query: { id: contact.id, campaigns: true },
              })
            }
          >
            <Campaign
              id={'see-campaigns-icon-' + contact.id}
              className="text-gray3 w-4 h-4"
            />
            <div
              id={'tooltip-see-campaigns-' + contact.id}
              role="tooltip"
              className="inline-block bottom-11 absolute whitespace-nowrap invisible z-10 py-2 px-3 text-xs font-medium text-white bg-neutral1 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
            >
              See Campaigns
            </div>
          </div>
          <div
            className="change-status relative cursor-pointer rounded-full p-1.5 bg-gray1 hover:bg-gray2 flex items-center justify-center group-hover"
            onMouseEnter={() => {
              document
                .querySelector('#tooltip-change-status-' + contact.id)
                .classList.remove('invisible', 'opacity-0');
              document
                .querySelector('#change-status-icon-' + contact.id)
                .classList.add('text-gray4');
              document
                .querySelector('#change-status-icon-' + contact.id)
                .classList.remove('text-gray3');
            }}
            onMouseLeave={() => {
              document
                .querySelector('#tooltip-change-status-' + contact.id)
                .classList.add('invisible', 'opacity-0');
              document
                .querySelector('#change-status-icon-' + contact.id)
                .classList.add('text-gray3');
              document
                .querySelector('#change-status-icon-' + contact.id)
                .classList.remove('text-gray4');
            }}
            // onClick={(event) => handleDropdown(event, !dropdownOpened)}
            onClick={() => setDropdownOpened(!dropdownOpened)}
          >
            {/* <Category className="text-gray3 w-4 h-4" /> */}
            <SimpleBarDropdown
              options={allStatusesQuickEdit[categoryType]}
              activeIcon={false}
              activeClasses="bg-lightBlue1"
              handleSelect={(item) => {
                // setDropdownVal(item)
                changeStatus(item.id);
              }}
              iconLabel={
                <Category
                  id={'change-status-icon-' + contact.id}
                  className="text-gray3 w-4 h-4"
                />
              }
              dropdownValue={contact?.status_2}
              handleDropdownClosed={(item) => setDropdownOpened(item)}
            ></SimpleBarDropdown>
            <div
              id={'tooltip-change-status-' + contact.id}
              role="tooltip"
              className="inline-block  absolute bottom-[34px] right-0 whitespace-nowrap invisible z-10 py-2 px-3 text-xs font-medium text-white bg-neutral1 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
            >
              Change Status
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
