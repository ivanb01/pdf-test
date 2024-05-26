import { useMutation } from '@tanstack/react-query';
import {
  addOnlineFormType,
  assignForm,
  deleteOnlineFormType,
  deleteForm,
  postOnlineForm,
  updateOnlineFormType,
} from '@api/onlineForms';
import { sendEmail } from '@api/email';

export const usePostOnlineFormType = (options) => {
  return useMutation({
    mutationFn: async (newOnlineFormType) => {
      return addOnlineFormType(newOnlineFormType);
    },
    ...options,
  });
};

export const usePostUpdateFormType = (options) => {
  return useMutation({
    mutationFn: async ({ id, templateData }) => {
      return updateOnlineFormType(id, templateData);
    },
    ...options,
  });
};
export const useDeleteFormType = (options) => {
  return useMutation({
    mutationFn: async (templateId) => {
      return deleteOnlineFormType(templateId);
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
    mutationFn: (form) => {
      return postOnlineForm(form);
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
