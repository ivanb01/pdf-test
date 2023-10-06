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

  return (
    <>
      <Overlay title={`Preview ${name && name}`} handleCloseOverlay={handleCloseOverlay} className="w-[600px]">
        <ImageGallery images={template} className={'object-contain'} includeZoom={true} />
        <div className="flex justify-end py-4 px-6" style={{ boxShadow: '0px -2px 12px 1px rgba(0, 0, 0, 0.07)' }}>
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
