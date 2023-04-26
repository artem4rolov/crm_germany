import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../redux/slices/auth/auth";

export const store = configureStore({
  reducer: {
    // авторизация
    auth: authReducer,
  },
});
