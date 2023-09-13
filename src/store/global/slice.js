const { createSlice } = require('@reduxjs/toolkit');

const global = createSlice({
  name: 'global',
  initialState: {
    openedTab: 0,
    openedSubtab: 0,
    tabs: [],
    expandedMenu: true,
    count: null,
    refetchCount: false,
    refetchData: false,
    refetchPart: null,
    userGaveConsent: null,
    unapprovedContacts: null,
    user:
      typeof window !== 'undefined' && localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    skippedEmptyState:
      typeof window !== 'undefined' && localStorage.getItem('skippedEmptyState')
        ? localStorage.getItem('skippedEmptyState')
        : false,
  },
  reducers: {
    setCount(state, action) {
      state.count = action.payload;
    },
    setRefetchCount(state, action) {
      state.refetchCount = action.payload;
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
    setExpandedTab(state, action) {
      if (state.tabs.length == 0) {
        return;
      }
      const getObjectById = (id) => {
        return state.tabs.length > 0 && state.tabs.find((item) => item.id === id);
      };
      const tabToChange = getObjectById(action.payload.id);
      tabToChange.opened = action.payload.opened;
    },
    setInitializeTabs(state, action) {
      const createArrayOfObjects = (length) => Array.from({ length }, (_, id) => ({ id, opened: false }));
      state.tabs = createArrayOfObjects(action.payload);
    },
  },
});

export const {
  setCount,
  setRefetchCount,
  setRefetchData,
  setRefetchPart,
  setOpenedTab,
  setOpenedSubtab,
  setExpandedMenu,
  setUser,
  setSkippedEmptyState,
  setUnapprovedContacts,
  setUserGaveConsent,
  setExpandedTab,
  setInitializeTabs,
} = global.actions;
export default global.reducer;
