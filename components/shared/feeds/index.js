import { useState } from 'react';
import {
  ChatAltIcon,
  TagIcon,
  UserCircleIcon,
  PhoneIcon,
  MailIcon,
  ChatAlt2Icon,
} from '@heroicons/react/solid';
import { formatDateAgo } from 'global/functions';
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
import { useDispatch } from 'react-redux';
import { setRefetchData } from 'store/global/slice';

const activitiesTypes = {
  1: <MailIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />,
  2: <ChatAltIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />,
  3: <PhoneIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />,
  4: <ChatAlt2Icon className="h-5 w-5 text-gray-500" aria-hidden="true" />,
  5: <UserCircleIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />,
  6: <TagIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />,
};
export default function Feeds({ contactId, activities, setActivities }) {
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
      handleUpdateSubmit(values);
    },
  });

  const { errors, touched, resetForm } = formik;

  const handleUpdateSubmit = async (values) => {
    setLoadingButton(true);
    try {
      await contactServices.updateContactActivity(
        contactId,
        activityId,
        values
      );
      dispatch(setRefetchData(true));
      setLoadingButton(false);
      handleCloseModal();
    } catch (error) {
      console.log(error);
      setLoadingButton(false);
    }
  };

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
    const found = activityTypes.find(
      (element) => element.id == activity.type_of_activity_id
    );
    setActivityTypeToEdit(found.name);
  };

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
  const handleDeleteActivity = async (activity) => {
    try {
      setActivities((prev) => prev.filter((item) => item.id !== activity.id));
      await contactServices.deleteContactActivity(contactId, activity.id);
      dispatch(setRefetchData(true));
    } catch (error) {
      console.log(error);
    }
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

  return (
    <>
      <div className="flow-root bg-white p-6 h-full overflow-y-scroll ">
        <ul role="list" className="-mb-8">
          {activities
            ?.slice()
            .sort((a, b) => b.id - a.id)
            .map((activityItem, activityItemIdx) => (
              <li key={activityItem.id}>
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
                          {activitiesTypes[activityItem.type_of_activity_id]}
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="mt-0.5 text-sm text-gray-500">
                          {/* Commented 6d ago */}
                          {formatDateAgo(
                            activityItem.updated_at
                              ? activityItem.updated_at
                              : activityItem.created_at
                          )}
                        </p>

                        <div className="mt-2 text-sm text-gray6">
                          <p>
                            {activityItem.description
                              ? activityItem.description
                              : placeholderDescription(
                                  activityItem.type_of_activity_id
                                )}
                          </p>
                        </div>
                      </div>
                    </>
                  </div>
                  <div className="flex">
                    <FilterDropdown
                      types={types}
                      icon={<More className="w-5" />}
                      data={activityItem}
                      positionClass="right-0"
                    />
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
      {activityModal && (
        <Overlay
          className="w-[632px]"
          handleCloseOverlay={handleCloseModal}
          title="Edit Activity"
        >
          <div className="p-6 bg-white">
            <form onSubmit={formik.handleSubmit}>
              <Dropdown
                label="Type"
                placeHolder="Choose"
                activeIcon={false}
                options={activityTypes}
                className="mb-1 w-[100%]"
                // activeClasses="bg-lightBlue1"
                handleSelect={(item) => handleChooseActivityType(item.id)}
                initialSelect={activityTypeToEdit}
                error={
                  errors.type_of_activity_id && touched.type_of_activity_id
                }
                errorText={errors.type_of_activity_id}
              />
              <TextArea
                className="min-h-[120px]"
                id="description"
                label="Description"
                handleChange={formik.handleChange}
                value={formik.values.description}
                error={errors.description && touched.description}
                errorText={errors.description}
              ></TextArea>
              <div className="flex flex-row justify-end mt-6">
                <Button
                  className="mr-3"
                  white
                  label="Cancel"
                  onClick={handleCloseModal}
                />
                <Button
                  type="submit"
                  primary
                  label="Save"
                  loading={loadingButton}
                />
              </div>
            </form>
          </div>
        </Overlay>
      )}
    </>
  );
}

// const activity = [
//   {
//     id: 1,
//     type: 'comment',
//     person: { name: 'Eduardo Benz', href: '#' },
//     imageUrl:
//       'https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
//     comment:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius. Et diam cursus quis sed purus nam. ',
//     date: '6d ago',
//   },
//   {
//     id: 2,
//     type: 'assignment',
//     person: { name: 'Hilary Mahy', href: '#' },
//     assigned: { name: 'Kristin Watson', href: '#' },
//     date: '2d ago',
//   },
//   {
//     id: 3,
//     type: 'tags',
//     person: { name: 'Hilary Mahy', href: '#' },
//     tags: [
//       { name: 'Bug', href: '#', color: 'bg-rose-500' },
//       { name: 'Accessibility', href: '#', color: 'bg-indigo-500' },
//     ],
//     date: '6h ago',
//   },
//   {
//     id: 4,
//     type: 'comment',
//     person: { name: 'Jason Meyers', href: '#' },
//     imageUrl:
//       'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
//     comment:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius. Et diam cursus quis sed purus nam. Scelerisque amet elit non sit ut tincidunt condimentum. Nisl ultrices eu venenatis diam.',
//     date: '2h ago',
//   },
// ];

// export default function Feeds() {
//   return (
//     <div className="flow-root m-[24px] mr-0 bg-white p-4 h-auto">
//       <ul role="list" className="-mb-8">
//         {activity.map((activityItem, activityItemIdx) => (
//           <li key={activityItem.id}>
//             <div className="relative pb-8">
//               {activityItemIdx !== activity.length - 1 ? (
//                 <span
//                   style={{ zIndex: '0 !important' }}
//                   className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
//                   aria-hidden="true"
//                 />
//               ) : null}
//               <div className="relative flex items-start space-x-3">
//                 {activityItem.type === 'comment' ? (
//                   <>
//                     <div className="relative">
//                       <img
//                         className="h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white"
//                         src={activityItem.imageUrl}
//                         alt=""
//                       />

//                       <span className="absolute -bottom-0.5 -right-1 bg-white rounded-tl px-0.5 py-px">
//                         <ChatAltIcon
//                           className="h-5 w-5 text-gray-400"
//                           aria-hidden="true"
//                         />
//                       </span>
//                     </div>
//                     <div className="min-w-0 flex-1">
//                       <div>
//                         <div className="text-sm">
//                           <a
//                             href={activityItem.person.href}
//                             className="font-medium text-gray-900"
//                           >
//                             {activityItem.person.name}
//                           </a>
//                         </div>
//                         <p className="mt-0.5 text-sm text-gray-500">
//                           Commented {activityItem.date}
//                         </p>
//                       </div>
//                       <div className="mt-2 text-sm text-gray-700">
//                         <p>{activityItem.comment}</p>
//                       </div>
//                     </div>
//                   </>
//                 ) : activityItem.type === 'assignment' ? (
//                   <>
//                     <div>
//                       <div className="relative px-1">
//                         <div className="h-8 w-8 bg-gray-100 rounded-full ring-8 ring-white flex items-center justify-center">
//                           <UserCircleIcon
//                             className="h-5 w-5 text-gray-500"
//                             aria-hidden="true"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                     <div className="min-w-0 flex-1 py-1.5">
//                       <div className="text-sm text-gray-500">
//                         <a
//                           href={activityItem.person.href}
//                           className="font-medium text-gray-900"
//                         >
//                           {activityItem.person.name}
//                         </a>{' '}
//                         assigned{' '}
//                         <a
//                           href={activityItem.assigned.href}
//                           className="font-medium text-gray-900"
//                         >
//                           {activityItem.assigned.name}
//                         </a>{' '}
//                         <span className="whitespace-nowrap">
//                           {activityItem.date}
//                         </span>
//                       </div>
//                     </div>
//                   </>
//                 ) : activityItem.type === 'tags' ? (
//                   <>
//                     <div>
//                       <div className="relative px-1">
//                         <div className="h-8 w-8 bg-gray-100 rounded-full ring-8 ring-white flex items-center justify-center">
//                           <TagIcon
//                             className="h-5 w-5 text-gray-500"
//                             aria-hidden="true"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                     <div className="min-w-0 flex-1 py-0">
//                       <div className="text-sm leading-8 text-gray-500">
//                         <span className="mr-0.5">
//                           <a
//                             href={activityItem.person.href}
//                             className="font-medium text-gray-900"
//                           >
//                             {activityItem.person.name}
//                           </a>{' '}
//                           added tags
//                         </span>{' '}
//                         <span className="mr-0.5">
//                           {activityItem.tags.map((tag) => (
//                             <Fragment key={tag.name}>
//                               <a
//                                 href={tag.href}
//                                 className="relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5 text-sm"
//                               >
//                                 <span className="absolute flex-shrink-0 flex items-center justify-center">
//                                   <span
//                                     className={classNames(
//                                       tag.color,
//                                       'h-1.5 w-1.5 rounded-full'
//                                     )}
//                                     aria-hidden="true"
//                                   />
//                                 </span>
//                                 <span className="ml-3.5 font-medium text-gray-900">
//                                   {tag.name}
//                                 </span>
//                               </a>{' '}
//                             </Fragment>
//                           ))}
//                         </span>
//                         <span className="whitespace-nowrap">
//                           {activityItem.date}
//                         </span>
//                       </div>
//                     </div>
//                   </>
//                 ) : null}
//               </div>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
