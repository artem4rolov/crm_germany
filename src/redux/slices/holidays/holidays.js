import { createSlice } from "@reduxjs/toolkit";
// функция авторизации
import { getHolidaysByFilter, getHolidaysNowYear } from "./holidaysActions";

const initialState = {
  loadingHolidays: false, // отображение загрузки
  holidays: null, // пользователь
  error: null, // значение ошибки
  filterRegion: null, // фильтр регионов
  filterDate: "01.01.2020-31.12.2020", // фильтр дат
};

const holidaySlice = createSlice({
  name: "holidays",
  initialState,
  reducers: {
    setFilterRegion: (state, { payload }) => {
      if (payload == ["Alle"]) {
        return (state.filterRegion = null);
      }
      state.filterRegion = payload;
    },
    setFilterDate: (state, { payload }) => {
      state.filterDate = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // получить все праздники текущего года
      .addCase(getHolidaysNowYear.pending, (state) => {
        state.loadingHolidays = true;
        state.holidays = null;
      })
      .addCase(getHolidaysNowYear.fulfilled, (state, action) => {
        state.loadingHolidays = false;
        state.holidays = action.payload.data;
      })
      .addCase(getHolidaysNowYear.rejected, (state, action) => {
        state.loadingHolidays = false;
        state.holidays = null;
        state.error = action.payload;
      })
      // получить праздники по фильтру
      .addCase(getHolidaysByFilter.pending, (state) => {
        state.loadingHolidays = true;
        state.holidays = null;
      })
      .addCase(getHolidaysByFilter.fulfilled, (state, action) => {
        state.loadingHolidays = false;
        state.holidays = action.payload?.data;
      })
      .addCase(getHolidaysByFilter.rejected, (state, action) => {
        state.loadingHolidays = false;
        state.holidays = null;
        state.error = action.payload;
      });
  },
});

export const { setFilterRegion, setFilterDate } = holidaySlice.actions;
export default holidaySlice.reducer;
