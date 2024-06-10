import Table from '..';
import { getContactStatusByStatusId, getContactStatusColorByStatusId, getInitials, getSource } from 'global/functions';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Edit from '@mui/icons-material/Edit';
import Chip from '@components/shared/chip';
import DateChip from '@components/shared/chip/date-chip';
import { updateContactLocally } from 'store/contacts/slice';
import * as contactServices from 'api/contacts';
import { addContactActivity } from 'api/contacts';
import { Email, Sms } from '@mui/icons-material';
import TooltipComponent from '@components/shared/tooltip';
import { createPortal } from 'react-dom';
import CommunicationForm from '@components/overlays/communication-form';
import WhatsApp from '@mui/icons-material/WhatsApp';
import { useRouter } from 'next/router';
import StatusChip, { VARIANT_ENUM } from '@components/shared/status-chip';
import { setContactToBeEmailed, setOpenEmailContactOverlay } from '@store/global/slice';
import ContactInfo from '../contact-info';

const AllContactsTable = ({ data, handleCardEdit }) => {
  const router = useRouter();
  const hideUnapproved = useSelector((state) => state.global.hideUnapproved);
  const [openCommuncationPopup, setOpenCommunicationPopup] = useState(false);

  const dispatch = useDispatch();
  const [contactToModify, setContactToModify] = useState(null);
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
  const formatSummaryText = (text) => {
    if (text.length > 160) {
      return text.slice(0, 160) + '...';
    } else {
      return text;
    }
  };
  const handleSendEmail = (contact) => {
    let clientToBeEmailed = {
      value: contact.id,
      label: `${contact?.first_name} ${contact?.last_name} - ${contact?.email}`,
      first_name: contact?.first_name,
      last_name: contact?.last_name,
      email: contact?.email,
      profile_image_path: contact?.profile_image_path,
    };
    dispatch(setContactToBeEmailed(clientToBeEmailed));
    dispatch(setOpenEmailContactOverlay(true));
  };
  return (
    <Table>
      <thead className="bg-gray-50 sticky z-[10] top-0">
        <tr className="bg-gray-50 text-gray4">
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
            CONTACT SUMMARY
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
        {data &&
          data.map((person) => (
            <tr
              key={person?.id}
              onClick={() =>
                router.push({
                  pathname: '/contacts/details',
                  query: { id: person?.id },
                })
              }
              className={`${isUnapprovedAIContact(person) && hideUnapproved && 'hidden'}
            ${
              isUnapprovedAIContact(person) && 'opacity-50 hover:opacity-100'
            } border-b border-gray-200 cursor-pointer hover:bg-lightBlue1 `}
              style={{ height: '84px' }}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                <ContactInfo
                  maxWidth={'300px'}
                  emailsLength={100}
                  data={{
                    name: person?.first_name + ' ' + person?.last_name ?? '',
                    email: person?.email,
                    image: person?.profile_image_path,
                    approved_ai: person?.approved_ai,
                  }}
                />
              </td>

              <td>
                <Chip label={person?.category_2} typeStyle />
                <Chip
                  label={person?.status_2}
                  statusStyle
                  className={getContactStatusColorByStatusId(person?.category_id, person?.status_id)}>
                  {getContactStatusByStatusId(person?.category_id, person?.status_id)}
                </Chip>
              </td>
              <td className={`whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500 align-middle`}>
                <div className={'flex gap-1.5 items-center justify-start'}>
                  {getSource(person.import_source_text, person.approved_ai).icon}
                  <p className={'text-xs leading-4 font-medium text-gray8 text-left'}>
                    {getSource(person.import_source_text, person.approved_ai).name}
                  </p>
                </div>
                {person.summary !== null && (
                  <TooltipComponent
                    side={'bottom'}
                    align={'center'}
                    triggerElement={
                      <div
                        className={
                          'max-w-[239px] leading-5 text-left font-medium text-[11px] px-3 py-0.5 mt-1.5 text-ellipsis overflow-hidden bg-lightBlue1 text-lightBlue3 '
                        }>
                        {person.summary}
                      </div>
                    }>
                    <div className={`w-[260px] pointer-events-none text-white bg-neutral1 rounded-lg`}>
                      <p className="text-xs leading-4 font-normal">{person.summary}</p>
                    </div>
                  </TooltipComponent>
                )}
              </td>

              <td>
                {person.category_1 !== 'Client' ? (
                  '-'
                ) : (
                  <DateChip
                    contact={person}
                    lastCommunication={person.last_communication_date}
                    contactStatus={person.status_2}
                    contactCategory={person.category_1 === 'Client' ? 'clients' : 'professionals'}
                  />
                )}
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
                          handleCardEdit(person);
                        }}
                        className="group/edit cursor-pointer rounded-full p-1.5 bg-gray1 hover:bg-lightBlue2  mr-2 flex items-center justify-center">
                        <Edit
                          id={'edit-contact-icon-' + person?.id}
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
                          handleSendEmail(person);
                        }}
                        className="group/email cursor-pointer rounded-full p-1.5 bg-gray1 hover:bg-lightBlue2  mr-2 flex items-center justify-center">
                        <Email
                          id={'edit-contact-icon-' + person?.id}
                          className="group-hover/email:text-lightBlue5 text-gray3 w-4 h-4"
                        />
                      </div>
                    }>
                    <div className={'text-xs leading-4 font-medium'}>Send Email</div>
                  </TooltipComponent>
                  {person?.phone_number && (
                    <>
                      <TooltipComponent
                        side={'top'}
                        align="center"
                        style={{ marginBottom: '7px' }}
                        triggerElement={
                          <div
                            role={'button'}
                            onClick={(e) => {
                              e.stopPropagation();
                              dispatch(updateContactLocally({ ...person, last_communication_date: new Date() }));
                              addContactActivity(person?.id, {
                                type_of_activity_id: 27,
                                description: 'Attempted to make a phone call.',
                                created_at: new Date().toISOString(),
                              });
                              window.open(`tel:${person?.phone_number}`);
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
          ))}
        {openCommuncationPopup &&
          createPortal(
            <CommunicationForm handleCloseOverlay={() => setOpenCommunicationPopup(false)} client={contactToModify} />,
            document.getElementById('modal-portal'),
          )}
      </tbody>
    </Table>
  );
};

export default AllContactsTable;
