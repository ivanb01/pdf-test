import MainMenu from '@components/shared/menu';
import profile from '/public/images/Portrait_Placeholder.png';
import noteIcon from '/public/images/note-icon.svg';
import documentsIcon from '/public/images/documents-icon.svg';
import SimpleBar from 'simplebar-react';
import email from '/public/images/icons/email.svg';
import call from '/public/images/call-icon.svg';
import edit from '/public/images/edit-icon.svg';
import addNote from '/public/images/add-note.svg';
import Button from '@components/shared/button';
import DateChip from '@components/shared/chip/date-chip';
import React, { useEffect, useState } from 'react';
import { formatDateLL, formatPhoneNumber } from '@global/functions';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import PropertiesSection from '@components/PropertiesSection';
import Loader from '@components/shared/loader';
import { addContactActivity, deleteContactNote, getContactActivities, getContactNotes } from '@api/contacts';
import toast from 'react-hot-toast';
import ReviewContact from '@components/overlays/review-contact';
import Feeds from '@components/shared/feeds';
import FilterDropdown from '@components/shared/dropdown/FilterDropdown';
import { Delete, Edit } from '@mui/icons-material';
import Text from '@components/shared/text';
import MoreVert from '@mui/icons-material/MoreVert';
import NoteModal from '@components/overlays/note-modal';
import { allStatusesQuickEdit, othersOptions } from '@global/variables';
import { setRefetchActivityLog } from '@store/clientDetails/slice';
import { syncEmailOfContact } from '@api/email';
import { getContactCampaigns } from '@api/campaign';
import AssignUnassignContactToCampaign from '@components/shared/AssignUnassignContactToCampaign';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import GeneralSkeleton from '@components/SkeletonLoaders/GeneralSkeleton';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import SpinnerLoader from '@components/shared/SpinnerLoader';

import { setContactToBeEmailed, setOpenEmailContactOverlay } from '@store/global/slice';
const index = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const [noteId, setNoteId] = useState(0);
  const [addNoteModal, setAddNoteModal] = useState(false);
  const [editNoteModal, setEditNoteModal] = useState(false);
  const contacts = useSelector((state) => state.contacts.allContacts.data);
  const refetchActivityLog = useSelector((state) => state.clientDetails.refetchActivityLog);
  const [contact, setContact] = useState(null);
  const [notes, setNotes] = useState([]);
  const [activities, setActivities] = useState([]);
  const [editingContact, setEditingContact] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [showReviewOverlay, setShowReviewOverlay] = useState(false);
  const [activityFilter, setActivityFilter] = useState(false);
  const [showGmailInbox, setShowGmailInbox] = useState(false);
  const [notesOffset, setNotesOffset] = useState(0);
  const [loadingNotes, setLoadingNotes] = useState(true);
  const [notesHasNextPage, setNotesHasNextPage] = useState(true);
  const [activitiesOffset, setActivitiesOffset] = useState(0);
  const [loadingActivities, setLoadingActivities] = useState(true);
  const [activitiesHasNextPage, setActivitiesHasNextPage] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    if (id && contacts?.length) {
      let contactData = contacts.find((contact) => contact.id == id);
      setContact(contactData);

      getCampaigns();
    }
  }, [contacts, id]);

  useEffect(() => {
    if (id) {
      setLoadingNotes(true);
      setLoadingActivities(true);
      getContactNotes(id, notesOffset)
        .then((paginationResponse) => {
          setNotes(paginationResponse.data);
          setNotesOffset(notesOffset + paginationResponse.data.count);
          setLoadingNotes(false);
        })
        .catch((error) => {
          toast.error('Error fetching notes');
        });
      getContactActivities(id, activitiesOffset)
        .then((paginationResponse) => {
          setActivities(paginationResponse?.data);
          setActivitiesOffset(activitiesOffset + paginationResponse?.data?.count);
          setLoadingActivities(false);
        })
        .catch((err) => {
          console.log(err, 'err');
          toast.error('Error fetching activity log');
        });
    }
  }, [id]);

  async function loadMoreNotes() {
    try {
      const { data, count, notesHasNextPage: newNotesHasNextPage } = await getNotes(id, notesOffset);
      setNotes((current) => {
        return {
          ...current,
          data: [...current.data, ...data],
          count: count,
        };
      });

      setNotesOffset(notesOffset + count);

      setNotesHasNextPage(newNotesHasNextPage);
      if (count == 0) {
        setNotesHasNextPage(false);
        return;
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoadingNotes(false);
    }
  }

  async function loadMoreActivities() {
    try {
      const {
        data,
        count,
        activitiesHasNextPage: newActivitiesHasNextPage,
      } = await getActivityLog(id, activitiesOffset);
      setActivities((current) => {
        return {
          ...current,
          data: [...current.data, ...data],
          count: count,
        };
      });

      setActivitiesOffset(activitiesOffset + count);

      setActivitiesHasNextPage(newActivitiesHasNextPage);
      if (count == 0) {
        setActivitiesHasNextPage(false);
        return;
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoadingActivities(false);
    }
  }

  const [infiniteRef] = useInfiniteScroll({
    loading: loadingNotes,
    hasNextPage: notesHasNextPage,
    onLoadMore: loadMoreNotes,
    disabled: !!error,
  });
  const [activitiesInfiniteRef] = useInfiniteScroll({
    loading: loadingActivities,
    hasNextPage: activitiesHasNextPage,
    onLoadMore: loadMoreActivities,
    disabled: !!error,
  });

  const getNotes = () => {
    return getContactNotes(id, notesOffset)
      .then((response) => {
        return {
          notesHasNextPage: true,
          data: response.data.data,
          count: response.data.count,
          total: response.data.total,
        };
      })
      .catch((error) => {
        console.log(error);
        toast.error('Error fetching notes');
      });
  };

  const getActivityLog = async () => {
    return getContactActivities(id, activitiesOffset)
      .then((response) => {
        return {
          activitiesHasNextPage: true,
          data: response?.data.data,
          count: response?.data.count,
          total: response?.data.total,
        };
      })
      .catch((error) => {
        toast.error('Error fetching activity');
      });
  };
  const getCampaigns = async () => {
    getContactCampaigns(id)
      .then((response) => {
        setCampaigns(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error('Error fetching campaign');
      });
  };
  useEffect(() => {
    if (contact) {
      syncEmailOfContact(contact.email).catch((error) => {
        console.log(error);
        toast.error('Error fetching gmail inbox');
      });
    }
  }, [contact]);

  useEffect(() => {
    if (refetchActivityLog) {
      getActivityLog();
      dispatch(setRefetchActivityLog(false));
    }
  }, [refetchActivityLog]);

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
      <div className="flex justify-between break-word">
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
    setNotes((prevNotes) => ({
      ...prevNotes,
      data: prevNotes.data.filter((noteItem) => noteItem.id !== note.id),
    }));
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
        <div className={'sticky z-[9] top-0'}>
          <MainMenu />
        </div>
        {['GmailAI', 'Gmail'].includes(contact?.import_source) && contact?.approved_ai !== true && (
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
          <div className="px-3 lg:px-6 py-[21px] flex flex-col lg:flex-row">
            <div className="w-full lg:w-[290px]">
              <div className="bg-white px-3 lg:px-6 py-[20px] client-details-box-shadow rounded-lg mb-3">
                <div className="flex items-center justify-between">
                  <div className="bg-white rounded-full w-[105px] h-[105px] custom-box-shadow flex items-center justify-center">
                    <img
                      src={contact.profile_image_path ? contact.profile_image_path : profile.src}
                      className="h-[95px] w-[95px] rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <Button onClick={() => setEditingContact(true)} white inline leftIcon={<img src={edit.src} />} />
                  </div>
                </div>
                <div className="mt-6">
                  <div className="text-[#101828] text-xl font-semibold break-word">
                    {contact?.first_name + ' ' + contact?.last_name}
                  </div>
                  <p className={'text-sm font-medium'}>{contact?.email}</p>
                </div>
                <div className={'py-3 flex gap-[6px] text-[#475467] items-center'}>
                  <div
                    className={
                      'p-1.5 flex justify-center items-center  border border-#D1D5DB text-sm  font-medium rounded-md shadow-sm text-gray6 hover:bg-white bg-white'
                    }
                    role={'button'}
                    onClick={() => {
                      let clientToBeEmailed = {
                        value: contact.id,
                        label: `${contact.first_name} ${contact.last_name} - ${contact.email}`,
                        first_name: contact.first_name,
                        last_name: contact.last_name,
                        email: contact.email,
                        profile_image_path: contact.profile_image_path,
                      };
                      dispatch(setContactToBeEmailed(clientToBeEmailed));
                      dispatch(setOpenEmailContactOverlay(true));
                    }}>
                    <img src={email.src} style={{ height: '15px' }} />
                  </div>
                  <p className={'text-sm font-medium'}>{contact?.email}</p>
                </div>
                {contact?.phone_number ? (
                  <div className={'pt-1 pb-[9px] flex gap-[6px] text-[#475467] items-center'}>
                    <div
                      className={
                        'p-1.5 flex justify-center items-center  border border-#D1D5DB text-sm  font-medium rounded-md shadow-sm text-gray6 hover:bg-white bg-white'
                      }
                      role={'button'}
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
                        });
                        window.open(`tel:${contact.phone_number}`);
                      }}>
                      <img src={call.src} style={{ height: '15px' }} />
                    </div>
                    <p className={'text-sm font-medium'}>{formatPhoneNumber(contact?.phone_number)}</p>
                  </div>
                ) : (
                  <div className={'bg-red1 px-3 py-2 flex gap-[8px] items-start w-max rounded-md mt-[14px] pr-4'}>
                    <WarningRoundedIcon className={'text-red5 h-5 w-5'} />
                    <div className={'text-[#991B1B]'}>
                      <p className={'text-sm font-semibold'}>Phone number is missing! </p>
                    </div>
                  </div>
                )}
                <div className="mt-[18px] flex items-center">
                  <a className="mr-3 text-gray6 bg-gray-100 rounded-md px-3 py-[6px] text-xs font-medium uppercase">
                    {contact.category_1 === 'Other'
                      ? othersOptions.find((c) => c.id === contact.category_id)?.name
                      : contact.category_2}
                  </a>
                  {contact.category_1 == 'Client' && contact.status_2 && contact.status_2 != 'Default' && (
                    <a
                      className={`${
                        allStatusesQuickEdit.clients.find((c) => contact.status_id === c.id).color
                      } text-neutral1 rounded-xl px-3 py-[6px] text-xs font-medium`}>
                      {allStatusesQuickEdit.clients.find((c) => contact.status_id === c.id).label}
                    </a>
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
                        contact={contact}
                        lastCommunication={contact.last_communication_date}
                        contactStatus={contact.status_2}
                        contactCategory={contact.category_1 === 'Client' ? 'clients' : 'professionals'}
                      />
                    </div>
                  )}
                  {contact.priority && (
                    <div className="mb-[10px] w-full px-4 py-2 client-details-info-shadow border border-gray2 rounded-lg flex items-center text-sm font-medium">
                      <span className="text-gray6 mr-3">Priority:</span>
                      <div className="flex items-center">
                        <span className={`block h-2 w-2 mr-1 rounded-full bg-red3`} />
                        <span className="text-gray7">{contact.priority}</span>
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
              {campaigns?.campaigns_assigned?.length +
                campaigns?.campaigns_never_assigned?.length +
                campaigns?.campaigns_unassigned?.length >
                0 && (
                <div className="bg-white px-3 mb-3 lg:px-6 py-[20px] client-details-box-shadow rounded-lg">
                  <div className="font-semibold text-gray8 text-[14px]">Campaigns</div>

                  <>
                    <div className="flex items-center justify-between text-gray4 text-sm mt-8 mb-3">
                      <div>Name</div>
                      <div>Status</div>
                    </div>
                    {campaigns.campaigns_assigned?.map((campaign, index) => (
                      <>
                        <div key={index} className="flex justify-between items-center">
                          <div className="text-gray7 text-sm font-medium max-w-[180px]">{campaign.name}</div>
                          <AssignUnassignContactToCampaign
                            campaignId={campaign.id}
                            active={true}
                            handleUnassign={() => getCampaigns()}
                            activePerson={{ ...contact, contact_id: contact.id }}
                          />
                        </div>
                        {campaigns.length - 1 !== index && <hr className="my-[18px]" />}
                      </>
                    ))}
                    {campaigns.campaigns_never_assigned?.map((campaign, index) => (
                      <>
                        <div key={index} className="flex justify-between items-center">
                          <div className="text-gray7 text-sm font-medium max-w-[180px]">{campaign.name}</div>
                          <AssignUnassignContactToCampaign
                            campaignId={campaign.id}
                            active={false}
                            handleUnassign={() => getCampaigns()}
                            activePerson={{ ...contact, contact_id: contact.id }}
                          />
                        </div>
                        {campaigns.length - 1 !== index && <hr className="my-[18px]" />}
                      </>
                    ))}
                    {campaigns.campaigns_unassigned?.map((campaign, index) => (
                      <>
                        <div key={index} className="flex justify-between items-center">
                          <div className="text-gray7 text-sm font-medium max-w-[180px]">{campaign.name}</div>
                          <AssignUnassignContactToCampaign
                            campaignId={campaign.id}
                            active={false}
                            disabled={true}
                            handleUnassign={() => getCampaigns()}
                            activePerson={{ ...contact, contact_id: contact.id }}
                          />
                        </div>
                        {campaigns.length - 1 !== index && <hr className="my-[18px]" />}
                      </>
                    ))}
                  </>
                </div>
              )}
            </div>

            <div className="flex-grow lg:mx-3 order-last lg:order-2">
              {/* <div className="bg-white px-3 lg:px-6 py-[20px] client-details-box-shadow rounded-lg mb-3">
                <div className="flex items-center justify-between">
                  <div className={'flex items-center'}>
                    <Dropdown
                      initialSelect={activityTypesDropdown[0]}
                      options={activityTypesDropdown}
                      className="w-[180px]"
                      handleSelect={(choice) => {
                        setActivityFilter(choice);
                        setShowGmailInbox(false);
                      }}
                    />
                    <button
                      onClick={() => setShowGmailInbox(!showGmailInbox)}
                      className={`ml-2 flex justify-center items-center gap-2 py-2 px-[14px] rounded-full border-borderColor border ${
                        showGmailInbox && 'border-lightBlue3'
                      }`}>
                      <MailOutline
                        className={`h-[18px] w-[18px] ${showGmailInbox ? 'text-lightBlue3' : 'text-[#7A808D]'} `}
                      />
                      <span
                        className={`responsive-fix text-sm leading-5 ${
                          showGmailInbox ? 'text-lightBlue3 font-medium' : 'text-gray-700'
                        }`}>
                        Gmail Inbox
                      </span>
                    </button>
                  </div>
                  <button
                    onClick={() => setOpenCommunicationPopup(true)}
                    className="flex justify-center items-center gap-2 py-2 px-[14px] rounded-full bg-lightBlue1  hover:bg-lightBlue2">
                    <ChatBubbleOutlineOutlinedIcon className={'h-[18px] w-[18px] text-lightBlue5'} />
                    <span className={'responsive-fix text-sm font-semibold leading-5 text-lightBlue6'}>
                      Start communication
                    </span>
                  </button>
                </div>
                <Feeds
                  showFullHeight={contact?.category_1 != 'Client'}
                  contactId={id}
                  activityId={activityFilter.id}
                  contactEmail={contact.email}
                  showGmailInbox={showGmailInbox}
                  setShowGmailInbox={setShowGmailInbox}
                  loadingActivities={loadingActivities}
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
              </div> */}

              <div className="bg-white px-3 lg:px-6 py-[20px] client-details-box-shadow rounded-lg mb-3">
                <div className="text-gray8 font-semibold text-[14px] mb-4">Gmail Inbox</div>
                <div>
                  <Feeds
                    showFullHeight={contact?.category_1 != 'Client'}
                    contactId={id}
                    activityId={activityFilter.id}
                    activitiesInfiniteRef={activitiesInfiniteRef}
                    activitiesHasNextPage={activitiesHasNextPage}
                    contactEmail={contact.email}
                    showGmailInbox={true}
                    setShowGmailInbox={setShowGmailInbox}
                    loadingActivities={loadingActivities}
                    activities={
                      activityFilter.id == 0 || !activityFilter
                        ? activities?.data
                        : activities?.data?.filter((activity) => {
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
                </div>
              </div>

              {contact?.category_1 == 'Client' && (
                <div className="bg-white px-3 lg:px-6 py-[20px] client-details-box-shadow rounded-lg">
                  <PropertiesSection noSelect contactId={id} category={contact.category_2} />
                </div>
              )}
            </div>
            <div className="w-full lg:w-[250px] order-1 lg:order-3">
              <div className="bg-white px-3 lg:px-6 py-[20px] client-details-box-shadow rounded-lg mb-3 relative">
                <div className="flex items-center justify-between">
                  <div className="text-gray8 font-semibold text-[14px]">Notes</div>
                  <div>
                    {notes && notes?.data?.length > 0 && (
                      <a href="#" className="cursor-pointer" onClick={() => setAddNoteModal(true)}>
                        <img src={addNote.src} className={'h-7  w-7'} />
                      </a>
                    )}
                  </div>
                </div>
                {loadingNotes ? (
                  <GeneralSkeleton className=" mt-4" rows={2} />
                ) : notes?.data?.length > 0 ? (
                  <SimpleBar
                    className="-mx-3 lg:-mx-6 px-3 lg:px-6"
                    style={{ maxHeight: '300px', marginTop: '30px', paddingRight: '15px' }}>
                    <div>
                      {notes?.data
                        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                        .map((note, index) => (
                          <Item
                            isEditable
                            className={` ${notes?.data?.length - 1 != index && 'mb-[18px]'}`}
                            item={note}
                            icon={noteIcon.src}
                          />
                        ))}
                      {notesHasNextPage && (
                        <div ref={infiniteRef}>
                          <SpinnerLoader />
                        </div>
                      )}
                    </div>
                  </SimpleBar>
                ) : (
                  <div className="text-center mt-4">
                    <div className="text-gray7 font-semibold mb-2">No notes found</div>
                    <div className="text-gray5 text-sm mb-6">
                      You haven't created any notes for this client yet. To do so, simply hit the button below.
                    </div>
                    <Button onClick={() => setAddNoteModal(true)} primary label="Create Note" />
                  </div>
                )}
              </div>
              {documents.length > 0 && (
                <div className="bg-white px-3 lg:px-6 py-[20px] client-details-box-shadow rounded-lg mb-3">
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
                <div className="bg-white px-3 lg:px-6 py-[20px] client-details-box-shadow rounded-lg">
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
              <div className="bg-white px-3 lg:px-6 py-[20px] client-details-box-shadow rounded-lg mb-3">
                <div className="text-gray8 font-semibold text-[14px]">Activity Log</div>
                <div>
                  <Feeds
                    showFullHeight={contact?.category_1 != 'Client'}
                    contactId={id}
                    loadingActivities={loadingActivities}
                    activityId={activityFilter.id}
                    contactEmail={contact.email}
                    activitiesInfiniteRef={activitiesInfiniteRef}
                    activitiesHasNextPage={activitiesHasNextPage}
                    showGmailInbox={showGmailInbox}
                    setShowGmailInbox={setShowGmailInbox}
                    activities={
                      activityFilter.id == 0 || !activityFilter
                        ? activities
                        : activities?.data?.filter((activity) => {
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
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {addNoteModal && (
        <NoteModal
          handleUpdateActivityLogsInNotes={handleUpdateActivityLogsInNotes}
          id={id}
          notesOffset={notesOffset}
          handleCloseModal={() => setAddNoteModal(false)}
          setNotes={setNotes}
          setLoadingNotes={setLoadingNotes}
          setNotesOffset={setNotesOffset}
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
      {/* {openCommunicationPopup &&
        createPortal(
          <CommunicationForm
            handleCloseOverlay={() => setOpenCommunicationPopup(false)}
            client={contact}
            setActivities={setActivities}
          />,
          document.getElementById('modal-portal'),
        )} */}
      {editingContact && (
        <ReviewContact handleClose={() => setEditingContact(false)} client={contact} title="Edit Contact" />
      )}
    </>
  );
};

export default index;
