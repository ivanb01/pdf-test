import { createSlice } from '@reduxjs/toolkit';
import { getEvents, getClientCampaignsAndEvents, getContactCampaignsAndEvents } from './actions';

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    _data: [],
    count: 0,
    client: { campaigns: [], count: 0 },
    contact: { campaigns: [], count: 0 },
  },
  reducers: {
    removeCampaignFromClient(state, action) {
      state.client?.campaigns.splice(
        state.client?.campaigns?.findIndex((campaign) => campaign.id === action.payload),
        1,
      );
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getEvents.fulfilled, (_, action) => {});
    builder.addCase(getClientCampaignsAndEvents.fulfilled, (state, action) => {
      return {
        ...state,
        client: {
          campaigns: Object.values(action.payload?.campaigns),
          count: action.payload.count,
        },
      };
    });
    builder.addCase(getContactCampaignsAndEvents.fulfilled, (state, action) => {
      return {
        ...state,
        contact: {
          campaigns: Object.values(action.payload?.campaigns),
          count: action.payload.count,
        },
      };
    });
  },
});
export const { removeCampaignFromClient } = eventsSlice.actions;

export default eventsSlice.reducer;
