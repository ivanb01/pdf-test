import React, { useState, useEffect } from 'react';
import { ChatAltIcon, TagIcon, UserCircleIcon, PhoneIcon, MailIcon, ChatAlt2Icon } from '@heroicons/react/solid';
import {
  formatDate,
  formatDateAgo,
  formatDateCalendar,
  formatDateLL,
  formatDateStringMDY,
  formatDateLThour,
  formatDateMDY,
  daysBefore,
} from 'global/functions';
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
import { activityTypes } from 'global/variables';
import { useDispatch, useSelector } from 'react-redux';
import { setRefetchData, setRefetchPart } from 'store/global/slice';
import { toast } from 'react-hot-toast';
import { setActivityLogData } from '@store/clientDetails/slice';
import SimpleBar from 'simplebar-react';

import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import Mail from '@mui/icons-material/Mail';
import TooltipComponent from '@components/shared/tooltip';

const activitiesTypes = {
  1: <MailIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />,
  2: <ChatAltIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />,
  3: <PhoneIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />,
  4: <ChatAlt2Icon className="h-5 w-5 text-gray-500" aria-hidden="true" />,
  5: <UserCircleIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />,
  6: <TagIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />,
};
export default function Feeds({ showFullHeight, contactId, activities, setActivities, height }) {
  const placeholderDescription = (activity_type) => {
    if (activity_type == 1) {
      return 'Email Sent to contact';
    }
    if (activity_type == 2) {
      return 'SMS sent to contact';
    }
    if (activity_type == 3) {
      return 'Phone Call with contact';
    }
    if (activity_type == 4) {
      return 'Contacted on Social Media';
    }
    if (activity_type == 5) {
      return 'Contacted in person';
    }
  };

  const dispatch = useDispatch();
  const [activityModal, setActivityModal] = useState(false);
  const [activityId, setActivityId] = useState(0);
  const [activityTypeToEdit, setActivityTypeToEdit] = useState(null);
  const [loadingButton, setLoadingButton] = useState(false);

  const AddActivitySchema = Yup.object().shape({
    type_of_activity_id: Yup.string().required('No selected activity'),
    // description: Yup.string().required('Description required'),
  });

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

  return (
    <>
      <div className="bg-white">
        <SimpleBar
          style={{
            maxHeight: showFullHeight ? '100%' : '280px',
            paddingRight: '-10px',
          }}
          autoHide>
          <ul role="list" className={`${activities.length > 0 && 'pt-6'}`}>
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
                            {activitiesTypes[activityItem.type_of_activity_id] ?? (
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
                                    Created:{' '}
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
                          <div className="mt-2 text-sm text-gray6">
                            <p>
                              {activityItem.description
                                ? activityItem.description
                                : placeholderDescription(activityItem.type_of_activity_id)}
                            </p>
                          </div>
                        </div>
                      </>
                    </div>
                    {activityItem.contact_id && (
                      <div className="flex mr-3">
                        <FilterDropdown
                          types={[1, 2, 3, 4, 5, 6].includes(activityItem.type_of_activity_id) ? types : [types[1]]}
                          icon={<More className="w-5" />}
                          data={activityItem}
                          positionClass="right-7 top-0"
                        />
                      </div>
                    )}
                  </div>
                </li>
              ))}
          </ul>
        </SimpleBar>
      </div>
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
