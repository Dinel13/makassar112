import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import notifReducer from "./notifSlice";
import themeSlice from "./themeSlice";
import rfSlice from "./rfSlice";

const store = configureStore({
  reducer: { auth: authReducer, notif: notifReducer, theme : themeSlice, refresh : rfSlice },
});

export default store;
