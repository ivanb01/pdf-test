import fetchJsonp from 'fetch-jsonp';

export const fetchProperties = async (filter = '', page = 1, status) => {
  let params = {
    apikey: '4d7139716e6b4a72',
    callback: 'callback',
    limit: 21,
    page,
    address: filter,
    includeContacts: true,
    status: 2,
  };
  const urlParams = new URLSearchParams({
    ...params,
  });
  const url = 'https://dataapi.realtymx.com/listings?' + urlParams.toString();
  const res = await fetchJsonp(url);
  return res.json();
};

export const fetchSingleProperty = async (id) => {
  let params = {
    apikey: '4d7139716e6b4a72',
    id,
  };
  const urlParams = new URLSearchParams({
    ...params,
  });
  const url = 'https://dataapi.realtymx.com/listings?' + urlParams.toString();
  const res = await fetchJsonp(url);
  return res.json();
};
