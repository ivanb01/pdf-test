import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './contacts/slice';
import globalReducer from './global/slice';
import clientDetailsReducer from './clientDetails/slice';

export default configureStore({
  reducer: {
    clientDetails: clientDetailsReducer,
    contacts: contactsReducer,
    global: globalReducer,
  },
  devTools: true,
});
