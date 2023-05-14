import { createSlice } from "@reduxjs/toolkit";
import { getProjectsByFilterDate } from "./projectsActions";

const actualyYear = new Date().getFullYear();

const initialState = {
  needRefreshData: false, // после удаления необходимо заново по установленным фильтрам запросить актуальные данные
  loadingProjects: false, // отображение загрузки
  projects: null, // пользователь
  error: null, // значение ошибки
  filterDateProjects: `01.01.${actualyYear}-31.12.${actualyYear}`, // фильтр дат
};

const projectsSlice = createSlice({
  name: "holidays",
  initialState,
  reducers: {
    setFilterDateProjects: (state, { payload }) => {
      state.filterDateProjects = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // получить праздники по фильтру
      .addCase(getProjectsByFilterDate.pending, (state) => {
        state.loadingProjects = true;
        state.projects = null;
        state.error = null;
      })
      .addCase(getProjectsByFilterDate.fulfilled, (state, action) => {
        state.loadingProjects = false;
        state.projects = action.payload;
      })
      .addCase(getProjectsByFilterDate.rejected, (state, action) => {
        state.loadingProjects = false;
        state.projects = null;
        state.error = action.payload;
      });
  },
});

export const { setFilterDateProjects } = projectsSlice.actions;
export default projectsSlice.reducer;
