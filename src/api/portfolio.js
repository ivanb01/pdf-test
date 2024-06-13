import axiosInstance from '@api/axiosInstance';
import axios from 'axios';

export const addPropertiesInPortfolio = (contact_ids, property_ids) => {
  return axiosInstance.post('v2/property-portfolio', {
    contact_ids,
    property_ids,
  });
};

export const getPortfolioByShareId = (id) => {
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v2/property-portfolio/share/${id}`);
};

export const putClientFeedback = (id, status, note) => {
  return axios.put(`${process.env.NEXT_PUBLIC_API_URL}/v2/property-portfolio/property/share/${id}`, {
    status,
    note: note ?? '',
  });
};

export const updatePropertiesInPortfolio = (id) => {
  return axiosInstance.put('/v2/property-portfolio', {
    ids: [id],
    status: 'saved',
  });
};
export const getPortfolioByContactId = (id) => {
  return axiosInstance.get(`v2/property-portfolio/${id}`, {
    params: { status: 'all' },
  });
};

export const deletePropertyFromPortfolio = (ids) => {
  return axiosInstance.delete(`v2/property-portfolio`, {
    data: {
      ids: [ids],
    },
  });
};
