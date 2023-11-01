const { createSlice } = require('@reduxjs/toolkit');

const CRMCampaigns = createSlice({
  name: 'CRMCampaigns',
  initialState: {
    CRMCampaigns: undefined,
  },
  reducers: {
    setCRMCampaigns(state, action) {
      console.log(action.payload, 'action.payload');
      state.CRMCampaigns = action.payload;
    },
  },
});

export const { setCRMCampaigns } = CRMCampaigns.actions;
export default CRMCampaigns.reducer;
