import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  name: null,
  id: null,
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login(state, action) {
      const { token, id, name, role } = action.payload;
      localStorage.setItem(
        "pj_ayt",
        JSON.stringify(`${token}9gTe1Sku${id}9gTe1Sku${role}9gTe1Sku${name}`)
      );
      state.token = token;
      state.id = id;
      state.name = name;
      state.role = role;
    },
    logout(state) {
      localStorage.removeItem("pj_ayt");
      state.token = null;
      state.id = null;
      state.name = null;
      state.role = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export const selectToken = (state) => state.auth.token;
export const selectUserId = (state) => state.auth.id;
export const selectName = (state) => state.auth.name;
export const selectRole = (state) => state.auth.role;
export default authSlice.reducer;
