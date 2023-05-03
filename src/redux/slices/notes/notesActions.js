import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../services/api";

// получаем заметки по фильтру дат
export const getNotesByFilter = createAsyncThunk(
  "notes/getNotesByFilter",
  async ({ date }) => {
    try {
      // если все фильтры активны (не null) - делаем запрос в зависимости от выбранных значений фильтро
      const { data } = await apiClient.get(`/api/notes/${date}`);

      return data.data;
    } catch (error) {
      return error.status;
    }
  }
);
