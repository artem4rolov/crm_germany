import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../services/api";

// получаем праздники текущего года с 1 января по 31 декабря сразу при загрузке страницы Holidays.jsx
export const getProjects = createAsyncThunk("auth/getProjects", async () => {
  // try {
  //   const { data } = await apiClient
  //     .get(`/api/holidays/01.01.2020-31.12.2020`)
  //     .then((response) => {
  //       return response;
  //     });
  //   return data;
  // } catch (error) {
  //   return error;
  // }
});

// получаем праздники текущего года с 1 января по 31 декабря
export const getProjectsByFilter = createAsyncThunk(
  "auth/getProjectsByFilter"
  // async ({ date, region }) => {
  //   try {
  //     // если фильтр региона не выбран - оставляем только дату для запроса
  //     if (region == null) {
  //       const { data } = await apiClient
  //         .get(`/api/holidays/${date}`)
  //         .then((response) => {
  //           return response;
  //         });
  //       return data;
  //     }

  //     // если все фильтры активны (не null) - делаем запрос в зависимости от выбранных значений фильтро
  //     const { data } = await apiClient
  //       .get(`/api/holidays/${date}/${region}`)
  //       .then((response) => {
  //         return response;
  //       });
  //     return data;
  //   } catch (error) {
  //     return error;
  //   }
  // }
);
