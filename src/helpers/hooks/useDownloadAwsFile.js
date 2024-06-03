import { useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { getAwsFileBlob } from '@api/files';

const useDownloadAwsFile = () => {
  const [isDownaloadingFile, setDownloadingFile] = useState(false);
  const [isErrorOnDownload, setErrorOnDownload] = useState(null);

  const download = async (url, fileName) => {
    if (url && fileName) {
      setDownloadingFile(true);
      try {
        const downloadResponse = await getAwsFileBlob(url);
        saveAs(downloadResponse.data, fileName);
        setErrorOnDownload(null);
      } catch (e) {
        setErrorOnDownload(e);
      } finally {
        setDownloadingFile(false);
      }
    }
  };
  return { download, isDownaloadingFile, isErrorOnDownload };
};
export default useDownloadAwsFile;
