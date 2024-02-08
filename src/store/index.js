import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './contacts/slice';
import globalReducer from './global/slice';
import clientDetailsReducer from './clientDetails/slice';
import CRMCampaigns from './campaigns/slice';
import AIAUnapprovedContacts from '@store/AIUnapproved/slice';
export default configureStore({
  reducer: {
    clientDetails: clientDetailsReducer,
    contacts: contactsReducer,
    global: globalReducer,
    CRMCampaigns: CRMCampaigns,
    AIAUnapprovedContacts: AIAUnapprovedContacts,
  },
  devTools: true,
});
