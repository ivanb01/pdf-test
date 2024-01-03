import axiosInstance from 'api/axiosInstance';

export const getCategories = () => {
  return axiosInstance.get(`v1/contact/categories`);
};
export const getStatuses = () => {
  return axiosInstance.get(`v1/contact/statuses`);
};
