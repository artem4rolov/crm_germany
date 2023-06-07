import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../services/api";

// получаем
export const getProjects = createAsyncThunk(
  "timesheet/getProjects",
  async () => {
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
  }
);

// получаем
export const getProjectsByFilter = createAsyncThunk(
  "timesheet/getProjectsByFilter"
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

// получаем список контрактов по дате для dropDown в модалке
export const getContractsByDate = createAsyncThunk(
  "timesheet/getContractsByDate",
  async (date) => {
    try {
      const { data } = await apiClient
        .get(`/api/contracts/${date}`)
        .then((response) => {
          return response;
        });
      return data;
    } catch (error) {
      return error;
    }
  }
);
