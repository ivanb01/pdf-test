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
    setClients(state, action) {
      state.clients = action.payload;
    },
    setProfessionals(state, action) {
      state.professionals = action.payload;
    },
    setUncategorized(state, action) {
      state.uncategorized = action.payload;
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
    addContactLocally(state, action) {
      const newContact = action.payload;
      state.data.data = [...state.data.data, newContact];
    },
  },
});

export const {
  setContacts,
  setAllContacts,
  setClients,
  setProfessionals,
  setUncategorized,
  updateContacts,
  updateContactLocally,
  addContactLocally,
} = contactsSlice.actions;
export default contactsSlice.reducer;
