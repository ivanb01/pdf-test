import { createAsyncThunk } from '@reduxjs/toolkit';
import * as campaignServices from 'api/campaign';
import { removeCampaignFromClient } from 'store/event/slice';

export const deleteCampaign = createAsyncThunk(
  'campaigns/deleteCampaign',
  async (id, thunkAPI) => {
    const { data = {} } = await campaignServices.deleteCampaign(id);
    return data;
  },
);

export const deleteContactFromCampaign = createAsyncThunk(
  'campaigns/deleteContactFromCampaign',
  async (payload, thunkAPI) => {
    const { data = {} } = await campaignServices.deleteContactFromCampaign(
      payload,
    );
    return data;
  },
);

export const deleteClientFromCampaign = createAsyncThunk(
  'campaigns/deleteClientFromCampaign',
  async (payload, { dispatch }) => {
    const { data = {} } = await campaignServices.deleteClientFromCampaign(
      payload,
    );
    if (data) {
      dispatch(removeCampaignFromClient(payload?.campaign_id));
    }
    return data;
  },
);
