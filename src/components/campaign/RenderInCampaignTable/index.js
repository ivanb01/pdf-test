import InCampaignContactsTable from '@components/shared/table/InCampaignContactsTable';
import SpinnerLoader from '@components/shared/SpinnerLoader';
import SimpleBar from 'simplebar-react';
import React, { useEffect } from 'react';
import { useInCampaignContacts } from '../../../hooks/campaignHooks';
import useInfiniteScroll from 'react-infinite-scroll-hook';

const RenderInCampaignTable = ({ category, usersInCampaignGlobally, setCurrentButton, id, updateCounts }) => {
  const {
    isFetching: isInCampaignFetching,
    isError: isInCampaignError,
    hasNextPage: isInCampaignHasNextPage,
    fetchNextPage: inCampaignHasNextPage,
    isLoading: isInCampaignLoading,
    data: inCampaignData,
  } = useInCampaignContacts(id);

  const [inCampaignInfiniteRef] = useInfiniteScroll({
    hasNextPage: isInCampaignHasNextPage,
    loading: isInCampaignFetching,
    onLoadMore: inCampaignHasNextPage,
    disabled: isInCampaignError,
  });
  useEffect(() => {
    if (inCampaignData) {
      updateCounts('inCampaignCount', inCampaignData?.pages[0]?.total);
    }
  }, [inCampaignData]);
  return (
    <SimpleBar style={{ height: 'calc(100vh - 388px)' }} autoHide>
      <div>
        {inCampaignData && (
          <InCampaignContactsTable
            isLoading={isInCampaignLoading || isInCampaignFetching}
            tableFor={'inCampaignContacts'}
            data={inCampaignData.pages.flatMap((p) => p?.contacts_in_campaign)}
            setCurrentButton={setCurrentButton}
            categoryType={category}
            status={usersInCampaignGlobally?.contact_status_1}
            status_2={usersInCampaignGlobally?.contact_status_2}
          />
        )}
        {(isInCampaignHasNextPage || isInCampaignFetching || isInCampaignLoading) && (
          <div ref={inCampaignInfiniteRef}>
            <SpinnerLoader />
          </div>
        )}
      </div>
    </SimpleBar>
  );
};

export default RenderInCampaignTable;
