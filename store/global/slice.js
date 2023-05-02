const { createSlice } = require('@reduxjs/toolkit');

const global = createSlice({
  name: 'global',
  initialState: {
    openedTab: 0,
    openedSubtab: 0,
    expandedMenu: true,
    user: null,
    skippedEmptyState: false,
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
