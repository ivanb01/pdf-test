import { createAsyncThunk } from '@reduxjs/toolkit';
import * as campaignServices from 'api/campaign';

export const addCampaign = createAsyncThunk('campaigns/addCampaign', async (contact, thunkAPI) => {
  const { data = {} } = await campaignServices.addCampaign(contact);
  return data;
});

export const addContactToCampaign = createAsyncThunk('campaigns/addContactToCampaign', async (payload, thunkAPI) => {
  const { data = {} } = await campaignServices.addContactToCampaign(payload);
  return data;
});

export const addClientToCampaign = createAsyncThunk('campaigns/addClientToCampaign', async (payload, thunkAPI) => {
  const { data = {} } = await campaignServices.addClientToCampaign(payload);
  return data;
});
