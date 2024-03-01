import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { getContacts } from '@api/contacts';
import { fecthOnlineFormsTypes, fetchOnlineFormTypeById, fecthOnlineForms, fetchOnlineForm } from '@api/onlineForms';

export const useFetchOnlineFormsTypes = (options) => {
  return useQuery({
    queryKey: ['online-forms-types'],
    queryFn: fecthOnlineFormsTypes,
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

export const useFetchOnlineFormTypeById = (typeId) => {
  return useQuery({
    queryKey: [`online-form-type-${typeId}`],
    queryFn: () => fetchOnlineFormTypeById(typeId),
    enabled: !!typeId,
    refetchOnWindowFocus: false,
  });
};

export const useFetchOnlineFormsPaginated = (params, options) => {
  const { form_type_id, search_param } = params;
  return useInfiniteQuery({
    queryKey: [`online-forms-page-${form_type_id ? 'form_type_id-' + form_type_id : ''}-search-${search_param}`],
    queryFn: (query) => fecthOnlineForms({ page: query.pageParam, ...params }),

    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.data.next_page ? lastPage.data.page + 1 : undefined;
    },
    refetchOnWindowFocus: false,
    ...options,
  });
};

export const useFetchOnlineForm = (id, options) => {
  return useQuery({
    queryKey: ['online-form'],
    queryFn: () => fetchOnlineForm(id),
    refetchOnWindowFocus: false,
    ...options,
  });
};
