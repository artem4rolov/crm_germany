import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../services/api";

// получаем проекты по фильтру дат
export const getProjectsByFilterDate = createAsyncThunk(
  "projects/getProjectsByFilterDate",
  async (date) => {
    try {
      const { data } = await apiClient.get(`/api/projects/${date}`);

      return data.data;
    } catch (error) {
      return error.status;
    }
  }
);

// получаем проекты по фильтру дат и по фильтру "оплачиваемые"
export const getBillableProjects = createAsyncThunk(
  "projects/getBillableProjects",
  async (date) => {
    try {
      const { data } = await apiClient.get(`/api/projects/${date}/billable`);

      return data.data;
    } catch (error) {
      return error.status;
    }
  }
);

// создаем проект
export const createProject = createAsyncThunk(
  "projects/createProject",
  async ({ obj }) => {
    try {
      const config = {
        "Content-type": "application/x-www-form-urlencoded",
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
      };
      // если все фильтры активны (не null) - делаем запрос в зависимости от выбранных значений фильтро
      const { data } = await apiClient.post(
        `/api/projects`,
        {
          name: obj.name,
          description: obj.description,
        },
        config
      );

      return data.data;
    } catch (error) {
      return error.status;
    }
  }
);

// удаляем проект
export const removeProject = createAsyncThunk(
  "projects/removeProject",
  async ({ id }) => {
    try {
      const config = {
        "Content-type": "application/x-www-form-urlencoded",
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
      };
      // если все фильтры активны (не null) - делаем запрос в зависимости от выбранных значений фильтро
      const { data } = await apiClient.delete(
        `/api/projects/${id}`,

        config
      );

      return data.data;
    } catch (error) {
      return error.status;
    }
  }
);

// редактируем проект
export const editProject = createAsyncThunk(
  "Projects/editProject",
  async ({ id, obj }) => {
    try {
      const config = {
        "Content-type": "application/x-www-form-urlencoded",
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
      };
      // если все фильтры активны (не null) - делаем запрос в зависимости от выбранных значений фильтро
      const { data } = await apiClient.put(
        `/api/projects/${id}`,
        {
          name: obj.name,
          description: obj.description,
        },
        config
      );

      return data.data;
    } catch (error) {
      return error.status;
    }
  }
);

// получаем шаблоны excel форматов для выпадающего списка Excel
export const getExcelTemplates = createAsyncThunk(
  "projects/getExcelTemplates",
  async (date) => {
    try {
      const { data } = await apiClient.get(`/api/reports/excel/templates`);

      return data.data;
    } catch (error) {
      return error.status;
    }
  }
);
