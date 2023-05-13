import { createSlice } from "@reduxjs/toolkit";

const actualyYear = new Date().getFullYear();

const initialState = {
  needRefreshData: false, // после удаления необходимо заново по установленным фильтрам запросить актуальные данные
  loadingDashboard: false, // отображение загрузки
  dashboard: null, // пользователь
  error: null, // значение ошибки
  filterDateDashboard: `01.01.${actualyYear}-31.12.${actualyYear}`, // фильтр дат
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setFilterDateDashboard: (state, { payload }) => {
      state.filterDateNotes = payload;
    },
  },
  extraReducers: (builder) => {
    // builder
    // получаем заметки по фильтрам
    //   .addCase(getNotesByFilter.pending, (state) => {
    //     state.loadingNotes = true;
    //     state.notes = null;
    //     state.error = null;
    //   })
    //   .addCase(getNotesByFilter.fulfilled, (state, action) => {
    //     state.loadingNotes = false;
    //     state.notes = action.payload;
    //   })
    //   .addCase(getNotesByFilter.rejected, (state, action) => {
    //     state.loadingNotes = false;
    //     state.notes = null;
    //     state.error = action.payload;
    //   })
  },
});

export const { setFilterDateDashboard } = dashboardSlice.actions;
export default dashboardSlice.reducer;
