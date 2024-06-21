import React, { useState } from 'react';
import { generateCreditCheckPaymenkLink } from '@api/applications';
import { CircularProgress } from '@mui/material';
import Button from '@components/shared/button';
import { useFetchCreditCheckReport } from 'containers/Applications/queries/mutations';
import { useFetchPropertyApplicationsPaginated } from 'containers/Applications/queries/queries';
import StatusChip, { VARIANT_ENUM } from '@components/shared/status-chip';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { useSendEmail } from '@helpers/queries/mutations';
import toast from 'react-hot-toast';
import PaymentLinkEmailTemplate from 'containers/Applications/PaymentLinkEmailTemplate';
import { useSelector } from 'react-redux';
import { render } from '@react-email/components';
import ResendEmail from '/public/icons/resend-email.svg';
import Image from 'next/image';

export const CreditCheckCell = (props) => {
  const { fetchApplicationsParams, info } = props;

  const { public_identifier, status } = info.row.original;

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

  const CREDIT_CHECK_STATUSES = {
    CREATED: (
      <Button secondary loading={generatingPaymentLink} onClick={handleGeneratePaymenkLink}>
        Generate Payment Link
      </Button>
    ),
    CREDIT_CHECK_PAYMENT_PENDING: (
      <div className="flex flex-col items-center gap-[6px]">
        <StatusChip variant={VARIANT_ENUM.PURPLE} text={'Pending'} />
        <button
          disabled={generatingPaymentLink}
          className="flex gap-[6px] items-center"
          onClick={handleGeneratePaymenkLink}>
          {!generatingPaymentLink ? <Image src={ResendEmail} alt="Resend email" /> : <CircularProgress size={16} />}
          <span className="text-[10px] leading-[18px] font-medium">Resend Payment Link</span>
        </button>
      </div>
    ),
    CREDIT_CHECK_PAYMENT_SUCCESSFUL: (
      <div className="flex flex-col items-center gap-2">
        <StatusChip variant={VARIANT_ENUM.SUCCESS} text={'Completed'} />
        <button onClick={handlePdfDownload} className="h-4">
          {isPendingFetchingCreditCheckReport ? (
            <CircularProgress className={'h-4 w-4'} />
          ) : (
            <div className="flex items-center gap-1">
              <SaveAltIcon className="w-4 h-4 text-gray4" />
              <span className="text-[10px] leading-[18px] font-medium">Credit check PDF</span>
            </div>
          )}
        </button>
      </div>
    ),
  };

  return <div className="min-w-[220px] flex justify-center items-center px-4">{CREDIT_CHECK_STATUSES[status]}</div>;
};
