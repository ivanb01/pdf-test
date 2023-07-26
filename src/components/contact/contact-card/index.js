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
import AddActivity from 'components/overlays/add-activity';
import List from '@mui/icons-material/List';
import DropdownNoInput from 'components/shared/dropdown/dropdownNoInput';
import Workspaces from '@mui/icons-material/Workspaces';
import AIChip from 'components/shared/chip/ai-chip';

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
  handleChangeStatus,
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const status =
    contact?.status?.length > 8 && contact?.status?.slice(0, 8) + '...';

  const [dropdownOpened, setDropdownOpened] = useState(false);
  // const [dropdownVal, setDropdownVal] = useState(
  //   allStatusesQuickEdit[categoryType][0]
  // );

  return (
    <>
      <div
        key={contact.id}
        className={`${
          dropdownOpened && 'border-t-4'
        } relative group rounded-lg bg-white shadow-md mb-3 transition-all border-lightBlue3 hover:border-t-4 contact-card`}
      >
        {dropdownOpened && (
          <DropdownNoInput
            selectedOption={contact?.status_2}
            options={allStatusesQuickEdit[categoryType]}
            handleSelect={(item) => {
              // console.log(item);
              handleChangeStatus(item.id, contact);
              setDropdownOpened(false);
            }}
          />
        )}
        <div
          className="p-4 cursor-pointer"
          onClick={() => handleCardClick(contact)}
        >
          <div className="flex w-full items-center justify-between">
            {contact.profile_image_path ? (
              <img
                className="h-8 w-8 flex-shrink-0 rounded-full bg-gray-400"
                src={contact.profile_image_path}
              />
            ) : (
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-400">
                <span className="text-sm font-medium leading-none text-white">
                  {getInitials(
                    contact.first_name + ' ' + contact.last_name,
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

          <div className="flex w-full items-center justify-between mt-4">
            <DateChip
              lastCommunication={contact.last_communication_date}
              contactStatus={contact.status_2}
              contactCategory={categoryType}
            />
            {contact.import_source === 'GmailAI' && (
              <AIChip reviewed={contact.approved_ai} />
            )}
          </div>
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
                  .querySelector('#tooltip-add-activity-' + contact.id)
                  .classList.remove('invisible', 'opacity-0');
                document
                  .querySelector('#add-activity-icon-' + contact.id)
                  .classList.add('text-gray4');
                document
                  .querySelector('#add-activity-icon-' + contact.id)
                  .classList.remove('text-gray3');
              }}
              onMouseLeave={() => {
                document
                  .querySelector('#tooltip-add-activity-' + contact.id)
                  .classList.add('invisible', 'opacity-0');
                document
                  .querySelector('#add-activity-icon-' + contact.id)
                  .classList.add('text-gray3');
                document
                  .querySelector('#add-activity-icon-' + contact.id)
                  .classList.remove('text-gray4');
              }}
              onClick={() => handleAddActivity(contact)}
            >
              <List
                id={'add-activity-icon-' + contact.id}
                className="text-gray3 w-4 h-4"
              />
              <div
                id={'tooltip-add-activity-' + contact.id}
                role="tooltip"
                className="inline-block bottom-11 absolute whitespace-nowrap invisible z-10 py-2 px-3 text-xs font-medium text-white bg-neutral1 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
              >
                Add Activity
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
              {/* <SimpleBarDropdown
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
                handleDropdownClosed={(item) => setDropdownOpened(item)}
                noOptionChange={contact?.is_in_campaign==="assigned"}
              ></SimpleBarDropdown> */}
              <Workspaces
                id={'change-status-icon-' + contact.id}
                className="text-gray3 w-4 h-4"
              />
              <div
                id={'tooltip-change-status-' + contact.id}
                role="tooltip"
                className="inline-block absolute bottom-[34px] right-0 whitespace-nowrap invisible z-10 py-2 px-3 text-xs font-medium text-white bg-neutral1 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
              >
                Change Status
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
