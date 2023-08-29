import Overlay from 'components/shared/overlay';
import Radio from 'components/shared/radio';
import { useState } from 'react';
import StatusSelect from 'components/status-select';
import Button from 'components/shared/button';
import * as contactServices from 'api/contacts';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const AddProfile = ({ handleClose, contactId, categoryTypes, statuses, handleFetchProfilesRequired }) => {
  const [loadingButton, setLoadingButton] = useState(false);

  const AddProfileSchema = Yup.object().shape({
    selectedContactType: Yup.string().required('Contact type is required'),
    selectedStatus: Yup.string().required('Contact status is required'),
  });

  //* FORMIK *//
  const formik = useFormik({
    initialValues: {
      selectedContactType: '',
      selectedStatus: '',
    },
    validationSchema: AddProfileSchema,
    onSubmit: async (values, { setSubmitting }) => {
      await addProfile();
      handleFetchProfilesRequired();
      handleClose();
    },
  });

  const { errors, touched, setFieldValue } = formik;

  const addProfile = async () => {
    setLoadingButton(true);
    try {
      const newProfile = {
        category_id: formik.values.selectedContactType,
        status_id: formik.values.selectedStatus,
      };
      const { data } = await contactServices.addContactProfile(contactId, newProfile);
      setLoadingButton(false);
    } catch (error) {
      console.log(error);
      setLoadingButton(false);
    }
  };

  return (
    <Overlay title="Add Aditional Type" handleCloseOverlay={handleClose} className="w-auto min-w-[635px] max-w-[730px]">
      <div className="p-5 pt-0">
        <div className="flex flex-col my-2">
          <div>
            <Radio
              options={categoryTypes}
              label="What kind of contact is this for you?"
              selectedOption={formik.values.selectedContactType}
              setSelectedOption={(e) => setFieldValue('selectedContactType', e)}
              className="mb-6"
              error={errors.selectedContactType && touched.selectedContactType}
              errorText={errors.selectedContactType}
            />
            <StatusSelect
              selectedStatus={formik.values.selectedStatus}
              setSelectedStatus={(e) => setFieldValue('selectedStatus', e)}
              label="In what stage of communication?"
              statuses={statuses}
              error={errors.selectedStatus && touched.selectedStatus}
              errorText={errors.selectedStatus}
            />
          </div>

          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-row justify-end mt-5">
              <Button className="mr-3 " white label="Cancel" onClick={handleClose} />
              <Button type="submit" primary label="Save Changes" loading={loadingButton} />
            </div>
          </form>
        </div>
      </div>
    </Overlay>
  );
};

export default AddProfile;
