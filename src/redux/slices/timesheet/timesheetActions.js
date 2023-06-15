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

// создаем контракт
export const createContractTimesheet = createAsyncThunk(
  "timesheet/createContractTimesheet",
  async ({ obj }) => {
    try {
      const config = {
        "Content-type": "application/x-www-form-urlencoded",
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
      };
      // если все фильтры активны (не null) - делаем запрос в зависимости от выбранных значений фильтро
      const { data } = await apiClient.post(
        `/api/timesheet`,
        {
          contract_id: obj.contract_id,
          date: obj.date,
          start_time: obj.start_time,
          end_time: obj.end_time,
          break_time: obj.break_time,
          description: obj.description,
          notes: obj.notes,
          man_day_override: obj.man_day_override,
        },
        config
      );

      return data.data;
    } catch (error) {
      return error.status;
    }
  }
);

// обновляем контракт
export const updateContractTimesheet = createAsyncThunk(
  "timesheet/updateContractTimesheet",
  async ({ obj, id }) => {
    try {
      const config = {
        "Content-type": "application/x-www-form-urlencoded",
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
      };
      // если все фильтры активны (не null) - делаем запрос в зависимости от выбранных значений фильтро
      const { data } = await apiClient.put(
        `/api/timesheet/${id}`,
        {
          contract_id: obj.contract_id,
          date: obj.date,
          start_time: obj.start_time,
          end_time: obj.end_time,
          break_time: obj.break_time,
          description: obj.description,
          notes: obj.notes,
          man_day_override: obj.man_day_override,
        },
        config
      );

      return data.data;
    } catch (error) {
      return error.status;
    }
  }
);

// обновляем контракт
export const removeContractTimesheet = createAsyncThunk(
  "timesheet/removeContractTimesheet",
  async ({ id }) => {
    try {
      const config = {
        "Content-type": "application/x-www-form-urlencoded",
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
      };
      // если все фильтры активны (не null) - делаем запрос в зависимости от выбранных значений фильтро
      const { data } = await apiClient.delete(
        `/api/timesheet/${id}`,

        config
      );

      return data.data;
    } catch (error) {
      return error.status;
    }
  }
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
