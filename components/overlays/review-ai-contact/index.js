import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import Overlay from 'components/shared/overlay';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const ReviewAIContact = ({
  className,
  handleClose,
  title,
  client,
  afterUpdate,
  refetchData,
}) => {
  const dispatch = useDispatch();

  const [loadingButton, setLoadingButton] = useState(false);

  const openedTab = useSelector((state) => state.global.openedTab);

  // const resetForm = () => {
  //   handleClose();
  // };

  const formik = useFormik({
    initialValues: {},
    validationSchema: AddActivitySchema,
    onSubmit: (values) => {
      // console.log(values);
    },
  });

  const { errors, touched, resetForm } = formik;

  const handleSubmit = async (values) => {
    setLoadingButton(true);
    try {
    } catch (error) {}
  };

  const handleChooseActivityType = (id) => {
    formik.setFieldValue('type_of_activity_id', id);
  };

  return (
    <Overlay
      handleCloseOverlay={handleClose}
      title={title}
      className={className}
    >
      <div className="p-5"></div>
    </Overlay>
  );
};

export default AddActivity;
