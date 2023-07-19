import axiosInstance from 'api/axiosInstance';

export const getCategories = () => {
  return axiosInstance.get(`contact/categories`);
};
export const getStatuses = () => {
  return axiosInstance.get(`contact/statuses`);
};
