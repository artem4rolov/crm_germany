import { createSlice } from "@reduxjs/toolkit";
// функция авторизации
import {
  createContractTimesheet,
  getContractsByDate,
  getContractsTimeSheet,
  removeContractTimesheet,
  updateContractTimesheet,
} from "./timesheetActions";
import moment from "moment";

const initialState = {
  filterClearEmpty: null, // чек-бокс "очистить пустые"
  needRefreshData: false, // после удаления необходимо заново по установленным фильтрам запросить актуальные данные
  loadingTimeSheet: false, // отображение загрузки
  contractsTimesheet: null, // пользователь
  error: null, // значение ошибки
  contractsTimeSheetDropDown: [], // список контрактов для dropDown
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
    setFilterClearEmpty: (state, { payload }) => {
      state.filterClearEmpty = payload;
    },
    setFilterDateTimesheet: (state, { payload }) => {
      state.filterDateTimesheet = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // получить все праздники текущего года
      .addCase(getContractsByDate.pending, (state) => {
        state.loadingTimeSheet = true;
        state.contractsTimeSheetDropDown = null;
      })
      .addCase(getContractsByDate.fulfilled, (state, action) => {
        state.loadingTimeSheet = false;
        state.contractsTimeSheetDropDown = action.payload.data;
      })
      .addCase(getContractsByDate.rejected, (state, action) => {
        state.loadingTimeSheet = false;
        state.contractsTimeSheetDropDown = null;
        state.error = action.payload;
      })
      // получить все праздники текущего года
      .addCase(getContractsTimeSheet.pending, (state) => {
        state.loadingTimeSheet = true;
        state.contractsTimesheet = null;
      })
      .addCase(getContractsTimeSheet.fulfilled, (state, action) => {
        state.loadingTimeSheet = false;
        state.contractsTimesheet = action.payload.data;
      })
      .addCase(getContractsTimeSheet.rejected, (state, action) => {
        state.loadingTimeSheet = false;
        state.contractsTimesheet = null;
        state.error = action.payload;
      })
      // создать контракт
      .addCase(createContractTimesheet.pending, (state) => {
        state.loadingTimeSheet = true;
        state.needRefreshData = false;
        state.error = null;
      })
      .addCase(createContractTimesheet.fulfilled, (state, action) => {
        state.loadingTimeSheet = false;
        state.needRefreshData = true;
      })
      .addCase(createContractTimesheet.rejected, (state, action) => {
        state.loadingTimeSheet = false;
        state.needRefreshData = false;
        state.error = action.payload;
      })
      // обновить контракт
      .addCase(updateContractTimesheet.pending, (state) => {
        state.loadingTimeSheet = true;
        state.needRefreshData = false;
        state.error = null;
      })
      .addCase(updateContractTimesheet.fulfilled, (state, action) => {
        state.loadingTimeSheet = false;
        state.needRefreshData = true;
      })
      .addCase(updateContractTimesheet.rejected, (state, action) => {
        state.loadingTimeSheet = false;
        state.needRefreshData = false;
        state.error = action.payload;
      })
      // удалить контракт
      .addCase(removeContractTimesheet.pending, (state) => {
        state.loadingTimeSheet = true;
        state.needRefreshData = false;
        state.error = null;
      })
      .addCase(removeContractTimesheet.fulfilled, (state, action) => {
        state.loadingTimeSheet = false;
        state.needRefreshData = true;
      })
      .addCase(removeContractTimesheet.rejected, (state, action) => {
        state.loadingTimeSheet = false;
        state.needRefreshData = false;
        state.error = action.payload;
      });
  },
});

export const { setFilterDateTimesheet, setFilterClearEmpty } =
  timesheetSlice.actions;
export default timesheetSlice.reducer;
