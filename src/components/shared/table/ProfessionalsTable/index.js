import { useEffect, useState } from 'react';
import Text from '@components/shared/text';
import ContactInfo from '../contact-info';
import { useSelector } from 'react-redux';
import { agentTypes, unspecifiedTypes } from 'global/variables';
import Edit from '@mui/icons-material/Edit';
import AddActivity from 'components/overlays/add-activity';
import React from 'react';
import TooltipComponent from '@components/shared/tooltip';
import { createPortal } from 'react-dom';
import CommunicationForm from '@components/overlays/communication-form';
import Table from '..';
import { getSource } from '@global/functions';
import { useRouter } from 'next/router';

const ProfessionalsTable = ({ data, tableFor, categoryType, handleCardEdit, searchTerm }) => {
  const router = useRouter();
  const openedSubtab = useSelector((state) => state.global.openedSubtab);
  const contactsOriginal = data;
  const [contacts, setContacts] = useState([]);
  const vendorSubtypes = useSelector((state) => state.global.vendorSubtypes);

  useEffect(() => {
    if (openedSubtab === -1) {
      setContacts(contactsOriginal.filter((contact) => contact.category_1 === 'Professional'));
    } else if (openedSubtab === 0) {
      setContacts(contactsOriginal.filter((contact) => contact.category_id !== 12));
    } else if (openedSubtab === 1) {
      setContacts(contactsOriginal.filter((contact) => contact.category_id === 12));
    } else if (openedSubtab === 2) {
      setContacts(contactsOriginal.filter((contact) => contact.category_id === 9));
    }
  }, [openedSubtab, contactsOriginal]);

  const [addActivityPopup, setAddActivityPopup] = useState(false);
  const handleAddActivity = (client) => {
    setContactToModify(client);
    setAddActivityPopup(true);
  };

  const [changeStatusModal, setChangeStatusModal] = useState(false);
  const [statusIdToUpdate, setStatusIdToUpdate] = useState(null);
  const [contactToModify, setContactToModify] = useState(null);

  let professionalTypes =
    openedSubtab === 0
      ? vendorSubtypes
      : openedSubtab === 1
        ? agentTypes
        : openedSubtab === 3
          ? unspecifiedTypes
          : vendorSubtypes && [...vendorSubtypes, ...agentTypes, ...unspecifiedTypes];
  const [openCommuncationPopup, setOpenCommunicationPopup] = useState(false);
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

  return (
    <Table>
      <thead className="bg-gray-50 sticky z-[10] top-0">
        <tr>
          <th
            scope="col"
            className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6 flex items-center min-w-[500px]">
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
            className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 min-w-[400px]">
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
                <tr key={type.id} className={` bg-white sticky top-[40px] z-10 `}>
                  <td colSpan="10">
                    <div className="flex items-center px-6 py-2 border-b border-gray-200">
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
                      className={`${isUnapprovedAIContact(contact) && hideUnapproved && 'hidden'}
                      ${
                        isUnapprovedAIContact(contact) && 'opacity-50 hover:opacity-100'
                      } hover:bg-lightBlue1 cursor-pointer contact-row border-b border-gray-200`}
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
      {openCommuncationPopup &&
        createPortal(
          <CommunicationForm handleCloseOverlay={() => setOpenCommunicationPopup(false)} client={contactToModify} />,
          document.getElementById('modal-portal'),
        )}
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
    </Table>
  );
};

export default ProfessionalsTable;
