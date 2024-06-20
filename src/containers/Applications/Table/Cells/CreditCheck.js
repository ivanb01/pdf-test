import React, { useState } from 'react';
import { generateCreditCheckPaymenkLink } from '@api/applications';
import { CircularProgress } from '@mui/material';
import Button from '@components/shared/button';
import { useFetchCreditCheckReport, useRunCreditCheck } from 'containers/Applications/queries/mutations';
import { useFetchPropertyApplicationsPaginated } from 'containers/Applications/queries/queries';
import { useRouter } from 'next/router';
import StatusChip, { VARIANT_ENUM } from '@components/shared/status-chip';
import SaveAltIcon from '@mui/icons-material/SaveAlt';

export const CreditCheckCell = (props) => {
  const router = useRouter();
  const { fetchApplicationsParams, info } = props;
  const { public_identifier, credit_check_payment_successfull, credit_check_ran_successfully } = info.row.original;

  const { refetch: refetchApplications } = useFetchPropertyApplicationsPaginated(fetchApplicationsParams);

  const onCreditCheckGenerationError = () => {
    toast.error('Unable to generate PDF from server data!');
  };

  const onDownloadCreditReportSuccess = async (data) => {
    if (data) {
      try {
        const base64Response = await fetch(`data:application/octet-stream;base64,${data.data.document_data}`);
        const blob = await base64Response.blob();
        saveAs(blob, 'Credit check report');
      } catch (e) {
        onCreditCheckGenerationError();
      }
    }
  };

  const onDownloadCreditReportError = () => {
    toast.error('Unable to download credit check report!');
  };

  const {
    data,
    mutate: mutateFetchCreditCheckReport,
    isPending: isPendingFetchingCreditCheckReport,
  } = useFetchCreditCheckReport({
    onSuccess: onDownloadCreditReportSuccess,
    onError: onDownloadCreditReportError,
  });

  const onRunCreditCheckRunSuccess = () => {
    refetchApplications();
  };
  const onRunCreditCheckRunError = () => {
    toast.error('Unable to run credit check!');
  };

  const { mutate: mutateRunCreditCheck, isPending: isPendingRunCreditCheck } = useRunCreditCheck({
    onSuccess: onRunCreditCheckRunSuccess,
    onError: onRunCreditCheckRunError,
  });

  const handleRunCreditCheck = (e) => {
    e.stopPropagation();
    mutateRunCreditCheck({ id: public_identifier });
  };

  const handlePdfDownload = (e) => {
    e.stopPropagation();
    mutateFetchCreditCheckReport({ id: public_identifier });
  };

  const [generatingPaymentLink, setGeneratingPaymentLink] = useState(false);
  const handleGeneratePaymenkLink = async (e) => {
    e.stopPropagation();
    setGeneratingPaymentLink(true);
    try {
      const response = await generateCreditCheckPaymenkLink(public_identifier);
      window.open(response.data.payment_link_url, '_blank', 'noopener,noreferrer');
    } catch (e) {
      toast.error('Unable to generate payment link!');
    } finally {
      setGeneratingPaymentLink(false);
    }

    refetchApplications();
  };

  const renderSwitch = () => {
    if (!credit_check_payment_successfull) {
      return (
        <Button secondary loading={generatingPaymentLink} onClick={handleGeneratePaymenkLink}>
          Generate Payment Link
        </Button>
      );
    } else {
      if (credit_check_ran_successfully) {
        return (
          <div className="flex flex-col items-center gap-2">
            <StatusChip variant={VARIANT_ENUM.SUCCESS} text={'Completed'} />
            <button onClick={handlePdfDownload} className="h-4">
              {isPendingFetchingCreditCheckReport ? (
                <CircularProgress className={'h-4 w-4'} />
              ) : (
                <div className="flex items-center gap-1">
                  <SaveAltIcon className="w-4 h-4 text-gray4" />
                  <p>Credit check PDF</p>
                </div>
              )}
            </button>
          </div>
        );
      }
      return (
        <Button onClick={handleRunCreditCheck} loading={isPendingRunCreditCheck}>
          Run Credit&Check
        </Button>
      );
    }
  };

  return <div className="min-w-[220px] flex justify-center items-center px-4">{renderSwitch()}</div>;
};
