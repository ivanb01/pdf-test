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
import { setRefetchActivityLog } from '@store/clientDetails/slice';
import RichtextEditor from '@components/Editor';
import TooltipComponent from '@components/shared/tooltip';
import InfoSharpIcon from '@mui/icons-material/InfoSharp';
import { updateContactLocally } from '@store/contacts/slice';
import Dropdown from '@components/shared/dropdown';
import { addEmailTemplate, getEmailTemplates } from '@api/campaign';
import Checkbox from '@components/shared/checkbox';

const SendEmailOverlay = () => {
  const dispatch = useDispatch();
  const [selectedContacts, setSelectedContacts] = useState([]);
  const contacts = useSelector((state) => state.contacts.allContacts.data);
  const contactToBeEmailed = useSelector((state) => state.global.contactToBeEmailed);
  const open = useSelector((state) => state.global.openEmailContactOverlay);
  const [openLocal, setOpenLocal] = useState(open);
  const [contactsCopy, setContactsCopy] = useState();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailTemplates, setEmailTemplates] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [saveAsTemplate, setSaveAsTemplate] = useState(false);
  const userInfo = useSelector((state) => state.global.userInfo);

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
    getTemplates();
  }, [contacts]);

  const handleSendEmail = () => {
    setLoading(true);

    // check if new email template is created
    if (saveAsTemplate) {
      addEmailTemplate({
        subject: subject,
        body_text: message.replace(/<\/?[^>]+(>|$)|&[a-zA-Z0-9#]+;/g, ''),
        body_html: message,
        status: 'active',
      }).then(() => {
        getTemplates();
      });
    }

    // change format of data to only what we need
    let contacts = selectedContacts.map((contact) => ({
      email: contact.email,
      id: contact.value,
      first_name: contact.first_name,
      last_name: contact.last_name,
    }));

    // iterate through all selected contacts, construct email, send email to each individually, add activity log to each individually,
    contacts.map((contact) => {
      let clientFirstName = contact.first_name;
      let clientLastName = contact.last_name;
      let clientFullName = clientFirstName + ' ' + clientLastName;
      let agentFirstName = userInfo?.first_name;
      let agentLastName = userInfo?.last_name;
      let agentFullName = agentFirstName + ' ' + agentLastName;

      let newMessage = message;
      newMessage = newMessage.replace(/\{\{client_first_name\}\}/g, clientFirstName);
      newMessage = newMessage.replace(/\{\{client_last_name\}\}/g, clientLastName);
      newMessage = newMessage.replace(/\{\{client_name\}\}/g, clientFullName);
      newMessage = newMessage.replace(/\{\{agent_first_name\}\}/g, agentFirstName);
      newMessage = newMessage.replace(/\{\{agent_last_name\}\}/g, agentLastName);
      newMessage = newMessage.replace(/\{\{agent_name\}\}/g, agentFullName);

      sendEmail([contact.email], subject, newMessage).then(() => {
        dispatch(updateContactLocally({ ...contact, last_communication_date: new Date() }));

        addContactActivity(contact.id, {
          type_of_activity_id: 1,
          description: `<span>[Email Sent] </span><p>Subject: ${subject}</p><br/><h6>Message: ${newMessage.replace(
            /<[^>]*>/g,
            '',
          )} </h6>`,
        }).then(() => dispatch(setRefetchActivityLog(true)));
        setLoading(false);
        setEmailSent(true);
      });
    });
  };

  const resetSendEmailForm = (sendAnother = false) => {
    setTimeout(() => {
      setSubject('');
      setMessage('');
      if (!sendAnother) {
        setSelectedContacts([]);
      }
      setEmailSent(false);
      setSelectedTemplate({ label: 'Create New Email', id: -1 });
      setSaveAsTemplate(false);
    }, 500);
  };

  const isSelected = (option) => selectedContacts.some((selected) => selected.value === option.value);
  const sortedOptions = contactsCopy
    ?.filter((contact) => contact.email != userInfo.email)
    .sort((a, b) => {
      const aIsSelected = isSelected(a);
      const bIsSelected = isSelected(b);

      if (aIsSelected && !bIsSelected) {
        return -1;
      } else if (!aIsSelected && bIsSelected) {
        return 1;
      }
      return 0;
    });

  const getTemplates = async () => {
    try {
      const emailResponse = await getEmailTemplates();
      const emailTemplates = emailResponse.data.data.map((template) => ({
        id: template.id,
        label: template.subject,
        message: template.body_html,
      }));

      emailTemplates.unshift({ label: 'Create New Email', id: -1 });

      setEmailTemplates(emailTemplates);
      setSelectedTemplate({ label: 'Create New Email', id: -1 });
    } catch (error) {
      console.error('Failed to get email template:', error);
    }
  };

  return (
    <SlideOver
      width="w-[540px]"
      open={open}
      setOpen={(state) => {
        dispatch(setOpenEmailContactOverlay(state));
        if (!state) {
          resetSendEmailForm();
        }
      }}
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

          <Button primary label="Send Another Email" onClick={() => resetSendEmailForm(true)} className="mt-6" />
        </div>
      ) : (
        <div>
          <div className="mb-6">
            <div className="flex items-center mb-1">
              <div className="text-gray6 text-sm font-medium mr-1">To</div>
              <TooltipComponent
                side={'bottom'}
                align={'start'}
                triggerElement={<InfoSharpIcon className="h-4 w-4 text-gray3 hover:text-gray4" aria-hidden="true" />}>
                <div className={`text-xs font-medium text-white bg-neutral1`}>
                  Selecting multiple contacts sends individual emails to each user that is selected.
                </div>
              </TooltipComponent>
            </div>
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
          {emailTemplates && (
            <div className="mb-6">
              <div className="mb-1 text-gray8 text-sm font-medium">Create new email, or select a template:</div>
              <Dropdown
                handleSelect={(option) => {
                  setSelectedTemplate(option);
                  if (option.id == -1) {
                    setSubject('');
                    setMessage('');
                  } else {
                    setSubject(option.label);
                    setMessage(option.message);
                  }
                }}
                initialSelect={selectedTemplate}
                options={emailTemplates}
                placeHolder="Select Template"
              />
              {selectedTemplate?.id === -1 && (
                <div className="mt-3">
                  <Checkbox
                    setState={(state) => {
                      setSaveAsTemplate(state);
                    }}
                    state={saveAsTemplate}
                    label="Save this new email as a template"
                  />
                </div>
              )}
            </div>
          )}
          <div className="mb-6">
            <Input
              label="Subject"
              className=""
              placeholder="Write here..."
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
            />
          </div>
          <div className="text-gray6 text-sm font-medium mb-1">Message</div>
          <RichtextEditor
            label="Message"
            value={message}
            placeholder="Write message here..."
            onContentChange={setMessage}
          />
        </div>
      )}
    </SlideOver>
  );
};

export default SendEmailOverlay;
