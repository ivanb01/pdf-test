import { useMutation } from '@tanstack/react-query';
import { addOnlineFormType, assignForm, deleteForm, postOnlineForm } from '@api/onlineForms';
import { sendEmail } from '@api/email';
export const usePostOnlineFormType = (options) => {
  return useMutation({
    mutationFn: async (newOnlineFormType) => {
      return addOnlineFormType(newOnlineFormType);
    },
    ...options,
  });
};

export const useAssignForm = (options) => {
  return useMutation({
    mutationFn: async (form) => {
      return assignForm(form);
    },
    ...options,
  });
};

export const useDeleteForm = (options) => {
  return useMutation({
    mutationFn: async (formId) => {
      return deleteForm(formId);
    },
    ...options,
  });
};

export const usePostOnlineForm = (options) => {
  return useMutation({
    mutationFn: (fields) => {
      return postOnlineForm(fields);
    },
    ...options,
  });
};

export const useSendEmail = (options) => {
  return useMutation({
    mutationFn: (emailBody) => {
      return sendEmail(emailBody);
    },
    ...options,
  });
};
