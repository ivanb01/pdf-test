import Editor from '@components/Editor';
import Button from '@components/shared/button';
import MultiStepOverlay from '@components/shared/form/multistep-form';
import Input from '@components/shared/input';
import SlideOver from '@components/shared/slideOver';
import { useSelector } from 'react-redux';
import { MultiSelect } from 'react-multi-select-component';
import { useEffect, useState } from 'react';

const SendEmailOverlay = ({ open, setOpen }) => {
  const [selectedContacts, setSelectedContacts] = useState([]);
  const contacts = useSelector((state) => state.contacts.allContacts.data);
  const [contactsCopy, setContactsCopy] = useState();
  useEffect(() => {
    console.log(contacts);
    if (contacts) {
      setContactsCopy(
        contacts?.map((contact) => ({
          value: contact.id,
          label: `${contact.first_name} ${contact.last_name}`,
          first_name: contact.first_name,
          last_name: contact.last_name,
          email: contact.email,
          profile_image_path: contact.profile_image_path,
        })),
      );
    }
  }, [contacts]);

  return (
    <SlideOver
      width="w-[540px]"
      open={open}
      setOpen={setOpen}
      title="Send New Email"
      className="top-[70px]"
      buttons={
        <>
          <Button
            // disabled={!Object.values(clientsFilters).flat().length > 0}
            primary
            label="Send Email"
            onClick={() => {
              setFiltersCleared(true);
              dispatch(setClientsFilters({}));
            }}
          />
        </>
      }>
      {/* <Input label="To" className="mb-6" /> */}
      <div className="mb-6">
        <div className="text-gray6 text-sm font-medium mb-1">To</div>
        <MultiSelect
          options={contactsCopy}
          value={selectedContacts}
          onChange={(contacts) => {
            setSelectedContacts(contacts);
          }}
          labelledBy="Search for clients"
          overrideStrings={{
            selectSomeItems: 'Selected clients will appear here',
          }}
        />
      </div>
      <Input label="Subject" className="mb-6" placeholder="Write here..." />
      <Editor label="Message" placeholder="Write message here..." />
    </SlideOver>
  );
};

export default SendEmailOverlay;
