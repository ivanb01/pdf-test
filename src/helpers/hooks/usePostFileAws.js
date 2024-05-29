import { useEffect, useState } from 'react';
import { usePostFile, usePostPresignedUrl } from '@helpers/queries/mutations';
import uuid from 'react-uuid';
import useDownloadAwsFile from './useDownloadAwsFile';

const DEFAULT_MAX_SIZE_BYTES = 10 * 1024 * 1024;

const usePostFileAws = ({
  presignedUrlMutationOptions = {},
  fileMutationOptions = {},
  maxFileSize = DEFAULT_MAX_SIZE_BYTES,
  name = '',
  onUploadSuccess = () => {},
  onLargeFile = () => {},
  onAbort = () => {},
  onRemove = () => {},
  initialFile = null,
}) => {
  const [totalLoading, setTotalLoading] = useState(false);
  const [totalError, setTotalError] = useState(false);
  const [fileData, setFileData] = useState(null);
  const [uploadedFileData, setUploadedFileData] = useState(null);
  const { download: downloadFile } = useDownloadAwsFile();
  useEffect(() => {
    setUploadedFileData(initialFile ?? null);
  }, [initialFile]);

  const presigendUrlMutationData = usePostPresignedUrl(presignedUrlMutationOptions);
  const {
    mutateAsync: mutatePostPresignedUrl,
    isPending: isFetchingPresignedUrl,
    isError: isErrorPresignedUrl,
    abort: abortPresignedUrl,
    reset: resetPresignedMutation,
  } = presigendUrlMutationData;

  const postFileMutationData = usePostFile(fileMutationOptions);
  const {
    mutateAsync: mutatePostFile,
    isPending: isUploading,
    isError: isErrorFileUploading,
    abort: abortUpload,
    reset: resetPostFileMutation,
  } = postFileMutationData;

  useEffect(() => {
    setTotalLoading(isFetchingPresignedUrl || isUploading);
  }, [isFetchingPresignedUrl, isUploading]);

  useEffect(() => {
    setTotalError(isErrorPresignedUrl || isErrorFileUploading);
  }, [isErrorPresignedUrl, isErrorFileUploading]);

  const abort = () => {
    if (isFetchingPresignedUrl) abortPresignedUrl();
    if (isUploading) abortUpload();
    onAbort();
  };

  const retry = () => {
    if (totalError) {
      uploadToS3(fileData);
    }
  };

  const remove = () => {
    setUploadedFileData(null);
    resetPostFileMutation();
    resetPresignedMutation();
    onRemove();
  };

  const download = () => {
    downloadFile(uploadedFileData.presigned_url, uploadedFileData.name_with_format);
  };

  const onSuccess = (file, presignedUrlData) => {
    const uploadData = {
      id: uuid(),
      name: name,
      name_with_format: file.name,
      url: presignedUrlData.data.fields.key,
      position: null,
      file_size: file.size,
    };
    setUploadedFileData(uploadData);
    onUploadSuccess(uploadData);
  };

  const uploadToS3 = async (file) => {
    if (!file) return;

    if (file.size > maxFileSize) {
      onLargeFile();
      return;
    }
    setFileData(file);
    let presignedUrlData = null;
    try {
      presignedUrlData = await mutatePostPresignedUrl(file.name);
    } catch (e) {
      return;
    }

    const { url, fields } = presignedUrlData.data;
    fields.AWSAccessKeyId = fields.aws_access_key_id;
    delete fields.aws_access_key_id;
    const form = new FormData();

    Object.entries(fields).forEach(([k, v]) => {
      form.append(k, v);
    });

    form.append('file', file);

    try {
      await mutatePostFile(
        {
          url,
          data: form,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
        {
          onSuccess: () => onSuccess(file, presignedUrlData),
        },
      );
    } catch (e) {}
  };

  return {
    uploadToS3,
    presigendUrlMutationData,
    postFileMutationData,
    uploadedFileData,
    fileData,
    totalLoading,
    totalError,
    retry,
    abort,
    remove,
    download,
  };
};

export default usePostFileAws;
