const { createSlice } = require('@reduxjs/toolkit');

const CRMCampaigns = createSlice({
  name: 'CRMCampaigns',
  initialState: {
    CRMCampaigns: undefined,
    usersInCampaignGlobally: undefined,
    refetchCampaign: false,
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
    setRefetchCampaign(state, action) {
      state.refetchCampaign = action.payload;
    },
  },
});

export const { setRefetchCampaign, setCRMCampaigns, setUsersInCampaignGlobally, addCRMCampaigns, updateCRMCampaign } =
  CRMCampaigns.actions;
export default CRMCampaigns.reducer;
