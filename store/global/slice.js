const { createSlice } = require('@reduxjs/toolkit');

const global = createSlice({
  name: 'global',
  initialState: {
    openedTab: 0,
    openedSubtab: 0,
    expandedMenu: true,
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
  },
});

export const {
  setOpenedTab,
  setOpenedSubtab,
  setExpandedMenu,
  setUser,
  setSkippedEmptyState,
} = global.actions;
export default global.reducer;
