import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../services/api";

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
      return data.data;
    } catch (error) {
      return error.status;
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
        const { data } = await apiClient.get(`/api/holidays/${date}`);
        return data.data;
      }

      // если все фильтры активны (не null) - делаем запрос в зависимости от выбранных значений фильтро
      const { data } = await apiClient.get(`/api/holidays/${date}/${region}`);

      return data.data;
    } catch (error) {
      return error.status;
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
    return data.data;
  } catch (error) {
    return error.status;
  }
});

// удаление праздника (по id региона)
export const removeHolidayById = createAsyncThunk(
  "auth/removeHolidayById",
  async ({ id }) => {
    try {
      // если все фильтры активны (не null) - делаем запрос в зависимости от выбранных значений фильтро
      await apiClient.delete(`/api/holidays/${id}`);
    } catch (error) {
      return error.response.status;
    }
  }
);

// загрузка excel-файла на сервер
export const uploadExcel = createAsyncThunk(
  "auth/uploadExcel",
  async (formData) => {
    try {
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
          "Accept-Encoding": "gzip, deflate, br",
        },
      };
      // если все фильтры активны (не null) - делаем запрос в зависимости от выбранных значений фильтро
      await apiClient.post(`/api/holidays/excel`, formData, config);
    } catch (error) {
      return error.response.status;
    }
  }
);

// скачивание excel-файла c сервера
export const downloadExcel = createAsyncThunk(
  "auth/downloadExcel",
  async () => {
    try {
      const config = {
        responseType: "blob",
        "Accept-Encoding": "gzip, deflate, br",
      };
      // если все фильтры активны (не null) - делаем запрос в зависимости от выбранных значений фильтро
      await apiClient.get(`/api/holidays/excel`, config).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "file.xlsx");
        document.body.appendChild(link);
        link.click();
      });
    } catch (error) {
      return error.response.status;
    }
  }
);
