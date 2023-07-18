import { createAsyncThunk } from '@reduxjs/toolkit';
import * as clientServices from 'api/client';
import { getClients } from './get';

export const addClient = createAsyncThunk(
  'clients/addClient',
  async (client, thunkAPI) => {
    const { data = {} } = await clientServices.addClient(client);
    return data;
  },
);

export const bulkAddClients = createAsyncThunk(
  'clients/bulkAddClients',
  async (clients, { dispatch }) => {
    const response = await clientServices.bulkAddClients(clients);
    //we are calling getClients until we fix the api to return the added clients
    if (response) {
      setTimeout(() => dispatch(getClients({ active: 'active' })), 500);
    }
  },
);
