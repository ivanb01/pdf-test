const { createSlice } = require('@reduxjs/toolkit');

const clientDetails = createSlice({
  name: 'clientDetails',
  initialState: {
    activityLogData: null,
    notesData: null,
    campaignsData: null,
    lookingForData: null,
    globalEmailActivity: null,
  },
  reducers: {
    setActivityLogData(state, action) {
      state.activityLogData = action.payload;
    },
    setNotesData(state, action) {
      state.notesData = action.payload;
    },
    setCampaignsData(state, action) {
      state.campaignsData = action.payload;
    },
    setLookingForData(state, action) {
      state.lookingForData = action.payload;
    },
    setGlobalEmail(state, action) {
      state.globalEmailActivity = action.payload;
    },
  },
});

export const { setActivityLogData, setNotesData, setCampaignsData, setLookingForData, setGlobalEmail } =
  clientDetails.actions;
export default clientDetails.reducer;
