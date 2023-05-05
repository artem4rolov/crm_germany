import { createSlice } from "@reduxjs/toolkit";
import {
  createNote,
  editNote,
  getNotesByFilter,
  removeNote,
} from "./notesActions";

const actualyYear = new Date().getFullYear();
const actualyDay = new Date().getDay();

function addZero(num) {
  if (num > 0 && num < 10) {
    return `0${num}`;
  }
  return num;
}

const initialState = {
  needRefreshData: false, // после удаления необходимо заново по установленным фильтрам запросить актуальные данные
  loadingNotes: false, // отображение загрузки
  notes: null, // пользователь
  error: null, // значение ошибки
  filterDateNotes: `${addZero(actualyDay)}.05.${actualyYear - 3}-${addZero(
    actualyDay
  )}.05.2023`, // фильтр дат
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setFilterDateNotes: (state, { payload }) => {
      state.filterDateNotes = payload;
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

export const { setFilterDateNotes } = notesSlice.actions;
export default notesSlice.reducer;
