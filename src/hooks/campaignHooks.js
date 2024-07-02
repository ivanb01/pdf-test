import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import {
  assignContactToCampaign,
  getCampaignPagination,
  getInCampaignContacts,
  getNotInCampaignContacts,
  unassignContactFromCampaign,
} from '@api/campaign';
import { queryClient } from '../pages/_app';

export const useAllCampaignContacts = (id) => {
  return useInfiniteQuery({
    queryKey: ['all_campaign_contacts', id],
    gcTime: 72000000,
    queryFn: async ({ pageParam = 0 }) => {
      const data = await getCampaignPagination(id, pageParam);
      return data.data;
    },
    enabled: id !== undefined,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      const lastPageParam = pages?.length * 10;
      if (lastPageParam <= pages[0]?.total_count) {
        return lastPageParam;
      } else {
        return undefined;
      }
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};

export const useNotInCampaignContacts = (id) => {
  return useInfiniteQuery({
    queryKey: ['not_in_campaign_contacts', id],
    queryFn: async ({ pageParam = 0 }) => {
      const data = await getNotInCampaignContacts(id, pageParam);
      return data.data;
    },
    gcTime: 72000000,
    enabled: id !== undefined,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      const lastPageParam = pages?.length * 10;
      if (lastPageParam <= pages[0]?.total) {
        return lastPageParam;
      } else {
        return undefined;
      }
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};

export const useInCampaignContacts = (id) => {
  return useInfiniteQuery({
    queryKey: ['in_campaign_contacts', id],
    queryFn: async ({ pageParam = 0 }) => {
      const data = await getInCampaignContacts(id, pageParam);
      return data.data;
    },
    gcTime: 72000000,
    enabled: id !== undefined,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      const lastPageParam = pages?.length * 10;
      if (lastPageParam <= pages[0]?.total) {
        return lastPageParam;
      } else {
        return undefined;
      }
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};

export const useDeactivateContactFromCampaign = () => {
  return useMutation({
    mutationFn: async ({ campaignId, activePerson }) => {
      await unassignContactFromCampaign(campaignId, activePerson);
    },
    onSuccess: (data, variables) => {
      queryClient.setQueriesData({ queryKey: ['in_campaign_contacts', variables.campaignId] }, (data) => {
        return {
          ...data,
          pages: data?.pages?.flatMap((p) => {
            return {
              ...p,
              contacts_in_campaign: p.contacts_in_campaign.filter((c) => c.contact_id != variables.activePerson),
              total: p.total - 1,
            };
          }),
        };
      });
      queryClient.setQueryData(['not_in_campaign_contacts', variables?.campaignId], (data) => {
        return {
          ...data,
          pages: data?.pages?.flatMap((p) => {
            return {
              ...p,
              total: p?.total + 1,
            };
          }),
        };
      });
      queryClient.invalidateQueries({ queryKey: ['not_in_campaign_contacts', variables?.campaignId] });
    },
  });
};

export const useAssignContactToCampaign = () => {
  return useMutation({
    mutationFn: async ({ campaignId, activePerson, timeZone }) => {
      return await assignContactToCampaign(campaignId, activePerson?.contact_id, timeZone);
    },
    onSuccess: (_, variables) => {
      console.log(variables, 'variables');
      queryClient.setQueryData(['not_in_campaign_contacts', variables?.campaignId], (data) => {
        return {
          ...data,
          pages: data?.pages?.flatMap((p) => {
            return {
              ...p,
              contacts_not_in_campaign: p?.contacts_not_in_campaign?.filter((c) => {
                return c.contact_id != variables?.activePerson?.contact_id;
              }),
              total: p?.total - 1,
            };
          }),
        };
      });
      queryClient.invalidateQueries({ queryKey: ['in_campaign_contacts', variables?.campaignId] });
    },
  });
};

export const useChangeCampaignStatus = (campaignStatus, timeZone) => {
  return useMutation({
    mutationFn: ({ campaignId, activePerson }) => {
      if (campaignStatus === 'never_assigned') {
        return assignContactToCampaign(campaignId, activePerson, timeZone);
      } else {
        return unassignContactFromCampaign(campaignId, activePerson);
      }
    },
    onSuccess: (response, variables) => {
      queryClient.setQueryData(['all_campaign_contacts', variables?.campaignId], (data) => {
        return {
          ...data,
          pages: data?.pages?.flatMap((p) => {
            return {
              ...p,
              contacts: p?.contacts?.map((c) => {
                console.log(c.contact_id, variables.activePerson);
                if (c.contact_id == variables.activePerson) {
                  if (campaignStatus === 'never_assigned') {
                    return {
                      ...c,
                      campaign_contact: { enrollment_date: new Date(), contact_campaign_status: 'assigned' },
                    };
                  } else {
                    return {
                      ...c,
                      campaign_contact: { unenrollment_date: new Date(), contact_campaign_status: 'unassigned' },
                    };
                  }
                }
                return c;
              }),
            };
          }),
        };
      });
    },
  });
};
