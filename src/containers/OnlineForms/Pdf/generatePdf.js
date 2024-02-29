import * as Comlink from 'comlink';
import { saveAs } from 'file-saver';
import Worker from 'worker-loader!./web.worker.js';

export const downloadPdf = async (editor, isPreview, formValues, pdfTitle = 'Oxford form.pdf') => {
  const worker = new Worker();
  const pdfWorker = Comlink.wrap(worker);
  pdfWorker.onProgress(Comlink.proxy((info) => console.log(info)));
  const blob = await pdfWorker.generateSingle(editor, isPreview, formValues);
  saveAs(blob, pdfTitle);
};
export const generatePdfBlob = async (editor, isPreview) => {
  const worker = new Worker();
  const pdfWorker = Comlink.wrap(worker);
  pdfWorker.onProgress(Comlink.proxy((info) => console.log(info)));
  const blob = await pdfWorker.generateSingle(editor, isPreview);
  return blob;
};
