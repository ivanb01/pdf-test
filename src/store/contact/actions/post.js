import { createAsyncThunk } from '@reduxjs/toolkit';
import * as contactServices from 'api/contacts';
import { getContacts } from './get';

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact, thunkAPI) => {
    const { data = {} } = await contactServices.addContact(contact);
    return data;
  }
);

export const bulkAddContacts = createAsyncThunk(
  'contacts/bulkAddContacts',
  async (contacts, { dispatch }) => {
    const response = await contactServices.bulkAddContacts(contacts);
    //we are calling getContacts until we fix the api to return the added contacts
    if (response) {
      setTimeout(() => dispatch(getContacts({ active: 'active' })), 500);
    }
  }
);
