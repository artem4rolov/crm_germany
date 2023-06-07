import { createSlice } from "@reduxjs/toolkit";
// функция авторизации
import { getContractsByDate } from "./timesheetActions";
import moment from "moment";

const initialState = {
  needRefreshData: false, // после удаления необходимо заново по установленным фильтрам запросить актуальные данные
  loadingProjects: false, // отображение загрузки
  projects: null, // пользователь
  error: null, // значение ошибки
  constracts: [], // список контрактов для dropDown
  filterDateTimesheet: `${moment()
    .subtract(42, "days")
    .format("DD.MM.YYYY")}-${moment().format("DD")}.${moment().format(
    "MM"
  )}.${moment().format("YYYY")}`, // фильтр дат
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
    builder
      // получить все праздники текущего года
      .addCase(getContractsByDate.pending, (state) => {
        state.loadingProjects = true;
        state.constracts = null;
      })
      .addCase(getContractsByDate.fulfilled, (state, action) => {
        state.loadingProjects = false;
        state.constracts = action.payload.data;
      })
      .addCase(getContractsByDate.rejected, (state, action) => {
        state.loadingProjects = false;
        state.constracts = null;
        state.error = action.payload;
      });
  },
});

export const { setFilterDateTimesheet } = timesheetSlice.actions;
export default timesheetSlice.reducer;
