import Editor from '@components/Editor';
import Button from '@components/shared/button';
import MultiStepOverlay from '@components/shared/form/multistep-form';
import Input from '@components/shared/input';
import SlideOver from '@components/shared/slideOver';
import { useSelector } from 'react-redux';
import { MultiSelect } from 'react-multi-select-component';
import { useEffect, useState } from 'react';
import { sendEmail } from '@api/marketing';

const SendEmailOverlay = ({ open, setOpen }) => {
  const [selectedContacts, setSelectedContacts] = useState([]);
  const contacts = useSelector((state) => state.contacts.allContacts.data);
  const [contactsCopy, setContactsCopy] = useState();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
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

  const handleSendEmail = () => {
    setLoading(true);
    let contacts = selectedContacts.map((contact) => contact.email);
    console.log(contacts, subject, message);

    sendEmail(contacts, subject, message).then(() => {
      setLoading(false);
      setEmailSent(true);
    });
  };

  const resetSendEmailForm = () => {
    setSubject('');
    setMessage('');
    setSelectedContacts([]);
    setEmailSent(false);
  };

  return (
    <SlideOver
      width="w-[540px]"
      open={open}
      setOpen={setOpen}
      title="Send New Email"
      className="top-[70px]"
      buttons={
        !emailSent && (
          <>
            <Button
              // disabled={!Object.values(clientsFilters).flat().length > 0}
              primary
              label="Send Email"
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
