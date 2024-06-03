import { useMutation } from '@tanstack/react-query';
import {
  postPropertyApplication,
  updatePropertyApplication,
  runCreditCheck,
  fetchCreditCheckReport,
} from '@api/applications';

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

export const useRunCreditCheck = (options) => {
  return useMutation({
    mutationFn: async ({ id }) => {
      return runCreditCheck(id);
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
