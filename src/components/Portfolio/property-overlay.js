import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

const ProprtyOverlay = ({ handleCloseOverlay, children, className, onNextClick, onPrevClick }) => {
  return (
    <div
      className={`overflow-y-scroll overflow-x-hidden fixed top-0 right-0 left-0 z-[99999] w-full md:inset-0 h-full md:h-modal bg-overlayBackground`}>
      <div className={'relative flex h-full justify-center items-center  z-[999999]'}>
        <div
          className={
            'z-[99999999] cursor-pointer absolute top-[20px] right-[20px] h-8 w-8 bg-gray5 text-white flex items-center justify-center align-center rounded-full'
          }>
          <ClearRoundedIcon onClick={() => handleCloseOverlay()} />
        </div>
        <div
          className={`relative p-4 h-full md:h-auto flex gap-[32px]  items-center justify-center z-[999999] w-[100%]`}>
          <ArrowBackIosRoundedIcon className={'w-[50px] text-white cursor-pointer '} onClick={onPrevClick} />
          <div
            className={`relative h-[100px] bg-white rounded-lg shadow overflow-scroll md:overflow-hidden ${className} h-full`}>
            {children}
          </div>
          <ArrowForwardIosRoundedIcon className={'w-[50px] text-white cursor-pointer'} onClick={() => onNextClick()} />
        </div>
      </div>
    </div>
  );
};
export default ProprtyOverlay;
