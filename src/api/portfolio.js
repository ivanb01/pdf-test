import axiosInstance from '@api/axiosInstance';

export const addPropertiesInPortfolio = (contact_ids, property_ids) => {
  return axiosInstance.post('v2/property-portfolio', {
    contact_ids,
    property_ids,
  });
};
