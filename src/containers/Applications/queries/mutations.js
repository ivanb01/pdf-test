import { useMutation } from '@tanstack/react-query';
import { postPropertyApplication, updatePropertyApplication, fetchCreditCheckReport } from '@api/applications';

export const usePostPropertyApplication = (options) => {
  return useMutation({
    mutationFn: async (applicationData) => {
      return postPropertyApplication(applicationData);
    },
    ...options,
  });
};
export const useUpdatePropertyApplication = (options) => {
  return useMutation({
    mutationFn: async ({ id, applicationData }) => {
      return updatePropertyApplication(id, applicationData);
    },
    ...options,
  });
};

export const useFetchCreditCheckReport = (options) => {
  return useMutation({
    mutationFn: async ({ id }) => {
      return fetchCreditCheckReport(id);
    },
    ...options,
  });
};
