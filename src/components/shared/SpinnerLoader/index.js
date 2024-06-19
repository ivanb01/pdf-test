import { CircularProgress } from '@mui/material';

const SpinnerLoader = () => {
  return (
    <div className={'w-full flex items-center justify-center flex-col gap-[10px] py-5'}>
      <CircularProgress className="text-lightBlue3" size={25}></CircularProgress>
      <p className={'text-sm leading-5 font-normal text-gray4'}>Loading...</p>
    </div>
  );
};

export default SpinnerLoader;
