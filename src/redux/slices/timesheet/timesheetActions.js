import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../services/api";

// получаем
export const getContractsTimeSheet = createAsyncThunk(
  "timesheet/getContractsTimeSheet",
  async (date) => {
    try {
      const { data } = await apiClient
        .get(`/api/timesheet/${date}`)
        .then((response) => {
          return response;
        });
      return data;
    } catch (error) {
      return error;
    }
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
        .get(`/api/contracts/${date}-${date}`)
        .then((response) => {
          return response;
        });
      return data;
    } catch (error) {
      return error;
    }
  }
);
