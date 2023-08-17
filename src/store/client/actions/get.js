import { createAsyncThunk } from '@reduxjs/toolkit';
import * as clientServices from 'api/client';

export const getClients = createAsyncThunk('clients/getClients', async (thunkAPI) => {
  const { data = {} } = await clientServices.getClients();
  return data;
});
