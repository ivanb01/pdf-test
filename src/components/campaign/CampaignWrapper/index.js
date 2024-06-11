import CampaignCard from '@components/campaign/CampaignCard';

const CampaignWrapper = ({ headerTitle, campaignCards, category, isVisible, openedTab }) => {
  return (
    <>
      <div className={'p-[50px] pb-0'}>
        <div className={'text-sm leading-5 font-medium text-gray7 mb-[15px]'}>{headerTitle}</div>
        {campaignCards?.length > 0 ? (
          <div className={'grid grid-cols-4 gap-6'}>
            {campaignCards.map((campaign, key) => {
              return (
                <CampaignCard key={key} {...campaign} isVisible={isVisible} category={category} openedTab={openedTab} />
              );
            })}
          </div>
        ) : (
          <div className={'bg-gray10 text-xs leading-5 font-normal text-gray6 px-4 py-3'}>
            {category === 'All Client' ? 'There is no campaign yet' : `There is no campaign for ${category}s yet.`}
          </div>
        )}
      </div>
    </>
  );
};

export default CampaignWrapper;
