import Button from '../button';
import Text from '../text';
const Overlay = ({ handleCloseOverlay, children, className, bgOverlay = 'bg-overlayBackground', title }) => {
  return (
    <div
      className={`flex items-center justify-center overflow-y-auto overflow-x-hidden fixed top-40 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full ${bgOverlay}`}>
      <div className={`relative p-4 h-full md:h-auto ${className}`}>
        <div className="relative bg-white rounded-lg shadow overflow-hidden">
          {title || handleCloseOverlay ? (
            <div className={`flex justify-between items-center ${title ? 'p-5' : 'p-5 pb-1'} rounded-t`}>
              {title && (
                <Text h3 className="text-gray7">
                  {title}
                </Text>
              )}
              {handleCloseOverlay && <Button closeButton onClick={handleCloseOverlay} />}
            </div>
          ) : null}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Overlay;
