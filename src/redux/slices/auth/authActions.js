import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../services/api";

// вход
export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    try {
      // ожидаем ответ от сервера на запрос о cookies
      const tokenStatus = await apiClient.get("/sanctum/csrf-cookie");

      // если статус ответа 204 (токен в наличии), разрешаем авторизацию
      if (tokenStatus.status === 204) {
        const user = await apiClient
          .post("/login", {
            email: email,
            password: password,
          })
          .then((response) => {
            return response;
          });
        return user.status;
      }
    } catch (error) {
      console.log(error);
    }
  }
);

// выход
export const userLogout = createAsyncThunk("auth/logout", async () => {
  try {
    return await apiClient.post("/logout");
  } catch (error) {
    console.log(error);
  }
});
