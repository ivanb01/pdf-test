import React from 'react';
import SearchInputSelect from '@components/shared/SearchInputSelect';
import Image from 'next/image';
import CloseIcon from '@mui/icons-material/Close';
import { getContactsSearch } from '@api/contacts';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';
import { MultiSelect } from 'react-multi-select-component';
import { useEffect, useState } from 'react';

const ClientsMultiSelect = ({ name, error, handleChange, placeholder }) => {
  const contacts = useSelector((state) => state.contacts.allContacts.data);
  const [contactsCopy, setContactsCopy] = useState();
  const [selectedContact, setSelectedContact] = useState(null);

  // const isSelected = (option) => selectedContacts.some((selected) => selected.value === option.value);

  // const sortedOptions = contactsCopy?.sort((a, b) => {
  //   const aIsSelected = isSelected(a);
  //   const bIsSelected = isSelected(b);

  //   if (aIsSelected && !bIsSelected) {
  //     return -1;
  //   } else if (!aIsSelected && bIsSelected) {
  //     return 1;
  //   }
  //   return 0;
  // });

  useEffect(() => {
    if (contacts) {
      setContactsCopy(
        contacts?.map((contact) => ({
          value: contact.id,
          label: `${contact.first_name} ${contact.last_name} - ${contact.email}`,
          first_name: contact.first_name,
          last_name: contact.last_name,
          email: contact.email,
          profile_image_path: contact.profile_image_path,
        })),
      );
    }
  }, [contacts]);

  const handleSelect = (selected) => {
    setSelectedContact(selected[selected.length - 1]);
    handleChange(selected[selected.length - 1]);
  };
  return (
    <div>
      {contactsCopy && contactsCopy.length && (
        <MultiSelect
          options={contactsCopy}
          value={selectedContact ? [selectedContact] : []}
          onChange={handleSelect}
          labelledBy="Search for contacts"
          hasSelectAll={false}
        />
      )}
    </div>
  );
};

export default ClientsMultiSelect;

ClientsMultiSelect.propTypes = {
  handleChange: PropTypes.func,
  error: PropTypes.string,
  name: PropTypes.string,
};
