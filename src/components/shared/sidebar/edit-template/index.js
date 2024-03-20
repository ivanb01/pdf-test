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
import { updateEmailTemplate, updateSMSTemplate } from '@api/campaign';

const EditTemplate = ({ title, open, setOpen, template }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleEditTemplate = async (values) => {
    setLoading(true);
    try {
      let templateId = values.id;
      let payload = null;
      if (template.body_html) {
        payload = {
          subject: values.subject,
          body_html: values.message,
          body_text: values.message.replace(/<\/?[^>]+(>|$)/g, ''),
        };
        await updateEmailTemplate(templateId, payload);
      } else {
        payload = {
          name: values.subject,
          message: values.message.replace(/<\/?[^>]+(>|$)/g, ''),
        };
        await updateSMSTemplate(templateId, payload);
      }

      setLoading(false);

      resetForm();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      id: template ? template.id : null,
      subject: template ? (template.body_html ? template.subject : template.name) : '',
      message: template ? (template.body_html ? template.body_html : template.message) : '',
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
      handleEditTemplate(values);
    },
  });

  const { resetForm } = formik;

  useEffect(() => {
    if (template?.id) {
      formik.setFieldValue('id', template.id);
      formik.setFieldValue('subject', template.body_html ? template.subject : template.name);
      formik.setFieldValue('message', template.body_html ? template.body_html : template.message);
    }
  }, [template]);
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
          <div className="text-gray7 font-medium text-lg -mt-4">Template has been created successfully</div>

          <Button primary label="Create Another Template" onClick={() => resetForm()} className="mt-6" />
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

export default EditTemplate;
