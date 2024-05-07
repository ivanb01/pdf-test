import React, { useState, memo } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import workerSrc from './pdf-worker';

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

const PdfViewer = ({ pdf }) => {
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess(loadedPdf) {
    setNumPages(loadedPdf.numPages);
  }

  return (
    <>
      {pdf && (
        <Document
          file={pdf}
          className={'flex flex-col gap-[30px]'}
          options={{ workerSrc: './pdf.worker.js' }}
          loading={
            <div>
              <p>Loading pdf file...</p>
            </div>
          }
          onLoadSuccess={onDocumentLoadSuccess}
        >
          {Array.from(new Array(numPages), (_, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              renderAnnotationLayer={false}
              renderTextLayer={false}
              loading={<></>}
              error={<></>}
              className={`border-[1px] shadow-[0_25px_50px_0px_rgba(62,62,62,.15)] transition-opacity ease-in	duration-100`}
            />
          ))}
        </Document>
      )}
    </>
  );
};

export default memo(PdfViewer);
