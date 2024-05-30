import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { getContacts } from "@api/contacts";
import { fetchOnlineFormsTypes, fetchOnlineFormTypeById, fecthOnlineForms, fetchOnlineForm } from "@api/onlineForms";

export const useFetchOnlineFormsTypes = (params = {}, options) => {
  return useQuery({
    queryKey: [`online-forms-types`, { ...params }],
    queryFn: () => fetchOnlineFormsTypes({ params }),
    refetchOnWindowFocus: false,
    ...options,
  });
};

export const useFetchAllClients = (options) => {
  return useQuery({
    queryKey: ["clients"],
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
  const { form_type_id, search_param, status } = params;
  return useInfiniteQuery({
    queryKey: [
      `online-forms-page-${form_type_id ? "form_type_id-" + form_type_id : ""}-search-${search_param}-status-${status}`,
    ],
    queryFn: (query) => {
      return fecthOnlineForms({ page: query.pageParam, ...params });
    },

    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      return lastPage.data.has_next_page ? lastPageParam + 1 : undefined;
    },
    refetchOnWindowFocus: false,
    ...options,
  });
};

export const useFetchOnlineForm = (id, options) => {
  return useQuery({
    queryKey: ["online-form"],
    queryFn: () => fetchOnlineForm(id),
    refetchOnWindowFocus: false,
    ...options,
  });
};
