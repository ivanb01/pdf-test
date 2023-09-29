import Dropdown from 'components/shared/dropdown';
import Button from 'components/shared/button';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import Overlay from 'components/shared/overlay';
import * as Yup from 'yup';
import { activityTypes } from 'global/variables';
import TextArea from 'components/shared/textarea';
import { useDispatch } from 'react-redux';
import { setRefetchData, setRefetchPart } from 'store/global/slice';
import toast from 'react-hot-toast';
import { addContactActivity } from 'api/contacts';
import { setActivityLogData } from '@store/clientDetails/slice';
import { updateContactLocally } from '@store/contacts/slice';

const AddActivity = ({ setActivities, className, handleClose, title, clientId, setAddActivityPopup }) => {
  const dispatch = useDispatch();

  const [loadingButton, setLoadingButton] = useState(false);

  const AddActivitySchema = Yup.object().shape({
    type_of_activity_id: Yup.string().required('No selected activity'),
  });

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
      let todayDate = Date.now();
      dispatch(updateContactLocally({ id: clientId, last_communication_date: todayDate }));
      dispatch(setActivityLogData((prevStoreData) => [...(prevStoreData || []), values]));
      toast.success(`Activity added successfully!`);
      setLoadingButton(false);
      resetForm();
      handleClose();
      addContactActivity(clientId, values).then(() => dispatch(setRefetchPart('activity-log')));
    } catch (error) {
      toast.error('Activity log could not be added. An error occurred.');
    }
  };

  const handleChooseActivityType = (id) => {
    formik.setFieldValue('type_of_activity_id', id);
  };

  return (
    <Overlay handleCloseOverlay={handleClose} title={title} className={className}>
      <div className="p-5">
        <form onSubmit={formik.handleSubmit}>
          <Dropdown
            label="Type"
            placeHolder="Choose"
            activeIcon={false}
            options={activityTypes}
            className="mb-6 w-[100%]"
            handleSelect={(item) => handleChooseActivityType(item.id)}
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
          <div className="flex items-center justify-between pt-6 ">
            <div></div>
            <div>
              <Button className="mr-3" white label="Cancel" onClick={() => setAddActivityPopup(false)} />
              <Button type="submit" primary label="Save" loading={loadingButton} />
            </div>
          </div>
        </form>
      </div>
    </Overlay>
  );
};

export default AddActivity;
