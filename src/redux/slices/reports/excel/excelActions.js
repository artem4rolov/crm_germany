import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../../services/api";

// получаем список контрактов по дате для dropDown в модалке
export const getContractsExcel = createAsyncThunk(
  "excel/getContractsExcel",
  async (year) => {
    try {
      const { data } = await apiClient
        .get(`/api/reports/excel/contracts/${year}`)
        .then((response) => {
          return response;
        });
      return data;
    } catch (error) {
      return error;
    }
  }
);
