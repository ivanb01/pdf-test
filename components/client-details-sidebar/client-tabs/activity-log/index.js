import { useEffect, useState } from 'react';
import { PlusCircleIcon } from '@heroicons/react/solid';
import { MinusCircleIcon } from '@heroicons/react/solid';
import Feeds from 'components/shared/feeds';
import Text from 'components/shared/text';
import { useFormik } from 'formik';
import Button from 'components/shared/button';
import Input from 'components/shared/input';
import TextArea from 'components/shared/textarea';
import * as contactServices from 'api/contacts';
import Dropdown from 'components/shared/dropdown';
import { FormatLineSpacing } from '@mui/icons-material';
import noActivitLog from 'public/images/no_activitylog.svg';
import Image from 'next/image';

const activityTypes = [
  {
    id: 1,
    name: 'Email',
  },
  {
    id: 2,
    name: 'Phone',
  },
  {
    id: 3,
    name: 'Social Media',
  },
  {
    id: 4,
    name: 'In Person',
  },
  {
    id: 5,
    name: 'Other',
  },
];

export default function ActivityLog({ contactId }) {
  const [toggleAddActivity, setToggleAddActivity] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const handleToggleAddActicity = () =>
    setToggleAddActivity(!toggleAddActivity);

  const [fetchActivitiesRequired, setFetchActivitiesRequired] = useState(false);
  const handleFetchActivitiesRequired = () =>
    setFetchActivitiesRequired((prev) => !prev);

  const [activities, setActivities] = useState([]);

  //* FORMIK *//
  const formik = useFormik({
    initialValues: {
      type_of_activity_id: '',
      description: '',
    },
    onSubmit: (values) => {
      handleAddActivitySubmit(values);
    },
  });

  const handleAddActivitySubmit = async (values) => {
    setLoadingButton(true);
    try {
      const { data } = await contactServices.addContactActivity(
        contactId,
        values
      );
      console.log('add activity', values);
      setFetchActivitiesRequired((prev) => !prev);
      formik.setValues({
        type_of_activity_id: '',
        description: '',
      });
      handleToggleAddActicity();
      setLoadingButton(false);
    } catch (error) {
      console.log(error);
      setLoadingButton(false);
    }
  };

  const handleChooseActivityType = (id) => {
    formik.setFieldValue('type_of_activity_id', id);
  };

  const fetchContactActivities = async () => {
    try {
      const { data } = await contactServices.getContactActivities(contactId);
      console.log('all activities', contactId, data?.data);
      setActivities(data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log('test from activities');
    fetchContactActivities();
  }, [fetchActivitiesRequired, contactId]);

  return (
    <div className="flex bg-gray10 flex-row ">
      <div className="w-[65%] bg-gray10 details-tabs-fixed-height p-[24px] pr-0">
        {activities?.length == 0 ? (
          <div className="flow-root bg-white h-full overflow-y-scroll">
            <div className="flex flex-col items-center justify-center h-full max-w-[350px] mx-auto my-0">
              <Image src={noActivitLog}></Image>
              <Text h3 className="text-gray7 mb-2 mt-4 text-center">
                There is no activity logged for this client
              </Text>
              <Text p className="text-gray4 relative text-center mb-6">
                All activities related with this client will be shown here.
              </Text>
            </div>
          </div>
        ) : (
          <Feeds
            contactId={contactId}
            activities={activities}
            handleFetchActivitiesRequired={handleFetchActivitiesRequired}
          />
        )}
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
                activeClasses="bg-lightBlue1"
                handleSelect={(item) => handleChooseActivityType(item.id)}
              />
              <TextArea
                className="mb-6 min-h-[120px]"
                id="description"
                label="Description"
                handleChange={formik.handleChange}
                value={formik.values.description}
              ></TextArea>
              <div className="flex flex-row justify-end">
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
            {/* <BasicForm
              customButtons={customButtons}
              inputs={inputs}
              handleSubmit={handleSubmit}
            /> */}
          </div>
        )}
      </div>
    </div>
  );
}
