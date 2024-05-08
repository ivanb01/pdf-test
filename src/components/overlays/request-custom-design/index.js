import Overlay from '@components/shared/overlay';
import Input from '@components/shared/input';
import TextArea from '@components/shared/textarea';
import Button from '@components/shared/button';
import SimpleBar from 'simplebar-react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { formatDateStringMDY } from '@global/functions';
import { sendMarketingEmail } from '@api/marketing';
import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import AsyncDropdown from '@components/marketing/AsyncDropdown';

const RequestCustomDesign = ({ handleOverlayClose }) => {
  const user = useSelector((state) => state.global.user);

  const _sendMarketingEmail = async (body) => {
    try {
      return await sendMarketingEmail(body);
    } catch (e) {
      toast.error('Something went wrong');
    }
  };
  const [selectedProperty, setSelectedProperty] = useState();

  const updateSelectedProperty = (i) => {
    setSelectedProperty(i == null ? undefined : i);
  };

  const validationSchema = Yup.object({
    listingUrl: Yup.string()
      .matches(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/, 'Invalid URL format')
      .required('Listing URL is required')
      .defined('Listing URL is required'),
    note: Yup.string().optional(),
    date: Yup.date().required('Date is required'),
  });
  const formik = useFormik({
    initialValues: { listingUrl: '', note: '', date: '' },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const noteContent = values.note ? `<p>${values.note}</p>` : '';
      handleOverlayClose();
      toast.success('Email was sent successfully!');
      _sendMarketingEmail({
        to: ['marketing@opgny.com'],
        cc: [`${user}`],
        subject: `Request Custom Design`,
        body: `<html>
<body>
<div style='color: black'>
<p >Hello,</p>
<p  >Hope this email finds you well! Below you can find the details of requested custom design.</p>
  ${noteContent}
  <p>Here you can find  <a href='${values.listingUrl}' style='font-style: italic'>Listing url</a></p>
   <p style='display:flex;'>I would greatly appreciate it if this could be ready by ${formatDateStringMDY(
     new Date(values.date),
   )}</p>
   </div>
   </body>
</html>`,
      }).catch(() => toast.error('Something went wrong'));
    },
  });

  return (
    <Overlay title={'Request Custom Digital Design'} handleCloseOverlay={handleOverlayClose} className="w-[700px]">
      <div className={'flex gap-10'}>
        <SimpleBar autoHide style={{ maxHeight: '620px', width: '100%', height: '100%' }}>
          <div className={'flex-1'}>
            <form className={'flex flex-1 flex-col justify-center h-[660px]'} onSubmit={formik.handleSubmit}>
              <div className={`mx-6 mb-8 flex-1 flex gap-10 flex-col ${!formik.isValid ? 'mt-[130px]' : 'mt-[30px]'}`}>
                <p className={'text-sm text-gray5 border rounded-xl border-lightBlue2 p-2 pl-4 bg-lightBlue1'}>
                  Complete the fields below to customize and generate your listing's or general promotional materials,
                  ready for both print and digital use. You will receive the file to your email within 24 Hours.
                </p>
                <>
                  <AsyncDropdown
                    formik={formik}
                    updateSelectedProperty={updateSelectedProperty}
                    selectedProperty={selectedProperty}
                  />
                  <Input
                    type="text"
                    label="Listing URL"
                    required
                    disabled={selectedProperty}
                    value={formik.values.listingUrl ?? ''}
                    id="listingUrl"
                    onChange={(e) => {
                      formik.setFieldValue('listingUrl', e.target.value);
                    }}
                    error={formik.errors.listingUrl && formik.touched.listingUrl}
                    errorText={formik.errors.listingUrl}
                  />
                </>
                <TextArea
                  className="min-h-[120px]"
                  id="note"
                  label="Note"
                  optional
                  value={formik.values.note}
                  handleChange={formik.handleChange}
                ></TextArea>
                <div className={'grid grid-cols-2 gap-6'}>
                  <Input
                    type="date"
                    required
                    label="I need this to be ready until"
                    id="date"
                    value={formik.values.date}
                    onChange={(e) => formik.setFieldValue('date', e.target.value)}
                    error={formik.errors.date && formik.touched.date}
                    errorText={formik.errors.date}
                    className={'col-span-1'}
                    placeholder={'mm/dd/yyyy'}
                  />
                </div>
              </div>
              <div
                className="flex items-end justify-end py-4 pr-6 sticky bottom-0 bg-white"
                style={{ boxShadow: '0px -2px 12px 1px rgba(0, 0, 0, 0.07)' }}
              >
                <Button className={`mr-4`} white onClick={handleOverlayClose}>
                  Cancel
                </Button>
                <Button primary type={'submit'} disabled={!formik.errors}>
                  Send Request
                </Button>
              </div>
            </form>
          </div>
        </SimpleBar>
      </div>
    </Overlay>
  );
};

export default RequestCustomDesign;
