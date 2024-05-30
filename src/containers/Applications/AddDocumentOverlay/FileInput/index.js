import React from 'react';
import FileInputUpload from '@components/shared/input/FileInput';
import Image from 'next/image';
import UploadIcon from '/public/icons/upload.svg';
import CancelIcon from '/public/icons/cancel.svg';
import RetryIcon from '/public/icons/retry.svg';
import ProgressBar from 'containers/Applications/ProgressBar.js';
import NotificationAlert from '@components/shared/alert/notification-alert';
import toast from 'react-hot-toast';
import DescriptionIcon from '@mui/icons-material/Description';

const FileInput = ({ name, title, error, errorText }) => {
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
        handleUploading={true}
        onLargeFile={onLargeFile}
        onSuccess={onSuccess}
        onWrongFileFormat={onWrongInputFormat}>
        <div className="space-y-2 ">
          <div className="flex flex-col justify-center items-center p-[26px] pt-[22px] border-dashed border-2 leading-3 font-normal text-xs text-gray5 rounded-md">
            <div className="w-full">
              <FileInputUpload.Upload>
                <div className="flex flex-col items-center">
                  <Image src={UploadIcon} alt="upload-icon" />
                  <div>
                    <FileInputUpload.Input>
                      <span className="text-lightBlue3 ">Upload a file</span>
                    </FileInputUpload.Input>
                    <span className="text-gray5">{` or drag and drop`}</span>
                  </div>
                  <span className=" text-gray4">{`PDF, PNG, JPG up to 10MB`}</span>
                </div>
              </FileInputUpload.Upload>
              <FileInputUpload.Uploading>
                {(context) => {
                  const { postFileData } = context;
                  const { totalLoading, presigendUrlMutationData, postFileMutationData, fileData } = postFileData;
                  const { isError: errorOnUplod, uploadProgress, isSuccess: isUploadSuccess } = postFileMutationData;
                  const { isSuccess: isFetchingUrlSuccess } = presigendUrlMutationData;
                  return (
                    <div className="flex gap-2 items-center">
                      <div className="flex items-center">
                        <DescriptionIcon className="text-gray3 w-[38px] h-[38px]" />
                      </div>
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
                      <div className="flex">
                        <FileInputUpload.AbortButton>
                          <Image src={CancelIcon} className="w-[25px] h-[25px] " alt="cancel-icon" />
                        </FileInputUpload.AbortButton>
                      </div>
                    </div>
                  );
                }}
              </FileInputUpload.Uploading>
              <FileInputUpload.Uploaded>
                {(context) => {
                  const { postFileData } = context;
                  const { totalLoading, presigendUrlMutationData, postFileMutationData, fileData } = postFileData;
                  const { isError: errorOnUplod, uploadProgress, isSuccess: isUploadSuccess } = postFileMutationData;
                  const { isSuccess: isFetchingUrlSuccess } = presigendUrlMutationData;
                  return (
                    <div className="flex gap-2">
                      <div className="flex items-center">
                        <DescriptionIcon className="text-gray3 w-[38px] h-[38px]" />
                      </div>
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
                      <div className="flex items-center">
                        <FileInputUpload.RemoveButton>
                          <Image src={CancelIcon} className="w-[25px] h-[25px]" alt="remove-button" />
                        </FileInputUpload.RemoveButton>
                      </div>
                    </div>
                  );
                }}
              </FileInputUpload.Uploaded>
              <FileInputUpload.Error>
                {(context) => {
                  const { postFileData } = context;
                  const { totalLoading, presigendUrlMutationData, postFileMutationData, fileData } = postFileData;
                  const { isError: errorOnUplod, uploadProgress, isSuccess: isUploadSuccess } = postFileMutationData;
                  const { isSuccess: isFetchingUrlSuccess } = presigendUrlMutationData;
                  return (
                    <div className="flex gap-2">
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
          </div>
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
