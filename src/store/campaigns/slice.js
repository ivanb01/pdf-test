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
    updateCRMCampaign(state, action) {
      const { id, ...payloadData } = action.payload;
      state.CRMCampaigns.campaigns = state.CRMCampaigns.campaigns.map((campaign) =>
        campaign.id === id ? { ...campaign, ...payloadData.campaign, actions: payloadData.actions } : campaign,
      );
    },
    setUsersInCampaignGlobally(state, action) {
      state.usersInCampaignGlobally = action.payload;
    },
  },
});

export const { setCRMCampaigns, setUsersInCampaignGlobally, addCRMCampaigns, updateCRMCampaign } = CRMCampaigns.actions;
export default CRMCampaigns.reducer;
