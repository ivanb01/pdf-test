const { createSlice } = require('@reduxjs/toolkit');

const CRMCampaigns = createSlice({
  name: 'CRMCampaigns',
  initialState: {
    CRMCampaigns: undefined,
    usersInCampaignGlobally: undefined,
  },
  reducers: {
    setCRMCampaigns(state, action) {
      state.CRMCampaigns = action.payload;
    },
    setUsersInCampaignGlobally(state, action) {
      state.usersInCampaignGlobally = action.payload;
    },
  },
});

export const { setCRMCampaigns, setUsersInCampaignGlobally } = CRMCampaigns.actions;
export default CRMCampaigns.reducer;
