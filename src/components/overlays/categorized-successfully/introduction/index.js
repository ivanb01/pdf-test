import Overlay from 'components/shared/overlay';
import { Dialog } from '@headlessui/react';
import Image from 'next/image';

const IntroductionOverlay = ({
  handleOnboardingOverlayVisibile,
  visible = false,
  dialogDescription,
  dialogTitle,
  headerImg,
  children,
}) => {
  return (
    <Overlay handleCloseOverlay={() => console.log('test')} open={visible}>
      {visible && (
        <>
          <div>
            <div className="mx-auto flex items-center justify-center h-full mb-3">
              {headerImg && <Image src={headerImg} alt="header-img" />}
            </div>
            <div className="text-center sm:mt-0">
              <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                {dialogTitle}
              </Dialog.Title>
              <div className="mt-2 px-5">
                <p className="text-sm text-gray-500">{dialogDescription}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-5 sm:mt-6 sm:gap-3 sm:grid-flow-row-dense">{children}</div>
        </>
      )}
    </Overlay>
  );
};

export default IntroductionOverlay;
