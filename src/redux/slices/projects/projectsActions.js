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
          excel_template: obj.excel_template,
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

// создаем контракт
export const createContract = createAsyncThunk(
  "projects/createContract",
  async ({ obj }) => {
    try {
      const config = {
        "Content-type": "application/x-www-form-urlencoded",
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
      };
      // если все фильтры активны (не null) - делаем запрос в зависимости от выбранных значений фильтро
      const { data } = await apiClient.post(
        `/api/contracts`,
        {
          project_id: obj.project_id,
          identifier_provider: obj.identifier_provider,
          identifier_customer: obj.identifier_customer,
          start_date: obj.start_date,
          end_date: obj.end_date,
          budget: obj.budget,
          billable: obj.billable,
          active: obj.active,
        },
        config
      );

      return data.data;
    } catch (error) {
      return error.status;
    }
  }
);

// редактируем контракт
export const updateContract = createAsyncThunk(
  "projects/updateContract",
  async ({ id, obj }) => {
    try {
      const config = {
        "Content-type": "application/x-www-form-urlencoded",
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
      };
      // если все фильтры активны (не null) - делаем запрос в зависимости от выбранных значений фильтро
      const { data } = await apiClient.put(
        `/api/contracts/${id}`,
        {
          project_id: obj.project_id,
          identifier_provider: obj.identifier_provider,
          identifier_customer: obj.identifier_customer,
          start_date: obj.start_date,
          end_date: obj.end_date,
          budget: obj.budget,
          billable: obj.billable,
          active: obj.active,
        },
        config
      );

      return data.data;
    } catch (error) {
      return error.status;
    }
  }
);

// удаляем контракт
export const removeContract = createAsyncThunk(
  "projects/removeContract",
  async ({ id }) => {
    try {
      const config = {
        "Content-type": "application/x-www-form-urlencoded",
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
      };
      // если все фильтры активны (не null) - делаем запрос в зависимости от выбранных значений фильтро
      const { data } = await apiClient.delete(
        `/api/contracts/${id}`,

        config
      );

      return data.data;
    } catch (error) {
      return error.status;
    }
  }
);
