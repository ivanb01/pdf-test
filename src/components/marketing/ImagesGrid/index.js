const ImagesGrid = ({ src, id, fileName, fileSize, uploadPercentage, deleteImage }) => {
  function bytesToKiloOrMegabytes(bytesValue) {
    if (bytesValue < 1024 * 1024) {
      const kilobytes = bytesValue / 1024;
      return kilobytes.toFixed(2) + ' KB';
    } else {
      const megabytes = bytesValue / (1024 * 1024);
      return megabytes.toFixed(2) + ' MB';
    }
  }
  return (
    <div className={'mt-10 flex gap-2 items-center pr-1.5'}>
      <div>
        <img
          src={src}
          className={' object-cover'}
          style={{ height: '50px', width: '50px', borderRadius: '4px' }}
          alt={''}
        />
      </div>
      <div className={'flex flex-col justify-between gap-1'}>
        <span className={'text-xs leading-4 font-medium text-gray-900'}>{fileName}</span>
        <div style={{ width: '328px', height: '100%' }}>
          <div className={'w-full relative rounded'} style={{ height: '6px', backgroundColor: '#D9D9D9' }}>
            <div
              className={'relative rounded'}
              style={{
                height: '7px',
                width: `${uploadPercentage}%`,
                backgroundColor: '#10B981',
              }}></div>
          </div>
        </div>
        <span className={'text-xs leading-4 font-medium text-gray-500'}>
          {bytesToKiloOrMegabytes(fileSize)} of 22 MB
        </span>
      </div>
      <div>
        <svg
          onClick={() => deleteImage(id)}
          className={'cursor-pointer'}
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="21"
          viewBox="0 0 20 21"
          fill="none">
          <g clipPath="url(#clip0_1146_1618)">
            <path
              d="M9.99999 2.60938C5.39166 2.60938 1.66666 6.33437 1.66666 10.9427C1.66666 15.551 5.39166 19.276 9.99999 19.276C14.6083 19.276 18.3333 15.551 18.3333 10.9427C18.3333 6.33437 14.6083 2.60938 9.99999 2.60938ZM14.1667 13.9344L12.9917 15.1094L9.99999 12.1177L7.00832 15.1094L5.83332 13.9344L8.82499 10.9427L5.83332 7.95104L7.00832 6.77604L9.99999 9.76771L12.9917 6.77604L14.1667 7.95104L11.175 10.9427L14.1667 13.9344Z"
              fill="#9CA3AF"
            />
          </g>
          <defs>
            <clipPath id="clip0_1146_1618">
              <rect width="20" height="20" fill="white" transform="translate(0 0.942871)" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
};
export default ImagesGrid;
