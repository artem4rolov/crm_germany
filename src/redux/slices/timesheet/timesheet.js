import { createSlice } from "@reduxjs/toolkit";
// функция авторизации
import {} from "./timesheetActions";

const initialState = {
  needRefreshData: false, // после удаления необходимо заново по установленным фильтрам запросить актуальные данные
  loadingProjects: false, // отображение загрузки
  projects: null, // пользователь
  error: null, // значение ошибки
  filter: null, // ВЫБРАННЫЙ фильтр регионов
  filterDate: null, // фильтр дат
};

const timesheetSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    // setFilterRegion: (state, { payload }) => {
    //   // если выбран Alle - делаем запрос без фильтров по регионам
    //   if (payload == ["Alle"]) {
    //     return (state.filterRegion = null);
    //   }
    //   state.filterRegion = payload;
    // },
    // setFilterDate: (state, { payload }) => {
    //   state.filterDate = payload;
    // },
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

// export const { setFilterRegion, setFilterDate } = projectsSlice.actions;
export default timesheetSlice.reducer;
