import { createSlice } from "@reduxjs/toolkit";

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
      state.filterDateHolidays = payload;
    },
  },
  extraReducers: (builder) => {
    // builder
    //   // получить праздники по фильтру
    //   .addCase(getHolidaysByFilter.pending, (state) => {
    //     state.loadingHolidays = true;
    //     state.holidays = null;
    //     state.error = null;
    //   })
    //   .addCase(getHolidaysByFilter.fulfilled, (state, action) => {
    //     state.loadingHolidays = false;
    //     state.holidays = action.payload;
    //   })
    //   .addCase(getHolidaysByFilter.rejected, (state, action) => {
    //     state.loadingHolidays = false;
    //     state.holidays = null;
    //     state.error = action.payload;
    //   })
  },
});

export const { setFilterDateProjects } = projectsSlice.actions;
export default projectsSlice.reducer;
