import { createAsyncThunk } from '@reduxjs/toolkit';
import * as contactServices from 'api/client';

export const deleteClient = createAsyncThunk(
  'contacts/deleteClient',
  async ({ tenant, email }, thunkAPI) => {
    await contactServices.deleteClient({
      tenant,
      email,
    });
    return email;
  }
);
