import { createSlice } from '@reduxjs/toolkit';
import {
  addCampaign,
  getCampaigns,
  updateCampaign,
  deleteCampaign,
  addContactToCampaign,
  deleteContactFromCampaign,
  addClientToCampaign,
  deleteClientFromCampaign,
} from './actions';

const contactsSlice = createSlice({
  name: 'campaigns',
  initialState: { _data: [], count: 0 },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getCampaigns.fulfilled, (_, action) => {
      return {
        _data: action?.payload?.campaigns,
        count: action?.payload?.count,
      };
    });
    builder.addCase(addCampaign.fulfilled, (state, action) => {
      return {
        _data: [...state._data, action?.payload],
        count: state.count + 1,
      };
    });
    builder.addCase(updateCampaign.fulfilled, (state, action) => {
      const campaignIndex = state?._data.findIndex(
        (campaign) => campaign.id === action?.payload?.id
      );
      state._data[campaignIndex] = action.payload;
    });
    builder.addCase(deleteCampaign.fulfilled, (state, action) => {
      state._data.splice(
        state._data.findIndex((campaign) => campaign.id === action.payload),
        1
      );
    });
    builder.addCase(addContactToCampaign.fulfilled, (state, action) => {
      console.log(action);
    });
    builder.addCase(deleteContactFromCampaign.fulfilled, (state, action) => {
      console.log(action);
    });
    builder.addCase(addClientToCampaign.fulfilled, (state, action) => {
      const campaignIndex = state?._data.findIndex(
        (campaign) => campaign.id === action?.payload?.campaign_id
      );
      if (state._data[campaignIndex]?.clients)
        state._data[campaignIndex]?.clients?.push(action.payload?.target_id);
      else state._data[campaignIndex].clients = [action.payload?.target_id];
    });
    builder.addCase(deleteClientFromCampaign.fulfilled, (state, action) => {
      const campaignIndex = state?._data.findIndex(
        (campaign) => campaign.id === action?.payload?.campaign_id
      );
      state._data[campaignIndex].clients = state._data[
        campaignIndex
      ].clients.filter((client) => client !== action.payload?.target_id);
    });
  },
});

export default contactsSlice.reducer;
