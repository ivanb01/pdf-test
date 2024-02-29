const { createSlice } = require('@reduxjs/toolkit');

const editor = createSlice({
  name: 'editor',
  initialState: {
    editorState: null,
    isEditorEmpty: true,
    formFields: {},
  },
  reducers: {
    setEditorState(state, action) {
      state.editorState = action.payload;
      if (
        !action.payload ||
        (!action.payload?.root?.children[0]?.children.length && action.payload?.root?.children.length === 1)
      )
        state.isEditorEmpty = true;
      else state.isEditorEmpty = false;
    },
    clearEditorState(state) {
      state.editorState = null;
      state.isEditorEmpty = true;
      state.formFields = {};
    },
    setFormField(state, action) {
      state.formFields = {
        ...action.payload,
      };
    },
  },
});

export const { setEditorState, clearEditorState, setFormField } = editor.actions;
export default editor.reducer;
