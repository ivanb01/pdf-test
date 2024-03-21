import Editor from '@components/Editor';
import Button from '@components/shared/button';
import MultiStepOverlay from '@components/shared/form/multistep-form';
import Input from '@components/shared/input';
import SlideOver from '@components/shared/slideOver';
import { useSelector } from 'react-redux';
import { MultiSelect } from 'react-multi-select-component';
import { useEffect, useState } from 'react';
import { sendEmail } from '@api/marketing';
import { setOpenEmailContactOverlay } from '@store/global/slice';
import { useDispatch } from 'react-redux';
import { addContactActivity } from '@api/contacts';
import { setGlobalEmail } from '@store/clientDetails/slice';
import RichtextEditor from '@components/Editor';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addEmailTemplate, addSMSTemplate, updateEmailTemplate, updateSMSTemplate } from '@api/campaign';
import toast from 'react-hot-toast';

const AddTemplate = ({ title, open, setOpen, addDataLocally, isEmail }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleAddTemplate = async (values) => {
    setLoading(true);
    try {
      let payload = null;
      let result = null;
      if (isEmail) {
        payload = {
          subject: values.subject,
          body_html: values.message,
          body_text: values.message.replace(/<\/?[^>]+(>|$)/g, ''),
        };
        result = await addEmailTemplate(payload);
      } else {
        payload = {
          name: values.subject,
          message: values.message.replace(/<\/?[^>]+(>|$)/g, ''),
        };
        result = await addSMSTemplate(payload);
      }
      addDataLocally(result.data.id, payload);
      setOpen(false);
      toast.success('Template created successfully!');
      setLoading(false);
      resetForm();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      id: '',
      subject: '',
      message: '',
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
      handleAddTemplate(values);
    },
  });

  const { resetForm } = formik;

  useEffect(() => {
    if (formik.values.subject && formik.values.message) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [formik.values]);

  return (
    <SlideOver
      width="w-[600px]"
      open={open}
      setOpen={setOpen}
      title={title}
      className=""
      buttons={
        !formSubmitted && (
          <>
            <Button
              // disabled={!Object.values(clientsFilters).flat().length > 0}
              primary
              label="Save Template"
              disabled={!formIsValid}
              loading={loading}
              onClick={() => formik.submitForm()}
            />
          </>
        )
      }>
      {/* <Input label="To" className="mb-6" /> */}
      {formSubmitted ? (
        <div className="text-center">
          <lottie-player
            src="/animations/aisummary1.json"
            background="transparent"
            speed="1"
            style={{ height: '200px' }}
            autoplay></lottie-player>
          <div className="text-gray7 font-medium text-lg -mt-4">Template has been updated successfully</div>

          {/* <Button primary label="Create Another Template" onClick={() => resetForm()} className="mt-6" /> */}
        </div>
      ) : (
        <div>
          <div className="mb-6">
            <Input
              label="Subject"
              id="subject"
              className=""
              placeholder="Write here..."
              value={formik.values.subject}
              onChange={formik.handleChange}
            />
          </div>
          <div className="text-gray6 text-sm font-medium mb-1">Message</div>
          <RichtextEditor
            label="Message"
            value={formik.values.message}
            placeholder="Write message here..."
            onContentChange={(content) => formik.setFieldValue('message', content)}
          />
        </div>
      )}
    </SlideOver>
  );
};

export default AddTemplate;
