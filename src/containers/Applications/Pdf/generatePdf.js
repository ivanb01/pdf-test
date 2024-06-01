import * as Comlink from 'comlink';
import { saveAs } from 'file-saver';
import Worker from 'worker-loader!./applications.web.worker.js';
import PDFMerger from 'pdf-merger-js/browser';

export const downloadPdf = async (applicationData, pdfTitle = 'Oxford form.pdf') => {
  const worker = new Worker();
  const pdfWorker = Comlink.wrap(worker);
  pdfWorker.onProgress(Comlink.proxy((info) => console.log(info)));
  const blob = await pdfWorker.generateSingle(applicationData);
  saveAs(blob, pdfTitle);
};

export const generatePdfBlob = async (applicationData) => {
  const worker = new Worker();
  const pdfWorker = Comlink.wrap(worker);
  pdfWorker.onProgress(Comlink.proxy((info) => console.log(info)));
  const blob = await pdfWorker.generateSingle(applicationData);
  return blob;
};

export const downloadFullPdf = async (applicationData, creditReport) => {
  const merger = new PDFMerger();
  let applicationBlob = null;

  if (applicationData) {
    applicationBlob = await generatePdfBlob(applicationData);
    await merger.add(applicationBlob);
  }

  if (creditReport) {
    await merger.add(creditReport);
  }

  const mergedBlob = await merger.saveAsBlob();

  saveAs(mergedBlob, 'Full Application Pdf');
};
