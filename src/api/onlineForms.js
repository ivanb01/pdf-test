import axiosInstance from './axiosInstance';

export const fecthOnlineFormsTypes = () => {
  return axiosInstance.get('v1/online-forms/types');
};

export const fetchOnlineFormTypeById = (id) => {
  return axiosInstance.get(`v1/online-forms/types/${id}`);
};

export const addOnlineFormType = (formType) => {
  return axiosInstance.post('v1/online-forms/types', formType);
};

export const updateOnlineFormType = (id, formTypeData) => {
  return axiosInstance.put(`v1/online-forms/types/${id}`, formTypeData);
};

export const deleteOnlineFormType = (id) => {
  return axiosInstance.delete(`v1/online-forms/types/${id}`);
};

export const fecthOnlineForms = async (params) => {
  return axiosInstance.get('v1/online-forms', { params });
};

export const assignForm = (form) => {
  return axiosInstance.post('v1/online-forms', form);
};

export const deleteForm = (formId) => {
  return axiosInstance.delete(`v1/online-forms/${formId}`);
};

export const fetchOnlineForm = (id) => {
  return axiosInstance.get(`v1/online-forms/public/${id}`);
};

export const postOnlineForm = (fields) => {
  const { publicId, submitted_answers } = fields;
  return axiosInstance.put(`v1/online-forms/public/${publicId}`, { submitted_answers: submitted_answers });
};
