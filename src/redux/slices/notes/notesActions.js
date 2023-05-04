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

// редактируем заметку
export const editNote = createAsyncThunk(
  "notes/editNote",
  async ({ id, obj }) => {
    try {
      const config = {
        "Content-type": "application/x-www-form-urlencoded",
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
      };
      // если все фильтры активны (не null) - делаем запрос в зависимости от выбранных значений фильтро
      const { data } = await apiClient.put(
        `/api/notes/${id}`,
        {
          title: obj.title,
          content: obj.content,
          favorite: obj.favorite,
        },
        config
      );

      return data.data;
    } catch (error) {
      return error.status;
    }
  }
);

// создаем заметку
export const createNote = createAsyncThunk(
  "notes/createNote",
  async ({ obj }) => {
    try {
      const config = {
        "Content-type": "application/x-www-form-urlencoded",
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
      };
      // если все фильтры активны (не null) - делаем запрос в зависимости от выбранных значений фильтро
      const { data } = await apiClient.post(
        `/api/notes`,
        {
          title: obj.title,
          content: obj.content,
          favorite: obj.favorite,
        },
        config
      );

      return data.data;
    } catch (error) {
      return error.status;
    }
  }
);

// удаляем заметку
export const removeNote = createAsyncThunk(
  "notes/removeNote",
  async ({ id }) => {
    try {
      const config = {
        "Content-type": "application/x-www-form-urlencoded",
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
      };
      // если все фильтры активны (не null) - делаем запрос в зависимости от выбранных значений фильтро
      const { data } = await apiClient.delete(
        `/api/notes/${id}`,

        config
      );

      return data.data;
    } catch (error) {
      return error.status;
    }
  }
);
