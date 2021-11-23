import { createSlice } from "@reduxjs/toolkit";

const rfSlice = createSlice({
  name: "refresh",
  initialState: { needRefresh: false },
  reducers: {
    makeRefresh(state, action) {
      //set state to opposite of current state
      state.needRefresh = !state.needRefresh;
    }
  },
});
export const { makeRefresh } = rfSlice.actions;
export const selectIsNeedRefresh = (state) => state.refresh.needRefresh ;

export default rfSlice.reducer;
