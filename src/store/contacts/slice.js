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
    updateAllContacts(state, action) {
      state.allContacts.data = action.payload;
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
      console.log(action.payload, [...state.allContacts.data, action.payload]);
      state.allContacts = {
        ...state.allContacts,
        data: [...state.allContacts.data, action.payload],
        count: state.allContacts.count + 1,
      };
    },
  },
});

export const {
  setContacts,
  setAllContacts,
  updateAllContacts,
  setClients,
  setProfessionals,
  setUncategorized,
  updateContacts,
  updateContactLocally,
  addContactLocally,
} = contactsSlice.actions;
export default contactsSlice.reducer;
