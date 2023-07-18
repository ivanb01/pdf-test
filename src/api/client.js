import axios from 'axios';

export const getClients = () =>
  axios.get(`${process.env.NEXT_PUBLIC_CLIENT_API_BASE_URL}/v1/client/oxford`);

export const addClient = (client) =>
  axios.post(
    `${process.env.NEXT_PUBLIC_CLIENT_API_BASE_URL}/v1/client`,
    client,
  );

export const updateClient = (client) =>
  axios.put(`${process.env.NEXT_PUBLIC_CLIENT_API_BASE_URL}/v1/client`, client);

export const deleteClient = ({ tenant, email }) =>
  axios.delete(
    `${process.env.NEXT_PUBLIC_CLIENT_API_BASE_URL}/v1/client/${tenant}/${email}`,
  );

export const bulkAddClients = (clients) =>
  axios.post(`${process.env.NEXT_PUBLIC_CLIENT_API_BASE_URL}/v1/client/bulk`, {
    clients,
  });

export const bulkUpdateClientStatus = (client) =>
  axios.put(
    `${process.env.NEXT_PUBLIC_CLIENT_API_BASE_URL}/v1/client/bulk`,
    client,
  );

export const bulkUpdateClientType = (client) =>
  axios.put(
    `${process.env.NEXT_PUBLIC_CLIENT_API_BASE_URL}/v1/client/bulk`,
    client,
  );

export const bulkUpdateClientActive = (client) =>
  axios.put(
    `${process.env.NEXT_PUBLIC_CLIENT_API_BASE_URL}/v1/client/bulk`,
    client,
  );
