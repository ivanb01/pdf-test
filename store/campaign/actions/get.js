import { createAsyncThunk } from '@reduxjs/toolkit';
import * as campaignServices from 'api/campaign';

export const getCampaigns = createAsyncThunk(
  'campaigns/getCampaigns',
  async (thunkAPI) => {
    const { data = {} } = await campaignServices.getCampaigns();
    return data;
  }
);

export const getCampaign = createAsyncThunk(
  'campaigns/getCampaign',
  async (id, thunkAPI) => {
    const { data = {} } = await campaignServices.getCampaign(id);
    return data;
  }
);
