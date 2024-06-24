import axios from 'axios';
import axiosInstance from 'api/axiosInstance';

export const getUser = () => {
  return axiosInstance.get(`/v2/user`);
};

export const updateUser = (user) => {
  return axiosInstance.put(`/v2/user`, user);
};

export const fetchUsers = (params) => {
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v2/users`, params);
};
