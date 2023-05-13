import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/auth/auth";
import holidaysReducer from "./slices/holidays/holidays";
import projectsReducer from "./slices/projects/projects";
import notesReducer from "./slices/notes/notes";
import sidebarReducer from "./slices/sidebar/sidebarSlice";
import yearSummaryReducer from "./slices/reports/year_summary/yearSummary";
import excelReducer from "./slices/reports/excel/excel";
import timesheetReducer from "./slices/timesheet/timesheet";
import dashboardReducer from "./slices/dashboard/dashboard";

export const store = configureStore({
  reducer: {
    // авторизация
    auth: authReducer,
    // страница с праздниками Holidays.jsx
    holidays: holidaysReducer,
    // страница с проектами (недели года)
    projects: projectsReducer,
    // страница с заметками Notes.jsx
    notes: notesReducer,
    // страница с рабочими часами (с суммой за год) YearSummary.jsx
    yearSummary: yearSummaryReducer,
    // страница с рабочими часами Excel.jsx
    excel: excelReducer,
    // страница с рабочими часами Excel.jsx
    dashboard: dashboardReducer,
    // страница с проектами (Timesheet.jsx)
    timesheet: timesheetReducer,
    // sidebar (фильтры дат, поиска и другие фильтры)
    sidebar: sidebarReducer,
    //
  },
});
