import axiosInstance from 'api/axiosInstance';

export const getReports = (limit, offset) => {
  return axiosInstance.get(`v1/team/agent_report`, {
    params: {
      limit: limit,
      offset: offset,
    },
  });
};
