import Editor from '@components/Editor';
import Button from '@components/shared/button';
import MultiStepOverlay from '@components/shared/form/multistep-form';
import Input from '@components/shared/input';
import SlideOver from '@components/shared/slideOver';
import { useSelector } from 'react-redux';
import { MultiSelect } from 'react-multi-select-component';
import { useEffect, useState } from 'react';
import { sendEmail } from '@api/marketing';
import { setOpenEmailContactOverlay } from '@store/global/slice';
import { useDispatch } from 'react-redux';
import { addContactActivity } from '@api/contacts';

const SendEmailOverlay = () => {
  const dispatch = useDispatch();
  const [selectedContacts, setSelectedContacts] = useState([]);
  const contacts = useSelector((state) => state.contacts.allContacts.data);
  const contactToBeEmailed = useSelector((state) => state.global.contactToBeEmailed);
  const open = useSelector((state) => state.global.openEmailContactOverlay);
  const [contactsCopy, setContactsCopy] = useState();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    if (!open) {
      resetSendEmailForm();
    }
  }, [open]);

  useEffect(() => {
    if (contactToBeEmailed) {
      setSelectedContacts([contactToBeEmailed]);
    }
  }, [contactToBeEmailed]);

  useEffect(() => {
    if (selectedContacts.length && subject.length) setFormIsValid(true);
    else setFormIsValid(false);
  }, [selectedContacts, subject, message]);

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

  const handleSendEmail = () => {
    setLoading(true);
    console.log(selectedContacts);
    let contacts = selectedContacts.map((contact) => ({ email: contact.email, id: contact.value }));

    contacts.map((contact) => {
      addContactActivity(contact.id, {
        type_of_activity_id: 1,
        description: `Subject: ${subject} | Message: ${message.replace(/<[^>]*>/g, '')}`,
      });
      sendEmail([contact.email], subject, message).then(() => {
        setLoading(false);
        setEmailSent(true);
      });
    });
  };

  const resetSendEmailForm = () => {
    setSubject('');
    setMessage('');
    setSelectedContacts([]);
    setEmailSent(false);
  };

  const isSelected = (option) => selectedContacts.some((selected) => selected.value === option.value);

  const sortedOptions = contactsCopy?.sort((a, b) => {
    const aIsSelected = isSelected(a);
    const bIsSelected = isSelected(b);

    if (aIsSelected && !bIsSelected) {
      return -1;
    } else if (!aIsSelected && bIsSelected) {
      return 1;
    }
    return 0;
  });

  return (
    <SlideOver
      width="w-[540px]"
      open={open}
      setOpen={(state) => dispatch(setOpenEmailContactOverlay(state))}
      title="Send New Email"
      className=""
      buttons={
        !emailSent && (
          <>
            <Button
              // disabled={!Object.values(clientsFilters).flat().length > 0}
              primary
              label="Send Email"
              disabled={!formIsValid}
              loading={loading}
              onClick={() => handleSendEmail()}
            />
          </>
        )
      }>
      {/* <Input label="To" className="mb-6" /> */}
      {emailSent ? (
        <div className="text-center">
          <lottie-player
            src="/animations/aisummary1.json"
            background="transparent"
            speed="1"
            style={{ height: '200px' }}
            autoplay></lottie-player>
          <div className="text-gray7 font-medium text-lg -mt-4">Email has been sent successfully</div>

          <Button primary label="Send Another Email" onClick={() => resetSendEmailForm()} className="mt-6" />
        </div>
      ) : (
        <>
          <div className="mb-6">
            <div className="text-gray6 text-sm font-medium mb-1">To</div>
            {contactsCopy && contactsCopy.length && (
              <MultiSelect
                options={sortedOptions}
                value={selectedContacts}
                onChange={(contacts) => {
                  setSelectedContacts(contacts);
                }}
                labelledBy="Search for contacts"
                overrideStrings={{
                  selectSomeItems: 'Selected contacts will appear here',
                }}
              />
            )}
          </div>
          <Input
            label="Subject"
            className="mb-6"
            placeholder="Write here..."
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
          />
          <Editor label="Message" placeholder="Write message here..." setValue={setMessage} />
        </>
      )}
    </SlideOver>
  );
};

export default SendEmailOverlay;
