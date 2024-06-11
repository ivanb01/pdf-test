import React, { useState, useEffect } from 'react';
import { formatDateCalendar, formatDateStringMDY, formatDateLThour, daysBefore, timeAgo } from 'global/functions';
import Text from 'components/shared/text';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import FilterDropdown from 'components/shared/dropdown/FilterDropdown';
import More from '@mui/icons-material/MoreVert';
import { useFormik } from 'formik';
import TextArea from 'components/shared/textarea';
import * as contactServices from 'api/contacts';
import Dropdown from 'components/shared/dropdown';
import Overlay from 'components/shared/overlay';
import Button from 'components/shared/button';
import * as Yup from 'yup';
import { activityTypeIcons, activityTypes } from 'global/variables';
import { useDispatch } from 'react-redux';
import { setRefetchPart } from 'store/global/slice';
import { toast } from 'react-hot-toast';
import { setActivityLogData } from '@store/clientDetails/slice';
import SimpleBar from 'simplebar-react';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import TooltipComponent from '@components/shared/tooltip';
import EmailsPopup from '@components/overlays/email-threads';
import { getEmailsForSpecificContact } from '@api/email';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import Loader from '@components/shared/loader';
import DOMPurify from 'dompurify';
import NotesSkeleton from '@components/SkeletonLoaders/NotesSkeleton';
import GeneralSkeleton from '@components/SkeletonLoaders/GeneralSkeleton';

export default function Feeds({
  showFullHeight,
  contactId,
  activities,
  setActivities,
  activityId: filteredActivityType,
  contactEmail,
  showGmailInbox,
  setShowGmailInbox,
  loadingActivities,
}) {
  const dispatch = useDispatch();
  const [activityModal, setActivityModal] = useState(false);
  const [activityId, setActivityId] = useState(0);
  const [activityTypeToEdit, setActivityTypeToEdit] = useState(null);
  const [loadingButton, setLoadingButton] = useState(false);
  const [openEmailsPopup, setOpenEmailsPopup] = useState(false);
  const [inboxLoading, setInboxLoading] = useState(false);
  const [inboxData, setInboxData] = useState([]);
  const [threadData, setThreadData] = useState([]);
  const AddActivitySchema = Yup.object().shape({
    type_of_activity_id: Yup.string().required('No selected activity'),
    // description: Yup.string().required('Description required'),
  });

  useEffect(() => {
    if (showGmailInbox) {
      console.log(showGmailInbox);
      setInboxLoading(true);
      getEmailsForSpecificContact(contactEmail).then((res) => {
        setInboxData(res.data);
        setInboxLoading(false);
      });
    }
  }, [showGmailInbox]);
  //* FORMIK *//
  const formik = useFormik({
    initialValues: {
      type_of_activity_id: '',
      description: '',
    },
    validationSchema: AddActivitySchema,
    onSubmit: (values) => {
      handleUpdateActivity(values);
    },
  });

  const { errors, touched, resetForm } = formik;

  const handleCloseModal = () => {
    setActivityModal(false);
    setActivityId(0);
    resetForm();
  };

  const handleChooseActivityType = (id) => {
    formik.setFieldValue('type_of_activity_id', id);
  };

  const handleEditActivity = (activity) => {
    formik.setValues({
      type_of_activity_id: activity.type_of_activity_id,
      description: activity.description,
    });
    setActivityId(activity.id);
    setActivityModal(true);
    const found = activityTypes.find((element) => element.id == activity.type_of_activity_id);
    setActivityTypeToEdit(found.label);
  };

  const handleUpdateActivity = async (values) => {
    setLoadingButton(true);
    let todayDate = Date.now();
    try {
      const updatedActivity = activities.map((activity) => {
        if (activity.id === activityId) {
          return { ...activity, ...values, updated_at: todayDate };
        }
        return activity;
      });
      dispatch(setActivityLogData(updatedActivity));
      setLoadingButton(false);
      handleCloseModal();
      contactServices
        .updateContactActivity(contactId, activityId, values)
        .then(() => dispatch(setRefetchPart('activity-log')));
      toast.success('Activity log updated successfully!');
    } catch (error) {
      toast.error('There was an error while editing activity log: ', error);
      setLoadingButton(false);
    }
  };
  const handleDeleteActivity = async (activity) => {
    try {
      const filteredActivities = activities.filter((item) => item.id !== activity.id);
      setActivities(filteredActivities);
      toast.success('Activity was deleted successfully!');
      contactServices.deleteContactActivity(contactId, activity.id);
    } catch (error) {
      toast.error('There was a problem deleting the activity!');
    }
  };

  useEffect(() => {
    if (document.querySelector('.client-details-wrapper')) {
      if (activityModal) {
        document.querySelector('.client-details-wrapper').style.setProperty('z-index', '0', 'important');
      } else {
        document.querySelector('.client-details-wrapper').style.setProperty('z-index', '10', 'important');
      }
    }
  }, [activityModal]);

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
  const [threadId, setThreadId] = useState();
  useEffect(() => {
    if (openEmailsPopup) {
      setThreadData(inboxData[threadId]);
    }
  }, [inboxData, threadId]);

  function truncateText(text, maxLength = 200) {
    console.log(text);
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  }

  return (
    <>
      {!showGmailInbox &&
        (loadingActivities ? (
          <GeneralSkeleton className="mt-6" />
        ) : activities.length > 0 ? (
          <SimpleBar className=" -mx-3 lg:-mx-6 px-3 lg:px-6" style={{ height: '285px', marginTop: '24px' }}>
            <ul role="list" className={`${activities.length > 0 && ''}`}>
              {activities
                ?.slice()
                .sort((a, b) => b.id - a.id)
                .map((activityItem, activityItemIdx) => (
                  <li key={activityItemIdx}>
                    <div className="relative pb-8 flex justify-between">
                      {activityItemIdx !== activities.length - 1 ? (
                        <span
                          style={{ zIndex: '0 !important' }}
                          className="absolute top-5 left-4 -ml-px h-full w-0.5 bg-gray-200"
                          aria-hidden="true"
                        />
                      ) : null}
                      <div className="relative flex items-start space-x-3">
                        <>
                          <div className="relative">
                            <div className="h-8 w-8 bg-gray-100 rounded-full ring-8 ring-white flex items-center justify-center">
                              {activityTypeIcons[activityItem.type_of_activity_id] ?? (
                                <DescriptionOutlinedIcon className="h-5 w-5 text-gray-500" />
                              )}
                            </div>
                          </div>
                          <div className="min-w-0 flex-1">
                            {activityItem.created_at && (
                              <p className="mt-0.5 text-sm text-gray-500 w-fit">
                                <TooltipComponent
                                  side={'right'}
                                  align="center"
                                  triggerElement={
                                    <div className={'mr-3'}>
                                      {formatDateCalendar(activityItem.created_at).includes('AM') ||
                                      formatDateCalendar(activityItem.created_at).includes('AM') ||
                                      formatDateCalendar(activityItem.created_at).includes('Last') ||
                                      formatDateCalendar(activityItem.created_at).includes('Yesterday') ||
                                      formatDateCalendar(activityItem.created_at).includes('Today')
                                        ? formatDateCalendar(activityItem.created_at)
                                        : daysBefore(activityItem.created_at)}
                                    </div>
                                  }>
                                  <h1 className={'text-sm'}>
                                    {formatDateCalendar(activityItem.created_at).includes('AM') ||
                                    formatDateCalendar(activityItem.created_at).includes('PM')
                                      ? formatDateStringMDY(activityItem.created_at)
                                      : formatDateCalendar(activityItem.created_at) +
                                        ' - ' +
                                        formatDateLThour(activityItem.created_at)}
                                  </h1>
                                </TooltipComponent>
                              </p>
                            )}
                            {activityItem.updated_at && (
                              <p className="mt-0.5 text-sm text-gray-500 w-fit">
                                <TooltipComponent
                                  side={'right'}
                                  align="center"
                                  triggerElement={
                                    <div>
                                      Updated:{' '}
                                      {formatDateCalendar(activityItem.updated_at).includes('AM') ||
                                      formatDateCalendar(activityItem.updated_at).includes('AM') ||
                                      formatDateCalendar(activityItem.updated_at).includes('Last') ||
                                      formatDateCalendar(activityItem.updated_at).includes('Yesterday') ||
                                      formatDateCalendar(activityItem.updated_at).includes('Today')
                                        ? formatDateCalendar(activityItem.updated_at)
                                        : daysBefore(activityItem.updated_at)}
                                    </div>
                                  }>
                                  <h1 className={'text-sm'}>
                                    {formatDateCalendar(activityItem.updated_at).includes('AM') ||
                                    formatDateCalendar(activityItem.updated_at).includes('PM')
                                      ? formatDateStringMDY(activityItem.updated_at)
                                      : formatDateCalendar(activityItem.updated_at) +
                                        ' - ' +
                                        formatDateLThour(activityItem.updated_at)}
                                  </h1>
                                </TooltipComponent>
                                {/* Commented 6d ago */}
                              </p>
                            )}
                            <div className="mt-2 text-sm text-gray6 break-word">
                              <code></code>
                              <ActivityDescription activityItem={activityItem} />
                            </div>
                          </div>
                        </>
                      </div>
                      {/* {activityItem.contact_id && (
                        <div className="flex mr-3">
                          <FilterDropdown
                            types={[types[1]]}
                            icon={<More className="w-5 text-gray4 cursor-pointer" />}
                            data={activityItem}
                            side={"left"}
                            align={"center"}
                            positionClass="right-7 top-0"
                          />
                        </div>
                      )} */}
                    </div>
                  </li>
                ))}
            </ul>
          </SimpleBar>
        ) : (
          <div className="mt-5 text-center h-[265px] flex flex-col justify-center align-center">
            <div className="text-gray7 font-semibold mb-2">No activities found</div>
            <div className="text-gray5 text-sm mb-6">No activities have been logged for this client yet.</div>
          </div>
        ))}
      {showGmailInbox ? (
        inboxLoading ? (
          <GeneralSkeleton className="mt-4" roundedIcon={false} rows={6} />
        ) : !inboxLoading ? (
          Object.values(inboxData).length > 0 ? (
            <div className="bg-white">
              {openEmailsPopup && (
                <EmailsPopup
                  inboxData={inboxData}
                  setInboxData={setInboxData}
                  threadData={threadData}
                  contactEmail={contactEmail}
                  handleClose={() => setOpenEmailsPopup(false)}
                />
              )}
              <SimpleBar
                style={{
                  height: '285px',
                  paddingRight: '-10px',
                  margin: '0 -25px',
                  padding: '0 25px',
                }}
                autoHide>
                <ul role="list" className={`flex flex-col gap-8`}>
                  {Object.values(inboxData).flatMap((item) => (
                    <div
                      className={'flex gap-3'}
                      onClick={() => {
                        setThreadId(item[0]?.thread_id);
                        setOpenEmailsPopup(true);
                      }}
                      role={'button'}
                      key={item[0].thread_id}>
                      <div
                        className={'h-8 relative w-8 bg-gray1 flex items-center justify-center rounded-full shrink-0'}>
                        <InboxOutlinedIcon className={'h-5 w-5 text-gray5'} />
                        <span
                          style={{ zIndex: '0 !important' }}
                          className="absolute top-[36px] left-4 -ml-px h-full w-0.5 bg-gray-200"
                          aria-hidden="true"
                        />
                      </div>
                      <div>
                        <div className={'flex items-center  flex-wrap'}>
                          <h6 className={'text-[14px] font-bold mr-2'}>
                            {item[0]?.subject?.length === 0 ? '(no subject)' : item[0].subject}
                          </h6>
                          <p className={'text-[#475467] text-sm font-medium'}>{timeAgo(item[0].sent_date)}</p>
                        </div>
                        <div className="break-word gmail-renderings w-full overflow-hidden ">
                          <span
                            dangerouslySetInnerHTML={{
                              __html: item[0]?.body
                                ? truncateText(DOMPurify.sanitize(item[0].body))
                                : truncateText(
                                    DOMPurify.sanitize(
                                      item[0].html_body?.replace(/<\/?[^>]+(>|$)|&[a-zA-Z0-9#]+;/g, ''),
                                    ),
                                  ),
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </ul>
              </SimpleBar>
            </div>
          ) : (
            <div className="mt-5 text-center h-[265px] flex flex-col justify-center align-center">
              <div className="text-gray7 font-semibold mb-2">No activities found</div>
              <div className="text-gray5 text-sm mb-6">No activities have been logged for this client yet.</div>
            </div>
          )
        ) : null
      ) : null}

      {activityModal && (
        <Overlay className="w-[550px]" handleCloseOverlay={handleCloseModal} title="Edit Activity">
          <div className="p-5 bg-white">
            <form onSubmit={formik.handleSubmit}>
              <Dropdown
                label="Type"
                placeHolder="Choose"
                activeIcon={false}
                options={activityTypes}
                className="mb-6 w-[100%]"
                // activeClasses="bg-lightBlue1"
                handleSelect={(item) => handleChooseActivityType(item.id)}
                initialSelect={activityTypeToEdit}
                error={errors.type_of_activity_id && touched.type_of_activity_id}
                errorText={errors.type_of_activity_id}
              />
              <TextArea
                className="min-h-[120px]"
                id="description"
                label="Description"
                handleChange={formik.handleChange}
                value={formik.values.description}
                error={errors.description && touched.description}
                errorText={errors.description}></TextArea>
              <div className="flex flex-row justify-end mt-6">
                <Button className="mr-3" white label="Cancel" onClick={handleCloseModal} />
                <Button type="submit" primary label="Save" loading={loadingButton} />
              </div>
            </form>
          </div>
        </Overlay>
      )}
    </>
  );
}

const ActivityDescription = ({ activityItem }) => {
  const htmlString = `${activityItem?.description}`;

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  const h6Content = doc.querySelector('h6')?.textContent;
  const subjectContent = doc.querySelector('p')?.textContent;

  const [showFullContent, setShowFullContent] = useState(false);

  const isContentLong = h6Content && h6Content.length > 88;

  return activityItem?.type_of_activity_id === 1 ? (
    <div>
      <div style={{ display: 'flex', gap: '2px', flexDirection: 'column' }}>
        <p>[Email Sent] </p>
        <p className={'font-bold'}>{subjectContent}</p>
      </div>
      {h6Content && (
        <h6>
          {isContentLong && !showFullContent ? `${h6Content.slice(0, 88)}... ` : h6Content}
          {isContentLong && (
            <span className={'text-lightBlue5 cursor-pointer'} onClick={() => setShowFullContent(!showFullContent)}>
              {showFullContent ? ' See less' : ' See more'}
            </span>
          )}
        </h6>
      )}
    </div>
  ) : (
    activityItem.description
  );
};
