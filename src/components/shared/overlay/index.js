import Button from '../button';
import Text from '../text';
import { useRouter } from 'next/router';

const Overlay = ({ handleCloseOverlay, children, className, bgOverlay = 'bg-overlayBackground', title }) => {
  const router = useRouter();
  return (
    <div
      className={`grid items-center justify-center overflow-y-auto overflow-x-hidden fixed top-40 right-0 left-0 z-[999] w-full md:inset-0 h-modal md:h-full ${bgOverlay}`}>
      <div className={`relative p-4 h-full md:h-auto ${className}`}>
        <div className={`relative bg-white rounded-lg shadow overflow-hidden`}>
          {title || handleCloseOverlay ? (
            <div className={`flex justify-between items-center ${title ? 'p-5' : 'p-5 pb-1'} rounded-t`}>
              <div className={`flex items-center`}>
                {title === 'Review AI Imported Contact' && (
                  <svg
                    onClick={() => router.back()}
                    className={'text-lightBlue3 mr-1.5 cursor-pointer'}
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M15.3509 6.79924C15.8271 7.26011 15.8396 8.01981 15.3787 8.49607L11.4927 12.5119L15.5085 16.3979C15.9848 16.8588 15.9972 17.6185 15.5364 18.0948C15.0755 18.571 14.3158 18.5835 13.8395 18.1226L8.96137 13.4021C8.48511 12.9412 8.47264 12.1815 8.93351 11.7053L13.6541 6.8271C14.1149 6.35084 14.8746 6.33837 15.3509 6.79924Z"
                      fill="#0EA5E9"
                    />
                  </svg>
                )}
                {title && typeof title === 'string' ? (
                  <Text h3 className="text-gray7">
                    {router.pathname.includes('/trash') ? 'Restore Contact' : title}
                  </Text>
                ) : (
                  title
                )}
              </div>
              {handleCloseOverlay && (
                <Button
                  closeButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCloseOverlay();
                  }}
                />
              )}
            </div>
          ) : null}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Overlay;
