import * as Comlink from 'comlink';
import { pdf } from '@react-pdf/renderer';
import PdfRenderer from './PdfRenderer';

if (process.env.NODE_ENV != 'production') {
  global.$RefreshReg$ = () => {};
  global.$RefreshSig$ = () => () => {};
}

let progressCb = console.info;

const generateSingle = async (editor, isPreview, formValues) => {
  return await pdf(<PdfRenderer editor={editor} isPreview={isPreview} formValues={formValues} />).toBlob();
};

const onProgress = (cb) => (progressCb = cb);

Comlink.expose({
  generateSingle,
  onProgress,
});
