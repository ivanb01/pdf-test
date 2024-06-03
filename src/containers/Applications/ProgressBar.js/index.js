import React from 'react';
import clsx from 'clsx';
import { getFileSize } from '../utils/utils';

const ProgressBar = ({ currentProgress, error, uploading, success, currentFile, uploadedFileData }) => {
  const progressLineClassName = clsx(
    'absolute inset-y-0 h-full bg-green5 transition-[width] duration-100 ease-linear',
    { ['bg-red5 w-full']: !!error },
  );

  return (
    <div className="w-full flex flex-col gap-1.5">
      <div className="relative h-[6px] w-full bg-[#D9D9D9] rounded overflow-hidden">
        <div
          className={progressLineClassName}
          style={{ width: success ? '100%' : `${currentProgress.progress}%` }}></div>
      </div>
      {!error ? (
        <div className="flex justify-between text-gray4 text-xs font-medium leading-4">
          {uploading && (
            <span>{`${getFileSize(currentProgress.loaded)} of ${getFileSize(currentProgress.total)}`}</span>
          )}
          {!uploading && success && (
            <span>{`${uploadedFileData ? getFileSize(uploadedFileData.file_size) : getFileSize(currentFile?.size)} of ${uploadedFileData ? getFileSize(uploadedFileData.file_size) : getFileSize(currentFile?.size)}`}</span>
          )}
          {uploading && <span className="text-green5">{`${currentProgress.progress}%`}</span>}
          {!uploading && success && <span className="text-green5">{`100%`}</span>}
        </div>
      ) : (
        <div className="text-red5">
          <span>upload error</span>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
