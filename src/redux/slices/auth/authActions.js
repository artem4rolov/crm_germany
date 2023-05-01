import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../services/api";
import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

// Отлавливаем ошибки при запросах с помощью axios interceptors
// const refreshAuthLogic = async (failedRequest) => {
//   // если статус ошибки 419 (устаревший токен)
//   if (failedRequest.response.status === 419) {
//     // получаем новый токен от сервера
//     await axios.get("/sanctum/csrf-cookie");

//     // повторяем запрос, который ранее был с ошибкой устаревшего токена, только на этот раз меняем его config (новый токен от сервера)
//     return axios(failedRequest.response.config);
//   }

//   // если статус ошибки 401 (сессия авторищации истекла)
//   if (failedRequest.response.status === 401) {
//     return failedRequest;
//   }

//   return Promise.reject();
// };

// Instantiate the interceptor
// createAuthRefreshInterceptor(apiClient, refreshAuthLogic);

// вход
export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    try {
      const user = await apiClient
        .post("/login", {
          email: email,
          password: password,
        })
        .then((response) => {
          return response;
        });
      return user.status;
    } catch (error) {
      return error.status;
    }
  }
);

// выход
export const userLogout = createAsyncThunk("auth/logout", async () => {
  try {
    await apiClient.post("/logout");
  } catch (error) {
    return error.status;
  }
});

// проверка действительности сессии на сервере (при перезагрузке страницы, чтобы не логиниться)
export const testAuth = createAsyncThunk("auth/testAuth", async () => {
  try {
    const data = await apiClient.get("/user/confirmed-password-status");
    return data.status;
  } catch (error) {
    return error.status;
  }
});
