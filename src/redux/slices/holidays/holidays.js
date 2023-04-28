import { createSlice } from "@reduxjs/toolkit";
// функция авторизации
import { getHolidaysByFilter, getHolidaysNowYear } from "./holidaysActions";

const initialState = {
  loading: false, // отображение загрузки
  holidays: null, // пользователь
  error: null, // значение ошибки
  filterRegion: null, // фильтр регионов
  filterDate: null, // фильтр дат
};

const holidaySlice = createSlice({
  name: "holidays",
  initialState,
  reducers: {
    setFilterRegion: (state, { payload }) => {
      state.filterRegion = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // получить все праздники текущего года
      .addCase(getHolidaysNowYear.pending, (state) => {
        state.loading = true;
        state.holidays = null;
      })
      .addCase(getHolidaysNowYear.fulfilled, (state, action) => {
        state.loading = false;
        state.holidays = action.payload.data;
      })
      .addCase(getHolidaysNowYear.rejected, (state, action) => {
        state.loading = false;
        state.holidays = null;
        state.error = action.payload;
      })
      // получить праздники по фильтру
      .addCase(getHolidaysByFilter.pending, (state) => {
        state.loading = true;
        state.holidays = null;
      })
      .addCase(getHolidaysByFilter.fulfilled, (state, action) => {
        state.loading = false;
        state.holidays = action.payload?.data;
      })
      .addCase(getHolidaysByFilter.rejected, (state, action) => {
        state.loading = false;
        state.holidays = null;
        state.error = action.payload;
      });
  },
});

export const { setFilterRegion } = holidaySlice.actions;
export default holidaySlice.reducer;
