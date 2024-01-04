import axiosInstance from 'api/axiosInstance';

export const getReports = () => {
  return axiosInstance.get(`v1/team/agent_report`);
};
