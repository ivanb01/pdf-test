import { createAsyncThunk } from '@reduxjs/toolkit';
import * as clientServices from 'api/client';

export const updateClient = createAsyncThunk(
  'clients/updateClient',
  async (client, thunkAPI) => {
    const { data = {} } = await clientServices.updateClient(client);
    return data;
  }
);

export const bulkUpdateClientStatus = createAsyncThunk(
  'clients/bulkUpdateClientStatus',
  async (clients, thunkAPI) => {
    const { data = {} } = await clientServices.bulkUpdateClientStatus(clients);
    return data;
  }
);

export const bulkUpdateClientType = createAsyncThunk(
  'clients/bulkUpdateClientType',
  async (clients, thunkAPI) => {
    const { data = {} } = await clientServices.bulkUpdateClientType(clients);
    return data;
  }
);

export const bulkUpdateClientActive = createAsyncThunk(
  'clients/bulkUpdateClientActive',
  async (clients, thunkAPI) => {
    const { data = {} } = await clientServices.bulkUpdateClientActive(clients);
    return data;
  }
);
