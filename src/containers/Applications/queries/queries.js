import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { fetchProperties, fetchSingleProperty } from '@api/properties';
import {
  fetchPropertyApplications,
  fetchPropertyApplicationById,
  generateCreditCheckPaymenkLink,
} from '@api/applications';
import { getContacts } from '@api/contacts';

export const useFetchProperties = (search, options) => {
  return useQuery({
    queryKey: [`properties-${search}`],
    queryFn: () => fetchProperties(search),
    ...options,
  });
};

export const useFetchSingleProperty = (id, options) => {
  return useQuery({
    queryKey: [`property-${id}`],
    queryFn: () => fetchSingleProperty(id),
    ...options,
  });
};

export const useFetchPropertyApplicationsPaginated = (params, options) => {
  const { search_param } = params;
  return useInfiniteQuery({
    queryKey: [`property-applications-search-${search_param}`],
    queryFn: (query) => {
      return fetchPropertyApplications({ page: query.pageParam, ...params });
    },

    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      return lastPage.data.has_next_page ? lastPageParam + 1 : undefined;
    },
    refetchOnWindowFocus: false,
    select: (data) => {
      return {
        ...data,
        pages: data.pages.map((page) => {
          const pageData = {
            ...page.data,
            data: { data: page.data.items },
          };
          delete pageData.items;
          return {
            ...page,
            ...pageData,
          };
        }),
      };
    },
    ...options,
  });
};

export const useFetchPropertyApplicationById = (applicationId, options) => {
  return useQuery({
    queryKey: [`property-application-${applicationId}`],
    queryFn: () => fetchPropertyApplicationById(applicationId),
    enabled: !!applicationId,
    select: ({ data }) => {
      return data;
    },
    refetchOnWindowFocus: false,
    ...options,
  });
};

export const useFetchAllClients = (options) => {
  return useQuery({
    queryKey: ['clients'],
    queryFn: getContacts,
    ...options,
  });
};

export const useGenerateCreditCheckPaymenkLink = () => {
  return useQuery({
    queryKey: ['generated-payment-link', id],
    queryFn: (id) => generateCreditCheckPaymenkLink(id),
    enabled: false,
    ...options,
  });
};
