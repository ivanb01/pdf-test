import { configureStore } from '@reduxjs/toolkit';
import contactReducer from './contact/slice';
import campaignsReducer from './campaign/slice';
import clientsReducer from './client/slice';
import eventsReducer from './event/slice';
import contactsReducer from './contacts/slice';
import globalReducer from './global/slice';
import clientDetailsReducer from './clientDetails/slice';

export default configureStore({
  reducer: {
    contact: contactReducer,
    campaigns: campaignsReducer,
    clients: clientsReducer,
    clientDetails: clientDetailsReducer,
    events: eventsReducer,
    contacts: contactsReducer,
    global: globalReducer,
  },
  devTools: true,
});
