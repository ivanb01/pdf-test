import CampaignCard from '@components/campaign/CampaignCard';

const CampaignWrapper = ({ headerTitle, campaignCards, category, isVisible }) => {
  return (
    <>
      <div className={'p-[50px] pb-0'}>
        <div className={'text-sm leading-5 font-medium text-gray7 mb-[15px]'}>{headerTitle}</div>
        {campaignCards?.length > 0 ? (
          <div className={'grid grid-cols-4 gap-6'}>
            {campaignCards.map((campaign, key) => {
              return <CampaignCard key={key} {...campaign} isVisible={isVisible} category={category} />;
            })}
          </div>
        ) : (
          <div className={'bg-gray10 text-xs leading-5 font-normal text-gray6 px-4 py-3'}>
            There are no campaigns for {category}s currently available.
          </div>
        )}
      </div>
    </>
  );
};

export default CampaignWrapper;
