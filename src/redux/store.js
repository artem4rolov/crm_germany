import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../redux/slices/auth/auth";
import holidaysReducer from "../redux/slices/holidays/holidays";

export const store = configureStore({
  reducer: {
    // авторизация
    auth: authReducer,
    // страница с праздниками
    holidays: holidaysReducer,
  },
});
