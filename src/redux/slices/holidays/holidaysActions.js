import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../services/api";

import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

// Function that will be called to refresh authorization
// const refreshAuthLogic = (failedRequest) =>
//   axios
//     .get("/user/confirmed-password-status", { withCredentials: true })
//     .then((tokenRefreshResponse) => {
//       return Promise.resolve();
//     });

// // Instantiate the interceptor
// createAuthRefreshInterceptor(apiClient, refreshAuthLogic);

// получаем праздники текущего года с 1 января по 31 декабря сразу при загрузке страницы Holidays.jsx
export const getHolidaysNowYear = createAsyncThunk(
  "auth/getHolidaysNowYear",
  async () => {
    try {
      const { data } = await apiClient
        .get(`/api/holidays/01.01.2020-31.12.2020`)
        .then((response) => {
          return response;
        });
      return data;
    } catch (error) {
      return error;
    }
  }
);

// получаем праздники текущего года с 1 января по 31 декабря
export const getHolidaysByFilter = createAsyncThunk(
  "auth/getHolidaysByFilter",
  async ({ date, region }) => {
    try {
      // если фильтр региона не выбран - оставляем только дату для запроса
      if (region == null) {
        const { data } = await apiClient
          .get(`/api/holidays/${date}`)
          .then((response) => {
            return response;
          });
        return data;
      }

      // если все фильтры активны (не null) - делаем запрос в зависимости от выбранных значений фильтро
      const { data } = await apiClient
        .get(`/api/holidays/${date}/${region}`)
        .then((response) => {
          return response;
        });
      return data;
    } catch (error) {
      return error;
    }
  }
);

// получаем праздники текущего года с 1 января по 31 декабря
export const getRegions = createAsyncThunk("auth/getRegions", async () => {
  try {
    // если все фильтры активны (не null) - делаем запрос в зависимости от выбранных значений фильтро
    const { data } = await apiClient
      .get(`/api/holidays/regions`)
      .then((response) => {
        return response;
      });
    return data;
  } catch (error) {
    return error;
  }
});

// удаляем праздник
export const removeHolidayById = createAsyncThunk(
  "auth/removeHolidayById",
  async ({ id }) => {
    try {
      // если все фильтры активны (не null) - делаем запрос в зависимости от выбранных значений фильтро
      const { data } = await apiClient.delete(`/api/holidays/${id}`);

      console.log(data);
    } catch (error) {
      return error;
    }
  }
);
