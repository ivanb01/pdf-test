import { createAsyncThunk } from '@reduxjs/toolkit';
import * as contactServices from 'api/contacts';

export const updateContact = createAsyncThunk('contacts/updateContact', async (contact, thunkAPI) => {
  const { data = {} } = await contactServices.updateContact(contact);
  return data;
});

export const bulkUpdateContactStatus = createAsyncThunk(
  'contacts/bulkUpdateContactStatus',
  async (contacts, thunkAPI) => {
    // const { data = {} } = await contactServices.bulkUpdateContactStatus(
    //   contacts
    // );
    // return data;
  },
);

export const bulkUpdateContactType = createAsyncThunk('contacts/bulkUpdateContactType', async (contacts, thunkAPI) => {
  // const { data = {} } = await contactServices.bulkUpdateContactType(contacts);
  // return data;
});

export const bulkUpdateContactActive = createAsyncThunk(
  'contacts/bulkUpdateContactActive',
  async (contacts, thunkAPI) => {
    // const { data = {} } = await contactServices.bulkUpdateContactActive(
    //   contacts
    // );
    // return data;
  },
);
