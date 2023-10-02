import Overlay from '@components/shared/overlay';
import SimpleBar from 'simplebar-react';
import Button from '@components/shared/button';
import EastIcon from '@mui/icons-material/East';
import OrderTemplate, { ImageGallery } from '@components/overlays/order-template';
import { useState } from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
const PreviewTemplate = ({ template, name, handleCloseOverlay }) => {
  const [openOrderTemplate, setOpenOrderTemplate] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const showButtons = template?.length > 1;
  const showPrevButton = showButtons && currentIndex > 0;
  const showNextButton = showButtons && currentIndex < template.length - 1;
  const showNextImage = () => {
    setCurrentIndex((currentIndex + 1) % template.length);
  };

  const showPrevImage = () => {
    setCurrentIndex((currentIndex - 1 + template.length) % template.length);
  };
  return (
    <>
      <Overlay title={`Preview ${name && name}`} handleCloseOverlay={handleCloseOverlay} className="w-[800px]">
        <div className={`px-6 flex ${showNextButton ? 'justify-end' : 'justify-start'} relative`}>
          {showNextButton && (
            <Button
              ternary
              size={'small'}
              className={'cursor-pointer'}
              onClick={() => showNextImage()}
              rightIcon={<KeyboardArrowRightIcon className={'h-5 w-5 pb-1'} />}>
              Next
            </Button>
          )}
          {showPrevButton && (
            <Button
              ternary
              size={'small'}
              className={'cursor-pointer'}
              onClick={() => showPrevImage()}
              leftIcon={<KeyboardArrowLeftIcon className={'h-5 w-5 pb-1'} />}>
              Prev
            </Button>
          )}
        </div>
        <SimpleBar autoHide style={{ maxHeight: 'calc(100vh - 308px)', marginTop: '16px' }} className={'px-6'}>
          <img
            className={`w-full object-cover rounded-lg h-auto`}
            src={template[currentIndex].src}
            style={{ height: '500px' }}
          />
          {/*<ImageGallery images={template} className={'h-auto'} preview={false} />*/}
        </SimpleBar>
        <div className="flex justify-end py-4 px-6" style={{ boxShadow: '0px -2px 12px 1px rgba(0, 0, 0, 0.07)' }}>
          {/*<Button secondary className={'text-lightBlue5 text-xs leading-4 font-medium'}>*/}
          {/*  Download PDF*/}
          {/*</Button>*/}
          <div>
            <Button className={`mr-4`} white onClick={handleCloseOverlay}>
              Cancel
            </Button>
            <Button
              primary
              rightIcon={<EastIcon fontSize={'16px'} />}
              onClick={() => {
                setOpenOrderTemplate(true);
              }}>
              Order this template
            </Button>
          </div>
        </div>
      </Overlay>
      {openOrderTemplate && (
        <OrderTemplate
          template={template}
          name={name}
          handleCloseOverlay={() => {
            setOpenOrderTemplate(false);
            handleCloseOverlay();
          }}
        />
      )}
    </>
  );
};

export default PreviewTemplate;
