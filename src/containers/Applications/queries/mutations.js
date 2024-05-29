import { useMutation } from '@tanstack/react-query';
import { postPropertyApplication, updatePropertyApplication } from '@api/applications';

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
