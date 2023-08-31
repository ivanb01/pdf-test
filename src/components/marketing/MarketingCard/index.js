import { useState } from 'react';
import Button from '@components/shared/button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import OrderTemplate from '@components/overlays/order-template';
import PreviewTemplate from '@components/overlays/preview-template';

const MarketingCard = ({ img, name }) => {
  const [openOrderTemplate, setOpenOrderTemplate] = useState(false);
  const [openPreviewTemplate, setOpenPreviewTemplate] = useState(false);

  return (
    <div className={'flex flex-col'}>
      <div className="group relative rounded-lg">
        <img className="w-full object-cover rounded-lg" src={img} style={{ height: '300px' }} alt={name} />
        <div className="absolute top-0 rounded-xl left-0 w-full h-0 flex flex-col justify-center items-center opacity-0 bg-transparentBlack group-hover:h-full  group-hover:opacity-100 duration-400">
          <Button
            primary
            label="Order this template"
            className={' mb-5 mt-[110px]'}
            onClick={() => setOpenOrderTemplate(true)}
          />
          <Button white label="Download PDF" className={' mb-8'} />
          <Button
            transparent
            className={'mb-[35px]'}
            label="Preview"
            leftIcon={<VisibilityIcon className={'h-4 w-4'} />}
            onClick={() => setOpenPreviewTemplate(true)}
          />
        </div>
      </div>
      <h3 className={'text-sm leading-5 font-medium mt-3'}>{name}</h3>
      {openOrderTemplate && <OrderTemplate name={name} handleCloseOverlay={() => setOpenOrderTemplate(false)} />}
      {openPreviewTemplate && <PreviewTemplate name={name} handleCloseOverlay={() => setOpenPreviewTemplate(false)} />}
    </div>
  );
};
export default MarketingCard;
