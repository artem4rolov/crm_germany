import { createSlice } from "@reduxjs/toolkit";
import { getReportsSummary } from "./yearSummaryActions";

const actualyYear = new Date().getFullYear();

const initialState = {
  needRefreshData: false, // после удаления необходимо заново по установленным фильтрам запросить актуальные данные
  loadingYearSummary: false, // отображение загрузки
  yearSummaryData: null, // пользователь
  filterDateYearSummary: `01.01.${actualyYear}-31.12.${actualyYear}`, // фильтр дат
  error: null,
};

const yearSummarySlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setFilterDateYearSummary: (state, { payload }) => {
      state.filterDateYearSummary = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // получаем заметки по фильтрам
      .addCase(getReportsSummary.pending, (state) => {
        state.loadingYearSummary = true;
        state.yearSummaryData = null;
        state.error = null;
      })
      .addCase(getReportsSummary.fulfilled, (state, action) => {
        state.loadingYearSummary = false;
        state.yearSummaryData = action.payload.data;
      })
      .addCase(getReportsSummary.rejected, (state, action) => {
        state.loadingYearSummary = false;
        state.yearSummaryData = null;
        state.error = action.payload;
      });
  },
});

export const { setFilterDateYearSummary } = yearSummarySlice.actions;
export default yearSummarySlice.reducer;
