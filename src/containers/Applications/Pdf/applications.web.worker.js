import * as Comlink from 'comlink';
import { pdf } from '@react-pdf/renderer';
import PdfRenderer, { ImageRender } from './PdfRenderer';
import PDFMerger from 'pdf-merger-js/browser';
import { getAwsFileBlob } from '@api/files';

if (process.env.NODE_ENV != 'production') {
  global.$RefreshReg$ = () => {};
  global.$RefreshSig$ = () => () => {};
}

let progressCb = console.info;

const generateSingle = async (applicationData) => {
  const { documents } = applicationData;
  const documentsArray = Object.entries(documents)
    .map(([key, value]) => {
      let otherDocuments = [];
      if (key === 'other_documents' && value) {
        value.forEach((other) => otherDocuments.push(other));
        return otherDocuments;
      }
      return value;
    })
    .filter((document) => !!document)
    .flat();

  const generatedBlob = await pdf(<PdfRenderer applicationData={applicationData} />).toBlob();
  const merger = new PDFMerger();
  await merger.add(generatedBlob);

  for (const document of documentsArray) {
    let blobResponse = null;
    const format = document.name_with_format.split('.').pop();
    if (format === 'jpg' || format === 'png') {
      const imageFile = await pdf(<ImageRender source={document.presigned_url} />).toBlob();
      await merger.add(imageFile);
    } else if (format === 'pdf') {
      try {
        blobResponse = await getAwsFileBlob(document.presigned_url);
      } catch (e) {
        console.log('error on blob response', e);
      }
      if (blobResponse.data) {
        await merger.add(blobResponse.data);
      }
    }
  }

  try {
    const mergedPdf = await merger.saveAsBlob();
    return mergedPdf;
  } catch (e) {
    console.log('error', e);
  }
};

export const generateFullPdf = () => {};

const onProgress = (cb) => (progressCb = cb);

Comlink.expose({
  generateSingle,
  onProgress,
});
