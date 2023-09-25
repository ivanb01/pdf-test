import Overlay from '@components/shared/overlay';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextArea from '@components/shared/textarea';
import Button from '@components/shared/button';
import { updateContact } from '@api/contacts';
import { setRefetchData } from '@store/global/slice';
import { useDispatch } from 'react-redux';
import { updateContactLocally } from '@store/contacts/slice';
import toast from 'react-hot-toast';

const AddSummary = ({ title, handleClose, className, client }) => {
  const dispatch = useDispatch();
  const summarySchema = Yup.object().shape({
    summary: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      summary: client?.summary ?? '',
    },
    validationSchema: summarySchema,
    onSubmit: (values) => {
      const { summary } = values;
      dispatch(updateContactLocally({ ...client, summary: summary }));
      updateContact(client.id, { ...client, summary: summary })
        .then(() => {
          if (title.toLowerCase().includes('add')) {
            toast.success('Summary was added successfully!');
          } else if (title.toLowerCase().includes('edit')) {
            toast.success('Changes has been saved successfully!');
          }
          dispatch(setRefetchData(true));
        })
        .catch(() => toast.error('Something went wrong'));
    },
  });

  return (
    <Overlay handleCloseOverlay={handleClose} title={title} className={className}>
      <form onSubmit={formik.handleSubmit} className={'p-6'}>
        <TextArea
          className="min-h-[100px]"
          id="Summary"
          label="Summary"
          name={'summary'}
          handleChange={formik.handleChange}
          value={formik.values.summary}
        />
        <div className="flex items-center justify-end pt-6">
          <Button className="mr-3" white label="Cancel" onClick={handleClose} />
          <Button
            type="submit"
            primary
            label="Save"
            onClick={() => {
              formik.submitForm();
              handleClose();
            }}
            disabled={!formik.dirty}
          />
        </div>
      </form>
    </Overlay>
  );
};

export default AddSummary;
