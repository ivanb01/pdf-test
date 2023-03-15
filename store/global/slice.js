const { createSlice } = require('@reduxjs/toolkit');

const global = createSlice({
  name: 'global',
  initialState: {
    openedTab: 0,
    openedSubtab: 0,
    expandedMenu: true,
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
  },
});

export const { setOpenedTab, setOpenedSubtab, setExpandedMenu } =
  global.actions;
export default global.reducer;
