import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useFetchOnlineForm } from '../queries/queries';
import { usePostOnlineForm } from '../queries/mutations';
import CircularProgress from '@mui/material/CircularProgress';
import Input from '@components/shared/input';
import { useFormik } from 'formik';
import Button from '@components/shared/button';
import { downloadPdf, generatePdfBlob } from 'containers/OnlineForms/Pdf/generatePdf';
import { PdfViewer } from 'containers/OnlineForms/Pdf';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

const OnlineFormsSignForm = () => {
  const router = useRouter();

  const publicId = router.query.slug;
  const {
    data: onlineFormData,
    error: onlineFormError,
    isLoading: onlineFormIsLoading,
    isSuccess: onlineFormIsSuccess,
  } = useFetchOnlineForm(publicId, {
    enabled: !!router.query.slug,
  });
  const [render, setRender] = useState(null);
  const [loadingPdf, setLoadingPdf] = useState(false);

  const generatePreview = async () => {
    setLoadingPdf(true);
    const blob = await generatePdfBlob(onlineFormData?.data?.content, true);
    const url = URL.createObjectURL(blob);
    setRender(url);
    setLoadingPdf(false);
  };

  useEffect(() => {
    if (onlineFormIsSuccess) {
      generatePreview();
    }
  }, [onlineFormIsSuccess]);

  const initialFormValue = useMemo(() => {
    if (onlineFormData) {
      return Object.assign(
        {},
        ...Object.keys(onlineFormData?.data?.fields).map((key) => {
          return {
            [key]: {
              ...onlineFormData?.data?.fields[key],
              answer: '',
            },
          };
        }),
      );
    } else return {};
  }, [onlineFormData]);

  const {
    error: postFormError,
    isPending: postFormPending,
    isSuccess: isPostFormSuccess,
    mutate: mutatePostForm,
  } = usePostOnlineForm();

  const { values, setFieldValue, handleSubmit } = useFormik({
    validateOnMount: true,
    initialValues: {
      ...initialFormValue,
    },
    onSubmit: (values) => {
      mutatePostForm({ publicId, submitted_answers: values });
    },
    enableReinitialize: true,
  });

  const [formattedTextFields, formattedSignatureFields] = useMemo(() => {
    if (onlineFormData) {
      const formattedArray = Object.keys(onlineFormData?.data?.fields).map((key) => {
        return {
          id: key,
          ...onlineFormData?.data?.fields[key],
        };
      });

      const signatures = formattedArray.filter((field) => field.formType === 'signature');
      const restFields = formattedArray.filter((field) => field.formType !== 'signature');

      return [restFields, signatures];
    } else return [];
  }, [onlineFormData]);

  const onDownloadPdf = async () => {
    await downloadPdf(onlineFormData?.data?.content, false, values);
  };

  if (onlineFormIsLoading)
    return (
      <div className="w-full h-full flex flex-col justify-center items-center gap-3">
        <CircularProgress size={40} />
        <p className="leading-5 text-sm text-center text-gray5 font-medium">Loading form...</p>
      </div>
    );
  if (onlineFormError)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <p className="leading-5 text-sm text-center text-gray5 font-medium">
          Something went wrong while trying to load form data...
        </p>
      </div>
    );

  if (postFormError) {
    return (
      <div className="w-full h-full flex items-center justify-center flex-col leading-6 text-gray7">
        <ErrorIcon className="h-[80px] w-[80px] text-red5 mb-[30px]" />
        <p className="mb-[12px] font-medium text-lg ">Something went wrong!</p>
      </div>
    );
  }

  if (isPostFormSuccess) {
    return (
      <div className="w-full h-full flex items-center justify-center flex-col leading-6 text-gray7">
        <CheckCircleIcon className="h-[80px] w-[80px] text-green5 mb-[30px]" />
        <p className="mb-[12px] font-medium text-lg ">Form is submitted succesfully!</p>
        <p>Wait for your agent to reach you out for the other steps</p>
      </div>
    );
  }

  return (
    <div className="h-full flex  justify-center w-full pb-[70px] divide-x overflow-hidden" onSubmit={handleSubmit}>
      <div className="w-full max-w-[1248px] overflow-y-scroll">
        <div className="grid sm:grid-cols-2 p-6 gap-4">
          {formattedTextFields?.map((field) => {
            return (
              <div key={field.id} className={'w-full sm:max-w-[400px]'}>
                <Input
                  onChange={(e) => {
                    const { id } = field;
                    setFieldValue(`${id}.answer`, e.target.value);
                  }}
                  type={field.formType}
                  label={field.textValue}
                  // error={'error'}
                />
              </div>
            );
          })}
        </div>
        <div className="grid sm:grid-cols-2 p-6 gap-4">
          {formattedSignatureFields?.map((field) => {
            return (
              <div key={field.id} className={'w-full sm:max-w-[400px]'}>
                <Input
                  onSignatureEnd={(url) => {
                    const { id } = field;
                    setFieldValue(`${id}.answer`, url);
                  }}
                  onSignatureClear={() => {
                    const { id } = field;
                    setFieldValue(`${id}.answer`, '');
                  }}
                  type={field.formType}
                  label={field.textValue}
                  // error={'error'}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-center   overflow-y-scroll  overflow-x-scroll shrink-0 grow w-1/2">
        <div className="h-full w-full pt-[30px] px-[30px] ">
          {!loadingPdf && <PdfViewer pdf={render} />}
          <div className="h-[20px]" />
        </div>
      </div>
      <div className="absolute w-full flex h-[70px] justify-between items-center gap-[12px] px-6 shadow-[0_-2px_12px_-1px_rgba(0,0,0,0.07)] ronded-b-lg bottom-0 bg-white">
        <button
          onClick={onDownloadPdf}
          className="flex items-center gap-[4px] text-lightBlue3 leading-5 text-sm	font-medium">
          <SaveAltIcon className="w-[20px] h-[20px]" />
          Download PDF
        </button>
        <Button label="Submit form" onClick={handleSubmit} loading={postFormPending} />
      </div>
    </div>
  );
};

export default OnlineFormsSignForm;
