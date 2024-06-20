import React, { useState } from 'react';
import { generateCreditCheckPaymenkLink } from '@api/applications';
import { CircularProgress } from '@mui/material';
import Button from '@components/shared/button';
import { useFetchCreditCheckReport, useRunCreditCheck } from 'containers/Applications/queries/mutations';
import { useFetchPropertyApplicationsPaginated } from 'containers/Applications/queries/queries';
import StatusChip, { VARIANT_ENUM } from '@components/shared/status-chip';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { useSendEmail } from '@helpers/queries/mutations';
import toast from 'react-hot-toast';
import PaymentLinkEmailTemplate from 'containers/Applications/PaymentLinkEmailTemplate';
import { useSelector } from 'react-redux';
import { render } from '@react-email/components';

export const CreditCheckCell = (props) => {
  const { fetchApplicationsParams, info } = props;
  const { public_identifier, credit_check_payment_successfull, credit_check_ran_successfully } = info.row.original;
  const userInfo = useSelector((state) => state.global.userInfo);

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

  const { mutate: mutateFetchCreditCheckReport, isPending: isPendingFetchingCreditCheckReport } =
    useFetchCreditCheckReport({
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
  const onSendPaymentLinkEmailSuccess = () => {
    toast.success('Payment link sent successfully!');
  };
  const { mutate: mutateSendEmail } = useSendEmail({
    onSuccess: onSendPaymentLinkEmailSuccess,
  });

  const handleSendPaymentLinkEmail = async (paymentLink) => {
    const {
      client_email: clientEmail,
      client_first_name: clientFirstName,
      client_last_name: clientLastName,
    } = info.row.original;
    const { first_name: agentFirstName, last_name: agentLastName } = userInfo;

    const emailBody = {
      to: [clientEmail],
      subject: 'Opgny credit check payment link',
      body: render(
        <PaymentLinkEmailTemplate
          paymentLink={paymentLink}
          email={clientEmail}
          first_name={clientFirstName}
          agent_first_name={agentFirstName}
          agent_last_name={agentLastName}
        />,
        {
          pretty: true,
        },
      ),
    };

    mutateSendEmail(emailBody);
  };
  const handleGeneratePaymenkLink = async (e) => {
    e.stopPropagation();
    setGeneratingPaymentLink(true);

    try {
      const response = await generateCreditCheckPaymenkLink(public_identifier);
      if (response) handleSendPaymentLinkEmail(response.data.payment_link_url);
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
