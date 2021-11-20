import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: { isDark: true },
  reducers: {
    toggleTheme(state, action) {
      state.isDark = action.payload.isDark;
    }
  },
});
export const { toggleTheme } = themeSlice.actions;
export const selectIsDark = (state) => state.theme.isDark ;

export default themeSlice.reducer;
