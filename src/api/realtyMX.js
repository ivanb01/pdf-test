import axios from 'axios';

export const getProperties = (filters) => {
  let properties = {
    apikey: '4d7139716e6b4a72',
  };
  if (filters.neighborhood_ids)
    properties['neighborhood_id'] = filters.neighborhood_ids;
  if (filters.budget_min) properties['priceMin'] = filters.budget_min;
  if (filters.budget_max) properties['priceMax'] = filters.budget_max;
  if (filters.bedrooms) {
    properties['bedsMin'] = filters.bedrooms;
    properties['bedsMax'] = filters.bedrooms;
  }
  if (filters.bathrooms) {
    properties['bathsMin'] = filters.bathrooms;
    properties['bathsMax'] = filters.bathrooms;
  }
  console.log(properties);

  return axios.get(`https://dataapi.realtymx.com/listings`, {
    params: properties,
  });
};
