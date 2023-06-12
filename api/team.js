import axiosInstance from 'api/axiosInstance';

export const getReports = () => {
  return axiosInstance.get(`team/agent_report`);
};
