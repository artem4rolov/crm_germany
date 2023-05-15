import { createSlice } from "@reduxjs/toolkit";
import {
  createProject,
  editProject,
  getBillableProjects,
  getProjectsByFilterDate,
  removeProject,
} from "./projectsActions";

const actualyYear = new Date().getFullYear();

const initialState = {
  needRefreshData: false, // после удаления необходимо заново по установленным фильтрам запросить актуальные данные
  loadingProjects: false, // отображение загрузки
  projects: null, // пользователь
  error: null, // значение ошибки
  billableFilter: null, // фильтр "оплачиваемые"
  // finishFilter: null, // фильтр "завершенные"
  filterDateProjects: `01.01.${actualyYear}-31.12.${actualyYear}`, // фильтр дат
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    // устанавливаем даты для страницы Projects.jsx
    setFilterDateProjects: (state, { payload }) => {
      state.filterDateProjects = payload;
    },
    // устанавливаем фильтры для страницы Projects.jsx
    setBillableFilterProjects: (state, { payload }) => {
      state.billableFilter = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // получить проекты по фильтру дат
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
      })
      // получить ОПЛАЧИВАЕМЫЕ проекты по фильтру дат
      .addCase(getBillableProjects.pending, (state) => {
        state.loadingProjects = true;
        state.projects = null;
        state.error = null;
      })
      .addCase(getBillableProjects.fulfilled, (state, action) => {
        state.loadingProjects = false;
        state.projects = action.payload;
      })
      .addCase(getBillableProjects.rejected, (state, action) => {
        state.loadingProjects = false;
        state.projects = null;
        state.error = action.payload;
      })
      // создать проект
      .addCase(createProject.pending, (state) => {
        state.loadingProjects = true;
        state.error = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loadingProjects = false;
        state.needRefreshData = true;
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loadingProjects = false;
        state.error = action.payload;
      })
      // удалить проект
      .addCase(removeProject.pending, (state) => {
        state.loadingProjects = true;
        state.error = null;
      })
      .addCase(removeProject.fulfilled, (state, action) => {
        state.loadingProjects = false;
        state.needRefreshData = true;
      })
      .addCase(removeProject.rejected, (state, action) => {
        state.loadingProjects = false;
        state.error = action.payload;
      })
      // удалить проект
      .addCase(editProject.pending, (state) => {
        state.loadingProjects = true;
        state.error = null;
      })
      .addCase(editProject.fulfilled, (state, action) => {
        state.loadingProjects = false;
        state.needRefreshData = true;
      })
      .addCase(editProject.rejected, (state, action) => {
        state.loadingProjects = false;
        state.error = action.payload;
      });
  },
});

export const { setFilterDateProjects } = projectsSlice.actions;
export default projectsSlice.reducer;
