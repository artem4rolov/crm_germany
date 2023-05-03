import { createSlice } from "@reduxjs/toolkit";
// функция авторизации
import {
  getHolidaysByFilter,
  getRegions,
  removeHolidayById,
  uploadExcel,
} from "./holidaysActions";

const initialState = {
  needRefreshData: false, // после удаления необходимо заново по установленным фильтрам запросить актуальные данные
  loadingHolidays: false, // отображение загрузки
  holidays: null, // пользователь
  error: null, // значение ошибки
  regions: [],
};

const holidaySlice = createSlice({
  name: "holidays",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // получить праздники по фильтру
      .addCase(getHolidaysByFilter.pending, (state) => {
        state.loadingHolidays = true;
        state.holidays = null;
        state.error = null;
      })
      .addCase(getHolidaysByFilter.fulfilled, (state, action) => {
        state.loadingHolidays = false;
        state.holidays = action.payload;
      })
      .addCase(getHolidaysByFilter.rejected, (state, action) => {
        state.loadingHolidays = false;
        state.holidays = null;
        state.error = action.payload;
      })
      // получить все регионы
      .addCase(getRegions.pending, (state) => {
        state.loadingHolidays = true;
        state.regions = null;
      })
      .addCase(getRegions.fulfilled, (state, action) => {
        state.loadingHolidays = false;
        state.regions = action.payload;
      })
      .addCase(getRegions.rejected, (state, action) => {
        state.loadingHolidays = false;
        state.regions = null;
        state.error = action.payload;
      })
      // удалить праздник по id
      .addCase(removeHolidayById.pending, (state) => {
        state.loadingHolidays = true;
        state.needRefreshData = false;
      })
      .addCase(removeHolidayById.fulfilled, (state, action) => {
        state.loadingHolidays = false;
        state.needRefreshData = true;
      })
      .addCase(removeHolidayById.rejected, (state, action) => {
        state.loadingHolidays = false;
        state.needRefreshData = false;
        state.error = action.payload;
      })
      // загрузка excel на сервер
      .addCase(uploadExcel.pending, (state) => {
        state.loadingHolidays = true;
        state.needRefreshData = false;
      })
      .addCase(uploadExcel.fulfilled, (state, action) => {
        state.loadingHolidays = false;
        state.needRefreshData = true;
      })
      .addCase(uploadExcel.rejected, (state, action) => {
        state.loadingHolidays = false;
        state.needRefreshData = false;
        state.error = action.payload;
      });
  },
});

export default holidaySlice.reducer;
