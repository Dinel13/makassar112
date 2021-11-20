import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import notifReducer from "./notifSlice";
import themeSlice from "./themeSlice";

const store = configureStore({
  reducer: { auth: authReducer, notif: notifReducer, theme : themeSlice },
});

export default store;
