import axios from 'axios';
import fetchJsonp from 'fetch-jsonp';

export const getProperties = async (filters) => {
  let properties = {
    apikey: '4d7139716e6b4a72',
    callback: 'callback',
  };
  if (filters.neighborhood_ids) properties['neighborhood_id'] = filters.neighborhood_ids;
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

  await fetchJsonp('https://dataapi.realtymx.com/listings?apikey=4d7139716e6b4a72&callback=callback')
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
};
