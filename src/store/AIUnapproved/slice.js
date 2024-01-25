const { createSlice } = require('@reduxjs/toolkit');

const AIAUnapprovedContacts = createSlice({
  name: 'AIAUnapprovedContacts',
  initialState: {
    ai_unapproved_contacts: undefined,
  },
  reducers: {
    setAIUnApprovedContacts(state, action) {
      state.ai_unapproved_contacts = action.payload;
    },
    setApproveAIContacts(state, action) {
      state.ai_unapproved_contacts = action.payload;
    },
  },
});

export const { setAIUnApprovedContacts, setApproveAIContacts } = AIAUnapprovedContacts.actions;
export default AIAUnapprovedContacts.reducer;
