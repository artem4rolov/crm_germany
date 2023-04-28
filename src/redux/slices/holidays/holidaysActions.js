import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../services/api";
import axios from "axios";

// получаем праздники текущего года с 1 января по 31 декабря сразу при загрузке страницы Holidays.jsx
export const getHolidaysNowYear = createAsyncThunk(
  "auth/getHolidaysNowYear",
  async () => {
    try {
      // получаем текущий год
      const nowYear = new Date().getFullYear();

      const { data } = await apiClient
        .get(`/api/holidays/01.01.2020-31.12.2020`)
        .then((response) => {
          return response;
        });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

// получаем праздники текущего года с 1 января по 31 декабря
export const getHolidaysByFilter = createAsyncThunk(
  "auth/getHolidaysByFilter",
  async ({ date, region }) => {
    try {
      // если выбран фильтр "Alle" - показываем все праздники в выбранном диапазоне дат
      if (region == "Alle" || region == null) {
        const { data } = await apiClient
          .get(`/api/holidays/${date}`)
          .then((response) => {
            return response;
          });
        return data;
      } else {
        const { data } = await apiClient
          .get(`/api/holidays/${date}/${region}`)
          .then((response) => {
            return response;
          });
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  }
);
