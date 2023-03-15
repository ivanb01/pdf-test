import { createAsyncThunk } from '@reduxjs/toolkit';
import * as eventServices from 'api/event';

export const getEvents = createAsyncThunk(
  'events/getEvents',
  async (thunkAPI) => {
    const { data = {} } = await eventServices.getEvents();
    return data;
  }
);

export const getClientCampaignsAndEvents = createAsyncThunk(
  'events/getClientCampaignsAndEvents',
  async (email, thunkAPI) => {
    const { data = {} } = await eventServices.getClientCampaignsAndEvents(
      email
    );
    return data;
  }
);

export const getContactCampaignsAndEvents = createAsyncThunk(
  'events/getContactCampaignsAndEvents',
  async (email, thunkAPI) => {
    const { data = {} } = await eventServices.getContactCampaignsAndEvents(
      email
    );
    return data;
  }
);
