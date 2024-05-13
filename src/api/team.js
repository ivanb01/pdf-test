import axiosInstance from 'api/axiosInstance';

export const getReports = (limit, offset, sort_by) => {
  return axiosInstance.get(`v1/team/agent_report`, {
    params: {
      limit: limit,
      offset: offset,
      sort_by: sort_by
    },
  });
};
