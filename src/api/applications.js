import axios from 'axios';
import axiosInstance from './axiosInstance';

export const postPropertyApplication = (applicationData) => {
  return axios.post(`${process.env.NEXT_PUBLIC_API_URL}/v1/property-applications/public`, applicationData);
};

export const updatePropertyApplication = (id, applicationData) => {
  return axiosInstance.put(`v1/property-applications/public/${id}`, applicationData);
};

export const fetchPropertyApplications = (params) => {
  return axiosInstance.get('v1/property-applications', { params });
};

export const fetchPropertyApplicationById = (id) => {
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/property-applications/public/${id}`);
};

export const runCreditCheck = (id) => {
  return axiosInstance.post(`v1/property-applications/credit-check/${id}`);
};

export const fetchCreditCheckReport = (id) => {
  return axiosInstance.post(`v1/property-applications/credit-report/${id}`);
};

export const generateCreditCheckPaymenkLink = async (id) => {
  return await axiosInstance.get(`v1/property-applications/payment-link/${id}`);
};

export const fetchApplicationDocuments = (id) => {
  return axiosInstance.get(`v1/property-applications/${id}/documents`);
};
