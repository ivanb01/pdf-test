import backArrow from '/public/images/back-arrow.svg';
import Image from 'next/image';

const Text = ({
  className,
  h1,
  h2,
  h3,
  h4,
  h5,
  p,
  smallText,
  chipText,
  children,
  title,
  back = false,
  funnelArrow,
  onBackClick,
}) => {
  let styles = '';
  if (title) {
    styles = 'text-3xl font-extrabold';
  } else if (h1) {
    styles = 'text-2xl font-bold';
  } else if (h2) {
    styles = 'text-lg font-medium';
  } else if (h3) {
    styles = 'text-base font-medium';
  } else if (h4) {
    styles = 'text-sm font-medium';
  } else if (p) {
    styles = 'text-sm font-normal';
  } else if (smallText) {
    styles = 'text-xs font-normal';
  } else if (chipText) {
    styles = 'text-[12px] uppercase';
  }
  return (
    <div className={`${className} ${styles} relative flex items-center`}>
      {funnelArrow && (
        <div className="absolute -left-3 leading-[1.4]">{'>'}</div>
      )}
      {onBackClick && (
        <div className="inline-block">
          <div className="mr-2 cursor-pointer flex items-center">
            <Image
              height={20}
              width={20}
              src={backArrow}
              onClick={onBackClick}
            />
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

export default Text;
