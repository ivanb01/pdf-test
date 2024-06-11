import Button from '../button';
import Text from '../text';
import { useRouter } from 'next/router';

const Overlay = ({
  handleCloseOverlay,
  children,
  className,
  bgOverlay = 'bg-overlayBackground',
  title,
  height,
  closeModal,
  alignStart,
  includeTitleBorder,
  titleButton,
  maxHeight,
}) => {
  const router = useRouter();
  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      className={`md:flex ${
        !alignStart && 'items-center'
      } justify-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[999] w-full md:inset-0 h-full md:h-modal ${bgOverlay}`}>
      <div className={`relative p-4 h-full ${maxHeight ? maxHeight : 'md:h-auto'} ${className}`}>
        <div className={`relative bg-white rounded-lg shadow overflow-scroll md:overflow-hidden h-full md:${height}`}>
          {title || handleCloseOverlay ? (
            <div
              className={`flex justify-between items-center ${title ? 'p-5' : 'p-5 pb-1'} rounded-t ${
                includeTitleBorder && 'border-b'
              }`}>
              <div className={`flex items-center justify-between w-full`}>
                <div className="flex items-center">
                  {(title === 'Review AI Smart Synced Contact' || title === 'Review AI Imported Contact') && (
                    <svg
                      onClick={() => router.back()}
                      xmlns="http://www.w3.org/2000/svg"
                      width="35"
                      height="35"
                      viewBox="0 0 35 35"
                      fill="none"
                      className={'cursor-pointer mr-4'}>
                      <circle cx="17.7305" cy="17.7305" r="17" fill="#F3F3F3" />
                      <path d="M19.8033 12.1123L14.1367 17.779L19.8033 23.4456" fill="#F3F3F3" />
                      <path
                        d="M19.8033 12.1123L14.1367 17.779L19.8033 23.4456"
                        stroke="#4B4B4B"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  {title && typeof title === 'string' ? (
                    <Text h3 className={`text-gray7`}>
                      {router.pathname.includes('/trash') ? 'Restore Contact' : title}
                    </Text>
                  ) : (
                    title
                  )}
                </div>

                {titleButton && titleButton}
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
              {closeModal && <Button closeButton onClick={closeModal} />}
            </div>
          ) : null}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Overlay;
