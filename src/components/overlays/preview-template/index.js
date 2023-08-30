import Overlay from '@components/shared/overlay';
import SimpleBar from 'simplebar-react';
import Button from '@components/shared/button';
import EastIcon from '@mui/icons-material/East';
const PreviewTemplate = ({ name, handleCloseOverlay }) => {
  return (
    <Overlay title={name && name} handleCloseOverlay={handleCloseOverlay} className="w-[800px]">
      <SimpleBar autoHide style={{ maxHeight: 'calc(100vh - 308px)', marginTop: '24px' }} className={'px-6'}>
        <img className="w-full object-cover rounded-lg" src="https://i.imgur.com/u3yJjo7.png" />
      </SimpleBar>
      <div className="flex justify-between py-4 px-6" style={{ boxShadow: '0px -2px 12px 1px rgba(0, 0, 0, 0.07)' }}>
        <Button secondary className={'text-lightBlue5 text-xs leading-4 font-medium'}>
          Download PDF
        </Button>
        <div>
          <Button className={`mr-4`} white onClick={handleCloseOverlay}>
            Cancel
          </Button>
          <Button primary rightIcon={<EastIcon fontSize={'16px'} />} onClick={handleCloseOverlay}>
            Order this template
          </Button>
        </div>
      </div>
    </Overlay>
  );
};

export default PreviewTemplate;
