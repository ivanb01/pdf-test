import { FormikProvider, getIn, useFormik, useFormikContext } from 'formik';
import * as Yup from 'yup';
import Button from '@components/shared/button';
import Input from '@components/shared/input';
import FileInput from './FileInput';

const AddDocument = ({ handleClose, name }) => {
  const validationSchema = Yup.object({
    documentName: Yup.string().required('File name is required!'),
    file: Yup.object().required('').typeError('File is a required file!'),
  });

  const applyForPropertyFormik = useFormikContext();

  const onSubmit = (values) => {
    const otherDocuments = getIn(applyForPropertyFormik.values, name);
    const newFile = {
      ...values.file,
      name: values.documentName,
    };
    applyForPropertyFormik.setFieldValue(name, {
      ...otherDocuments,
      [values.file.id]: newFile,
    });
    handleClose();
  };

  const formik = useFormik({
    initialValues: {
      documentName: '',
      file: null,
    },
    validationSchema,
    onSubmit,
  });

  return (
    <div
      className={`overflow-y-auto overflow-x-hidden absolute top-0 bottom-0 right-0 left-0 z-[999] bg-overlayBackground`}>
      <div className={`flex items-center justify-center p-4 h-full w-full`}>
        <div className={`relative bg-white rounded-lg shadow overflow-hidden w-full max-w-[600px]`}>
          {handleClose ? (
            <div className={`flex justify-between items-center p-6 rounded-t`}>
              <h3 className="font-medium">Uploading Document</h3>
              {handleClose && <Button closeButton onClick={handleClose} />}
            </div>
          ) : null}

          <form onSubmit={formik.handleSubmit} className={'p-6 flex flex-col gap-6'}>
            <Input
              label="Document Name"
              className={'[&_input]:h-[38px]'}
              name={'documentName'}
              onChange={formik.handleChange}
              error={formik.touched.documentName && formik.errors.documentName}
              errorText={formik.touched.documentName && formik.errors.documentName}
            />
            <FormikProvider value={formik}>
              <FileInput
                name={'file'}
                title={formik.values.documentName}
                error={formik.touched?.file && formik.errors?.file}
                errorText={formik.touched?.file && formik.errors?.file}
              />
            </FormikProvider>
            <div className="flex items-center justify-end pt-6">
              <Button className="mr-3" white label="Cancel" onClick={handleClose} type="button" />
              <Button primary label="Save Document" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDocument;
