import MainMenu from '@components/shared/menu';
import profile from '/public/images/Portrait_Placeholder.png';
import noteIcon from '/public/images/note-icon.svg';
import documentsIcon from '/public/images/documents-icon.svg';
import communication from '/public/images/communication.svg';
import SimpleBar from 'simplebar-react';
import call from '/public/images/call-icon.svg';
import edit from '/public/images/edit-icon.svg';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import addNote from '/public/images/add-note.svg';
import Button from '@components/shared/button';
import DateChip from '@components/shared/chip/date-chip';
import React, { useEffect, useState } from 'react';
import { findTagsOption, formatDateLL } from '@global/functions';
import { Switch } from '@headlessui/react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import PropertiesSection from '@components/PropertiesSection';
import Loader from '@components/shared/loader';
import { addContactActivity, deleteContactNote, getContactActivities, getContactNotes } from '@api/contacts';
import toast from 'react-hot-toast';
import ReviewContact from '@components/overlays/review-contact';
import Feeds from '@components/shared/feeds';
import FilterDropdown from '@components/shared/dropdown/FilterDropdown';
import { Delete, Edit, More } from '@mui/icons-material';
import Text from '@components/shared/text';
import MoreVert from '@mui/icons-material/MoreVert';
import NoteModal from '@components/overlays/note-modal';
import { createPortal } from 'react-dom';
import CommunicationForm from '@components/overlays/communication-form';
import { activityTypesDropdown, allStatusesQuickEdit, othersOptions } from '@global/variables';
import Dropdown from '@components/shared/dropdown';
import { setGlobalEmail } from '@store/clientDetails/slice';
import { getEmailsForSpecificContact, syncEmailOfContact } from '@api/email';

const index = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const [noteId, setNoteId] = useState(0);
  const [addNoteModal, setAddNoteModal] = useState(false);
  const [editNoteModal, setEditNoteModal] = useState(false);
  const contacts = useSelector((state) => state.contacts.allContacts.data);
  const [contact, setContact] = useState(null);
  const [notes, setNotes] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loadingActivities, setLoadingActivities] = useState(true);
  const [loadingNotes, setLoadingNotes] = useState(true);
  const [editingContact, setEditingContact] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [showReviewOverlay, setShowReviewOverlay] = useState(false);
  const [activityFilter, setActivityFilter] = useState(false);

  const globalEmailActivityData = useSelector((state) => state.clientDetails.globalEmailActivity);

  useEffect(() => {
    if (id && contacts?.length) {
      let contactData = contacts.find((contact) => contact.id == id);
      setContact(contactData);
      console.log(contactData);
      if (['GmailAI', 'Gmail'].includes(contactData.import_source) && contactData.approved_ai !== true) {
        setShowReviewOverlay(true);
      }
      getActivityLog();
      getNotes();
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
      })
      .catch((error) => {
        console.log(error);
        toast.error('Error fetching activity');
      });
  };
  useEffect(() => {
    if (contact) {
      syncEmailOfContact(contact.email).then(() => {
        setLoadingActivities(false);
      });
    }
  }, [contact]);

  useEffect(() => {
    if (globalEmailActivityData) {
      setActivities((prev) => [
        { type_of_activity_id: 1, description: globalEmailActivityData, created_at: new Date().toISOString() },
        ...prev,
      ]);
      setTimeout(() => {
        getActivityLog().then();
      }, [2000]);
    } else {
      dispatch(setGlobalEmail(undefined));
    }
  }, [globalEmailActivityData]);

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
            <div className="text-gray3 text-sm">{formatDateLL(item.created_at)}</div>
          </div>
        </div>
        {isEditable && (
          <FilterDropdown
            types={noteTypes}
            icon={<MoreVert className="w-5 text-gray4 cursor-pointer" />}
            data={item}
            positionClass="right-0"
          />
        )}
      </div>
    );
  };

  const handleEditActivity = () => {
    console.log('edit activity');
  };
  const [openCommunicationPopup, setOpenCommunicationPopup] = useState(false);

  const handleDeleteActivity = () => {
    console.log('delete activity');
  };

  const handleUpdateActivityLogsInNotes = () => {
    getActivityLog().then();
  };
  const handleEditNote = (note) => {
    setNoteToEdit(note);
    setEditNoteModal(true);
  };

  const handleDeleteNote = (note) => {
    setNoteToEdit(note);
    setNotes((prevNotes) => prevNotes.filter((noteItem) => noteItem.id !== note.id));
    deleteContactNote(note.contact_id, note.id).then(() => {
      handleUpdateActivityLogsInNotes();
    });
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
        {showReviewOverlay && (
          <ReviewContact
            showToast
            hideCloseButton
            redirectAfterMoveToTrash
            handleClose={() => setShowReviewOverlay(false)}
            title="Review AI Imported Contact"
            client={contact}
          />
        )}
        {!contact ? (
          <div className="relative h-full" style={{ height: 'calc(100vh - 68px) !important' }}>
            <Loader />
          </div>
        ) : (
          <div className="px-3 md:px-6 py-[21px] flex flex-col md:flex-row">
            <div className="w-full md:w-[300px]">
              <div className="bg-white px-3 md:px-6 py-[20px] client-details-box-shadow rounded-lg mb-3">
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
                        onClick={() => {
                          setActivities([
                            {
                              type_of_activity_id: 27,
                              description: 'Attempted to make a phone call.',
                              created_at: new Date().toISOString(),
                            },
                            ...activities,
                          ]);
                          addContactActivity(contact.id, {
                            type_of_activity_id: 27,
                            description: 'Attempted to make a phone call.',
                            created_at: new Date().toISOString(),
                          }).then(() => {
                            getContactActivities(contact.id).then((response) => setActivities(response.data.data));
                          });
                          window.open(`tel:${contact.phone_number}`);
                        }}
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
                  <div className="text-[#475467] mt-1 ellipsis-email w-[230px]" title={contact.email}>
                    {contact?.email}
                  </div>
                </div>
                <div className="mt-[18px] flex items-center">
                  <Button
                    size="small"
                    inline
                    white
                    label={
                      contact.category_1 === 'Other'
                        ? othersOptions.find((c) => c.id === contact.category_id)?.name
                        : contact.category_2
                    }
                    className="mr-2 text-xs pointer-events-none"
                  />
                  {contact.category_1 == 'Client' && contact.status_2 && contact.status_2 != 'Default' && (
                    <Button
                      size="small"
                      inline
                      white
                      label={allStatusesQuickEdit.clients.find((c) => contact.status_id === c.id).label}
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
                  {contact.category_1 == 'Client' && contact.status_1 != 'Dropped' && (
                    <div className="mb-[10px] w-full px-4 py-2 client-details-info-shadow border border-gray2 rounded-lg flex items-center text-sm font-medium ">
                      <span className="text-gray6 mr-3">Health:</span>
                      <DateChip
                        lastCommunication={contact.last_communication_date}
                        contactStatus={contact.status_2}
                        contactCategory={contact.category_1 === 'Client' ? 'clients' : 'professionals'}
                      />
                    </div>
                  )}
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
                <div className="bg-white px-3 md:px-6 py-[20px] client-details-box-shadow rounded-lg">
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

            <div className="flex-grow md:mx-3 order-last md:order-2">
              <div className="bg-white px-3 md:px-6 py-[20px] client-details-box-shadow rounded-lg mb-3">
                <div className="flex items-center justify-between">
                  <div className={'flex items-center'}>
                    <img src={communication.src} />
                    <Dropdown
                      initialSelect={activityTypesDropdown[0]}
                      options={activityTypesDropdown}
                      className="w-[180px] ml-3"
                      handleSelect={(choice) => setActivityFilter(choice)}
                    />
                    {/* <div className="text-gray8 ml-[6px] text-sm font-semibold">All Communication</div> */}
                  </div>
                  <button
                    onClick={() => setOpenCommunicationPopup(true)}
                    className="flex justify-center items-center gap-2 py-2 px-[14px] rounded-full bg-lightBlue1  hover:bg-lightBlue2">
                    <ChatBubbleOutlineOutlinedIcon className={'h-[18px] w-[18px] text-lightBlue5'} />
                    <span className={'text-sm font-semibold leading-5 text-lightBlue6'}>Start communication</span>
                  </button>
                </div>
                {/*{activities.length ? (*/}
                <Feeds
                  showFullHeight={contact?.category_1 != 'Client'}
                  contactId={id}
                  activityId={activityFilter.id}
                  contactEmail={contact.email}
                  activities={
                    activityFilter.id == 0 || !activityFilter
                      ? activities
                      : activities.filter((activity) => {
                          console.log(activityFilter, activity.type_of_activity_id);
                          if (activityFilter.id == 14) {
                            return [14, 15, 16].includes(activity.type_of_activity_id);
                          } else if (activityFilter.id == 3) {
                            return [3, 26, 27].includes(activity.type_of_activity_id);
                          }
                          return activity.type_of_activity_id == activityFilter.id;
                        })
                  }
                  setActivities={setActivities}
                />
                {/*) : (*/}
                {/*  <div className="mt-5 text-center">*/}
                {/*    <div className="text-gray7 font-semibold mb-2">No activities found</div>*/}
                {/*    <div className="text-gray5 text-sm mb-6">No activities have been logged for this client yet.</div>*/}
                {/*  </div>*/}
                {/*)}*/}
              </div>

              {contact?.category_1 == 'Client' && (
                <div className="bg-white px-3 md:px-6 py-[20px] client-details-box-shadow rounded-lg">
                  <PropertiesSection noSelect contactId={id} category={contact.category_2} />
                </div>
              )}
            </div>
            <div className="w-full md:w-[270px] order-1 md:order-3">
              <div className="bg-white px-3 md:px-6 py-[20px] client-details-box-shadow rounded-lg mb-3 relative">
                <div className="flex items-center justify-between pt-1">
                  <div className="text-gray8 font-semibold text-sm">Notes</div>
                  <div>
                    {notes && notes.length > 0 && (
                      <a href="#" className="cursor-pointer" onClick={() => setAddNoteModal(true)}>
                        <img src={addNote.src} className={'h-7  w-7'} />
                      </a>
                    )}
                  </div>
                </div>
                {notes === null ? (
                  <Loader />
                ) : !notes.length > 0 ? (
                  <div className="text-center mt-4">
                    <div className="text-gray7 font-semibold mb-2">No notes found</div>
                    <div className="text-gray5 text-sm mb-6">
                      You haven't created any notes for this client yet. To do so, simply hit the button below.
                    </div>
                    <Button onClick={() => setAddNoteModal(true)} primary label="Create Note" />
                  </div>
                ) : (
                  <SimpleBar style={{ maxHeight: '300px', marginTop: '30px', paddingRight: '15px' }}>
                    {notes.reverse().map((note, index) => (
                      <Item
                        isEditable
                        className={` ${notes.length - 1 != index && 'mb-[18px]'}`}
                        item={note}
                        icon={noteIcon.src}
                      />
                    ))}
                  </SimpleBar>
                )}
              </div>
              {documents.length > 0 && (
                <div className="bg-white px-3 md:px-6 py-[20px] client-details-box-shadow rounded-lg mb-3">
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
                <div className="bg-white px-3 md:px-6 py-[20px] client-details-box-shadow rounded-lg">
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
      {addNoteModal && (
        <NoteModal
          handleUpdateActivityLogsInNotes={handleUpdateActivityLogsInNotes}
          id={id}
          handleCloseModal={() => setAddNoteModal(false)}
          setNotes={setNotes}
        />
      )}
      {editNoteModal && (
        <NoteModal
          handleUpdateActivityLogsInNotes={handleUpdateActivityLogsInNotes}
          setNotes={setNotes}
          note={noteToEdit}
          id={id}
          handleCloseModal={() => setEditNoteModal(false)}
        />
      )}
      {openCommunicationPopup &&
        createPortal(
          <CommunicationForm
            handleCloseOverlay={() => setOpenCommunicationPopup(false)}
            client={contact}
            setActivities={setActivities}
          />,
          document.getElementById('modal-portal'),
        )}
      {editingContact && (
        <ReviewContact handleClose={() => setEditingContact(false)} client={contact} title="Edit Contact" />
      )}
    </>
  );
};

export default index;
