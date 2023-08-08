const { createSlice } = require('@reduxjs/toolkit');

const global = createSlice({
  name: 'global',
  initialState: {
    openedTab: 0,
    openedSubtab: 0,
    expandedMenu: true,
    count: null,
    refetchData: false,
    refetchPart: null,
    userGaveConsent: null,
    unapprovedContacts: null,
    user:
      typeof window !== 'undefined' && localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user'))
        : null,
    skippedEmptyState:
      typeof window !== 'undefined' && localStorage.getItem('skippedEmptyState')
        ? localStorage.getItem('skippedEmptyState')
        : false,
  },
  reducers: {
    setCount(state, action) {
      state.count = action.payload;
    },
    setRefetchData(state, action) {
      state.refetchData = action.payload;
    },
    setRefetchPart(state, action) {
      state.refetchPart = action.payload;
    },
    setOpenedTab(state, action) {
      state.openedTab = action.payload;
    },
    setOpenedSubtab(state, action) {
      state.openedSubtab = action.payload;
    },
    setExpandedMenu(state, action) {
      state.expandedMenu = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setSkippedEmptyState(state, action) {
      state.skippedEmptyState = action.payload;
    },
    setUnapprovedContacts(state, action) {
      state.unapprovedContacts = action.payload;
    },
    setUserGaveConsent(state, action) {
      state.userGaveConsent = action.payload;
    },
  },
});

export const {
  setCount,
  setRefetchData,
  setRefetchPart,
  setOpenedTab,
  setOpenedSubtab,
  setExpandedMenu,
  setUser,
  setSkippedEmptyState,
  setUnapprovedContacts,
  setUserGaveConsent,
} = global.actions;
export default global.reducer;
