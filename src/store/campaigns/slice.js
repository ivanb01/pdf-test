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
    addCRMCampaigns(state, action) {
      state.CRMCampaigns.campaigns.push(action.payload);
    },
    setUsersInCampaignGlobally(state, action) {
      state.usersInCampaignGlobally = action.payload;
    },
  },
});

export const { setCRMCampaigns, setUsersInCampaignGlobally, addCRMCampaigns } = CRMCampaigns.actions;
export default CRMCampaigns.reducer;
