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
      console.log(action.payload);
      state.data = action.payload;
    },
    setAllContacts(state, action) {
      state.allContacts = action.payload;
    },
    updateContacts(state, action) {
      state.data.data = action.payload;
    },
    updateContactStatus(state, action) {
      let { id, status_id, status_2 } = action.payload;
      let contactsCopy = current(state.data.data);
      const newContacts = contactsCopy.map((obj) => {
        if (obj.id === id) {
          return {
            ...obj,
            status_id: status_id,
            status_2: status_2,
          };
        }
        return obj;
      });
      state.data.data = newContacts;
      // store.data.data.find(contact => contact.id = action.payload)
    },
  },
});

export const {
  setContacts,
  setAllContacts,
  updateContacts,
  updateContactStatus,
} = contactsSlice.actions;
export default contactsSlice.reducer;
