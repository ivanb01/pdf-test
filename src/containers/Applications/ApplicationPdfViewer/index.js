import React, { useEffect, useState } from 'react';
import { useFetchApplicationDocuments, useFetchPropertyApplicationById } from '../queries/queries';
import { useRouter } from 'next/router';
import { PdfViewer } from '../Pdf';
import { CircularProgress } from '@mui/material';
import { generatePdfBlob, downloadPdf } from '../Pdf/generatePdf';
import DownloadIcon from '@mui/icons-material/Download';
import Button from '@components/shared/button';

const ApplicationPdfViewer = () => {
  const router = useRouter();
  const { applicationId } = router.query;
  const {
    data: applicationData,
    error: applicationErrors,
    isLoading: applicationIsLoading,
    isSuccess: applicationIsSuccess,
  } = useFetchPropertyApplicationById(applicationId);

  const {
    data: documentsData,
    error: documentsErrors,
    isLoading: documentsIsLoading,
  } = useFetchApplicationDocuments(applicationData?.id, {
    enabled: applicationIsSuccess && !!applicationData.id,
  });

  const [generatingPdf, setGeneratingPdf] = useState(true);
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);

  const handleDownloadPdf = async () => {
    if (!applicationData) return;
    setDownloadingPdf(true);
    await downloadPdf({ ...applicationData, documents: documentsData.items });
    setDownloadingPdf(false);
  };

  const handleGeneratePdf = async () => {
    if (!applicationData) return;
    const blob = await generatePdfBlob({ ...applicationData, documents: documentsData.items });
    const url = URL.createObjectURL(blob);
    setPdfUrl(url);
    setGeneratingPdf(false);
  };

  useEffect(() => {
    if (applicationData && documentsData) handleGeneratePdf();
  }, [applicationData, documentsData]);

  if (applicationIsLoading || documentsIsLoading || generatingPdf) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <CircularProgress size={50} />
      </div>
    );
  }

  if (applicationErrors || documentsErrors) {
    return (
      <div className="w-full h-full flex justify-center items-center text-center">
        <p>Something went wrong while trying to fetch application...</p>
      </div>
    );
  }

  return (
    <div className="relative flex justify-center pt-[60px] pb-[130px]">
      {pdfUrl && <PdfViewer pdf={pdfUrl} />}

      <div className="  fixed flex justify-end items-center bottom-0 inset-x-0 h-[70px] bg-white shadow-[0px_-2px_12px_1px_#00000007] px-6">
        <Button
          loading={generatingPdf || downloadingPdf}
          secondary
          leftIcon={<DownloadIcon className="w-4 h-4 mr-1" />}
          onClick={handleDownloadPdf}
          disabled={!applicationData}>
          PDF
        </Button>
      </div>
    </div>
  );
};

export default ApplicationPdfViewer;
