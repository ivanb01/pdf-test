import MainMenu from '@components/shared/menu';
import profile from '/public/images/Portrait_Placeholder.png';
import noteIcon from '/public/images/note-icon.svg';
import documentsIcon from '/public/images/documents-icon.svg';
import communication from '/public/images/communication.svg';
import call from '/public/images/call-icon.svg';
import edit from '/public/images/edit-icon.svg';
import email from '/public/images/email-icon.svg';
import sms from '/public/images/sms-icon.svg';
import whatsapp from '/public/images/whatsapp-icon.svg';
import addNote from '/public/images/add-note.svg';
import Button from '@components/shared/button';
import DateChip from '@components/shared/chip/date-chip';
import { useEffect, useState } from 'react';
import { findTagsOption, formatDateLL } from '@global/functions';
import Visibility from '@mui/icons-material/Visibility';
import SwitchComponent from '@components/Switch';
import { Switch } from '@headlessui/react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import PropertiesSection from '@components/PropertiesSection';
import Loader from '@components/shared/loader';
import { addContactNote, deleteContactNote, getContactActivities, getContactNotes } from '@api/contacts';
import Add from '@mui/icons-material/Add';
import TextArea from '@components/shared/textarea';
import { useFormik } from 'formik';
import Overlay from '@components/shared/overlay';
import toast from 'react-hot-toast';
import ReviewContact from '@components/overlays/review-contact';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Feeds from '@components/shared/feeds';
import FilterDropdown from '@components/shared/dropdown/FilterDropdown';
import { Delete, Edit, More } from '@mui/icons-material';
import Text from '@components/shared/text';
import MoreVert from '@mui/icons-material/MoreVert';
import NoteModal from '@components/overlays/note-modal';

const index = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;

  const [noteId, setNoteId] = useState(0);
  const [addNoteModal, setAddNoteModal] = useState(false);
  const [editNoteModal, setEditNoteModal] = useState(false);
  const refetchPart = useSelector((state) => state.global.refetchPart);
  const refetchData = useSelector((state) => state.global.refetchData);
  const contacts = useSelector((state) => state.contacts.allContacts.data);
  const [contact, setContact] = useState(null);
  const [notes, setNotes] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loadingActivities, setLoadingActivities] = useState(true);
  const [loadingNotes, setLoadingNotes] = useState(true);
  const [editingContact, setEditingContact] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);

  useEffect(() => {
    if (id && contacts?.length) {
      let contactData = contacts.find((contact) => contact.id == id);
      setContact(contactData);
      getNotes();
      getActivityLog();
      if (contactData.campaign_name) {
        setCampaigns([
          {
            title: contactData.campaign_name,
            status: true,
          },
        ]);
      }
    }
  }, [contacts, id]);

  const getNotes = () => {
    getContactNotes(id)
      .then((notesResponse) => {
        const notesData = notesResponse.data;
        setNotes(notesData.data);
        setLoadingNotes(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error('Error fetching notes');
      });
  };

  const getActivityLog = async () => {
    getContactActivities(id)
      .then((response) => {
        setActivities(response.data.data);
        setLoadingActivities(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error('Error fetching activity');
      });
  };

  const handleCloseModal = () => {
    setAddNoteModal(false);
    setNoteId(0);
    resetForm();
  };

  const [documents, setDocuments] = useState([]);

  const [applications, setApplications] = useState([]);

  const [campaigns, setCampaigns] = useState([]);

  const Item = ({ item, className, icon, isEditable }) => {
    return (
      <div className="flex justify-between">
        <div className={`flex ${className}`}>
          <div className="w-[30px]">
            <img src={icon} className="w-[26px]" />
          </div>
          <div className="flex flex-col w-fit ml-2">
            <div className="text-gray6 text-sm font-medium mb-2">{item.description}</div>
            <div className="text-gray3 text-sm">{formatDateLL(item.createdAt)}</div>
          </div>
        </div>
        {isEditable && (
          <FilterDropdown types={noteTypes} icon={<MoreVert className="w-5" />} data={item} positionClass="right-0" />
        )}
      </div>
    );
  };

  const handleEditActivity = () => {
    console.log('edit activity');
  };

  const handleDeleteActivity = () => {
    console.log('delete activity');
  };

  const handleEditNote = (note) => {
    setNoteToEdit(note);
    setEditNoteModal(true);
  };

  const handleDeleteNote = (note) => {
    setNoteToEdit(note);
    setNotes((prevNotes) => prevNotes.filter((noteItem) => noteItem.id !== note.id));
    deleteContactNote(note.contact_id, note.id);
  };

  const types = [
    {
      name: (
        <span className="flex flex-row">
          <Edit className="text-gray6 mr-3 w-4" />
          <Text smallText className="text-gray6">
            Edit Activity
          </Text>
        </span>
      ),
      handleClick: handleEditActivity,
    },
    {
      name: (
        <span className="flex flex-row">
          <Delete height={15} className="text-red5 mr-3 w-4" />
          <Text smallText className="text-red5">
            Delete Activity
          </Text>
        </span>
      ),
      handleClick: handleDeleteActivity,
    },
  ];

  const noteTypes = [
    {
      name: (
        <span className="flex flex-row">
          <Edit className="text-gray6 mr-3 w-4" />
          <Text smallText className="text-gray6">
            Edit Note
          </Text>
        </span>
      ),
      handleClick: handleEditNote,
    },
    {
      name: (
        <span className="flex flex-row">
          <Delete height={15} className="text-red5 mr-3 w-4" />
          <Text smallText className="text-red5">
            Delete Note
          </Text>
        </span>
      ),
      handleClick: handleDeleteNote,
    },
  ];

  return (
    <>
      <div>
        <MainMenu />
        {!contact ? (
          <div className="relative h-full" style={{ height: 'calc(100vh - 68px) !important' }}>
            <Loader />
          </div>
        ) : (
          <div className="px-6 py-[21px] flex">
            <div className="w-[300px]">
              <div className="bg-white px-6 py-[20px] client-details-box-shadow rounded-lg mb-3">
                <div className="flex items-center justify-between">
                  <div className="bg-white rounded-full w-[105px] h-[105px] custom-box-shadow flex items-center justify-center">
                    <img
                      src={contact.profile_image_path ? contact.profile_image_path : profile.src}
                      className="h-[95px] w-[95px] rounded-full object-cover"
                    />
                  </div>
                  <div>
                    {contact.phone_number && (
                      <Button
                        onClick={() => window.open(`tel:${contact.phone_number}`)}
                        className="mr-2"
                        white
                        inline
                        leftIcon={<img src={call.src} />}
                      />
                    )}
                    <Button onClick={() => setEditingContact(true)} white inline leftIcon={<img src={edit.src} />} />
                  </div>
                </div>
                <div className="mt-6">
                  <div className="text-[#101828] text-xl font-semibold">
                    {contact?.first_name + ' ' + contact?.last_name}
                  </div>
                  <div className="text-[#475467] mt-1">{contact?.email}</div>
                </div>
                <div className="mt-[18px] flex items-center">
                  <Button
                    size="small"
                    inline
                    white
                    label={contact.category_2}
                    className="mr-2 text-xs pointer-events-none"
                  />
                  {contact.status_2 && contact.status_2 != 'Default' && (
                    <Button
                      size="small"
                      inline
                      white
                      label={contact.status_2}
                      className="pointer-events-none text-xs"
                    />
                  )}
                </div>
                {contact.summary && (
                  <div className="mt-6">
                    <div className="text-gray8 font-semibold text-sm">Summary</div>
                    <div className="text-gray6 text-sm mt-2">{contact.summary}</div>
                  </div>
                )}
                <hr className="my-4" />
                <div>
                  <div className="mb-[10px] w-full px-4 py-2 client-details-info-shadow border border-gray2 rounded-lg flex items-center text-sm font-medium ">
                    <span className="text-gray6 mr-3">Health:</span>
                    <DateChip
                      lastCommunication={contact.last_communication_date}
                      contactStatus={'Appointment Set'}
                      contactCategory={0}
                    />
                  </div>
                  {contact.tags && (
                    <div className="mb-[10px] w-full px-4 py-2 client-details-info-shadow border border-gray2 rounded-lg flex items-center text-sm font-medium">
                      <span className="text-gray6 mr-3">Priority:</span>
                      <div className="flex items-center">
                        <span className={`block h-2 w-2 mr-1 rounded-full bg-red3`} />
                        <span className="text-gray7">{findTagsOption(contact.tags)[0].value}</span>
                      </div>
                    </div>
                  )}
                  {contact.lead_source && (
                    <div className="w-full px-4 py-2 client-details-info-shadow border border-gray2 rounded-lg flex items-center text-sm font-medium ">
                      <span className="text-gray6 mr-3">Lead Source:</span>
                      <span className="text-gray4">{contact.lead_source}</span>
                    </div>
                  )}
                </div>
              </div>
              {campaigns.length > 0 && (
                <div className="bg-white px-6 py-[20px] client-details-box-shadow rounded-lg">
                  <div className="text-gray8 font-semibold text-sm">Campaigns</div>

                  {campaigns.length > 1 ? (
                    <>
                      <div className="flex items-center justify-between text-gray4 text-sm mt-8 mb-6">
                        <div>Name</div>
                        <div>Status</div>
                      </div>
                      {campaigns.map((campaign, index) => (
                        <>
                          <div key={index} className="flex justify-between items-center">
                            <div className="text-gray7 text-sm font-medium max-w-[180px]">{campaign.title}</div>
                            <div>{campaign.status}</div>
                            <Switch
                              checked={campaign.status}
                              onChange={() =>
                                setCampaigns(
                                  campaigns.map((foundCampaign) =>
                                    foundCampaign.id === campaign.id
                                      ? { ...foundCampaign, status: !foundCampaign.status }
                                      : foundCampaign,
                                  ),
                                )
                              }
                              className={`${
                                campaign.status ? 'bg-green5' : 'bg-gray-200'
                              } relative inline-flex h-[23px] w-9 items-center rounded-full`}>
                              <span
                                className={`${
                                  campaign.status ? 'translate-x-4' : 'translate-x-[2px]'
                                } inline-block h-[18px] w-[18px] transform rounded-full bg-white transition`}
                              />
                            </Switch>
                          </div>
                          {campaigns.length - 1 !== index && <hr className="my-[18px]" />}
                        </>
                      ))}
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between items-center mt-6">
                        <div className="text-gray7 text-sm font-medium max-w-[180px]">{campaigns[0].title}</div>
                        <Switch
                          checked={campaigns[0].status}
                          onChange={() =>
                            setCampaigns(
                              campaigns.map((foundCampaign) =>
                                foundCampaign.id === campaigns[0].id
                                  ? { ...foundCampaign, status: !foundCampaign.status }
                                  : foundCampaign,
                              ),
                            )
                          }
                          className={`${
                            campaigns[0].status ? 'bg-green5' : 'bg-gray-200'
                          } relative inline-flex h-[23px] w-9 items-center rounded-full`}>
                          <span
                            className={`${
                              campaigns[0].status ? 'translate-x-4' : 'translate-x-[2px]'
                            } inline-block h-[18px] w-[18px] transform rounded-full bg-white transition`}
                          />
                        </Switch>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="flex-grow mx-3">
              <div className="bg-white px-6 py-[20px] client-details-box-shadow rounded-lg mb-3">
                <div className="flex items-center">
                  <img src={communication.src} />
                  <div className="text-gray8 ml-[6px] text-sm font-semibold">All Communication</div>
                </div>
                <Feeds contactId={id} activities={activities} setActivities={setActivities} />
                <div className="mt-6">
                  <div className="text-gray8 text-sm font-semibold mb-2">Start to communicate via:</div>
                  <div className="grid grid-cols-3">
                    <div className="border-gray1 border mr-[10px] client-details-box-shadow rounded-lg px-4 py-3 flex justify-between">
                      <div>
                        <img src={whatsapp.src} />
                        <div className="text-sm text-gray7 ml-1 font-semibold mt-1">Whatsapp</div>
                      </div>
                      <Button secondary className="!rounded-[222px] !font-semibold !px-3 !py-2 self-end">
                        Start Chat
                      </Button>
                    </div>
                    <div className="border-gray1 border mr-[10px] client-details-box-shadow rounded-lg px-4 py-3 flex justify-between">
                      <div>
                        <img src={sms.src} />
                        <div className="text-sm text-gray7 ml-1 font-semibold mt-1">SMS</div>
                      </div>
                      <Button secondary className="!rounded-[222px] !font-semibold !px-3 !py-2 self-end">
                        Send SMS
                      </Button>
                    </div>
                    <div className="border-gray1 border client-details-box-shadow rounded-lg px-4 py-3 flex justify-between">
                      <div>
                        <img src={email.src} />
                        <div className="text-sm text-gray7 ml-1 font-semibold mt-1">Email</div>
                      </div>
                      <Button secondary className="!rounded-[222px] !font-semibold !px-3 !py-2 self-end">
                        Send Email
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white px-6 py-[20px] client-details-box-shadow rounded-lg">
                <PropertiesSection contactId={id} category={'buyer'} />
              </div>
            </div>
            <div className="w-[270px]">
              <div className="bg-white px-6 py-[20px] client-details-box-shadow rounded-lg mb-3">
                <div className="flex items-start justify-between">
                  <div className="text-gray8 font-semibold text-sm mb-5">Notes</div>
                  {notes.length > 0 && (
                    <a href="#" className="cursor-pointer" onClick={() => setAddNoteModal(true)}>
                      <img src={addNote.src} />
                    </a>
                  )}
                </div>
                {!notes.length ? (
                  <div className="text-center mt-4">
                    <div className="text-gray7 font-semibold mb-2">No notes found</div>
                    <div className="text-gray5 text-sm mb-6">
                      You haven't created any notes for this client yet. To do so, simply hit the button below.
                    </div>
                    <Button onClick={() => setAddNoteModal(true)} primary label="Create Note" />
                  </div>
                ) : (
                  notes.map((note, index) => (
                    <Item
                      isEditable
                      className={` ${notes.length - 1 != index && 'mb-[18px]'}`}
                      item={note}
                      icon={noteIcon.src}
                    />
                  ))
                )}
              </div>
              {documents.length > 0 && (
                <div className="bg-white px-6 py-[20px] client-details-box-shadow rounded-lg mb-3">
                  <div className="text-gray8 font-semibold text-sm mb-5">Documents</div>
                  {documents.map((document, index) => (
                    <Item
                      className={` ${documents.length - 1 != index && 'mb-[18px]'}`}
                      item={document}
                      icon={documentsIcon.src}
                    />
                  ))}
                </div>
              )}
              {applications.length > 0 && (
                <div className="bg-white px-6 py-[20px] client-details-box-shadow rounded-lg">
                  <div className="text-gray8 font-semibold text-sm mb-5">Applications</div>
                  {applications.map((application, index) => (
                    <Item
                      className={` ${applications.length - 1 != index && 'mb-[18px]'}`}
                      item={application}
                      icon={documentsIcon.src}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {addNoteModal && <NoteModal id={id} handleCloseModal={() => setAddNoteModal(false)} setNotes={setNotes} />}
      {editNoteModal && (
        <NoteModal setNotes={setNotes} note={noteToEdit} id={id} handleCloseModal={() => setEditNoteModal(false)} />
      )}
      {editingContact && (
        <ReviewContact handleClose={() => setEditingContact(false)} client={contact} title="Edit Contact" />
      )}
    </>
  );
};

export default index;
