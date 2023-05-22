import Dropdown from 'components/shared/dropdown';
import Button from 'components/shared/button';
import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import * as contactServices from 'api/contacts';
import Overlay from 'components/shared/overlay';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { activityTypes } from 'global/variables';
import TextArea from 'components/shared/textarea';
import { useDispatch } from 'react-redux';
import { setRefetchData } from 'store/global/slice';
const AddActivity = ({
  className,
  handleClose,
  title,
  client,
  afterUpdate,
  setAddActivityPopup,
  refetchData,
}) => {
  const dispatch = useDispatch();
  const steps = [
    {
      id: 1,
      name: 'General Information',
      href: '#',
      status: 'current',
    },
    // { id: 2, name: 'Type and Status', href: '#' },
  ];

  const [loadingButton, setLoadingButton] = useState(false);

  const openedTab = useSelector((state) => state.global.openedTab);

  // const resetForm = () => {
  //   handleClose();
  // };

  const AddActivitySchema = Yup.object().shape({
    type_of_activity_id: Yup.string().required('No selected activity'),
    // description: Yup.string().required('Description required'),
  });

  const formik = useFormik({
    initialValues: {
      type_of_activity_id: '',
      description: '',
    },
    validationSchema: AddActivitySchema,
    onSubmit: (values) => {
      // console.log(values);
      handleAddActivitySubmit(values);
    },
  });

  const { errors, touched, resetForm } = formik;

  const handleAddActivitySubmit = async (values) => {
    setLoadingButton(true);
    try {
      await contactServices.addContactActivity(client.id, values);
      setFetchActivitiesRequired((prev) => !prev);
      setLoadingButton(false);
      resetForm();
      handleToggleAddActicity();
    } catch (error) {
      console.log(error);
      setLoadingButton(false);
      handleClose();
      dispatch(setRefetchData(true));
    }
  };

  const handleChooseActivityType = (id) => {
    formik.setFieldValue('type_of_activity_id', id);
  };

  return (
    <Overlay
      // className="w-[632px]"
      handleCloseOverlay={handleClose}
      title={title}
      className={className}
    >
      <div className="p-5">
        {/* <div className="flex items-center mb-6">
          <Avatar size="large" className="mr-4" />
          <Button white label="Edit" />
        </div> */}
        <form onSubmit={formik.handleSubmit}>
          <Dropdown
            label="Type"
            placeHolder="Choose"
            activeIcon={false}
            options={activityTypes}
            className="mb-6 w-[100%]"
            // activeClasses="bg-lightBlue1"
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
            errorText={errors.description}
          ></TextArea>
          <div className="flex items-center justify-between pt-6 ">
            <div></div>
            <div>
              <Button
                className="mr-3"
                white
                label="Cancel"
                onClick={() => setAddActivityPopup(false)}
              />
              <Button
                type="submit"
                primary
                label="Save"
                loading={loadingButton}
              />
            </div>
          </div>
        </form>
      </div>
    </Overlay>
  );
};

export default AddActivity;
