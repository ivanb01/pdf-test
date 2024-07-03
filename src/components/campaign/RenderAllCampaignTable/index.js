import { useAllCampaignContacts } from '../../../hooks/campaignHooks';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import SimpleBar from 'simplebar-react';
import AllCampaignContactsTable from '@components/shared/table/AllCampaignContactsTable';
import { capitalize } from '@global/functions';
import SpinnerLoader from '@components/shared/SpinnerLoader';
import React, { useEffect } from 'react';

const RenderAllCampaignTable = ({
  category,
  usersInCampaignGlobally,
  processContacts,
  campaignEvents,
  id,
  updateCounts,
}) => {
  const {
    isFetching: isAllCampaignFetching,
    isError: isAllCampaignError,
    hasNextPage: allCampaignHasNextPage,
    fetchNextPage: allCampaignFetchNextPage,
    isLoading: isAllCampaignLoading,
    data: allCampaignData,
  } = useAllCampaignContacts(id);

  const [allCampaignInfiniteRef] = useInfiniteScroll({
    hasNextPage: allCampaignHasNextPage,
    loading: isAllCampaignFetching,
    onLoadMore: allCampaignFetchNextPage,
    disabled: isAllCampaignError,
  });
  useEffect(() => {
    if (allCampaignData) {
      updateCounts('allCampaignCount', allCampaignData?.pages[0]?.total_count);
      updateCounts('eventsCount', allCampaignData?.pages[0]?.events?.count);
    }
  }, [allCampaignData]);
  return (
    <SimpleBar style={{ height: 'calc(100vh - 271px)' }} autoHide>
      <div>
        {allCampaignData && (
          <AllCampaignContactsTable
            isFetching={isAllCampaignFetching}
            isLoading={isAllCampaignLoading}
            campaignData={campaignEvents}
            campaignId={id}
            tableFor={'allCampaignContacts'}
            campaignFor={
              category == 'Unknown'
                ? 'All Clients'
                : `${capitalize(category)} - ${usersInCampaignGlobally?.contact_status_2}`
            }
            paginationItems={processContacts(allCampaignData?.pages.flatMap((p) => p?.contacts))}
            categoryType={category}
            status={usersInCampaignGlobally?.contact_status_1}
            status_2={usersInCampaignGlobally?.contact_status_2}
          />
        )}
        <div ref={allCampaignInfiniteRef}>
          {(allCampaignHasNextPage || isAllCampaignLoading) && (
            <div className=" flex justify-center items-center bg-opacity-50">
              <SpinnerLoader />
            </div>
          )}
        </div>
      </div>
    </SimpleBar>
  );
};

export default RenderAllCampaignTable;
