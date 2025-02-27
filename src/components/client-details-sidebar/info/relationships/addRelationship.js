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
// import * as contactServices from 'api/contacts';
import { getContactsSearch, addContactRelationship } from 'api/contacts';
import { relationshipsTypes } from 'global/variables';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import NotificationAlert from 'components/shared/alert/notification-alert';
import ContactInfo from 'components/shared/table/contact-info';

const AddRelationshipModal = ({ handleClose, contactId, handleFetchRelationships }) => {
  const [loadingButton, setLoadingButton] = useState(false);

  const AddRelationshipSchema = Yup.object().shape({
    related_to_contact_id: Yup.string().required('No selected contact'),
    relationship_name: Yup.string().required('Choose relationship type'),
  });

  //* FORMIK *//
  const formik = useFormik({
    initialValues: {
      related_to_contact_id: '',
      relationship_name: '',
    },
    validationSchema: AddRelationshipSchema,
    onSubmit: async (values, { setSubmitting }) => {
      await addRelationship(values);
      handleFetchRelationships();
      handleCloseAddModal();
    },
  });

  const { errors, touched } = formik;

  // const [relationshipsToAdd, setRelationshipsToAdd] = useState([]);
  const [relationshipToAdd, setRelationshipToAdd] = useState(null);
  const [contactsSearched, setContactsSearched] = useState([]);
  const [contactsDropdown, setContactsDropdown] = useState(false);
  const [searchKey, setSearchKey] = useState('');

  const fetchContacts = async () => {
    try {
      const { data } = await getContactsSearch({
        search_term: searchKey,
        exclude_contact_id: contactId,
      });
      const filterData = data.map((item) => ({
        id: item.id,
        name: `${item.first_name} ${item.last_name}`,
        email: item.email,
        image: item.profile_image_path,
      }));
      setContactsSearched(filterData);
      filterData.length > 0 ? setContactsDropdown(true) : setContactsDropdown(false);
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
      relationship_image: contact.image,
      relationship_person: contact.name,
      relationship_email: contact.email,
      relationship_id: contact.id,
    });
    setSearchKey('');
    setContactsDropdown(false);
    formik.setFieldValue('related_to_contact_id', contact.id);
  };

  const handleChooseRelationshipType = (relationshipType) => {
    // const editArray = relationshipsToAdd.map((item)=>
    //     item.relationship_id === relationshipId ? {...item, relationship_type: relationshipType?.name} : item
    // )
    setRelationshipToAdd({
      ...relationshipToAdd,
      relationship_type: relationshipType.name,
    });
    formik.setFieldValue('relationship_name', relationshipType.name);
  };

  const removeRelationship = () => {
    // const filteredArray = relationshipsToAdd.filter(item => item.relationship_id !== id)
    // setRelationshipsToAdd(filteredArray)
    setRelationshipToAdd(null);
    formik.setValues({
      relationship_id: '',
      relationship_name: '',
    });
  };

  const handleCloseAddModal = () => {
    handleClose();
    setSearchKey('');
    setContactsDropdown(false);
    setRelationshipToAdd(null);
    formik.setValues({
      related_to_contact_id: '',
      relationship_name: '',
    });
  };

  const addRelationship = async (values) => {
    setLoadingButton(true);
    try {
      // const relationship = {
      //   related_to_contact_id: relationshipToAdd.relationship_id,
      //   relationship_name: relationshipToAdd.relationship_type,
      // };
      await addContactRelationship(contactId, values);
      setLoadingButton(false);
    } catch (error) {
      console.log(error);
      setLoadingButton(false);
    }
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   await addRelationship();
  //   handleFetchRelationships();
  //   handleCloseAddModal();
  // };

  return (
    <Overlay title="Add Relationship" handleCloseOverlay={handleCloseAddModal} className="w-[632px]">
      <div className="p-5 pt-0">
        <Text p className="text-gray4">
          This contact has the same interest as you. You are looking togother for a property to buy/rent/invest.
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
            <div className={`z-20 shadow rounded overflow-hidden absolute top-16 w-[100%] bg-white h-40`}>
              <SimpleBar style={{ maxHeight: '100%' }}>
                {contactsSearched.map((contact) => (
                  <div
                    onClick={() => handleChooseContact(contact)}
                    key={contact.id}
                    className="flex flex-row p-3 hover:bg-lightBlue1 cursor-pointer text-sm"
                  >
                    <ContactInfo
                      data={{
                        name: contact.name,
                        email: contact.email,
                        image: contact.image,
                      }}
                    />
                  </div>
                ))}
              </SimpleBar>
            </div>
          </Transition>
        </div>

        {errors.related_to_contact_id && (
          <NotificationAlert className="mt-2 p-2" type={'error'}>
            {errors.related_to_contact_id}
          </NotificationAlert>
        )}

        <div className="my-2 min-h-[100px]">
          {relationshipToAdd && (
            <div className="flex flex-row p-3 bg-gray-50">
              <div className="flex flex-row justify-between w-[100%] text-sm">
                <ContactInfo
                  data={{
                    name: relationshipToAdd.relationship_person,
                    email: relationshipToAdd.relationship_email,
                    image: relationshipToAdd.relationship_image,
                  }}
                />
                <div className="flex flex-row items-center">
                  <Dropdown
                    placeHolder="Choose Type*"
                    activeIcon={false}
                    options={relationshipsTypes}
                    className="mb-1 w-52"
                    activeClasses="bg-lightBlue1"
                    handleSelect={(relationshipType) => handleChooseRelationshipType(relationshipType)}
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

        {!errors.related_to_contact_id && errors.relationship_name && touched.relationship_name && (
          <NotificationAlert className="mt-2 p-2" type={'error'}>
            {errors.relationship_name}
          </NotificationAlert>
        )}

        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-row justify-end mt-5">
            <Button className="mr-3 " white label="Cancel" onClick={handleCloseAddModal} />
            <Button type="submit" primary label="Save" loading={loadingButton} />
          </div>
        </form>
      </div>
    </Overlay>
  );
};

export default AddRelationshipModal;
