import React from 'react';
import FileInputUpload from '@components/shared/input/FileInput';
import Image from 'next/image';
import UploadIcon from '/public/icons/upload.svg';
import CancelIcon from '/public/icons/cancel.svg';
import RetryIcon from '/public/icons/retry.svg';
import ProgressBar from 'containers/Applications/ProgressBar.js';
import NotificationAlert from '@components/shared/alert/notification-alert';
import toast from 'react-hot-toast';
import { getFileSize } from 'containers/Applications/utils/utils';

const FileInput = ({ name, title, error, errorText, onRemove }) => {
  const onLargeFile = () => {
    toast.error('File size too big!');
  };
  const onSuccess = () => {
    toast.success(`${title} uploaded successfully!`);
  };

  const onWrongInputFormat = () => {
    toast.error('File type not allowed!');
  };

  return (
    <div>
      <FileInputUpload
        title={title}
        name={name}
        handleUploading
        onLargeFile={onLargeFile}
        onSuccess={onSuccess}
        onRemoveFile={onRemove}
        onWrongFileFormat={onWrongInputFormat}>
        <div className="space-y-2 ">
          <p className="text-gray6 text-sm font-medium leading-5">{title}</p>
          <FileInputUpload.Upload className="w-full flex flex-col justify-center items-center p-[26px] pt-[22px] border-dashed border-2 leading-4 font-normal text-xs text-gray5 rounded-md">
            <div className="flex flex-col items-center ">
              <Image src={UploadIcon} alt="upload-icon" className="mb-3" />
              <div className="mb-[5px]">
                <FileInputUpload.Input>
                  <span className="text-lightBlue3 ">Upload a file</span>
                </FileInputUpload.Input>
                <span className="text-gray5">{` or drag and drop`}</span>
              </div>
              <span className=" text-gray4 text-[10px]">{`PDF, PNG, JPG up to 10MB`}</span>
            </div>
          </FileInputUpload.Upload>
          <FileInputUpload.Uploading className="w-full flex flex-col justify-center items-center pt-[22px] pb-[26px] leading-4 font-normal text-xs text-gray5 rounded-md">
            {(context) => {
              const { postFileData } = context;
              const { totalLoading, presigendUrlMutationData, postFileMutationData, fileData } = postFileData;
              const { isError: errorOnUplod, uploadProgress, isSuccess: isUploadSuccess } = postFileMutationData;
              const { isSuccess: isFetchingUrlSuccess } = presigendUrlMutationData;
              return (
                <div className="flex gap-2 w-full py-[11px] ">
                  <div className="shrink-1 flex flex-col w-full gap-1.5 truncate">
                    <div className="truncate">
                      <span className="text-xs font-medium text-gray7 leading-4">{fileData?.name}</span>
                    </div>
                    <ProgressBar
                      currentProgress={uploadProgress}
                      error={errorOnUplod}
                      success={isUploadSuccess && isFetchingUrlSuccess}
                      currentFile={fileData}
                      uploading={totalLoading}
                    />
                  </div>
                  <div className="flex">
                    <FileInputUpload.AbortButton>
                      <Image src={CancelIcon} className="w-[25px] h-[25px] " alt="cancel-icon" />
                    </FileInputUpload.AbortButton>
                  </div>
                </div>
              );
            }}
          </FileInputUpload.Uploading>
          <FileInputUpload.Uploaded className="w-full flex flex-col justify-center items-center py-6 border leading-4 font-normal text-xs text-gray5 rounded-md ">
            {(context) => {
              const { postFileData } = context;
              const { uploadedFileData } = postFileData;
              return (
                <div className="w-full flex gap-2 p-3">
                  <div className="flex flex-col w-full gap-3.5 ">
                    <div className="flex justify-between text-xs font-medium text-gray7 leading-4 	">
                      <div className="truncate">
                        <span className="truncate">{uploadedFileData?.name_with_format}</span>
                      </div>
                      <div className=" text-nowrap	">
                        <span className="text-gray4 shrink-0  text-nowrap	">
                          {getFileSize(uploadedFileData?.file_size)}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-3.5">
                      <FileInputUpload.DownloadButton>
                        <span className="font-medium leading-4 text-xs text-lightBlue3">Download</span>
                      </FileInputUpload.DownloadButton>

                      <FileInputUpload.RemoveButton>
                        <span className="font-medium leading-4 text-xs text-gray4">Remove</span>
                      </FileInputUpload.RemoveButton>
                    </div>
                  </div>
                </div>
              );
            }}
          </FileInputUpload.Uploaded>
          <FileInputUpload.Error className="w-full flex flex-col justify-center items-center pt-[22px] pb-[26px] leading-4 font-normal text-xs text-gray5 rounded-md">
            {(context) => {
              const { postFileData } = context;
              const { totalLoading, presigendUrlMutationData, postFileMutationData, fileData } = postFileData;
              const { isError: errorOnUplod, uploadProgress, isSuccess: isUploadSuccess } = postFileMutationData;
              const { isSuccess: isFetchingUrlSuccess } = presigendUrlMutationData;
              return (
                <div className="flex gap-2 w-full py-[11px]">
                  <div className="flex flex-col w-full gap-1.5">
                    <span className="text-xs font-medium text-gray7 leading-4">{fileData?.name}</span>
                    <ProgressBar
                      currentProgress={uploadProgress}
                      error={errorOnUplod}
                      success={isUploadSuccess && isFetchingUrlSuccess}
                      currentFile={fileData}
                      uploading={totalLoading}
                    />
                  </div>
                  <div className="flex gap-2">
                    <div className="flex gap-2 items-center">
                      <FileInputUpload.RemoveButton>
                        <Image src={CancelIcon} className="w-[25px] h-[25px]" alt="cancel-icon" />
                      </FileInputUpload.RemoveButton>
                      <FileInputUpload.RetryButton>
                        <Image src={RetryIcon} className="w-[25px] h-[25px]" alt="retry-icon" />
                      </FileInputUpload.RetryButton>
                    </div>
                  </div>
                </div>
              );
            }}
          </FileInputUpload.Error>
        </div>
      </FileInputUpload>
      {error && errorText && (
        <NotificationAlert className="mt-2 p-2" type={'error'}>
          {errorText}
        </NotificationAlert>
      )}
    </div>
  );
};

export default FileInput;
