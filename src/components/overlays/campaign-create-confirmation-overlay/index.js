import Overlay from '@components/shared/overlay';
import Button from '@components/shared/button';
import PropTypes from 'prop-types';

const CampaignCreateConfirmationOverlay = ({ setOpenConfirmationDialog, onCancel }) => {
  return <Overlay>
    <div className={'p-6 flex gap-[40px] flex-col'}>
      <div className={'flex gap-3'}>
        <svg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30' fill='none'>
          <g clip-path='url(#clip0_3419_63489)'>
            <path
              d='M14.9997 29.7694C23.1565 29.7694 29.7689 23.157 29.7689 15.0002C29.7689 6.84337 23.1565 0.230957 14.9997 0.230957C6.84288 0.230957 0.230469 6.84337 0.230469 15.0002C0.230469 23.157 6.84288 29.7694 14.9997 29.7694Z'
              fill='#F15F50' />
            <path opacity='0.2'
                  d='M28.8474 20.1693L16.1089 7.43086C16.0628 7.36163 15.9935 7.31547 15.9474 7.26932L15.9243 7.24624C15.232 6.66932 14.1243 6.83086 13.6628 7.73086L7.08585 20.9539C6.80892 21.4847 6.90123 22.0616 7.22431 22.5001C7.31662 22.6155 7.40892 22.7309 7.54738 22.8232L14.5166 29.7924C14.6782 29.7924 14.8628 29.8155 15.0243 29.8155C21.3474 29.7693 26.7474 25.777 28.8474 20.1693Z'
                  fill='#231F20' />
            <path
              d='M22.9149 20.954L16.3149 7.73094C15.7611 6.64633 14.2149 6.64633 13.6841 7.73094L7.08415 20.954C6.59953 21.9233 7.31492 23.0771 8.39953 23.0771H21.5995C22.7072 23.0771 23.3995 21.9233 22.9149 20.954ZM14.9995 21.0463C14.4918 21.0463 14.0765 20.6309 14.0765 20.1233C14.0765 19.6156 14.4918 19.2002 14.9995 19.2002C15.5072 19.2002 15.9226 19.6156 15.9226 20.1233C15.9226 20.6309 15.5072 21.0463 14.9995 21.0463ZM15.5995 17.7002H14.3995L13.9149 12.3694H16.0611L15.5995 17.7002Z'
              fill='white' />
          </g>
          <defs>
            <clipPath id='clip0_3419_63489'>
              <rect width='30' height='30' fill='white' />
            </clipPath>
          </defs>
        </svg>
        <div>
          <p className={'text-lg leading-6 font-medium text-gray7 mb-3'}>Are you sure you want to cancel?</p>
          <p className={'text-sm leading-5 font-normal mb-4 text-gray4'}>If you cancel while creating the campaign, al
            work will be lost.</p>
          <p className={'text-sm leading-5 font-normal text-gray4'}>Are you sure you want to cancel?</p>
        </div>
      </div>
      <div className={'flex justify-end items-center gap-3'}>
        <Button white onClick={() => {
          setOpenConfirmationDialog(false);
        }}>Cancel</Button>
        <Button danger onClick={onCancel}>Yes, Cancel</Button>
      </div>
    </div>
  </Overlay>;
};
export default CampaignCreateConfirmationOverlay;

CampaignCreateConfirmationOverlay.propTypes = {
  setOpenConfirmationDialog: PropTypes.func,
  onCancel: PropTypes.func,
};
