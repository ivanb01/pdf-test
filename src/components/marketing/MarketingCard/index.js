import { useState } from 'react';
import Button from '@components/shared/button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import OrderTemplate from '@components/overlays/order-template';
import PreviewTemplate from '@components/overlays/preview-template';

const MarketingCard = ({ src, title, listingUrl }) => {
  const [openOrderTemplate, setOpenOrderTemplate] = useState(false);
  const [openPreviewTemplate, setOpenPreviewTemplate] = useState(false);

  return (
    <div className={'flex flex-col'}>
      <div className="group relative rounded-lg">
        <img className="w-full object-cover rounded-lg" src={src[0].src} style={{ height: '300px' }} alt={title} />
        <div className="absolute top-0 rounded-xl left-0 w-full h-0 flex flex-col justify-center items-center opacity-0 bg-transparentBlack group-hover:h-full  group-hover:opacity-100 duration-400">
          <Button
            primary
            label="Order this template"
            className={' mb-5 mt-[85px]'}
            onClick={() => setOpenOrderTemplate(true)}
          />
          {/*<Button white label="Download PDF" className={' mb-8'} />*/}
          <Button
            transparent
            className={'mb-[35px]'}
            label="Preview"
            leftIcon={<VisibilityIcon className={'h-4 w-4'} />}
            onClick={() => setOpenPreviewTemplate(true)}
          />
        </div>
      </div>
      <h3 className={'text-sm leading-5 font-medium mt-3'}>{title}</h3>
      {openOrderTemplate && (
        <OrderTemplate
          listingUrl={listingUrl}
          template={src}
          name={title}
          handleCloseOverlay={() => setOpenOrderTemplate(false)}
        />
      )}
      {openPreviewTemplate && (
        <PreviewTemplate template={src} name={title} handleCloseOverlay={() => setOpenPreviewTemplate(false)} />
      )}
    </div>
  );
};
export default MarketingCard;
