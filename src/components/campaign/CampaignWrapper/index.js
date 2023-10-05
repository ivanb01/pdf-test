import CampaignCard from '@components/campaign/CampaignCard';

const CampaignWrapper = ({ headerTitle, campaignCards }) => {
  return (
    <>
      <div className={'p-[50px] pb-0'}>
        <div className={'text-sm leading-5 font-medium text-gray7 mb-[15px]'}>{headerTitle}</div>
        {campaignCards.length > 0 ? (
          <div className={'grid grid-cols-4 gap-6'}>
            {campaignCards.map((campaign) => {
              return <CampaignCard {...campaign} />;
            })}
          </div>
        ) : (
          <div className={'bg-gray10 text-xs leading-5 font-normal text-gray6 px-4 py-3'}>
            There is no campaign for Sellers yet.
          </div>
        )}
      </div>
    </>
  );
};

export default CampaignWrapper;
