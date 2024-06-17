import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useFetchOnlineFormsPaginated, useFetchOnlineForm } from '../queries/queries';
import { downloadPdf, generatePdfBlob } from '../Pdf/generatePdf';
import { useFormik } from 'formik';
import { usePostOnlineForm } from '../queries/mutations';
import { useSendEmail, useUpdateCommunicationAndActivityLog } from '@helpers/queries/mutations';
import CircularProgress from '@mui/material/CircularProgress';
import { PdfViewer } from '../Pdf';
import Input from '@components/shared/input';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import moment from 'moment';
import Button from '@components/shared/button';
import { toast } from 'react-hot-toast';
import OnlineFormEmailTemplate from '../OnlineFormEmailTemplate';
import { useSelector } from 'react-redux';
import { render as renderEmail } from '@react-email/components';

const OnlineFormAgentSign = () => {
  const router = useRouter();
  const formId = router.query.formId ?? null;

  const refetchParams = router.query.params ? JSON.parse(router.query.params) : {};
  const {
    data: onlineFormData,
    error: onlineFormError,
    isLoading: onlineFormIsLoading,
    isSuccess: onlineFormIsSuccess,
  } = useFetchOnlineForm(formId, {
    enabled: !!formId,
  });

  useEffect(() => {
    if (onlineFormData && onlineFormData.data.status !== 'DRAFT') {
      router.back();
    }
  }, [onlineFormData]);

  const { refetch: formsRefetch } = useFetchOnlineFormsPaginated(refetchParams, {
    enabled: !!Object.keys(refetchParams).length,
  });

  const onSendEmailSuccess = () => {
    formsRefetch();
    router.push('/online-forms');
    toast.success('Form sent successfully!');
  };
  const updateCommunicationAndActivityLog = useUpdateCommunicationAndActivityLog({
    onSuccess: onSendEmailSuccess,
  });

  const mutateSendEmail = useSendEmail();
  const userInfo = useSelector((state) => state.global.userInfo);

  const [render, setRender] = useState(null);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const generatePreview = async () => {
    setLoadingPdf(true);
    const blob = await generatePdfBlob(onlineFormData?.data?.content, true);
    const url = URL.createObjectURL(blob);
    setRender(url);
    setLoadingPdf(false);
  };

  const onDownloadPdf = async () => {
    await downloadPdf(onlineFormData?.data?.content, false, values);
  };

  useEffect(() => {
    if (onlineFormIsSuccess && !!Object.keys(onlineFormData?.data.content).length) {
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
              answer: onlineFormData?.data?.submitted_answers
                ? onlineFormData?.data?.submitted_answers[key].answer
                : '',
            },
          };
        }),
      );
    } else return {};
  }, [onlineFormData]);

  const onSignSuccess = (data, variables) => {
    const { public_identifier } = data?.data;
    const emailBody = {
      to: [variables.client_email],
      subject: data?.data?.form_type.name ?? 'Opgny form',
      body: renderEmail(
        <OnlineFormEmailTemplate
          email={variables.client_email}
          first_name={variables.client_first_name}
          agent_first_name={userInfo?.first_name}
          agent_last_name={userInfo?.last_name}
          formLink={`${window.location.origin}/public/online-forms-sign/${public_identifier}`}
        />,
        {
          pretty: true,
        },
      ),
    };
    mutateSendEmail.mutateAsync(emailBody).then(() => {
      updateCommunicationAndActivityLog.mutate({
        form_name: data?.data?.form_type.name ?? 'Opgny form',
        client_id: variables?.client_id,
      });
    });
  };

  const {
    error: postFormError,
    isPending: postFormPending,
    isSuccess: isPostFormSuccess,
    mutate: mutatePostForm,
  } = usePostOnlineForm({
    onSuccess: onSignSuccess,
  });

  const { values, setFieldValue, handleSubmit } = useFormik({
    initialValues: {
      ...initialFormValue,
    },
    onSubmit: (values) => {
      mutatePostForm({
        ...onlineFormData.data,
        submitted_answers: values,
        status: 'PENDING',
      });
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

      const signatures = formattedArray
        .filter((field) => field.formType === 'signature')
        .sort((field1, field2) => {
          return +field1.key < +field2.key ? -1 : 1;
        });
      const restFields = formattedArray
        .filter((field) => field.formType !== 'signature')
        .sort((field1, field2) => {
          return +field1.key < +field2.key ? -1 : 1;
        });

      return [restFields, signatures];
    } else return [];
  }, [onlineFormData]);

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

  return (
    <div className="h-full flex  justify-center w-full pb-[70px] divide-x overflow-hidden">
      <div className="w-full max-w-[1248px] overflow-y-scroll">
        <div className="grid sm:grid-cols-2 p-6 gap-4">
          {formattedTextFields?.map((field) => {
            const fieldId = field.id;
            return (
              <div key={field.id} className={'w-full sm:max-w-[400px]'}>
                <Input
                  onChange={(e) => {
                    const { id } = field;
                    let value = e.target.value;

                    if (field.formType === 'date') {
                      value = moment(value).format('DD/MM/YYYY');
                    }

                    setFieldValue(`${id}.answer`, value);
                  }}
                  name={field.id}
                  value={values[fieldId]?.answer}
                  type={field.inputType}
                  label={field.label}
                />
              </div>
            );
          })}
        </div>
        <div className="grid sm:grid-cols-2 p-6 gap-4">
          {formattedSignatureFields?.map((field) => {
            const fieldId = field.id;
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
                  initialSignatureData={values[fieldId]?.answer}
                  label={field.label}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-center  overflow-y-scroll  overflow-x-scroll shrink-0 grow w-1/2">
        <div className="h-full  pt-[30px] px-[30px] ">
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

export default OnlineFormAgentSign;
