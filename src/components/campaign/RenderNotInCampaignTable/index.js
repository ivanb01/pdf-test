import SimpleBar from 'simplebar-react';
import NotInCampaignContactsTable from '@components/shared/table/NotInCampaignContactsTable';
import SpinnerLoader from '@components/shared/SpinnerLoader';
import React, { useEffect } from 'react';
import { useNotInCampaignContacts } from '../../../hooks/campaignHooks';
import useInfiniteScroll from 'react-infinite-scroll-hook';

const RenderNotInCampaignTable = ({
  id,
  processUnassignedContacts,
  category,
  usersInCampaignGlobally,
  updateCounts,
}) => {
  const {
    isFetching: isNotInCampaignFetching,
    isError: isNotInCampaignError,
    hasNextPage: isNotInCampaignHasNextPage,
    fetchNextPage,
    isLoading: isNotInCampaignLoading,
    data: notInCampaignData,
  } = useNotInCampaignContacts(id);

  const [notInCampaignInfiniteRef] = useInfiniteScroll({
    hasNextPage: isNotInCampaignHasNextPage,
    loading: isNotInCampaignFetching,
    onLoadMore: fetchNextPage,
    disabled: isNotInCampaignError,
  });
  useEffect(() => {
    if (notInCampaignData) {
      updateCounts('notInCampaignCount', notInCampaignData?.pages[0]?.total);
    }
  }, [notInCampaignData]);
  return (
    <SimpleBar style={{ height: 'calc(100vh - 271px)' }} autoHide>
      <div>
        {notInCampaignData && (
          <NotInCampaignContactsTable
            tableFor={'notInCampaignContacts'}
            data={processUnassignedContacts(notInCampaignData.pages.flatMap((p) => p?.contacts_not_in_campaign))}
            categoryType={category}
            status={usersInCampaignGlobally?.contact_status_1}
            status_2={usersInCampaignGlobally?.contact_status_2}
            isLoading={isNotInCampaignLoading}
          />
        )}
        {(isNotInCampaignHasNextPage || isNotInCampaignLoading || isNotInCampaignFetching) && (
          <div ref={notInCampaignInfiniteRef}>
            <SpinnerLoader />
          </div>
        )}
      </div>
    </SimpleBar>
  );
};

export default RenderNotInCampaignTable;
