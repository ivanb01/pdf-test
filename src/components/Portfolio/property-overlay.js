import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

const PropertyOverlay = ({ handleCloseOverlay, children, className, onNextClick, onPrevClick }) => {
  return (
    <div
      className={`overflow-y-scroll overflow-x-hidden fixed top-0 right-0 left-0 z-[99999] w-full md:inset-0 h-full md:h-modal bg-overlayBackground`}
    >
      <div className={'relative flex h-full justify-center items-center  z-[999999]'}>
        <div
          className={
            'z-[99999999] cursor-pointer absolute  md:top-[20px]   right-[10px] md:right-[20px] top-[10px] h-4 w-4 md:h-8 md:w-8 bg-gray5 text-white flex items-center justify-center align-center rounded-full'
          }
        >
          <ClearRoundedIcon className={'h-4 w-4'} onClick={() => handleCloseOverlay()} />
        </div>
        <div
          className={`relative p-2 md:p-4 h-full md:h-auto flex md:gap-[32px] gap-[10px] items-center justify-center z-[999999] w-[100%]`}
        >
          <ArrowBackIosRoundedIcon
            className={'w-[20px] md:w-[50px] text-white cursor-pointer '}
            onClick={onPrevClick}
          />
          <div
            className={`relative h-[100px] bg-white rounded-lg shadow overflow-scroll md:overflow-hidden ${className} h-full`}
          >
            {children}
          </div>
          <ArrowForwardIosRoundedIcon
            className={'w-[20px] md:w-[50px]  text-white cursor-pointer'}
            onClick={() => onNextClick()}
          />
        </div>
      </div>
    </div>
  );
};
export default PropertyOverlay;
