const EmptyPortfolioState = ({ status }) => {
  return (
    <div className={'h-[80%] flex items-center justify-center text-center w-full flex-col gap-3'}>
      <h4 className={'text-xl leading-7 font-semibold text-gray7'}>
        {status === 0 ? 'No Properties in Portfolio Yet' : `No ${status === 1 ? 'Liked' : 'Disliked'} Properties Yet`}
      </h4>
      <p className={'text-base leading-6 font-medium w-[352px] text-gray8'}>
        {status === 0
          ? "So far, there haven't been any properties that you've to review."
          : `So far, there haven't been any properties that you've ${status === 1 ? 'liked' : 'disliked'}.`}
      </p>
    </div>
  );
};
export const EmptyPortfolioClientDetails = ({ status }) => {
  return (
    <div className={'mt-[60px] flex items-center justify-center text-center w-full flex-col'}>
      <h4 className={'font-semibold mb-2 text-gray7 text-base'}>
        {status === 1 ? 'No Properties in Portfolio Yet' : `No ${status === 2 ? 'Liked' : 'Disliked'} Properties Yet.`}
      </h4>
      <p className={'text-gray5 text-sm mb-6 font-medium w-[352px]'}>
        {status === 1
          ? "So far, there haven't been any properties to review."
          : `So far, there haven't been any properties ${status === 2 ? 'liked' : 'disliked'}.`}
      </p>
    </div>
  );
};

export default EmptyPortfolioState;
