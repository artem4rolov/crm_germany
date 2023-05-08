import { createSlice } from "@reduxjs/toolkit";
// функция авторизации
import {} from "./timesheetActions";

const actualyYear = new Date().getFullYear();
const actualyMonth = new Date().getMonth();

function addZero(num) {
  if (num > 0 && num < 10) {
    return `0${num}`;
  } else {
    return num;
  }
}

const initialState = {
  needRefreshData: false, // после удаления необходимо заново по установленным фильтрам запросить актуальные данные
  loadingProjects: false, // отображение загрузки
  projects: null, // пользователь
  error: null, // значение ошибки
  filter: null, // ВЫБРАННЫЙ фильтр регионов
  filterDateTimesheet: `01.${addZero(
    actualyMonth + 1
  )}.${actualyYear}-31.${addZero(actualyMonth + 1)}.${actualyYear}`, // фильтр дат
};

const timesheetSlice = createSlice({
  name: "timesheet",
  initialState,
  reducers: {
    // setFilterRegion: (state, { payload }) => {
    //   // если выбран Alle - делаем запрос без фильтров по регионам
    //   if (payload == ["Alle"]) {
    //     return (state.filterRegion = null);
    //   }
    //   state.filterRegion = payload;
    // },
    setFilterDateTimesheet: (state, { payload }) => {
      state.filterDateTimesheet = payload;
      state.needRefreshData = true;
    },
  },
  extraReducers: (builder) => {
    // builder;
    // получить все праздники текущего года
    // .addCase(getHolidaysNowYear.pending, (state) => {
    //   state.loadingHolidays = true;
    //   state.holidays = null;
    // })
    // .addCase(getHolidaysNowYear.fulfilled, (state, action) => {
    //   state.loadingHolidays = false;
    //   state.holidays = action.payload.data;
    // })
    // .addCase(getHolidaysNowYear.rejected, (state, action) => {
    //   state.loadingHolidays = false;
    //   state.holidays = null;
    //   state.error = action.payload;
    // });
  },
});

export const { setFilterDateTimesheet } = timesheetSlice.actions;
export default timesheetSlice.reducer;
