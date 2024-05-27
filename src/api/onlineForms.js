import axios from 'axios';
import axiosInstance from './axiosInstance';

export const fetchOnlineFormsTypes = async ({ params }) => {
  return axiosInstance.get('v1/online-forms/types', { params: params });
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
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/online-forms/public/${id}`);
};

export const postOnlineForm = (form) => {
  const { public_identifier } = form;
  return axiosInstance.put(`v1/online-forms/public/${public_identifier.hex}`, form);
};

export const postOnlineFormPublic = (form) => {
  const { public_identifier } = form;
  return axios.put(`${process.env.NEXT_PUBLIC_API_URL}/v1/online-forms/public/${public_identifier.hex}`, form);
};
