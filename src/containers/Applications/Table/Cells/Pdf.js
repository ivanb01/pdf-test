import { downloadFullPdf } from 'containers/Applications/Pdf/generatePdf';
import { useFetchCreditCheckReport } from 'containers/Applications/queries/mutations';
import { CircularProgress } from '@mui/material';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { fetchApplicationDocuments } from '@api/applications';
import { toast } from 'react-hot-toast';

export const PdfCell = ({ info }) => {
  const onDownloadCreditReportSuccess = async (data) => {
    let documentsDataResponse = { documents: [] };
    try {
      const { data: documentData } = await fetchApplicationDocuments(info.row.original.id);
      documentsDataResponse = {
        documents: documentData.items,
      };
    } catch (e) {
      toast.error('Unable to load user documents!');
    }

    if (data && data.data?.document_data && documentsDataResponse) {
      try {
        const base64Response = await fetch(`data:application/octet-stream;base64,${data.data.document_data}`);
        const blob = await base64Response.blob();
        downloadFullPdf({ ...info.row.original, documents: documentsDataResponse }, blob);
      } catch (e) {
        downloadFullPdf({ ...info.row.original, documents: documentsDataResponse }, null);
      }
    }
  };

  const onDownloadCreditReportError = () => {
    downloadFullPdf(info.row.original, null);
  };

  const {
    data,
    mutate: mutateFetchCreditCheckReport,
    isPending: isPendingFetchingCreditCheckReport,
  } = useFetchCreditCheckReport({
    onSuccess: onDownloadCreditReportSuccess,
    onError: onDownloadCreditReportError,
  });

  const handlePdfDownload = (e) => {
    e.stopPropagation();
    mutateFetchCreditCheckReport({ id: info.row.original.public_identifier });
  };

  return (
    <div className="min-w-[76px] px-4 font-normal flex justify-center">
      <button className="text-overlayBackground flex justify-center" onClick={handlePdfDownload}>
        {isPendingFetchingCreditCheckReport ? (
          <CircularProgress className={'h-4 w-4'} />
        ) : (
          <SaveAltIcon className="w-4 h-4" />
        )}
      </button>
    </div>
  );
};
