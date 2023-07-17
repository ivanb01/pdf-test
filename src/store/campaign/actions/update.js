import { createAsyncThunk } from '@reduxjs/toolkit';
import * as campaignServices from 'api/campaign';

export const updateCampaign = createAsyncThunk(
  'campaigns/updateCampaign',
  async (contact, thunkAPI) => {
    const { data = {} } = await campaignServices.updateCampaign(contact);
    return data;
  }
);
