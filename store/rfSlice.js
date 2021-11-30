import { createSlice } from "@reduxjs/toolkit";

const rfSlice = createSlice({
  name: "refresh",
  initialState: { needRefresh: false, needRFHglUser: false },
  reducers: {
    makeRefresh(state, action) {
      //set state to opposite of current state
      state.needRefresh = !state.needRefresh;
    },
    makeRFHglUser(state, action) {
      //set state to opposite of current state
      state.needRFHglUser = !state.needRFHglUser;
    }
  },
});
export const { makeRefresh, makeRFHglUser } = rfSlice.actions;
export const selectIsNeedRefresh = (state) => state.refresh.needRefresh ;
export const selectIsNeedRFHglUser = (state) => state.refresh.needRFHglUser ;
export default rfSlice.reducer;
