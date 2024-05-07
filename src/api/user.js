import axiosInstance from 'api/axiosInstance';

export const getUser = () => {
  return axiosInstance.get(`/v2/user`);
};

export const updateUser = (user) => {
  return axiosInstance.put(`/v2/user`, user);
};
