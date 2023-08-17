import { InformationCircleIcon } from '@heroicons/react/solid';
import { XIcon } from '@heroicons/react/outline';
const Snackbar = ({
  title,
  description,
  danger,
  handleClose,
  absolute,
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
  fullWidth,
}) => {
  return (
    <div
      className={`p-4 border border-[#D14343] bg-[#FDF4F4] flex ${
        fullWidth ? 'w-full' : 'w-[480px]'
      } rounded-lg justify-between ${topLeft && 'absolute top-4 left-4'} ${topRight && 'absolute top-4 right-4'} ${
        bottomLeft && 'absolute bottom-4 left-4'
      } ${bottomRight && 'absolute bottom-4 right-4'}`}
    >
      <div className="flex">
        <div className="mr-2">
          <InformationCircleIcon height={20} className="text-[#D14343]" />
        </div>
        <div>
          <h2 className="text-sm text-[#A73636] font-medium">{title}</h2>
          <p className="text-sm text-[#696F8C]">{description}</p>
        </div>
      </div>
      <div className="inline-block">
        <XIcon className="text-[#7D2828] cursor-pointer" height={15} onClick={handleClose} />
      </div>
    </div>
  );
};

export default Snackbar;
