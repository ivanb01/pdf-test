import { createAsyncThunk } from '@reduxjs/toolkit';
import * as contactServices from 'api/contacts';

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async ({ tenant, email }, thunkAPI) => {
    await contactServices.deleteContact({
      tenant,
      email,
    });
    return email;
  }
);
