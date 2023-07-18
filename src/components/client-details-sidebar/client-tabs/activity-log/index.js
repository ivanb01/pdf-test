import { useEffect, useState } from 'react';
import { PlusCircleIcon } from '@heroicons/react/solid';
import { MinusCircleIcon } from '@heroicons/react/solid';
import Feeds from 'components/shared/feeds';
import Text from 'components/shared/text';
import { useFormik } from 'formik';
import Button from 'components/shared/button';
import TextArea from 'components/shared/textarea';
import * as contactServices from 'api/contacts';
import Dropdown from 'components/shared/dropdown';
import noActivitLog from '/public/images/no_activitylog.svg';
import Image from 'next/image';
import * as Yup from 'yup';
import { activityTypes } from 'global/variables';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setRefetchData } from 'store/global/slice';
import SimpleBar from 'simplebar-react';

export default function ActivityLog({ contactId }) {
  const dispatch = useDispatch();
  const [toggleAddActivity, setToggleAddActivity] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const handleToggleAddActicity = () => {
    formik.resetForm();
    setToggleAddActivity(!toggleAddActivity);
  };

  const refetchData = useSelector((state) => state.global.refetchData);

  const [activities, setActivities] = useState(null);
  const activityLogData = useSelector(
    (state) => state.clientDetails.activityLogData,
  );

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
      handleAddActivitySubmit(values);
    },
  });

  const { errors, touched, resetForm } = formik;

  const handleAddActivitySubmit = async (values) => {
    setLoadingButton(true);
    try {
      await contactServices.addContactActivity(contactId, values);
      dispatch(setRefetchData(true));
      setLoadingButton(false);
      resetForm();
      handleToggleAddActicity();
    } catch (error) {
      console.log(error);
      setLoadingButton(false);
    }
  };

  const handleChooseActivityType = (id) => {
    formik.setFieldValue('type_of_activity_id', id);
  };

  const fetchContactActivities = async () => {
    setActivities(activityLogData);
  };

  useEffect(() => {
    fetchContactActivities();
  }, [refetchData, contactId]);

  return (
    <SimpleBar autoHide style={{ maxHeight: 'calc(100vh - 222px)' }}>
      <div
        className="flex bg-gray10 flex-row"
        style={{ minHeight: 'calc(100vh - 222px)' }}>
        <div className="w-[65%] bg-gray10 p-[24px] pr-0">
          {activities &&
            (activities?.length == 0 ? (
              <div className="flow-root bg-white h-full">
                <div className="flex flex-col items-center justify-center h-full max-w-[350px] mx-auto my-0">
                  <Image src={noActivitLog}></Image>
                  <Text h3 className="text-gray7 mb-2 mt-4 text-center">
                    There is no activity logged for this contact
                  </Text>
                  <Text p className="text-gray4 relative text-center mb-6">
                    All activities related with this contact will be shown here.
                  </Text>
                </div>
              </div>
            ) : (
              <Feeds
                contactId={contactId}
                activities={activities}
                setActivities={setActivities}
              />
            ))}
        </div>

        <div className="w-[35%] m-[24px]">
          <div className="bg-white flex flex-row justify-between p-6">
            <Text className="text-gray7" p>
              Add Activity
            </Text>
            <div onClick={handleToggleAddActicity} className=" cursor-pointer">
              {!toggleAddActivity ? (
                <PlusCircleIcon className="text-gray3" height={20} />
              ) : (
                <MinusCircleIcon className="text-red4" height={20} />
              )}
            </div>
          </div>
          {toggleAddActivity && (
            <div className="p-6 bg-white border-t border-gray2">
              <form onSubmit={formik.handleSubmit}>
                <Dropdown
                  label="Type"
                  placeHolder="Choose"
                  activeIcon={false}
                  options={activityTypes}
                  className="mb-6 w-[100%]"
                  // activeClasses="bg-lightBlue1"
                  handleSelect={(item) => handleChooseActivityType(item.id)}
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
                  errorText={errors.description}></TextArea>
                <div className="flex flex-row justify-end mt-6">
                  <Button
                    className="mr-3"
                    white
                    label="Cancel"
                    onClick={() => setToggleAddActivity(false)}
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
          )}
        </div>
      </div>
    </SimpleBar>
  );
}
