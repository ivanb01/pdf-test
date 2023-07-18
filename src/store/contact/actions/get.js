import { createAsyncThunk } from '@reduxjs/toolkit';
import * as contactServices from 'api/contacts';

export const getContacts = createAsyncThunk(
  'contact/getContacts',
  async ({ status = '', active = '', type = '' }, thunkAPI) => {
    const { data = {} } = await contactServices.getContacts({
      status,
      active,
      type,
    });
    return data;
  },
);
