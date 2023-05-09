import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../../services/api";

// получаем заметки по фильтру дат
export const getReportsSummary = createAsyncThunk(
  "yearSummary/getReportsSummary",
  async (year) => {
    try {
      // получаем рабочие часы в проектах по годам
      const { data } = await apiClient.get(`/api/reports/summary/${year}`);

      return data;
    } catch (error) {
      return error.status;
    }
  }
);
