import { createSlice } from '@reduxjs/toolkit';
import {
  getContacts,
  addContact,
  updateContact,
  deleteContact,
  bulkUpdateContactActive,
  bulkUpdateContactType,
  bulkUpdateContactStatus,
  bulkAddContacts,
} from './actions';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { _data: [], count: 0 },
  extraReducers: (builder) => {
    builder.addCase(getContacts.fulfilled, (_, action) => {
      return {
        _data: action?.payload?.data,
        count: action?.payload?.count,
      };
    });
    builder.addCase(addContact.fulfilled, (state, action) => {
      return {
        _data: [...state._data, action?.payload],
        count: state.count + 1,
      };
    });
    builder.addCase(updateContact.fulfilled, (state, action) => {
      const contactIndex = state?._data.findIndex(
        (contact) => contact.email === action?.payload?.email,
      );
      state._data[contactIndex] = action.payload;

    });
    builder.addCase(deleteContact.fulfilled, (state, action) => {
      state._data.splice(
        state._data.findIndex((contact) => contact.email === action.payload),
        1,
      );
    });
    builder.addCase(bulkAddContacts.fulfilled, (state, action) => {
      return {
        _data: action?.payload?.contacts,
        count: action?.payload?.count,
      };
    });
    builder.addCase(bulkUpdateContactStatus.fulfilled, (state, action) => {
      state._data = state._data?.map((contact) => {
        let newContact = action.meta.arg?.contacts?.find(
          (updatedContact) => contact.email === updatedContact.email,
        );
        return newContact ? { ...contact, status: newContact.status } : contact;
      });
    });
    builder.addCase(bulkUpdateContactType.fulfilled, (state, action) => {
      console.log(action);
      state._data = state._data?.map((contact) => {
        let newContact = action.meta.arg?.contacts?.find(
          (updatedContact) => contact.email === updatedContact.email,
        );
        return newContact ? { ...contact, type: newContact.type } : contact;
      });
    });
    builder.addCase(bulkUpdateContactActive.fulfilled, (state, action) => {
      console.log(action);
    });
  },
});

export default contactsSlice.reducer;
