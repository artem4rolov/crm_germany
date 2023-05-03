import { createSlice } from "@reduxjs/toolkit";
import { getNotesByFilter } from "./notesActions";

const initialState = {
  needRefreshData: false, // после удаления необходимо заново по установленным фильтрам запросить актуальные данные
  loadingNotes: false, // отображение загрузки
  notes: null, // пользователь
  error: null, // значение ошибки
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setFilterDateDAY: (state, { payload }) => {
      state.filterDate = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // авторизация
      .addCase(getNotesByFilter.pending, (state) => {
        state.loading = true;
        state.notes = null;
        state.error = null;
      })
      .addCase(getNotesByFilter.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload;
      })
      .addCase(getNotesByFilter.rejected, (state, action) => {
        state.loading = false;
        state.notes = null;
        state.error = action.payload;
      });
  },
});

export default notesSlice.reducer;
