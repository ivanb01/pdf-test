import { useEffect, useState, Fragment } from 'react';
import Text from 'components/shared/text';
import Avatar from 'components/shared/avatar';
import { MinusCircleIcon } from '@heroicons/react/solid';
import Overlay from 'components/shared/overlay';
import Input from 'components/shared/input';
import { SearchIcon } from '@heroicons/react/outline';
import Button from 'components/shared/button';
import SimpleBar from 'simplebar-react';
import Dropdown from 'components/shared/dropdown';
import { Transition } from '@headlessui/react';
import * as contactServices from 'api/contacts';
import { relationshipsTypes } from 'global/variables';

const AddRelationshipModal = ({
  handleClose,
  contactId,
  handleFetchRelationships,
}) => {
  // const [relationshipsToAdd, setRelationshipsToAdd] = useState([]);
  const [relationshipToAdd, setRelationshipToAdd] = useState(null);
  const [contactsSearched, setContactsSearched] = useState([]);
  const [contactsDropdown, setContactsDropdown] = useState(false);
  const [searchKey, setSearchKey] = useState('');

  const fetchContacts = async () => {
    try {
      const { data } = await contactServices.getContactsSearch({
        search_term: searchKey,
        exclude_contact_id: contactId,
      });
      console.log('contcts', data);
      const filterData = data.map((item) => ({
        id: item.id,
        name: `${item.first_name} ${item.last_name}`,
        email: item.email,
      }));
      setContactsSearched(filterData);
      filterData.length > 0
        ? setContactsDropdown(true)
        : setContactsDropdown(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    searchKey.length > 1 ? fetchContacts() : setContactsDropdown(false);
  }, [searchKey]);

  const handleChooseContact = (contact) => {
    // const contactIsAdding = relationshipsToAdd.some(element => {
    //     if (element.relationship_id === contact.id) {
    //       return true;
    //     }
    //     return false;
    //   });
    // !contactIsAdding && setRelationshipsToAdd([{
    //         relationship_person: contact.name,
    //         relationship_email: contact.email,
    //         relationship_id: contact.id
    //     },
    //     ...relationshipsToAdd]);
    setRelationshipToAdd({
      relationship_person: contact.name,
      relationship_email: contact.email,
      relationship_id: contact.id,
    });
    setSearchKey('');
    setContactsDropdown(false);
  };

  const handleChooseRelationshipType = (relationshipType) => {
    // const editArray = relationshipsToAdd.map((item)=>
    //     item.relationship_id === relationshipId ? {...item, relationship_type: relationshipType?.name} : item
    // )
    setRelationshipToAdd({
      ...relationshipToAdd,
      relationship_type: relationshipType.name,
    });
  };

  const removeRelationship = () => {
    // const filteredArray = relationshipsToAdd.filter(item => item.relationship_id !== id)
    // setRelationshipsToAdd(filteredArray)
    setRelationshipToAdd(null);
  };

  const handleCloseAddModal = () => {
    handleClose();
    setSearchKey('');
    setContactsDropdown(false);
    setRelationshipToAdd(null);
  };

  const addRelationship = async () => {
    try {
      const relationship = {
        related_to_contact_id: relationshipToAdd.relationship_id,
        relationship_name: relationshipToAdd.relationship_type,
      };
      const { data } = await contactServices.addContactRelationship(
        contactId,
        relationship
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addRelationship();
    handleFetchRelationships();
    handleCloseAddModal();
  };

  return (
    <Overlay
      title="Add Relationship"
      handleCloseOverlay={handleCloseAddModal}
      className="w-[632px]"
    >
      <div className="p-5 pt-0">
        <Text p className="text-gray4">
          This contact has the same interest as you. You are looking togother
          for a property to buy/rent/invest.
        </Text>
        <div className="my-6 relative">
          <Input
            id="searchContact"
            type="dropdown"
            label="Search Contact*"
            placeholder="Name Lastname or email..."
            iconAfter={<SearchIcon className="text-gray3" height={20} />}
            onChange={(event) => setSearchKey(event.target.value)}
            value={searchKey}
          />
          <Transition
            show={contactsDropdown}
            as={Fragment}
            enter="transition-opacity ease-in duration-100"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className={`z-20 shadow rounded overflow-hidden absolute top-16 w-[100%] bg-white h-40`}
            >
              <SimpleBar style={{ maxHeight: '100%' }}>
                {contactsSearched.map((contact) => (
                  <div
                    onClick={() => handleChooseContact(contact)}
                    key={contact.id}
                    className="flex flex-row p-3 hover:bg-lightBlue1 cursor-pointer group"
                  >
                    <Avatar
                      size="w-8 h-8"
                      className="mr-4"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    />
                    <div className="flex flex-col">
                      <Text className="text-gray6" h4>
                        {contact.name}
                      </Text>
                      <Text className="text-gray4" p>
                        {contact.email}
                      </Text>
                    </div>
                  </div>
                ))}
              </SimpleBar>
            </div>
          </Transition>
        </div>
        <div className="my-2 min-h-[100px]">
          {relationshipToAdd && (
            <div className="flex flex-row p-3 bg-gray-50 group">
              <Avatar
                size="w-8 h-8"
                className="mr-4"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              />
              <div className="flex flex-row justify-between w-[100%]">
                <div className="flex flex-col">
                  <Text className="text-gray6" h4>
                    {relationshipToAdd.relationship_person}
                  </Text>
                  <Text className="text-gray4" p>
                    {relationshipToAdd.relationship_email}
                  </Text>
                </div>
                <div className="flex flex-row items-center">
                  <Dropdown
                    placeHolder="Choose Type*"
                    activeIcon={false}
                    options={relationshipsTypes}
                    className="mb-1 w-52"
                    activeClasses="bg-lightBlue1"
                    handleSelect={(relationshipType) =>
                      handleChooseRelationshipType(relationshipType)
                    }
                  ></Dropdown>
                  <MinusCircleIcon
                    onClick={removeRelationship}
                    className="cursor-pointer text-gray3 hover:text-red4 m-2"
                    height={20}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row justify-end mt-5">
            <Button
              className="mr-3 "
              white
              label="Cancel"
              onClick={handleCloseAddModal}
            />
            <Button type="submit" primary label="Save" />
          </div>
        </form>
      </div>
    </Overlay>
  );
};

export default AddRelationshipModal;
