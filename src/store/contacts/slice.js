const { createSlice, current } = require('@reduxjs/toolkit');

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    data: [],
    clients: [],
    professionals: [],
    uncategorized: [],
    allContacts: [],
  },
  reducers: {
    setContacts(state, action) {
      state.data = action.payload;
    },
    setAllContacts(state, action) {
      state.allContacts = action.payload;
    },
    updateContacts(state, action) {
      state.data.data = action.payload;
    },
    updateContactLocally(state, action) {
      const { id, ...payloadData } = action.payload;
      state.allContacts.data = state.allContacts.data.map((contact) =>
        contact.id === id ? { ...contact, ...payloadData } : contact,
      );
      if (state.data.data) {
        state.data.data = state.data.data.map((contact) =>
          contact.id === id ? { ...contact, ...payloadData } : contact,
        );
      }
    },
  },
});

export const { setContacts, setAllContacts, updateContacts, updateContactLocally } = contactsSlice.actions;
export default contactsSlice.reducer;
