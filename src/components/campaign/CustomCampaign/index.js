import Button from '@components/shared/button';
import CustomCampaignImage from '../../../../public/images/campaign/customCampaign.png';

const CustomCampaign = ({ onClick }) => {
  return (
    <div className={'mx-[50px] mb-12 mt-[50px] py-10 px-16 bg-[#C5EBF8] h-[300px] flex gap-8 rounded-lg'}>
      <div className={' flex flex-col justify-center content-between'}>
        <div>
          <h3 className={'text-3xl leading-9 font-extrabold text-gray8 mb-3'}> Didn’t find what you’re looking for?</h3>
          <p className={'text-lg leading-6 font-normal text-gray7 mb-8'}>
            Craft a personalized campaign that fits your brand's vision and goals. Stand out and engage your audience
            with a custom campaign designed by you for your clients.
          </p>
          <Button onClick={onClick} primary>
            Create Custom Campaign
          </Button>
        </div>
      </div>
      <img src={CustomCampaignImage.src} style={{ height: '220px', width: '330px' }} alt={''} />
    </div>
  );
};

export default CustomCampaign;
