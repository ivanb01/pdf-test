import { createSlice } from '@reduxjs/toolkit';
import {
  getClients,
  addClient,
  updateClient,
  deleteClient,
  bulkUpdateClientActive,
  bulkUpdateClientType,
  bulkUpdateClientStatus,
  bulkAddClients,
} from './actions';

const clientsSlice = createSlice({
  name: 'clients',
  initialState: { _data: [], count: 0 },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getClients.fulfilled, (_, action) => {
      return {
        _data: action?.payload?.clients,
        count: action?.payload?.count,
      };
    });
    builder.addCase(addClient.fulfilled, (state, action) => {
      return {
        _data: [...state._data, action?.payload],
        count: state.count + 1,
      };
    });
    builder.addCase(updateClient.fulfilled, (state, action) => {
      const clientIndex = state?._data.findIndex((client) => client.email === action?.payload?.email);
      state._data[clientIndex] = action.payload;
    });
    builder.addCase(deleteClient.fulfilled, (state, action) => {
      state._data.splice(
        state._data.findIndex((client) => client.email === action.payload),
        1,
      );
    });
    builder.addCase(bulkAddClients.fulfilled, (state, action) => {
      return {
        _data: action?.payload?.clients,
        count: action?.payload?.count,
      };
    });
    builder.addCase(bulkUpdateClientStatus.fulfilled, (state, action) => {
      state._data = state._data?.map((client) => {
        let newClient = action.meta.arg?.clients?.find((updatedClient) => client.email === updatedClient.email);
        return newClient ? { ...client, status: newClient.status } : client;
      });
    });
    builder.addCase(bulkUpdateClientType.fulfilled, (state, action) => {
      state._data = state._data?.map((client) => {
        let newClient = action.meta.arg?.clients?.find((updatedClient) => client.email === updatedClient.email);
        return newClient ? { ...client, type: newClient.type } : client;
      });
    });
    builder.addCase(bulkUpdateClientActive.fulfilled, (state, action) => {
      console.log(action);
    });
  },
});

export default clientsSlice.reducer;
