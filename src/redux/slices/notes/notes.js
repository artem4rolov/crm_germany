import { createSlice } from "@reduxjs/toolkit";
import {
  createNote,
  editNote,
  getNotesByFilter,
  removeNote,
} from "./notesActions";

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
      // получаем заметки по фильтрам
      .addCase(getNotesByFilter.pending, (state) => {
        state.loadingNotes = true;
        state.notes = null;
        state.error = null;
      })
      .addCase(getNotesByFilter.fulfilled, (state, action) => {
        state.loadingNotes = false;
        state.notes = action.payload;
      })
      .addCase(getNotesByFilter.rejected, (state, action) => {
        state.loadingNotes = false;
        state.notes = null;
        state.error = action.payload;
      })
      // редактируем заметку
      .addCase(editNote.pending, (state) => {
        state.loadingNotes = true;
        state.needRefreshData = false;
        state.error = null;
      })
      .addCase(editNote.fulfilled, (state, action) => {
        state.loadingNotes = false;
        state.needRefreshData = true;
      })
      .addCase(editNote.rejected, (state, action) => {
        state.loadingNotes = false;
        state.needRefreshData = false;
        state.error = action.payload;
      })
      // создаем заметку
      .addCase(createNote.pending, (state) => {
        state.loadingNotes = true;
        state.needRefreshData = false;
        state.error = null;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.loadingNotes = false;
        state.needRefreshData = true;
      })
      .addCase(createNote.rejected, (state, action) => {
        state.loadingNotes = false;
        state.needRefreshData = false;
        state.error = action.payload;
      })
      // удаляем заметку
      .addCase(removeNote.pending, (state) => {
        state.loadingNotes = true;
        state.needRefreshData = false;
        state.error = null;
      })
      .addCase(removeNote.fulfilled, (state, action) => {
        state.loadingNotes = false;
        state.needRefreshData = true;
      })
      .addCase(removeNote.rejected, (state, action) => {
        state.loadingNotes = false;
        state.needRefreshData = false;
        state.error = action.payload;
      });
  },
});

export default notesSlice.reducer;
