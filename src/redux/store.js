import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/auth/auth";
import holidaysReducer from "./slices/holidays/holidays";
import projectsReducer from "./slices/holidays/holidays";
import notesReducer from "./slices/notes/notes";
import sidebarReducer from "./slices/sidebar/sidebarSlice";

export const store = configureStore({
  reducer: {
    // авторизация
    auth: authReducer,
    // страница с праздниками
    holidays: holidaysReducer,
    // страница с проектами (недели года)
    projects: projectsReducer,
    // страница с заметками
    notes: notesReducer,
    // sidebar (фильтры дат, поиска и другие фильтры)
    sidebar: sidebarReducer,
  },
});
